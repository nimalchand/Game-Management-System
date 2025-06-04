// JavaScript Features for Sifu System Requirements Page

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

    // 2. FPS Calculator with Sifu-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculateSifuFPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('sifuCPU').value;
        const gpu = document.getElementById('sifuGPU').value;
        const res = document.getElementById('sifuRes').value;
        const settings = document.getElementById('sifuSettings').value;

        let baseFPS = 60; // Starting point for average performance

        // Adjust FPS based on CPU tier
        if (cpu === 'low') baseFPS -= 15;
        else if (cpu === 'high') baseFPS += 25;

        // Adjust FPS based on GPU tier
        if (gpu === 'low') baseFPS -= 20;
        else if (gpu === 'high') baseFPS += 35;

        // Adjust FPS based on resolution
        if (res === '1440') baseFPS *= 0.78;
        else if (res === '4k') baseFPS *= 0.55;

        // Adjust FPS based on graphics settings
        if (settings === 'low') baseFPS *= 1.15;
        else if (settings === 'high') baseFPS *= 0.9;
        else if (settings === 'epic') baseFPS *= 0.75;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS > 90) {
            rating = '🔥 Flawless Combat Flow!';
            flavorText = 'Your system is perfectly balanced for true mastery!';
        } else if (baseFPS > 60) {
            rating = '✅ Excellent Performance';
            flavorText = 'Smooth parries and powerful strikes await!';
        } else if (baseFPS >= 45) {
            rating = '👍 Solid Performance';
            flavorText = 'You\'ll experience fluid martial arts action.';
        } else if (baseFPS >= 30) {
            rating = '⚠️ Playable (Adjust Settings)';
            flavorText = 'You might need to adjust settings for a smoother path to vengeance.';
        } else {
            rating = '❌ Struggle (Upgrade Recommended)';
            flavorText = 'Your system might break before your spirit. Consider upgrading!';
        }
        
        // Display the result in the 'sifuFPSResult' div
        document.getElementById('sifuFPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #e6b800;">${flavorText}</small>
        `;
    }

    // 3. Aging Mechanic Simulator (New Feature)
    // Simulates the aging process in Sifu based on deaths.
    window.simulateAging = function() {
        let currentAge = parseInt(document.getElementById('currentAge').value);
        const deathsInMission = parseInt(document.getElementById('deathsInMission').value);

        let agePenalty = 0;
        if (deathsInMission > 0) {
            // Each death adds to the age penalty, increasing exponentially
            for (let i = 0; i < deathsInMission; i++) {
                agePenalty += (i + 1); // 1st death +1, 2nd +2, 3rd +3, etc.
            }
        }
        
        let newAge = currentAge + agePenalty;
        let status = '';
        let statusClass = '';
        let advice = '';
        let healthImpact = 'Normal Health';
        let damageImpact = 'Normal Damage';
        let focusImpact = 'Normal Focus Gain';

        if (newAge >= 70) {
            newAge = 70; // Max age
            status = 'GAME OVER';
            statusClass = 'old';
            advice = 'Your journey ends here. You have succumbed to old age.';
            healthImpact = 'Severely Reduced Health';
            damageImpact = 'Significantly Increased Damage'; // Representing the trade-off
            focusImpact = 'Significantly Increased Focus Gain';
        } else if (newAge >= 60) {
            status = 'Elder Master';
            statusClass = 'old';
            advice = 'Your wisdom is vast, but your body is frail. Focus on defense.';
            healthImpact = 'Greatly Reduced Health';
            damageImpact = 'Increased Damage';
            focusImpact = 'Increased Focus Gain';
        } else if (newAge >= 40) {
            status = 'Experienced Fighter';
            statusClass = 'middle';
            advice = 'You\'ve seen many battles. Adapt and overcome.';
            healthImpact = 'Slightly Reduced Health';
            damageImpact = 'Slightly Increased Damage';
            focusImpact = 'Slightly Increased Focus Gain';
        } else {
            status = 'Young Prodigy';
            statusClass = 'young';
            advice = 'Youth is on your side. Fight aggressively!';
        }

        document.getElementById('agingResult').innerHTML = `
            <strong>Initial Age:</strong> ${currentAge}<br>
            <strong>Deaths:</strong> ${deathsInMission}<br>
            <strong>New Age:</strong> <span class="${statusClass}">${newAge} (${status})</span><br>
            <strong>Health Impact:</strong> ${healthImpact}<br>
            <strong>Damage Impact:</strong> ${damageImpact}<br>
            <strong>Focus Impact:</strong> ${focusImpact}<br>
            <small>${advice}</small>
        `;
        document.getElementById('agingResult').style.display = 'block';
    }

    // 4. Focus Attack Planner (New Feature)
    // Plans focus attacks based on enemy type and available focus segments.
    window.planFocusAttack = function() {
        const enemyType = document.getElementById('enemyType').value;
        const focusSegments = parseInt(document.getElementById('focusSegments').value);

        let effectiveness = '';
        let advice = '';
        let effectivenessClass = '';

        switch (enemyType) {
            case 'thug':
                if (focusSegments >= 1) {
                    effectiveness = 'Highly Effective';
                    effectivenessClass = 'effective';
                    advice = 'One segment is usually enough for a quick takedown.';
                } else {
                    effectiveness = 'Ineffective';
                    effectivenessClass = 'ineffective';
                    advice = 'Need at least 1 focus segment for a reliable takedown.';
                }
                break;
            case 'brawler':
                if (focusSegments >= 2) {
                    effectiveness = 'Highly Effective';
                    effectivenessClass = 'effective';
                    advice = 'Two segments will allow for a strong focus attack, breaking their posture.';
                } else if (focusSegments === 1) {
                    effectiveness = 'Moderately Effective';
                    effectivenessClass = 'moderate';
                    advice = 'One segment can stagger, but might not lead to a full takedown.';
                } else {
                    effectiveness = 'Ineffective';
                    effectivenessClass = 'ineffective';
                    advice = 'More focus is needed for these tougher enemies.';
                }
                break;
            case 'boss':
                if (focusSegments >= 3) {
                    effectiveness = 'Highly Effective';
                    effectivenessClass = 'effective';
                    advice = 'Three segments will land a powerful focus attack, creating significant opening.';
                } else if (focusSegments === 2) {
                    effectiveness = 'Moderately Effective';
                    effectivenessClass = 'moderate';
                    advice = 'Two segments can chip away, but won\'t be decisive.';
                } else {
                    effectiveness = 'Ineffective';
                    effectivenessClass = 'ineffective';
                    advice = 'Bosses require maximum focus. Build it up!';
                }
                break;
        }

        document.getElementById('focusPlannerResult').innerHTML = `
            <strong>Enemy:</strong> ${document.getElementById('enemyType').options[document.getElementById('enemyType').selectedIndex].text}<br>
            <strong>Focus Segments:</strong> ${focusSegments}<br>
            <strong>Effectiveness:</strong> <span class="${effectivenessClass}">${effectiveness}</span><br>
            <small>${advice}</small>
        `;
        document.getElementById('focusPlannerResult').style.display = 'block';
    }

    // 5. Combat Style Selector (New Feature)
    // Describes different combat styles in Sifu.
    window.selectCombatStyle = function() {
        const combatStyle = document.getElementById('combatStyle').value;

        let styleName = '';
        let description = '';
        let strengths = '';
        let weaknesses = '';

        switch (combatStyle) {
            case 'aggressive':
                styleName = 'Aggressive (Offensive)';
                description = 'Focuses on relentless attacks, overwhelming enemies before they can react.';
                strengths = 'High damage output, quick fights, good for clearing groups.';
                weaknesses = 'Vulnerable to parries, can drain posture quickly if attacks are blocked.';
                break;
            case 'defensive':
                styleName = 'Defensive (Parry/Dodge)';
                description = 'Emphasizes precise parries and dodges to create openings and manage posture.';
                strengths = 'Excellent survivability, posture breaking enemies, high style score.';
                weaknesses = 'Lower damage output, requires precise timing, can be slow against multiple enemies.';
                break;
            case 'balanced':
                styleName = 'Balanced (Mix)';
                description = 'Combines offensive pressure with defensive maneuvers, adapting to enemy patterns.';
                strengths = 'Versatile, good for most situations, allows for flexible combat flow.';
                weaknesses = 'May not excel in any single area, requires good understanding of both offense and defense.';
                break;
            case 'evasive':
                styleName = 'Evasive (Dodging)';
                description = 'Prioritizes dodging and weaving through enemy attacks to avoid damage and reposition.';
                strengths = 'High survivability, great for avoiding unblockable attacks, can create space.';
                weaknesses = 'Lower damage output, can be difficult to punish enemies, relies heavily on stamina.';
                break;
        }

        document.getElementById('combatStyleResult').innerHTML = `
            <strong>Style:</strong> ${styleName}<br>
            <strong>Description:</strong> ${description}<br>
            <strong>Strengths:</strong> ${strengths}<br>
            <strong>Weaknesses:</strong> ${weaknesses}
        `;
        document.getElementById('combatStyleResult').style.display = 'block';
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
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Master Level"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Master Level"];
        const ramOptions = ["4GB (Insufficient)", "8GB (Minimum)", "16GB (Recommended)", "32GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Broken Posture (Struggles to run)",
            "Student Level (30-45 FPS on Low)",
            "Disciple Level (60 FPS on Medium)",
            "Master Level (90+ FPS on High)",
            "True Sifu (120+ FPS on Epic)"
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
        if (overallIndex <= 1) overallElement.style.color = "#cc0000"; // Red for poor
        else if (overallIndex === 2) overallElement.style.color = "#e6b800"; // Gold for playable
        else overallElement.style.color = "#00cc00"; // Green for good/excellent
    }

    // 7. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #111111, #222222, #333333)'; /* Dark grey gradient */
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
    document.querySelectorAll('.specs-section, .calculator, .aging-simulator, .focus-planner, .combat-style-selector, .scanner').forEach(section => {
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

    // 10. Easter Egg - Sifu-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cTo master Kung Fu, you must first master yourself.", 
        "color: #e6b800; font-size: 18px; font-weight: bold; text-shadow: 1px 1px 3px #e6b800;");
    console.log("%cYour journey begins.", 
        "color: #cc9900; font-size: 14px; font-style: italic;");

    // Initial calls for interactive components on page load
    // These functions are called once to set initial display values
    calculateSifuFPS();
    simulateAging(); // Call once to set initial state
    planFocusAttack(); // Call once to set initial state
    selectCombatStyle(); // Call once to set initial state
});
