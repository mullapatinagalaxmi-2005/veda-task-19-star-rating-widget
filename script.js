const stars = document.querySelectorAll(".star");
const ratingText = document.getElementById("ratingText");
const resetBtn = document.getElementById("resetBtn");

let selectedRating = 0;

const messages = [
    "Select a star to rate",
    "⭐ Poor",
    "⭐ Fair",
    "⭐ Good",
    "⭐ Very Good",
    "⭐ Excellent!"
];

function updateStars(rating) {
    stars.forEach((star) => {
        const value = Number(star.dataset.value);

        star.classList.toggle("filled", value <= rating);
        star.setAttribute(
            "aria-pressed",
            String(value === selectedRating)
        );
    });
}

// Show a preview when the user hovers over a star.
stars.forEach((star) => {
    star.addEventListener("mouseenter", () => {
        const hoverRating = Number(star.dataset.value);
        updateStars(hoverRating);
        ratingText.textContent = messages[hoverRating];
    });

    // Save the selected rating when clicked.
    star.addEventListener("click", () => {
        selectedRating = Number(star.dataset.value);
        updateStars(selectedRating);
        ratingText.textContent =
            `You selected ${selectedRating} out of 5 stars — ${messages[selectedRating].replace("⭐ ", "")}`;
    });
});

// Restore the selected rating when the mouse leaves the stars.
document.querySelector(".stars").addEventListener("mouseleave", () => {
    updateStars(selectedRating);
    ratingText.textContent = selectedRating
        ? `Your rating: ${selectedRating} out of 5 stars`
        : "Select a star to rate";
});

// Reset the rating.
resetBtn.addEventListener("click", () => {
    selectedRating = 0;
    updateStars(0);
    ratingText.textContent = messages[0];
});

// Keyboard focus preview.
stars.forEach((star) => {
    star.addEventListener("focus", () => {
        const rating = Number(star.dataset.value);
        updateStars(rating);
        ratingText.textContent = messages[rating];
    });

    star.addEventListener("blur", () => {
        updateStars(selectedRating);
        ratingText.textContent = selectedRating
            ? `Your rating: ${selectedRating} out of 5 stars`
            : messages[0];
    });
});

// Initialize the widget.
updateStars(0);