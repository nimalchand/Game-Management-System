// JavaScript Features for God of War System Requirements Page

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

    // 2. FPS Calculator with God of War-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculateGodOfWarFPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('gowCPU').value;
        const gpu = document.getElementById('gowGPU').value;
        const res = document.getElementById('gowRes').value;
        const settings = document.getElementById('gowSettings').value;

        let baseFPS = 55; // Starting point for average performance in God of War

        // Adjust FPS based on CPU tier
        if (cpu === 'low') baseFPS -= 15;
        else if (cpu === 'high') baseFPS += 10; 

        // Adjust FPS based on GPU tier
        if (gpu === 'low') baseFPS -= 20;
        else if (gpu === 'high') baseFPS += 15;
        
        // Adjust FPS based on resolution
        if (res === '1440') baseFPS *= 0.8;
        else if (res === '4k') baseFPS *= 0.6;

        // Adjust FPS based on graphics settings
        if (settings === 'original') baseFPS *= 1.15;
        else if (settings === 'enhanced') baseFPS *= 0.9;
        else if (settings === 'ultra') baseFPS *= 0.75;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS >= 60) {
            rating = '🔥 Godly Performance!';
            flavorText = 'Your system is ready to unleash Kratos\'s full fury!';
        } else if (baseFPS >= 45) {
            rating = '✅ Worthy of Valhalla';
            flavorText = 'You\'ll experience a solid journey through the Norse realms.';
        } else if (baseFPS >= 30) {
            rating = '👍 Spartan\'s Endurance';
            flavorText = 'Playable, but consider lowering settings for smoother combat.';
        } else {
            rating = '❌ Unworthy (Upgrade Recommended)';
            flavorText = 'The realms are too harsh for your current setup. An upgrade is advised!';
        }
        
        // Display the result in the 'gowFPSResult' div
        document.getElementById('gowFPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #b02020;">${flavorText}</small>
        `;
    }

    // 3. Spartan Rage Management (New Feature)
    // Simulates the Spartan Rage meter's behavior based on actions.
    let currentRage = 50; // Initial rage level (out of 100)

    window.simulateRageManagement = function() {
        const rageAction = document.getElementById('rageAction').value;
        const rageAmount = parseInt(document.getElementById('rageAmount').value);

        let rageChange = 0;
        let advice = '';

        switch (rageAction) {
            case 'damageTaken':
                rageChange = rageAmount * 2; // More rage from taking damage
                advice = `Taking ${rageAmount} damage increased rage.`;
                break;
            case 'damageDealt':
                rageChange = rageAmount * 1.5; // Rage from dealing damage
                advice = `Dealing ${rageAmount} damage increased rage.`;
                break;
            case 'gloryKill':
                rageChange = rageAmount * 5; // Significant rage from glory kills
                advice = `Glory kill granted significant rage!`;
                break;
            case 'useRage':
                rageChange = -rageAmount * 10; // Consumes rage
                advice = `Spartan Rage consumed ${rageAmount * 10} rage.`;
                break;
            case 'ragePotion':
                rageChange = rageAmount * 15; // Rage potion
                advice = `Rage Potion restored rage.`;
                break;
        }

        currentRage += rageChange;
        currentRage = Math.max(0, Math.min(100, currentRage)); // Cap rage between 0 and 100

        let rageStatus = '';
        if (currentRage >= 80) {
            rageStatus = 'Rage is building! Unleash it!';
        } else if (currentRage >= 50) {
            rageStatus = 'Rage is stable. Ready for a burst.';
        } else if (currentRage > 0) {
            rageStatus = 'Rage is low. Build it up, Boy!';
        } else {
            rageStatus = 'Rage exhausted. Fight strategically.';
        }

        document.getElementById('rageLevelDisplay').textContent = `${currentRage}%`;
        document.getElementById('rageResult').querySelector('.progress-fill').style.width = `${currentRage}%`;
        document.getElementById('rageAdvice').textContent = rageStatus;
    }

    // 4. God/Creature Encounter Strategy Planner (New Feature)
    // Provides tactical advice for facing specific foes.
    window.planGodOrCreatureStrategy = function() {
        const creatureName = document.getElementById('creatureName').value;
        const weaponChoice = document.getElementById('weaponChoice').value;

        let strategyAdvice = '';
        let effectiveness = '';
        let effectivenessClass = '';

        const strategies = {
            draugr: {
                axe: "Light attacks and throws. Use Frost attacks to freeze and shatter. Good for single targets.",
                blades: "Wide sweeping attacks for crowd control. Use Fire attacks to burn multiple enemies.",
                fists: "Stun them with bare fists for easy executions. Good for building rage."
            },
            troll: {
                axe: "Aim for the head with throws. Use heavy attacks after dodging their slams. Frost is effective.",
                blades: "Use long-range attacks to chip away health. Use Fire attacks to apply burn. Be mobile.",
                fists: "Prioritize stun. Dodge, then use heavy bare-fist attacks to build stun meter."
            },
            valkyrie: {
                axe: "Precision throws and quick combos. Learn their attack patterns for perfect parries and dodges. Frost runics are strong.",
                blades: "Aggressive, fast attacks to keep pressure. Use fire runics for burst damage. Be ready to dodge their unblockables.",
                fists: "Extremely challenging. Focus on parries and stun. Only for the most skilled players."
            },
            baldur: {
                axe: "Phase 1: Focus on dodging and counter-attacking when he's vulnerable. Phase 2: Use Blades of Chaos for range and crowd control. Adapt to his elemental shifts.",
                blades: "Phase 1: Use Blades of Chaos for aggressive, wide attacks. Phase 2: Switch to Leviathan Axe when he's vulnerable to frost. Be fluid.",
                fists: "Not recommended for a first playthrough. Requires mastery of parrying and dodging every attack. High risk, high reward."
            },
            zeus: {
                axe: "Focus on dodging his lightning attacks and striking when he's recovering. Use Frost attacks.",
                blades: "Use the Blades for quick, aggressive combos. Be prepared for his powerful AoE attacks.",
                fists: "Unleash Spartan Rage and pummel him. This is a flashback, so just enjoy the brutality!"
            }
        };

        strategyAdvice = strategies[creatureName][weaponChoice];

        // Simplified effectiveness rating
        if ((creatureName === 'valkyrie' && weaponChoice === 'fists') || (creatureName === 'baldur' && weaponChoice === 'fists')) {
            effectiveness = 'EXTREME CHALLENGE';
            effectivenessClass = 'ineffective'; // Red, indicating high difficulty
        } else if (strategyAdvice.includes('effective') || strategyAdvice.includes('strong') || strategyAdvice.includes('good')) {
            effectiveness = 'Effective';
            effectivenessClass = 'effective'; // Green
        } else if (strategyAdvice.includes('recommended') || strategyAdvice.includes('mobile')) {
            effectiveness = 'Moderate';
            effectivenessClass = 'moderate'; // Red, indicating moderate effectiveness
        } else {
            effectiveness = 'Standard Approach';
            effectivenessClass = 'moderate'; // Default to moderate
        }


        document.getElementById('strategyResult').innerHTML = `
            <strong>Foe:</strong> ${document.getElementById('creatureName').options[document.getElementById('creatureName').selectedIndex].text}<br>
            <strong>Weapon:</strong> ${document.getElementById('weaponChoice').options[document.getElementById('weaponChoice').selectedIndex].text}<br>
            <strong>Strategy:</strong> <span class="${effectivenessClass}">${strategyAdvice}</span><br>
            <small>Remember: Adaptability is key, Boy!</small>
        `;
        document.getElementById('strategyResult').style.display = 'block';
    }

    // 5. Combat Stance Selector (New Feature)
    // Describes different combat stances/approaches in God of War.
    window.selectCombatStance = function() {
        const combatStance = document.getElementById('combatStance').value;

        let stanceName = '';
        let description = '';
        let strengths = '';
        let weaknesses = '';

        switch (combatStance) {
            case 'aggressive':
                stanceName = 'Aggressive (Axe/Blades)';
                description = 'Focuses on relentless offense, chaining combos and exploiting openings.';
                strengths = 'High damage output, quick enemy elimination, satisfying combat flow.';
                weaknesses = 'Vulnerable to unblockable attacks, requires precise dodging/parrying, can be punished if overcommitted.';
                break;
            case 'defensive':
                stanceName = 'Defensive (Shield/Parry)';
                description = 'Emphasizes blocking, parrying, and dodging to control the battlefield and create openings.';
                strengths = 'High survivability, effective against multiple enemies, builds stun meter quickly.';
                weaknesses = 'Lower damage output, relies on precise timing, can be slow against bosses with few parry windows.';
                break;
            case 'runic':
                stanceName = 'Runic (Elemental Attacks)';
                description = 'Prioritizes using powerful Runic Attacks from both Leviathan Axe and Blades of Chaos.';
                strengths = 'High burst damage, elemental effects (frost/burn), good for crowd control or single-target punishment.';
                weaknesses = 'Long cooldowns on Runic Attacks, requires careful management of cooldowns, can leave Kratos vulnerable during animations.';
                break;
            case 'boy':
                stanceName = 'Atreus Support';
                description = 'Focuses on utilizing Atreus\'s arrows and summons to distract, stun, and deal additional damage.';
                strengths = 'Excellent crowd control, valuable distractions, builds stun meter for Kratos, provides ranged support.';
                weaknesses = 'Atreus\'s attacks are lower damage, relies on Atreus\'s cooldowns, less direct control over the fight.';
                break;
        }

        document.getElementById('combatStanceResult').innerHTML = `
            <strong>Stance:</strong> ${stanceName}<br>
            <strong>Description:</strong> ${description}<br>
            <strong>Strengths:</strong> ${strengths}<br>
            <strong>Weaknesses:</strong> ${weaknesses}
        `;
        document.getElementById('combatStanceResult').style.display = 'block';
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
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "God Tier"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "God Tier"];
        const ramOptions = ["4GB (Insufficient)", "8GB (Minimum)", "16GB (Recommended)", "32GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Unworthy (Struggles to run)",
            "Spartan Minimum (30-45 FPS on Low)",
            "Worthy of Valhalla (60 FPS on Medium)",
            "Aesir Performance (60+ FPS on High)",
            "God Tier (Maxed out, smooth)"
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
        else if (overallIndex === 2) overallElement.style.color = "#b02020"; // Red for playable
        else overallElement.style.color = "#00cc00"; // Green for good/excellent
    }

    // 7. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #0a0a0a, #2a2a2a, #3a3a3a)'; /* Dark grey gradient */
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
    document.querySelectorAll('.specs-section, .calculator, .rage-management, .creature-strategy-planner, .combat-stance-selector, .scanner').forEach(section => {
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

    // 10. Easter Egg - God of War-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cBOY!", 
        "color: #b02020; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 5px #b02020;");
    console.log("%cThe path is clear. Your journey awaits.", 
        "color: #800000; font-size: 16px; font-style: italic;");

    // Initial calls for interactive components on page load
    // These functions are called once to set initial display values
    calculateGodOfWarFPS();
    simulateRageManagement(); // Call once to set initial state
    planGodOrCreatureStrategy(); // Call once to set initial state
    selectCombatStance(); // Call once to set initial state
});
