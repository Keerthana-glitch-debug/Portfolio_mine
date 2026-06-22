// ─── 1. NAV — scroll shadow + active link highlight ───────────────────────
const navbar  = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id], div[id="hero"]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateNav() {
  // Shadow on scroll
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active link based on current section in view
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 80;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateNav);
updateNav();


// ─── 2. HAMBURGER MENU (mobile) ───────────────────────────────────────────
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('a');

hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});


// ─── 3. SCROLL REVEAL ─────────────────────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));


// ─── 4. TYPED TEXT in hero (status line) ──────────────────────────────────
const phrases = [
  'Open to opportunities',
  'Available for internships',
  'Let\'s build something great'
];

const typedEl = document.getElementById('typedStatus');
let phraseIdx = 0;
let charIdx   = 0;
let deleting  = false;
let pause     = false;

function typeLoop() {
  if (!typedEl) return;

  const current = phrases[phraseIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1600); // pause before deleting
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, deleting ? 45 : 80);
}

typeLoop();


// ─── 5. SKILL FILTER ──────────────────────────────────────────────────────
const filterBtns   = document.querySelectorAll('.filter-btn');
const skillGroups  = document.querySelectorAll('.skills-group');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Toggle active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    skillGroups.forEach(group => {
      if (filter === 'all' || group.dataset.category === filter) {
        group.classList.remove('hidden');
      } else {
        group.classList.add('hidden');
      }
    });
  });
});


// ─── 6. CONTACT FORM (client-side validation + mailto fallback) ───────────
const cfSubmit  = document.getElementById('cfSubmit');
const cfStatus  = document.getElementById('cfStatus');
const cfName    = document.getElementById('cfName');
const cfEmail   = document.getElementById('cfEmail');
const cfMessage = document.getElementById('cfMessage');

if (cfSubmit) {
  cfSubmit.addEventListener('click', () => {
    const name    = cfName.value.trim();
    const email   = cfEmail.value.trim();
    const message = cfMessage.value.trim();

    // Basic validation
    if (!name) {
      showStatus('Please enter your name.', 'error');
      cfName.focus();
      return;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please enter a valid email.', 'error');
      cfEmail.focus();
      return;
    }
    if (!message) {
      showStatus('Please enter a message.', 'error');
      cfMessage.focus();
      return;
    }

    // Open mailto (works without a backend)
    const subject = encodeURIComponent('Portfolio Enquiry from ' + name);
    const body    = encodeURIComponent(
      'Name: ' + name + '\nEmail: ' + email + '\n\n' + message
    );
    window.location.href =
      'mailto:keerthana020706@gmail.com?subject=' + subject + '&body=' + body;

    // Clear fields and show success
    cfName.value    = '';
    cfEmail.value   = '';
    cfMessage.value = '';
    showStatus('Opening your email client… ✓', 'success');
  });
}

function showStatus(msg, type) {
  cfStatus.textContent = msg;
  cfStatus.style.color = type === 'error' ? '#e53e3e' : 'var(--magenta)';
  setTimeout(() => { cfStatus.textContent = ''; }, 4000);
}


// ─── 7. BACK TO TOP BUTTON ────────────────────────────────────────────────
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
