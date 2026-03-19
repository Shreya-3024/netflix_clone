// ===== Check Login Status =====
window.addEventListener("load", () => {
  const user = localStorage.getItem("netflixUser");
  
  if (!user) {
    // User not logged in, redirect to login
    window.location.href = "login.html";
    return;
  }

  // User is logged in, display welcome message
  const userData = JSON.parse(user);
  showNotification(`Welcome back, ${userData.name}! 🎬`);

  // Update profile name in navbar
  updateProfileInfo(userData);
});

// ===== Update Profile Information =====
function updateProfileInfo(userData) {
  // Store user data globally for later access
  window.currentUser = userData;
}

// ===== Navbar Scroll Effect =====
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== Logo Click Handler =====
const logo = document.querySelector(".logo");
if (logo) {
  logo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== Navigation Links Handler =====
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const section = link.getAttribute("data-section");
    filterContent(section);
  });
});

// ===== Filter Content Function =====
function filterContent(section) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((sec) => {
    sec.style.opacity = "0.3";
    sec.style.pointerEvents = "none";
  });

  // Show relevant sections based on filter
  const titles = {
    home: ["Trending Now", "Only On Netflix", "Popular On Netflix", "Recommended For You", "WWE Latest"],
    tvshows: ["Only On Netflix", "Recommended For You"],
    movies: ["Only On Netflix [BOLLYWOOD]", "Only On Netflix [SOUTH MOVIES]"],
    popular: ["Trending Now", "Popular On Netflix"],
    mylist: []
  };

  const showTitles = titles[section] || [];
  
  if (section === "mylist") {
    showNotification("Opening My Lists... 📋");
    showMyLists();
  } else {
    sections.forEach((sec) => {
      const title = sec.querySelector(".section-title");
      if (title && showTitles.some((t) => title.textContent.includes(t))) {
        sec.style.opacity = "1";
        sec.style.pointerEvents = "auto";
      } else {
        sec.style.display = "none";
      }
    });

    const messages = {
      home: "Home - Browse all content 🏠",
      tvshows: "TV Shows - Explore all series 📺",
      movies: "Movies - Watch movies 🎬",
      popular: "New & Popular - What's trending! 🔥"
    };
    
    showNotification(messages[section] || "Loading...");
    
    // Scroll to content smoothly
    setTimeout(() => {
      const contentSection = document.querySelector(".content-section");
      if (contentSection) {
        contentSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  }
}

// ===== Show My Lists =====
function showMyLists() {
  const savedItems = JSON.parse(localStorage.getItem("myList")) || [];
  if (savedItems.length === 0) {
    showNotification("Your list is empty! Add some content. 📭");
  } else {
    showNotification(`You have ${savedItems.length} items in your list! 📋`);
  }
}

// ===== Footer Links Handler =====
function handleFooterClick(event) {
  event.preventDefault();
  const linkText = event.target.textContent.trim();
  
  const pages = {
    "Audio Description": "audio-description.html",
    "Investor Relations": "investor.html",
    "Legal Notices": "legal.html",
    "Help Center": "help.html",
    "Jobs": "jobs.html",
    "Cookie Preferences": "cookies.html",
    "Gift Cards": "gifts.html",
    "Terms of Use": "terms.html",
    "Corporate Information": "corporate.html",
    "Media Center": "media.html",
    "Privacy": "privacy.html",
    "Contact Us": "contact.html"
  };
  
  const page = pages[linkText];
  if (page) {
    showNotification(`Opening: ${linkText} ℹ️`);
    console.log(`Would open: ${page}`);
  }
}

// ===== Service Code Button =====
const serviceCode = document.querySelector(".service-code");
if (serviceCode) {
  serviceCode.addEventListener("click", () => {
    showNotification("Service Code: NX-NETFLIX-2024 📲");
    navigator.clipboard.writeText("NX-NETFLIX-2024").then(() => {
      console.log("Service code copied!");
    });
  });
}

// ===== Notification System =====
function showNotification(message) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: rgba(229, 9, 20, 0.9);
    color: white;
    padding: 15px 20px;
    border-radius: 4px;
    font-weight: bold;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    font-size: 14px;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ===== Search Functionality =====
const searchIcon = document.querySelector(".navbar-right i:first-child");
const searchModal = document.getElementById("searchModal");
const searchInput = document.querySelector(".search-input");
const closeSearch = document.getElementById("closeSearch");

searchIcon.addEventListener("click", () => {
  searchModal.classList.add("active");
  searchInput.focus();
});

closeSearch.addEventListener("click", () => {
  searchModal.classList.remove("active");
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    searchModal.classList.remove("active");
  }
});

// ===== Notification Dropdown =====
const bellIcon = document.querySelector(".navbar-right i:nth-child(2)");
const notificationDropdown = document.getElementById("notificationDropdown");

bellIcon.addEventListener("click", () => {
  notificationDropdown.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!e.target.closest(".navbar-right") && notificationDropdown.classList.contains("active")) {
    notificationDropdown.classList.remove("active");
  }
});

