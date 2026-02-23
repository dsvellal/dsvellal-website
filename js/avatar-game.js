document.addEventListener('DOMContentLoaded', () => {
    const avatarTrigger = document.getElementById('avatar-trigger');
    const avatarNudge = document.getElementById('avatar-nudge');
    const overlay = document.getElementById('avatar-game-overlay');
    const speechBubble = document.getElementById('avatar-speech-bubble');
    const gameClose = document.getElementById('avatar-game-close');

    const questionText = document.getElementById('trivia-question-text');
    const optionsContainer = document.getElementById('trivia-options-container');
    const feedbackContainer = document.getElementById('trivia-feedback-container');
    const feedbackText = document.getElementById('trivia-feedback-text');
    const nextBtn = document.getElementById('trivia-next-btn');
    const completionContainer = document.getElementById('trivia-completion-container');
    const progressText = document.getElementById('game-progress');

    let currentQuestionIndex = 0;
    let nudgeInterval;

    // --- Nudge Mechanic ---
    function startNudgeTimer() {
        // Random interval between 15s and 25s
        const interval = Math.floor(Math.random() * (25000 - 15000 + 1) + 15000);
        nudgeInterval = setTimeout(() => {
            // Only show nudge if bubble is not open
            if (!speechBubble.classList.contains('is-active')) {
                avatarNudge.classList.add('is-visible');

                // Hide after 5 seconds
                setTimeout(() => {
                    avatarNudge.classList.remove('is-visible');
                    startNudgeTimer(); // Schedule next nudge
                }, 5000);
            } else {
                startNudgeTimer(); // Try again later
            }
        }, interval);
    }

    // --- UI Mechanics ---
    function openBubble() {
        avatarNudge.classList.remove('is-visible'); // Hide nudge if active
        overlay.classList.add('is-active');
        speechBubble.classList.add('is-active');
        renderQuestion();
    }

    function closeBubble() {
        overlay.classList.remove('is-active');
        speechBubble.classList.remove('is-active');
    }

    avatarTrigger.addEventListener('click', openBubble);
    overlay.addEventListener('click', closeBubble);
    gameClose.addEventListener('click', closeBubble);

    // --- Game Logic ---
    function renderQuestion() {
        // If completed
        if (currentQuestionIndex >= triviaQuestions.length) {
            optionsContainer.style.display = 'none';
            questionText.style.display = 'none';
            feedbackContainer.style.display = 'none';
            progressText.style.display = 'none';
            completionContainer.style.display = 'block';
            return;
        }

        const currentQ = triviaQuestions[currentQuestionIndex];
        questionText.textContent = currentQ.question;
        optionsContainer.innerHTML = '';
        optionsContainer.style.display = 'flex';
        feedbackContainer.style.display = 'none';
        progressText.textContent = `Question ${currentQuestionIndex + 1} of ${triviaQuestions.length}`;

        currentQ.options.forEach((optionText, idx) => {
            const btn = document.createElement('button');
            btn.className = 'trivia-option-btn';
            btn.textContent = optionText;
            btn.addEventListener('click', () => handleAnswer(idx));
            optionsContainer.appendChild(btn);
        });
    }

    function handleAnswer(selectedIndex) {
        const currentQ = triviaQuestions[currentQuestionIndex];
        const buttons = optionsContainer.querySelectorAll('.trivia-option-btn');

        // Disable all buttons immediately
        buttons.forEach(btn => btn.disabled = true);

        if (selectedIndex === currentQ.answerIndex) {
            buttons[selectedIndex].classList.add('correct');
        } else {
            buttons[selectedIndex].classList.add('incorrect');
            buttons[currentQ.answerIndex].classList.add('correct');
        }

        // Show feedback
        feedbackText.textContent = currentQ.feedback;
        feedbackContainer.style.display = 'block';

        // Scroll to the targeted section smoothly
        const targetSection = document.getElementById(currentQ.targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        renderQuestion();
    });

    // Start the nudge
    startNudgeTimer();
});
