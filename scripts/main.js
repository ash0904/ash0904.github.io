// Utility function to handle fetch errors
async function fetchWithErrorHandling(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return null;
  }
}

// Utility function to remove loading spinner
function removeLoadingSpinner(elementId) {
  const element = document.getElementById(elementId);
  const spinner = element?.querySelector('.loading-spinner');
  if (spinner) {
    spinner.remove();
  }
}

// --- Projects ---
fetchWithErrorHandling('data/projects.json')
  .then(projects => {
    if (!projects) {
      document.getElementById('projects').innerHTML = '<p class="error-message">Failed to load projects. Please try again later.</p>';
      return;
    }
    const grid = document.createElement('div');
    grid.className = 'project-grid';
    projects.forEach(p => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-tech">${p.tech}</div>
        ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ''}
      `;
      grid.appendChild(card);
    });
    removeLoadingSpinner('projects');
    document.getElementById('projects').appendChild(grid);
  });

// --- Experience ---
fetchWithErrorHandling('data/experience.json')
  .then(experiences => {
    if (!experiences) {
      document.getElementById('experience').innerHTML = '<p class="error-message">Failed to load experience. Please try again later.</p>';
      return;
    }
    const timeline = document.createElement('div');
    timeline.className = 'timeline';
    experiences.forEach((exp, idx) => {
      const item = document.createElement('div');
      item.className = 'timeline-item expandable';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="exp-summary">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;width:100%;">
              <h3 style="margin:0;">${exp.organization}</h3>
              <span class="exp-location" style="text-align:right;">${exp.location}</span>
            </div>
            <div class="exp-meta" style="display:flex;justify-content:space-between;align-items:flex-start;width:100%;margin-top:0.1em;">
              <div style="flex:1 1 0;text-align:left;">
                <span class="exp-role">${exp.role}</span>
              </div>
              <div class="exp-meta-right" style="display:flex;flex-direction:column;align-items:flex-end;text-align:right;">
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
    removeLoadingSpinner('experience');
    document.getElementById('experience').appendChild(timeline);
    attachModalHandlers();
  });

// --- Education ---
fetchWithErrorHandling('data/education.json')
  .then(education => {
    if (!education) {
      document.getElementById('education').innerHTML = '<p class="error-message">Failed to load education. Please try again later.</p>';
      return;
    }
    const timeline = document.createElement('div');
    timeline.className = 'timeline';
    education.forEach((edu, idx) => {
      const item = document.createElement('div');
      item.className = 'timeline-item expandable';
      item.innerHTML = `
        <div class="timeline-dot"></div>
        <div class="timeline-content">
          <div class="exp-summary">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;width:100%;">
              <div style="display:flex;flex-direction:column;">
                <h3 style="margin:0;">${edu.institution}</h3>
                <span class="exp-role">${edu.degree}</span>
              </div>
              <span class="exp-meta-right" style="display:flex;flex-direction:column;align-items:flex-end;text-align:right;">
                <span class="exp-location">${edu.location}</span>
                <span class="exp-date">${edu.date}</span>
              </span>
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
    removeLoadingSpinner('education');
    document.getElementById('education').appendChild(timeline);
    attachModalHandlers();
  });

// --- Contact ---
fetchWithErrorHandling('data/contact.json')
  .then(contactData => {
    if (!contactData) {
      document.getElementById('contact').innerHTML = '<p class="error-message">Failed to load contact information. Please try again later.</p>';
      return;
    }
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
    removeLoadingSpinner('contact');
    section.appendChild(links);
  });

