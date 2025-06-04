// JavaScript Features for Elden Ring System Requirements Page

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

    // 2. FPS Calculator with Elden Ring-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculateEldenRingFPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('erCPU').value;
        const gpu = document.getElementById('erGPU').value;
        const res = document.getElementById('erRes').value;
        const settings = document.getElementById('erSettings').value;

        let baseFPS = 50; // Starting point for average performance in Elden Ring (known for 60fps cap)

        // Adjust FPS based on CPU tier
        if (cpu === 'low') baseFPS -= 15;
        else if (cpu === 'high') baseFPS += 10; // Elden Ring is more GPU bound

        // Adjust FPS based on GPU tier
        if (gpu === 'low') baseFPS -= 20;
        else if (gpu === 'high') baseFPS += 15;
        
        // Adjust FPS based on resolution
        if (res === '1440') baseFPS *= 0.8;
        else if (res === '4k') baseFPS *= 0.6;

        // Adjust FPS based on graphics settings
        if (settings === 'low') baseFPS *= 1.15;
        else if (settings === 'high') baseFPS *= 0.9;
        else if (settings === 'max') baseFPS *= 0.75;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS >= 60) {
            rating = '🔥 Elden Lord Performance!';
            flavorText = 'Your system is ready to claim the Elden Ring with grace!';
        } else if (baseFPS >= 45) {
            rating = '✅ Tarnished\'s Resolve';
            flavorText = 'You\'ll endure the Lands Between with solid performance.';
        } else if (baseFPS >= 30) {
            rating = '👍 Journeyman\'s Path';
            flavorText = 'Playable, but consider lowering settings for smoother combat.';
        } else {
            rating = '❌ Maidenless Frame Rate (Upgrade Recommended)';
            flavorText = 'The Lands Between will be unforgiving. An upgrade is highly advised!';
        }
        
        // Display the result in the 'eldenRingFPSResult' div
        document.getElementById('eldenRingFPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #daa520;">${flavorText}</small>
        `;
    }

    // 3. Build Planner (Elden Ring Specific Feature)
    // Simulates stat allocation based on starting class and desired focus.
    window.planBuild = function() {
        const startingClass = document.getElementById('startingClass').value;
        const desiredStat = document.getElementById('desiredStat').value;
        const targetLevel = parseInt(document.getElementById('targetLevel').value);

        // Base stats for each starting class (simplified for demonstration)
        const baseStats = {
            vagabond: { vigor: 15, mind: 10, endurance: 11, strength: 14, dexterity: 13, intelligence: 9, faith: 9, arcane: 7 },
            warrior: { vigor: 11, mind: 12, endurance: 11, strength: 10, dexterity: 16, intelligence: 10, faith: 8, arcane: 9 },
            hero: { vigor: 14, mind: 9, endurance: 12, strength: 16, dexterity: 9, intelligence: 7, faith: 8, arcane: 11 },
            bandit: { vigor: 10, mind: 11, endurance: 10, strength: 9, dexterity: 13, intelligence: 9, faith: 8, arcane: 14 },
            astrologer: { vigor: 9, mind: 15, endurance: 9, strength: 8, dexterity: 12, intelligence: 16, faith: 7, arcane: 9 },
            prophet: { vigor: 10, mind: 14, endurance: 8, strength: 11, dexterity: 10, intelligence: 7, faith: 16, arcane: 10 },
            samurai: { vigor: 12, mind: 11, endurance: 13, strength: 12, dexterity: 15, intelligence: 9, faith: 8, arcane: 8 },
            prisoner: { vigor: 11, mind: 12, endurance: 11, strength: 11, dexterity: 14, intelligence: 14, faith: 6, arcane: 9 },
            confessor: { vigor: 10, mind: 13, endurance: 10, strength: 12, dexterity: 12, intelligence: 9, faith: 14, arcane: 9 },
            wretch: { vigor: 10, mind: 10, endurance: 10, strength: 10, dexterity: 10, intelligence: 10, faith: 10, arcane: 10 }
        };

        let currentStats = { ...baseStats[startingClass] };
        let currentLevel = 1; // Simplified starting level

        // Simulate leveling up and allocating points (very basic)
        let pointsToAllocate = targetLevel - currentLevel;
        if (pointsToAllocate < 0) pointsToAllocate = 0;

        // Prioritize desired stat, then distribute remaining points
        for (let i = 0; i < pointsToAllocate; i++) {
            if (currentStats[desiredStat] < 99) { // Cap stats at 99
                currentStats[desiredStat]++;
            } else {
                // If primary stat is maxed, distribute to Vigor, Endurance, Strength, Dex (simplified)
                if (currentStats.vigor < 60) currentStats.vigor++;
                else if (currentStats.endurance < 60) currentStats.endurance++;
                else if (currentStats.strength < 99) currentStats.strength++;
                else if (currentStats.dexterity < 99) currentStats.dexterity++;
            }
        }

        let buildRating = '';
        let buildClass = '';
        let advice = '';

        // Simplified rating based on target level and primary stat value
        if (targetLevel >= 120 && currentStats[desiredStat] >= 60) {
            buildRating = 'Optimal Build Achieved!';
            buildClass = 'optimal';
            advice = `Your ${startingClass} is ready to master ${desiredStat}!`;
        } else if (targetLevel >= 80 && currentStats[desiredStat] >= 40) {
            buildRating = 'Good Foundation.';
            buildClass = 'good';
            advice = `A solid ${startingClass} build. Keep leveling ${desiredStat}!`;
        } else {
            buildRating = 'Suboptimal Allocation.';
            buildClass = 'suboptimal';
            advice = `Consider re-evaluating your ${startingClass} build for ${desiredStat}.`;
        }

        let statsHtml = ``;
        for (const stat in currentStats) {
            statsHtml += `<div class="spec-item"><span>${stat.charAt(0).toUpperCase() + stat.slice(1)}:</span><span>${currentStats[stat]}</span></div>`;
            statsHtml += `<div class="progress-bar"><div class="progress-fill" style="width: ${currentStats[stat]}%"></div></div>`;
        }

        document.getElementById('buildResult').innerHTML = `
            <strong>Starting Class:</strong> ${startingClass.charAt(0).toUpperCase() + startingClass.slice(1)}<br>
            <strong>Target Level:</strong> ${targetLevel}<br>
            <strong>Primary Focus:</strong> ${desiredStat.charAt(0).toUpperCase() + desiredStat.slice(1)}<br>
            <hr style="margin: 10px 0; border-color: #555;">
            <h4>Estimated Stats:</h4>
            ${statsHtml}
            <hr style="margin: 10px 0; border-color: #555;">
            <strong>Build Status:</strong> <span class="${buildClass}">${buildRating}</span><br>
            <small>${advice}</small>
        `;
        document.getElementById('buildResult').style.display = 'block';
    }

    // 4. Boss Strategy Planner (Elden Ring Specific Feature)
    // Provides tactical advice for facing specific bosses.
    window.planStrategy = function() {
        const bossName = document.getElementById('bossName').value;
        const playerBuildType = document.getElementById('playerBuildType').value;

        let strategyAdvice = '';
        let effectiveness = '';
        let effectivenessClass = '';

        const bossStrategies = {
            margit: {
                melee: "Stay close, dodge into his attacks, and look for openings after combos. Use a Spirit Ash to distract him.",
                sorcery: "Keep distance, use Glintstone Pebble/Shard. Charge Comet Azur for openings. Summon Spirit Ash for aggro.",
                faith: "Use ranged Incantations like Lightning Spear. Keep distance, heal with Urgent Heal. Summon Spirit Ash.",
                arcane: "Focus on status effects like Poison/Scarlet Rot with weapons. Use bleed builds if available. Summon Spirit Ash."
            },
            godrick: {
                melee: "Aggressive dodging and counter-attacks. Watch for his delayed swings. Use a strong Ash of War.",
                sorcery: "Maintain distance, use fast spells. When he grafts, use charged spells during his transformation.",
                faith: "Use Black Flame or Fire spells. Buff yourself with Golden Vow. Be ready to dodge his AoE attacks.",
                arcane: "Bleed is highly effective. Focus on applying bleed with quick attacks. Watch for his wind-up attacks."
            },
            rennalla: {
                melee: "Phase 1: Attack the glowing students. Phase 2: Dodge her spells, close distance, and punish after her larger attacks.",
                sorcery: "Phase 1: Use basic spells. Phase 2: Use Carian Slicer or Swift Glintstone Shard up close. Her magic resistance is high.",
                faith: "Phase 1: Use basic attacks. Phase 2: Use physical Incantations like Stone of Gurranq. Avoid magic spells as she resists them.",
                arcane: "Phase 1: Use basic attacks. Phase 2: Focus on melee attacks or physical Ashes of War. She resists most status effects."
            },
            malenia: {
                melee: "The hardest boss. Learn Waterfowl Dance timing. Use a shield, Bloodhound's Step, or endure with high Vigor. Bleed/Frostbite are effective.",
                sorcery: "Keep distance, use Comet Azur or Loretta's Greatbow when she's open. Dodge Waterfowl Dance. Mimic Tear helps.",
                faith: "Use Black Flame, Pest Threads, or healing Incantations. Dodge Waterfowl Dance. Summon Tiche or Mimic Tear.",
                arcane: "Bleed builds are very strong. Use Rivers of Blood or Mohgwyn's Sacred Spear. Practice dodging Waterfowl Dance relentlessly."
            },
            radagon: {
                melee: "Dodge his delayed hammer swings. Use jumping attacks to break his posture. Focus on physical damage.",
                sorcery: "Use Comet Azur or Loretta's Greatbow during openings. Be prepared for his quick teleporting attacks. High magic resistance.",
                faith: "Use Black Flame or physical Incantations. His holy resistance is high. Learn his attack patterns.",
                arcane: "Focus on physical damage or bleed/frostbite if you can apply it. Avoid Arcane spells as he resists them."
            }
        };

        strategyAdvice = bossStrategies[bossName][playerBuildType];

        // Simplified effectiveness rating
        if (bossName === 'malenia' && playerBuildType === 'bleed') { // Bleed is very strong against Malenia
            effectiveness = 'Highly Effective';
            effectivenessClass = 'effective';
        } else if (strategyAdvice.includes('highly effective') || strategyAdvice.includes('very strong')) {
            effectiveness = 'Highly Effective';
            effectivenessClass = 'effective';
        } else if (strategyAdvice.includes('solid') || strategyAdvice.includes('good')) {
            effectiveness = 'Moderately Effective';
            effectivenessClass = 'moderate';
        } else {
            effectiveness = 'Standard Approach';
            effectivenessClass = 'ineffective'; // Not necessarily ineffective, but less specialized
        }


        document.getElementById('strategyResult').innerHTML = `
            <strong>Boss:</strong> ${document.getElementById('bossName').options[document.getElementById('bossName').selectedIndex].text}<br>
            <strong>Your Build:</strong> ${document.getElementById('playerBuildType').options[document.getElementById('playerBuildType').selectedIndex].text}<br>
            <strong>Strategy:</strong> <span class="${effectivenessClass}">${strategyAdvice}</span><br>
            <small>Note: Practice and timing are key, Tarnished!</small>
        `;
        document.getElementById('strategyResult').style.display = 'block';
    }

    // 5. Combat Approach Selector (Elden Ring Specific Feature)
    // Describes different combat approaches in Elden Ring.
    window.selectCombatApproach = function() {
        const combatApproach = document.getElementById('combatApproach').value;

        let approachName = '';
        let description = '';
        let strengths = '';
        let weaknesses = '';

        switch (combatApproach) {
            case 'melee':
                approachName = 'Melee Combat (Strength/Dexterity)';
                description = 'Focuses on close-quarters combat with swords, axes, spears, and other physical weapons.';
                strengths = 'High physical damage, wide variety of weapons and Ashes of War, direct engagement.';
                weaknesses = 'Requires careful positioning, vulnerable to ranged attacks, can be challenging against fast bosses.';
                break;
            case 'sorcery':
                approachName = 'Sorcery (Intelligence)';
                description = 'Utilizes Glintstone sorceries for ranged attacks, utility, and magical damage.';
                strengths = 'Safe ranged damage, strong against magic-weak foes, excellent crowd control with AoE spells.';
                weaknesses = 'Requires Mind (FP) management, vulnerable up close, can be resisted by magic-resistant enemies.';
                break;
            case 'faith':
                approachName = 'Faith (Incantations)';
                description = 'Wields Incantations for healing, buffs, elemental attacks, and status effects.';
                strengths = 'Versatile support and offense, strong healing, wide range of elemental damage types, powerful buffs.';
                weaknesses = 'Requires Mind (FP) management, some incantations have long cast times, can be resisted by specific enemies.';
                break;
            case 'ranged':
                approachName = 'Ranged (Bows/Crossbows)';
                description = 'Specializes in long-distance combat using bows and crossbows, often combined with status arrows.';
                strengths = 'Safe engagement, can pull enemies, effective for applying status effects from afar.';
                weaknesses = 'Lower burst damage, limited ammo, less effective in close quarters, can be difficult against agile enemies.';
                break;
        }

        document.getElementById('combatApproachResult').innerHTML = `
            <strong>Approach:</strong> ${approachName}<br>
            <strong>Description:</strong> ${description}<br>
            <strong>Strengths:</strong> ${strengths}<br>
            <strong>Weaknesses:</strong> ${weaknesses}
        `;
        document.getElementById('combatApproachResult').style.display = 'block';
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
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Elden Lord Tier"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Elden Lord Tier"];
        const ramOptions = ["8GB (Insufficient)", "12GB (Minimum)", "16GB (Recommended)", "32GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Maidenless Performance (Struggles to run)",
            "Tarnished Minimum (30-45 FPS on Low)",
            "Guided by Grace (60 FPS on Medium)",
            "Demigod Performance (60+ FPS on High)",
            "Elden Lord Tier (Maxed out, smooth)"
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
        else if (overallIndex === 2) overallElement.style.color = "#daa520"; // Golden for playable
        else overallElement.style.color = "#00cc00"; // Green for good/excellent
    }

    // 7. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #0d0d0d, #2d2d2d, #3d3d3d)'; /* Dark grey gradient */
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
    document.querySelectorAll('.specs-section, .calculator, .build-planner, .boss-strategy-planner, .combat-approach-selector, .scanner').forEach(section => {
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

    // 10. Easter Egg - Elden Ring-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cRise, Tarnished.", 
        "color: #daa520; font-size: 18px; font-weight: bold; text-shadow: 1px 1px 3px #daa520;");
    console.log("%cThe call of the Elden Ring awaits.", 
        "color: #b8860b; font-size: 14px; font-style: italic;");

    // Initial calls for interactive components on page load
    // These functions are called once to set initial display values
    calculateEldenRingFPS();
    planBuild(); // Call once to set initial state
    planStrategy(); // Call once to set initial state
    selectCombatApproach(); // Call once to set initial state
});
