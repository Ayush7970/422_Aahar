// Optional: Clear localStorage if ?reset=true is in the URL
if (window.location.search.includes("reset=true")) {
  localStorage.removeItem("listings");
  location.href = "index.html"; // reload without the query string
}




document.addEventListener("DOMContentLoaded", function () {
  console.log("Desktop prototype loaded on full screen");

  const listingsContainer = document.querySelector(".listings-container");

  const defaultListings = [
    {
      id: 1,
      name: "Burger",
      quantity: 2,
      sold: 10,
      expiry: "2025-03-09",
      time: "23:00",
      price: "$3.99",
      image: "images/burger.jpg",
      street: "12 King St",
      city: "Chicago",
      zipcode: "60601",
      diet: "Non-Veg",
      comments: "Grilled beef burger with cheese and pickles"
    },
    {
      id: 2,
      name: "Pizza",
      quantity: 2,
      sold: 10,
      expiry: "2025-03-09",
      time: "23:00",
      price: "$3.99",
      image: "images/pizza.jpg",
      street: "45 Maple Ave",
      city: "Chicago",
      zipcode: "60602",
      diet: "Veg",
      comments: "Cheese burst pizza with capsicum and olives"
    },
    {
      id: 3,
      name: "Butter Chicken",
      quantity: 2,
      sold: 10,
      expiry: "2025-03-09",
      time: "23:00",
      price: "$3.99",
      image: "images/butterchicken.jpg",
      street: "78 Curry Lane",
      city: "Chicago",
      zipcode: "60603",
      diet: "Non-Veg",
      comments: "Spicy butter chicken with creamy gravy"
    },
    {
      id: 4,
      name: "Chocolate Cake",
      quantity: 2,
      sold: 10,
      expiry: "2025-03-09",
      time: "23:00",
      price: "$3.99",
      image: "images/chocolate_cake.webp",
      street: "92 Sweet Blvd",
      city: "Chicago",
      zipcode: "60604",
      diet: "Veg",
      comments: "Rich chocolate layered cake"
    },
    {
      id: 5,
      name: "Sandwich",
      quantity: 2,
      sold: 10,
      expiry: "2025-03-09",
      time: "23:00",
      price: "$3.99",
      image: "images/sandwhich.jpg",
      street: "8 Bread St",
      city: "Chicago",
      zipcode: "60605",
      diet: "Veg",
      comments: "Veggie sandwich with lettuce and tomato"
    },
    {
      id: 6,
      name: "Strawberry Milkshake",
      quantity: 2,
      sold: 10,
      expiry: "2025-03-09",
      time: "23:00",
      price: "$3.99",
      image: "images/Strawberry-Milk.jpg",
      street: "33 Smoothie Rd",
      city: "Chicago",
      zipcode: "60606",
      diet: "Veg",
      comments: "Chilled strawberry milkshake with whipped cream"
    },
    {
      id: 7,
      name: "Taco",
      quantity: 2,
      sold: 10,
      expiry: "2025-03-09",
      time: "23:00",
      price: "$3.99",
      image: "images/taco.webp",
      street: "66 Salsa Ave",
      city: "Chicago",
      zipcode: "60607",
      diet: "Non-Veg",
      comments: "Spicy chicken taco with lettuce and cheese"
    },
    {
      id: 8,
      name: "Burger",
      quantity: 2,
      sold: 10,
      expiry: "2025-03-09",
      time: "23:00",
      price: "$3.99",
      image: "images/burger.jpg",
      street: "12 King St",
      city: "Chicago",
      zipcode: "60601",
      diet: "Non-Veg",
      comments: "Double patty with crispy bacon"
    }
  ];

  // Save to localStorage only if not already saved
  if (!localStorage.getItem("listings")) {
    localStorage.setItem("listings", JSON.stringify(defaultListings));
  }

  let listings = JSON.parse(localStorage.getItem("listings"));

  listingsContainer.innerHTML = "";

  listings.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("listing");
    div.innerHTML = `
      <a href="food_detail.html"><img src="${item.image}" alt="${item.name}"></a>
      <div class="info">
        <h3>${item.name}</h3>
        <p>Available Quantity: <button class="qty-btn">-</button> <span class="qty">${item.quantity}</span> <button class="qty-btn">+</button></p>
        <p>Total Sold: <strong>${item.sold}</strong></p>
        <p>Expiry: <strong>${item.expiry} – ${item.time}</strong></p>
        <p class="price">${item.price}</p>
        <button class="add" data-id="${item.id}">EDIT</button>
      </div>
    `;
    listingsContainer.appendChild(div);
  });

  // Re-bind buttons after rendering
  document.querySelectorAll("button.add").forEach(button => {
    button.addEventListener("click", function () {
      const id = parseInt(this.dataset.id);
      const item = listings.find(l => l.id === id);
      localStorage.setItem("editingItem", JSON.stringify(item));
      window.location.href = "confirm.html";
    });
  });

  listingsContainer.querySelectorAll(".listing").forEach(listing => {
    const qtyBtns = listing.querySelectorAll(".qty-btn");
    const qtySpan = listing.querySelector(".qty");

    qtyBtns[0].addEventListener("click", () => {
      let val = parseInt(qtySpan.textContent);
      if (val > 0) qtySpan.textContent = val - 1;
    });

    qtyBtns[1].addEventListener("click", () => {
      let val = parseInt(qtySpan.textContent);
      qtySpan.textContent = val + 1;
    });
  });
});
