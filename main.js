/**
 * ============================================================================
 * PERSONAL PORTFOLIO INTERACTIVITY SCRIPT (main.js)
 * Features:
 *  1. Theme Switcher (Dark / Light Mode) with LocalStorage persistence
 *  2. Mobile Hamburger Drawer Navigation & Outside-Click Dismissal
 *  3. Dynamic Typewriter Effect for Hero Headline
 *  4. ScrollSpy / Active Navigation Indicator on Scroll
 *  5. Project Category Filtering with Transitions
 *  6. Contact Form Client-side Validation & Interactive Toast Notification
 *  7. Floating Back-to-Top Scroll Behavior
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ==========================================================================
  // 1. THEME SWITCHER (DARK / LIGHT MODE)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Retrieve stored theme or system preference
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  };

  // Initialize theme
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Listen for system theme updates
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });

  // ==========================================================================
  // 2. MOBILE HAMBURGER NAVIGATION
  // ==========================================================================
  const navHamburger = document.getElementById('nav-hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileNav = () => {
    const isActive = navMenu.classList.toggle('active');
    navHamburger.classList.toggle('active');
    navHamburger.setAttribute('aria-expanded', isActive);
  };

  const closeMobileNav = () => {
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navHamburger.classList.remove('active');
      navHamburger.setAttribute('aria-expanded', false);
    }
  };

  if (navHamburger && navMenu) {
    navHamburger.addEventListener('click', toggleMobileNav);

    // Close mobile menu on nav link click
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close when clicking outside of nav
    document.addEventListener('click', (event) => {
      if (
        navMenu.classList.contains('active') &&
        !navMenu.contains(event.target) &&
        !navHamburger.contains(event.target)
      ) {
        closeMobileNav();
      }
    });
  }

  // ==========================================================================
  // 3. DYNAMIC HERO TYPEWRITER EFFECT
  // ==========================================================================
  const typewriterElement = document.getElementById('typewriter-text');
  const phrases = [
  'Tech Enthusiast | Developer | Lifelong Learner'
];

  let phraseIndex = 0;
  let letterIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typewriterElement.textContent = currentPhrase.substring(0, letterIndex - 1);
      letterIndex--;
      typingSpeed = 50;
    } else {
      typewriterElement.textContent = currentPhrase.substring(0, letterIndex + 1);
      letterIndex++;
      typingSpeed = 110;
    }

    // Finished typing full phrase
    if (!isDeleting && letterIndex === currentPhrase.length) {
      typingSpeed = 1800; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && letterIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500; // Pause before typing next
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();

  // ==========================================================================
  // 4. SCROLLSPY / ACTIVE NAVIGATION HIGHLIGHT
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');

  function highlightNavigation() {
    const scrollY = window.scrollY;
    const headerHeight = 85;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - headerHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNavigation, { passive: true });
  highlightNavigation(); // Initial check

  // ==========================================================================
  // 5. PROJECT CATEGORY FILTERING
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Toggle active filter button style
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedCategory = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        if (selectedCategory === 'all' || cardCategory === selectedCategory) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // 6. CONTACT FORM VALIDATION & TOAST NOTIFICATION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success') {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : '!'}</span>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    // Trigger slide-in transition
    setTimeout(() => {
      toast.classList.add('show');
    }, 50);

    // Remove after 4 seconds
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4000);
  }

  // Real-time input clearing of error styling
  if (contactForm) {
    const inputs = contactForm.querySelectorAll('.form-input, .form-textarea');
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        const group = input.closest('.form-group');
        if (group && group.classList.contains('has-error')) {
          group.classList.remove('has-error');
        }
      });
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const name = document.getElementById('user_name');
      const email = document.getElementById('user_email');
      const subject = document.getElementById('user_subject');
      const message = document.getElementById('user_message');

      const validateField = (field, condition) => {
        const group = field.closest('.form-group');
        if (!condition) {
          group.classList.add('has-error');
          isValid = false;
        } else {
          group.classList.remove('has-error');
        }
      };

      // Validation Checks
      validateField(name, name.value.trim().length >= 2);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      validateField(email, emailRegex.test(email.value.trim()));
      validateField(subject, subject.value.trim().length >= 3);
      validateField(message, message.value.trim().length >= 10);

      if (isValid) {
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;

        // Button Loading State
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending Message...';

        // Simulate network submission delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          contactForm.reset();

          showToast('Thank you! Your message has been sent successfully. I will respond promptly.');
        }, 1000);
      } else {
        showToast('Please check the form fields and resolve errors.', 'error');
      }
    });
  }

  // ==========================================================================
  // 7. BACK-TO-TOP BUTTON BEHAVIOR
  // ==========================================================================
  const backToTopBtn = document.getElementById('back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Resume Download Event Notification
  const resumeDownloadBtns = document.querySelectorAll('.download-resume-trigger');
  resumeDownloadBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      showToast('Resume download started.');
    });
  });

  // Dynamic Current Year in Footer
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
