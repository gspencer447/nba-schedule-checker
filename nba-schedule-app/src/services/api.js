const API_ENDPOINT = "https://api-basketball.p.rapidapi.com/";
const API_KEY = "5b088115ddmsh65fcfa839e36641p124197jsnf900e94af342";

const fetchTeams = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}/teams?api_key=${API_KEY}`);

    if (!response.ok) {
      throw new Error("Failed to fetch team data");
    }

    const data = await response.json();
    const teamData = data.map((team) => ({
      id: team.id,
      name: team.team_name,
      logo: team.logo,
    }));

    return teamData;
  } catch (error) {
    console.error("Error fetching team data:", error);
    throw error;
  }
};

const fetchSchedule = async (teamId, season) => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/schedule?teamId=${teamId}&season=${season}`,
      {
        headers: {
          "X-API-Key": API_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch team schedule");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching team schedule:", error);
    throw error;
  }
};

export { fetchTeams, fetchSchedule };
