'use strict';

/* ================================================================
   NAVBAR — scroll class + active link highlight
================================================================ */
const navbar   = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const sections = document.querySelectorAll('section[id]');
const allLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);

  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
  });
  allLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}, { passive: true });

/* ================================================================
   MOBILE MENU
================================================================ */
const hamburger = document.getElementById('hamburger');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', e => {
  if (navLinks.classList.contains('open')
      && !navLinks.contains(e.target)
      && !hamburger.contains(e.target)) {
    closeMobileMenu();
  }
});

function closeMobileMenu() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

/* ================================================================
   HERO CANVAS — Neural Network Animation
================================================================ */
(function initCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  const NODES  = 72;
  const RADIUS = 160;   // max connection distance
  const SPEED  = 0.35;

  let W, H, nodes, mouse = { x: -999, y: -999 };
  let animId;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function makeNodes() {
    nodes = Array.from({ length: NODES }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r:  Math.random() * 1.6 + 0.6,
      pulse: Math.random() * Math.PI * 2,   // phase offset for glow
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    const now = Date.now() * 0.001;

    /* ── connections ── */
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx   = nodes[i].x - nodes[j].x;
        const dy   = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < RADIUS) {
          const alpha = (1 - dist / RADIUS) * 0.18;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
          ctx.lineWidth   = 0.7;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      /* ── mouse-repel connections ── */
      const mdx  = nodes[i].x - mouse.x;
      const mdy  = nodes[i].y - mouse.y;
      const mdst = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdst < RADIUS * 1.2) {
        const alpha = (1 - mdst / (RADIUS * 1.2)) * 0.35;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth   = 0.8;
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }

    /* ── nodes ── */
    nodes.forEach(n => {
      const mdx  = n.x - mouse.x;
      const mdy  = n.y - mouse.y;
      const near = Math.sqrt(mdx * mdx + mdy * mdy) < RADIUS * 0.8;

      // Pulse brightness
      const glow = 0.35 + Math.sin(now * 1.5 + n.pulse) * 0.15 + (near ? 0.3 : 0);

      // Outer glow
      if (near || glow > 0.4) {
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        grad.addColorStop(0, `rgba(255,255,255,${glow * 0.5})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Core dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, near ? n.r * 1.8 : n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${glow})`;
      ctx.fill();

      // Move
      n.x  += n.vx;
      n.y  += n.vy;
      n.pulse += 0.012;

      // Soft mouse repulsion
      if (Math.sqrt(mdx * mdx + mdy * mdy) < 100) {
        n.vx += mdx * 0.0002;
        n.vy += mdy * 0.0002;
      }

      // Speed clamp
      const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (speed > SPEED * 2) { n.vx *= 0.95; n.vy *= 0.95; }

      // Bounce off edges
      if (n.x < 0 || n.x > W) n.vx *= -1;
      if (n.y < 0 || n.y > H) n.vy *= -1;
      n.x = Math.max(0, Math.min(W, n.x));
      n.y = Math.max(0, Math.min(H, n.y));
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  makeNodes();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animId);
    resize();
    makeNodes();
    draw();
  }, { passive: true });

  /* Track mouse over the hero section */
  const hero = document.getElementById('hero');
  hero.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }, { passive: true });
  hero.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });
})();

/* ================================================================
   TYPING ANIMATION
================================================================ */
const roles = [
  'Senior Data Scientist',
  'AI / ML Engineer',
  'Deep Learning Specialist',
  'AI Agents & RAG Architect',
  'Computer Vision Engineer',
];

let roleIdx  = 0;
let charIdx  = 0;
let deleting = false;
const typedEl = document.getElementById('typed');

function runTyping() {
  if (!typedEl) return;
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(runTyping, 2200);
      return;
    }
    setTimeout(runTyping, 85);
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      setTimeout(runTyping, 380);
      return;
    }
    setTimeout(runTyping, 42);
  }
}
runTyping();

/* ================================================================
   SCROLL REVEAL
================================================================ */
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const siblings = [...entry.target.parentElement
      .querySelectorAll('.reveal:not(.visible)')];
    const delay = Math.min(siblings.indexOf(entry.target) * 65, 320);

    setTimeout(() => entry.target.classList.add('visible'), delay);
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

/* Reveal hero immediately — script is at end of <body> so DOM is ready */
function revealHero() {
  document.querySelectorAll('.hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), 200 + i * 120);
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', revealHero);
} else {
  revealHero();
}

/* ================================================================
   SKILLS FILTER
================================================================ */
(function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.sf-btn');
  const chips      = document.querySelectorAll('.skill-chip');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      chips.forEach((chip, i) => {
        const match = filter === 'all' || chip.dataset.cat === filter;
        if (match) {
          chip.style.display = '';
          // Stagger the re-appear animation
          chip.style.animationDelay = `${i * 18}ms`;
          chip.classList.add('chip-show');
          chip.classList.remove('chip-hide');
        } else {
          chip.classList.add('chip-hide');
          chip.classList.remove('chip-show');
          setTimeout(() => {
            if (chip.classList.contains('chip-hide')) chip.style.display = 'none';
          }, 200);
        }
      });
    });
  });
})();

