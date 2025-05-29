const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let matchesCache = {
  data: null,
  timestamp: null,
  ttl: 5 * 60 * 1000 
};

const FOOTBALL_API_URL = 'https://api.football-data.org/v4';
const API_KEY = process.env.FOOTBALL_API_KEY;

if (!API_KEY) {
  console.error('FOOTBALL_API_KEY not found in environment variables');
  console.log('Please add your API key to backend/.env file');
}

const isCacheValid = () => {
  return matchesCache.data && 
         matchesCache.timestamp && 
         (Date.now() - matchesCache.timestamp) < matchesCache.ttl;
};

// Routes

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Soccer Matches API is running',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/matches', async (req, res) => {
  try {
    if (isCacheValid()) {
      console.log('Returning cached matches data');
      return res.json(matchesCache.data);
    }

    console.log('Fetching fresh data from Football Data API...');

    const competitions = ['PL', 'BL1', 'SA', 'FL1', 'PD']; // Premier League, Bundesliga, Serie A, Ligue 1, La Liga
    const matchPromises = competitions.map(comp => 
      axios.get(`${FOOTBALL_API_URL}/competitions/${comp}/matches`, {
        headers: {
          'X-Auth-Token': API_KEY
        },
        params: {
          status: 'SCHEDULED',
          limit: 10
        }
      }).catch(err => {
        console.log(`Failed to fetch ${comp}:`, err.response?.status);
        return { data: { matches: [] } };
      })
    );

    const responses = await Promise.all(matchPromises);
    
    let allMatches = [];
    responses.forEach((response, index) => {
      if (response.data && response.data.matches) {
        const competitionName = getCompetitionName(competitions[index]);
        const matches = response.data.matches.map(match => ({
          ...match,
          competition: {
            ...match.competition,
            displayName: competitionName
          }
        }));
        allMatches = allMatches.concat(matches);
      }
    });

    allMatches.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
    const upcomingMatches = allMatches.slice(0, 20);

    const responseData = {
      matches: upcomingMatches,
      count: upcomingMatches.length,
      lastUpdated: new Date().toISOString()
    };

    matchesCache = {
      data: responseData,
      timestamp: Date.now(),
      ttl: matchesCache.ttl
    };

    console.log(`Successfully fetched ${upcomingMatches.length} matches`);
    res.json(responseData);

  } catch (error) {
    console.error('Error fetching matches:', error.message);
    
    if (matchesCache.data) {
      console.log('Returning expired cache due to API error');
      return res.json({
        ...matchesCache.data,
        warning: 'Data may be outdated due to API limitations'
      });
    }

    res.status(500).json({ 
      error: 'Failed to fetch matches',
      message: error.response?.data?.message || error.message,
      suggestion: 'Please check your API key and rate limits'
    });
  }
});

app.get('/api/matches/:competition', async (req, res) => {
  try {
    const { competition } = req.params;
    
    const response = await axios.get(`${FOOTBALL_API_URL}/competitions/${competition}/matches`, {
      headers: {
        'X-Auth-Token': API_KEY
      },
      params: {
        status: 'SCHEDULED',
        limit: 15
      }
    });

    const matches = response.data.matches || [];
    
    res.json({
      matches,
      competition: response.data.competition,
      count: matches.length
    });

  } catch (error) {
    console.error(`Error fetching ${req.params.competition} matches:`, error.message);
    res.status(500).json({ 
      error: `Failed to fetch ${req.params.competition} matches`,
      message: error.response?.data?.message || error.message
    });
  }
});

function getCompetitionName(code) {
  const names = {
    'PL': 'Premier League',
    'BL1': 'Bundesliga',
    'SA': 'Serie A',
    'FL1': 'Ligue 1',
    'PD': 'La Liga',
    'CL': 'Champions League',
    'EC': 'European Championship'
  };
  return names[code] || code;
}

app.use((err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Health: http://localhost:${PORT}/api/health`);
  console.log(`Matches API: http://localhost:${PORT}/api/matches`);
  
  if (!API_KEY) {
    console.log('\nDon\'t forget to add your Football Data API key to .env file!');
  }
});

module.exports = app;