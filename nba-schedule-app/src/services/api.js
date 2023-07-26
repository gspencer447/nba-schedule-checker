const API_ENDPOINT = "https://www.balldontlie.io/api/v1";
// const API_KEY = "a30021099806b46a204e47d812231081";

//Function to fetch NBA teams
const fetchTeams = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/teams`);
    console.log(response)
    if (!response.ok) {
      throw new Error('Failed to fetch team data');
    }

    const data = await response.json();
    console.log(data)
    if (!Array.isArray(data)) {
      throw new Error('Invalid response data format. Expected an array.');
    }
    //Map through team data to get team id and name
    const teamData = data.map((team) => ({
      id: team.id,
      name: team.team_name,
    }));

    return teamData;
  } catch (error) {
    console.error('Error fetching team data:', error);
    throw error;
  }
};

//Fetch team logo based on team name
const fetchTeamLogo = async (teamName) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/teams/${encodeURIComponent(teamName)}/logo`);

    if (!response.ok) {
      throw new Error('Failed to fetch team logo');
    }

    const data = await response.json();
    return data.logo;
  } catch (error) {
    console.error('Error fetching team logo:', error);
    throw error;
  }
};

//Fetch team schedule for selected team and season
const fetchTeamSchedule = async (teamId, season) => {
  try {
    const response = await fetch(`${API_ENDPOINT}/games?seasons[]=${season}&team_ids[]=${teamId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch team schedule');
    }

    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error('Error fetching team schedule:', error);
    throw error;
  }
};


export { fetchTeams, fetchTeamLogo, fetchTeamSchedule };
