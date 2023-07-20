const API_ENDPOINT = "https://v1.basketball.api-sports.io";
const API_KEY = "a30021099806b46a204e47d812231081";

//Function to fetch NBA teams
const fetchTeams = async () => {
  try {
    let myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", API_KEY);
      myHeaders.append("x-rapidapi-host", "v1.basketball.api-sports.io");
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
    const response = await fetch(`${API_ENDPOINT}/teams?season=2021&league=12`, 
    requestOptions);
    console.log(response)
    if (!response.ok) {
      throw new Error('Failed to fetch team data');
    }

    const data = await response.json();
    console.log(data)
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
    const response = await fetch(`${API_ENDPOINT}/teams/${encodeURIComponent(teamName)}/logo`, {
      headers: {
        'X-API-Key': API_KEY,
      },
    });

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
    const response = await fetch(`${API_ENDPOINT}/teams/${teamId}/schedule?season=${season}&api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error('Failed to fetch team schedule');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching team schedule:', error);
    throw error;
  }
};


export { fetchTeams, fetchTeamLogo, fetchTeamSchedule };
