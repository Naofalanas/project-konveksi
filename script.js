/* ================================================
   script.js — KonveksiPro Landing Page
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── Header scroll behavior ───
  const header = document.getElementById('header');

  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load


  // ─── Mobile menu ───
  const toggle = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = !menu.classList.contains('hidden');
      menu.classList.toggle('hidden');

      // Swap hamburger / X icon
      toggle.innerHTML = isOpen
        ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>'
        : '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        toggle.innerHTML = '<svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>';
      });
    });
  }


  // ─── Scroll reveal (IntersectionObserver) ───
  const reveals = document.querySelectorAll('.reveal');

  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -30px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }


  // ─── WhatsApp tooltip ───
  const tooltip = document.getElementById('wa-tooltip');
  const waBtn = document.getElementById('wa-btn');

  if (tooltip) {
    // Show tooltip after 4s
    setTimeout(() => {
      tooltip.classList.remove('opacity-0', 'translate-x-2');
      tooltip.classList.add('opacity-100', 'translate-x-0');
    }, 4000);

    // Hide after 9s
    setTimeout(() => {
      tooltip.classList.add('opacity-0', 'translate-x-2');
      tooltip.classList.remove('opacity-100', 'translate-x-0');
    }, 9000);
  }

  // Show/hide on hover
  if (waBtn && tooltip) {
    waBtn.addEventListener('mouseenter', () => {
      tooltip.classList.remove('opacity-0', 'translate-x-2');
      tooltip.classList.add('opacity-100', 'translate-x-0');
    });
    waBtn.addEventListener('mouseleave', () => {
      tooltip.classList.add('opacity-0', 'translate-x-2');
      tooltip.classList.remove('opacity-100', 'translate-x-0');
    });
  }


  // ─── Smooth anchor scroll (fallback for older browsers) ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
