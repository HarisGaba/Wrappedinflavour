/* ================================================
   WRAPPED IN FLAVOUR — Main JavaScript
   Brand Theme: #F9EAE3 Warm Blush
   ================================================ */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
}

// ---- ANIMATED BACKGROUND PATTERN ----
const bgPattern = document.getElementById('bgPattern');
if (bgPattern) {
  const icons = ['🌯', '🌶️', '🧀', '🥑', '🍗', '🧆', '🫙', '🧄', '🌿', '🍋', '🥩', '🫓', '🌽', '🍁'];
  const count = window.innerWidth < 768 ? 14 : 26;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'food-icon-bg';
    el.textContent = icons[Math.floor(Math.random() * icons.length)];
    el.style.left = Math.random() * 100 + '%';
    el.style.top = Math.random() * 100 + '%';
    el.style.fontSize = (1.5 + Math.random() * 2) + 'rem';
    el.style.animationDuration = (5 + Math.random() * 7) + 's';
    el.style.animationDelay = (Math.random() * -10) + 's';
    bgPattern.appendChild(el);
  }
}

// ---- SCROLL REVEAL ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el, i) => {
  const parent = el.parentElement;
  const siblings = Array.from(parent.querySelectorAll(':scope > .reveal'));
  const idx = siblings.indexOf(el);
  if (idx > 0) el.dataset.delay = idx * 90;
  revealObserver.observe(el);
});

// ---- MENU TABS ----
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    const content = document.getElementById('tab-' + target);
    if (content) {
      content.classList.add('active');
      content.querySelectorAll('.reveal').forEach((el, idx) => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), idx * 60 + 50);
      });
    }
  });
});

// ---- FAQ TOGGLE ----
function toggleFaq(el) {
  const item = el.closest('.faq-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ---- CONTACT FORM ----
function submitForm() {
  const fname = document.getElementById('fname')?.value.trim();
  const email = document.getElementById('email')?.value.trim();
  const message = document.getElementById('message')?.value.trim();

  if (!fname || !email || !message) {
    const btn = document.getElementById('submitBtn');
    btn.style.animation = 'shake 0.4s ease';
    setTimeout(() => btn.style.animation = '', 400);
    return;
  }

  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (form && success) {
    form.style.opacity = '0';
    form.style.transform = 'scale(0.97)';
    form.style.transition = 'all 0.3s ease';
    setTimeout(() => {
      form.classList.add('hidden');
      success.classList.remove('hidden');
      success.style.animation = 'fadeInUp 0.5s ease forwards';
    }, 300);
  }
}

// ---- PARALLAX HERO ICONS ----
window.addEventListener('scroll', () => {
  const icons = document.querySelectorAll('.food-icon-bg');
  const scroll = window.scrollY;
  icons.forEach((icon, i) => {
    const speed = 0.04 + (i % 5) * 0.015;
    icon.style.transform = `translateY(${scroll * speed}px)`;
  });
});

// ---- INSTAGRAM ITEMS HOVER ----
document.querySelectorAll('.insta-item').forEach(item => {
  item.addEventListener('click', () => {
    window.open('https://instagram.com/wrappedinflavour', '_blank');
  });
  item.style.cursor = 'pointer';
  item.title = 'Visit @wrappedinflavour on Instagram';
});

// ---- SMOOTH NAVBAR INIT ----
window.addEventListener('load', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ---- CATERING EMOJI HOVER ANIMATION ----
document.querySelectorAll('.catering-emoji-grid span').forEach((el, i) => {
  el.style.animationDelay = (i * 0.1) + 's';
});

// ---- CSS ANIMATIONS via injected style ----
const extraStyle = document.createElement('style');
extraStyle.textContent = `
  @keyframes shake {
    0%,100%{ transform: translateX(0); }
    20%{ transform: translateX(-8px); }
    40%{ transform: translateX(8px); }
    60%{ transform: translateX(-5px); }
    80%{ transform: translateX(5px); }
  }
  @keyframes fadeInUp {
    from{ opacity: 0; transform: translateY(20px); }
    to{ opacity: 1; transform: translateY(0); }
  }
  .hidden { display: none !important; }

  /* Staggered entrance for menu grid */
  .menu-grid .menu-item.visible { animation: fadeInUp 0.5s ease forwards; }

  /* Pulse animation for WhatsApp buttons */
  .btn-whatsapp { animation: none; }
  .btn-whatsapp:hover { animation: pulse 0.6s ease; }
  @keyframes pulse {
    0%{ transform: translateY(-3px) scale(1); }
    50%{ transform: translateY(-3px) scale(1.02); }
    100%{ transform: translateY(-3px) scale(1); }
  }

  /* Nav mobile open animation */
  .nav-links.open {
    animation: fadeInUp 0.3s ease forwards;
    z-index: 999;
  }
`;
document.head.appendChild(extraStyle);
