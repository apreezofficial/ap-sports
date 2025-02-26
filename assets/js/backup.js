
  document.addEventListener("DOMContentLoaded", function() {
    const chatButton = document.getElementById("chatButton");
    const chatPopup = document.getElementById("chatPopup");
  
    if (!chatButton || !chatPopup) {
      console.error("Chat button or popup not found.");
      return;
    }
  
    // Toggle chat popup visibility
    chatButton.addEventListener("click", function(event) {
      event.stopPropagation();
      chatPopup.classList.toggle("active");
  
      // Change button text and disable scrolling when active
      if (chatPopup.classList.contains("active")) {
        chatButton.innerHTML = "&#10060;"; // ❌ Unicode for cancel icon
        document.body.style.overflow = "hidden"; // Disable scrolling
      } else {
        chatButton.innerHTML = "&#128172;"; // 💬 Unicode for chat icon
        document.body.style.overflow = ""; // Enable scrolling
      }
    });
  
    // Close chat popup when clicking outside of it
    window.addEventListener("click", function(event) {
      if (!chatPopup.contains(event.target) && event.target !== chatButton) {
        if (chatPopup.classList.contains("active")) {
          chatPopup.classList.remove("active");
          chatButton.innerHTML = "&#128172;"; // Reset to chat icon 💬
          document.body.style.overflow = "";
        }
      }
    });
  });
  
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll(".transition-link");
    const loadingBar = document.getElementById("loadingBar");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent normal page load
            const targetUrl = this.href; // Get the link URL

            // Start loading animation
            loadingBar.style.width = "100%";

            // Simulate a page loading delay (e.g., 1s)
            setTimeout(() => {
                window.location.href = targetUrl; // Load the new page
            }, 700);
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
  const priceButtons = document.querySelectorAll(".price-button");
  const paymentSection = document.getElementById("payment-section");
  const planDetails = document.getElementById("plan-details");
  const discountField = document.getElementById("discount");
  const totalField = document.getElementById("total-price");

  priceButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Reset all buttons
      priceButtons.forEach(btn => {
        btn.textContent = "Buy now";
        btn.classList.remove("selected-plan");
      });

      // Update the clicked button
      this.textContent = "Selected";
      this.classList.add("selected-plan");

      // Extract plan details
      let months = this.getAttribute("data-months");
      let price = parseFloat(this.getAttribute("data-price"));
      let discount = parseFloat(this.getAttribute("data-discount"));
      let discountAmount = (price * discount) / 100;
      let totalPrice = price - discountAmount;

      // Fill in payment section
      planDetails.textContent = `${months} Month - $${price}`;
      discountField.textContent = `-${discountAmount.toFixed(2)}`;
      totalField.textContent = `$${totalPrice.toFixed(2)}`;

      // Scroll to payment section
      paymentSection.scrollIntoView({ behavior: "smooth" });
    });
  });
});
document.addEventListener("DOMContentLoaded", function() {
  const elements = document.querySelectorAll(".pricing-card, .payment-box");

  function handleScroll() {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Run initially in case elements are already in view

  // Scroll to payment box when plan is selected
  const planButtons = document.querySelectorAll(".buy-now");
  const paymentBox = document.querySelector(".payment-box");

  planButtons.forEach((button) => {
    button.addEventListener("click", function() {
      paymentBox.classList.add("active");
      paymentBox.scrollIntoView({ behavior: "smooth" });
    });
  });
});

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
        alert("Please fill in all fields.");
        return;
    }

    // Simulate form submission (replace this with actual backend integration)
    alert(`Thank you, ${name}! Your message has been sent.`);
    this.reset(); // Clear the form
});