// script.js - LangPedagogy Website
// Mobile Toggle Menu, Dark Mode, Page Navigation, Contact Form

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // ---------- DOM Elements ----------
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  const darkToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  const pages = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('.nav-list a');
  const logoLink = document.getElementById('home-logo-link');
  const contactForm = document.getElementById('contactForm');

  // Helper: Close mobile menu if open (and remove body lock)
  function closeMobileMenu() {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      body.classList.remove('menu-open');
      // reset aria/hamburger state if needed (visual handled by CSS)
      if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  // Toggle mobile menu
  function toggleMobileMenu() {
    if (navMenu.classList.contains('open')) {
      closeMobileMenu();
    } else {
      navMenu.classList.add('open');
      body.classList.add('menu-open');
      if (hamburger) hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  // Event listener for hamburger button
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }

  // ---------- Page Navigation Logic ----------
  function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
      page.classList.remove('active-page');
    });
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add('active-page');
    } else {
      // fallback to home if not found
      document.getElementById('home').classList.add('active-page');
    }

    // Update active link styling in nav
    navLinks.forEach(link => {
      const linkPage = link.getAttribute('data-page');
      if (linkPage === pageId) {
        link.style.backgroundColor = 'var(--accent)';
        link.style.color = 'white';
      } else {
        link.style.backgroundColor = '';
        link.style.color = '';
      }
    });
  }

  // Handle navigation from any link (nav link, logo, cta link)
  function navigateTo(pageId) {
    showPage(pageId);
    closeMobileMenu();    // close menu on mobile after navigation
    // Optional: update browser hash without scrolling jump
    history.pushState(null, null, `#${pageId}`);
  }

  // Add click listeners to all nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      if (pageId) navigateTo(pageId);
    });
  });

  // Logo click -> home
  if (logoLink) {
    logoLink.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo('home');
    });
  }

  // Additional CTA link inside home page (element with data-page attribute or class)
  const ctaLink = document.querySelector('.cta-link');
  if (ctaLink && ctaLink.getAttribute('data-page')) {
    ctaLink.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = ctaLink.getAttribute('data-page');
      if (pageId) navigateTo(pageId);
    });
  }

  // Also find any dynamic '.cta-link' in case multiple (just the one but safe)
  document.querySelectorAll('[data-page]').forEach(elem => {
    if (elem.classList && (elem.classList.contains('cta-link') || elem.tagName === 'A')) {
      elem.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = elem.getAttribute('data-page');
        if (pageId) navigateTo(pageId);
      });
    }
  });

  // Handle initial page based on URL hash or default home
  function setInitialPage() {
    const hash = window.location.hash.substring(1); // remove #
    let initialPage = 'home';
    if (hash) {
      // check if hash corresponds to a valid page id
      const validIds = ['home', 'about', 'contact', 'chapter1', 'chapter2', 'chapter3', 'chapter4', 'chapter5', 'chapter6', 'chapter7', 'chapter8', 'chapter9'];
      if (validIds.includes(hash)) {
        initialPage = hash;
      }
    }
    showPage(initialPage);
  }

  setInitialPage();

  // Listen to browser back/forward navigation (popstate)
  window.addEventListener('popstate', function() {
    const hash = window.location.hash.substring(1);
    let pageId = 'home';
    if (hash && ['home','about','contact','chapter1','chapter2','chapter3','chapter4','chapter5','chapter6','chapter7','chapter8','chapter9'].includes(hash)) {
      pageId = hash;
    }
    showPage(pageId);
    closeMobileMenu();
  });

  // ---------- Dark Mode Toggle ----------
  // Check local storage for theme preference
  const storedTheme = localStorage.getItem('langPedagogyTheme');
  if (storedTheme === 'dark') {
    body.classList.add('dark');
    updateDarkIcon(true);
  } else if (storedTheme === 'light') {
    body.classList.remove('dark');
    updateDarkIcon(false);
  } else {
    // Check system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      body.classList.add('dark');
      updateDarkIcon(true);
      localStorage.setItem('langPedagogyTheme', 'dark');
    } else {
      body.classList.remove('dark');
      updateDarkIcon(false);
      localStorage.setItem('langPedagogyTheme', 'light');
    }
  }

  function updateDarkIcon(isDark) {
    const icon = darkToggle.querySelector('i');
    if (icon) {
      if (isDark) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  }

  function toggleDarkMode() {
    if (body.classList.contains('dark')) {
      body.classList.remove('dark');
      localStorage.setItem('langPedagogyTheme', 'light');
      updateDarkIcon(false);
    } else {
      body.classList.add('dark');
      localStorage.setItem('langPedagogyTheme', 'dark');
      updateDarkIcon(true);
    }
  }

  if (darkToggle) {
    darkToggle.addEventListener('click', toggleDarkMode);
  }

  // ---------- Contact Form Handling ----------
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        alert('⚠️ Please fill in all required fields (name, email, message).');
        return;
      }
      if (!email.includes('@') || !email.includes('.')) {
        alert('📧 Please enter a valid email address.');
        return;
      }
      
      // Simple success feedback
      alert(`✨ Thanks ${name}! Your message has been received. We'll respond within 48 hours.`);
      contactForm.reset();
    });
  }

  // ---------- Additional Polish: Close menu if clicking outside (optional) ----------
  // For better UX on mobile: click on overlay or main content closes menu
  document.addEventListener('click', function(event) {
    const isMenuOpen = navMenu && navMenu.classList.contains('open');
    if (!isMenuOpen) return;
    // If click is outside navMenu and not on hamburger button
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger && hamburger.contains(event.target);
    if (!isClickInsideMenu && !isClickOnHamburger) {
      closeMobileMenu();
    }
  });

  // Prevent body scroll when menu open also from wheel?
  // Already handled by class menu-open CSS (we set body.menu-open overflow:hidden in CSS)
  // Ensure that dynamic resize if orientation changes, close menu to avoid weirdness
  window.addEventListener('resize', function() {
    if (window.innerWidth > 860 && navMenu && navMenu.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // Update active link highlight when page changes by external events (already in showPage)
  // Additional: if any button programmatically navigates
  console.log('LangPedagogy JS initialized: responsive toggle, dark mode, chapters 1-9 ready');
});