 // JavaScript for Carousel Functionality
    document.addEventListener('DOMContentLoaded', () => {
        // Function to set up a carousel for a given grid ID
        function setupCarousel(gridId, prevBtnId, nextBtnId) {
            const gameGrid = document.getElementById(gridId);
            const prevBtn = document.getElementById(prevBtnId);
            const nextBtn = document.getElementById(nextBtnId);

            if (!gameGrid || !prevBtn || !nextBtn) {
                console.warn(`Carousel elements not found for gridId: ${gridId}`);
                return;
            }

            // Get the computed style to accurately get gap and card width
            const style = getComputedStyle(gameGrid);
            const gap = parseFloat(style.gap); 
            
            // Get the width of the first card to use as scroll step
            const firstCard = gameGrid.querySelector('.game-card');
            if (!firstCard) {
                console.warn(`No game cards found in grid: ${gridId}`);
                return;
            }
            const cardWidth = firstCard.offsetWidth + gap; // Total width of one card including its right gap

            // Function to update button states based on scroll position
            const updateButtonStates = () => {
                // Recalculate max scroll on resize/content change
                const maxScroll = gameGrid.scrollWidth - gameGrid.clientWidth; 
                // Disable prev button if at the beginning
                prevBtn.disabled = gameGrid.scrollLeft <= 1; // Use a small tolerance for floating point
                // Disable next button if at the end
                nextBtn.disabled = gameGrid.scrollLeft >= maxScroll - 1; // Use a small tolerance
            };

            // Scroll to the left
            prevBtn.addEventListener('click', () => {
                gameGrid.scrollBy({ // Use scrollBy for relative scrolling
                    left: -cardWidth, // Scroll left by one card width
                    behavior: 'smooth'
                });
                // updateButtonStates will be called by the 'scroll' event listener
            });

            // Scroll to the right
            nextBtn.addEventListener('click', () => {
                gameGrid.scrollBy({ // Use scrollBy for relative scrolling
                    left: cardWidth, // Scroll right by one card width
                    behavior: 'smooth'
                });
                // updateButtonStates will be called by the 'scroll' event listener
            });

            // Update buttons on initial load and window resize
            window.addEventListener('resize', updateButtonStates);
            // Update buttons when the user scrolls manually
            gameGrid.addEventListener('scroll', updateButtonStates);

            // Initial state update when the page loads
            updateButtonStates();
        }

        // Setup carousels for all relevant sections
        setupCarousel('featured-games-grid', 'featured-prev-btn', 'featured-next-btn');
        setupCarousel('originals-grid', 'originals-prev-btn', 'originals-next-btn');
        setupCarousel('action-grid', 'action-prev-btn', 'action-next-btn');

        

});