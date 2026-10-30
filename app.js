/**
 * AVINYA '27 - CORE APPLICATION CONTROLLER
 * -------------------------------------------------------------
 * Apple-style GSAP scroll animations, Canvas particle ecosystem,
 * Dynamic Log Pose navigation, Page Cinema Transitions, and Event Dossiers.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Page Entry Curtain Fade-In
  const curtain = document.getElementById('page-curtain');
  if (curtain) {
    setTimeout(() => {
      curtain.classList.remove('is-active');
    }, 100);
  }

  // Lucide Icons initialization
  if (window.lucide) {
    lucide.createIcons();
  }

  // Initialize Page Cinema Transitions for smooth Apple routing
  initPageCinemaTransitions();

  // Initialize Components
  initCountdown();
  renderAllEvents();
  renderHackathonSection();
  renderMasterSchedule('all');
  initScheduleTabs();
  renderFaqs();
  initAmbientCanvas();
  initAppleScrollTriggers();
  initDevToolsPoneglyph();
});

/* ==========================================================================
   1. CINEMA WIPE PAGE TRANSITION (APPLE-STYLE NAVIGATION)
   ========================================================================== */

function initPageCinemaTransitions() {
  const curtain = document.getElementById('page-curtain');
  if (!curtain) return;

  const links = document.querySelectorAll('a[href$=".html"], a[href^="/day"], a[href^="/hack"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetUrl = link.getAttribute('href');
      // If same-page anchor, skip
      if (targetUrl.startsWith('#') || link.target === '_blank') return;

      e.preventDefault();
      curtain.classList.add('is-active');
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 250);
    });
  });
}

/* ==========================================================================
   2. DYNAMIC RENDERING (DATA -> UI)
   ========================================================================== */

function renderAllEvents() {
  const data = window.AVINYA_DATA;
  if (!data || !data.islands) return;

  data.islands.forEach(island => {
    const container = document.getElementById(`${island.id}-events-grid`);
    if (!container) return;

    container.innerHTML = island.events.map(event => {
      // Check if this is an "Uncharted Open Slot"
      if (event.isSlot) {
        return `
          <div class="apple-reveal rounded-2xl uncharted-slot-card p-6 flex flex-col justify-between group cursor-pointer" onclick="window.openEventModal('${event.id}')">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-white/10 text-amber-400 border border-white/10">
                  RESERVED SLOT
                </span>
                <i data-lucide="plus-circle" class="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:rotate-90 transition-all"></i>
              </div>
              <h4 class="font-display font-bold text-lg text-white mb-1 group-hover:text-amber-400 transition-colors">
                ${event.title}
              </h4>
              <p class="text-xs text-slate-400 font-mono mb-3">
                ${event.club}
              </p>
              <p class="text-xs text-slate-300 font-body line-clamp-3 leading-relaxed">
                ${event.summary}
              </p>
            </div>

            <div class="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
              <span class="text-slate-400">${event.time}</span>
              <span class="text-amber-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Claim Slot &rarr;
              </span>
            </div>
          </div>
        `;
      }

      // Standard Event Card
      return `
        <div class="apple-reveal rounded-2xl glass-panel border border-white/10 overflow-hidden border-beam-card flex flex-col group cursor-pointer" onclick="window.openEventModal('${event.id}')">
          
          <!-- Card Image Header -->
          <div class="relative aspect-video overflow-hidden">
            <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0C0E16] via-transparent to-transparent"></div>
            
            <div class="absolute top-3 left-3">
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md">
                ${event.category}
              </span>
            </div>

            <div class="absolute bottom-2 right-3">
              <span class="bounty-tag text-[11px] shadow-lg">
                ${event.bounty}
              </span>
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
                ${event.club || 'IIIT Dharwad'}
              </div>
              <h4 class="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                ${event.title}
              </h4>
              <p class="text-xs text-slate-300 font-body line-clamp-2 mb-4 leading-relaxed">
                ${event.summary}
              </p>
            </div>

            <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span class="flex items-center gap-1.5">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i>
                ${event.time.split('-')[0].trim()}
              </span>
              <span class="text-amber-400 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                View Dossier &rarr;
              </span>
            </div>
          </div>

        </div>
      `;
    }).join('');
  });

  if (window.lucide) lucide.createIcons();
}

