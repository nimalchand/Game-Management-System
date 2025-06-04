// JavaScript Features for DOOM Eternal System Requirements Page

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

    // 2. FPS Calculator with DOOM Eternal-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculateDoomFPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('doomCPU').value;
        const gpu = document.getElementById('doomGPU').value;
        const res = document.getElementById('doomRes').value;
        const settings = document.getElementById('doomSettings').value;

        let baseFPS = 75; // Starting point for average performance

        // Adjust FPS based on CPU tier
        if (cpu === 'low') baseFPS -= 30;
        else if (cpu === 'high') baseFPS += 40;

        // Adjust FPS based on GPU tier
        if (gpu === 'low') baseFPS -= 40;
        else if (gpu === 'high') baseFPS += 50;

        // Adjust FPS based on resolution
        if (res === '1440') baseFPS *= 0.75;
        else if (res === '4k') baseFPS *= 0.5;

        // Adjust FPS based on graphics settings
        if (settings === 'low') baseFPS *= 1.3;
        else if (settings === 'high') baseFPS *= 0.8;
        else if (settings === 'ultra') baseFPS *= 0.6;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS > 120) {
            rating = '🔥 Ultra-Nightmare Ready!';
            flavorText = 'Your rig is ready to rip and tear at extreme speeds!';
        } else if (baseFPS > 90) {
            rating = '✅ Excellent Performance';
            flavorText = 'Smooth demon slaying ahead, Slayer!';
        } else if (baseFPS >= 60) {
            rating = '👍 Solid Performance';
            flavorText = 'You\'ll experience fluid combat and glory kills!';
        } else if (baseFPS >= 30) {
            rating = '⚠️ Playable (Adjust Settings)';
            flavorText = 'You might need to lower some settings for consistent demon slaying.';
        } else {
            rating = '❌ Struggle (Upgrade Recommended)';
            flavorText = 'Hell might be too much for your current setup. Consider upgrading!';
        }
        
        // Display the result in the 'doomFPSResult' div
        document.getElementById('doomFPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #00ff00;">${flavorText}</small>
        `;
    }

    // 3. Demon Codex (New Feature)
    // Data for various demons in DOOM Eternal
    const demons = [
        {
            id: "imp",
            name: "Imp",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=Imp",
            weakness: "Precision Bolt (Heavy Cannon)",
            strategy: "Fast but fragile. Prioritize them to clear space. Glory kill for health.",
            stats: { speed: 80, health: 30, damage: 50, threat: 20 }
        },
        {
            id: "cacodemon",
            name: "Cacodemon",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=Caco",
            weakness: "Grenade into mouth (Combat Shotgun)",
            strategy: "Floaty airborne demon. Shoot a grenade into its mouth for an instant stagger and glory kill.",
            stats: { speed: 40, health: 70, damage: 70, threat: 60 }
        },
        {
            id: "mancubus",
            name: "Mancubus",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=Manc",
            weakness: "Plasma Rifle to arm cannons",
            strategy: "Heavy demon with flamethrowers. Destroy its arm cannons with Plasma Rifle for massive damage and stagger.",
            stats: { speed: 30, health: 90, damage: 85, threat: 80 }
        },
        {
            id: "doomhunter",
            name: "Doom Hunter",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=DH",
            weakness: "Plasma Rifle to shield, Super Shotgun to sled",
            strategy: "Mini-boss with an energy shield. Destroy its shield with Plasma Rifle, then focus on its sled with heavy weapons.",
            stats: { speed: 60, health: 100, damage: 90, threat: 95 }
        },
        {
            id: "marauder",
            name: "Marauder",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=Marauder",
            weakness: "Green eye flash (Super Shotgun/Ballista combo)",
            strategy: "Highly aggressive and agile. Attack only when its eyes flash green after its attack. Use Super Shotgun and Ballista combo.",
            stats: { speed: 90, health: 95, damage: 99, threat: 100 }
        }
    ];

    // Function to render demon cards in the Demon Codex
    function renderDemons() {
        const demonContainer = document.getElementById('demonGrid');
        demonContainer.innerHTML = ''; // Clear previous content

        demons.forEach(demon => {
            const demonDiv = document.createElement('div');
            demonDiv.className = 'demon-card';
            demonDiv.innerHTML = `
                <img src="${demon.img}" alt="${demon.name}" class="demon-img">
                <div class="demon-info">
                    <strong>${demon.name}</strong><br>
                    <small>${demon.weakness.split('(')[0].trim()}</small>
                </div>
            `;
            
            // Add click listener to show demon details
            demonDiv.addEventListener('click', function() {
                document.querySelectorAll('.demon-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                showDemonDetails(demon);
            });
            
            demonContainer.appendChild(demonDiv);
        });
    }

    // Function to display detailed demon information
    function showDemonDetails(demon) {
        const detailsDiv = document.getElementById('demonDetails');
        detailsDiv.innerHTML = `
            <h4>${demon.name}</h4>
            <p><strong>Weakness:</strong> ${demon.weakness}</p>
            <p><strong>Strategy:</strong> ${demon.strategy}</p>
            <div class="spec-item"><span>Speed:</span><span>${demon.stats.speed}/100</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width: ${demon.stats.speed}%" class="green"></div></div>
            <div class="spec-item"><span>Health:</span><span>${demon.stats.health}/100</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width: ${demon.stats.health}%" class="red"></div></div>
            <div class="spec-item"><span>Damage:</span><span>${demon.stats.damage}/100</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width: ${demon.stats.damage}%" class="red"></div></div>
            <div class="spec-item"><span>Threat Level:</span><span>${demon.stats.threat}/100</span></div>
            <div class="progress-bar"><div class="progress-fill" style="width: ${demon.stats.threat}%" class="red"></div></div>
        `;
        detailsDiv.style.display = 'block'; // Show the details box
    }

    // 4. Weapon Mod Station (New Feature)
    // Data for various weapons and their mods in DOOM Eternal
    const weapons = [
        {
            id: "combat-shotgun",
            name: "Combat Shotgun",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=Shotgun",
            primaryFire: "Standard Shotgun Blast",
            secondaryFire: "Full Auto / Sticky Bomb",
            mods: [
                { name: "Full Auto Mod", desc: "Unleashes a rapid burst of shotgun shells." },
                { name: "Sticky Bomb Mod", desc: "Fires an explosive sticky grenade that detonates after a short delay or on impact." }
            ]
        },
        {
            id: "heavy-cannon",
            name: "Heavy Cannon",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=Cannon",
            primaryFire: "Rapid Fire Projectiles",
            secondaryFire: "Precision Bolt / Micro Missiles",
            mods: [
                { name: "Precision Bolt Mod", desc: "Fires a high-damage, single projectile with increased accuracy." },
                { name: "Micro Missiles Mod", desc: "Launches a volley of small, homing missiles." }
            ]
        },
        {
            id: "plasma-rifle",
            name: "Plasma Rifle",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=Plasma",
            primaryFire: "Continuous Plasma Stream",
            secondaryFire: "Heat Blast / Microwave Beam",
            mods: [
                { name: "Heat Blast Mod", desc: "Charges and releases a powerful burst of heat, damaging nearby enemies." },
                { name: "Microwave Beam Mod", desc: "Fires a sustained beam that causes enemies to explode after a short duration." }
            ]
        },
        {
            id: "super-shotgun",
            name: "Super Shotgun",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=Super+S",
            primaryFire: "Devastating Close-Range Blast",
            secondaryFire: "Meat Hook",
            mods: [
                { name: "Meat Hook Mod", desc: "Fires a grappling hook that pulls the Slayer towards demons, setting them up for close-range glory kills." }
            ]
        },
        {
            id: "ballista",
            name: "Ballista",
            img: "https://placehold.co/120x120/FF0000/FFFFFF?text=Ballista",
            primaryFire: "High-Damage Energy Bolt",
            secondaryFire: "Arbalest / Destroyer Blade",
            mods: [
                { name: "Arbalest Mod", desc: "Fires an explosive bolt that detonates on impact, dealing area damage." },
                { name: "Destroyer Blade Mod", desc: "Fires a wide, horizontal energy wave that slices through multiple enemies." }
            ]
        }
    ];

    // Function to render weapon cards in the Weapon Mod Station
    function renderWeapons() {
        const weaponContainer = document.getElementById('weaponGrid');
        weaponContainer.innerHTML = ''; // Clear previous content

        weapons.forEach(weapon => {
            const weaponDiv = document.createElement('div');
            weaponDiv.className = 'weapon-card';
            weaponDiv.innerHTML = `
                <img src="${weapon.img}" alt="${weapon.name}" class="weapon-img">
                <div class="weapon-info">
                    <strong>${weapon.name}</strong><br>
                    <small>${weapon.mods.map(m => m.name.replace(' Mod', '')).join(' / ')}</small>
                </div>
            `;
            
            // Add click listener to show weapon details
            weaponDiv.addEventListener('click', function() {
                document.querySelectorAll('.weapon-card').forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
                showWeaponDetails(weapon);
            });
            
            weaponContainer.appendChild(weaponDiv);
        });
    }

    // Function to display detailed weapon information
    function showWeaponDetails(weapon) {
        const detailsDiv = document.getElementById('weaponDetails');
        detailsDiv.innerHTML = `
            <h4>${weapon.name}</h4>
            <p><strong>Primary Fire:</strong> ${weapon.primaryFire}</p>
            <p><strong>Secondary Fire:</strong> ${weapon.secondaryFire}</p>
            <h5>Available Mods:</h5>
            <ul>
                ${weapon.mods.map(mod => `<li><strong>${mod.name}:</strong> ${mod.desc}</li>`).join('')}
            </ul>
        `;
        detailsDiv.style.display = 'block'; // Show the details box
    }

    // 5. Combat Rating Simulator (New Feature)
    // Simulates a combat encounter and provides a rating.
    window.simulateCombatRating = function() { // Made global for onclick in HTML
        const playerSkill = document.getElementById('playerSkill').value;
        const demonDensity = document.getElementById('demonDensity').value;
        const weaponMastery = document.getElementById('weaponMastery').value;

        let baseScore = 500; // Starting base combat score

        // Adjust score based on player skill
        if (playerSkill === 'novice') baseScore *= 0.7;
        else if (playerSkill === 'adept') baseScore *= 1.0;
        else if (playerSkill === 'veteran') baseScore *= 1.3;
        else if (playerSkill === 'doomguy') baseScore *= 1.8;

        // Adjust score based on demon density (higher density = higher potential score but harder)
        if (demonDensity === 'sparse') baseScore *= 0.8;
        else if (demonDensity === 'normal') baseScore *= 1.0;
        else if (demonDensity === 'dense') baseScore *= 1.2;
        else if (demonDensity === 'horde') baseScore *= 1.5;

        // Adjust score based on weapon mastery
        if (weaponMastery === 'basic') baseScore *= 0.8;
        else if (weaponMastery === 'skilled') baseScore *= 1.0;
        else if (weaponMastery === 'expert') baseScore *= 1.2;
        else if (weaponMastery === 'godlike') baseScore *= 1.5;

        let finalScore = Math.round(baseScore + (Math.random() * 200 - 100)); // Add some randomness
        if (finalScore < 0) finalScore = 0; // Ensure score doesn't go below zero

        let ratingMessage = '';
        let gloryKillChance = '';

        if (finalScore > 1000) {
            ratingMessage = 'UNSTOPPABLE SLAYER!';
            gloryKillChance = 'Glory Kill Chance: EXTREME (You are the demon!)';
        } else if (finalScore > 750) {
            ratingMessage = 'DEMONIC EFFICIENCY!';
            gloryKillChance = 'Glory Kill Chance: HIGH (Masterful combat flow)';
        } else if (finalScore > 500) {
            ratingMessage = 'SOLID COMBATANT!';
            gloryKillChance = 'Glory Kill Chance: MEDIUM (Consistent and effective)';
        } else if (finalScore > 250) {
            ratingMessage = 'FIGHTING CHANCE!';
            gloryKillChance = 'Glory Kill Chance: LOW (Focus on resource management)';
        } else {
            ratingMessage = 'OVERWHELMED!';
            gloryKillChance = 'Glory Kill Chance: VERY LOW (You might be the one getting ripped...)';
        }

        document.getElementById('combatRatingResult').innerHTML = `
            <strong>Combat Score:</strong> ${finalScore}<br>
            <strong>Rating:</strong> <span style="color: ${finalScore > 750 ? '#00ff00' : finalScore > 500 ? '#ffcc00' : '#ff0000'};">${ratingMessage}</span><br>
            <small>${gloryKillChance}</small>
        `;
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
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Ultra-Nightmare Ready"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Ultra-Nightmare Ready"];
        const ramOptions = ["4GB (Insufficient)", "8GB (Minimum)", "16GB (Recommended)", "32GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Hellish Performance (Struggles to run)",
            "Demonic Minimum (30-45 FPS on Low)",
            "Slayer's Standard (60 FPS on Medium)",
            "Unchained Fury (90+ FPS on High)",
            "Absolute Carnage (120+ FPS on Ultra-Nightmare)"
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
        if (overallIndex <= 1) overallElement.style.color = "#ff0000"; // Red for poor
        else if (overallIndex === 2) overallElement.style.color = "#ffcc00"; // Orange for playable
        else overallElement.style.color = "#00ff00"; // Green for good/excellent
    }

    // 7. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #1a0a0a, #3a1a1a, #2a0a0a)'; /* Dark red/black gradient */
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
    document.querySelectorAll('.specs-section, .calculator, .demon-codex, .weapon-mod-station, .combat-rating-simulator, .scanner').forEach(section => {
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

    // 10. Easter Egg - DOOM-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cRip and Tear, Slayer!", 
        "color: #ff0000; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 5px #ff0000;");
    console.log("%cThe only thing they fear... is you.", 
        "color: #00ff00; font-size: 16px; font-style: italic;");

    // Initialize interactive components on page load
    renderDemons();
    renderWeapons();
    // Initial calculation for FPS and Combat Rating
    calculateDoomFPS();
    simulateCombatRating();
});
