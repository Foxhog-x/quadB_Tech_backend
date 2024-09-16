document.addEventListener("DOMContentLoaded", function () {
  fetchData();
});

function fetchData() {
  fetch("http://localhost:8000/dashboard/api/crypto-data")
    .then((response) => response.json())
    .then((data) => {
      if (data.selectedCoin.length > 0) {
        const mainPrice = data.selectedCoin[0].last;

        document.getElementById("main-price").textContent =
          mainPrice.toLocaleString();
      }
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
    <tr>
            <td style="border-top-left-radius: 14px; border-bottom-left-radius: 14px;">${
              index + 1
            }</td>
            <td>${item.name}</td>  
            <td>₹${item.last}</td>  
            <td>₹${item.buy} / ${item.sell}</td>  
            <td style="color: ${item.last > item.open ? "#28a745" : "#dc3545"}">
                <i class="fas fa-caret-${
                  item.last > item.open ? "up" : "down"
                } icon_spacing"></i>
                ${priceDifference}
            </td>
            <td style="border-top-right-radius: 14px; border-bottom-right-radius: 14px;">₹${
              item.volume
            }</td>
        </tr>
  `;

    tableBody.appendChild(row);
  });
}
