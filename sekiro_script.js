// JavaScript Features for Sekiro: Shadows Die Twice System Requirements Page

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

    // 2. FPS Calculator with Sekiro-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculateSekiroFPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('sekiroCPU').value;
        const gpu = document.getElementById('sekiroGPU').value;
        const res = document.getElementById('sekiroRes').value;
        const settings = document.getElementById('sekiroSettings').value;

        let baseFPS = 55; // Starting point for Sekiro (known for 60fps cap, but can be demanding)

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
        if (settings === 'low') baseFPS *= 1.15;
        else if (settings === 'high') baseFPS *= 0.9;
        else if (settings === 'max') baseFPS *= 0.75;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS >= 60) {
            rating = '🔥 Shinobi Master Performance!';
            flavorText = 'Your system is ready for flawless deflections and brutal combat!';
        } else if (baseFPS >= 45) {
            rating = '✅ Wolf\'s Resolve';
            flavorText = 'You\'ll carve your path with solid performance.';
        } else if (baseFPS >= 30) {
            rating = '👍 Enduring Spirit';
            flavorText = 'Playable, but consider lowering settings for smoother swordplay.';
        } else {
            rating = '❌ Shadows Consume (Upgrade Recommended)';
            flavorText = 'The Sengoku period is too demanding. An upgrade is highly advised!';
        }
        
        // Display the result in the 'sekiroFPSResult' div
        document.getElementById('sekiroFPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #b02020;">${flavorText}</small>
        `;
    }

    // 3. Combat Arts & Prosthetic Tools Planner (New Feature)
    // Simulates synergies between a selected Combat Art and Prosthetic Tool.
    const combatArtsAndTools = {
        whirlwind: { 
            name: "Whirlwind Slash", 
            type: "Combat Art", 
            desc: "A wide, sweeping attack that hits multiple foes.",
            synergies: {
                shuriken: "Use after Shuriken to hit multiple staggered foes.",
                axe: "Use after Axe for AoE damage after breaking guard.",
                flame: "Combine with Flame Vent for burning AoE damage."
            }
        },
        ichimonji: { 
            name: "Ichimonji", 
            type: "Combat Art", 
            desc: "A powerful overhead strike that recovers posture.",
            synergies: {
                shuriken: "Use after Shuriken to interrupt and follow up with posture recovery.",
                umbrella: "Use after Umbrella's projected force for a strong counter-attack.",
                spear: "Use after Loaded Spear's pull for a direct posture damage hit."
            }
        },
        ashina: {
            name: "Ashina Cross",
            type: "Combat Art",
            desc: "A swift, unblockable cross-slash, excellent for punishing openings.",
            synergies: {
                firecrackers: "Use after Firecrackers to disorient and land a clean hit.",
                flame: "Combine with Flame Vent for a fiery unblockable attack.",
                axe: "Use after Loaded Axe to break guard then follow with unblockable damage."
            }
        },
        mortal: {
            name: "Mortal Draw",
            type: "Combat Art",
            desc: "A long-range, high-damage unblockable attack with a long wind-up.",
            synergies: {
                shuriken: "Use Shuriken to interrupt enemy attacks during Mortal Draw wind-up.",
                firecrackers: "Use Firecrackers to stun enemies and guarantee Mortal Draw hit.",
                umbrella: "Use Umbrella to block incoming attacks during the wind-up."
            }
        },
        shuriken: { 
            name: "Loaded Shuriken", 
            type: "Prosthetic Tool", 
            desc: "Throws a quick projectile, good for interrupting or finishing off weak foes.",
            synergies: {
                whirlwind: "Interrupt enemy attacks then follow with Whirlwind Slash.",
                ichimonji: "Interrupt enemy attacks then follow with Ichimonji for posture recovery.",
                ashina: "Interrupt enemy attacks to create an opening for Ashina Cross."
            }
        },
        axe: { 
            name: "Loaded Axe", 
            type: "Prosthetic Tool", 
            desc: "A heavy, guard-breaking swing.",
            synergies: {
                whirlwind: "Break guard with Axe, then use Whirlwind Slash for AoE damage.",
                ichimonji: "Break guard with Axe, then use Ichimonji for heavy posture damage.",
                mortal: "Break guard with Axe to create an opening for Mortal Draw."
            }
        },
        flame: { 
            name: "Flame Vent", 
            type: "Prosthetic Tool", 
            desc: "Emits a burst of fire, burning enemies.",
            synergies: {
                whirlwind: "Burn enemies with Flame Vent, then use Whirlwind Slash for burning AoE.",
                ashina: "Burn enemies, then use Ashina Cross for a fiery unblockable."
            }
        },
        umbrella: { 
            name: "Suzaku's Lotus Umbrella", 
            type: "Prosthetic Tool", 
            desc: "A deployable shield that blocks attacks and can reflect projectiles.",
            synergies: {
                ichimonji: "Block attacks with Umbrella, then use Ichimonji for posture recovery.",
                mortal: "Block attacks during Mortal Draw wind-up to guarantee hit."
            }
        },
        spear: {
            name: "Loaded Spear",
            type: "Prosthetic Tool",
            desc: "A piercing thrust that can pull enemies or remove armor.",
            synergies: {
                ichimonji: "Pull enemy with Spear, then use Ichimonji for direct posture damage.",
                mortal: "Pull enemy then use Mortal Draw for a guaranteed hit."
            }
        },
        firecrackers: {
            name: "Shinobi Firecrackers",
            type: "Prosthetic Tool",
            desc: "Disorients enemies and animals, creating an opening.",
            synergies: {
                ashina: "Stun with Firecrackers, then land a clean Ashina Cross.",
                mortal: "Stun with Firecrackers to guarantee Mortal Draw hit."
            }
        }
    };

    window.planCombatArtsAndToolsSynergy = function() {
        const combatArtKey = document.getElementById('combatArt').value;
        const prostheticToolKey = document.getElementById('prostheticTool').value;
        const synergyResultDiv = document.getElementById('synergyResult');

        let resultHTML = '';
        let synergyRating = '';
        let synergyClass = '';

        const selectedArt = combatArtsAndTools[combatArtKey];
        const selectedTool = combatArtsAndTools[prostheticToolKey]; // Re-using the same object for simplicity

        if (!selectedArt || !selectedTool) {
            synergyResultDiv.innerHTML = '<p>Please select both a Combat Art and a Prosthetic Tool.</p>';
            return;
        }

        resultHTML += `<h4>Selected Combat Art: ${selectedArt.name}</h4>`;
        resultHTML += `<p>${selectedArt.desc}</p>`;
        
        resultHTML += `<h4>Selected Prosthetic Tool: ${selectedTool.name}</h4>`;
        resultHTML += `<p>${selectedTool.desc}</p>`;

        let specificSynergy = selectedArt.synergies[prostheticToolKey] || selectedTool.synergies[combatArtKey];

        if (specificSynergy) {
            synergyRating = 'Strong Synergy!';
            synergyClass = 'strong';
            resultHTML += `<p style="color: #daa520;"><strong>Synergy Found:</strong> ${specificSynergy}</p>`;
        } else {
            synergyRating = 'Basic Combination';
            synergyClass = 'basic';
            resultHTML += `<p style="color: #cccccc;"><strong>Potential:</strong> These can be used together, but may not have a specific powerful synergy. Experiment!</p>`;
        }

        synergyResultDiv.innerHTML = `
            ${resultHTML}
            <p><strong>Overall Combination:</strong> <span class="${synergyClass}">${synergyRating}</span></p>
        `;
        synergyResultDiv.style.display = 'block';
    }

    // 4. Shinobi Prosthetic Tool Selector (New Feature)
    // Defines prosthetic tools and their upgrades.
    const prostheticTools = {
        shuriken: {
            name: "Loaded Shuriken",
            upgrades: [
                { name: "Basic Shuriken", desc: "Throws a single shuriken. Good for interrupting." },
                { name: "Spinning Shuriken", desc: "Throws multiple shuriken in a wider arc." },
                { name: "Phantom Kunai", desc: "Throws a spirit shuriken that deals more damage and can pierce." }
            ]
        },
        axe: {
            name: "Loaded Axe",
            upgrades: [
                { name: "Basic Loaded Axe", desc: "A heavy swing that breaks enemy posture and guard." },
                { name: "Sparking Axe", desc: "Adds a fiery explosion to the axe swing." },
                { name: "Lazulite Axe", desc: "Deals increased damage to apparitions and inflicts terror." }
            ]
        },
        flame: {
            name: "Flame Vent",
            upgrades: [
                { name: "Basic Flame Vent", desc: "Emits a burst of fire, burning enemies." },
                { name: "Okinaga's Flame Vent", desc: "Increases the range and duration of the flame." },
                { name: "Lazulite Sacred Flame", desc: "Emits sacred flames that deal increased damage to apparitions." }
            ]
        },
        umbrella: {
            name: "Loaded Umbrella",
            upgrades: [
                { name: "Basic Umbrella", desc: "Deploys a shield that blocks attacks." },
                { name: "Phoenix's Lilac Umbrella", desc: "Blocks terror and spirit attacks." },
                { name: "Suzaku's Lotus Umbrella", desc: "Blocks fire attacks and can reflect projectiles." }
            ]
        },
        spear: {
            name: "Loaded Spear",
            upgrades: [
                { name: "Basic Loaded Spear", desc: "A piercing thrust that can pull enemies or remove armor." },
                { name: "Senpou Leaping Kicks", desc: "Allows for a follow-up kick after the spear thrust." },
                { name: "Spiral Spear", desc: "A powerful, spiraling thrust that deals increased posture damage." }
            ]
        },
        firecrackers: {
            name: "Shinobi Firecrackers",
            upgrades: [
                { name: "Basic Firecrackers", desc: "Disorients enemies and animals, creating an opening." },
                { name: "Spring-load Firecrackers", desc: "Allows for quicker deployment of firecrackers." },
                { name: "Purple Fume Spark", desc: "Creates a cloud of purple smoke that inflicts poison." }
            ]
        }
    };

    const toolSelect = document.getElementById('tool');
    const upgradeSelect = document.getElementById('upgrade');

    // Function to populate upgrades based on selected tool
    function populateUpgrades() {
        const selectedToolKey = toolSelect.value;
        const selectedTool = prostheticTools[selectedToolKey];
        upgradeSelect.innerHTML = ''; // Clear existing options

        if (selectedTool) {
            selectedTool.upgrades.forEach(upgrade => {
                const option = document.createElement('option');
                option.value = upgrade.name.toLowerCase().replace(/[^a-z0-9]/g, ''); // Simple ID
                option.textContent = upgrade.name;
                upgradeSelect.appendChild(option);
            });
        }
        // Trigger initial display
        selectProstheticUpgrade();
    }

    // Event listener for tool change
    toolSelect.addEventListener('change', populateUpgrades);

    window.selectProstheticUpgrade = function() {
        const selectedToolKey = toolSelect.value;
        const selectedUpgradeValue = upgradeSelect.value;
        const upgradeResultDiv = document.getElementById('upgradeResult');

        const selectedTool = prostheticTools[selectedToolKey];
        if (!selectedTool) {
            upgradeResultDiv.innerHTML = '<p>Please select a prosthetic tool.</p>';
            return;
        }

        const selectedUpgrade = selectedTool.upgrades.find(u => u.name.toLowerCase().replace(/[^a-z0-9]/g, '') === selectedUpgradeValue);

        if (selectedUpgrade) {
            upgradeResultDiv.innerHTML = `
                <h4>${selectedTool.name} - ${selectedUpgrade.name}</h4>
                <p><strong>Effect:</strong> ${selectedUpgrade.desc}</p>
                <small>Master your tools to overcome any challenge!</small>
            `;
        } else {
            upgradeResultDiv.innerHTML = '<p>Select an upgrade to see its details.</p>';
        }
        upgradeResultDiv.style.display = 'block';
    }

    // 5. Combat Encounter Strategy Guide (New Feature)
    // Provides tactical advice for facing specific enemies/bosses.
    const enemyStrategies = {
        genichiro: {
            name: "Genichiro Ashina",
            strategies: {
                aggressive: "Focus on deflecting his combos to build posture. Counter his thrusts with Mikiri Counter, and sweeps with a jump kick.",
                evasive: "Dodge behind him during his longer combos for a few hits. Use Loaded Axe to break his guard.",
                toolHeavy: "Use Firecrackers to stun him during openings. Loaded Axe for posture damage. Umbrella for lightning reversal in final phase."
            },
            advice: "Master deflection and Mikiri Counter. His lightning phase requires careful timing."
        },
        ape: {
            name: "Guardian Ape",
            strategies: {
                aggressive: "Phase 1: Dodge his flailing attacks and punish after his long combos. Phase 2: Perfect parry his sword swings to build posture. Use Loaded Spear on his headless body.",
                evasive: "Keep distance in Phase 1, baiting his perilous attacks. In Phase 2, dodge his sword attacks and use the spear for critical hits.",
                toolHeavy: "Use Flame Vent to burn him in Phase 1. In Phase 2, use Loaded Spear after his large posture break from deflecting."
            },
            advice: "Phase 1 is chaotic, Phase 2 is about precise deflections. Don't forget the spear in Phase 2!"
        },
        owl: {
            name: "Great Shinobi Owl",
            strategies: {
                aggressive: "Stay aggressive, deflect his sword swings. Mikiri Counter his thrusts. Jump his firecracker sweeps.",
                evasive: "Dodge around him, baiting his slower attacks. Use Shuriken to interrupt his healing item.",
                toolHeavy: "Firecrackers are excellent for stunning him. Loaded Axe for posture damage. Umbrella for defense."
            },
            advice: "He's a true shinobi. Learn his patterns and punish his openings."
        },
        isshin: {
            name: "Isshin, the Sword Saint",
            strategies: {
                aggressive: "The ultimate test of deflection. Stay in his face, parry everything. Mikiri Counter his thrusts, jump his sweeps. Use Ichimonji to recover your posture.",
                evasive: "Extremely difficult to evade. You must learn to deflect. Use Mortal Draw during openings.",
                toolHeavy: "Umbrella for lightning reversal. Firecrackers for brief stun. Loaded Spear for removing armor in his final phase."
            },
            advice: "There is no escape. Only deflection. Hesitation is defeat."
        },
        loneShadow: {
            name: "Lone Shadow Swordsman",
            strategies: {
                aggressive: "Deflect his kicks and punches. Mikiri Counter his thrusts. Use Ichimonji to recover posture.",
                evasive: "Dodge his quick attacks and counter. Use Loaded Axe to break his guard.",
                toolHeavy: "Firecrackers are very effective for stunning these foes. Flame Vent can burn them."
            },
            advice: "They are quick and aggressive. Master Mikiri Counter and stay on the offensive."
        }
    };

    window.guideEnemyStrategy = function() {
        const enemyType = document.getElementById('enemyType').value;
        const playerApproach = document.getElementById('playerApproach').value;
        const strategyResultDiv = document.getElementById('strategyResult');

        const selectedEnemy = enemyStrategies[enemyType];
        if (!selectedEnemy) {
            strategyResultDiv.innerHTML = '<p>Please select an enemy or boss.</p>';
            return;
        }

        const strategyAdvice = selectedEnemy.strategies[playerApproach];
        let effectiveness = '';
        let effectivenessClass = '';

        // Simple effectiveness rating based on enemy type and approach
        if (enemyType === 'isshin' && playerApproach === 'evasive') {
            effectiveness = 'EXTREMELY DIFFICULT';
            effectivenessClass = 'difficult';
        } else if (strategyAdvice.includes('Master') || strategyAdvice.includes('excellent') || strategyAdvice.includes('crucial')) {
            effectiveness = 'Highly Effective';
            effectivenessClass = 'effective';
        } else if (strategyAdvice.includes('Good for') || strategyAdvice.includes('effective')) {
            effectiveness = 'Moderately Effective';
            effectivenessClass = 'moderate';
        } else {
            effectiveness = 'Challenging Approach';
            effectivenessClass = 'difficult';
        }

        strategyResultDiv.innerHTML = `
            <strong>Foe:</strong> ${selectedEnemy.name}<br>
            <strong>Your Playstyle:</strong> ${document.getElementById('playerApproach').options[document.getElementById('playerApproach').selectedIndex].text}<br>
            <strong>Strategy:</strong> <span class="${effectivenessClass}">${strategyAdvice}</span><br>
            <small>${selectedEnemy.advice}</small>
        `;
        strategyResultDiv.style.display = 'block';
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
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Shinobi Master Tier"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Shinobi Master Tier"];
        const ramOptions = ["2GB (Insufficient)", "4GB (Minimum)", "8GB (Recommended)", "16GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Hesitation is Defeat (Struggles to run)",
            "Wolf's Struggle (30-45 FPS on Low)",
            "Ashina Warrior (60 FPS on Medium)",
            "Immortal Severance (90+ FPS on High)",
            "Divine Heir's Will (Maxed out, flawless)"
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
        if (overallIndex <= 1) overallElement.style.color = "#b02020"; // Red for poor
        else if (overallIndex === 2) overallElement.style.color = "#daa520"; // Gold for playable
        else overallElement.style.color = "#00cc00"; // Green for good/excellent
    }

    // 7. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #0a0a0a, #1a1a1a, #2a2a2a)'; /* Dark grey gradient */
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
    document.querySelectorAll('.specs-section, .calculator, .combat-arts-tools-planner, .prosthetic-tool-selector, .enemy-strategy-guide, .scanner').forEach(section => {
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

    // 10. Easter Egg - Sekiro-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cHesitation is defeat.", 
        "color: #b02020; font-size: 20px; font-weight: bold; text-shadow: 1px 1px 3px #b02020;");
    console.log("%cThe Wolf's journey continues.", 
        "color: #daa520; font-size: 16px; font-style: italic;");

    // Initial calls for interactive components on page load
    // These functions are called once to set initial display values
    calculateSekiroFPS();
    populateUpgrades(); // Populate upgrades dropdown and then show initial upgrade details
    planCombatArtsAndToolsSynergy(); // Call once to set initial state
    guideEnemyStrategy(); // Call once to set initial state
});