/* ================================================================
   CONTACT FORM — validation + submission
================================================================ */
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

const fields = {
  name:    { el: document.getElementById('c-name'),    err: document.getElementById('err-name'),    msg: 'Please enter your name.' },
  email:   { el: document.getElementById('c-email'),   err: document.getElementById('err-email'),   msg: 'Please enter a valid email.' },
  subject: { el: document.getElementById('c-subject'), err: document.getElementById('err-subject'), msg: 'Please enter a subject.' },
  message: { el: document.getElementById('c-message'), err: document.getElementById('err-message'), msg: 'Please write a message (min 20 chars).' },
};

function validateField(key) {
  const { el, err, msg } = fields[key];
  let valid = true;
  if (key === 'email') {
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
  } else if (key === 'message') {
    valid = el.value.trim().length >= 20;
  } else {
    valid = el.value.trim().length > 0;
  }
  el.classList.toggle('error', !valid);
  err.textContent = valid ? '' : msg;
  return valid;
}

Object.keys(fields).forEach(key => {
  fields[key].el.addEventListener('blur', () => validateField(key));
  fields[key].el.addEventListener('input', () => {
    if (fields[key].el.classList.contains('error')) validateField(key);
  });
});

// if (form) {
//   form.addEventListener('submit', e => {
//     e.preventDefault();
//     const allValid = Object.keys(fields).every(k => validateField(k));
//     if (!allValid) return;

//     const btnText  = submitBtn.querySelector('.btn-text');
//     const original = btnText.textContent;
//     btnText.textContent = 'Sending...';
//     submitBtn.disabled  = true;

//     /*
//       TO ENABLE REAL SUBMISSIONS:
//       1. Sign up at https://formspree.io (free, 50/month)
//       2. Replace the form's onsubmit mock below with:
//          form.setAttribute('action', 'https://formspree.io/f/YOUR_ID')
//          form.setAttribute('method', 'POST')
//          form.submit()
//     */
//     setTimeout(() => {
//       showToast('Message sent! I will get back to you within 24 hours.');
//       form.reset();
//       btnText.textContent = original;
//       submitBtn.disabled  = false;
//     }, 1400);
//   });
// }

// Contact Form - Formspree integration
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const allValid = Object.keys(fields).every(k => validateField(k));
    if (!allValid) return;
    
    const btnText = submitBtn.querySelector('.btn-text');
    const original = btnText.textContent;
    btnText.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        showToast('Message sent successfully! I will get back to you within 24 hours.');
        form.reset();
      } else {
        showToast('Something went wrong. Please try again or email me directly.');
      }
    } catch (error) {
      showToast('Network error. Please check your connection.');
    } finally {
      btnText.textContent = original;
      submitBtn.disabled = false;
    }
  });
}
/* ================================================================
   THUMBNAIL FADE-IN ON LOAD
================================================================ */
document.querySelectorAll('.thumb-img[src]').forEach(img => {
  if (img.complete && img.naturalWidth) {
    img.classList.add('loaded');
  } else {
    img.addEventListener('load', () => img.classList.add('loaded'));
  }
});

/* ================================================================
   TOAST
================================================================ */
function showToast(message) {
  document.querySelector('.toast')?.remove();

  const toast = document.createElement('div');
  toast.className   = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  if (!document.getElementById('toast-styles')) {
    const s = document.createElement('style');
    s.id = 'toast-styles';
    s.textContent = `
      .toast {
        position: fixed; bottom: 2rem; right: 2rem;
        background: #fff; color: #000;
        padding: .8rem 1.4rem; border-radius: 10px;
        font-size: .875rem; font-weight: 600;
        box-shadow: 0 8px 32px rgba(0,0,0,.5);
        z-index: 9999;
        animation: ti .3s cubic-bezier(.16,1,.3,1) forwards, to .3s ease 3.5s forwards;
      }
      @keyframes ti { from { opacity:0; transform:translateY(12px) } }
      @keyframes to { to   { opacity:0; transform:translateY(12px) } }
    `;
    document.head.appendChild(s);
  }
  setTimeout(() => toast.remove(), 4000);
}




// Load pipelines HTML dynamically
function loadPipelines() {
  const pipelineSection = document.getElementById('pipelines-section');
  if (!pipelineSection) return;
  
  fetch('pipelines.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      if (html.trim()) {
        pipelineSection.innerHTML = html;
        console.log('Pipelines loaded successfully');
      } else {
        throw new Error('Empty response');
      }
    })
    .catch(error => {
      console.error('Error loading pipelines:', error);
      // Fallback: Show a message
      pipelineSection.innerHTML = '<div class="container"><p style="color: var(--muted); text-align: center; padding: 2rem;">⚠️ Pipelines content coming soon. Check back later!</p></div>';
    });
}

/* ================================================================
   MOUSE-FOLLOWING GRADIENT EFFECT
================================================================ */
const gradientSections = document.querySelectorAll('.about, .experience, .skills, .projects, .contact, .pipelines-wrapper');

gradientSections.forEach(section => {
  section.addEventListener('mousemove', (e) => {
    const rect = section.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    section.style.setProperty('--mouse-x', `${x}%`);
    section.style.setProperty('--mouse-y', `${y}%`);
  });
});