import React from 'react';
import MatchCard from './MatchCard';

const MatchList = ({ matches, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading upcoming matches...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button onClick={onRetry} className="retry-btn">
            Try Again
          </button>
          <div className="error-suggestions">
            <h4>Possible solutions:</h4>
            <ul>
              <li>Check your internet connection</li>
              <li>Make sure the backend server is running</li>
              <li>Verify your API key is correctly configured</li>
              <li>Check API rate limits (10 requests/minute)</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return (
      <div className="no-matches">
        <div className="no-matches-content">
          <h3>No upcoming matches found</h3>
          <p>There are currently no scheduled matches available.</p>
          <button onClick={onRetry} className="retry-btn">
            Refresh
          </button>
        </div>
      </div>
    );
  }

  const groupedMatches = matches.reduce((groups, match) => {
    const date = new Date(match.utcDate).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(match);
    return groups;
  }, {});

  return (
    <div className="matches-container">
      <div className="matches-header">
        <h2>Upcoming Matches ({matches.length})</h2>
        <p>Next fixtures from Premier League, Bundesliga, Serie A, Ligue 1, and La Liga</p>
      </div>

      <div className="matches-content">
        {Object.entries(groupedMatches).map(([date, dayMatches]) => (
          <div key={date} className="match-day">
            <h3 className="day-header">
              {new Date(date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </h3>
            
            <div className="day-matches">
              {dayMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchList;