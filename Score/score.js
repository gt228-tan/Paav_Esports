
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxePPblp4M3iKOiVWWtTMoElSedm0aApqj5W7mjbeh7RoTgdUMNRsaXQwlCPdKJw33A/exec";

document.addEventListener("DOMContentLoaded", () => {
  fetchMatchData();
});

async function fetchMatchData() {
  const loadingEl = document.getElementById("loading-state");
  const errorEl = document.getElementById("error-state");
  const contentEl = document.getElementById("matches-content");

  loadingEl.style.display = "block";
  errorEl.style.display = "none";
  contentEl.style.display = "none";

  try {
    // Try fetch first (works when hosted on a server)
    let json;
    try {
      const response = await fetch(APPS_SCRIPT_URL, { redirect: "follow" });
      const text = await response.text();
      console.log("Raw response:", text);
      json = JSON.parse(text);
    } catch (fetchErr) {
      console.warn("Fetch failed, trying JSONP fallback:", fetchErr);
      // JSONP fallback for file:// or CORS issues
      json = await fetchViaJSONP(APPS_SCRIPT_URL);
    }

    if (!json.success) throw new Error(json.error || "Failed to load data");

    const matches = json.data;
    console.log("Matches loaded:", matches);

    const completed = matches.filter(m => m.status === "completed");
    const ongoing = matches.filter(m => m.status === "ongoing");
    const upcoming = matches.filter(m => m.status === "upcoming");

    document.getElementById("stat-total").textContent = matches.length;
    document.getElementById("stat-completed").textContent = completed.length;
    document.getElementById("stat-ongoing").textContent = ongoing.length;
    document.getElementById("stat-upcoming").textContent = upcoming.length;

    renderSection("ongoing-grid", ongoing, "ongoing");
    renderSection("completed-grid", completed, "completed");
    renderSection("upcoming-grid", upcoming, "upcoming");

    toggleEmptyState("ongoing", ongoing.length);
    toggleEmptyState("completed", completed.length);
    toggleEmptyState("upcoming", upcoming.length);

    loadingEl.style.display = "none";
    contentEl.style.display = "block";

  } catch (err) {
    console.error("Fetch error:", err);
    loadingEl.style.display = "none";
    errorEl.style.display = "block";
    document.getElementById("error-message").textContent = err.message;
  }
}

// JSONP fallback — injects a script tag to bypass CORS
function fetchViaJSONP(url) {
  return new Promise((resolve, reject) => {
    const callbackName = "paavCallback_" + Date.now();
    const script = document.createElement("script");

    window[callbackName] = function (data) {
      resolve(data);
      delete window[callbackName];
      document.body.removeChild(script);
    };

    script.onerror = () => {
      reject(new Error("JSONP request failed"));
      delete window[callbackName];
      document.body.removeChild(script);
    };

    script.src = url + (url.includes("?") ? "&" : "?") + "callback=" + callbackName;
    document.body.appendChild(script);

    setTimeout(() => {
      if (window[callbackName]) {
        reject(new Error("Request timed out"));
        delete window[callbackName];
        if (script.parentNode) document.body.removeChild(script);
      }
    }, 15000);
  });
}

