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


  // ─── Draggable Marquee Carousel ───
  const carousel = document.getElementById('logo-carousel');
  if (carousel) {
    let isDown = false;
    let startX;
    let scrollLeft;
    let playHovered = false;

    // Duplicate track content once more to ensure dragging has enough scroll space
    const track1 = document.getElementById('logo-track-1');
    if (track1) {
       const track3 = track1.cloneNode(true);
       carousel.appendChild(track3);
    }

    carousel.addEventListener('mousedown', (e) => {
      isDown = true;
      carousel.classList.add('cursor-grabbing');
      carousel.classList.remove('cursor-grab');
      startX = e.pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
      isDown = false;
      carousel.classList.remove('cursor-grabbing');
      carousel.classList.add('cursor-grab');
      playHovered = false;
    });
    
    carousel.addEventListener('mouseenter', () => {
       playHovered = true;
    });

    carousel.addEventListener('mouseup', () => {
      isDown = false;
      carousel.classList.remove('cursor-grabbing');
      carousel.classList.add('cursor-grab');
    });
    
    carousel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5; // Drag speed multiplier
      carousel.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile dragging
    carousel.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - carousel.offsetLeft;
      scrollLeft = carousel.scrollLeft;
    }, {passive: true});

    carousel.addEventListener('touchend', () => {
      isDown = false;
    });

    carousel.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - carousel.offsetLeft;
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    }, {passive: true});

    // Auto scroll logic
    let speed = 1; // 1px per frame
    const autoScroll = () => {
      if (!isDown && !playHovered) {
        carousel.scrollLeft += speed;
      }
      
      if (track1) {
        // Snap logic for infinite loops
        if (carousel.scrollLeft >= track1.offsetWidth) {
          carousel.scrollLeft -= track1.offsetWidth; 
        } else if (carousel.scrollLeft <= 0) {
          carousel.scrollLeft += track1.offsetWidth; 
        }
      }
      
      requestAnimationFrame(autoScroll);
    };
    
    requestAnimationFrame(autoScroll);
  }

  // ─── Active Scroll Spy ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#main-nav .nav-link');

  const spyObserver = new IntersectionObserver((entries) => {
    // Only track sections that occupy more than half screen or are clearly the focus
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active-nav'); // Will be defined in Tailwind/input.css
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          }
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -60% 0px'
  });

  sections.forEach(sec => spyObserver.observe(sec));

  // ─── FAQ Accordion ───
  const faqBtns = document.querySelectorAll('.faq-btn');
  faqBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isHidden = content.classList.contains('hidden');
      
      // Close all others
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      // If clicked wasn't already open, open it
      if (isHidden) {
        content.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';
      }
    });
  });

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
