import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchList from './components/MatchList';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE_URL}/matches`, {
        timeout: 10000 
      });
      
      setMatches(response.data.matches || []);
      setLastUpdated(response.data.lastUpdated);
      
      if (response.data.warning) {
        setError(response.data.warning);
      }
      
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError(
        err.response?.data?.message || 
        err.message || 
        'Failed to load matches. Please try again later.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchMatches();
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Soccer Matches</h1>
          <p>Upcoming fixtures from top European leagues</p>
          
          <div className="header-actions">
            <button 
              onClick={handleRefresh} 
              disabled={loading}
              className="refresh-btn"
            >
              {loading ? '🔄' : '↻'} Refresh
            </button>
            
            {lastUpdated && (
              <span className="last-updated">
                Last updated: {new Date(lastUpdated).toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="api-info">
          <h3> API Information</h3>
          <p>
            <strong>Data Source:</strong>{' '}
            <a href="https://www.football-data.org/" target="_blank" rel="noopener noreferrer">
              Football Data API
            </a>
          </p>
          <p>Free tier providing live scores and fixtures from major European leagues</p>
        </div>

        {error && (
          <div className="error-banner">
            <span>⚠️ {error}</span>
          </div>
        )}

        <MatchList 
          matches={matches} 
          loading={loading} 
          error={error && !matches.length ? error : null}
          onRetry={handleRefresh}
        />
      </main>

      <footer className="app-footer">
        <p>
          Powered by{' '}
          <a href="https://www.football-data.org/" target="_blank" rel="noopener noreferrer">
            Football Data API
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;