// ===== Profile Icon Handler - Fixed =====
const profileIcon = document.querySelector(".profile-icon");
if (profileIcon) {
  profileIcon.addEventListener("click", () => {
    window.location.href = "profile.html";
  });
}

// ===== Movie Card Interactions =====
const movieCards = document.querySelectorAll(".content-card");

movieCards.forEach((card) => {
  let hoverTimer;

  card.addEventListener("mouseenter", () => {
    hoverTimer = setTimeout(() => {
      card.style.transform = "scale(1.1)";
      card.style.zIndex = "50";
    }, 100);
  });

  card.addEventListener("mouseleave", () => {
    clearTimeout(hoverTimer);
    card.style.transform = "scale(1)";
    card.style.zIndex = "10";
  });

  // Click handler for play button
  const playBtn = card.querySelector(".play-btn");
  if (playBtn) {
    playBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const title = card.querySelector(".overlay-title").textContent;
      showNotification(`Playing: ${title} ▶️`);
      console.log("Playing video:", title);
    });
  }

  // Click handler for add to list button
  const checkBtn = card.querySelector(".check-btn");
  if (checkBtn) {
    checkBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const title = card.querySelector(".overlay-title").textContent;
      
      // Add to My List
      let myList = JSON.parse(localStorage.getItem("myList")) || [];
      if (!myList.includes(title)) {
        myList.push(title);
        localStorage.setItem("myList", JSON.stringify(myList));
        checkBtn.style.background = "rgba(229, 9, 20, 0.7)";
        showNotification(`Added "${title}" to My List ✓`);
        setTimeout(() => {
          checkBtn.style.background = "rgba(255, 255, 255, 0.1)";
        }, 500);
      } else {
        showNotification(`"${title}" already in your list!`);
      }
    });
  }

  // Click handler for thumbs up button
  const thumbsBtn = card.querySelector(".thumbs-btn");
  if (thumbsBtn) {
    thumbsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      thumbsBtn.style.transform = "scale(1.3)";
      showNotification("Liked! 👍");
      setTimeout(() => {
        thumbsBtn.style.transform = "scale(1)";
      }, 300);
    });
  }

  // Click handler for more info button
  const moreBtn = card.querySelector(".more-btn");
  if (moreBtn) {
    moreBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const title = card.querySelector(".overlay-title").textContent;
      showNotification(`More info: ${title} ℹ️`);
      console.log("More info for:", title);
    });
  }
});

// ===== Hero Button Interactions =====
const playButton = document.querySelector(".btn-play");
const moreInfoButton = document.querySelector(".btn-more-info");

if (playButton) {
  playButton.addEventListener("click", () => {
    const heroTitle = document.querySelector(".hero-title").textContent;
    showNotification(`Playing: ${heroTitle} ▶️`);
    console.log("Playing featured content:", heroTitle);
  });
}

if (moreInfoButton) {
  moreInfoButton.addEventListener("click", () => {
    const heroTitle = document.querySelector(".hero-title").textContent;
    showNotification(`Showing details: ${heroTitle} ℹ️`);
    console.log("Showing details about:", heroTitle);
  });
}

// ===== Smooth Scrolling for Sections =====
const contentRows = document.querySelectorAll(".content-row");

contentRows.forEach((row) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  row.addEventListener("mousedown", (e) => {
    isDown = true;
    row.style.cursor = "grabbing";
    startX = e.pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
  });

  row.addEventListener("mouseleave", () => {
    isDown = false;
    row.style.cursor = "grab";
  });

  row.addEventListener("mouseup", () => {
    isDown = false;
    row.style.cursor = "grab";
  });

  row.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - row.offsetLeft;
    const walk = (x - startX) * 2;
    row.scrollLeft = scrollLeft - walk;
  });

  row.addEventListener("touchstart", (e) => {
    isDown = true;
    startX = e.touches[0].pageX - row.offsetLeft;
    scrollLeft = row.scrollLeft;
  });

  row.addEventListener("touchend", () => {
    isDown = false;
  });

  row.addEventListener("touchmove", (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - row.offsetLeft;
    const walk = (x - startX) * 2;
    row.scrollLeft = scrollLeft - walk;
  });
});

// ===== Search Functionality =====
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  if (searchTerm.length > 0) {
    console.log(`Searching for: ${searchTerm}`);
  }
});

// ===== Add dark overlay on scroll =====
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero && window.scrollY > 0) {
    hero.style.opacity = String(Math.max(0.3, 1 - window.scrollY / 1000));
  }
});

// ===== Add animations to CSS =====
const style = document.createElement("style");
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
