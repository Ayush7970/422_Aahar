document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("edit-form");
    const imageInput = document.getElementById("image");
    let item = JSON.parse(localStorage.getItem("editingItem"));
  
    if (!item) {
      alert("No item selected for editing.");
      window.location.href = "index.html";
      return;
    }
  
    // Pre-fill form fields
    document.getElementById("name").value = item.name || "";
    document.getElementById("street").value = item.street || "";
    document.getElementById("city").value = item.city || "";
    document.getElementById("zipcode").value = item.zipcode || "";
    document.getElementById("price").value = item.price || "";
    document.getElementById("expiry").value = item.expiry || "";
    document.getElementById("time").value = item.time || "";
    // document.getElementById("quantity").value = item.quantity || 1;
    document.getElementById("diet").value = item.diet || "";
    document.getElementById("comments").value = item.comments || "";
  
    // ✅ Image handling
    let newImage = null;
  
    imageInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
  
      // ✅ Check file size
      if (file.size > 150000) {
        alert("Image too large. Please upload a file under 150 KB.");
        imageInput.value = "";
        return;
      }
  
      // ✅ Check image dimensions
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = new Image();
        img.onload = function () {
          if (img.width < 200 || img.height < 200) {
            alert("Image too small. Please upload an image at least 200x200 pixels.");
            imageInput.value = "";
            return;
          }
  
          // ✅ All good — save base64 string
          newImage = event.target.result;
        };
        img.src = event.target.result;
      };
  
      reader.readAsDataURL(file);
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const updatedItem = {
        ...item,
        name: document.getElementById("name").value,
        street: document.getElementById("street").value,
        city: document.getElementById("city").value,
        zipcode: document.getElementById("zipcode").value,
        price: document.getElementById("price").value,
        expiry: document.getElementById("expiry").value,
        time: document.getElementById("time").value,
        // quantity: item.quantity,
        diet: document.getElementById("diet").value,
        comments: document.getElementById("comments").value,
        image: newImage || item.image // Use new image only if valid
      };
  
      // Update the listings array in localStorage
      let listings = JSON.parse(localStorage.getItem("listings")) || [];
      listings = listings.map(l => l.id === updatedItem.id ? updatedItem : l);
      localStorage.setItem("listings", JSON.stringify(listings));
      localStorage.removeItem("editingItem");
  
      // Redirect to homepage
      window.location.href = "index.html";
    });
  });
  