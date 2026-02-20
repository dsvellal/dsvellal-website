/* ===========================
   DSVellal.com — Main JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Nav Scroll Effect ---
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 80) {
        nav.classList.add('nav--scrolled');
      } else {
        nav.classList.remove('nav--scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Mobile Menu Toggle ---
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
      const isOpen = navLinks.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Scroll-triggered Fade-In ---
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    fadeEls.forEach(el => observer.observe(el));
  }

  // --- Timeline Toggle ---
  document.querySelectorAll('.timeline__toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.closest('.timeline__card').querySelector('.timeline__more');
      if (target) {
        target.classList.toggle('is-open');
        btn.textContent = target.classList.contains('is-open') ? '← Show less' : 'Show more →';
      }
    });
  });

  // --- Blog Category Filters ---
  const filterBtns = document.querySelectorAll('.blog-filter');
  const blogCards = document.querySelectorAll('.blog-card');
  if (filterBtns.length > 0 && blogCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Update active state
        filterBtns.forEach(b => b.classList.remove('blog-filter--active'));
        btn.classList.add('blog-filter--active');

        const category = btn.dataset.category;
        blogCards.forEach(card => {
          if (category === 'all' || card.dataset.category === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Active nav link highlighting on scroll ---
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav__link[href^="#"]');
  if (sections.length > 0 && navLinksAll.length > 0) {
    const highlightNav = () => {
      const scrollPos = window.scrollY + 100;
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollPos >= top && scrollPos < top + height) {
          navLinksAll.forEach(link => {
            link.classList.remove('nav__link--active');
            if (link.getAttribute('href') === '#' + id) {
              link.classList.add('nav__link--active');
            }
          });
        }
      });
    };
    window.addEventListener('scroll', highlightNav, { passive: true });
  }

});
