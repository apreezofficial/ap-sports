document.addEventListener("DOMContentLoaded", function() {
  // "Buy Now" Buttons & Payment Section
  const priceButtons = document.querySelectorAll(".buy-now");
  const paymentSection = document.getElementById("paymentSection");

  // **1. Handle Plan Selection ("Buy Now" → "Selected" & Scroll)**
  function selectPlan(button) {
    priceButtons.forEach(btn => {
      btn.classList.remove("selected");
      btn.textContent = "Buy Now";
    });

    button.classList.add("selected");
    button.textContent = "Selected";

    // **2. Smooth Scroll to Payment Section**
    paymentSection.scrollIntoView({ behavior: "smooth" });
  }

  priceButtons.forEach(button => {
    button.addEventListener("click", function() {
      selectPlan(this);
    });
  });
});
function crypto() {
  document.getElementById("paymsg").innerHTML ="We accept crypto payments (ETH, BTC, USDT, USDC, BNB). Payments may take a few minutes to confirm. Check your email for activation or contact support@apsports.com";
}
function card() {
  document.getElementById("paymsg").innerHTML ="Your account will be automatically updated within a minute or so once you pay. If it doesn't, contact support@apsports.com.";
}