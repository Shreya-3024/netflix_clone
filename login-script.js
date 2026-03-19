// ===== Tab Switching =====
const tabButtons = document.querySelectorAll(".tab-btn");
const loginForms = document.querySelectorAll(".login-form");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabName = btn.getAttribute("data-tab");

    // Remove active class from all tabs and forms
    tabButtons.forEach((b) => b.classList.remove("active"));
    loginForms.forEach((f) => f.classList.remove("active-form"));

    // Add active class to clicked tab and corresponding form
    btn.classList.add("active");
    document.getElementById(tabName + "Form").classList.add("active-form");
  });
});

// ===== Switch Tab Links =====
const switchTabLinks = document.querySelectorAll(".switch-tab");

switchTabLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const tabName = link.getAttribute("data-tab");
    document.querySelector(`[data-tab="${tabName}"]`).click();
  });
});

// ===== Sign In Form Submission =====
const signinForm = document.getElementById("signinForm");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;
  const rememberMe = document.getElementById("remember-me").checked;

  // Validate inputs
  if (!email || !password) {
    showAlert("Please fill in all fields", "error");
    return;
  }

  // Simulate login
  if (password.length < 6) {
    showAlert("Password must be at least 6 characters", "error");
    return;
  }

  // Store user info in localStorage
  localStorage.setItem(
    "netflixUser",
    JSON.stringify({
      email: email,
      name: email.split("@")[0],
      loggedIn: true,
      timestamp: new Date().getTime(),
    })
  );

  if (rememberMe) {
    localStorage.setItem("rememberMe", "true");
  }

  showAlert("Sign in successful! Redirecting...", "success");

  // Redirect to main page after 1 second
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
});

// ===== Register Form Submission =====
const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("register-name").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;
  const agreeTerms = document.getElementById("agree-terms").checked;

  // Validate inputs
  if (!name || !email || !password || !confirm) {
    showAlert("Please fill in all fields", "error");
    return;
  }

  if (password !== confirm) {
    showAlert("Passwords do not match", "error");
    return;
  }

  if (password.length < 6) {
    showAlert("Password must be at least 6 characters", "error");
    return;
  }

  if (!agreeTerms) {
    showAlert("Please agree to Terms of Service", "error");
    return;
  }

  // Store user info
  localStorage.setItem(
    "netflixUser",
    JSON.stringify({
      email: email,
      name: name,
      loggedIn: true,
      timestamp: new Date().getTime(),
    })
  );

  showAlert("Account created successfully! Redirecting...", "success");

  // Redirect after 1 second
  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
});

// ===== Alert Function =====
function showAlert(message, type) {
  const alert = document.createElement("div");
  alert.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    background: ${type === "success" ? "#27ae60" : "#e74c3c"};
    color: white;
    border-radius: 4px;
    font-weight: bold;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  `;
  alert.textContent = message;
  document.body.appendChild(alert);

  setTimeout(() => {
    alert.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

// ===== Social Login Buttons =====
const socialButtons = document.querySelectorAll(".social-btn");

socialButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    showAlert("Social login coming soon! ≡ƒÜÇ", "success");
  });
});

// ===== Logo Click =====
const logoLogin = document.querySelector(".netflix-logo-login");
if (logoLogin) {
  logoLogin.addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// ===== Add Animations to Page =====
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
