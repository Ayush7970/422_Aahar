// Basic script for any interactive behaviors
document.addEventListener("DOMContentLoaded", function () {
    console.log("Desktop prototype loaded on full screen");
  
    // Example: Adding a click event to all ADD buttons
    const addButtons = document.querySelectorAll("button.add");
    addButtons.forEach(button => {
      button.addEventListener("click", function () {
        alert("This is a prototype. Functionality will be implemented later.");
      });
    });
  });
  