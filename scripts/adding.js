document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-form");
    const imageInput = document.getElementById("image");
    let newImage = null;
  
    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      // Size check
      if (file.size > 150000) {
        alert("Image too large. Please upload a file under 150 KB.");
        imageInput.value = "";
        return;
      }
  
      // Dimension check
      const img = new Image();
      const reader = new FileReader();
  
      reader.onload = function (event) {
        img.onload = function () {
          if (img.width < 200 || img.height < 200) {
            alert("Image too small. Min size is 200x200.");
            imageInput.value = "";
            return;
          }
          newImage = event.target.result;
        };
        img.src = event.target.result;
      };
  
      reader.readAsDataURL(file);
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      if (!newImage) {
        alert("Please upload a valid image.");
        return;
      }
  
      let listings = JSON.parse(localStorage.getItem("listings")) || [];
  
      const newListing = {
        id: Date.now(), // unique ID
        name: document.getElementById("name").value,
        street: document.getElementById("street").value,
        city: document.getElementById("city").value,
        zipcode: document.getElementById("zipcode").value,
        price: document.getElementById("price").value,
        expiry: document.getElementById("expiry").value,
        time: document.getElementById("time").value,
        quantity: parseInt(document.getElementById("quantity").value),
        diet: document.getElementById("diet").value,
        comments: document.getElementById("comments").value,
        sold: 0,
        image: newImage
      };
  
      listings.push(newListing);
      localStorage.setItem("listings", JSON.stringify(listings));
  
      alert("Listing added successfully!");
      window.location.href = "index.html";
    });
  });
  