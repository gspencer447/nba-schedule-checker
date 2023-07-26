import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTeams, fetchTeamLogo, fetchTeamSchedule } from '../services/api';

const TeamSelection = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedTeamLogo, setSelectedTeamLogo] = useState('');

  //Fetch NBA teams on component mount
  const fetchData = async () => {
    try {
      const data = await fetchTeams();
      console.log('Fetched data:', data);
      setTeams(data);
    } catch (error) {
      console.error('Error fetching team data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleTeamChange = async (e) => {
    setSelectedTeam(e.target.value);

    //Fetch logo based on team name
    const selectedTeamObject = teams.find((team) => team.id === e.target.value);
    if (selectedTeamObject) {
      try {
        const teamLogo = await fetchTeamLogo(selectedTeamObject.name);
        setSelectedTeamLogo(teamLogo);
      } catch (error) {
        console.error('Error fetching team logo:', error);
      }
    }
  };

  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
  };

  return (
    <div>
      <h2>Team Selection</h2>
      <div>
        <button onClick={async (event) => {
          fetchTeamSchedule(14, 2015)
        }}>Test Dummy Data</button>
        <form action="">
          <div>
        <label htmlFor="selectedTeam">Select Team:</label>
        <select id="selectedTeam" name="selectedTeam" value={selectedTeam} onChange={handleTeamChange}>
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
        </div>
        </form>
      </div>
            {/* Display the list of teams in an unordered list */}
            <div>
        <h3>All Teams:</h3>
        <ul>
          {teams.map((team) => (
            <li key={team.id}>{team.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <label htmlFor="selectedSeason">Select Season (yyyy):</label>
        <input
          type="text"
          id="selectedSeason"
          name="selectedSeason"
          value={selectedSeason}
          onChange={handleSeasonChange}
          pattern="\d{4}-\d{4}"
          placeholder="yyyy"
        />
      </div>

      {selectedTeamLogo && (
        <div>
          <h3>Team Logo:</h3>
          <img src={selectedTeamLogo} alt="Team Logo" />
        </div>
      )}

      <Link to="/schedule">View Schedule</Link>
    </div>
  );
};

export default TeamSelection;