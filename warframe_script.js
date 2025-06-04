// JavaScript Features for Warframe System Requirements Page

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

    // 2. FPS Calculator with Warframe-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculateWarframeFPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('wfCPU').value;
        const gpu = document.getElementById('wfGPU').value;
        const res = document.getElementById('wfRes').value;
        const settings = document.getElementById('wfSettings').value;

        let baseFPS = 70; // Starting point for average performance in Warframe

        // Adjust FPS based on CPU tier
        if (cpu === 'low') baseFPS -= 20;
        else if (cpu === 'high') baseFPS += 20; 

        // Adjust FPS based on GPU tier
        if (gpu === 'low') baseFPS -= 30;
        else if (gpu === 'high') baseFPS += 30;
        
        // Adjust FPS based on resolution
        if (res === '1440') baseFPS *= 0.75;
        else if (res === '4k') baseFPS *= 0.5;

        // Adjust FPS based on graphics settings
        if (settings === 'low') baseFPS *= 1.2;
        else if (settings === 'high') baseFPS *= 0.9;
        else if (settings === 'max') baseFPS *= 0.7;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS >= 120) {
            rating = '🔥 Prime Performance!';
            flavorText = 'Your system is ready for glorious, high-speed combat!';
        } else if (baseFPS >= 80) {
            rating = '✅ Optimal Tenno Experience';
            flavorText = 'Smooth parkour and powerful abilities await!';
        } else if (baseFPS >= 50) {
            rating = '👍 Solid Warframe Flow';
            flavorText = 'You\'ll navigate the Origin System with good performance.';
        } else if (baseFPS >= 30) {
            rating = '⚠️ Playable (Adjust Settings)';
            flavorText = 'You might need to tweak settings for a better experience, Tenno.';
        } else {
            rating = '❌ Requires Optimization (Upgrade Recommended)';
            flavorText = 'The Grineer might outrun you. An upgrade is highly advised!';
        }
        
        // Display the result in the 'warframeFPSResult' div
        document.getElementById('warframeFPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #00e6e6;">${flavorText}</small>
        `;
    }

    // 3. Modding Efficiency Simulator (New Feature)
    // Simulates how different mods affect a Warframe's power.
    window.simulateModdingEfficiency = function() {
        const warframeType = document.getElementById('warframeType').value;
        const modRarity = document.getElementById('modRarity').value;
        const modSlots = parseInt(document.getElementById('modSlots').value);

        let basePower = 50; // Base power level (out of 100)
        let efficiencyRating = '';
        let efficiencyClass = '';
        let advice = '';

        // Adjust based on Warframe type
        if (warframeType === 'tank') basePower += 10;
        else if (warframeType === 'caster') basePower += 15;
        else if (warframeType === 'support') basePower += 5;
        else if (warframeType === 'stealth') basePower += 8;

        // Adjust based on mod rarity
        if (modRarity === 'uncommon') basePower += 5;
        else if (modRarity === 'rare') basePower += 15;
        else if (modRarity === 'prime') basePower += 30;

        // Adjust based on mod slots used
        basePower += (modSlots - 8) * 5; // Each slot over 8 adds 5 power

        basePower = Math.max(0, Math.min(100, basePower)); // Cap power between 0 and 100

        if (basePower >= 90) {
            efficiencyRating = 'Prime Efficiency!';
            efficiencyClass = 'prime';
            advice = 'Your build is truly exceptional, Tenno!';
        } else if (basePower >= 75) {
            efficiencyRating = 'Optimal Build!';
            efficiencyClass = 'optimal';
            advice = 'A well-rounded and powerful Warframe!';
        } else if (basePower >= 50) {
            efficiencyRating = 'Good Potential.';
            efficiencyClass = 'good';
            advice = 'Solid, but there\'s room for more power. Consider better mods.';
        } else {
            efficiencyRating = 'Basic Setup.';
            efficiencyClass = 'basic';
            advice = 'Your Warframe needs more modding. Farm for better mods!';
        }

        document.getElementById('moddingResult').innerHTML = `
            <strong>Estimated Power Level:</strong> ${basePower}%<br>
            <strong>Efficiency Rating:</strong> <span class="${efficiencyClass}">${efficiencyRating}</span><br>
            <small>${advice}</small>
        `;
        document.getElementById('moddingResult').style.display = 'block';
    }

    // 4. Resource Gathering Estimator (New Feature)
    // Estimates resource gains from missions.
    window.estimateResourceGathering = function() {
        const missionType = document.getElementById('missionType').value;
        const resourceBooster = document.getElementById('resourceBooster').value;
        const squadSize = parseInt(document.getElementById('squadSize').value);

        let baseResources = 100; // Base resource units

        // Adjust based on mission type
        if (missionType === 'survival') baseResources *= 1.5;
        else if (missionType === 'defense') baseResources *= 1.2;
        else if (missionType === 'bounty') baseResources *= 2.0;

        // Adjust based on resource booster
        if (resourceBooster === 'yes') baseResources *= 2.0;

        // Adjust based on squad size (more players, more drops)
        baseResources *= (1 + (squadSize - 1) * 0.25); // +25% per additional player (simplified)

        const estimatedResources = Math.round(baseResources + (Math.random() * 50 - 25)); // Add some randomness

        let advice = '';
        if (estimatedResources > 200) {
            advice = 'Excellent yield! The Origin System provides!';
        } else if (estimatedResources > 100) {
            advice = 'Good haul. Keep farming, Tenno.';
        } else {
            advice = 'Decent, but could be better. Consider boosters or different missions.';
        }

        document.getElementById('resourceResult').innerHTML = `
            <strong>Estimated Resource Yield:</strong> ~${estimatedResources} units<br>
            <small>${advice}</small>
        `;
        document.getElementById('resourceResult').style.display = 'block';
    }

    // 5. Faction Standing Tracker (New Feature)
    // Tracks faction standing progress.
    window.trackFactionStanding = function() {
        const factionName = document.getElementById('factionName').value;
        const dailyCapReached = document.getElementById('dailyCapReached').value;
        const missionsCompleted = parseInt(document.getElementById('missionsCompleted').value);

        let baseStandingPerMission = 1000; // Simplified base standing
        let maxDailyStanding = 25000; // Example daily cap

        // Adjust base standing based on faction (simplified)
        if (factionName === 'ostron') baseStandingPerMission = 1200;
        else if (factionName === 'solaris') baseStandingPerMission = 1500;
        else if (factionName === 'entrati') baseStandingPerMission = 1800;
        else if (factionName === 'syndicate') baseStandingPerMission = 1000; // Varies more by syndicate

        let estimatedStandingGain = missionsCompleted * baseStandingPerMission;

        if (dailyCapReached === 'yes') {
            estimatedStandingGain = Math.min(estimatedStandingGain, maxDailyStanding); // Cap at daily limit
            advice = 'Daily standing cap reached. Come back tomorrow, Tenno!';
        } else {
            advice = 'Keep earning standing! The faction appreciates your efforts.';
        }

        // Simulate next rank progress (very simplified)
        const currentStanding = Math.random() * maxDailyStanding * 0.8; // Simulate current standing
        const standingNeededForNextRank = maxDailyStanding * 1.2; // Example for next rank
        let rankProgress = (currentStanding / standingNeededForNextRank) * 100;
        rankProgress = Math.round(Math.min(100, rankProgress)); // Cap at 100%

        document.getElementById('standingGainDisplay').textContent = estimatedStandingGain.toLocaleString();
        document.getElementById('rankProgressDisplay').textContent = `${rankProgress}%`;
        document.getElementById('standingResult').querySelector('.progress-fill').style.width = `${rankProgress}%`;
        document.getElementById('standingResult').querySelector('small').textContent = advice;
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
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Prime Tier"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Prime Tier"];
        const ramOptions = ["2GB (Insufficient)", "4GB (Minimum)", "8GB (Recommended)", "16GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Initiate Failure (Struggles to run)",
            "Basic Tenno (30-45 FPS on Low)",
            "Veteran Tenno (60 FPS on Medium)",
            "Elite Tenno (90+ FPS on High)",
            "Legendary Tenno (Maxed out, flawless)"
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
        if (overallIndex <= 1) overallElement.style.color = "#ff6666"; // Red for poor
        else if (overallIndex === 2) overallElement.style.color = "#66b3ff"; // Blue for playable
        else overallElement.style.color = "#00e6e6"; // Cyan for good/excellent
    }

    // 7. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #0c0c1a, #1c1c2a, #2c2c3a)'; /* Dark blue/purple gradient */
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
    document.querySelectorAll('.specs-section, .calculator, .modding-simulator, .resource-estimator, .faction-tracker, .scanner').forEach(section => {
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

    // 10. Easter Egg - Warframe-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cTransference complete. Welcome, Tenno.", 
        "color: #00e6e6; font-size: 18px; font-weight: bold; text-shadow: 1px 1px 3px #00e6e6;");
    console.log("%cThe Lotus awaits your command.", 
        "color: #66b3ff; font-size: 14px; font-style: italic;");

    // Initial calls for interactive components on page load
    // These functions are called once to set initial display values
    calculateWarframeFPS();
    simulateModdingEfficiency(); // Call once to set initial state
    estimateResourceGathering(); // Call once to set initial state
    trackFactionStanding(); // Call once to set initial state
});
