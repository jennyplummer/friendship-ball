// app.js
import playerArray from './players.js';

const tableBody = document.querySelector('#data-table tbody');

function populateTable() {
  playerArray.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.weight}</td>
    `;
    tableBody.appendChild(row);
  });
}

populateTable();
