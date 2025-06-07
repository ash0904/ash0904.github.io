// --- Projects ---
fetch('data/projects.json')
  .then(res => res.json())
  .then(projects => {
    const grid = document.createElement('div');
    grid.className = 'project-grid';
    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tech">${p.tech}</div>
        ${p.github ? `<a href="${p.github}" target="_blank">GitHub</a>` : ''}
      `;
      grid.appendChild(card);
    });
    document.getElementById('projects').appendChild(grid);
  });

// --- Experience ---
fetch('data/experience.json')
  .then(res => res.json())
  .then(experiences => {
    const timeline = document.createElement('div');
    timeline.className = 'timeline';
    experiences.forEach((exp, idx) => {
      const item = document.createElement('div');
      item.className = 'timeline-item expandable';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="exp-summary">
            <h3>${exp.organization}</h3>
            <div class="exp-meta">
              <div style="flex:1 1 0;min-width:120px;text-align:left;">
                <span class="exp-role">${exp.role}</span>
              </div>
              <div class="exp-meta-right">
                <span class="exp-location">${exp.location}</span>
                <span class="exp-date">${exp.date}</span>
              </div>
            </div>
          </div>
          <div class="exp-details-row">
            <ul>${exp.summary.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
          <div class="expand-details" style="display:none;">
            <ul>${exp.details.map(d => `<li>${d}</li>`).join('')}</ul>
          </div>
        </div>
      `;
      timeline.appendChild(item);
    });
    document.getElementById('experience').appendChild(timeline);
    attachModalHandlers();
  });

// --- Education ---
fetch('data/education.json')
  .then(res => res.json())
  .then(education => {
    const timeline = document.createElement('div');
    timeline.className = 'timeline';
    education.forEach((edu, idx) => {
      const item = document.createElement('div');
      item.className = 'timeline-item expandable';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="exp-summary">
            <h3>${edu.institution}</h3>
            <div class="exp-meta">
              <div style="flex:1 1 0;min-width:120px;text-align:left;">
                <span class="exp-role">${edu.degree}</span>
              </div>
              <div class="exp-meta-right">
                <span class="exp-location">${edu.location}</span>
                <span class="exp-date">${edu.date}</span>
              </div>
            </div>
          </div>
          <div class="exp-details-row">
            <ul>${edu.summary.map(s => `<li>${s}</li>`).join('')}</ul>
          </div>
          <div class="expand-details" style="display:none;">
            <ul>${edu.details.map(d => `<li>${d}</li>`).join('')}</ul>
          </div>
        </div>
      `;
      timeline.appendChild(item);
    });
    document.getElementById('education').appendChild(timeline);
    attachModalHandlers();
  });

// --- Contact ---
fetch('data/contact.json')
  .then(res => res.json())
  .then(contactData => {
    const section = document.getElementById('contact');
    const heading = document.createElement('h2');
    heading.textContent = 'Contact';
    section.appendChild(heading);
    const msg = document.createElement('p');
    msg.textContent = contactData.message;
    section.appendChild(msg);
    const links = document.createElement('div');
    links.className = 'contact-links';
    contactData.contacts.forEach(c => {
      const a = document.createElement('a');
      a.href = c.url;
      a.className = 'icon-link';
      if (!c.url.startsWith('mailto:')) a.target = '_blank';
      a.textContent = c.label;
      links.appendChild(a);
    });
    section.appendChild(links);
  });

// --- Hero Socials ---
fetch('data/contact.json')
  .then(res => res.json())
  .then(contactData => {
    const socials = document.querySelector('.hero-socials');
    const iconSvgs = {
      email: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>`,
      linkedin: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><rect x="2" y="2" width="20" height="20" rx="5"/><line x1="16" y1="8" x2="16" y2="16"/><line x1="12" y1="12" x2="12" y2="16"/><circle cx="12" cy="9" r="1"/><line x1="8" y1="8" x2="8" y2="16"/></svg>`,
      github: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"/></svg>`
    };
    contactData.contacts.forEach(c => {
      if (!c.icon || !iconSvgs[c.icon]) return;
      const a = document.createElement('a');
      a.href = c.url;
      a.className = 'icon-link';
      a.setAttribute('aria-label', c.label);
      if (!c.url.startsWith('mailto:')) a.target = '_blank';
      a.innerHTML = iconSvgs[c.icon];
      socials.appendChild(a);
    });
  });

// --- Modal logic (unchanged) ---
function attachModalHandlers() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  document.querySelectorAll('.timeline-item.expandable .exp-summary').forEach(header => {
    header.onclick = function(e) {
      if (e.target.closest('a')) return;
      const timelineContent = this.closest('.timeline-content');
      if (!timelineContent) return;
      const details = timelineContent.querySelector('.expand-details');
      if (!details) return;
      modalBody.innerHTML = details.innerHTML;
      modalOverlay.style.display = 'flex';
    };
  });
  document.querySelector('.modal-close').onclick = function() {
    modalOverlay.style.display = 'none';
    modalBody.innerHTML = '';
  };
  modalOverlay.onclick = function(e) {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = 'none';
      modalBody.innerHTML = '';
    }
  };
}

// --- Home hero fade on scroll (unchanged) ---
const homeHero = document.getElementById('home-hero');
const mainContent = document.getElementById('main-content');
function handleHomeFade() {
  const scrollY = window.scrollY;
  const fadeStart = 0;
  const fadeEnd = window.innerHeight * 0.7;
  let opacity = 1 - Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);
  homeHero.style.opacity = opacity;
  mainContent.style.opacity = 1 - opacity;
  if (opacity <= 0.01) {
    homeHero.style.pointerEvents = 'none';
    mainContent.style.pointerEvents = 'auto';
  } else {
    homeHero.style.pointerEvents = 'auto';
    mainContent.style.pointerEvents = 'none';
  }
}
window.addEventListener('scroll', handleHomeFade);
window.addEventListener('resize', handleHomeFade);
window.addEventListener('DOMContentLoaded', handleHomeFade);

// --- About Me ---
fetch('data/about.json')
  .then(res => res.json())
  .then(about => {
    const aboutDiv = document.getElementById('about');
    const heading = document.createElement('h2');
    heading.textContent = 'About Me';
    aboutDiv.appendChild(heading);
    const intro = document.createElement('p');
    intro.textContent = about.intro;
    aboutDiv.appendChild(intro);
    const desc = document.createElement('p');
    desc.textContent = about.description;
    aboutDiv.appendChild(desc);
    const skills = document.createElement('div');
    skills.className = 'skills-badges';
    about.skills.forEach(skill => {
      const span = document.createElement('span');
      span.textContent = skill;
      skills.appendChild(span);
    });
    aboutDiv.appendChild(skills);
  }); 