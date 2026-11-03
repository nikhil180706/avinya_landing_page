/**
 * AVINYA '27 - ROBUST CORE APPLICATION CONTROLLER
 * -------------------------------------------------------------
 * Safe initialization with fallback rendering to ensure zero blank pages.
 */

function initApp() {
  const curtain = document.getElementById('page-curtain');
  if (curtain) {
    curtain.style.display = 'none';
  }

  // Ensure all reveal elements are fully visible immediately
  const revealElements = document.querySelectorAll('.apple-reveal');
  revealElements.forEach(el => el.classList.add('is-visible'));

  // Safe Component Initializations
  try { if (window.lucide) lucide.createIcons(); } catch(e) { console.warn('Lucide error', e); }
  try { initCustomCursor(); } catch(e) { console.warn('Cursor error', e); }
    try { initLivingSea(); } catch(e) { console.warn('Living Sea error', e); }
  try { initTimeOfDayPicker(); } catch(e) { console.warn('Time of Day error', e); }
  try { initWeatherWidget(); } catch(e) { console.warn('Weather error', e); }
  try { initAdaptiveSoundscape(); } catch(e) { console.warn('Audio error', e); }
  try { initHolographicPass(); } catch(e) { console.warn('Pass error', e); }
  try { loadCustomFestOverrides(); } catch(e) { console.warn('Overrides error', e); }
  try { renderDynamicIslandPins(); } catch(e) { console.warn('Dynamic pins error', e); }
  try { initDevStudio(); } catch(e) { console.warn('Dev studio error', e); }
  try { renderAllEvents(); } catch(e) { console.warn('Events render error', e); }
  try { renderChampionsAndRegulations(); } catch(e) { console.warn('Champions render error', e); }
  try { renderCampusTransit(); } catch(e) { console.warn('Transit render error', e); }
  try { renderHackathonSection(); } catch(e) { console.warn('Hackathon render error', e); }
  try { renderMasterSchedule('all'); } catch(e) { console.warn('Schedule render error', e); }
  try { initScheduleTabs(); } catch(e) { console.warn('Tabs error', e); }
  try { renderFaqs(); } catch(e) { console.warn('FAQs error', e); }
  try { initCountdown(); } catch(e) { console.warn('Countdown error', e); }
  try { initAmbientCanvas(); } catch(e) { console.warn('Canvas error', e); }
  try { initAppleScrollTriggers(); } catch(e) { console.warn('GSAP error', e); }
  try { initArchipelagoShip(); } catch(e) { console.warn('Ship error', e); }
  try { initIslandAtollCardsTilt(); } catch(e) { console.warn('Tilt error', e); }
  try { initDevToolsPoneglyph(); } catch(e) { console.warn('Poneglyph error', e); }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

/* ==========================================================================
   SMOOTH ZERO-LAG ARCHIPELAGO SHIP CONTROLLER (rAF LERP + PRECOMPUTED SPLINE)
   ========================================================================== */
function initArchipelagoShip() {
  const ship = document.getElementById('interactive-ship');
  const path = document.getElementById('voyage-curved-track');
  const section = document.getElementById('voyage-map');
  if (!ship || !path || !section) return;

  // Pre-sample spline coordinates to eliminate layout thrashing & getPointAtLength reflows during scroll
  const SAMPLES = 120;
  let splineSamples = [];
  let pathLen = 1800;

  function cacheSpline() {
    try {
      pathLen = path.getTotalLength ? path.getTotalLength() : 1800;
      splineSamples = [];
      for (let i = 0; i <= SAMPLES; i++) {
        const len = (i / SAMPLES) * pathLen;
        const pt = path.getPointAtLength(len);
        const nextLen = Math.min(pathLen, len + 6);
        const nextPt = path.getPointAtLength(nextLen);
        const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);
        splineSamples.push({
          xPct: (pt.x / 1200) * 100,
          yPct: (pt.y / 2400) * 100,
          angle: angle - 90
        });
      }
    } catch (e) {
      console.warn('SVG Spline caching fallback', e);
    }
  }

  cacheSpline();
  window.addEventListener('resize', cacheSpline, { passive: true });

  let targetProgress = 0;
  let currentProgress = 0;
  let isTicking = false;
  let cachedRect = { top: 0, height: 2400 };

  function measureSection() {
    if (!section) return;
    const box = section.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    cachedRect.top = box.top + scrollTop;
    cachedRect.height = box.height;
  }

  measureSection();
  window.addEventListener('resize', measureSection, { passive: true });

  function onScrollPassive() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowH = window.innerHeight;
    const startY = cachedRect.top - windowH * 0.7;
    const totalDist = cachedRect.height + windowH * 0.4;
    
    let p = (scrollY - startY) / totalDist;
    targetProgress = Math.max(0, Math.min(1, p));

    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateShipLoop);
    }
  }

  function updateShipLoop() {
    // Smooth lerp (linear interpolation) for buttery 60/120fps motion
    currentProgress += (targetProgress - currentProgress) * 0.085;

    if (splineSamples.length > 0) {
      const idxFloat = currentProgress * (splineSamples.length - 1);
      const idxBase = Math.floor(idxFloat);
      const idxNext = Math.min(splineSamples.length - 1, idxBase + 1);
      const fraction = idxFloat - idxBase;

      const p1 = splineSamples[idxBase];
      const p2 = splineSamples[idxNext];

      const x = p1.xPct + (p2.xPct - p1.xPct) * fraction;
      const y = p1.yPct + (p2.yPct - p1.yPct) * fraction;
      const angle = p1.angle + (p2.angle - p1.angle) * fraction;

      ship.style.left = `${x}%`;
      ship.style.top = `${y}%`;
      ship.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
    }

    // Continue loop if still interpolating
    if (Math.abs(targetProgress - currentProgress) > 0.0005) {
      requestAnimationFrame(updateShipLoop);
    } else {
      isTicking = false;
    }
  }

  window.addEventListener('scroll', onScrollPassive, { passive: true });
  // Initial frame
  onScrollPassive();

  window.sailToIsland = function(dayNum) {
    const targetSection = document.getElementById(`day${dayNum}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };
}

function renderAllEvents() {
  const data = window.AVINYA_DATA;
  if (!data || !data.islands) return;

  data.islands.forEach(island => {
    const container = document.getElementById(`${island.id}-events-grid`);
    if (!container) return;

    container.innerHTML = island.events.map(event => {
      const placeName = event.islandPlace || event.venue;
      const totalBounty = event.prize || event.totalBounty || event.bounty;
      const patron = (event.sponsors && event.sponsors.length > 0) ? event.sponsors[0] : null;

      return `
        <div class="apple-reveal island-location-chip flex flex-col justify-between group cursor-pointer" onclick="window.openEventDossier('${event.id}')">
          <div>
            <div class="flex items-center justify-between text-[10px] font-mono mb-2">
              <span class="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-white">
                <i data-lucide="map-pin" class="w-3 h-3" style="color: ${island.accentColor};"></i>
                <span class="font-bold uppercase tracking-wider">${placeName}</span>
              </span>
              <span class="font-bold text-amber-400 font-mono">${totalBounty}</span>
            </div>

            <h4 class="font-display font-bold text-base text-white mb-1 group-hover:text-amber-400 transition-colors">
              ${event.title}
            </h4>

            <p class="text-xs text-slate-300 font-body line-clamp-2 mb-3 leading-relaxed">
              ${event.tagline || event.summary}
            </p>

            ${patron ? `
              <div class="p-2 rounded-xl bg-white/5 border border-white/5 mb-3 text-[10px] font-mono flex items-center justify-between text-slate-300">
                <span class="text-slate-400">Patron:</span>
                <span class="text-sky-300 font-semibold">${patron.name} (${patron.spending})</span>
              </div>
            ` : ''}
          </div>

          <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span class="flex items-center gap-1">
              <i data-lucide="clock" class="w-3 h-3" style="color: ${island.accentColor};"></i>
              <span>${event.time.split('-')[0].trim()}</span>
            </span>

            <span class="text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Inspect Dossier & QR</span>
              <i data-lucide="arrow-right" class="w-3 h-3"></i>
            </span>
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

  const tracksContainer = document.getElementById('hackathon-tracks-grid');
  if (tracksContainer) {
    tracksContainer.innerHTML = h2f.tracks.map(track => `
      <div class="apple-reveal p-6 rounded-2xl glass-panel border border-sky-500/20 flex flex-col justify-between hover:border-sky-400 transition-all">
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
    <div class="apple-reveal p-4 sm:p-5 rounded-2xl glass-panel border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-all">
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
        <a href="event.html?id=${item.id}" class="bounty-tag text-xs hover:bg-amber-400 hover:text-black transition-colors">
          ${item.totalBounty || item.bounty} &rarr;
        </a>
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

function initAppleScrollTriggers() {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const islands = [
    { id: 'day1', accent: '#F59E0B', glow: 'rgba(245, 158, 11, 0.35)', dialId: 'dial-day1', angle: 25, particleMode: 'dune' },
    { id: 'day2', accent: '#EC4899', glow: 'rgba(236, 72, 153, 0.35)', dialId: 'dial-day2', angle: -45, particleMode: 'synthwave' },
    { id: 'day3', accent: '#EAB308', glow: 'rgba(234, 179, 8, 0.35)', dialId: 'dial-day3', angle: 70, particleMode: 'carnival' },
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

  if (window.setParticleMode) {
    window.setParticleMode(island.particleMode);
  }
  if (window.setWebGLTheme) {
    window.setWebGLTheme(island.accent);
  }
  if (window.setAudioTheme) {
    window.setAudioTheme(island.particleMode);
  }
}

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

  const particleCount = window.innerWidth < 768 ? 30 : 60;
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

/* ==========================================================================
   60 FPS GPU-ACCELERATED LIVING SEA ENGINE (TIME-OF-DAY OCEAN DYNAMICS)
   ========================================================================== */
/* ==========================================================================
   ULTRA-OPTIMIZED LIVING SEA CONTROLLER (GPU HARDWARE CSS SHADERS)
   ========================================================================== */
function initLivingSea() {
  function getAutoTimeMode() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'sunset';
    return 'night';
  }

  let isAuto = true;
  let targetMode = getAutoTimeMode();

  window.setLivingSeaTime = function(mode) {
    if (mode === 'auto') {
      isAuto = true;
      targetMode = getAutoTimeMode();
    } else {
      isAuto = false;
      targetMode = mode;
    }
    document.body.setAttribute('data-time', targetMode);
    
    // Update HUD buttons if present
    document.querySelectorAll('#time-of-day-picker .time-btn').forEach(btn => {
      const bTime = btn.getAttribute('data-time');
      if (bTime === (isAuto ? 'auto' : targetMode)) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  };

  // Set initial time
  window.setLivingSeaTime('auto');

  // Gentle periodic check for auto mode every 5 minutes
  setInterval(() => {
    if (isAuto) {
      const newAuto = getAutoTimeMode();
      if (newAuto !== targetMode) {
        window.setLivingSeaTime('auto');
      }
    }
  }, 300000);
}

/* ==========================================================================
   TIME OF DAY HUD INTERACTIVE PICKER
   ========================================================================== */
function initTimeOfDayPicker() {
  const buttons = document.querySelectorAll('#time-of-day-picker .time-btn');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const mode = btn.getAttribute('data-time');
      if (window.setLivingSeaTime) {
        window.setLivingSeaTime(mode);
      }
    });
  });
}

/* ==========================================================================
   LIVE DHARWAD WEATHER TELEMETRY HUD
   ========================================================================== */
function initWeatherWidget() {
  const tempDesc = document.getElementById('weather-temp-desc');
  const windEl = document.getElementById('weather-wind');
  if (!tempDesc) return;

  tempDesc.textContent = '28°C Clear Skies';
  if (windEl) windEl.textContent = 'Wind: 14 km/h NE';

  fetch('https://api.open-meteo.com/v1/forecast?latitude=15.4288&longitude=75.0560&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m')
    .then(r => r.json())
    .then(data => {
      if (data && data.current) {
        const temp = Math.round(data.current.temperature_2m);
        const wind = Math.round(data.current.wind_speed_10m);
        const code = data.current.weather_code;
        let condition = 'Clear Skies';
        if (code >= 1 && code <= 3) condition = 'Partly Cloudy';
        else if (code >= 45 && code <= 48) condition = 'Misty Winds';
        else if (code >= 51 && code <= 67) condition = 'Gentle Showers';
        else if (code >= 80) condition = 'Oceanic Rain';

        tempDesc.textContent = `${temp}°C ${condition}`;
        if (windEl) windEl.textContent = `Wind: ${wind} km/h NE`;
      }
    })
    .catch(() => {
      // Non-blocking fallback
    });
}

/* ==========================================================================
   EVENT DOSSIER & LOCATION INSPECTOR MODAL CONTROLLER
   ========================================================================== */

/* ==========================================================================
   TWO-STAGE ISLAND ZOOM & SCATTERED EVENT CONTROLLER
   ========================================================================== */

/**
 * Stage 1 Zoom: Click on Island entity -> zooms into island & scatters event pins
 */

/* ==========================================================================
   DYNAMIC FEST EVENT ARCHITECT & LOCALSTORAGE SYNC
   ========================================================================== */

function loadCustomFestOverrides() {
  try {
    const raw = localStorage.getItem('AVINYA_CUSTOM_EVENTS');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.islands && Array.isArray(parsed.islands)) {
        window.AVINYA_DATA = parsed;
        console.log('⚡ Fest Dev Studio: Loaded custom fest events from localStorage');
      }
    }
  } catch (e) {
    console.warn('LocalStorage load error', e);
  }
}

/**
 * Dynamically renders event pins on each island based on window.AVINYA_DATA
 */
function renderDynamicIslandPins() {
  const data = window.AVINYA_DATA;
  if (!data || !data.islands) return;

  const defaultScatter = [
    { x: 28, y: 26 }, { x: 72, y: 24 }, { x: 22, y: 60 },
    { x: 52, y: 48 }, { x: 75, y: 64 }, { x: 48, y: 78 },
    { x: 38, y: 36 }, { x: 64, y: 82 }
  ];

  data.islands.forEach(island => {
    const container = document.getElementById(`island-pins-${island.id}`);
    if (!container) return;

    container.innerHTML = (island.events || []).map((ev, idx) => {
      const pinX = ev.pinX !== undefined ? ev.pinX : (defaultScatter[idx % defaultScatter.length].x);
      const pinY = ev.pinY !== undefined ? ev.pinY : (defaultScatter[idx % defaultScatter.length].y);
      const badgeNum = ev.badgeNum !== undefined ? ev.badgeNum : (idx + 1);
      const shortPlace = ev.shortLabel || ev.islandPlace || ev.venue || `Landmark ${badgeNum}`;
      const bounty = ev.totalBounty || ev.prize || ev.bounty || '';
      const accent = island.accentColor || '#F59E0B';

      return `
        <div class="island-pin-anchor" id="pin-${ev.id}" style="left: ${pinX}%; top: ${pinY}%;"
             onclick="event.stopPropagation(); window.focusEventLocation('${island.id}', '${ev.id}', ${pinX}, ${pinY})"
             title="${ev.title} (${shortPlace})">
          <div class="pin-pulse-ring" style="--realm-accent: ${accent};"></div>
          <div class="island-pin-beacon" style="--realm-accent: ${accent}; --realm-glow: ${accent}80;">
            <div class="pin-icon-badge">${badgeNum}</div>
            <div class="pin-label-pill">
              <span>📍 ${shortPlace}</span>
              ${bounty ? `<span class="pin-bounty-badge">${bounty}</span>` : ''}
            </div>
          </div>
        </div>
      `;
    }).join('');
  
    // Dynamically update HUD badge count
    const hudSpan = document.getElementById(`hud-count-${island.id}`);
    if (hudSpan) {
      const count = (island.events || []).length;
      hudSpan.textContent = `ISLAND VIEW: ${count} Event Location${count === 1 ? '' : 's'} Active`;
    }
});
}

/* ==========================================================================
   DEV STUDIO // DEVELOPER & ORGANIZER EVENT CUSTOMIZER CONTROLLER
   ========================================================================== */

let currentDevDay = 'day1';
let activePickingSession = null;

function initDevStudio() {
  // Keybinding shortcut: Ctrl + Shift + D to toggle Dev Studio
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
      e.preventDefault();
      window.toggleDevStudio();
    }
  });
}

window.toggleDevStudio = function() {
  const modal = document.getElementById('dev-studio-modal');
  const backdrop = document.getElementById('dev-studio-backdrop');
  if (!modal) return;

  const isOpen = modal.classList.contains('is-open');
  if (isOpen) {
    modal.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-open');
  } else {
    modal.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-open');
    window.selectDevDay(currentDevDay);
  }
};

window.selectDevDay = function(dayId) {
  currentDevDay = dayId;
  const tabs = document.querySelectorAll('#dev-studio-day-tabs .dev-day-tab');
  tabs.forEach(tab => {
    if (tab.getAttribute('data-day') === dayId) {
      tab.classList.add('is-active', 'border-amber-500/40', 'text-amber-300', 'bg-amber-500/10');
      tab.classList.remove('border-white/10', 'text-slate-400', 'bg-black/30');
    } else {
      tab.classList.remove('is-active', 'border-amber-500/40', 'text-amber-300', 'bg-amber-500/10');
      tab.classList.add('border-white/10', 'text-slate-400', 'bg-black/30');
    }
  });

  window.renderDevEventsList(dayId);
};

window.renderDevEventsList = function(dayId) {
  const listEl = document.getElementById('dev-studio-events-list');
  if (!listEl) return;

  const data = window.AVINYA_DATA;
  if (!data || !data.islands) return;

  const island = data.islands.find(i => i.id === dayId);
  if (!island) return;

  const events = island.events || [];

  listEl.innerHTML = `
    <!-- Island Theme & Header Bar -->
    <div class="p-4 rounded-2xl bg-black/40 border border-white/10 mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div class="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">${island.dayNumber} REALM SETTINGS</div>
        <h3 class="font-display font-black text-xl text-white">${island.name}</h3>
        <p class="text-xs text-slate-400 font-mono mt-0.5">${island.theme} • Accent: <span style="color: ${island.accentColor}; font-weight: bold;">${island.accentColor}</span></p>
      </div>
      <div class="flex items-center gap-2">
        <button onclick="window.zoomIntoIsland('${island.id}'); window.toggleDevStudio();" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5">
          <i data-lucide="eye" class="w-3.5 h-3.5 text-amber-400"></i>
          <span>Inspect Island Canvas</span>
        </button>
      </div>
    </div>

    <!-- Events List Container -->
    <div class="space-y-4">
      ${events.length === 0 ? `
        <div class="p-8 text-center text-slate-400 font-mono text-xs border border-dashed border-white/10 rounded-2xl">
          No events created for this island yet. Click "＋ Add Event to Day" above to create one.
        </div>
      ` : events.map((ev, idx) => `
        <div class="p-5 rounded-2xl bg-black/60 border border-white/10 hover:border-amber-500/40 transition-all" id="dev-card-${ev.id}">
          <!-- Card Header Summary -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10 mb-4">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 font-mono text-xs font-bold">
                ${ev.badgeNum || (idx + 1)}
              </span>
              <div>
                <h4 class="font-display font-bold text-base text-white">${ev.title}</h4>
                <div class="text-[10px] font-mono text-slate-400 flex items-center gap-2">
                  <span>📍 ${ev.islandPlace || 'Unset Landmark'}</span>
                  <span>•</span>
                  <span class="text-amber-400 font-bold">${ev.totalBounty || ev.prize || 'No Prize Set'}</span>
                  <span>•</span>
                  <span>Coords: (${ev.pinX || 50}%, ${ev.pinY || 50}%)</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="window.pickPinCoordinate('${island.id}', '${ev.id}')" class="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono font-bold flex items-center gap-1.5 transition-all" title="Click on the island SVG to place this pin">
                <i data-lucide="crosshair" class="w-3.5 h-3.5"></i>
                <span>Pick on Island</span>
              </button>
              <button onclick="window.duplicateEvent('${island.id}', '${ev.id}')" class="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all" title="Duplicate Event">
                <i data-lucide="copy" class="w-4 h-4"></i>
              </button>
              <button onclick="window.deleteEvent('${island.id}', '${ev.id}')" class="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all" title="Delete Event">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>

          <!-- Expandable Live Form Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs font-mono">
            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Event Title</label>
              <input type="text" class="dev-input" value="${ev.title || ''}" id="inp-title-${ev.id}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Island Landmark Name</label>
              <input type="text" class="dev-input" value="${ev.islandPlace || ''}" id="inp-place-${ev.id}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Short Pin Label</label>
              <input type="text" class="dev-input" value="${ev.shortLabel || ''}" id="inp-shortLabel-${ev.id}">
            </div>

            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Total Prize Bounty</label>
              <input type="text" class="dev-input" value="${ev.totalBounty || ev.prize || '₹50,000'}" id="inp-bounty-${ev.id}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">1st Place (Gold)</label>
              <input type="text" class="dev-input" value="${ev.podium ? (ev.podium.first || '') : ''}" id="inp-podium1-${ev.id}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">2nd Place (Silver)</label>
              <input type="text" class="dev-input" value="${ev.podium ? (ev.podium.second || '') : ''}" id="inp-podium2-${ev.id}">
            </div>

            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Pin X Coordinate (%)</label>
              <input type="number" min="5" max="95" class="dev-input" value="${ev.pinX !== undefined ? ev.pinX : 50}" id="inp-pinX-${ev.id}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Pin Y Coordinate (%)</label>
              <input type="number" min="5" max="95" class="dev-input" value="${ev.pinY !== undefined ? ev.pinY : 50}" id="inp-pinY-${ev.id}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Time Schedule</label>
              <input type="text" class="dev-input" value="${ev.time || '10:00 AM - 01:00 PM'}" id="inp-time-${ev.id}">
            </div>

            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Category</label>
              <input type="text" class="dev-input" value="${ev.category || 'Technical'}" id="inp-cat-${ev.id}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Host Guild / Club</label>
              <input type="text" class="dev-input" value="${ev.club || 'Avinya Secretariat'}" id="inp-club-${ev.id}">
            </div>
            <div>
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Coordinator Contact</label>
              <input type="text" class="dev-input" value="${ev.coordinator ? (ev.coordinator.contact || '') : ''}" id="inp-coord-${ev.id}">
            </div>

            <div class="sm:col-span-2 md:col-span-3">
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Tagline / Summary</label>
              <input type="text" class="dev-input" value="${ev.tagline || ev.summary || ''}" id="inp-summary-${ev.id}">
            </div>

            <div class="sm:col-span-2 md:col-span-3">
              <label class="block text-[10px] text-slate-400 uppercase mb-1">Rules (One rule per line)</label>
              <textarea rows="2" class="dev-input" id="inp-rules-${ev.id}">${(ev.rules || []).join('\n')}</textarea>
            </div>
          </div>

          <!-- Save Button Bar -->
          <div class="mt-4 pt-3 border-t border-white/10 flex items-center justify-end gap-3">
            <button onclick="window.saveEventFromForm('${island.id}', '${ev.id}')" class="btn-primary text-xs !py-2 !px-5 inline-flex items-center gap-1.5">
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
              <span>Save & Apply Live</span>
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  if (window.lucide) lucide.createIcons();
};

window.saveEventFromForm = function(dayId, eventId) {
  const data = window.AVINYA_DATA;
  if (!data || !data.islands) return;

  const island = data.islands.find(i => i.id === dayId);
  if (!island) return;

  const ev = (island.events || []).find(e => e.id === eventId);
  if (!ev) return;

  // Read fields
  const titleVal = document.getElementById(`inp-title-${eventId}`)?.value;
  const placeVal = document.getElementById(`inp-place-${eventId}`)?.value;
  const shortLabelVal = document.getElementById(`inp-shortLabel-${eventId}`)?.value;
  const bountyVal = document.getElementById(`inp-bounty-${eventId}`)?.value;
  const podium1Val = document.getElementById(`inp-podium1-${eventId}`)?.value;
  const podium2Val = document.getElementById(`inp-podium2-${eventId}`)?.value;
  const pinXVal = parseFloat(document.getElementById(`inp-pinX-${eventId}`)?.value);
  const pinYVal = parseFloat(document.getElementById(`inp-pinY-${eventId}`)?.value);
  const timeVal = document.getElementById(`inp-time-${eventId}`)?.value;
  const catVal = document.getElementById(`inp-cat-${eventId}`)?.value;
  const clubVal = document.getElementById(`inp-club-${eventId}`)?.value;
  const coordVal = document.getElementById(`inp-coord-${eventId}`)?.value;
  const summaryVal = document.getElementById(`inp-summary-${eventId}`)?.value;
  const rulesVal = document.getElementById(`inp-rules-${eventId}`)?.value;

  if (titleVal) ev.title = titleVal;
  if (placeVal) ev.islandPlace = placeVal;
  if (shortLabelVal) ev.shortLabel = shortLabelVal;
  if (bountyVal) {
    ev.totalBounty = bountyVal;
    ev.prize = bountyVal;
  }
  if (!ev.podium) ev.podium = {};
  if (podium1Val) ev.podium.first = podium1Val;
  if (podium2Val) ev.podium.second = podium2Val;
  if (!isNaN(pinXVal)) ev.pinX = Math.round(pinXVal);
  if (!isNaN(pinYVal)) ev.pinY = Math.round(pinYVal);
  if (timeVal) ev.time = timeVal;
  if (catVal) ev.category = catVal;
  if (clubVal) ev.club = clubVal;
  if (coordVal) {
    if (!ev.coordinator) ev.coordinator = { name: "Coordinator" };
    ev.coordinator.contact = coordVal;
  }
  if (summaryVal) {
    ev.summary = summaryVal;
    ev.tagline = summaryVal;
  }
  if (rulesVal) {
    ev.rules = rulesVal.split('\n').map(s => s.trim()).filter(Boolean);
  }

  // Persist to localStorage
  try {
    localStorage.setItem('AVINYA_CUSTOM_EVENTS', JSON.stringify(data));
  } catch (e) {
    console.warn('Storage error', e);
  }

  // Refresh live components
  renderDynamicIslandPins();
  renderAllEvents();
  if (window.renderMasterSchedule) window.renderMasterSchedule('all');

  window.showDevToast(`✓ "${ev.title}" saved & updated on live page!`);
};

window.openAddNewEventForm = function() {
  const data = window.AVINYA_DATA;
  if (!data || !data.islands) return;

  const island = data.islands.find(i => i.id === currentDevDay);
  if (!island) return;

  const nextIdx = (island.events || []).length + 1;
  const newId = `${currentDevDay}-e${Date.now().toString().slice(-4)}`;

  const defaultCoords = [
    { x: 35, y: 35 }, { x: 65, y: 35 }, { x: 35, y: 65 }, { x: 65, y: 65 }, { x: 50, y: 50 }
  ];
  const coord = defaultCoords[nextIdx % defaultCoords.length];

  const newEvent = {
    id: newId,
    title: `New Event ${nextIdx}`,
    islandPlace: `Sector Landmark ${nextIdx}`,
    shortLabel: `Landmark ${nextIdx}`,
    badgeNum: nextIdx,
    pinX: coord.x,
    pinY: coord.y,
    totalBounty: "₹40,000",
    prize: "₹40,000",
    podium: {
      first: "₹20,000 + Gold Medal",
      second: "₹12,000 + Silver Medal",
      third: "₹8,000 + Bronze Medal"
    },
    category: "Technical",
    club: "Avinya Student Guild",
    time: "11:00 AM - 02:00 PM",
    venue: "Main Auditorium / Lab",
    summary: "New flagship challenge added via Fest Dev Studio.",
    rules: [
      "Open to all registered undergraduate student teams",
      "Valid institution ID card mandatory at entry checkpoint"
    ],
    coordinator: {
      name: "Student Lead",
      contact: "+91 98765 00000"
    },
    sponsors: [
      { name: "Industry Partner", tier: "Gold Patron", spending: "₹25,000 Grant", logo: "award" }
    ]
  };

  island.events.push(newEvent);

  try {
    localStorage.setItem('AVINYA_CUSTOM_EVENTS', JSON.stringify(data));
  } catch (e) {
    console.warn('Storage error', e);
  }

  renderDynamicIslandPins();
  renderAllEvents();
  window.renderDevEventsList(currentDevDay);
  window.showDevToast(`＋ Added "${newEvent.title}". Customize details below.`);
};

window.duplicateEvent = function(dayId, eventId) {
  const data = window.AVINYA_DATA;
  const island = data.islands.find(i => i.id === dayId);
  if (!island) return;

  const ev = (island.events || []).find(e => e.id === eventId);
  if (!ev) return;

  const clone = JSON.parse(JSON.stringify(ev));
  clone.id = `${dayId}-e${Date.now().toString().slice(-4)}`;
  clone.title = `${clone.title} (Copy)`;
  clone.badgeNum = island.events.length + 1;
  clone.pinX = Math.min(90, (clone.pinX || 50) + 6);
  clone.pinY = Math.min(90, (clone.pinY || 50) + 6);

  island.events.push(clone);

  try {
    localStorage.setItem('AVINYA_CUSTOM_EVENTS', JSON.stringify(data));
  } catch (e) {}

  renderDynamicIslandPins();
  renderAllEvents();
  window.renderDevEventsList(dayId);
  window.showDevToast(`📋 Duplicated "${clone.title}"`);
};

window.deleteEvent = function(dayId, eventId) {
  const data = window.AVINYA_DATA;
  const island = data.islands.find(i => i.id === dayId);
  if (!island) return;

  const idx = (island.events || []).findIndex(e => e.id === eventId);
  if (idx === -1) return;

  const removed = island.events.splice(idx, 1)[0];

  try {
    localStorage.setItem('AVINYA_CUSTOM_EVENTS', JSON.stringify(data));
  } catch (e) {}

  renderDynamicIslandPins();
  renderAllEvents();
  window.renderDevEventsList(dayId);
  window.showDevToast(`🗑️ Deleted "${removed.title}"`);
};

/**
 * Visual Interactive Pin Coordinate Picker on Island SVG
 */
window.pickPinCoordinate = function(dayId, eventId) {
  const banner = document.getElementById('pin-picker-banner');
  const modal = document.getElementById('dev-studio-modal');
  const backdrop = document.getElementById('dev-studio-backdrop');

  if (modal) modal.classList.remove('is-open');
  if (backdrop) backdrop.classList.remove('is-open');
  if (banner) banner.classList.remove('hidden');

  document.body.classList.add('is-picking-pin');
  window.zoomIntoIsland(dayId);

  const inner = document.getElementById(`island-inner-${dayId}`);
  if (!inner) return;

  function onIslandClick(e) {
    const rect = inner.getBoundingClientRect();
    const x = Math.round(Math.max(8, Math.min(92, ((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.max(12, Math.min(88, ((e.clientY - rect.top) / rect.height) * 100)));

    const data = window.AVINYA_DATA;
    const island = data.islands.find(i => i.id === dayId);
    if (island) {
      const ev = island.events.find(e => e.id === eventId);
      if (ev) {
        ev.pinX = x;
        ev.pinY = y;
        try {
          localStorage.setItem('AVINYA_CUSTOM_EVENTS', JSON.stringify(data));
        } catch (err) {}
      }
    }

    renderDynamicIslandPins();
    cleanupPicker();

    window.toggleDevStudio();
    window.showDevToast(`📍 Pin placed at (${x}%, ${y}%) on ${island ? island.name : 'Island'}`);
  }

  function onKeyEsc(e) {
    if (e.key === 'Escape') {
      cleanupPicker();
      window.toggleDevStudio();
    }
  }

  function cleanupPicker() {
    if (banner) banner.classList.add('hidden');
    document.body.classList.remove('is-picking-pin');
    inner.removeEventListener('click', onIslandClick);
    window.removeEventListener('keydown', onKeyEsc);
  }

  inner.addEventListener('click', onIslandClick, { once: true });
  window.addEventListener('keydown', onKeyEsc);
};

window.cancelPinPick = function() {
  const banner = document.getElementById('pin-picker-banner');
  if (banner) banner.classList.add('hidden');
  document.body.classList.remove('is-picking-pin');
  window.toggleDevStudio();
};

window.exportEventsJs = function() {
  const data = window.AVINYA_DATA;
  const jsonStr = JSON.stringify(data, null, 2);
  const fileContent = `/**\n * AVINYA '27 - MASTER DATA & EVENT REGISTRY\n * Generated via Fest Dev Studio\n */\n\nwindow.AVINYA_DATA = ${jsonStr};\n`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(fileContent)
      .then(() => {
        window.showDevToast('✓ Copied complete events-data.js to clipboard!');
      })
      .catch(() => {
        downloadEventsFile(fileContent);
      });
  } else {
    downloadEventsFile(fileContent);
  }
};

function downloadEventsFile(text) {
  const blob = new Blob([text], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'events-data.js';
  a.click();
  URL.revokeObjectURL(url);
  window.showDevToast('⬇️ Downloaded events-data.js file!');
}

window.resetEventsToDefault = function() {
  if (confirm('Reset all fest event customizations back to original repo defaults?')) {
    localStorage.removeItem('AVINYA_CUSTOM_EVENTS');
    window.showDevToast('🔄 Reverting to repo defaults...');
    setTimeout(() => {
      window.location.reload();
    }, 400);
  }
};

window.showDevToast = function(msg) {
  const toast = document.getElementById('dev-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('is-visible');
  setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 3200);
};


window.zoomIntoIsland = function(islandId) {
  const target = document.getElementById(islandId);
  if (!target) return;

  const allIslands = document.querySelectorAll('.island-entity');
  allIslands.forEach(isl => {
    if (isl.id !== islandId) {
      isl.classList.remove('is-zoomed', 'is-focused-event');
      isl.style.removeProperty('--focus-x');
      isl.style.removeProperty('--focus-y');
      isl.querySelectorAll('.island-pin-anchor').forEach(p => p.classList.remove('is-active-pin'));
    }
  });

  const isAlreadyZoomed = target.classList.contains('is-zoomed');
  if (!isAlreadyZoomed) {
    target.classList.add('is-zoomed');
    target.classList.remove('is-focused-event');
    target.style.removeProperty('--focus-x');
    target.style.removeProperty('--focus-y');

    // Smoothly center the island in the viewport
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Switch environmental audio & particle modes
    if (islandId === 'day1') {
      if (window.setParticleMode) window.setParticleMode('dune');
      if (window.setAudioTheme) window.setAudioTheme('dune');
    } else if (islandId === 'day2') {
      if (window.setParticleMode) window.setParticleMode('synthwave');
      if (window.setAudioTheme) window.setAudioTheme('synthwave');
    } else if (islandId === 'day3') {
      if (window.setParticleMode) window.setParticleMode('carnival');
      if (window.setAudioTheme) window.setAudioTheme('carnival');
    }
  }
};

/**
 * Reset Island View: Returns island to pristine clean default state (only Day & Theme)
 */
window.resetIslandZoom = function(islandId) {
  const target = document.getElementById(islandId);
  if (target) {
    target.classList.remove('is-zoomed', 'is-focused-event');
    target.style.removeProperty('--focus-x');
    target.style.removeProperty('--focus-y');
    target.querySelectorAll('.island-pin-anchor').forEach(p => p.classList.remove('is-active-pin'));
  }
  window.closeEventDrawer();
};

/**
 * Stage 2 Zoom: Click on Event Pin -> Zooms directly to that coordinate & slides in Side Drawer
 */
window.focusEventLocation = function(islandId, eventId, xPercent, yPercent) {
  const island = document.getElementById(islandId);
  if (!island) return;

  // Set island to zoomed and focused-event stage
  island.classList.add('is-zoomed');
  island.classList.add('is-focused-event');

  // Calculate normalized coordinate offset to center pin inside viewport
  const focusX = (50 - xPercent) * 0.55;
  const focusY = (50 - yPercent) * 0.55;
  island.style.setProperty('--focus-x', `${focusX}%`);
  island.style.setProperty('--focus-y', `${focusY}%`);

  // Highlight active pin
  island.querySelectorAll('.island-pin-anchor').forEach(pin => {
    if (pin.id === `pin-${eventId}`) {
      pin.classList.add('is-active-pin');
    } else {
      pin.classList.remove('is-active-pin');
    }
  });

  // Retrieve event data from window.AVINYA_DATA
  const data = window.AVINYA_DATA;
  if (!data || !data.islands) return;

  let foundEvent = null;
  let parentIsland = null;

  for (const isl of data.islands) {
    const ev = (isl.events || []).find(e => e.id === eventId);
    if (ev) {
      foundEvent = ev;
      parentIsland = isl;
      break;
    }
  }

  if (!foundEvent) {
    if (eventId === 'd1-e1') {
      foundEvent = data.islands[0].events[0];
      parentIsland = data.islands[0];
    } else {
      return;
    }
  }

  // Populate Side Drawer
  const drawer = document.getElementById('event-side-drawer');
  const backdrop = document.getElementById('event-side-drawer-backdrop');
  const content = document.getElementById('event-side-drawer-content');
  if (!drawer || !content) return;

  const sponsorsHtml = (foundEvent.sponsors || []).map(sp => `
    <div class="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400 shrink-0">
          <i data-lucide="${sp.logo || 'award'}" class="w-4 h-4"></i>
        </div>
        <div>
          <div class="font-display font-bold text-white text-xs">${sp.name}</div>
          <div class="text-[10px] font-mono text-slate-400">${sp.tier}</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-xs font-mono font-bold text-amber-400">${sp.spending}</div>
        <div class="text-[9px] font-mono text-slate-500 uppercase">Patron Grant</div>
      </div>
    </div>
  `).join('');

  const rulesHtml = (foundEvent.rules || []).map(r => `
    <li class="flex items-start gap-2 text-xs text-slate-300 font-mono">
      <span class="text-amber-400 mt-0.5">✦</span>
      <span>${r}</span>
    </li>
  `).join('');

  content.innerHTML = `
    <!-- Top Header & Close Button -->
    <div class="flex items-start justify-between gap-3 pb-4 border-b border-white/15 mb-5">
      <div>
        <div class="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1">
          <span class="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[11px]">${parentIsland ? parentIsland.dayNumber : 'DAY'}</span>
          <span>•</span>
          <span class="flex items-center gap-1 text-[11px]">
            <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
            <span>${foundEvent.islandPlace || foundEvent.venue}</span>
          </span>
        </div>
        <h3 class="font-display font-black text-2xl text-white tracking-tight">${foundEvent.title}</h3>
        <p class="text-xs text-slate-300 font-body mt-1 leading-relaxed">${foundEvent.tagline || foundEvent.summary}</p>
      </div>
      <button onclick="window.closeEventDrawer()" class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0" title="Close Drawer (Esc)">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>

    <!-- Official Prize Bounty Banner -->
    <div class="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-5">
      <div class="flex items-center justify-between mb-2.5">
        <div class="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
          <i data-lucide="trophy" class="w-4 h-4"></i>
          <span>Official Prize Bounty</span>
        </div>
        <span class="font-display font-black text-xl text-amber-300">${foundEvent.prize || foundEvent.bounty || '₹50,000'}</span>
      </div>
      ${foundEvent.podium ? `
        <div class="grid grid-cols-3 gap-2 font-mono text-[11px]">
          <div class="p-2.5 rounded-xl bg-black/50 border border-amber-500/40 text-center">
            <div class="text-[9px] text-amber-400 uppercase font-bold">1st (Gold)</div>
            <div class="font-bold text-white mt-0.5 text-xs">${foundEvent.podium.first}</div>
          </div>
          <div class="p-2.5 rounded-xl bg-black/50 border border-slate-400/40 text-center">
            <div class="text-[9px] text-slate-300 uppercase font-bold">2nd (Silver)</div>
            <div class="font-bold text-white mt-0.5 text-xs">${foundEvent.podium.second}</div>
          </div>
          <div class="p-2.5 rounded-xl bg-black/50 border border-amber-700/40 text-center">
            <div class="text-[9px] text-amber-600 uppercase font-bold">3rd (Bronze)</div>
            <div class="font-bold text-white mt-0.5 text-xs">${foundEvent.podium.third}</div>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- Scannable Registration QR & Direct Entry Pass -->
    <div class="p-4 rounded-2xl bg-black/60 border border-white/15 mb-5 flex flex-col sm:flex-row items-center gap-4">
      <div class="w-28 h-28 rounded-xl bg-white p-2 shrink-0 shadow-lg flex items-center justify-center">
        <img src="${foundEvent.qrCodeImage || 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(foundEvent.registrationUrl || 'https://hack2future.iiitdwd.ac.in')}" alt="Registration QR Code" class="w-full h-full object-contain">
      </div>
      <div class="flex-1 text-center sm:text-left">
        <div class="text-[10px] font-mono text-slate-400 mb-1">SCAN QR OR CLAIM ENTRY PASS</div>
        <h4 class="font-display font-bold text-sm text-white mb-1.5">Official Port Pass</h4>
        <p class="text-[11px] text-slate-300 font-body mb-3 leading-relaxed">
          Open to all undergraduate students nationwide. Secure spot before registration caps out.
        </p>
        <a href="${foundEvent.registrationUrl || 'https://hack2future.iiitdwd.ac.in'}" target="_blank" class="btn-primary text-xs !py-2 !px-4 inline-flex items-center gap-1.5">
          <span>Register Now</span>
          <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>

    <!-- Declared Sponsors & Spending Allocation -->
    ${sponsorsHtml ? `
      <div class="mb-5">
        <h4 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2.5 flex items-center gap-1.5">
          <i data-lucide="building-2" class="w-3.5 h-3.5 text-amber-400"></i>
          <span>Event Patrons & Spending Allocation</span>
        </h4>
        <div class="space-y-2">
          ${sponsorsHtml}
        </div>
      </div>
    ` : ''}

    <!-- Protocol & Guidelines -->
    ${rulesHtml ? `
      <div class="mb-5">
        <h4 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
          <i data-lucide="scroll" class="w-3.5 h-3.5 text-amber-400"></i>
          <span>Guidelines & Protocols</span>
        </h4>
        <ul class="space-y-1.5 bg-black/40 p-3.5 rounded-xl border border-white/5">
          ${rulesHtml}
        </ul>
      </div>
    ` : ''}

    <!-- Guild, Lead & Venue Info -->
    <div class="p-3.5 rounded-xl bg-white/5 border border-white/10 grid grid-cols-2 gap-3 text-xs font-mono mb-5">
      <div>
        <span class="text-slate-500 block text-[10px]">Host Guild:</span>
        <strong class="text-slate-200 text-xs">${foundEvent.hostClub || 'Avinya Student Committee'}</strong>
      </div>
      <div>
        <span class="text-slate-500 block text-[10px]">Student Coordinator:</span>
        <strong class="text-amber-400 text-xs">${foundEvent.studentLead || 'Fest Secretariat'}</strong>
      </div>
      <div class="col-span-2">
        <span class="text-slate-500 block text-[10px]">Campus Landmark:</span>
        <strong class="text-slate-200 text-xs">${foundEvent.venue}</strong>
      </div>
    </div>

    <!-- Standalone Links -->
    <div class="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
      <a href="event.html?id=${foundEvent.id}" class="text-amber-400 hover:text-white underline underline-offset-4 flex items-center gap-1">
        <span>Standalone Event Dossier</span>
        <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
      </a>
      <a href="${parentIsland ? parentIsland.id + '.html' : 'index.html'}" class="text-slate-400 hover:text-amber-400 flex items-center gap-1">
        <span>${parentIsland ? parentIsland.name : 'Island'} Full Ledger &rarr;</span>
      </a>
    </div>
  `;

  drawer.classList.add('is-open');
  if (backdrop) backdrop.classList.add('is-open');
  if (window.lucide) lucide.createIcons();
};

/**
 * Close Event Drawer and return island from Stage 2 (event focused) back to Stage 1 (island overview)
 */
window.closeEventDrawer = function() {
  const drawer = document.getElementById('event-side-drawer');
  const backdrop = document.getElementById('event-side-drawer-backdrop');
  if (drawer) drawer.classList.remove('is-open');
  if (backdrop) backdrop.classList.remove('is-open');

  const allIslands = document.querySelectorAll('.island-entity');
  allIslands.forEach(isl => {
    isl.classList.remove('is-focused-event');
    isl.style.removeProperty('--focus-x');
    isl.style.removeProperty('--focus-y');
    isl.querySelectorAll('.island-pin-anchor').forEach(p => p.classList.remove('is-active-pin'));
  });
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeEventDrawer();
  }
});


window.openEventDossier = function(eventId) {
  const data = window.AVINYA_DATA;
  if (!data || !data.islands) return;

  let foundEvent = null;
  let parentIsland = null;

  for (const island of data.islands) {
    const ev = island.events.find(e => e.id === eventId);
    if (ev) {
      foundEvent = ev;
      parentIsland = island;
      break;
    }
  }

  if (!foundEvent) {
    if (eventId === 'hack2future' || eventId === 'h2f') {
      window.location.href = 'hack2future.html';
      return;
    }
    return;
  }

  const modal = document.getElementById('event-dossier-modal');
  const body = document.getElementById('event-dossier-body');
  if (!modal || !body) return;

  const sponsorsHtml = (foundEvent.sponsors || []).map(sp => `
    <div class="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-amber-400">
          <i data-lucide="${sp.logo || 'award'}" class="w-4 h-4"></i>
        </div>
        <div>
          <div class="font-display font-bold text-sm text-white">${sp.name}</div>
          <div class="text-[10px] font-mono text-slate-400">${sp.tier} • ${sp.category}</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-xs font-mono font-bold text-amber-400">${sp.spending}</div>
        <div class="text-[9px] font-mono text-slate-500 uppercase">Patron Grant</div>
      </div>
    </div>
  `).join('');

  const rulesHtml = (foundEvent.rules || []).map(r => `
    <li class="flex items-start gap-2 text-xs text-slate-300 font-mono">
      <span class="text-amber-400 mt-0.5">✦</span>
      <span>${r}</span>
    </li>
  `).join('');

  body.innerHTML = `
    <!-- Modal Header -->
    <div class="flex items-start justify-between gap-4 pb-5 border-b border-white/15 mb-6">
      <div>
        <div class="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold mb-1.5">
          <span class="px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/30">${parentIsland ? parentIsland.dayNumber : 'AVINYA'}</span>
          <span>•</span>
          <span class="flex items-center gap-1">
            <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
            <span>${foundEvent.islandPlace || foundEvent.venue}</span>
          </span>
          <span>•</span>
          <a href="${parentIsland ? parentIsland.id + '.html' : 'index.html'}" class="text-[11px] underline underline-offset-2 text-slate-300 hover:text-amber-400 transition-colors">
            ${parentIsland ? parentIsland.name : 'Sector'} Archive &rarr;
          </a>
        </div>
        <h3 class="font-display font-black text-2xl sm:text-3xl text-white">${foundEvent.title}</h3>
        <p class="text-xs text-slate-300 font-body mt-1">${foundEvent.tagline || foundEvent.summary}</p>
      </div>

      <button onclick="window.closeEventDossier()" class="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer" title="Close Dossier">
        <i data-lucide="x" class="w-5 h-5"></i>
      </button>
    </div>

    <!-- Podium Prize Bounty Grid -->
    <div class="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 mb-6">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase">
          <i data-lucide="trophy" class="w-4 h-4"></i>
          <span>Official Prize Bounty</span>
        </div>
        <span class="font-display font-black text-xl text-amber-300">${foundEvent.prize || foundEvent.totalBounty}</span>
      </div>

      ${foundEvent.podium ? `
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div class="p-3 rounded-xl bg-black/40 border border-amber-500/30 text-center">
            <div class="text-[10px] text-amber-400 uppercase font-bold">1st Place (Gold)</div>
            <div class="font-bold text-white mt-1">${foundEvent.podium.first}</div>
          </div>
          <div class="p-3 rounded-xl bg-black/40 border border-slate-400/30 text-center">
            <div class="text-[10px] text-slate-300 uppercase font-bold">2nd Place (Silver)</div>
            <div class="font-bold text-white mt-1">${foundEvent.podium.second}</div>
          </div>
          <div class="p-3 rounded-xl bg-black/40 border border-amber-700/30 text-center">
            <div class="text-[10px] text-amber-600 uppercase font-bold">3rd Place (Bronze)</div>
            <div class="font-bold text-white mt-1">${foundEvent.podium.third}</div>
          </div>
        </div>
      ` : ''}
    </div>

    <!-- Registration QR & Quick Link -->
    <div class="p-5 rounded-2xl bg-black/60 border border-white/15 mb-6 flex flex-col sm:flex-row items-center gap-6">
      <div class="w-32 h-32 rounded-2xl bg-white p-2 shrink-0 shadow-xl flex items-center justify-center">
        <img src="${foundEvent.qrCodeImage || 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(foundEvent.registrationUrl || 'https://hack2future.iiitdwd.ac.in')}" alt="Registration QR" class="w-full h-full object-contain">
      </div>
      <div class="flex-1 text-center sm:text-left">
        <div class="text-xs font-mono text-slate-400 mb-1">SCAN QR OR REGISTER VIA DIRECT PASS</div>
        <h4 class="font-display font-bold text-lg text-white mb-2">Claim Candidate Port Pass</h4>
        <p class="text-xs text-slate-300 font-body mb-4 leading-relaxed">
          Free registration for all accredited college undergraduates. Secure spot before registration caps out.
        </p>
        <a href="${foundEvent.registrationUrl || 'https://hack2future.iiitdwd.ac.in'}" target="_blank" class="btn-primary text-xs !py-2.5 !px-5 inline-flex items-center gap-2">
          <span>Open Registration Portal</span>
          <i data-lucide="arrow-up-right" class="w-3.5 h-3.5"></i>
        </a>
      </div>
    </div>

    <!-- Sponsor Contributions -->
    ${sponsorsHtml ? `
      <div class="mb-6">
        <h4 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
          <i data-lucide="building-2" class="w-3.5 h-3.5 text-amber-400"></i>
          <span>Event Patrons & Spending Allocation</span>
        </h4>
        <div class="space-y-2.5">
          ${sponsorsHtml}
        </div>
      </div>
    ` : ''}

    <!-- Key Rules -->
    ${rulesHtml ? `
      <div class="mb-6">
        <h4 class="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2.5">Guidelines & Protocols</h4>
        <ul class="space-y-2">
          ${rulesHtml}
        </ul>
      </div>
    ` : ''}

    <!-- Host & Coordinator Info -->
    <div class="p-4 rounded-xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
      <div>
        <span class="text-slate-500">Host Guild:</span>
        <strong class="text-slate-200 ml-1">${foundEvent.hostClub || 'Avinya Student Committee'}</strong>
      </div>
      <div>
        <span class="text-slate-500">Lead:</span>
        <strong class="text-amber-400 ml-1">${foundEvent.studentLead || 'Fest Secretariat'}</strong>
      </div>
      <div>
        <span class="text-slate-500">Venue:</span>
        <strong class="text-slate-200 ml-1">${foundEvent.venue}</strong>
      </div>
    </div>

    <!-- Island & Standalone Navigation -->
    <div class="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
      <a href="event.html?id=${foundEvent.id}" class="text-amber-400 hover:text-white underline underline-offset-4 flex items-center gap-1.5">
        <span>Open Standalone Event Page</span>
        <i data-lucide="external-link" class="w-3.5 h-3.5"></i>
      </a>
      <a href="${parentIsland ? parentIsland.id + '.html' : 'index.html'}" class="text-slate-400 hover:text-amber-400 flex items-center gap-1">
        <span>Explore All Locations in ${parentIsland ? parentIsland.name : 'Island'} &rarr;</span>
      </a>
    </div>
  `;

  modal.classList.add('is-open');
  if (window.lucide) lucide.createIcons();
};

window.closeEventDossier = function() {
  const modal = document.getElementById('event-dossier-modal');
  if (modal) {
    modal.classList.remove('is-open');
  }
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.closeEventDossier();
  }
});

/* ==========================================================================
   WEB AUDIO API ADAPTIVE SOUNDSCAPE SYNTHESIZER
   ========================================================================== */
function initAdaptiveSoundscape() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const equalizer = document.getElementById('audio-equalizer');
  const statusLabel = document.getElementById('audio-status-label');
  if (!toggleBtn) return;

  let audioCtx = null;
  let isPlaying = false;
  let masterGain = null;
  let oscChord = [];

  const themeScales = {
    harbor: [261.63, 329.63, 392.00],             // C Major calm oceanic
    dune: [220.00, 293.66, 349.23],               // D Minor desert amber
    synthwave: [196.00, 246.94, 293.66, 370.00], // G Cyberpunk arpeggio
    carnival: [261.63, 329.63, 392.00, 523.25],  // Gold festive fanfare
    space: [130.81, 196.00, 261.63, 523.25]      // Sub-space celestial hum
  };

  function setupAudio() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return false;
    audioCtx = new AudioContextClass();

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);

    // 1. Procedural Sea Surf (Pink noise buffer + sweeping lowpass filter)
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
      b6 = white * 0.115926;
    }

    const noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    const filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(320, audioCtx.currentTime);

    // LFO to swell ocean waves
    const lfo = audioCtx.createOscillator();
    lfo.frequency.setValueAtTime(0.18, audioCtx.currentTime);
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(220, audioCtx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filterNode.frequency);
    lfo.start();

    noiseNode.connect(filterNode);
    filterNode.connect(masterGain);
    noiseNode.start();

    // 2. Harmonic Ambient Chords
    createChord('harbor');
    return true;
  }

  function createChord(mode) {
    if (!audioCtx) return;
    const freqs = themeScales[mode] || themeScales.harbor;

    oscChord.forEach(item => {
      try {
        item.gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.4);
        setTimeout(() => { item.osc.stop(); item.osc.disconnect(); }, 800);
      } catch(e) {}
    });
    oscChord = [];

    freqs.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

      oscGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
      oscGain.gain.setTargetAtTime(0.035 / freqs.length, audioCtx.currentTime, 1.2);

      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start();

      oscChord.push({ osc, gain: oscGain });
    });
  }

  window.setAudioTheme = function(mode) {
    if (isPlaying && audioCtx) {
      createChord(mode);
    }
  };

  toggleBtn.addEventListener('click', async () => {
    if (!isPlaying) {
      if (!audioCtx) {
        const ok = setupAudio();
        if (!ok) return;
      }
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      masterGain.gain.setTargetAtTime(0.8, audioCtx.currentTime, 0.5);
      isPlaying = true;
      if (equalizer) equalizer.classList.add('is-playing');
      if (statusLabel) {
        statusLabel.innerText = 'AUDIO LIVE';
        statusLabel.classList.add('text-emerald-400');
        statusLabel.classList.remove('text-slate-400');
      }
    } else {
      masterGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.4);
      isPlaying = false;
      if (equalizer) equalizer.classList.remove('is-playing');
      if (statusLabel) {
        statusLabel.innerText = 'AUDIO MUTED';
        statusLabel.classList.remove('text-emerald-400');
        statusLabel.classList.add('text-slate-400');
      }
    }
  });
}

