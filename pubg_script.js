// JavaScript Features for PUBG: Battlegrounds System Requirements Page

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

    // 2. FPS Calculator with PUBG-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculatePUBGFPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('pubgCPU').value;
        const gpu = document.getElementById('pubgGPU').value;
        const res = document.getElementById('pubgRes').value;
        const settings = document.getElementById('pubgSettings').value;

        let baseFPS = 70; // Starting point for PUBG (can be demanding)

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
        if (settings === 'verylow') baseFPS *= 1.3;
        else if (settings === 'low') baseFPS *= 1.15;
        else if (settings === 'high') baseFPS *= 0.9;
        else if (settings === 'ultra') baseFPS *= 0.7;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS >= 100) {
            rating = '🔥 Esports Ready Performance!';
            flavorText = 'Your system is optimized for competitive play and high frame rates!';
        } else if (baseFPS >= 70) {
            rating = '✅ Chicken Dinner Ready!';
            flavorText = 'Smooth gunfights and seamless looting await!';
        } else if (baseFPS >= 45) {
            rating = '👍 Solid Survivor';
            flavorText = 'You\'ll experience good gameplay, but some drops might occur.';
        } else if (baseFPS >= 30) {
            rating = '⚠️ Struggling to Survive (Adjust Settings)';
            flavorText = 'You might need to lower settings for a more consistent experience.';
        } else {
            rating = '❌ Early Grave (Upgrade Recommended)';
            flavorText = 'The battlegrounds are too intense. An upgrade is highly advised!';
        }
        
        // Display the result in the 'pubgFPSResult' div
        document.getElementById('pubgFPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #7FFF00;">${flavorText}</small>
        `;
    }

    // 3. Weapon Loadout Optimizer (New Feature)
    // Helps optimize weapon loadouts based on selected attachments.
    const weapons = {
        m416: { name: "M416", type: "AR", baseDamage: 41, baseRecoil: 0.6, baseRange: 400 },
        akm: { name: "AKM", type: "AR", baseDamage: 47, baseRecoil: 0.8, baseRange: 350 },
        kar98k: { name: "Kar98k", type: "SR", baseDamage: 79, baseRecoil: 0.9, baseRange: 700 },
        sks: { name: "SKS", type: "DMR", baseDamage: 53, baseRecoil: 0.7, baseRange: 500 },
        ump45: { name: "UMP45", type: "SMG", baseDamage: 39, baseRecoil: 0.4, baseRange: 200 },
        s686: { name: "S686", type: "Shotgun", baseDamage: 25 * 9, baseRecoil: 1.0, baseRange: 50 }, // Per pellet
        uzi: { name: "Micro UZI", type: "SMG", baseDamage: 26, baseRecoil: 0.3, baseRange: 100 },
        dp28: { name: "DP-28", type: "LMG", baseDamage: 51, baseRecoil: 0.75, baseRange: 450 },
        mini14: { name: "Mini14", type: "DMR", baseDamage: 46, baseRecoil: 0.5, baseRange: 600 },
        vector: { name: "Vector", type: "SMG", baseDamage: 34, baseRecoil: 0.35, baseRange: 150 }
    };

    const attachments = {
        reddot: { recoilMod: 0.95, rangeMod: 1.0, accuracyMod: 1.05, name: "Red Dot Sight" },
        '2x': { recoilMod: 0.9, rangeMod: 1.1, accuracyMod: 1.1, name: "2x Scope" },
        '4x': { recoilMod: 0.85, rangeMod: 1.2, accuracyMod: 1.15, name: "4x Scope" },
        '8x': { recoilMod: 0.8, rangeMod: 1.3, accuracyMod: 1.2, name: "8x Scope" },
        vertical: { recoilMod: 0.8, name: "Vertical Foregrip" },
        angled: { recoilMod: 0.9, name: "Angled Foregrip" },
        none: { recoilMod: 1.0, rangeMod: 1.0, accuracyMod: 1.0, name: "None" }
    };

    window.optimizeLoadout = function() {
        const primaryWeaponKey = document.getElementById('primaryWeapon').value;
        const secondaryWeaponKey = document.getElementById('secondaryWeapon').value;
        const scopeKey = document.getElementById('scope').value;
        const gripKey = document.getElementById('grip').value;

        const primary = weapons[primaryWeaponKey];
        const secondary = weapons[secondaryWeaponKey];
        const selectedScope = attachments[scopeKey];
        const selectedGrip = attachments[gripKey];

        if (!primary) {
            document.getElementById('loadoutResult').innerHTML = '<p>Please select a primary weapon.</p>';
            return;
        }

        let effectiveRecoil = primary.baseRecoil;
        let effectiveRange = primary.baseRange;
        let effectiveDamage = primary.baseDamage;

        // Apply grip effects (only recoil for simplicity)
        if (selectedGrip && selectedGrip.recoilMod) {
            effectiveRecoil *= selectedGrip.recoilMod;
        }

        // Apply scope effects (recoil and range for simplicity)
        if (selectedScope && selectedScope.recoilMod) {
            effectiveRecoil *= selectedScope.recoilMod;
        }
        if (selectedScope && selectedScope.rangeMod) {
            effectiveRange *= selectedScope.rangeMod;
        }

        effectiveRecoil = Math.round(effectiveRecoil * 100) / 100;
        effectiveRange = Math.round(effectiveRange);

        let loadoutRating = '';
        let loadoutClass = '';
        let advice = '';

        if (primary.type === 'AR' || primary.type === 'DMR') {
            if (effectiveRecoil < 0.5 && effectiveRange > 400) {
                loadoutRating = 'Optimal for Mid-Long Range!';
                loadoutClass = 'optimal';
                advice = 'This loadout offers excellent control and range for engagements. Perfect for picking off foes!';
            } else if (effectiveRecoil < 0.7 && effectiveRange > 300) {
                loadoutRating = 'Good All-Rounder.';
                loadoutClass = 'good';
                advice = 'A solid choice for various combat scenarios. Keep practicing your aim!';
            } else {
                loadoutRating = 'Basic Setup.';
                loadoutClass = 'basic';
                advice = 'Consider adding more attachments to improve control and range.';
            }
        } else if (primary.type === 'SMG' || primary.type === 'Shotgun') {
            if (effectiveRecoil < 0.6 && effectiveRange < 250) {
                loadoutRating = 'Optimal for Close Quarters!';
                loadoutClass = 'optimal';
                advice = 'Dominate tight spaces and rapid engagements with this setup!';
            } else {
                loadoutRating = 'Basic Setup.';
                loadoutClass = 'basic';
                advice = 'Ensure you have a secondary weapon for longer ranges.';
            }
        }

        let secondaryInfo = '';
        if (secondary) {
            secondaryInfo = `<p><strong>Secondary:</strong> ${secondary.name} (${secondary.type})</p>`;
        } else {
            secondaryInfo = '<p><strong>Secondary:</strong> None (Consider carrying one!)</p>';
        }

        document.getElementById('loadoutResult').innerHTML = `
            <h4>${primary.name} Loadout:</h4>
            <p><strong>Primary:</strong> ${primary.name} (${primary.type})</p>
            ${secondaryInfo}
            <p><strong>Optic:</strong> ${selectedScope.name}</p>
            <p><strong>Grip:</strong> ${selectedGrip.name}</p>
            <hr style="margin: 10px 0; border-color: #555;">
            <p><strong>Effective Recoil:</strong> ${effectiveRecoil} (Lower is better)</p>
            <p><strong>Effective Range:</strong> ${effectiveRange}m</p>
            <p><strong>Estimated Damage:</strong> ${primary.baseDamage} (Base)</p>
            <p><strong>Rating:</strong> <span class="${loadoutClass}">${loadoutRating}</span></p>
            <small>${advice}</small>
        `;
        document.getElementById('loadoutResult').style.display = 'block';
    }

    // 4. Zone Collapse Timer & Strategy (New Feature)
    // Simulates zone movement and provides strategic advice.
    window.simulateZone = function() {
        const zonePhase = parseInt(document.getElementById('zonePhase').value);
        const playerPosition = document.getElementById('playerPosition').value;

        let timeToShrink = 0; // seconds
        let damagePerSecond = 0;
        let strategy = '';
        let zoneStatus = '';
        let zoneClass = '';

        // Simplified zone timings and damage
        switch (zonePhase) {
            case 1: timeToShrink = 300; damagePerSecond = 0.4; break; // 5 min
            case 2: timeToShrink = 240; damagePerSecond = 0.6; break; // 4 min
            case 3: timeToShrink = 180; damagePerSecond = 0.8; break; // 3 min
            case 4: timeToShrink = 120; damagePerSecond = 1.0; break; // 2 min
            case 5: timeToShrink = 60; damagePerSecond = 2.0; break; // 1 min (and higher for later phases)
            default: timeToShrink = 0; damagePerSecond = 0;
        }

        // Adjust strategy based on player position
        if (playerPosition === 'center') {
            zoneStatus = 'Safe & Central';
            zoneClass = 'safe';
            strategy = 'You are in a good position. Loot up, but stay aware of incoming players.';
        } else if (playerPosition === 'edge') {
            zoneStatus = 'Safe, but on the Edge';
            zoneClass = 'safe';
            strategy = `You have ${Math.round(timeToShrink / 60)} min ${timeToShrink % 60} sec until the zone shrinks. Consider moving towards the center soon.`;
        } else if (playerPosition === 'outside') {
            zoneStatus = 'In the Blue Zone (Near Edge)';
            zoneClass = 'caution';
            strategy = `You are taking ${damagePerSecond} HP/sec damage. Move to the white zone immediately! Use boosts if needed.`;
        } else if (playerPosition === 'farOutside') {
            zoneStatus = 'Deep in the Blue Zone!';
            zoneClass = 'danger';
            strategy = `You are taking ${damagePerSecond} HP/sec damage. Your health will drain quickly. Find a vehicle and get to safety or use healing items constantly.`;
        }

        document.getElementById('zoneResult').innerHTML = `
            <p><strong>Zone Status:</strong> <span class="${zoneClass}">${zoneStatus}</span></p>
            <p><strong>Time to Next Shrink:</strong> ${Math.floor(timeToShrink / 60)}m ${timeToShrink % 60}s</p>
            <p><strong>Blue Zone Damage:</strong> ${damagePerSecond} HP/sec</p>
            <hr style="margin: 10px 0; border-color: #555;">
            <p><strong>Strategy:</strong> <small>${strategy}</small></p>
        `;
        document.getElementById('zoneResult').style.display = 'block';
    }

    // 5. Loot Tier Probability (New Feature)
    // Estimates the probability of finding different loot tiers in selected areas.
    const lootZones = {
        militaryBase: {
            name: "Military Base (Erangel)",
            tier3: "High (30%)", tier2: "Very High (50%)", tier1: "Medium (20%)",
            weapons: "ARs, Snipers, LMGs (High)", healing: "Med Kits, Boosts (High)", armor: "Level 3 (High)"
        },
        hotDrop: {
            name: "Hot Drop (e.g., Pochinki, School)",
            tier3: "Medium (15%)", tier2: "High (40%)", tier1: "High (45%)",
            weapons: "SMGs, Shotguns (Very High)", healing: "First Aids (Medium)", armor: "Level 2 (Medium)"
        },
        city: {
            name: "Large City (e.g., Georgopol, Yasnaya)",
            tier3: "Low (10%)", tier2: "Medium (40%)", tier1: "High (50%)",
            weapons: "ARs, SMGs (Medium)", healing: "Bandages, First Aids (Medium)", armor: "Level 1-2 (Medium)"
        },
        rural: {
            name: "Rural Area (Scattered Houses)",
            tier3: "Very Low (2%)", tier2: "Low (18%)", tier1: "Very High (80%)",
            weapons: "Pistols, Shotguns (Low)", healing: "Bandages (Low)", armor: "Level 1 (Low)"
        }
    };

    window.estimateLootProbability = function() {
        const mapAreaKey = document.getElementById('mapArea').value;
        const selectedArea = lootZones[mapAreaKey];
        const lootResultDiv = document.getElementById('lootResult');

        if (!selectedArea) {
            lootResultDiv.innerHTML = '<p>Please select a map area.</p>';
            return;
        }

        lootResultDiv.innerHTML = `
            <h4>Loot Probability in ${selectedArea.name}:</h4>
            <div class="loot-item"><span>Level 3 Loot:</span><span>${selectedArea.tier3}</span></div>
            <div class="loot-item"><span>Level 2 Loot:</span><span>${selectedArea.tier2}</span></div>
            <div class="loot-item"><span>Level 1 Loot:</span><span>${selectedArea.tier1}</span></div>
            <hr style="margin: 10px 0; border-color: #555;">
            <p><strong>Common Weapons:</strong> ${selectedArea.weapons}</p>
            <p><strong>Healing Items:</strong> ${selectedArea.healing}</p>
            <p><strong>Armor:</strong> ${selectedArea.armor}</p>
            <small>Loot wisely, Survivor!</small>
        `;
        lootResultDiv.style.display = 'block';
    }

    // 6. Survival Rating Calculator (New Feature)
    // Calculates a player's simulated survival rating based on various factors.
    window.calculateSurvivalRating = function() {
        const aggressiveness = document.getElementById('aggressiveness').value;
        const stealth = document.getElementById('stealth').value;
        const teamwork = document.getElementById('teamwork').value;
        const healingItems = parseInt(document.getElementById('healingItems').value);

        let survivalScore = 500; // Base score

        // Adjust for aggressiveness
        if (aggressiveness === 'passive') survivalScore += 100;
        else if (aggressiveness === 'aggressive') survivalScore -= 50;

        // Adjust for stealth
        if (stealth === 'low') survivalScore -= 70;
        else if (stealth === 'high') survivalScore += 80;

        // Adjust for teamwork
        if (teamwork === 'poor') survivalScore -= 100;
        else if (teamwork === 'average') survivalScore += 50;
        else if (teamwork === 'excellent') survivalScore += 150;

        // Adjust for healing items
        survivalScore += healingItems * 10;

        survivalScore = Math.round(Math.max(0, Math.min(1000, survivalScore + (Math.random() * 100 - 50)))); // Add randomness and cap

        let rating = '';
        let ratingClass = '';
        let advice = '';

        if (survivalScore >= 800) {
            rating = 'CHICKEN DINNER POTENTIAL!';
            ratingClass = 'chicken-dinner';
            advice = 'Your skills are honed for victory. Go get that dinner!';
        } else if (survivalScore >= 600) {
            rating = 'TOP 10 FINISH LIKELY!';
            ratingClass = 'top10';
            advice = 'You\'re a strong contender. Stay focused in the late game.';
        } else if (survivalScore >= 400) {
            rating = 'MID-GAME SURVIVOR.';
            ratingClass = 'midgame';
            advice = 'You can make it to the mid-game. Work on your late-game strategy.';
        } else {
            rating = 'EARLY GAME EXIT.';
            ratingClass = 'earlygame';
            advice = 'You might struggle to survive early engagements. Focus on looting and positioning.';
        }

        document.getElementById('survivalResult').innerHTML = `
            <strong>Survival Score:</strong> ${survivalScore}<br>
            <strong>Estimated Outcome:</strong> <span class="${ratingClass}">${rating}</span><br>
            <small>${advice}</small>
        `;
        document.getElementById('survivalResult').style.display = 'block';
    }

    // 7. Real-time System Scanner (Simulated)
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
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Esports Tier"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Esports Tier"];
        const ramOptions = ["4GB (Insufficient)", "8GB (Minimum)", "16GB (Recommended)", "32GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Loot First, Die First (Struggles to run)",
            "Early Game Exit (30-45 FPS on Low)",
            "Mid-Game Scavenger (60 FPS on Medium)",
            "Late-Game Dominator (90+ FPS on High)",
            "Chicken Dinner Machine (Maxed out, flawless)"
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
        else if (overallIndex === 2) overallElement.style.color = "#DAA520"; // Goldenrod for playable
        else overallElement.style.color = "#7FFF00"; // Chartreuse for good/excellent
    }

    // 8. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #2a2a2a, #3a3a3a, #4a4a4a)'; /* Dark grey gradient */
    });

    // 9. Animate elements on scroll
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
    document.querySelectorAll('.specs-section, .calculator, .loadout-optimizer, .zone-strategy, .loot-probability, .survival-calculator, .scanner').forEach(section => {
        section.style.opacity = '0'; // Hide initially for animation
        observer.observe(section);
    });

    // 10. Dynamic Background Intensity based on Time
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

    // 11. Easter Egg - PUBG-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cWinner Winner Chicken Dinner!", 
        "color: #7FFF00; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 5px #7FFF00;");
    console.log("%cLast one standing.", 
        "color: #6B8E23; font-size: 16px; font-style: italic;");

    // Initial calls for interactive components on page load
    // These functions are called once to set initial display values
    calculatePUBGFPS();
    optimizeLoadout(); // Call once to set initial state
    simulateZone(); // Call once to set initial state
    estimateLootProbability(); // Call once to set initial state
    calculateSurvivalRating(); // Call once to set initial state
});
