'use strict';

/* ================================================================
   RENDERER — reads PORTFOLIO from content.js and builds the DOM
   This file does not need to be edited for content changes.
================================================================ */

// Parse inline markdown (**bold**, _italic_) — no block wrappers
function md(text) {
  if (typeof marked !== 'undefined') return marked.parseInline(String(text));
  return String(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

// Shared SVG / icon snippets
const ICON_LINK    = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const ICON_LINK_SM = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const ICON_EXT_SM  = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const ICON_DL      = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
const IMG_GH       = `<img src="https://cdn.simpleicons.org/github/ffffff" alt="" width="13" height="13" style="flex-shrink:0" onerror="this.style.display='none'" />`;
const IMG_GH_SM    = `<img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" width="16" height="16" onerror="this.style.display='none'" />`;
const IMG_X_SM     = `<img src="https://cdn.simpleicons.org/x/ffffff" alt="X" width="15" height="15" onerror="this.style.display='none'" />`;
const THUMB_PH_LG  = `<div class="thumb-placeholder"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Loading...</span><span class="thumb-hint">1280 &times; 720 recommended</span></div>`;
const THUMB_PH_SM  = `<div class="thumb-placeholder thumb-placeholder--sm"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><span>Loading...</span></div>`;

function thumbUrl(url) {
  return `https://image.thum.io/get/width/1280/crop/720/noanimate/${url}`;
}

/* ────────────────────────────────────────────
   HERO
──────────────────────────────────────────── */
function renderHero() {
  const d = PORTFOLIO.hero;
  const mount = document.querySelector('.hero-content');
  if (!mount) return;

  mount.innerHTML = `
    <div class="hero-badge reveal">
      <span class="badge-dot"></span> ${d.badge}
    </div>
    <h1 class="hero-name reveal">
      Hi, I'm <span class="gradient-smooth">${d.name}</span>
    </h1>
    <p class="hero-role reveal">
      <span id="typed"></span><span class="cursor">|</span>
    </p>
    <p class="hero-desc reveal">${d.description}</p>
    <div class="hero-actions reveal">
      <a href="#projects" class="btn btn-primary">View Projects</a>
      <a href="#contact"  class="btn btn-outline">Get In Touch</a>
    </div>
    <div class="hero-stats reveal">
      ${d.stats.map((s, i) => `
        ${i > 0 ? '<div class="stat-divider"></div>' : ''}
        <div class="stat">
          <span class="stat-num">${s.num}</span>
          <span class="stat-label">${s.label}</span>
        </div>`).join('')}
    </div>`;
}

/* ────────────────────────────────────────────
   ABOUT
──────────────────────────────────────────── */
function renderAbout() {
  const d = PORTFOLIO.about;
  const mount = document.getElementById('about-mount');
  if (!mount) return;

  const detailRows = Object.entries(d.details).map(([key, val]) => {
    const valHtml = key === 'Email'
      ? `<a href="mailto:${val}" class="detail-val detail-link">${val}</a>`
      : `<span class="detail-val">${val}</span>`;
    return `<div class="detail-row"><span class="detail-key">${key}</span>${valHtml}</div>`;
  }).join('');

  mount.innerHTML = `
    <div class="about-grid">
      <div class="about-photo-wrap reveal">
        <div class="about-photo">
          <img src="assets/images/profile/avatar.jpg" alt="${d.details.Name}" class="about-img" onerror="this.style.display='none'" />
          <div class="about-img-placeholder" aria-hidden="true">
            <span>SA</span>
            <p class="placeholder-hint">assets/images/profile/avatar.jpg</p>
          </div>
        </div>
        <div class="about-photo-ring"></div>
        <div class="about-photo-tag"><span class="tag-dot"></span> Open to opportunities</div>
      </div>
      <div class="about-body">
        <div class="section-eyebrow reveal">About Me</div>
        <h2 class="section-heading reveal">${d.heading}</h2>
        ${d.bio.map(p => `<p class="about-para reveal">${md(p)}</p>`).join('')}
        <div class="about-details reveal">${detailRows}</div>
        <div class="about-actions reveal">
          <a href="resume/Syed-Anwar-Updated.pdf" class="btn btn-primary" download="Syed-Anwar-Resume.pdf">
            ${ICON_DL} Download CV
          </a>
          <a href="#contact" class="btn btn-ghost">Get in touch &rarr;</a>
        </div>
      </div>
    </div>`;
}

/* ────────────────────────────────────────────
   EXPERIENCE
──────────────────────────────────────────── */
function renderExperience() {
  const mount = document.getElementById('experience-mount');
  if (!mount) return;

  const items = PORTFOLIO.experience.map(job => {
    const dotClass = job.active ? 'timeline-dot timeline-dot--active' : 'timeline-dot';
    const badge    = job.badge ? `<span class="tl-badge">${job.badge}</span>` : '';

    const platformTags = job.isFreelance ? `
      <div class="tl-platforms">
        <span class="platform-tag platform-tag--fiverr">
          <img src="https://cdn.simpleicons.org/fiverr/1dbf73" alt="Fiverr" width="12" height="12" /> Fiverr
        </span>
        <span class="platform-tag platform-tag--upwork">
          <img src="https://cdn.simpleicons.org/upwork/6fda44" alt="Upwork" width="12" height="12" /> Upwork
        </span>
      </div>` : '';

    const companyHtml = job.company ? `<p class="tl-company">${job.company}</p>` : '';

    const freelanceBtns = job.isFreelance ? `
      <div class="freelance-btns">
        <a href="${job.fiverr}" target="_blank" rel="noopener" class="freelance-btn freelance-btn--fiverr">
          <img src="https://cdn.simpleicons.org/fiverr/ffffff" alt="Fiverr" width="16" height="16" onerror="this.style.display='none'" />
          View Fiverr Profile ${ICON_EXT_SM}
        </a>
        <a href="${job.upwork}" target="_blank" rel="noopener" class="freelance-btn freelance-btn--upwork">
          <img src="https://cdn.simpleicons.org/upwork/ffffff" alt="Upwork" width="16" height="16" onerror="this.style.display='none'" />
          View Upwork Profile ${ICON_EXT_SM}
        </a>
      </div>` : '';

    return `
      <div class="timeline-item reveal">
        <div class="${dotClass}"></div>
        <div class="timeline-card">
          <div class="tl-header">
            <div>
              <h3 class="tl-role">${job.role}</h3>
              ${companyHtml}${platformTags}
            </div>
            <div class="tl-meta">
              ${badge}
              <span class="tl-period">${job.period} &middot; ${job.location}</span>
            </div>
          </div>
          <ul class="tl-bullets">
            ${job.bullets.map(b => `<li>${md(b)}</li>`).join('')}
          </ul>
          ${freelanceBtns}
          <div class="tl-stack">
            ${job.stack.map(s => `<span>${s}</span>`).join('')}
          </div>
        </div>
      </div>`;
  }).join('');

  mount.innerHTML = `
    <div class="section-eyebrow reveal">Experience</div>
    <h2 class="section-heading reveal">Professional journey</h2>
    <p class="section-sub reveal">Companies and platforms where I've built and shipped AI systems.</p>
    <div class="timeline">${items}</div>`;
}

/* ────────────────────────────────────────────
   PROJECTS
──────────────────────────────────────────── */
function renderProjects() {
  const mount = document.getElementById('projects-mount');
  if (!mount) return;

  const { featured, others } = PORTFOLIO.projects;

  // Featured cards
  const featuredHtml = featured.map(p => {
    const reverseClass = p.reverse ? ' featured-card--reverse' : '';
    const features = p.features.map(f => `<li>${md(f)}</li>`).join('');
    const stack    = p.stack.map(s => `<span>${s}</span>`).join('');

    const liveBtn   = p.liveUrl   ? `<a href="${p.liveUrl}" target="_blank" rel="noopener" class="btn btn-primary btn-sm">${ICON_LINK} Live Site</a>` : '';
    const githubBtn = p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm">${IMG_GH} GitHub</a>` : '';
    const xBtn      = p.xUrl      ? `<a href="${p.xUrl}" target="_blank" rel="noopener" class="btn btn-outline btn-sm"><img src="https://cdn.simpleicons.org/x/ffffff" alt="X" width="13" height="13" style="flex-shrink:0" onerror="this.style.display='none'" /> AI Agent on X</a>` : '';

    return `
      <article class="featured-card${reverseClass} reveal" id="${p.id}">
        <div class="featured-img-wrap">
          <div class="project-thumbnail">
            <img src="${thumbUrl(p.screenshotUrl)}" alt="${p.title}" loading="lazy" class="thumb-img" onerror="this.style.display='none'" />
            ${THUMB_PH_LG}
            <div class="thumb-overlay">
              <a href="${p.liveUrl || p.screenshotUrl}" target="_blank" rel="noopener" class="overlay-live-btn">Visit Site &#8599;</a>
            </div>
          </div>
        </div>
        <div class="featured-body">
          <div class="project-meta">
            <span class="project-badge">${p.badge}</span>
            <span class="project-year">${p.year}</span>
          </div>
          <h3 class="project-title">${p.title}</h3>
          <p class="project-tagline">${p.tagline}</p>
          <p class="project-desc">${p.description}</p>
          <ul class="project-features">${features}</ul>
          <div class="project-stack">${stack}</div>
          <div class="project-links">${liveBtn}${githubBtn}${xBtn}</div>
        </div>
      </article>`;
  }).join('');

  // Other project cards
  const othersHtml = others.map(p => {
    const stack = p.stack.map(s => `<span>${s}</span>`).join('');

    const links = [
      p.liveUrl   ? `<a href="${p.liveUrl}"   target="_blank" rel="noopener" title="Live Site">${ICON_LINK_SM}</a>` : '',
      p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener" title="GitHub">${IMG_GH_SM}</a>` : '',
      p.xUrl      ? `<a href="${p.xUrl}"      target="_blank" rel="noopener" title="View on X">${IMG_X_SM}</a>` : '',
    ].join('');

    return `
      <article class="other-card reveal">
        <div class="other-thumbnail">
          <img src="${thumbUrl(p.screenshotUrl)}" alt="${p.title}" loading="lazy" class="thumb-img" onerror="this.style.display='none'" />
          ${THUMB_PH_SM}
          <div class="thumb-overlay">
            <a href="${p.liveUrl || p.xUrl || p.githubUrl || p.screenshotUrl}" target="_blank" rel="noopener" class="overlay-live-btn">View &#8599;</a>
          </div>
        </div>
        <div class="other-body">
          <div class="project-meta">
            <span class="project-badge">${p.badge}</span>
            <span class="project-year">${p.year}</span>
          </div>
          <h3 class="other-title">${p.title}</h3>
          <p class="other-tagline">${p.tagline}</p>
          <p class="other-desc">${p.description}</p>
          <div class="project-stack">${stack}</div>
          <div class="other-links">${links}</div>
        </div>
      </article>`;
  }).join('');

  mount.innerHTML = `
    <div class="section-eyebrow reveal">Projects</div>
    <h2 class="section-heading reveal">Selected work</h2>
    <p class="section-sub reveal">Real-world AI systems I've designed, trained, and shipped.</p>
    <div class="featured-projects">${featuredHtml}</div>
    <h3 class="other-projects-heading reveal">Other noteworthy projects</h3>
    <div class="other-projects-grid">${othersHtml}</div>`;
}

/* ────────────────────────────────────────────
   INIT — runs synchronously (script is at end of <body>)
──────────────────────────────────────────── */
renderHero();
renderAbout();
renderExperience();
renderProjects();
