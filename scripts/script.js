// Basic script for any interactive behaviors
document.addEventListener("DOMContentLoaded", function () {
  console.log("Desktop prototype loaded on full screen");

  // Handle ADD buttons
  const addButtons = document.querySelectorAll("button.add");
  addButtons.forEach(button => {
    button.addEventListener("click", function () {
      alert("This is a prototype. Functionality will be implemented later.");
    });
  });

  // Handle quantity increase/decrease buttons
  const listings = document.querySelectorAll('.listing');
  listings.forEach(listing => {
    const qtyButtons = listing.querySelectorAll('.qty-btn');
    let qtySpan = listing.querySelector('.qty');

    // If .qty span doesn't exist, wrap the number inside a span dynamically
    if (!qtySpan) {
      const p = qtyButtons[0].parentElement;
      const qtyText = p.childNodes[2]; // should be the text node with quantity
      const qtyValue = parseInt(qtyText.textContent.trim()) || 0;

      qtySpan = document.createElement('span');
      qtySpan.className = 'qty';
      qtySpan.textContent = qtyValue;

      p.replaceChild(qtySpan, qtyText);
    }

    qtyButtons[0].addEventListener('click', () => {
      let currentQty = parseInt(qtySpan.textContent);
      if (currentQty > 0) qtySpan.textContent = currentQty - 1;
    });

    qtyButtons[1].addEventListener('click', () => {
      let currentQty = parseInt(qtySpan.textContent);
      qtySpan.textContent = currentQty + 1;
    });
  });
});
