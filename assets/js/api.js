// API Key & URLs
const API_KEY = "6b78031a4d87a74298f26c2a0ad8b963";
const API_URL_LIVE = "https://v3.football.api-sports.io/fixtures?live=all";
const API_URL_UPCOMING = "https://v3.football.api-sports.io/fixtures?season=2025&next=5&timezone=UTC";

// Elements
const liveMatchContainer = document.querySelector(".hot-match-container");
const upcomingMatchContainer = document.getElementById("m2-matchesWrapper");

// Club Short Codes (Static Fallback)
const clubShortNames = {
    "Liverpool": "LIV",
    "Chelsea": "CHE",
    "Manchester United": "MUN",
    "Manchester City": "MCI",
    "Arsenal": "ARS",
    "Tottenham": "TOT",
    "Newcastle": "NEW",
    "Aston Villa": "ASV",
    "Crystal Palace": "CRY",
    "Barcelona": "BAR",
    "Real Madrid": "RMA",
    "Bayern Munich": "BAY",
    "Borussia Dortmund": "DOR",
    "Juventus": "JUV",
    "Inter Milan": "INT",
    "AC Milan": "MIL",
    "Paris Saint-Germain": "PSG"
};

// Fetch Matches
async function fetchMatches() {
    try {
        const [liveResponse, upcomingResponse] = await Promise.all([
            fetch(API_URL_LIVE, { method: "GET", headers: { "x-apisports-key": API_KEY } }),
            fetch(API_URL_UPCOMING, { method: "GET", headers: { "x-apisports-key": API_KEY } })
        ]);

        if (!liveResponse.ok || !upcomingResponse.ok) {
            throw new Error("Failed to fetch matches");
        }

        const liveData = await liveResponse.json();
        const upcomingData = await upcomingResponse.json();

        displayMatches(liveData.response, upcomingData.response);
    } catch (error) {
        console.error("Error fetching matches:", error);
    }
}

// Get Club Short Name (Fallback to First 3 Letters if Missing)
function getClubShortName(team) {
    return team.code && team.code.trim() !== ""
        ? team.code
        : clubShortNames[team.name] || team.name.substring(0, 3).toUpperCase();
}

// Display Matches
function displayMatches(liveMatches, upcomingMatches) {
    liveMatchContainer.innerHTML = liveMatches.length > 0
        ? liveMatches.map(generateMatchCard).join("")
        : "<p style='color:white;'>No live matches currently</p>";

    upcomingMatchContainer.innerHTML = upcomingMatches.length > 0
        ? upcomingMatches.map(generateMatchBox).join("")
        : "<p style='color:white;'>No upcoming matches</p>";
}

// Generate Live Match Card
function generateMatchCard(match) {
    const league = match.league.name;
    const time = new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = new Date(match.fixture.date).toLocaleDateString();

    const homeTeam = getClubShortName(match.teams.home);
    const awayTeam = getClubShortName(match.teams.away);

    const homeScore = match.goals.home !== null ? match.goals.home : "| VS |";
    const awayScore = match.goals.away !== null ? match.goals.away : "| VS |";

    return `
        <div class="match-card">
            <div class="match-info">
                <span>${league}</span>
                <span>${time} - ${date}</span>
            </div>
            <div class="teams">
                <div class="team">
                    <img src="${match.teams.home.logo}" alt="${homeTeam}">
                    ${homeTeam}
                </div>
                <span class="vs">${homeScore} - ${awayScore}</span>
                <div class="team">
                    ${awayTeam}
                    <img src="${match.teams.away.logo}" alt="${awayTeam}">
                </div>
            </div>
        </div>
    `;
}

// Generate Upcoming Match Box
function generateMatchBox(match) {
    const league = match.league.name;
    const time = new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = new Date(match.fixture.date).toLocaleDateString();

    const homeTeam = getClubShortName(match.teams.home);
    const awayTeam = getClubShortName(match.teams.away);

    return `
        <div class="m2-match-box">
            <div class="m2-match-info">
                <span>${time} - ${date}</span>
                <span>${league}</span>
            </div>
            <div class="m2-teams-container">
                <div class="m2-team-details">
                    <img src="${match.teams.home.logo}" alt="${homeTeam}">
                    <span>${homeTeam}</span>
                </div>
                <span class="m2-match-vs">| VS |</span>
                <div class="m2-team-details">
                    <span>${awayTeam}</span>
                    <img src="${match.teams.away.logo}" alt="${awayTeam}">
                </div>
            </div>
            <button class="m2-watch-now">Watch Now</button>
        </div>
    `;
}

// Run Fetch on Page Load
document.addEventListener("DOMContentLoaded", fetchMatches);