/* ============================================
   BROCHURE DESIGN PROPOSAL — JS
   Animations, navigation, scroll effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Loader ---
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      // Trigger hero animations after loader hides
      setTimeout(animateHero, 300);
    }, 600);
  });

  // Fallback: hide loader after 2s max
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(animateHero, 300);
  }, 2000);

  // --- Hero Title Animation ---
  function animateHero() {
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach((line, i) => {
      setTimeout(() => {
        line.classList.add('visible');
      }, i * 150);
    });
  }

  // --- Navigation Scroll Effect ---
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // --- Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all animatable elements
  document.querySelectorAll('[data-animate], .section-heading, .deliverable-card, .pricing-table, .estimate-card, .exclusion-item, .term-card, .note-item, .footer-cta h2').forEach(el => {
    observer.observe(el);
  });

  // --- Stagger animations for grid items ---
  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const parent = entry.target;
        const children = parent.querySelectorAll('.deliverable-card, .estimate-card, .exclusion-item, .note-item');
        children.forEach((child, i) => {
          setTimeout(() => {
            child.classList.add('visible');
          }, i * 100);
        });
        staggerObserver.unobserve(parent);
      }
    });
  }, { threshold: 0.1 });

  // Observe parent containers for stagger
  document.querySelectorAll('.deliverables-grid, .estimate-cards, .exclusion-list, .notes-list').forEach(el => {
    staggerObserver.observe(el);
  });

  // --- Smooth anchor scrolling with offset ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});
