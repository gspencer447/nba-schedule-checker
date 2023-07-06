import React, { useState, useEffect } from "react";
import { fetchSchedule } from "../services/api";

const Schedule = ({ teamId, season }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchTeamSchedule = async () => {
      try {
        const scheduleData = await fetchSchedule(teamId, season); // Fetch schedule based on the selected team ID and season
        setSchedule(scheduleData);
      } catch (error) {
        console.error("Error fetching team schedule:", error);
      }
    };

    fetchTeamSchedule();
  }, [teamId, season]);

  return (
    <div>
      <h2>Team Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Opponent</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((game) => (
            <tr key={game.id}>
              <td>{game.date}</td>
              <td>{game.opponent}</td>
              <td>{game.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Schedule;
