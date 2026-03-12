/* =====================================================
   CLINIC IA – script.js
   ===================================================== */

/* ── PARTICLES ── */
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.top = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 20) + 's';
    p.style.animationDuration = (15 + Math.random() * 10) + 's';
    const size = 1 + Math.random() * 2;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.opacity = 0.2 + Math.random() * 0.5;
    container.appendChild(p);
  }
})();

/* ── NAVBAR SCROLL ── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const onScroll = debounce(() => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, 10);
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ── MOBILE MENU ── */
(function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.mobile-link');

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    // Animate hamburger bars
    const bars = toggle.querySelectorAll('span');
    if (isOpen) {
      bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      bars[1].style.opacity = '0';
      bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      bars.forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    }
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      toggle.querySelectorAll('span').forEach(b => { b.style.transform = ''; b.style.opacity = ''; });
    });
  });
})();

/* ── SMOOTH SCROLL ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

/* ── SCROLL REVEAL ── */
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
})();

/* ── ANIMATED COUNTERS ── */
(function initCounters() {
  const counters = document.querySelectorAll('.counter, .stat-number');
  let hasRun = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasRun.has(entry.target)) {
        hasRun.add(entry.target);
        animateCounter(entry.target, +entry.target.dataset.count);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

/* ── FLIP CARDS (mobile tap) ── */
(function initFlipCards() {
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches || 'ontouchstart' in window;

  document.querySelectorAll('.service-card-flip').forEach(card => {
    card.addEventListener('click', () => {
      if (isMobile()) card.classList.toggle('flipped');
    });
    // Touch feedback
    card.addEventListener('touchstart', () => {
      card.style.transform = 'scale(0.98)';
    }, { passive: true });
    card.addEventListener('touchend', () => {
      card.style.transform = '';
    }, { passive: true });
  });
})();

/* ── CONTACT FORM ── */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  if (!form) return;

  const WEBHOOK_URL = 'https://2x5zv2sp-5678.brs.devtunnels.ms/webhook-test/798433f3-eaef-46d8-884f-1f91f2c44ec9';

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Enviando...';
    btn.disabled = true;

    // Recopilar todos los campos del formulario
    const payload = {
      nombre: document.getElementById('nombre').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      email: document.getElementById('email').value.trim(),
      servicio: document.getElementById('servicio').value,
      mensaje: document.getElementById('mensaje').value.trim(),
      fecha_envio: new Date().toISOString(),
      origen: window.location.href
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      btn.textContent = '✅ ¡Enviado!';
      showToast('success');
      setTimeout(() => {
        form.reset();
        btn.textContent = 'Enviar Solicitud de Cita';
        btn.disabled = false;
      }, 3000);

    } catch (err) {
      console.error('Error al enviar formulario:', err);
      btn.textContent = '❌ Error al enviar';
      showToast('error');
      setTimeout(() => {
        btn.textContent = 'Enviar Solicitud de Cita';
        btn.disabled = false;
      }, 3000);
    }
  });

  function showToast(type = 'success') {
    const toastIcon = toast.querySelector('.toast-icon');
    if (type === 'error') {
      toastIcon.textContent = '❌';
      toast.querySelector('span:last-child') && (toast.childNodes[1].textContent = ' Error al enviar. Intenta de nuevo.');
      toast.style.borderColor = 'rgba(239,68,68,0.4)';
    } else {
      toastIcon.textContent = '✅';
      toast.style.borderColor = '';
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }
})();

/* ── PARALLAX HERO BG ── */
(function initParallax() {
  const bg = document.querySelector('.hero-bg-gradient');
  if (!bg) return;
  window.addEventListener('scroll', debounce(() => {
    const scrolled = window.scrollY;
    bg.style.transform = `translateY(${scrolled * 0.2}px)`;
  }, 16), { passive: true });
})();

/* ── INPUT FOCUS LABELS ── */
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(el => {
  el.addEventListener('focus', () => {
    el.parentElement.querySelector('label').style.color = 'var(--primary-400)';
  });
  el.addEventListener('blur', () => {
    el.parentElement.querySelector('label').style.color = '';
  });
});

/* ── UTILITY ── */
function debounce(fn, wait) {
  let t;
  return function (...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

/* ── RESULT BARS ANIMATE ON SCROLL ── */
(function initResultBars() {
  const bars = document.querySelectorAll('.result-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'grow-bar 1.5s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  bars.forEach(b => {
    b.style.width = '0';
    observer.observe(b);
  });
})();
