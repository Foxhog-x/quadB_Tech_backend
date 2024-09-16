require("dotenv").config();

document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

function fetchData() {
  fetch(`https://quad-b-tech-backend-one.vercel.app/dashboard/api/crypto-data`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.selectedCoin);
      populateTable(data.selectedCoin);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function populateTable(data) {
  console.log(data);
  const tableBody = document.getElementById("table-body");

  tableBody.innerHTML = "";

  data.forEach((item, index) => {
    const row = document.createElement("tr");

    let priceDifference = "N/A";
    if (item.open && item.open > 0) {
      priceDifference =
        (((item.last - item.open) / item.open) * 100).toFixed(2) + "%";
    }

    row.innerHTML = `
    <td>${index + 1}</td>
    <td>${item.name}</td> <!-- Platform (e.g., "BAT/INR") -->
    <td>${item.last}</td> <!-- Last Traded Price -->
    <td>${item.buy} / ${item.sell}</td> <!-- Buy/Sell Price -->
    <td style="color: ${item.last > item.open ? "#28a745" : "#dc3545"}">
        <i class="fas fa-caret-${
          item.last > item.open ? "up" : "down"
        } icon_spacing"></i>
        ${priceDifference}
    </td>
    <td>${item.volume}</td> <!-- Volume (as savings) -->
  `;

    tableBody.appendChild(row);
  });
}
