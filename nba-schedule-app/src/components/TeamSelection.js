import React, { useState } from "react";
import { Link } from "react-router-dom";

const TeamSelection = () => {
  const teams = []; // This will be your array of team objects fetched from the basketball-api.com API
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <h2>Team Selection</h2>
      <div>
        <label htmlFor="selectedTeam">Select Team:</label>
        <select id="selectedTeam" name="selectedTeam">
          <option value="">Select a team</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="selectedDate">Select Date:</label>
        <input
          type="date"
          id="selectedDate"
          name="selectedDate"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>

      <Link to="/schedule">View Schedule</Link>
    </div>
  );
};

export default TeamSelection;
