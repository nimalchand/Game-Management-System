// JavaScript Features for Metal Gear Solid V: The Phantom Pain System Requirements Page

document.addEventListener('DOMContentLoaded', () => {

    // 1. Parallax Effect
    // Adds a subtle parallax effect to background elements based on mouse movement.
    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to window dimensions (normalized 0-1)
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        // Adjust translation values for a subtle effect on each parallax element
        // Elements move in different directions and at different speeds for depth
        document.getElementById('parallax1').style.transform = `translate(${x * 25}px, ${y * 25}px)`;
        document.getElementById('parallax2').style.transform = `translate(${x * -25}px, ${y * -25}px)`;
        document.getElementById('parallax3').style.transform = `translate(${x * -15}px, ${y * 15}px)`;
        document.getElementById('parallax4').style.transform = `translate(${x * 15}px, ${y * -15}px)`;
    });

    // 2. FPS Calculator with MGSV-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculateMGSVFPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('mgsvCPU').value;
        const gpu = document.getElementById('mgsvGPU').value;
        const res = document.getElementById('mgsvRes').value;
        const settings = document.getElementById('mgsvSettings').value;

        let baseFPS = 60; // Starting point for average performance

        // Adjust FPS based on CPU tier
        if (cpu === 'low') baseFPS -= 20;
        else if (cpu === 'high') baseFPS += 30;

        // Adjust FPS based on GPU tier
        if (gpu === 'low') baseFPS -= 25;
        else if (gpu === 'high') baseFPS += 40;

        // Adjust FPS based on resolution
        if (res === '1440') baseFPS *= 0.75;
        else if (res === '4k') baseFPS *= 0.5;

        // Adjust FPS based on graphics settings
        if (settings === 'low') baseFPS *= 1.2;
        else if (settings === 'high') baseFPS *= 0.9;
        else if (settings === 'extra') baseFPS *= 0.75;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS > 90) {
            rating = '🔥 Stealth Master Ready!';
            flavorText = 'Your system is optimized for perfect infiltration!';
        } else if (baseFPS > 60) {
            rating = '✅ Excellent Performance';
            flavorText = 'Smooth operations and stunning visuals await!';
        } else if (baseFPS >= 45) {
            rating = '👍 Solid Performance';
            flavorText = 'You\'ll experience fluid gameplay, even in intense moments.';
        } else if (baseFPS >= 30) {
            rating = '⚠️ Playable (Adjust Settings)';
            flavorText = 'You might need to lower some settings for smoother tactical espionage.';
        } else {
            rating = '❌ Struggle (Upgrade Recommended)';
            flavorText = 'Your system may not be ready for deployment. Consider upgrading!';
        }
        
        // Display the result in the 'mgsvFPSResult' div
        document.getElementById('mgsvFPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #00b000;">${flavorText}</small>
        `;
    }

    // 3. Fulton Recovery Simulator (New Feature)
    // Simulates the success chance of a Fulton recovery based on conditions.
    window.simulateFultonRecovery = function() {
        const itemWeight = document.getElementById('fultonItem').value;
        const weather = document.getElementById('fultonWeather').value;
        const enemy = document.getElementById('fultonEnemy').value;

        let successChance = 80; // Base success chance

        // Adjust based on item weight
        if (itemWeight === 'medium') successChance -= 10;
        else if (itemWeight === 'heavy') successChance -= 25;

        // Adjust based on weather
        if (weather === 'stormy') successChance -= 15;

        // Adjust based on enemy presence
        if (enemy === 'medium') successChance -= 10;
        else if (enemy === 'high') successChance -= 20;

        // Ensure chance is within 0-100
        successChance = Math.max(0, Math.min(100, successChance));

        let resultText = '';
        let resultColor = '';
        let flavorText = '';

        if (successChance >= 90) {
            resultText = 'HIGH SUCCESS CHANCE!';
            resultColor = '#00b000'; // Green
            flavorText = 'Excellent conditions for extraction. Good job, Boss!';
        } else if (successChance >= 70) {
            resultText = 'GOOD CHANCE OF SUCCESS.';
            resultColor = '#00a8ff'; // Blue
            flavorText = 'Proceed with caution, but it should be fine.';
        } else if (successChance >= 50) {
            resultText = 'MODERATE CHANCE.';
            resultColor = '#f99e1a'; // Orange
            flavorText = 'Risky, but possible. Be ready for anything.';
        } else {
            resultText = 'LOW CHANCE OF SUCCESS.';
            resultColor = '#ff0000'; // Red
            flavorText = 'Extraction not recommended. Consider alternative methods or clear the area.';
        }

        document.getElementById('fultonResult').innerHTML = `
            <strong>Fulton Success Chance:</strong> <span class="fulton-success-chance" style="color: ${resultColor};">${successChance}%</span><br>
            <small>${flavorText}</small>
        `;
    }

    // 4. Mother Base Staff Management (Simulated)
    // Simulates the impact of assigning staff to Mother Base units.
    window.manageMotherBaseStaff = function() {
        const staffType = document.getElementById('staffType').value;
        const staffCount = parseInt(document.getElementById('staffCount').value);

        let unitLevel = 0; // Starts at 0, will map to A-E
        let resourceGain = 'None';

        // Base unit level based on staff type (simplified)
        switch (staffType) {
            case 'combat': unitLevel = 50; resourceGain = 'GMP'; break;
            case 'rd': unitLevel = 40; resourceGain = 'Processed Materials'; break;
            case 'support': unitLevel = 30; resourceGain = 'Fuel Resources'; break;
            case 'base': unitLevel = 20; resourceGain = 'Minor Metals'; break;
            case 'medical': unitLevel = 10; resourceGain = 'Biological Materials'; break;
            case 'intel': unitLevel = 5; resourceGain = 'Intel Data'; break;
        }

        // Adjust unit level based on staff count
        unitLevel += Math.floor(staffCount / 2); // Each 2 staff adds 1 level point (simplified)
        unitLevel = Math.min(100, unitLevel); // Cap at 100

        // Map numerical level to MGSV's S, A, B, C, D, E ranks
        let rank = '';
        if (unitLevel >= 90) rank = 'S';
        else if (unitLevel >= 75) rank = 'A';
        else if (unitLevel >= 60) rank = 'B';
        else if (unitLevel >= 40) rank = 'C';
        else if (unitLevel >= 20) rank = 'D';
        else rank = 'E';

        document.getElementById('unitLevelDisplay').textContent = rank;
        document.getElementById('resourceGainDisplay').textContent = resourceGain;

        // Update progress bar for the example
        const progressBar = document.getElementById('motherBaseResult').querySelector('.progress-fill');
        if (progressBar) {
            progressBar.style.width = `${unitLevel}%`;
            progressBar.className = 'progress-fill'; // Reset classes
            if (unitLevel >= 75) progressBar.classList.add('green');
            else if (unitLevel < 40) progressBar.classList.add('red');
        }
    }

    // 5. Stealth Rating Simulator (New Feature)
    // Calculates a stealth rating based on player actions.
    window.simulateStealthRating = function() {
        const kills = document.getElementById('kills').value;
        const alerts = document.getElementById('alerts').value;
        const time = document.getElementById('time').value;

        let stealthScore = 100; // Base score for S-Rank

        // Adjust score based on kills
        if (kills === 'few') stealthScore -= 20;
        else if (kills === 'many') stealthScore -= 40;

        // Adjust score based on alerts
        if (alerts === 'few') stealthScore -= 30;
        else if (alerts === 'many') stealthScore -= 60;

        // Adjust score based on time
        if (time === 'normal') stealthScore -= 10;
        else if (time === 'slow') stealthScore -= 25;

        // Ensure score is within 0-100
        stealthScore = Math.max(0, Math.min(100, stealthScore));

        let rank = '';
        let rankClass = '';
        let advice = '';

        if (stealthScore >= 95) {
            rank = 'S RANK';
            rankClass = 's-rank';
            advice = 'Flawless infiltration. You are a legend, Boss!';
        } else if (stealthScore >= 80) {
            rank = 'A RANK';
            rankClass = 'a-rank';
            advice = 'Excellent work. Keep it quiet, Boss.';
        } else if (stealthScore >= 60) {
            rank = 'B RANK';
            rankClass = 'b-rank';
            advice = 'Good, but could be cleaner. Watch for patrols.';
        } else if (stealthScore >= 40) {
            rank = 'C RANK';
            rankClass = 'c-rank';
            advice = 'You were seen. Next time, try a different approach.';
        } else {
            rank = 'D RANK';
            rankClass = 'd-rank';
            advice = 'Loud and proud. Maybe try a non-stealth approach next time?';
        }

        const resultDiv = document.getElementById('stealthRatingResult');
        resultDiv.innerHTML = `
            <strong>Stealth Rating:</strong> <span class="${rankClass}">${rank}</span><br>
            <small>${advice}</small>
        `;
        resultDiv.style.display = 'block';
    }

    // 6. Real-time System Scanner (Simulated)
    // Simulates a system scan and displays compatibility results.
    document.getElementById('startScan').addEventListener('click', function() {
        const scanBar = document.getElementById('scanBar');
        const scanResults = document.getElementById('scanResults');
        const startButton = this;
        
        // Disable the button and reset UI for a new scan
        startButton.disabled = true;
        startButton.textContent = "Scanning...";
        scanResults.style.display = "none";
        scanBar.style.width = '0%'; // Reset progress bar
        
        // Simulate scanning progress with a random increment
        let progress = 0;
        const scanInterval = setInterval(() => {
            progress += Math.random() * 10; // Random increment for more natural feel
            if (progress > 100) progress = 100; // Cap at 100%
            scanBar.style.width = `${progress}%`; // Update progress bar width
            
            // When scan is complete
            if (progress === 100) {
                clearInterval(scanInterval); // Stop the interval
                startButton.textContent = "Scan Complete"; // Update button text
                
                // Generate and display simulated results
                simulateScanResults();
                scanResults.style.display = "block"; // Show results section
                
                // Re-enable button after a short delay
                setTimeout(() => {
                    startButton.disabled = false;
                    startButton.textContent = "Scan Again";
                }, 3000);
            }
        }, 200); // Update every 200 milliseconds
    });

    // Function to generate simulated scan results
    function simulateScanResults() {
        // These are simulated results - in a real application, this would involve
        // querying actual system information (which is not possible directly in a browser sandbox).
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Optimal for Stealth"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Optimal for Stealth"];
        const ramOptions = ["2GB (Insufficient)", "4GB (Minimum)", "8GB (Recommended)", "16GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Mission Failed (Struggles to run)",
            "Bare Minimum (30-45 FPS on Low)",
            "Solid Snake Standard (60 FPS on Medium)",
            "Big Boss Ready (90+ FPS on High)",
            "Phantom Painless (120+ FPS on Ultra)"
        ];
        
        // Assign random results to each spec item
        document.getElementById('cpuResult').textContent = cpuOptions[Math.floor(Math.random() * cpuOptions.length)];
        document.getElementById('gpuResult').textContent = gpuOptions[Math.floor(Math.random() * gpuOptions.length)];
        document.getElementById('ramResult').textContent = ramOptions[Math.floor(Math.random() * ramOptions.length)];
        document.getElementById('storageResult').textContent = storageOptions[Math.floor(Math.random() * storageOptions.length)];
        
        const overallIndex = Math.min(
            Math.floor(Math.random() * 3 + Math.random() * 2), // Biased toward better results
            overallOptions.length - 1 // Ensure index doesn't exceed array bounds
        );
        document.getElementById('overallResult').textContent = overallOptions[overallIndex];
        
        // Color code the overall result for quick visual feedback
        const overallElement = document.getElementById('overallResult');
        if (overallIndex <= 1) overallElement.style.color = "#b00000"; // Red for poor
        else if (overallIndex === 2) overallElement.style.color = "#f99e1a"; // Orange for playable
        else overallElement.style.color = "#00b000"; // Green for good/excellent
    }

    // 7. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #1a1a1a, #2a2a2a, #3a3a3a)'; /* Dark grey gradient */
    });

    // 8. Animate elements on scroll
    // Uses Intersection Observer API to trigger fade-in animation when sections come into view.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.8s forwards'; // Apply fade-in animation
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, { threshold: 0.1 }); // Trigger when 10% of the element is visible

    // Observe specific sections for animation
    document.querySelectorAll('.specs-section, .calculator, .fulton-simulator, .mother-base-manager, .stealth-rating-simulator, .scanner').forEach(section => {
        section.style.opacity = '0'; // Hide initially for animation
        observer.observe(section);
    });

    // 9. Dynamic Background Intensity based on Time
    // Adjusts the brightness of the background video based on the current hour.
    function updateBackgroundIntensity() {
        const now = new Date();
        const hours = now.getHours();
        // Make background slightly brighter during daytime (6am-6pm)
        const intensity = hours > 6 && hours < 18 ? 0.4 : 0.3; // 0.4 for day, 0.3 for night
        document.querySelector('.video-bg').style.filter = `brightness(${intensity})`;
    }
    
    updateBackgroundIntensity(); // Call once on load
    setInterval(updateBackgroundIntensity, 60000); // Update every minute

    // 10. Easter Egg - MGSV-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cKept you waiting, huh?", 
        "color: #00b000; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 5px #00b000;");
    console.log("%cBig Boss is counting on you.", 
        "color: #008000; font-size: 16px; font-style: italic;");

    // Initial calls for interactive components on page load
    // These functions are called once to set initial display values
    calculateMGSVFPS();
    simulateFultonRecovery();
    manageMotherBaseStaff(); // Call once to set initial state
    simulateStealthRating();
});
