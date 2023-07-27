document.querySelector("#search1").addEventListener("click", function (e) {
  getPlayer(e, 1);
});

document.querySelector("#playerName1").addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getPlayer(e, 1);
  }
});

  function displayErrorMessage(message) {
  const errorMessage = document.querySelector("#errorMessage");
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

function hideErrorMessage() {
  const errorMessage = document.querySelector("#errorMessage");
  errorMessage.style.display = "none";
}

function calculateFriendshipBallerRating(stats) {
      if (!stats || stats.length === 0) {
    return 0;
  }

  const assists = stats.reduce((totalAssists, stat) => totalAssists + stat.ast, 0);
  const minutesPlayed = stats.reduce((totalMinutes, stat) => {
    if (stat.min) {
      const [minutes] = stat.min.split(":").map(Number);
      return totalMinutes + minutes;
    } else {
      return totalMinutes;
    }
  }, 0);

  console.log("Assists:", assists); // Log the total assists for debugging
  console.log("Minutes Played:", minutesPlayed); // Log the total minutes played for debugging

  if (minutesPlayed > 0) {
    return assists / minutesPlayed;
  } else {
    return 0;
  }
}
function getPlayer(e, boxNumber) {
const playerName = document.querySelector(`#playerName${boxNumber}`).value;
const playerBox = document.querySelector(`#playerBox${boxNumber}`);
let player; // Define the player variable in a broader scope

fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Player not found");
    }
    return response.json();
  })
  .then((data) => {
    if (data.data.length > 0) {
      player = data.data[0]; // Assign the player data to the variable
      const playerId = player.id;

      // Fetch player's stats using the player's ID
      return fetch(`https://www.balldontlie.io/api/v1/season_averages?player_ids[]=${playerId}`);
    } else {
      throw new Error("Player not found");
    }
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Player stats not found");
    }
    return response.json();
  })
  .then((statsData) => {
    const stats = statsData.data;

    // Calculate friendshipBallerRating
    const friendshipBallerRating = calculateFriendshipBallerRating(stats);

    const friendshipBallerPercentage = friendshipBallerRating * 100;

    // Display the stats in the playerBox element
    playerBox.innerHTML = `
      <div>
        <h2>${player.first_name} ${player.last_name}</h2>
        <p>Team: ${player.team.full_name}</p>
        <h3>Stats:</h3>
        <ul>
          ${stats.map((stat) => `<li>${stat.season}: ${stat.min} minutes, ${stat.pts} points, ${stat.reb} rebounds, ${stat.ast} assists</li>`).join("")}
        </ul>
        <h3>Friendship Baller Rating:</h3>
        <ul>
        <li>FBR: ${friendshipBallerPercentage.toFixed(0)}%</li>
        </ul>
      </div>
    `;
    hideErrorMessage();
  })
  .catch((err) => {
    console.error(err); // Log the error for debugging
    playerBox.innerHTML = '';
    displayErrorMessage(err.message);
  });

e.preventDefault();
}