function renderHackathonSection() {
  const data = window.AVINYA_DATA;
  if (!data || !data.hack2future) return;
  const h2f = data.hack2future;

  // Render Tracks
  const tracksContainer = document.getElementById('hackathon-tracks-grid');
  if (tracksContainer) {
    tracksContainer.innerHTML = h2f.tracks.map(track => `
      <div class="apple-reveal p-6 rounded-2xl glass-panel border border-sky-500/20 border-beam-card flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between gap-2 mb-3">
            <div class="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
              <i data-lucide="${track.icon}" class="w-4 h-4"></i>
            </div>
            <span class="font-mono text-xs font-bold text-sky-400 bg-sky-950/40 px-2.5 py-1 rounded-md border border-sky-500/20">
              ${track.bounty}
            </span>
          </div>
          <h4 class="font-display font-bold text-base text-white mb-1.5">
            ${track.name}
          </h4>
          <p class="text-xs text-slate-300 font-body leading-relaxed">
            ${track.description}
          </p>
        </div>
      </div>
    `).join('');
  }

  // Render Timeline
  const timelineContainer = document.getElementById('hackathon-timeline-list');
  if (timelineContainer) {
    timelineContainer.innerHTML = h2f.timeline.map((step, idx) => `
      <div class="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
        <div class="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300 font-mono text-xs font-bold shrink-0 mt-0.5">
          ${idx + 1}
        </div>
        <div class="flex-1">
          <div class="flex items-center justify-between">
            <h5 class="text-sm font-semibold text-white font-display">${step.title}</h5>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">${step.status}</span>
          </div>
          <p class="text-xs text-slate-400 font-mono mt-0.5">${step.date}</p>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) lucide.createIcons();
}

function renderMasterSchedule(filter) {
  const data = window.AVINYA_DATA;
  const container = document.getElementById('master-schedule-list');
  if (!data || !container) return;

  let allEvents = [];

  data.islands.forEach(island => {
    island.events.forEach(e => {
      allEvents.push({
        ...e,
        dayId: island.id,
        dayLabel: island.dayNumber,
        islandName: island.name,
        color: island.accentColor
      });
    });
  });

  const filtered = (filter === 'all')
    ? allEvents
    : allEvents.filter(e => e.dayId === filter);

  container.innerHTML = filtered.map(item => `
    <div class="apple-reveal p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-all cursor-pointer" onclick="window.openEventModal('${item.id}')">
      <div class="flex items-start sm:items-center gap-4">
        <div class="px-3 py-1.5 rounded-xl font-mono text-xs font-bold text-black shrink-0" style="background-color: ${item.color};">
          ${item.dayLabel}
        </div>
        <div>
          <div class="text-[10px] font-mono uppercase text-slate-400">${item.club || 'IIIT Dharwad'}</div>
          <h4 class="font-display font-bold text-base text-white hover:text-amber-400 transition-colors">
            ${item.title}
          </h4>
          <div class="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 mt-1">
            <span>${item.islandName}</span>
            <span>•</span>
            <span class="text-slate-300 font-semibold">${item.venue}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
        <span class="text-xs font-mono text-slate-300 flex items-center gap-1.5">
          <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i>
          ${item.time}
        </span>
        <span class="bounty-tag text-xs">${item.bounty}</span>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

function initScheduleTabs() {
  const buttons = document.querySelectorAll('.schedule-tab-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('active', 'bg-amber-500', 'text-black', 'shadow-lg');
        b.classList.add('bg-white/5', 'text-slate-300');
      });
      btn.classList.add('active', 'bg-amber-500', 'text-black', 'shadow-lg');
      btn.classList.remove('bg-white/5', 'text-slate-300');

      const filter = btn.getAttribute('data-filter');
      renderMasterSchedule(filter);
    });
  });
}

