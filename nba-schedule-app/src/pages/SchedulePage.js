import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTeamSchedule, fetchTeamLogo } from '../services/api';

const SchedulePage = () => {
  // Get the teamId and season from URL parameters
  const { teamId, season } = useParams();

  // State variables for team logo and schedule
  const [teamLogo, setTeamLogo] = useState('');
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    // Fetch team schedule and team logo on component mount
    const fetchData = async () => {
      try {
        // Fetch team schedule based on teamId and season
        const teamSchedule = await fetchTeamSchedule(teamId, season);
        setSchedule(teamSchedule);

        // Fetch team logo based on team name
        const teamLogoUrl = await fetchTeamLogo(teamSchedule.team_name);
        setTeamLogo(teamLogoUrl);
      } catch (error) {
        console.error('Error fetching team schedule:', error);
      }
    };

    fetchData();
  }, [teamId, season]);

  return (
    <div>
      {/* Render team logo if available */}
      {teamLogo && (
        <div>
          <h3>Team Logo:</h3>
          <img src={teamLogo} alt="Team Logo" />
        </div>
      )}

      <h2>Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Opponent</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {/* Render the schedule data in a table */}
          {schedule.map((game) => (
            <tr key={game.game_id}>
              <td>{game.date}</td>
              <td>{game.time}</td>
              <td>{game.opponent}</td>
              <td>{game.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SchedulePage;
