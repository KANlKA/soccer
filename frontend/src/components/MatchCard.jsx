import React from 'react';

const MatchCard = ({ match }) => {
  const matchDate = new Date(match.utcDate);
  const now = new Date();
  const isToday = matchDate.toDateString() === now.toDateString();
  const isTomorrow = matchDate.toDateString() === new Date(now.getTime() + 86400000).toDateString();

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeLabel = () => {
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    return matchDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getCompetitionBadge = (competition) => {
    const badges = {
      'Premier League': { emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', class: 'pl' },
      'Bundesliga': { emoji: '🇩🇪', class: 'bl1' },
      'Serie A': { emoji: '🇮🇹', class: 'sa' },
      'Ligue 1': { emoji: '🇫🇷', class: 'fl1' },
      'La Liga': { emoji: '🇪🇸', class: 'pd' },
      'Champions League': { emoji: '🏆', class: 'cl' }
    };
    
    const competitionName = competition?.displayName || competition?.name || 'Unknown';
    const badge = badges[competitionName] || { emoji: '⚽', class: 'default' };
    
    return { ...badge, name: competitionName };
  };

  const badge = getCompetitionBadge(match.competition);

  return (
    <div className={`match-card ${isToday ? 'today' : ''}`}>
      <div className="match-header">
        <div className={`competition-badge ${badge.class}`}>
          <span className="competition-emoji">{badge.emoji}</span>
          <span className="competition-name">{badge.name}</span>
        </div>
        
        <div className="match-time">
          <span className="time-label">{getTimeLabel()}</span>
          <span className="time">{formatTime(matchDate)}</span>
        </div>
      </div>

      <div className="match-teams">
        <div className="team home-team">
          <div className="team-info">
            <h4 className="team-name">{match.homeTeam.name}</h4>
            <span className="team-short">{match.homeTeam.tla}</span>
          </div>
        </div>

        <div className="match-versus">
          <span className="vs">VS</span>
          {match.status === 'SCHEDULED' && (
            <div className="match-status">
              <span className="status-dot"></span>
              Scheduled
            </div>
          )}
        </div>

        <div className="team away-team">
          <div className="team-info">
            <h4 className="team-name">{match.awayTeam.name}</h4>
            <span className="team-short">{match.awayTeam.tla}</span>
          </div>
        </div>
      </div>

      {match.venue && (
        <div className="match-venue">
          <span className="venue-icon">🏟️</span>
          <span className="venue-name">{match.venue}</span>
        </div>
      )}

      {(match.referee?.name) && (
        <div className="match-referee">
          <span className="referee-icon">👨‍⚖️</span>
          <span className="referee-name">Ref: {match.referee.name}</span>
        </div>
      )}
    </div>
  );
};

export default MatchCard;