/* ==========================================================================
   HOLOGRAPHIC BOARDING PASS MINTING & 3D FOIL REFLECTION
   ========================================================================== */
function initHolographicPass() {
  const card = document.getElementById('crew-holographic-card');
  const nameInput = document.getElementById('pass-name-input');
  const displayName = document.getElementById('pass-display-name');
  const displayRole = document.getElementById('pass-display-role');
  const displayId = document.getElementById('pass-display-id');
  const roleButtons = document.querySelectorAll('.role-btn');
  const downloadBtn = document.getElementById('download-pass-btn');

  if (!card) return;

  // Live Name Binding
  if (nameInput && displayName) {
    nameInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      displayName.innerText = val ? val.toUpperCase() : 'COMMANDER DHARWAD';
    });
  }

  // Role Selector
  let currentRole = 'HACKER / CODER';
  let currentCode = 'ROLE-DEV';
  let currentColor = '#38BDF8';

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => {
        b.classList.remove('active');
        b.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        b.style.color = '#94A3B8';
        b.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
      });

      btn.classList.add('active');
      currentRole = btn.getAttribute('data-role');
      currentCode = btn.getAttribute('data-code');
      currentColor = btn.getAttribute('data-color');

      btn.style.borderColor = currentColor;
      btn.style.color = currentColor;
      btn.style.backgroundColor = `${currentColor}25`;

      if (displayRole) {
        displayRole.innerText = currentRole;
        displayRole.style.borderColor = currentColor;
        displayRole.style.color = currentColor;
        displayRole.style.backgroundColor = `${currentColor}20`;
      }

      if (displayId) {
        const randNum = Math.floor(1000 + Math.random() * 9000);
        displayId.innerText = `AV27-${randNum}-${currentCode.split('-')[1]}`;
      }
    });
  });

  // 3D Card Interactive Tilt & Rainbow Prismatic Foil Glare
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    const foilX = (x / rect.width) * 100;
    const foilY = (y / rect.height) * 100;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.setProperty('--foil-x', `${foilX}%`);
    card.style.setProperty('--foil-y', `${foilY}%`);
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.setProperty('--foil-x', '50%');
    card.style.setProperty('--foil-y', '50%');
  });

  // High-Resolution PNG Pass Generation
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      canvas.width = 960;
      canvas.height = 580;
      const ctx = canvas.getContext('2d');

      // Rounded Card Mask
      const r = 36;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(canvas.width - r, 0);
      ctx.quadraticCurveTo(canvas.width, 0, canvas.width, r);
      ctx.lineTo(canvas.width, canvas.height - r);
      ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - r, canvas.height);
      ctx.lineTo(r, canvas.height);
      ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.clip();

      // Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGrad.addColorStop(0, '#0F172A');
      bgGrad.addColorStop(0.5, '#090D16');
      bgGrad.addColorStop(1, '#05070B');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Rainbow Foil Shimmer Overlay
      const foilGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      foilGrad.addColorStop(0, 'rgba(255, 0, 128, 0.08)');
      foilGrad.addColorStop(0.3, 'rgba(6, 182, 212, 0.12)');
      foilGrad.addColorStop(0.7, 'rgba(245, 158, 11, 0.10)');
      foilGrad.addColorStop(1, 'rgba(129, 140, 248, 0.08)');
      ctx.fillStyle = foilGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Border Stroke
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Golden Security Chip
      const chipX = canvas.width - 130;
      const chipY = 60;
      const chipW = 70;
      const chipH = 50;
      const chipGrad = ctx.createLinearGradient(chipX, chipY, chipX + chipW, chipY + chipH);
      chipGrad.addColorStop(0, '#F59E0B');
      chipGrad.addColorStop(1, '#B45309');
      ctx.fillStyle = chipGrad;
      ctx.fillRect(chipX, chipY, chipW, chipH);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(chipX + 8, chipY + 8, chipW - 16, chipH - 16);

      // Typography
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText("AVINYA '27", 60, 80);

      ctx.fillStyle = '#94A3B8';
      ctx.font = 'bold 15px monospace';
      ctx.fillText("IIIT DHARWAD // FLAGSHIP VOYAGE PASS", 60, 110);

      // Divider line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(60, 150);
      ctx.lineTo(canvas.width - 60, 150);
      ctx.stroke();

      // Name
      const nameText = displayName ? displayName.innerText : "COMMANDER DHARWAD";
      ctx.fillStyle = '#64748B';
      ctx.font = 'bold 14px monospace';
      ctx.fillText("OFFICIAL CREW IDENTITY", 60, 210);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText(nameText, 60, 265);

      // Role
      ctx.fillStyle = currentColor;
      ctx.font = 'bold 20px monospace';
      ctx.fillText(currentRole, 60, 320);

      const passId = displayId ? displayId.innerText : "AV27-9842-DWD";
      ctx.fillStyle = '#94A3B8';
      ctx.font = '16px monospace';
      ctx.fillText(`KEY: ${passId}`, 60, 355);

      // Footer
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.moveTo(60, 410);
      ctx.lineTo(canvas.width - 60, 410);
      ctx.stroke();

      ctx.fillStyle = '#10B981';
      ctx.font = 'bold 16px monospace';
      ctx.fillText("● UNRESTRICTED ACCESS // ALL 3 ISLANDS + HACK2FUTURE", 60, 460);

      ctx.fillStyle = '#64748B';
      ctx.font = '14px monospace';
      ctx.fillText("VALIDITY: MARCH 12-14, 2027 • PERMANENT CAMPUS, DHARWAD", 60, 495);

      // Stylized QR code box
      const qrBoxX = canvas.width - 150;
      const qrBoxY = 410;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(qrBoxX, qrBoxY, 90, 90);
      ctx.fillStyle = '#000000';
      ctx.fillRect(qrBoxX + 10, qrBoxY + 10, 25, 25);
      ctx.fillRect(qrBoxX + 55, qrBoxY + 10, 25, 25);
      ctx.fillRect(qrBoxX + 10, qrBoxY + 55, 25, 25);
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(qrBoxX + 15, qrBoxY + 15, 15, 15);
      ctx.fillRect(qrBoxX + 60, qrBoxY + 15, 15, 15);
      ctx.fillRect(qrBoxX + 15, qrBoxY + 60, 15, 15);

      ctx.restore();

      const link = document.createElement('a');
      link.download = `avinya27-boarding-pass-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }
}

/* ==========================================================================
   ISLAND ATOLL CARDS 3D MOUSE PARALLAX & SPECULAR GLARE
   ========================================================================== */
function initIslandAtollCardsTilt() {
  const cards = document.querySelectorAll('.island-atoll-card');
  cards.forEach(card => {
    if (!card.querySelector('.tilt-card-glare')) {
      const glare = document.createElement('div');
      glare.className = 'tilt-card-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const px = (x / rect.width) * 100;
      const py = (y / rect.height) * 100;

      card.style.setProperty('--mouse-x', `${px}%`);
      card.style.setProperty('--mouse-y', `${py}%`);

      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* ==========================================================================
   CUSTOM NAUTICAL COMPASS CURSOR ENGINE
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  const ripple = document.getElementById('custom-cursor-ripple');
  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    if (ripple) {
      ripple.style.left = `${mouseX}px`;
      ripple.style.top = `${mouseY}px`;
    }
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  const hoverTargets = document.querySelectorAll('a, button, [onclick], .island-realm, .island-location-chip, .time-btn');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hovering'));
  });
}

function _unused_old_cursor() {
  const dot = document.getElementById('custom-cursor-dot');
  const ring = document.getElementById('custom-cursor-ring');
  if (!dot || !ring) return;

  if (window.matchMedia('(pointer: coarse)').matches) {
    dot.style.display = 'none';
    ring.style.display = 'none';
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover enlargement on interactive elements
  const interactiveSelector = 'a, button, input, select, textarea, .island-atoll-card, [onclick], .dial-sphere, .role-btn, .schedule-tab-btn';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.add('is-hovering');
      dot.classList.add('is-hovering');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) {
      ring.classList.remove('is-hovering');
      dot.classList.remove('is-hovering');
    }
  });
}

/* ==========================================================================
   HALL OF CHAMPIONS & REGULATIONS RENDERER
   ========================================================================== */
function renderChampionsAndRegulations() {
  const data = window.AVINYA_DATA;
  if (!data) return;

  // 1. Render Champions Grid
  const champsContainer = document.getElementById('champions-grid');
  if (champsContainer && data.champions) {
    champsContainer.innerHTML = data.champions.map(c => `
      <div class="apple-reveal champion-card flex flex-col justify-between group">
        <div>
          <div class="relative aspect-video overflow-hidden rounded-t-[22px]">
            <img src="${c.image}" alt="${c.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
            <div class="absolute inset-0 bg-gradient-to-t from-[#0D101A] via-transparent to-transparent"></div>
            
            <div class="absolute top-3 left-3">
              <span class="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 backdrop-blur-md">
                ${c.badge}
              </span>
            </div>

            <div class="absolute bottom-2 right-3">
              <span class="bounty-tag text-[11px] shadow-lg">
                ${c.prize}
              </span>
            </div>
          </div>

          <div class="p-5">
            <div class="text-[10px] font-mono uppercase text-slate-400 mb-1">${c.event}</div>
            <h4 class="font-display font-bold text-lg text-white mb-1 group-hover:text-amber-400 transition-colors">
              ${c.name}
            </h4>
            <div class="text-xs font-mono text-amber-400 mb-3">${c.institution}</div>
            <p class="text-xs text-slate-300 font-body line-clamp-2 leading-relaxed">
              ${c.project}
            </p>
          </div>
        </div>

        <div class="p-5 pt-0">
          <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Verified Fleet Victor</span>
            <span class="text-emerald-400 font-bold">● DISBURSED</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 2. Render Terms & Conditions List
  const termsContainer = document.getElementById('terms-list');
  if (termsContainer && data.termsAndConditions) {
    termsContainer.innerHTML = data.termsAndConditions.map((item, idx) => `
      <div class="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
        <div>
          <div class="text-amber-400 font-bold mb-1.5 flex items-center gap-1.5">
            <span class="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-[10px] shrink-0">
              0${idx + 1}
            </span>
            <span>${item.title}</span>
          </div>
          <p class="text-slate-300 font-body leading-relaxed text-[11px]">
            ${item.desc}
          </p>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   CAMPUS TRANSIT & HUBS RENDERER
   ========================================================================== */
function renderCampusTransit() {
  const data = window.AVINYA_DATA;
  if (!data || !data.campusTransit) return;

  const hubsContainer = document.getElementById('transit-hubs-grid');
  if (hubsContainer && data.campusTransit.transitHubs) {
    hubsContainer.innerHTML = data.campusTransit.transitHubs.map(hub => `
      <div class="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <span class="text-slate-400 text-[10px] uppercase">${hub.type}</span>
            <span class="text-amber-400 font-bold text-xs">${hub.distance}</span>
          </div>
          <h5 class="text-white font-bold text-xs mb-1">${hub.name}</h5>
        </div>
        <div class="text-slate-400 text-[10px] pt-2 border-t border-white/5 flex items-center gap-1">
          <i data-lucide="clock" class="w-3 h-3 text-amber-400"></i>
          <span>${hub.time} drive</span>
        </div>
      </div>
    `).join('');
  }

  if (window.lucide) lucide.createIcons();
}
