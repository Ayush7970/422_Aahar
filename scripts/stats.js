


document.addEventListener("DOMContentLoaded", () => {
    const listings = JSON.parse(localStorage.getItem("listings")) || [];
  
    let totalSold = 0;
    let totalRevenue = 0;
    let itemMap = {};
  
    listings.forEach(item => {
      totalSold += item.sold;
      totalRevenue += item.sold * parseFloat(item.price.replace("$", ""));
  
      if (!itemMap[item.name]) {
        itemMap[item.name] = { sold: 0, revenue: 0 };
      }
  
      itemMap[item.name].sold += item.sold;
      itemMap[item.name].revenue += item.sold * parseFloat(item.price.replace("$", ""));
    });

    console.log("Listings loaded:", listings);
    console.log("ItemMap breakdown:", itemMap); 
  
    // Most popular dish
    let popularDish = Object.keys(itemMap).reduce((a, b) =>
  itemMap[a].sold > itemMap[b].sold ? a : b
);

  
    const avgOrder = totalSold ? (totalRevenue / totalSold).toFixed(2) : "0.00";
  
    document.getElementById("total-sold").textContent = totalSold;
    document.getElementById("total-revenue").textContent = `$${totalRevenue.toFixed(2)}`;
    document.getElementById("popular-dish").textContent = `${popularDish} 🍽️`;
    document.getElementById("avg-order").textContent = `$${avgOrder}`;
  
    // Chart.js Bar Chart
    const bar = document.getElementById('barChart').getContext('2d');
    new Chart(bar, {
      type: 'bar',
      data: {
        labels: Object.keys(itemMap),
        datasets: [{
          label: 'Units Sold',
          data: Object.values(itemMap).map(i => i.sold),
          backgroundColor: '#4CAF50',
          hoverBackgroundColor: '#388E3C', // Optional: a darker green on hover


          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: { enabled: true },
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  
    // Chart.js Pie Chart
    const pie = document.getElementById('pieChart').getContext('2d');
    new Chart(pie, {
      type: 'pie',
      data: {
        labels: Object.keys(itemMap),
        datasets: [{
          data: Object.values(itemMap).map(i => i.sold),
          backgroundColor: [
            '#4CAF50', // Green
            '#2196F3', // Blue
            '#FFC107', // Amber
            '#FF5722', // Deep Orange
            '#9C27B0', // Purple
            '#00BCD4', // Cyan
            '#E91E63', // Pink
            '#607D8B', // Blue Grey
            '#795548', // Brown
            '#3F51B5', // Indigo
            '#8BC34A', // Light Green
            '#CDDC39', // Lime
            '#FF9800', // Orange
            '#009688', // Teal
            '#F44336', // Red
            '#673AB7', // Deep Purple
            '#03A9F4', // Light Blue
            '#A1887F', // Muted Brown
            '#C2185B', // Dark Pink
            '#388E3C'  // Dark Green
          ]
        }]
      },
      options: {
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true
    },
    legend: {
      position: 'right',
      labels: {
        boxWidth: 20,
        padding: 15,
        font: {
          size: 16,   // ⬅️ Increase this number to make legend text larger
          weight: 'bold' // Optional: makes the text bolder
        },
        color: '#333' // Optional: darker text color for clarity
      }
    }
  }
}
    });
  });
  