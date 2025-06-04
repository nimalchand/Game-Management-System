// JavaScript for the CrazyGames Support Page

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dynamic FAQ Search & Filtering ---
    const faqItems = [
        {
            question: "Why is my game running slowly?",
            answer: "Game performance issues can be caused by outdated drivers, insufficient RAM, or background applications. Try updating your graphics drivers, closing unnecessary programs, and checking your system against the game's minimum requirements.",
            topics: ["performance", "technical"]
        },
        {
            question: "How do I reset my password?",
            answer: "To reset your password, go to the 'Log In' page and click on 'Forgot Password'. Follow the instructions sent to your registered email address.",
            topics: ["account", "login"]
        },
        {
            question: "My game keeps crashing, what should I do?",
            answer: "Game crashes can often be resolved by verifying game file integrity or reinstalling the game. Our System Diagnostic Tool can help identify common causes.",
            topics: ["technical", "crash", "performance"]
        },
        {
            question: "I made a purchase but didn't receive my items.",
            answer: "Please check your transaction history and ensure the payment was successful. If so, contact our billing support with your transaction ID and username.",
            topics: ["billing", "purchase"]
        },
        {
            question: "How do I report a bug?",
            answer: "You can report bugs using the 'Submit a Support Ticket' form below. Please provide as much detail as possible, including steps to reproduce the bug and screenshots if available.",
            topics: ["bug", "technical"]
        },
        {
            question: "I can't connect to multiplayer games.",
            answer: "Connectivity issues often stem from firewall settings or network problems. Ensure your firewall allows the game, try restarting your router, or check for server status updates.",
            topics: ["multiplayer", "technical"]
        },
        {
            question: "How do I update my payment information?",
            answer: "You can update your payment information in your 'Account Settings' under the 'Billing' or 'Payment Methods' section.",
            topics: ["account", "billing"]
        },
        {
            question: "What are the refund policies?",
            answer: "Our refund policies vary depending on the game and platform. Please refer to our detailed refund policy page linked in the footer, or submit a ticket for specific inquiries.",
            topics: ["billing", "purchase"]
        }
    ];

    const faqSearchInput = document.getElementById('faqSearch');
    const faqResultsDiv = document.getElementById('faqResults');
    const faqTopicLinks = document.querySelectorAll('.faq-topic');

    function displayFaqItems(filteredItems) {
        faqResultsDiv.innerHTML = ''; // Clear previous results
        if (filteredItems.length === 0) {
            faqResultsDiv.innerHTML = '<p style="color: #ccc;">No matching FAQs found. Try live chat or submit a ticket!</p>';
            return;
        }
        filteredItems.forEach(item => {
            const faqElement = document.createElement('div');
            faqElement.classList.add('faq-item');
            faqElement.innerHTML = `
                <h4 style="color: #8a2be2; margin-bottom: 5px;">${item.question}</h4>
                <p style="color: #e0e0f0; margin-bottom: 15px; font-size: 0.95em;">${item.answer}</p>
            `;
            faqResultsDiv.appendChild(faqElement);
        });
    }

    function filterFaqs() {
        const searchTerm = faqSearchInput.value.toLowerCase();
        const filtered = faqItems.filter(item => 
            item.question.toLowerCase().includes(searchTerm) || 
            item.answer.toLowerCase().includes(searchTerm)
        );
        displayFaqItems(filtered);
    }

    // Initial display of all FAQs
    displayFaqItems(faqItems);

    faqSearchInput.addEventListener('keyup', filterFaqs);

    faqTopicLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const topic = e.target.dataset.topic;
            const filtered = faqItems.filter(item => item.topics.includes(topic));
            faqSearchInput.value = ''; // Clear search bar
            displayFaqItems(filtered);
        });
    });

    // --- 2. Live Chat Simulation ---
    const chatMessagesDiv = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatButton = document.getElementById('sendChat');
    const typingIndicator = document.getElementById('typingIndicator');

    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        chatMessagesDiv.appendChild(messageElement);
        chatMessagesDiv.scrollTop = chatMessagesDiv.scrollHeight; // Auto-scroll to bottom
    }

    const chatResponses = {
        "hello": "Hi there! What can I help you with?",
        "hi": "Hello! Ask me anything about CrazyGames support.",
        "performance": "For performance issues, please try updating your graphics drivers and closing background apps. If that doesn't work, consider running our System Diagnostic Tool below.",
        "crash": "Game crashes can often be resolved by verifying game file integrity or reinstalling the game. Our System Diagnostic Tool can help identify common causes.",
        "account": "For account issues like password resets or login problems, please use the dedicated forms or check our FAQ section on account management.",
        "technical": "Technical issues can be complex. Please try our System Diagnostic Tool first. If the issue persists, submitting a detailed ticket with error codes is best.",
        "bug": "To report a bug, please use the 'Submit a Support Ticket' form. Describe the bug in detail, including how to reproduce it.",
        "thank you": "You're welcome! Is there anything else?",
        "bye": "Goodbye! Have a great day.",
        "default": "I'm not sure I understand. Can you rephrase or ask about a specific topic like 'performance' or 'account'?"
    };

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        for (const keyword in chatResponses) {
            if (lowerCaseMessage.includes(keyword)) {
                return chatResponses[keyword];
            }
        }
        return chatResponses["default"];
    }

    sendChatButton.addEventListener('click', () => {
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user');
            chatInput.value = ''; // Clear input

            typingIndicator.style.display = 'block'; // Show typing indicator

            setTimeout(() => {
                const botResponse = getBotResponse(userMessage);
                typingIndicator.style.display = 'none'; // Hide typing indicator
                addMessage(botResponse, 'bot');
            }, 1500 + Math.random() * 1000); // Simulate typing delay
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatButton.click();
        }
    });

    // --- 3. System Diagnostic Tool (Simulated) ---
    const runDiagnosticButton = document.getElementById('runDiagnostic');
    const diagnosticResultsDiv = document.getElementById('diagnosticResults');
    const diagGraphics = document.getElementById('diagGraphics');
    const diagNetwork = document.getElementById('diagNetwork');
    const diagFiles = document.getElementById('diagFiles');
    const diagRAM = document.getElementById('diagRAM');
    const diagOverall = document.getElementById('diagOverall');

    runDiagnosticButton.addEventListener('click', () => {
        diagnosticResultsDiv.style.display = 'block';
        runDiagnosticButton.disabled = true;
        runDiagnosticButton.textContent = "Running Diagnostic...";

        // Reset statuses
        diagGraphics.textContent = '-'; diagGraphics.className = 'status';
        diagNetwork.textContent = '-'; diagNetwork.className = 'status';
        diagFiles.textContent = '-'; diagFiles.className = 'status';
        diagRAM.textContent = '-'; diagRAM.className = 'status';
        diagOverall.textContent = '-'; diagOverall.className = 'status';

        let checksCompleted = 0;
        let overallStatus = 'pass';
        let issuesFound = [];

        const performCheck = (element, statusText, statusClass, delay, issue = null) => {
            setTimeout(() => {
                element.textContent = statusText;
                element.classList.add(statusClass);
                checksCompleted++;
                if (statusClass === 'fail') {
                    overallStatus = 'fail';
                    issuesFound.push(issue);
                } else if (statusClass === 'warn' && overallStatus !== 'fail') {
                    overallStatus = 'warn';
                    issuesFound.push(issue);
                }
                if (checksCompleted === 4) { // All 4 checks done
                    let finalStatusText = '';
                    let finalStatusClass = '';
                    if (overallStatus === 'pass') {
                        finalStatusText = 'All Systems Optimal!';
                        finalStatusClass = 'pass';
                    } else if (overallStatus === 'warn') {
                        finalStatusText = 'Minor Issues Detected!';
                        finalStatusClass = 'warn';
                    } else {
                        finalStatusText = 'Critical Issues Found!';
                        finalStatusClass = 'fail';
                    }
                    diagOverall.textContent = finalStatusText;
                    diagOverall.classList.add(finalStatusClass);

                    if (issuesFound.length > 0) {
                        const advice = issuesFound.map(issue => `- ${issue}`).join('<br>');
                        const adviceElement = document.createElement('p');
                        adviceElement.style.marginTop = '15px';
                        adviceElement.style.color = '#ffcc00';
                        adviceElement.innerHTML = `<strong>Recommendations:</strong><br>${advice}`;
                        diagnosticResultsDiv.appendChild(adviceElement);
                    }

                    runDiagnosticButton.disabled = false;
                    runDiagnosticButton.textContent = "Run New Diagnostic";
                }
            }, delay);
        };

        // Simulate checks with random outcomes
        performCheck(diagGraphics, Math.random() > 0.2 ? 'Up-to-Date' : 'Outdated', Math.random() > 0.2 ? 'pass' : 'warn', 1000, "Update graphics drivers.");
        performCheck(diagNetwork, Math.random() > 0.1 ? 'Stable' : 'Unstable', Math.random() > 0.1 ? 'pass' : 'fail', 2000, "Check network connection/firewall.");
        performCheck(diagFiles, Math.random() > 0.15 ? 'Intact' : 'Corrupted', Math.random() > 0.15 ? 'pass' : 'fail', 3000, "Verify/repair game files.");
        performCheck(diagRAM, Math.random() > 0.25 ? 'Sufficient' : 'Low', Math.random() > 0.25 ? 'pass' : 'warn', 4000, "Close background applications or upgrade RAM.");
    });

    // --- 4. Issue Submission Form ---
    const supportForm = document.getElementById('supportForm');
    const issueTypeSelect = document.getElementById('issueType');
    const gameNameField = document.getElementById('gameNameField');
    const submissionProgress = document.getElementById('submissionProgress');
    const progressBarFill = document.getElementById('progressBarFill');
    const submissionMessage = document.getElementById('submissionMessage');

    // Show/hide game name field based on issue type
    issueTypeSelect.addEventListener('change', () => {
        if (issueTypeSelect.value === 'performance' || issueTypeSelect.value === 'crash' || issueTypeSelect.value === 'bug') {
            gameNameField.style.display = 'block';
        } else {
            gameNameField.style.display = 'none';
        }
    });

    supportForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Basic validation
        const fullName = document.getElementById('fullName').value.trim();
        const emailAddress = document.getElementById('emailAddress').value.trim();
        const issueType = issueTypeSelect.value;
        const description = document.getElementById('description').value.trim();

        if (!fullName || !emailAddress || !issueType || !description) {
            submissionMessage.style.display = 'block';
            submissionMessage.style.color = '#ff6666';
            submissionMessage.style.borderColor = '#ff6666';
            submissionMessage.textContent = 'Please fill in all required fields.';
            return;
        }

        // Simulate form submission
        submissionProgress.style.display = 'block';
        progressBarFill.style.width = '0%';
        progressBarFill.textContent = '0%';
        submissionMessage.style.display = 'none'; // Hide previous messages

        let progress = 0;
        const submitInterval = setInterval(() => {
            progress += 10;
            if (progress > 100) progress = 100;
            progressBarFill.style.width = `${progress}%`;
            progressBarFill.textContent = `${progress}%`;

            if (progress === 100) {
                clearInterval(submitInterval);
                setTimeout(() => {
                    submissionProgress.style.display = 'none';
                    submissionMessage.style.display = 'block';
                    submissionMessage.style.color = '#00cc00';
                    submissionMessage.style.borderColor = '#00cc00';
                    submissionMessage.innerHTML = 'Ticket submitted successfully! We will get back to you within 24-48 hours. <br><strong>Ticket ID: #CG' + Math.floor(Math.random() * 100000) + '</strong>';
                    supportForm.reset(); // Clear the form
                    gameNameField.style.display = 'none'; // Hide game name field
                }, 500);
            }
        }, 100); // Update every 100ms
    });

    // --- 5. Header Login Button Redirection (Example) ---
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            // In a real scenario, this would navigate to a login page.
            // For this example, we'll simulate an alert or console log.
            alert('Simulating login page redirection. In a full application, this would go to your login.html or similar.');
            // window.location.href = 'login.html'; // Uncomment this line in a real project
        });
    }

    // --- 6. Easter Egg - Console Log ---
    console.log("%cWelcome to CrazyGames Support!", 
        "color: #8a2be2; font-size: 20px; font-weight: bold; text-shadow: 1px 1px 3px #8a2be2;");
    console.log("%cWe're here to help you game on!", 
        "color: #a0a0ff; font-size: 14px; font-style: italic;");
});
