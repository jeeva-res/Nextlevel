
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");

// Regex patterns
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
const phonePattern = /^[0-9]{4,15}$/;

// 🔹 Live validation (errors hide when corrected)
nameInput.addEventListener("input", () => {
  nameError.textContent = nameInput.value.trim() === "" ? "Name is required" : "";
});

emailInput.addEventListener("input", () => {
  emailError.textContent = emailPattern.test(emailInput.value.trim()) ? "" : "Enter a valid email";
});

phoneInput.addEventListener("input", () => {
  phoneError.textContent = phonePattern.test(phoneInput.value.trim()) ? "" : "Enter a valid phone number (4–15 digits)";
});

// 🔹 Submit validation
document.getElementById('subscriptionForm').addEventListener('submit', function(e) {
  e.preventDefault();

  let isValid = true;
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  document.getElementById("successMessage").style.display = "none";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();
  const countryCode = document.getElementById('countryCode').value;
  const fullPhone = countryCode + " " + phone;

  if (name === "") {
    nameError.textContent = "Name is required";
    isValid = false;
  }
  if (!emailPattern.test(email)) {
    emailError.textContent = "Enter a valid email";
    isValid = false;
  }
  if (!phonePattern.test(phone)) {
    phoneError.textContent = "Enter a valid phone number (4–15 digits)";
    isValid = false;
  }

  if (isValid) {
    // ✅ Build query string API URL
    const apiUrl = `https://formapiv5.resul.io/Subscription/FormSubmission?Name=${encodeURIComponent(name)}&Email=${encodeURIComponent(email)}&MobileNo=${encodeURIComponent(fullPhone)}&formId=13&dbId=0b8683d0_a98d_4a5c_ba16_404d05d1e6fd&SourceURL=${encodeURIComponent(window.location.href)}&pagereferrerurl=${encodeURIComponent(document.referrer)}&rid=&cid=&pagetitle=${encodeURIComponent(document.title)}`;

    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then(data => {
        // Hide form
        document.getElementById("subscriptionForm").style.display = "none";
        
        // Show thank-you message
        const messageBox = document.getElementById("successMessage");
        messageBox.innerHTML = `
          <div><img src="assets/images/correct.png" alt="success" width="100" height="100"></div>
          <h1>Thank you for your interest!</h1>
          <p>We will reach out to you shortly.</p>
        `;
        messageBox.style.display = "block";
      })
      .catch(err => {
        console.error("Error:", err);
        document.getElementById("successMessage").textContent = "❌ Something went wrong. Please try again.";
        document.getElementById("successMessage").style.display = "block";
      });
  }
});
