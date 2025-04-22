// Selectors
const cardsContainer = document.querySelector(".cards");
const toggleButton = document.querySelectorAll(".toggle__button");
const headerBtn = document.querySelectorAll(".header__buttons-button");
const cards = Array.from(document.querySelectorAll(".card")); // Convert NodeList to Array
const removeBtn = document.querySelectorAll(".toggle__remove");
const themeToggleButton = document.querySelector(".nav__option");
const themeIcon = themeToggleButton.querySelector(".nav__option-theme");
const body = document.querySelector("body");
const logo = document.querySelector(".nav__logo");
const sunIcon = document.querySelector(".nav__option-theme--sun");
const moonIcon = document.querySelector(".nav__option-theme--moon");

// Theme toggle functionality
themeToggleButton.addEventListener("click", () => {
  body.classList.toggle("light-theme");

  const isLightTheme = body.classList.contains("light-theme");
  if (isLightTheme) {
    sunIcon.style.display = "none"; // Hide sun icon
    moonIcon.style.display = "block"; // Show moon icon
  } else {
    sunIcon.style.display = "block"; // Show sun icon
    moonIcon.style.display = "none"; // Hide moon icon
  }
});

let removedCards = []; // Array to store removed cards

// Toggle button functionality
toggleButton.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
  });
});

// Header button functionality
headerBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove the active class from all buttons
    headerBtn.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    // Filter cards based on the clicked button
    const filter = btn.textContent.trim().toLowerCase(); // Get the button text (e.g., "all", "active", "inactive")

    if (filter === "all") {
      // Add removed cards back to the DOM
      removedCards.forEach((card) => {
        cardsContainer.appendChild(card);
      });
      removedCards = []; // Clear the removed cards array

      // Show all cards
      cards.forEach((card) => {
        card.style.display = ""; // Reset display property to default (grid handles layout)
      });
    } else if (filter === "active") {
      // Show only active cards
      cards.forEach((card) => {
        card.querySelector(".toggle__button").classList.contains("active")
          ? (card.style.display = "")
          : (card.style.display = "none");
      });
    } else if (filter === "inactive") {
      // Show only inactive cards
      cards.forEach((card) => {
        !card.querySelector(".toggle__button").classList.contains("active")
          ? (card.style.display = "")
          : (card.style.display = "none");
      });
    }
  });
});

// Remove button functionality
removeBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    if (card) {
      removedCards.push(card); // Save the removed card to the array
      card.remove(); // Remove the card from the DOM
    }
  });
});
