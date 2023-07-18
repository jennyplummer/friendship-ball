document.querySelector("#search1").addEventListener("click", function (e) {
    getPlayer(e, 1);
  });
  
  document.querySelector("#playerName1").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      getPlayer(e, 1);
    }
  });
  
  document.querySelector("#search2").addEventListener("click", function (e) {
    getPlayer(e, 2);
  });
  
  document.querySelector("#playerName2").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      getPlayer(e, 2);
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
  
  function getPlayer(e, boxNumber) {
    const name = document.querySelector(`#playerName${boxNumber}`).value;
    const playerName = name;
    const playerBox = document.querySelector(`#playerBox${boxNumber}`);
    let player; 
  
    fetch(`https://www.balldontlie.io/api/v1/players?search=${playerName}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Player not found");
        }
        return response.json();
      })
      .then((data) => {
        if (data.data.length > 0) {
          player = data.data[0]; 
          const playerId = player.id;
  
          return fetch(`https://www.balldontlie.io/api/v1/stats?player_ids[]=${playerId}`);
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
  
        playerBox.innerHTML = `
          <div>
            <h2>${player.first_name} ${player.last_name}</h2>
            <p>Team: ${player.team.full_name}</p>
            <h3>Stats:</h3>
            <ul>
              ${stats.map((stat) => `<li>${stat.season}: ${stat.pts} points, ${stat.reb} rebounds, ${stat.ast} assists</li>`).join("")}
            </ul>
          </div>
        `;
        hideErrorMessage();
      })
      .catch((err) => {
        playerBox.innerHTML = '';
        displayErrorMessage(err.message);
      });
  
    e.preventDefault();
  }
  