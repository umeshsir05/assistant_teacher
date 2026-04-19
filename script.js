// script.js - Assistant Teacher Notes Hub
// DOM Elements
const menuToggleBtn = document.getElementById('menuToggleBtn');
const closeDrawerBtn = document.getElementById('closeDrawerBtn');
const drawerOverlay = document.getElementById('drawerOverlay');
const sideDrawer = document.getElementById('sideDrawer');
const darkModeToggle = document.getElementById('darkModeToggle');
const subjectTitleEl = document.getElementById('subjectTitle');
const notesContentEl = document.getElementById('notesContent');
const menuItems = document.querySelectorAll('.nav-item');
const subjectBadge = document.getElementById('subjectBadge');

// ----- Data: notes for each subject (assistant teacher oriented) -----
const notesDatabase = {
    'cdp': {
        title: 'Child Development & Pedagogy (CDP)',
        badge: 'Learning Theories',
        content: `
            <div class="note-section">
                <h3>📘 Key Concepts in CDP</h3>
                <p><strong>1. Piaget’s Cognitive Development:</strong> Sensorimotor, Preoperational, Concrete Operational, Formal Operational stages. Important for understanding how children learn at different ages.</p>
                <p><strong>2. Vygotsky’s Sociocultural Theory:</strong> Zone of Proximal Development (ZPD), scaffolding, and the role of social interaction in learning.</p>
                <p><strong>3. Kohlberg’s Moral Development:</strong> Pre-conventional, Conventional, Post-conventional levels – essential for classroom moral reasoning.</p>
                <p><strong>4. Erikson’s Psychosocial Stages:</strong> Trust vs Mistrust, Autonomy vs Shame, Initiative vs Guilt, Industry vs Inferiority — relevant for primary teachers.</p>
                <p><strong>5. Inclusive Education:</strong> Addressing diverse learning needs, children with disabilities, and creating an equitable classroom environment.</p>
                <ul class="note-list">
                    <li>Assessment techniques: Formative vs Summative</li>
                    <li>Learning disabilities: Dyslexia, ADHD – identification and support strategies</li>
                    <li>Motivation theories (Maslow, intrinsic/extrinsic)</li>
                </ul>
                <p><em>💡 Teaching Tip: Use play-way and activity-based methods for holistic development.</em></p>
            </div>
        `
    },
    'general-hindi': {
        title: 'सामान्य हिन्दी (General Hindi)',
        badge: 'व्याकरण एवं साहित्य',
        content: `
            <div class="note-section">
                <h3>📖 हिन्दी भाषा एवं साहित्य</h3>
                <p><strong>वर्णमाला एवं उच्चारण:</strong> स्वर, व्यंजन, संयुक्ताक्षर। शुद्ध वर्तनी के नियम।</p>
                <p><strong>संधि एवं समास:</strong> स्वर संधि, व्यंजन संधि, विसर्ग संधि। तत्पुरुष, द्विगु, अव्ययीभाव आदि समास के प्रकार।</p>
                <p><strong>रस एवं छंद:</strong> शृंगार, वीर, करुण, हास्य रस आदि। दोहा, सोरठा, चौपाई जैसे प्रमुख छंद।</p>
                <p><strong>प्रमुख रचनाकार:</strong> कबीर, सूरदास, तुलसीदास, प्रेमचंद, महादेवी वर्मा। शिक्षक पात्रता परीक्षा हेतु विशेष अध्याय।</p>
                <ul class="note-list">
                    <li>अलंकार: अनुप्रास, यमक, उपमा, रूपक</li>
                    <li>मुहावरे एवं लोकोक्तियाँ (परीक्षा उपयोगी)</li>
                    <li>पत्र लेखन एवं निबंध लेखन के टिप्स</li>
                </ul>
                <p>✅ अभ्यास हेतु: पिछले वर्षों के प्रश्नपत्रों का अध्ययन आवश्यक।</p>
            </div>
        `
    },
    'pedagogy-of-english': {
        title: 'Pedagogy of English',
        badge: 'Teaching Methods',
        content: `
            <div class="note-section">
                <h3>📚 Principles of English Language Teaching (ELT)</h3>
                <p><strong>Approaches & Methods:</strong> Direct Method, Bilingual Method, Communicative Language Teaching (CLT), Task-Based Language Teaching (TBLT).</p>
                <p><strong>Developing LSRW Skills:</strong> Listening, Speaking, Reading, Writing – integrated activities for young learners.</p>
                <p><strong>Phonics & Vocabulary:</strong> Teaching pronunciation, word families, contextual vocabulary building.</p>
                <p><strong>Assessment in English:</strong> Continuous Comprehensive Evaluation (CCE), remedial teaching strategies for ESL learners.</p>
                <ul class="note-list">
                    <li>Role of stories, drama, and rhymes in primary English</li>
                    <li>Remedial strategies for common errors (tense, articles)</li>
                    <li>Using authentic materials: newspapers, songs, picture cards</li>
                </ul>
                <p>🎯 Classroom management tips: Encourage peer interaction, multilingual approaches for better comprehension.</p>
            </div>
        `
    },
    'environment': {
        title: 'Environmental Studies (EVS)',
        badge: 'Ecology & Awareness',
        content: `
            <div class="note-section">
                <h3>🌿 Environment for Assistant Teachers</h3>
                <p><strong>Ecosystem & Biodiversity:</strong> Forest, grassland, aquatic ecosystems; flora and fauna conservation.</p>
                <p><strong>Natural Resources:</strong> Water, air, soil, minerals – sustainable use and conservation methods.</p>
                <p><strong>Environmental Pollution & Climate Change:</strong> Causes, effects, and mitigation (global warming, carbon footprint).</p>
                <p><strong>Teaching EVS through Activities:</strong> Nature walks, project-based learning, recycling crafts.</p>
                <ul class="note-list">
                    <li>Water cycle & rainwater harvesting demonstration</li>
                    <li>Food chain, food web and interdependence of living beings</li>
                    <li>Important environmental days (Earth Day, World Environment Day) – school activities</li>
                </ul>
                <p>🌱 EVS Pedagogy: Integrate local environment examples to make learning relatable.</p>
            </div>
        `
    },
    'general-maths': {
        title: 'General Mathematics',
        badge: 'Numerical Aptitude',
        content: `
            <div class="note-section">
                <h3>🧮 Key Math Topics for Teaching & Exams</h3>
                <p><strong>Number System:</strong> Whole numbers, integers, fractions, decimals, LCM, HCF – real life applications.</p>
                <p><strong>Arithmetic:</strong> Percentage, Profit & Loss, Simple & Compound Interest, Ratio & Proportion, Average.</p>
                <p><strong>Geometry & Mensuration:</strong> Area, perimeter of 2D shapes (square, rectangle, circle), volume of cube/cuboid.</p>
                <p><strong>Data Handling:</strong> Mean, median, mode, bar graphs, pictographs – classroom teaching ideas.</p>
                <ul class="note-list">
                    <li>Speed, Distance & Time – word problems</li>
                    <li>Algebra basics: simple equations, patterns</li>
                    <li>Maths pedagogy: use of manipulatives (abacus, blocks) and games</li>
                </ul>
                <p>📐 For assistant teacher exams: focus on mental ability, reasoning, and NCERT curriculum based questions.</p>
            </div>
        `
    },
    'computer': {
        title: 'Computer Fundamentals & ICT',
        badge: 'Digital Literacy',
        content: `
            <div class="note-section">
                <h3>💻 Basics of Computer & ICT in Education</h3>
                <p><strong>Hardware & Software:</strong> CPU, memory, I/O devices, operating systems (Windows, Linux basics).</p>
                <p><strong>MS Office Suite:</strong> Word, Excel, PowerPoint – essential for creating teaching materials.</p>
                <p><strong>Internet & E-learning:</strong> Browsers, search engines, email, safe online practices, digital resources for teachers (DIKSHA, SWAYAM).</p>
                <p><strong>Computer Networks:</strong> LAN, WAN, internet, basics of cybersecurity.</p>
                <ul class="note-list">
                    <li>Using ICT for interactive lessons: smart boards, educational apps</li>
                    <li>Introduction to programming logic: algorithms and flowcharts (basic)</li>
                    <li>Data privacy and ethical use of technology in schools</li>
                </ul>
                <p>🖥️ Recommended: Practice creating digital lesson plans and presentations to enhance teaching.</p>
            </div>
        `
    }
};