function renderFaqs() {
  const data = window.AVINYA_DATA;
  const container = document.getElementById('faqs-accordion');
  if (!data || !data.faqs || !container) return;

  container.innerHTML = data.faqs.map((faq, idx) => `
    <div class="apple-reveal p-5 rounded-2xl glass-panel border border-white/10 transition-all">
      <button class="w-full flex items-center justify-between gap-4 text-left font-display font-bold text-base text-white hover:text-amber-400 transition-colors" onclick="window.toggleFaq(${idx})">
        <span>${faq.q}</span>
        <i data-lucide="chevron-down" id="faq-icon-${idx}" class="w-4 h-4 text-slate-400 transition-transform duration-300"></i>
      </button>
      <div id="faq-ans-${idx}" class="hidden pt-3 mt-3 border-t border-white/10 text-sm text-slate-300 font-body leading-relaxed">
        ${faq.a}
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

window.toggleFaq = function(idx) {
  const ans = document.getElementById(`faq-ans-${idx}`);
  const icon = document.getElementById(`faq-icon-${idx}`);
  if (!ans || !icon) return;

  const isHidden = ans.classList.contains('hidden');
  ans.classList.toggle('hidden', !isHidden);
  icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
};

/* ==========================================================================
   3. EVENT DOSSIER MODAL LOGIC (DEEP PROTOCOL SLOTS)
   ========================================================================== */

window.openEventModal = function(eventId) {
  const data = window.AVINYA_DATA;
  let targetEvent = null;

  for (const island of data.islands) {
    const found = island.events.find(e => e.id === eventId);
    if (found) {
      targetEvent = found;
      break;
    }
  }

  if (!targetEvent) return;

  document.getElementById('modal-category').innerText = `${targetEvent.club || 'IIIT Dharwad'} // ${targetEvent.category}`;
  document.getElementById('modal-title').innerText = targetEvent.title;
  document.getElementById('modal-image').src = targetEvent.image;
  document.getElementById('modal-time').innerText = targetEvent.time;
  document.getElementById('modal-venue').innerText = targetEvent.venue;
  document.getElementById('modal-bounty').innerText = `${targetEvent.bounty} (${targetEvent.berries})`;
  document.getElementById('modal-summary').innerText = targetEvent.summary;

  // Rounds
  const roundsContainer = document.getElementById('modal-rounds');
  if (roundsContainer && targetEvent.rounds) {
    roundsContainer.innerHTML = targetEvent.rounds.map(rd => `<li>${rd}</li>`).join('');
  }

  // Rules
  const rulesList = document.getElementById('modal-rules');
  if (rulesList && targetEvent.rules) {
    rulesList.innerHTML = targetEvent.rules.map(r => `<li>${r}</li>`).join('');
  }

  // Coordinator Contact
  const coordEl = document.getElementById('modal-coordinator');
  if (coordEl) {
    coordEl.innerText = targetEvent.coordinator || "Avinya Core Secretariat (avinya@iiitdwd.ac.in)";
  }

  document.getElementById('event-modal-backdrop').classList.add('is-open');
  document.body.style.overflow = 'hidden';
};

window.closeEventModal = function() {
  document.getElementById('event-modal-backdrop').classList.remove('is-open');
  document.body.style.overflow = '';
};

/* ==========================================================================
   4. APPLE-STYLE GSAP SCROLLTRIGGERS & LOG POSE SYNC
   ========================================================================== */

function initAppleScrollTriggers() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  // Reveal animations for all .apple-reveal elements
  const revealElements = document.querySelectorAll('.apple-reveal');
  revealElements.forEach(el => {
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      onEnter: () => el.classList.add('is-visible'),
      once: true
    });
  });

  // Dynamic Theme & Log Pose Needle Transitions for each Island
  const islands = [
    { id: 'day1', accent: '#F59E0B', glow: 'rgba(245, 158, 11, 0.35)', dialId: 'dial-day1', angle: 45, particleMode: 'dune' },
    { id: 'day2', accent: '#EC4899', glow: 'rgba(236, 72, 153, 0.35)', dialId: 'dial-day2', angle: -60, particleMode: 'synthwave' },
    { id: 'day3', accent: '#EAB308', glow: 'rgba(234, 179, 8, 0.35)', dialId: 'dial-day3', angle: 90, particleMode: 'carnival' },
    { id: 'hack2future', accent: '#38BDF8', glow: 'rgba(56, 189, 248, 0.35)', dialId: null, angle: 0, particleMode: 'space' }
  ];

  islands.forEach(island => {
    const section = document.getElementById(island.id);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => activateIsland(island),
      onEnterBack: () => activateIsland(island)
    });
  });
}

function activateIsland(island) {
  document.documentElement.style.setProperty('--current-accent', island.accent);
  document.documentElement.style.setProperty('--current-glow', island.glow);

  // Update Log Pose Active State
  document.querySelectorAll('.dial-sphere').forEach(d => d.classList.remove('is-active'));
  if (island.dialId) {
    const activeDial = document.getElementById(island.dialId);
    if (activeDial) {
      activeDial.classList.add('is-active');
      const needle = activeDial.querySelector('.dial-needle');
      if (needle) {
        needle.style.setProperty('--angle', `${island.angle}deg`);
      }
    }
  }

  // Switch particle canvas mode
  if (window.setParticleMode) {
    window.setParticleMode(island.particleMode);
  }
}

