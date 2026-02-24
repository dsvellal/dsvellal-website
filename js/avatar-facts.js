document.addEventListener('DOMContentLoaded', () => {
    const facts = [
        "Did you know? I'm currently the Software Competency Lead at Philips North America.",
        "I accelerated release cadences by 60% at Philips!",
        "My teams and I eliminated €2.1M in technical debt in a single year.",
        "I spearheaded a digital transformation roadmap that unlocked €3.5M in future opportunities.",
        "Before Philips, I was a Software Development Engineer II at Amazon.",
        "At Amazon, I reduced fraud check latency by 86–89%.",
        "I once automated the daily ingestion of over 2 billion ASINs for analytics.",
        "I was proud to earn the TRMS ZEUS Team Award at Amazon.",
        "As a Senior Lead at Exeter, I managed the OneGate portal stack.",
        "I was recognized as a 'Texeter Thought Leader' in 2015.",
        "I started my journey at IBM India Software Labs.",
        "I hold a patent for 'Determining and conveying user availability', approved by IBM!",
        "I won 'Best Implementation' at India Hackday 2010 for a Micro-Insurance project.",
        "Fun fact: I hold a Master of Science in Yoga from Annamalai University.",
        "I'm a certified Yoga instructor through S-VYASA.",
        "I completed my BE in Computer Science from RV College of Engineering.",
        "I secured an engineering rank of 379 in the Karnataka CET.",
        "In 2021, I received the Outstanding Technical Achievement Award at Philips Global.",
        "I launched the global 'Bar Raiser' program at Philips, cutting senior hiring time by 50%.",
        "I pioneered Service-Ops automation, boosting productivity for over 7,000 Philips engineers.",
        "At IBM, I co-authored three published DeveloperWorks articles on LotusLive.",
        "I was an active volunteer for IBM's Think, Explore, Evolve (T2E) Challenge.",
        "I've been a Toastmaster! Earning Best Speaker, Best Evaluator, and Best Table Topic Speaker.",
        "I hold Competent Communicator and Competent Leader certifications from Toastmasters.",
        "I hold a patent on 'Managing Key Performance Indicators'.",
        "I've presented at the RVCE National Conference on 'Visual Project Dependency Management'.",
        "I was a panelist at the Philips Bengaluru Software Excellence Conference in 2019.",
        "Since 2013, I've delivered guest lectures at over half a dozen engineering colleges.",
        "Are you into philosophy? I wrote a blog post deciphering 'The Alchemist'.",
        "In my free time, I love diving into the intersection of psychology and spirituality.",
        "My wife and I love crafting epic adventures for our toddlers!",
        "I've mentored graduates through the Mentor Together program.",
        "I've been leading book distribution sessions in rural Mysore since 2012.",
        "By 2018, our book distributions reached over 10,000 kids.",
        "I draw leadership lessons from Indian epics like the Ramayana and Mahabharata.",
        "I'm always up for a deep discussion about tech, philosophy, or toddler trails!",
        "At IBM, I engineered integration layers for JAX-WS web services.",
        "I was the youngest at Philips India to be promoted to Principal.",
        "I authored the 2024 'State of Craftsmanship' report at Philips.",
        "I helped orchestrate a CI/CD pipeline deployment that slashed release cycles by 30%.",
        "I developed fraud detection APIs for the high-performance launch of Amazon Pay.",
        "At Amazon, I saved ML scientists 60% of their effort in variable comparison.",
        "I successfully migrated 57 hosts across 22 environments while at Amazon.",
        "At Exeter, I provided key architectural direction for the Apollo system optimization.",
        "I led full-lifecycle software development for the Lotus Expeditor Webcontainer at IBM.",
        "I volunteer regularly with Yogashree spreading yoga principles.",
        "I conduct storytelling sessions for underprivileged kids with Sudhee.",
        "My blog explores stories from 2007-2012, delving into philosophy and reflections.",
        "One of my early blog posts was about Dwaita, Advaita, and Karma Yoga.",
        "I believe in distilling the deeply complex into the elegantly simple."
    ];

    const avatarTrigger = document.getElementById('avatar-trigger');
    const avatarImage = document.getElementById('avatar-image');
    const factBubble = document.getElementById('avatar-fact-bubble');
    const factText = document.getElementById('avatar-fact-text');

    let displayTimer;
    let autoTimer;

    // Config
    const AUTO_INTERVAL_MS = 30000; // 30 seconds
    const DISPLAY_DURATION_MS = 6000; // 6 seconds display time

    function getRandomFact() {
        const randomIndex = Math.floor(Math.random() * facts.length);
        return facts[randomIndex];
    }

    function showFact(text) {
        // Clear any existing timers
        clearTimeout(displayTimer);

        // Show fact text and bubble
        factText.textContent = text;
        factBubble.classList.add('is-visible');

        // Swap to animated GIF
        avatarImage.src = 'images/avatar-talking.gif';

        // Hide after duration
        displayTimer = setTimeout(() => {
            hideFact();
        }, DISPLAY_DURATION_MS);
    }

    function hideFact() {
        factBubble.classList.remove('is-visible');
        // Swap back to static image
        avatarImage.src = 'images/avatar.png';
    }

    function triggerRandomFact() {
        showFact(getRandomFact());
        resetAutoTimer();
    }

    function resetAutoTimer() {
        clearTimeout(autoTimer);
        autoTimer = setTimeout(() => {
            triggerRandomFact();
        }, AUTO_INTERVAL_MS);
    }

    // Event listener for manual click
    avatarTrigger.addEventListener('click', () => {
        triggerRandomFact();
    });

    // Start auto timer
    resetAutoTimer();

    // Optional: show an initial intro fact short after page load
    setTimeout(() => {
        showFact("Hi! Click me or wait to get a random fact about my journey!");
        resetAutoTimer();
    }, 2000);
});
