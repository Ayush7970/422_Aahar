document.addEventListener("DOMContentLoaded", () => {
    console.log("Home page loaded.");
    const saveBtn = document.querySelector(".account-card button");
    saveBtn.addEventListener("click", () => {
      alert("Changes saved (mock behavior).");
    });
  });
  