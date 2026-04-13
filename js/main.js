/* ===========================
   DSVellal.com — Main JS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Cursor Spotlight Effect ---
  const spotlight = document.getElementById('spotlight');
  if (spotlight) {
    document.addEventListener('mousemove', (e) => {
      spotlight.style.background =
        `radial-gradient(600px at ${e.clientX}px ${e.clientY}px, rgba(232, 200, 114, 0.04), transparent 80%)`;
    });
  }

  // --- Scroll Spy for Navigation ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (sections.length > 0 && navLinks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove('nav-link--active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('nav-link--active');
            }
          });
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '-10% 0px -60% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- GitHub Projects Fetching ---
  const githubContainer = document.getElementById('github-projects-container');
  if (githubContainer) {
    fetch('https://api.github.com/users/dsvellal/repos?sort=updated&per_page=6')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch');
        return response.json();
      })
      .then(repos => {
        githubContainer.innerHTML = '';
        if (repos.length === 0) {
          githubContainer.innerHTML =
            '<p style="color:var(--text-muted); text-align:center; grid-column:1/-1;">No public repositories found.</p>';
          return;
        }
        repos.slice(0, 6).forEach(repo => {
          const card = document.createElement('div');
          card.className = 'project-card';

          const title = document.createElement('h3');
          title.className = 'project-card__title';
          title.textContent = repo.name;

          const desc = document.createElement('p');
          desc.className = 'project-card__desc';
          desc.textContent = repo.description || 'No description provided.';

          const link = document.createElement('a');
          link.className = 'project-card__link';
          link.href = repo.html_url;
          link.target = '_blank';
          link.rel = 'noopener';
          link.innerHTML = `View on GitHub &rarr; <span style="margin-left:0.5rem;opacity:0.6;">⭐ ${repo.stargazers_count}</span>`;

          card.appendChild(title);
          card.appendChild(desc);
          card.appendChild(link);
          githubContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching GitHub repos:', error);
        githubContainer.innerHTML =
          '<p style="color:var(--text-muted); text-align:center; grid-column:1/-1;">Failed to load projects.</p>';
      });
  }

  // --- Scroll-triggered Fade-In (for blog pages) ---
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length > 0 && 'IntersectionObserver' in window) {
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    fadeEls.forEach(el => fadeObserver.observe(el));
  }

  // --- Mobile Menu Toggle (for blog pages) ---
  const toggle = document.querySelector('.nav__toggle');
  const mobileNavLinks = document.querySelector('.nav__links');
  if (toggle && mobileNavLinks) {
    toggle.addEventListener('click', () => {
      mobileNavLinks.classList.toggle('is-open');
      const isOpen = mobileNavLinks.classList.contains('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });

    mobileNavLinks.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        mobileNavLinks.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Blog Category Filters (for blog listing page) ---
  const filterBtns = document.querySelectorAll('.blog-filter');
  const blogCards = document.querySelectorAll('.blog-card');
  if (filterBtns.length > 0 && blogCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('blog-filter--active'));
        btn.classList.add('blog-filter--active');
        const category = btn.dataset.category;
        blogCards.forEach(card => {
          card.style.display = (category === 'all' || card.dataset.category === category) ? '' : 'none';
        });
      });
    });
  }

});