// ----- Helper: Load subject notes -----
function loadSubject(subjectKey) {
    const data = notesDatabase[subjectKey];
    if (!data) return;
    subjectTitleEl.innerText = data.title;
    subjectBadge.innerText = data.badge;
    notesContentEl.innerHTML = data.content;
    
    // Update active menu item in drawer
    menuItems.forEach(item => {
        const itemSubject = item.getAttribute('data-subject');
        if (itemSubject === subjectKey) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// ----- Drawer management -----
function openDrawer() {
    sideDrawer.classList.add('open');
    drawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scroll when drawer open (better mobile UX)
}

function closeDrawer() {
    sideDrawer.classList.remove('open');
    drawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// toggle drawer via menu button
menuToggleBtn.addEventListener('click', openDrawer);
closeDrawerBtn.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);

// Close drawer when a menu item is clicked (especially for mobile)
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const subject = item.getAttribute('data-subject');
        if (subject) {
            loadSubject(subject);
            closeDrawer();  // close drawer after selection (good for mobile)
        }
    });
});

// ----- Dark Mode Toggle with localStorage -----
const DARK_MODE_KEY = 'teacherNotesDarkMode';

function setDarkMode(isDark) {
    if (isDark) {
        document.body.classList.add('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem(DARK_MODE_KEY, 'enabled');
    } else {
        document.body.classList.remove('dark');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem(DARK_MODE_KEY, 'disabled');
    }
}

// initial dark mode check
const savedDarkMode = localStorage.getItem(DARK_MODE_KEY);
if (savedDarkMode === 'enabled') {
    setDarkMode(true);
} else if (savedDarkMode === 'disabled') {
    setDarkMode(false);
} else {
    // check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
}

darkModeToggle.addEventListener('click', () => {
    const isDarkNow = document.body.classList.contains('dark');
    setDarkMode(!isDarkNow);
});

// ----- Handle initial load (default CDP) and responsive adjustments -----
loadSubject('cdp');

// On window resize, if drawer is open on desktop and we resize to > 768? not needed, but ensure body overflow reset on close
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && sideDrawer.classList.contains('open')) {
        // optional: auto close if needed? but we keep consistent, but for safety we don't force close.
        // better to leave user experience
    }
});

// Ensure when clicking a menu item from anywhere, it updates notes and drawer closes on mobile
// also we added above; double check for any missing.
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', (e) => {
        const sub = link.getAttribute('data-subject');
        if(sub) loadSubject(sub);
        if(window.innerWidth <= 768) closeDrawer();
    });
});

// Prevent closing if clicking inside drawer content (overlay handles outside)
sideDrawer.addEventListener('click', (e) => e.stopPropagation());

// Add accessibility: Escape key closes drawer
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sideDrawer.classList.contains('open')) {
        closeDrawer();
    }
});

// optional small console info
console.log('Assistant Teacher Notes — ready with dark mode, toggle menu & six subjects');
