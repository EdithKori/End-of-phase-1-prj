//we are changing the links colors once each link is clicked
document.querySelectorAll("#nav-links p").forEach(link => {
  link.addEventListener("click", () => {
    // 1. Reset ALL links to default (white or whatever you had before)
    document.querySelectorAll("#nav-links p").forEach(p => {
      p.style.color = ""; // clears inline style → goes back to CSS
    });

    // 2. Highlight the clicked one
    link.style.color = "#f1c40f";
  });
});


// notification function
function showNotification(message, type = "success") {
  const container = document.getElementById("notification-container");

  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.textContent = message;

  container.appendChild(notification);

  // trigger fade-in
  setTimeout(() => notification.classList.add("show"), 10);

  // auto remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 400);
  }, 3000); 
}

// buttons: request + offer help
document.querySelector(".Headline p button:nth-of-type(1)") 
.addEventListener("click", () => showNotification("Request help form coming soon!", "success"));

document.querySelector(".Headline p button:nth-of-type(2)")
.addEventListener("click", () => showNotification("Help is on the way!", "info"));

document.querySelectorAll("#nav-links p").forEach(link => {
  link.addEventListener("click", () => {
    const sectionId = link.textContent.toLowerCase().replace(" ", "-"); 
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Fetch requests from db.json and display them
fetch("http://localhost:3000/requests")
  .then(res => res.json())
  .then(requests => {
    const feed = document.getElementById("community-feed");

    requests.forEach(req => {
      const card = document.createElement("div");
      card.className = "request-card";
      card.innerHTML = `
        <h4>${req.title}</h4>
        <p>${req.description}</p>
        <p><strong>Category:</strong> ${req.category}</p>
        <p><strong>Urgency:</strong> ${req.urgency}</p>
        <p><strong>Status:</strong> ${req.status}</p>
      `;
      feed.appendChild(card);
    });
  })
  .catch(err => console.error("Error loading requests:", err));


// ✨ NEW FEATURE: Back-to-top button behavior
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ✨ NEW FEATURE: Random motivational quotes in footer
const quotes = [
  "Helping one person might not change the world, but it could change the world for one person 🌍",
  "Together, we rise. 🤝",
  "A neighborhood is strongest when neighbors help neighbors 💪",
  "Kindness is free, sprinkle it everywhere ✨"
];

const footer = document.querySelector(".footer-content p");
setInterval(() => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  footer.textContent = randomQuote;
}, 7000); // change every 7 seconds
  

// ✨ NEW FEATURE: Dark mode toggle
const toggleBtn = document.getElementById("darkModeToggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  toggleBtn.textContent = 
    document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
});


// ✨ NEW FEATURE: Toast notifications
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}