/* ==========================================================================
   5. INTERACTIVE AMBIENT CANVAS PARTICLE ENGINE
   ========================================================================== */

function initAmbientCanvas() {
  const canvas = document.getElementById('ambient-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let currentMode = 'harbor';
  window.setParticleMode = (mode) => { currentMode = mode; };

  const particleCount = window.innerWidth < 768 ? 35 : 70;
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 1,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      if (currentMode === 'dune') {
        p.vx = 1.2 + Math.random() * 0.5;
        p.vy = (Math.random() - 0.5) * 0.4;
        ctx.fillStyle = `rgba(245, 158, 11, ${p.alpha * 0.8})`;
      } else if (currentMode === 'synthwave') {
        p.vx = (Math.random() - 0.5) * 0.3;
        p.vy = -1.5 - Math.random() * 0.5;
        ctx.fillStyle = `rgba(236, 72, 153, ${p.alpha * 0.9})`;
      } else if (currentMode === 'carnival') {
        p.vx = (Math.random() - 0.5) * 0.6;
        p.vy = -0.8 - Math.random() * 0.4;
        ctx.fillStyle = `rgba(250, 204, 21, ${p.alpha * 0.9})`;
      } else if (currentMode === 'space') {
        p.vx = (Math.random() - 0.5) * 0.2;
        p.vy = (Math.random() - 0.5) * 0.2;
        ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.9})`;
      } else {
        p.vx = (Math.random() - 0.5) * 0.4;
        p.vy = (Math.random() - 0.5) * 0.4;
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   6. COUNTDOWN TIMER ENGINE
   ========================================================================== */

function initCountdown() {
  const targetDate = new Date('2027-03-12T09:00:00+05:30').getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      const grid = document.getElementById('countdown-grid');
      if (grid) {
        grid.innerHTML = `
          <div class="col-span-4 py-3 text-center text-amber-400 font-mono font-bold text-lg">
            EXPEDITION VOYAGE IS CURRENTLY LIVE!
          </div>
        `;
      }
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const dEl = document.getElementById('cd-days');
    const hEl = document.getElementById('cd-hours');
    const mEl = document.getElementById('cd-minutes');
    const sEl = document.getElementById('cd-seconds');

    if (dEl) dEl.innerText = String(days).padStart(2, '0');
    if (hEl) hEl.innerText = String(hours).padStart(2, '0');
    if (mEl) mEl.innerText = String(minutes).padStart(2, '0');
    if (sEl) sEl.innerText = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   7. SECRET PONEGLYPH EASTER EGG (F12 DEVTOOLS CONSOLE)
   ========================================================================== */

function initDevToolsPoneglyph() {
  const poneglyphArt = `
%c
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │     █████╗ ██╗   ██╗██╗███╗   ██╗██╗   ██╗ █████╗            │
  │    ██╔══██╗██║   ██║██║████╗  ██║╚██╗ ██╔╝██╔══██╗           │
  │    ███████║██║   ██║██║██╔██╗ ██║ ╚████╔╝ ███████║           │
  │    ██╔══██║╚██╗ ██╔╝██║██║╚██╗██║  ╚██╔╝  ██╔══██║           │
  │    ██║  ██║ ╚████╔╝ ██║██║ ╚████║   ██║   ██║  ██║ '27        │
  │    ╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝           │
  │                                                              │
  │  [ ANCIENT CIPHER DETECTED // GRAND ARCHIPELAGO OF DHARWAD ] │
  │  "The Log Pose points forward across the 3 uncharted waters.  │
  │   Those who build with the Will of Innovation shall reach    │
  │   the Cosmic Frontier of Hack2Future."                       │
  │                                                              │
  │  📍 Coordinates: IIIT Dharwad (15.4288° N, 75.0560° E)       │
  │  ⚔️ Flagship Bounty: ₹1,50,000+ (฿ 150,000,000 Berries)      │
  │  🚀 Hack2Future: https://hack2future.iiitdwd.ac.in/          │
  └──────────────────────────────────────────────────────────────┘
  `;

  console.log(
    poneglyphArt,
    'color: #F59E0B; font-family: monospace; font-size: 11px; font-weight: bold;'
  );
}
