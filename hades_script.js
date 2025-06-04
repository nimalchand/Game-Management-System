// JavaScript Features for Hades System Requirements Page

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

    // 2. FPS Calculator with Hades-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculateHadesFPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('hadesCPU').value;
        const gpu = document.getElementById('hadesGPU').value;
        const res = document.getElementById('hadesRes').value;
        const settings = document.getElementById('hadesSettings').value;

        let baseFPS = 90; // Starting point for Hades (known for being well-optimized)

        // Adjust FPS based on CPU tier
        if (cpu === 'low') baseFPS -= 30;
        else if (cpu === 'high') baseFPS += 30; 

        // Adjust FPS based on GPU tier
        if (gpu === 'low') baseFPS -= 40;
        else if (gpu === 'high') baseFPS += 40;
        
        // Adjust FPS based on resolution
        if (res === '1440') baseFPS *= 0.8;
        else if (res === '4k') baseFPS *= 0.6;

        // Adjust FPS based on graphics settings
        if (settings === 'low') baseFPS *= 1.1;
        else if (settings === 'high') baseFPS *= 0.9;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS >= 120) {
            rating = '🔥 Olympian Performance!';
            flavorText = 'Your system is blessed by the gods for flawless escapes!';
        } else if (baseFPS >= 80) {
            rating = '✅ God-Tier Experience';
            flavorText = 'Smooth combat and stunning visuals await!';
        } else if (baseFPS >= 50) {
            rating = '👍 Heroic Effort';
            flavorText = 'You\'ll fight your way out with solid performance.';
        } else if (baseFPS >= 30) {
            rating = '⚠️ Struggling to Escape (Adjust Settings)';
            flavorText = 'You might need to tweak settings to defy Hades more effectively.';
        } else {
            rating = '❌ Trapped in Tartarus (Upgrade Recommended)';
            flavorText = 'The Underworld is too much. An upgrade is highly advised!';
        }
        
        // Display the result in the 'hadesFPSResult' div
        document.getElementById('hadesFPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #ff4500;">${flavorText}</small>
        `;
    }

    // 3. Boon Synergy Planner (New Feature)
    // Simulates boon synergies between two selected gods.
    const gods = {
        zeus: { name: "Zeus", boons: ["Lightning Strike (Attack)", "Thunder Dash (Dash)", "Jolted (Status)"], synergy: "Lightning effects chain between foes." },
        poseidon: { name: "Poseidon", boons: ["Tidal Dash (Dash)", "Tempest Strike (Attack)", "Riptide (Knockback)"], synergy: "Knockback effects deal more damage or hit multiple times." },
        athena: { name: "Athena", boons: ["Divine Dash (Dash)", "Divine Strike (Attack)", "Holy Shield (Deflect)"], synergy: "Deflect effects deal damage or apply status." },
        ares: { name: "Ares", boons: ["Doom (Status)", "Blade Dash (Dash)", "Slicing Shot (Cast)"], synergy: "Blade Rifts grow larger or last longer." },
        artemis: { name: "Artemis", boons: ["Deadly Strike (Attack)", "Hunter Dash (Dash)", "Support Fire (Secondary)"], synergy: "Critical hits deal more damage or apply status." },
        aphrodite: { name: "Aphrodite", boons: ["Weak (Status)", "Heartbreak Strike (Attack)", "Passion Dash (Dash)"], synergy: "Weakened foes take more damage or deal less." },
        dionysus: { name: "Dionysus", boons: ["Hangover (Status)", "Trippy Shot (Cast)", "Numbing Sensation (Slow)"], synergy: "Hangover effects deal more damage or stack faster." },
        demeter: { name: "Demeter", boons: ["Chill (Status)", "Mistral Dash (Dash)", "Ravenous Will (Damage)"], synergy: "Chill effects stack faster or deal more damage." },
        hermes: { name: "Hermes", boons: ["Greater Haste (Speed)", "Swift Strike (Attack)", "Hyper Sprint (Dash)"], synergy: "Dodge chance or speed effects are amplified." }
    };

    window.planBoonSynergy = function() {
        const god1Key = document.getElementById('god1').value;
        const god2Key = document.getElementById('god2').value;
        const boonResultDiv = document.getElementById('boonResult');

        let resultHTML = '';
        let synergyRating = '';
        let synergyClass = '';

        const god1 = gods[god1Key];
        const god2 = gods[god2Key];

        if (!god1) {
            boonResultDiv.innerHTML = '<p>Please select at least one god.</p>';
            return;
        }

        resultHTML += `<h4>Blessings from ${god1.name}:</h4>`;
        resultHTML += `<ul>${god1.boons.map(b => `<li>${b}</li>`).join('')}</ul>`;
        resultHTML += `<p><strong>Primary Effect:</strong> ${god1.synergy}</p>`;

        if (god2Key !== 'none' && god2) {
            resultHTML += `<h4>Blessings from ${god2.name}:</h4>`;
            resultHTML += `<ul>${god2.boons.map(b => `<li>${b}</li>`).join('')}</ul>`;
            resultHTML += `<p><strong>Primary Effect:</strong> ${god2.synergy}</p>`;

            // Simple synergy logic
            if ((god1Key === 'zeus' && god2Key === 'artemis') || (god1Key === 'artemis' && god2Key === 'zeus')) {
                synergyRating = 'Strong Synergy: Zeus + Artemis (Lightning + Crit)';
                synergyClass = 'strong';
                resultHTML += `<p style="color: #ffcc00;"><strong>Duo Boon Potential:</strong> Splitting Bolt (Critical hits cause lightning strikes)!</p>`;
            } else if ((god1Key === 'poseidon' && god2Key === 'zeus') || (god1Key === 'zeus' && god2Key === 'poseidon')) {
                synergyRating = 'Strong Synergy: Poseidon + Zeus (Knockback + Lightning)';
                synergyClass = 'strong';
                resultHTML += `<p style="color: #ffcc00;"><strong>Duo Boon Potential:</strong> Sea Storm (Lightning strikes trigger when enemies are knocked back)!</p>`;
            } else if ((god1Key === 'ares' && god2Key === 'aphrodite') || (god1Key === 'aphrodite' && god2Key === 'ares')) {
                synergyRating = 'Strong Synergy: Ares + Aphrodite (Doom + Weak)';
                synergyClass = 'strong';
                resultHTML += `<p style="color: #ffcc00;"><strong>Duo Boon Potential:</strong> Curse of Longing (Weakened foes take more Doom damage)!</p>`;
            }
             else if (god1Key !== god2Key) {
                synergyRating = 'Good Synergy';
                synergyClass = 'good';
                resultHTML += `<p style="color: #9932cc;"><strong>Potential:</strong> These gods can complement each other well!</p>`;
            } else {
                synergyRating = 'Basic Synergy';
                synergyClass = 'basic';
                resultHTML += `<p style="color: #cccccc;"><strong>Potential:</strong> Focusing on one god can be powerful, but consider a second for Duo Boons!</p>`;
            }
        } else {
            synergyRating = 'Single God Focus';
            synergyClass = 'basic';
            resultHTML += `<p style="color: #cccccc;"><strong>Tip:</strong> Consider adding a second god for powerful Duo Boons!</p>`;
        }

        boonResultDiv.innerHTML = `
            ${resultHTML}
            <p><strong>Overall Synergy:</strong> <span class="${synergyClass}">${synergyRating}</span></p>
        `;
        boonResultDiv.style.display = 'block';
    }

    // 4. Weapon Aspect Selector (New Feature)
    // Defines weapon aspects and their effects.
    const weapons = {
        stygius: {
            name: "Stygius (Sword)",
            aspects: [
                { name: "Aspect of Zagreus", desc: "Standard form. Minor stat bonuses." },
                { name: "Aspect of Nemesis", desc: "After Dash-Strike, your next few attacks are Critical." },
                { name: "Aspect of Poseidon", desc: "Your Cast deals more damage and dislodges more quickly from foes." },
                { name: "Aspect of Arthur", desc: "Gain an aura that slows foes and reduces incoming damage. Special creates a slow-moving wave." }
            ]
        },
        coronacht: {
            name: "Coronacht (Bow)",
            aspects: [
                { name: "Aspect of Zagreus", desc: "Standard form. Minor stat bonuses." },
                { name: "Aspect of Chiron", desc: "Your Special automatically seeks the foe last hit by your Attack." },
                { name: "Aspect of Hera", desc: "Your Casts load into your next Attack or Special, dealing more damage." },
                { name: "Aspect of Rama", desc: "Your Attack fires a volley of arrows. Your Special fires a piercing arrow that marks foes." }
            ]
        },
        aegis: {
            name: "Aegis (Shield)",
            aspects: [
                { name: "Aspect of Zagreus", desc: "Standard form. Minor stat bonuses." },
                { name: "Aspect of Chaos", desc: "Your Bull Rush deals more damage and strikes more foes." },
                { name: "Aspect of Zeus", desc: "Your Special leaves behind a lightning-rod shield that zaps foes." },
                { name: "Aspect of Beowulf", desc: "Your Bull Rush can absorb incoming damage. Your Cast is replaced by a powerful, explosive projectile." }
            ]
        },
        malphon: {
            name: "Malphon (Fists)",
            aspects: [
                { name: "Aspect of Zagreus", desc: "Standard form. Minor stat bonuses." },
                { name: "Aspect of Talos", desc: "Your Special pulls foes in and applies Weak." },
                { name: "Aspect of Demeter", desc: "After 12 hits with Attack or Special, your next Special hits harder." },
                { name: "Aspect of Gilgamesh", desc: "Your Dash gains Maim, a status curse that deals damage over time. Gain an extra Dash." }
            ]
        },
        spear: {
            name: "Eternal Spear",
            aspects: [
                { name: "Aspect of Zagreus", desc: "Standard form. Minor stat bonuses." },
                { name: "Aspect of Achilles", desc: "After your Special, your next 4 Attacks or Casts deal more damage." },
                { name: "Aspect of Hades", desc: "After your Spin Attack, your next few Attacks and Casts deal more damage and apply a unique status." },
                { name: "Aspect of Guan Yu", desc: "Your Spin Attack recovers health. Your Attack and Special are slower but hit harder." }
            ]
        },
        rail: {
            name: "Adamant Rail",
            aspects: [
                { name: "Aspect of Zagreus", desc: "Standard form. Minor stat bonuses." },
                { name: "Aspect of Eris", desc: "After using your Special, you deal more damage for a few seconds." },
                { name: "Aspect of Hestia", desc: "After reloading, your next shot deals much more damage." },
                { name: "Aspect of Lucifer", desc: "Your Attack fires a slow, explosive projectile. Your Special creates a damaging area." }
            ]
        }
    };

    const weaponSelect = document.getElementById('weapon');
    const aspectSelect = document.getElementById('aspect');

    // Function to populate aspects based on selected weapon
    function populateAspects() {
        const selectedWeaponKey = weaponSelect.value;
        const selectedWeapon = weapons[selectedWeaponKey];
        aspectSelect.innerHTML = ''; // Clear existing options

        if (selectedWeapon) {
            selectedWeapon.aspects.forEach(aspect => {
                const option = document.createElement('option');
                option.value = aspect.name.toLowerCase().replace(/[^a-z0-9]/g, ''); // Simple ID
                option.textContent = aspect.name;
                aspectSelect.appendChild(option);
            });
        }
        // Trigger initial display
        selectWeaponAspect();
    }

    // Event listener for weapon change
    weaponSelect.addEventListener('change', populateAspects);

    window.selectWeaponAspect = function() {
        const selectedWeaponKey = weaponSelect.value;
        const selectedAspectValue = aspectSelect.value;
        const aspectResultDiv = document.getElementById('aspectResult');

        const selectedWeapon = weapons[selectedWeaponKey];
        if (!selectedWeapon) {
            aspectResultDiv.innerHTML = '<p>Please select a weapon.</p>';
            return;
        }

        const selectedAspect = selectedWeapon.aspects.find(a => a.name.toLowerCase().replace(/[^a-z0-9]/g, '') === selectedAspectValue);

        if (selectedAspect) {
            aspectResultDiv.innerHTML = `
                <h4>${selectedWeapon.name} - ${selectedAspect.name}</h4>
                <p><strong>Effect:</strong> ${selectedAspect.desc}</p>
                <small>Experiment with different aspects to find your perfect escape!</small>
            `;
        } else {
            aspectResultDiv.innerHTML = '<p>Select an aspect to see its details.</p>';
        }
        aspectResultDiv.style.display = 'block';
    }

    // 5. Keepsake Effectiveness Guide (New Feature)
    // Provides details on selected keepsakes.
    const keepsakes = {
        thunderbolt: { name: "Everlasting Thunderbolt (Zeus)", effect: "Your Call boon is replaced by Zeus's Call, dealing massive lightning damage.", use: "Great for burst damage and clearing rooms, especially with Zeus boons." },
        conch: { name: "Conch Shell (Poseidon)", effect: "Your Call boon is replaced by Poseidon's Call, creating a powerful wave.", use: "Excellent for pushing enemies away and dealing damage, good with knockback builds." },
        aegis: { name: "Broken Spearpoint (Athena)", effect: "After taking damage, gain a brief period of invulnerability.", use: "Crucial for surviving tough encounters and boss fights, especially when learning patterns." },
        collar: { name: "Old Spiked Collar (Cerberus)", effect: "Start each run with bonus health.", use: "Good for early game survivability, especially for new players or low-health builds." },
        plume: { name: "Lambent Plume (Hermes)", effect: "After clearing an encounter quickly, gain bonus dodge chance.", use: "Ideal for speedrunning and agile builds, rewarding aggressive play." },
        shackle: { name: "Shattered Shackle (Sisyphus)", effect: "Deal bonus damage while you have no boons from Olympian Gods.", use: "Useful for pure weapon builds or when aiming for specific Chthonic boons." }
    };

    window.guideKeepsakeEffectiveness = function() {
        const keepsakeKey = document.getElementById('keepsake').value;
        const keepsakeResultDiv = document.getElementById('keepsakeResult');

        const selectedKeepsake = keepsakes[keepsakeKey];

        if (selectedKeepsake) {
            keepsakeResultDiv.innerHTML = `
                <h4>${selectedKeepsake.name}</h4>
                <p><strong>Effect:</strong> ${selectedKeepsake.effect}</p>
                <p><strong>Recommended Use:</strong> ${selectedKeepsake.use}</p>
                <small>Choose wisely, Prince. Your survival depends on it!</small>
            `;
        } else {
            keepsakeResultDiv.innerHTML = '<p>Select a keepsake to see its details.</p>';
        }
        keepsakeResultDiv.style.display = 'block';
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
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Olympian Tier"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Olympian Tier"];
        const ramOptions = ["2GB (Insufficient)", "4GB (Minimum)", "8GB (Recommended)", "16GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Trapped in Tartarus (Struggles to run)",
            "Asphodel Awaits (30-45 FPS on Low)",
            "Elysium Bound (60 FPS on Medium)",
            "Styx River Flow (90+ FPS on High)",
            "Olympian Ascent (Maxed out, flawless)"
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
        if (overallIndex <= 1) overallElement.style.color = "#ff4500"; // Orange-red for poor
        else if (overallIndex === 2) overallElement.style.color = "#9932cc"; // Purple for playable
        else overallElement.style.color = "#00cc00"; // Green for good/excellent
    }

    // 7. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #1a051a, #2a0a2a, #3a0f3a)'; /* Dark purple gradient */
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
    document.querySelectorAll('.specs-section, .calculator, .boon-selector, .weapon-aspect-selector, .keepsake-simulator, .scanner').forEach(section => {
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

    // 10. Easter Egg - Hades-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cDefy Death!", 
        "color: #ff4500; font-size: 20px; font-weight: bold; text-shadow: 1px 1px 3px #ff4500;");
    console.log("%cZagreus awaits your escape.", 
        "color: #9932cc; font-size: 16px; font-style: italic;");

    // Initial calls for interactive components on page load
    // These functions are called once to set initial display values
    calculateHadesFPS();
    populateAspects(); // Populate aspects dropdown and then show initial aspect details
    planBoonSynergy(); // Call once to set initial state
    guideKeepsakeEffectiveness(); // Call once to set initial state
});
