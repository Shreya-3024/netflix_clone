// ===== Check Login Status =====
window.addEventListener("load", () => {
  const user = localStorage.getItem("netflixUser");

  if (!user) {
    // Not logged in, redirect to login
    window.location.href = "login.html";
    return;
  }

  // Display user info
  const userData = JSON.parse(user);
  displayUserProfile(userData);
  displayMyList();
});

// ===== Display User Profile =====
function displayUserProfile(userData) {
  document.getElementById("profile-name").textContent = userData.name || "User";
  document.getElementById("profile-email").textContent = userData.email;
  
  // Calculate member since date
  const joinDate = new Date(userData.timestamp);
  document.getElementById("member-date").textContent = joinDate.getFullYear();

  // Fill settings
  document.getElementById("email-setting").value = userData.email;
  document.getElementById("name-setting").value = userData.name || "User";
}

// ===== Display My List =====
function displayMyList() {
  const myList = JSON.parse(localStorage.getItem("myList")) || [];
  const mylistContent = document.getElementById("mylist-content");

  if (myList.length === 0) {
    mylistContent.innerHTML = '<p class="empty-message">Your list is empty. Start adding content!</p>';
    return;
  }

  let html = "";
  myList.forEach((item, index) => {
    html += `
      <div class="list-item" title="${item}">
        <p>${item}</p>
        <button class="btn btn-small" onclick="removeFromList(${index})">Remove</button>
      </div>
    `;
  });

  mylistContent.innerHTML = html;
}

// ===== Remove From List =====
function removeFromList(index) {
  let myList = JSON.parse(localStorage.getItem("myList")) || [];
  const removed = myList.splice(index, 1)[0];
  localStorage.setItem("myList", JSON.stringify(myList));
  showNotification(`Removed "${removed}" from your list`);
  displayMyList();
}

// ===== Clear History =====
document.querySelector(".btn-clear").addEventListener("click", () => {
  if (confirm("Are you sure you want to clear your viewing history?")) {
    localStorage.removeItem("viewingHistory");
    showNotification("Viewing history cleared!");
  }
});

// ===== Preference Changes =====
document.getElementById("auto-play").addEventListener("change", (e) => {
  localStorage.setItem("autoPlay", e.target.checked);
  showNotification(`Autoplay ${e.target.checked ? "enabled" : "disabled"}`);
});

document.getElementById("notifications").addEventListener("change", (e) => {
  localStorage.setItem("notifications", e.target.checked);
  showNotification(`Notifications ${e.target.checked ? "enabled" : "disabled"}`);
});

document.getElementById("hd-streaming").addEventListener("change", (e) => {
  localStorage.setItem("hdStreaming", e.target.checked);
  showNotification(`HD Streaming ${e.target.checked ? "enabled" : "disabled"}`);
});

// ===== Log Out =====
document.getElementById("logout-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to log out?")) {
    localStorage.removeItem("netflixUser");
    showNotification("Logging out...");
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  }
});

// ===== Delete Account =====
document.getElementById("delete-btn").addEventListener("click", () => {
  if (
    confirm(
      "Are you sure you want to delete your account? This action cannot be undone!"
    )
  ) {
    const confirmPassword = prompt("Enter your password to confirm deletion:");
    if (confirmPassword) {
      localStorage.removeItem("netflixUser");
      localStorage.removeItem("myList");
      localStorage.removeItem("viewingHistory");
      showNotification("Account deleted successfully!");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
  }
});

// ===== Remove Device =====
document.querySelectorAll(".device-item .btn-small").forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (confirm("Remove this device?")) {
      btn.parentElement.parentElement.remove();
      showNotification("Device removed!");
    }
  });
});

// ===== Change Password =====
document.querySelectorAll(".security-item .btn-small")[0].addEventListener("click", () => {
  const oldPassword = prompt("Enter your current password:");
  if (oldPassword) {
    const newPassword = prompt("Enter your new password:");
    const confirmPassword = prompt("Confirm your new password:");

    if (newPassword && confirmPassword && newPassword === confirmPassword) {
      if (newPassword.length < 6) {
        showNotification("Password must be at least 6 characters!");
      } else {
        showNotification("Password changed successfully! Γ£ô");
      }
    } else {
      showNotification("Passwords do not match!");
    }
  }
});

// ===== Enable 2FA =====
document.querySelectorAll(".security-item .btn-small")[1].addEventListener("click", () => {
  showNotification("Two-Factor Authentication enabled! Γ£ô");
});

// ===== Logo Click =====
document.querySelector(".navbar-brand img").addEventListener("click", () => {
  window.location.href = "index.html";
});

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