// --- Hero Socials ---
fetchWithErrorHandling('data/contact.json')
  .then(contactData => {
    if (!contactData) return;
    const socials = document.querySelector('.hero-socials');
    const iconSvgs = {
      email: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><rect x="3" y="5" width="18" height="14" rx="2"/><polyline points="3 7 12 13 21 7"/></svg>`,
      linkedin: `<svg class="icon" viewBox="0 0 24 24" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="24" rx="4" fill="#0A66C2"/><path d="M6.94 8.5A1.06 1.06 0 1 1 6.94 6.38a1.06 1.06 0 0 1 0 2.12ZM5.5 9.75h2.88V18H5.5V9.75ZM10.25 9.75h2.76v1.12h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.4 1.89 3.4 4.34V18h-2.88v-3.75c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.97V18h-2.88V9.75Z" fill="#fff"/><g class="linkedin-in-light"><rect width="24" height="24" rx="4" fill="#fff"/><path d="M6.94 8.5A1.06 1.06 0 1 1 6.94 6.38a1.06 1.06 0 0 1 0 2.12ZM5.5 9.75h2.88V18H5.5V9.75ZM10.25 9.75h2.76v1.12h.04c.38-.72 1.3-1.48 2.68-1.48 2.87 0 3.4 1.89 3.4 4.34V18h-2.88v-3.75c0-.89-.02-2.03-1.24-2.03-1.24 0-1.43.97-1.43 1.97V18h-2.88V9.75Z" fill="#0A66C2"/></g></svg>`,
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

// --- Modal logic ---
function attachModalHandlers() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalBody = document.getElementById('modal-body');
  const modalTitle = document.createElement('h3');
  modalTitle.id = 'modal-title';
  modalBody.parentElement.insertBefore(modalTitle, modalBody);

  let modalScrollStart = null;
  let scrollListener = null;

  function closeModal() {
    modalOverlay.style.display = 'none';
    modalBody.innerHTML = '';
    modalTitle.textContent = '';
    if (scrollListener) window.removeEventListener('scroll', scrollListener);
    document.removeEventListener('keydown', escListener);
    modalScrollStart = null;
    scrollListener = null;
  }

  function escListener(e) {
    if (modalOverlay.style.display === 'flex' && e.key === 'Escape') closeModal();
  }

  document.querySelectorAll('.timeline-item.expandable .exp-summary').forEach(header => {
    header.onclick = function(e) {
      if (e.target.closest('a')) return;
      const timelineContent = this.closest('.timeline-content');
      if (!timelineContent) return;
      const details = timelineContent.querySelector('.expand-details');
      if (!details) return;
      const title = timelineContent.querySelector('h3').textContent;
      modalTitle.textContent = title;
      modalBody.innerHTML = details.innerHTML;
      modalOverlay.style.display = 'flex';
      modalOverlay.focus();
      // Set up scroll-to-close
      modalScrollStart = window.scrollY;
      scrollListener = function() {
        if (modalScrollStart !== null && Math.abs(window.scrollY - modalScrollStart) > window.innerHeight * 0.25) {
          closeModal();
        }
      };
      window.addEventListener('scroll', scrollListener);
      // Set up Escape-to-close
      document.addEventListener('keydown', escListener);
    };
  });

  document.querySelector('.modal-close').onclick = closeModal;
  modalOverlay.onclick = function(e) {
    if (e.target === modalOverlay) closeModal();
  };
}

// --- Home hero fade on scroll ---
const homeHero = document.getElementById('home-hero');
const mainContent = document.getElementById('main-content');

function handleHomeFade() {
  const scrollY = window.scrollY;
  const fadeStart = 0;
  const fadeEnd = window.innerHeight * 0.7;
  let opacity = 1 - Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1);
  homeHero.style.opacity = opacity;
  mainContent.style.opacity = 1;
  homeHero.style.pointerEvents = 'auto';
  mainContent.style.pointerEvents = 'auto';
}

window.addEventListener('scroll', handleHomeFade);
window.addEventListener('resize', handleHomeFade);
window.addEventListener('DOMContentLoaded', handleHomeFade);

// --- Skills ---
fetchWithErrorHandling('data/skills.json')
  .then(skillsArr => {
    if (!skillsArr) {
      document.getElementById('skills').innerHTML = '<p class="error-message">Failed to load skills. Please try again later.</p>';
      return;
    }
    const skillsDiv = document.getElementById('skills');
    const badges = document.createElement('div');
    badges.className = 'skills-badges';
    skillsArr.forEach(skill => {
      const span = document.createElement('span');
      span.textContent = skill;
      badges.appendChild(span);
    });
    removeLoadingSpinner('skills');
    skillsDiv.appendChild(badges);
  });

// --- About Me ---
fetchWithErrorHandling('data/about.json')
  .then(about => {
    if (!about) {
      document.getElementById('about').innerHTML = '<p class="error-message">Failed to load about information. Please try again later.</p>';
      return;
    }
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
    removeLoadingSpinner('about');
  });

// --- Hamburger/Drawer Navigation ---
const menuToggle = document.getElementById('menu-toggle');
const navDrawer = document.getElementById('nav-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const drawerClose = document.getElementById('drawer-close');

function openDrawer() {
  navDrawer.classList.add('open');
  drawerOverlay.classList.add('open');
  navDrawer.focus();
  // document.body.style.overflow = 'hidden'; // Allow scrolling
}
function closeDrawer() {
  navDrawer.classList.remove('open');
  drawerOverlay.classList.remove('open');
  // document.body.style.overflow = ''; // Allow scrolling
}
menuToggle.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', (e) => {
  if (navDrawer.classList.contains('open') && (e.key === 'Escape' || e.key === 'Esc')) {
    closeDrawer();
  }
});
// Trap focus in drawer
navDrawer.addEventListener('keydown', function(e) {
  if (e.key !== 'Tab') return;
  const focusable = navDrawer.querySelectorAll('a,button');
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) {
    last.focus();
    e.preventDefault();
  } else if (!e.shiftKey && document.activeElement === last) {
    first.focus();
    e.preventDefault();
  }
}); 