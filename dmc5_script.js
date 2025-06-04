// JavaScript Features for Devil May Cry 5 System Requirements Page

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

    // 2. FPS Calculator with DMC5-specific logic
    // Estimates FPS based on user's selected CPU, GPU, resolution, and graphics settings.
    window.calculateDMC5FPS = function() { // Made global for onclick in HTML
        // Get selected values from dropdowns
        const cpu = document.getElementById('dmc5CPU').value;
        const gpu = document.getElementById('dmc5GPU').value;
        const res = document.getElementById('dmc5Res').value;
        const settings = document.getElementById('dmc5Settings').value;

        let baseFPS = 60; // Starting point for DMC5 (aims for smooth 60fps)

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
        else if (settings === 'ultra') baseFPS *= 0.75;
        
        baseFPS = Math.round(baseFPS); // Round to nearest whole number

        let rating = '';
        let flavorText = '';

        if (baseFPS >= 60) {
            rating = '🔥 SSS Stylish Performance!';
            flavorText = 'Your system is ready for flawless demon slaying and ultimate style!';
        } else if (baseFPS >= 45) {
            rating = '✅ Devil Hunter\'s Resolve';
            flavorText = 'You\'ll cut down demons with solid performance.';
        } else if (baseFPS >= 30) {
            rating = '👍 Rookie\'s Endurance';
            flavorText = 'Playable, but consider lowering settings for smoother combat.';
        } else {
            rating = '❌ Demon\'s Feast (Upgrade Recommended)';
            flavorText = 'The demon invasion is too much. An upgrade is highly advised!';
        }
        
        // Display the result in the 'dmc5FPSResult' div
        document.getElementById('dmc5FPSResult').innerHTML = `
            <strong>Estimated FPS:</strong> ~${baseFPS} FPS<br>
            <strong>Rating:</strong> ${rating}<br>
            <small style="color: #e60000;">${flavorText}</small>
        `;
    }

    // 3. Stylish Rank Simulator (New Feature)
    // Simulates how combat actions affect the style meter.
    window.simulateStylishRank = function() {
        const hits = parseInt(document.getElementById('hits').value);
        const variety = parseInt(document.getElementById('variety').value);
        const damageTaken = parseInt(document.getElementById('damageTaken').value);

        let styleScore = 0; // Base score

        // Points for hits (more hits, more points)
        styleScore += hits * 2;

        // Points for variety (higher variety, more points)
        styleScore += variety * 20;

        // Penalty for damage taken (more damage, lower score)
        styleScore -= damageTaken * 1.5;

        styleScore = Math.max(0, styleScore); // Ensure score doesn't go below zero

        let rank = '';
        let rankClass = '';
        let advice = '';

        if (styleScore >= 250) {
            rank = 'SSS - SMOKIN\' SEXY STYLE!!!';
            rankClass = 'sss-rank';
            advice = 'Absolutely flawless! You are a true legend of style!';
        } else if (styleScore >= 180) {
            rank = 'SS - SHOWTIME!';
            rankClass = 'ss-rank';
            advice = 'Incredible performance! Keep up the pressure!';
        } else if (styleScore >= 120) {
            rank = 'S - SMOKIN\'!';
            rankClass = 's-rank';
            advice = 'Excellent! You\'re getting the hang of it!';
        } else if (styleScore >= 70) {
            rank = 'A - ABSOLUTELY FANTASTIC!';
            rankClass = 'a-rank';
            advice = 'Great job! Mix up your attacks for even higher ranks.';
        } else if (styleScore >= 30) {
            rank = 'B - BLAZING!';
            rankClass = 'b-rank';
            advice = 'Good start! Try to avoid taking damage and vary your moves.';
        } else if (styleScore >= 10) {
            rank = 'C - COOL!';
            rankClass = 'c-rank';
            advice = 'You\'re getting there. Focus on chaining attacks.';
        } else {
            rank = 'D - DREADFUL...';
            rankClass = 'd-rank';
            advice = 'Keep practicing! Focus on not getting hit and using different attacks.';
        }

        const resultDiv = document.getElementById('stylishRankResult');
        resultDiv.innerHTML = `
            <strong>Style Score:</strong> ${Math.round(styleScore)}<br>
            <strong>Rank:</strong> <span class="${rankClass}">${rank}</span><br>
            <small>${advice}</small>
        `;
        resultDiv.style.display = 'block';
    }

    // 4. Weapon & Devil Breaker Selector (New Feature)
    // Defines weapons and Devil Breakers with their descriptions and primary users.
    const items = {
        weapons: {
            rebellion: { name: "Rebellion", user: "Dante", desc: "Dante's signature demonic sword. Balanced and versatile for various combat styles." },
            devilsworddante: { name: "Devil Sword Dante", user: "Dante", desc: "Dante's true demonic sword, unlocked later. Grants access to Sin Devil Trigger and powerful new moves." },
            ebonyivory: { name: "Ebony & Ivory", user: "Dante", desc: "Dante's twin pistols. Fast, long-range attacks, good for maintaining combos and juggling." },
            coyotea: { name: "Coyote-A", user: "Dante", desc: "Dante's shotgun. Powerful close-range blasts, effective against multiple foes." },
            balrog: { name: "Balrog", user: "Dante", desc: "Demonic gauntlets and greaves. Switches between punch and kick modes for aggressive melee combat." },
            cavalier: { name: "Cavalier", user: "Dante", desc: "A demonic motorcycle that transforms into dual chainsaws. High damage, wide swings." },
            redqueen: { name: "Red Queen", user: "Nero", desc: "Nero's primary sword, featuring an Exceed system for powered-up attacks." },
            bluerose: { name: "Blue Rose", user: "Nero", desc: "Nero's custom revolver. Shoots multiple bullets, can be charged for powerful shots." }
        },
        breakers: {
            overture: { name: "Overture", user: "Nero", desc: "A basic Devil Breaker with a powerful electric punch. Can be charged." },
            gerbera: { name: "Gerbera", user: "Nero", desc: "A mobility-focused Devil Breaker. Allows for high-speed dodges and aerial maneuvers." },
            punchline: { name: "Punch Line", user: "Nero", desc: "A rocket-powered Devil Breaker that can be launched as a projectile or ridden." },
            rawhide: { name: "Rawhide", user: "Nero", desc: "A whip-like Devil Breaker for wide-range attacks and pulling enemies." },
            busterarm: { name: "Buster Arm", user: "Nero", desc: "A powerful Devil Breaker for executing cinematic grabs and throws on enemies." },
            ragtime: { name: "Ragtime", user: "Nero", desc: "A Devil Breaker that creates a localized time-slowing field." },
            tomboy: { name: "Tomboy", user: "Nero", desc: "A Devil Breaker that enhances Red Queen and Blue Rose, but removes auto-aim." },
            mega: { name: "Mega Buster", user: "Nero", desc: "A special Devil Breaker based on Mega Man's arm cannon. Fires energy shots." }
        }
    };

    const itemTypeSelect = document.getElementById('itemType');
    const itemNameSelect = document.getElementById('itemName');

    // Function to populate item names based on selected type
    function populateItemNames() {
        const selectedType = itemTypeSelect.value;
        const itemsList = items[selectedType + 's']; // 'weapons' or 'breakers'
        itemNameSelect.innerHTML = ''; // Clear existing options

        if (itemsList) {
            for (const key in itemsList) {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = itemsList[key].name;
                itemNameSelect.appendChild(option);
            }
        }
        // Trigger initial display
        selectWeaponOrBreaker();
    }

    // Event listener for item type change
    itemTypeSelect.addEventListener('change', populateItemNames);

    window.selectWeaponOrBreaker = function() {
        const selectedType = itemTypeSelect.value;
        const selectedItemKey = itemNameSelect.value;
        const itemDetailsDiv = document.getElementById('itemDetails');

        const selectedList = items[selectedType + 's'];
        if (!selectedList || !selectedItemKey) {
            itemDetailsDiv.innerHTML = '<p>Select an item to see its details.</p>';
            return;
        }

        const selectedItem = selectedList[selectedItemKey];

        if (selectedItem) {
            itemDetailsDiv.innerHTML = `
                <h4>${selectedItem.name}</h4>
                <p><strong>User:</strong> ${selectedItem.user}</p>
                <p><strong>Description:</strong> ${selectedItem.desc}</p>
                <small>Master your arsenal to maximize your style!</small>
            `;
        } else {
            itemDetailsDiv.innerHTML = '<p>Select an item to see its details.</p>';
        }
        itemDetailsDiv.style.display = 'block';
    }

    // 5. Character Combat Style Guide (New Feature)
    // Describes the unique playstyle of each main character.
    const characterStyles = {
        nero: {
            name: "Nero",
            desc: "Focuses on close to mid-range combat, utilizing Red Queen's Exceed system, Blue Rose's charged shots, and a variety of Devil Breakers for versatile offense and defense.",
            strengths: "High burst damage, excellent aerial combat, versatile Devil Breaker utility, easy to pick up.",
            weaknesses: "Limited Devil Breaker durability, less direct control over Devil Trigger compared to Dante."
        },
        dante: {
            name: "Dante",
            desc: "The master of combat styles, Dante can switch between Swordmaster, Gunslinger, Trickster, and Royalguard on the fly, allowing for unparalleled depth and adaptability.",
            strengths: "Unmatched versatility, high skill ceiling, devastating Devil Trigger forms, wide array of weapons.",
            weaknesses: "Complex to master, requires deep understanding of mechanics and enemy patterns."
        },
        v: {
            name: "V",
            desc: "A unique summoner character who controls three demonic familiars (Griffon, Shadow, Nightmare) to fight for him from a distance, only needing to finish off weakened foes himself.",
            strengths: "Safe long-range combat, excellent crowd control, unique gameplay loop, powerful ultimate summons.",
            weaknesses: "Vulnerable if familiars are downed, requires careful positioning, less direct melee engagement."
        }
    };

    window.guideCharacterStyle = function() {
        const characterKey = document.getElementById('character').value;
        const characterStyleResultDiv = document.getElementById('characterStyleResult');

        const selectedCharacter = characterStyles[characterKey];

        if (selectedCharacter) {
            characterStyleResultDiv.innerHTML = `
                <h4>${selectedCharacter.name}</h4>
                <p><strong>Description:</strong> ${selectedCharacter.desc}</p>
                <p><strong>Strengths:</strong> ${selectedCharacter.strengths}</p>
                <p><strong>Weaknesses:</strong> ${selectedCharacter.weaknesses}</p>
                <small>Choose your demon hunter wisely, and unleash your inner devil!</small>
            `;
        } else {
            characterStyleResultDiv.innerHTML = '<p>Select a character to learn about their combat style.</p>';
        }
        characterStyleResultDiv.style.display = 'block';
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
        const cpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Stylish SSS Tier"];
        const gpuOptions = ["Below Minimum", "Meets Minimum", "Meets Recommended", "Stylish SSS Tier"];
        const ramOptions = ["4GB (Insufficient)", "8GB (Minimum)", "16GB (Recommended)", "32GB+ (Optimal)"];
        const storageOptions = ["HDD (Slow)", "SSD (Good)", "NVMe SSD (Optimal)"];
        const overallOptions = [
            "Demon's Plaything (Struggles to run)",
            "Rookie Hunter (30-45 FPS on Low)",
            "Veteran Hunter (60 FPS on Medium)",
            "Legendary Hunter (90+ FPS on High)",
            "S.S.S. Rank (Maxed out, flawless)"
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
        if (overallIndex <= 1) overallElement.style.color = "#e60000"; // Red for poor
        else if (overallIndex === 2) overallElement.style.color = "#ffcc00"; // Gold for playable
        else overallElement.style.color = "#00cc00"; // Green for good/excellent
    }

    // 7. Video Background Fallback
    // Hides the video and sets a solid background if the video fails to load.
    document.querySelector('.video-bg').addEventListener('error', function() {
        this.style.display = 'none'; // Hide the video element
        document.body.style.background = 'linear-gradient(135deg, #1a0a0a, #2a1a1a, #3a2a2a)'; /* Dark red/grey gradient */
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
    document.querySelectorAll('.specs-section, .calculator, .stylish-rank-simulator, .weapon-breaker-selector, .character-style-guide, .scanner').forEach(section => {
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

    // 10. Easter Egg - DMC5-themed console log
    // Displays custom messages in the browser's developer console.
    console.log("%cJACKPOT!", 
        "color: #e60000; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 5px #e60000;");
    console.log("%cLet's rock, baby!", 
        "color: #ff00ff; font-size: 16px; font-style: italic;");

    // Initial calls for interactive components on page load
    // These functions are called once to set initial display values
    calculateDMC5FPS();
    simulateStylishRank(); // Call once to set initial state
    populateItemNames(); // Populate weapon/breaker dropdowns and then show initial details
    guideCharacterStyle(); // Call once to set initial state
});
