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

  // --- Hero Typing Effect ---
  const typingText = document.getElementById('typing-text');
  if (typingText) {
    const textToType = 'Dattatreya S Vellal';
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      typingText.textContent += textToType[charIndex];
      charIndex++;
      if (charIndex >= textToType.length) {
        clearInterval(typeInterval);
      }
    }, 100);
  }

  // --- Hero Image Parallax ---
  const heroSection = document.getElementById('hero');
  const heroPhoto = document.querySelector('.hero__photo img');
  if (heroSection && heroPhoto) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      heroPhoto.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // --- 3D Card Tilt Effect ---
  const tiltCards = document.querySelectorAll('.card, .project-card, .edu-card, .award-card, .timeline__card');
  tiltCards.forEach(card => {
    card.classList.add('tilt-card');
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'none';
    });
  });

  // --- GitHub Projects Fetching ---
  const githubContainer = document.getElementById('github-projects-container');
  if (githubContainer) {
    fetch('https://api.github.com/users/dsvellal/repos?sort=updated&per_page=6')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch GitHub projects');
        return response.json();
      })
      .then(repos => {
        githubContainer.innerHTML = ''; // clear skeletons
        if (repos.length === 0) {
          githubContainer.innerHTML = '<p style="color:var(--color-text-secondary); grid-column: 1/-1; text-align: center;">No public repositories found.</p>';
          return;
        }

        const topRepos = repos.slice(0, 6);

        topRepos.forEach(repo => {
          const card = document.createElement('div');
          card.className = 'project-card fade-in is-visible tilt-card';

          card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
          });
          card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
            card.style.transition = 'transform 0.5s ease, box-shadow 0.3s ease';
          });
          card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
          });

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
          link.innerHTML = `View on GitHub &rarr; <span style="margin-left:8px;font-size:0.9em;color:var(--color-text-muted);">⭐ ${repo.stargazers_count}</span>`;

          card.appendChild(title);
          card.appendChild(desc);
          card.appendChild(link);
          githubContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching GitHub repos:', error);
        githubContainer.innerHTML = '<p style="color:var(--color-text-secondary); grid-column: 1/-1; text-align: center;">Failed to load GitHub projects. Please try again later.</p>';
      });
  }

});
