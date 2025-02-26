window.addEventListener("load", function() {
            setTimeout(() => {
                document.getElementById("preloader").style.display = "none";
                document.querySelector(".content").style.display = "block";
            }, 1500); // Delay for effect
        });
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.getElementById("backToTop");

    // Show the button when scrolling down
    window.addEventListener("scroll", function () {
        if (window.scrollY > 120) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    });

    // Smooth scroll to top when clicked
    backToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
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
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items first
            document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('active');
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});