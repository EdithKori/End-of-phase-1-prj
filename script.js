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

const API_KEY = "443Uro0KeescgFUE6urSaJ8YVjQJJlQARSJwPbDLNZTjbccRDzP4Hggd"; // paste your key here
const gallery = document.querySelector(".gallery");

// Fetch 5 static images
fetch("https://api.pexels.com/v1/search?query=community&per_page=5", {
  headers: {
    Authorization: "443Uro0KeescgFUE6urSaJ8YVjQJJlQARSJwPbDLNZTjbccRDzP4Hggd"
  }
})
  .then(response => response.json())
  .then(data => {
    data.photos.forEach(photo => {
      const img = document.createElement("img");
      img.src = photo.src.medium;
      img.alt = photo.photographer;
      gallery.appendChild(img);
    });
  })
  .catch(error => console.error("Error fetching images:", error));