function toggleEmptyState(category, count) {
  const emptyEl = document.getElementById(`${category}-empty`);
  const gridEl = document.getElementById(`${category}-grid`);
  if (count === 0) {
    emptyEl.style.display = "block";
    gridEl.style.display = "none";
  } else {
    emptyEl.style.display = "none";
    gridEl.style.display = "grid";
  }
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[d.getDay()]} : ${months[d.getMonth()]} ${d.getDate()} ${d.getFullYear()}`;
}

function renderSection(containerId, matches, status) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  matches.forEach(match => {
    const card = createMatchCard(match, status);
    container.appendChild(card);
  });
}

function createMatchCard(match, status) {
  const card = document.createElement("div");
  card.className = `match-card match-${status}`;

  // Count maps won by each team
  let team1MapsWon = 0;
  let team2MapsWon = 0;

  if (match.maps && match.maps.length > 0) {
    match.maps.forEach(map => {
      if (map.team1Score !== null && map.team2Score !== null) {
        if (Number(map.team1Score) > Number(map.team2Score)) team1MapsWon++;
        else if (Number(map.team2Score) > Number(map.team1Score)) team2MapsWon++;
      }
    });
  }

  let team1Class = "";
  let team2Class = "";
  let resultText = "";

  if (status === "completed" && (team1MapsWon + team2MapsWon) > 0) {
    if (team1MapsWon > team2MapsWon) {
      team1Class = "winner";
      team2Class = "loser";
      resultText = `${match.team1} wins!`;
    } else if (team2MapsWon > team1MapsWon) {
      team1Class = "loser";
      team2Class = "winner";
      resultText = `${match.team2} wins!`;
    } else {
      resultText = "Draw";
    }
  }

  // Per-map scoreboard
  let mapsHTML = "";
  if (match.maps && match.maps.length > 0) {
    const mapRows = match.maps.map(map => {
      const t1 = map.team1Score !== null ? map.team1Score : "–";
      const t2 = map.team2Score !== null ? map.team2Score : "–";

      let t1Class = "";
      let t2Class = "";
      if (map.team1Score !== null && map.team2Score !== null) {
        if (Number(map.team1Score) > Number(map.team2Score)) {
          t1Class = "map-win";
          t2Class = "map-loss";
        } else if (Number(map.team2Score) > Number(map.team1Score)) {
          t1Class = "map-loss";
          t2Class = "map-win";
        }
      }

      return `
        <div class="map-row">
          <span class="map-name">${map.name}</span>
          <div class="map-scores">
            <span class="map-score ${t1Class}">${t1}</span>
            <span class="map-divider">:</span>
            <span class="map-score ${t2Class}">${t2}</span>
          </div>
        </div>`;
    }).join("");

    mapsHTML = `
      <div class="match-maps-detail">
        <div class="maps-header-row">
          <span class="maps-label">MAP</span>
          <div class="maps-teams-label">
            <span>${match.team1 || "T1"}</span>
            <span>${match.team2 || "T2"}</span>
          </div>
        </div>
        ${mapRows}
      </div>`;
  }

  // Maps won score display
  let scoreHTML = "";
  if (status === "completed" && (team1MapsWon + team2MapsWon) > 0) {
    scoreHTML = `
      <div class="match-score-display">
        <span class="score ${team1Class}">${team1MapsWon}</span>
        <span class="score-divider">—</span>
        <span class="score ${team2Class}">${team2MapsWon}</span>
      </div>`;
  } else if (status === "ongoing") {
    scoreHTML = `<div class="match-score-display"><span class="score-live">🔴 LIVE</span></div>`;
  } else {
    scoreHTML = `<div class="match-score-display"><span class="score-tbd">TBD</span></div>`;
  }

  // YouTube link
  const ytLink = match.ytLink
    ? `<div class="match-yt-link">
        <a href="${match.ytLink}" target="_blank" class="yt-link-btn">
          <span class="yt-icon">▶️</span>
          <span>WATCH ON YOUTUBE</span>
        </a>
      </div>`
    : "";

  const statusBadge = `<span class="status-badge status-${status}">${status.toUpperCase()}</span>`;

  card.innerHTML = `
    <div class="match-card-header">
      <div class="match-info">
        <span class="match-number">MATCH ${match.matchNo}</span>
        ${match.date ? `<span class="match-date">${formatDate(match.date)}</span>` : ""}
      </div>
      ${statusBadge}
    </div>
    <div class="match-teams">
      <div class="team ${team1Class}">
        <span class="team-icon">⚔️</span>
        <span class="team-name">${match.team1 || "TBD"}</span>
      </div>
      <span class="vs-badge">VS</span>
      <div class="team ${team2Class}">
        <span class="team-icon">🛡️</span>
        <span class="team-name">${match.team2 || "TBD"}</span>
      </div>
    </div>
    ${scoreHTML}
    ${resultText ? `<div class="match-result">${resultText}</div>` : ""}
    ${mapsHTML}
    ${ytLink}
  `;

  return card;
}
