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

function initArchipelagoShip() {
  const ship = document.getElementById('interactive-ship');
  const path = document.getElementById('voyage-curved-track');
  const section = document.getElementById('voyage-map');
  if (!ship) return;

  function updateShipPosition() {
    if (!section || !path) return;
    const rect = section.getBoundingClientRect();
    const sectionHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Calculate progress as user scrolls through voyage-map section
    let progress = (windowHeight - rect.top) / (sectionHeight + windowHeight * 0.4);
    progress = Math.max(0, Math.min(1, progress));

    const pathLength = path.getTotalLength ? path.getTotalLength() : 1800;
    const currentLength = progress * pathLength;

    if (path.getPointAtLength) {
      const pt = path.getPointAtLength(currentLength);
      const nextPt = path.getPointAtLength(Math.min(pathLength, currentLength + 8));
      const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);

      // SVG viewBox is 1200 x 1800
      const leftPct = (pt.x / 1200) * 100;
      const topPct = (pt.y / 1800) * 100;

      ship.style.left = `${leftPct}%`;
      ship.style.top = `${topPct}%`;
      ship.style.transform = `translate(-50%, -50%) rotate(${angle - 90}deg)`;
    }
  }

  window.addEventListener('scroll', updateShipPosition, { passive: true });
  window.addEventListener('resize', updateShipPosition);
  setTimeout(updateShipPosition, 100);

  window.sailToIsland = function(dayNum) {
    const targetSection = document.getElementById(`day${dayNum}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
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
function initLivingSea() {
  const canvas = document.getElementById('living-sea-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const PALETTES = {
    morning: {
      skyTop: [12, 74, 110],       // #0c4a6e
      skyBottom: [56, 189, 248],   // #38bdf8 light azure
      seaDeep: [3, 105, 161],      // #0369a1
      seaMid: [14, 165, 233],      // #0ea5e9
      seaCrest: [186, 230, 253],   // #bae6fd
      shimmer: [254, 240, 138, 0.45]
    },
    day: {
      skyTop: [8, 47, 73],         // #082f49
      skyBottom: [14, 165, 233],   // #0ea5e9
      seaDeep: [2, 132, 199],      // #0284c7
      seaMid: [56, 189, 248],      // #38bdf8
      seaCrest: [224, 242, 254],
      shimmer: [255, 255, 255, 0.5]
    },
    sunset: {
      skyTop: [59, 7, 100],        // #3b0764
      skyBottom: [234, 88, 12],    // #ea580c
      seaDeep: [67, 20, 7],        // #431407
      seaMid: [194, 65, 12],       // #c2410c
      seaCrest: [253, 186, 116],   // #fdba74
      shimmer: [254, 215, 170, 0.55]
    },
    night: {
      skyTop: [2, 6, 23],          // #020617
      skyBottom: [15, 23, 42],     // #0f172a
      seaDeep: [3, 7, 18],         // #030712
      seaMid: [15, 30, 60],
      seaCrest: [56, 189, 248],    // #38bdf8 bioluminescent aqua
      shimmer: [56, 189, 248, 0.35]
    }
  };

  function getAutoTimeMode() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 17) return 'day';
    if (hour >= 17 && hour < 20) return 'sunset';
    return 'night';
  }

  let currentMode = getAutoTimeMode();
  let targetMode = currentMode;
  let isAuto = true;

  let currentColors = {
    skyTop: [...PALETTES[currentMode].skyTop],
    skyBottom: [...PALETTES[currentMode].skyBottom],
    seaDeep: [...PALETTES[currentMode].seaDeep],
    seaMid: [...PALETTES[currentMode].seaMid],
    seaCrest: [...PALETTES[currentMode].seaCrest],
    shimmer: [...PALETTES[currentMode].shimmer]
  };

  window.setLivingSeaTime = function(mode) {
    if (mode === 'auto') {
      isAuto = true;
      targetMode = getAutoTimeMode();
    } else {
      isAuto = false;
      targetMode = mode;
    }
    document.body.setAttribute('data-time', targetMode);
  };

  document.body.setAttribute('data-time', targetMode);

  let time = 0;
  const sparkles = [];
  for (let i = 0; i < 45; i++) {
    sparkles.push({
      x: Math.random(),
      y: Math.random() * 0.7 + 0.3,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2
    });
  }

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function updatePaletteTransition() {
    if (isAuto) {
      targetMode = getAutoTimeMode();
    }
    const target = PALETTES[targetMode] || PALETTES.night;
    const speed = 0.04;

    for (const key of ['skyTop', 'skyBottom', 'seaDeep', 'seaMid', 'seaCrest']) {
      for (let i = 0; i < 3; i++) {
        currentColors[key][i] = lerp(currentColors[key][i], target[key][i], speed);
      }
    }
    for (let i = 0; i < 4; i++) {
      currentColors.shimmer[i] = lerp(currentColors.shimmer[i], target.shimmer[i], speed);
    }
  }

  function drawWave(yOffset, amplitude, frequency, speed, colorHex, strokeColorHex) {
    ctx.beginPath();
    ctx.moveTo(0, height);
    
    for (let x = 0; x <= width; x += 16) {
      const y = yOffset + 
                Math.sin(x * frequency + time * speed) * amplitude + 
                Math.cos(x * frequency * 0.5 + time * speed * 0.7) * (amplitude * 0.4);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = colorHex;
    ctx.fill();

    if (strokeColorHex) {
      ctx.strokeStyle = strokeColorHex;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function render() {
    time += 0.015;
    updatePaletteTransition();

    const c = currentColors;
    const skyTopStr = `rgb(${Math.round(c.skyTop[0])}, ${Math.round(c.skyTop[1])}, ${Math.round(c.skyTop[2])})`;
    const skyBtmStr = `rgb(${Math.round(c.skyBottom[0])}, ${Math.round(c.skyBottom[1])}, ${Math.round(c.skyBottom[2])})`;
    
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, skyTopStr);
    skyGrad.addColorStop(1, skyBtmStr);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    const shimStr = `rgba(${Math.round(c.shimmer[0])}, ${Math.round(c.shimmer[1])}, ${Math.round(c.shimmer[2])}, ${c.shimmer[3].toFixed(2)})`;
    ctx.fillStyle = shimStr;
    for (const sp of sparkles) {
      const sx = sp.x * width;
      const sy = sp.y * height + Math.sin(time + sp.phase) * 6;
      const alpha = (Math.sin(time * 2 + sp.phase) + 1) * 0.5;
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(sx, sy, sp.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1.0;

    const deepRgb = `rgb(${Math.round(c.seaDeep[0])}, ${Math.round(c.seaDeep[1])}, ${Math.round(c.seaDeep[2])})`;
    const midRgb = `rgb(${Math.round(c.seaMid[0])}, ${Math.round(c.seaMid[1])}, ${Math.round(c.seaMid[2])})`;
    const crestRgb = `rgb(${Math.round(c.seaCrest[0])}, ${Math.round(c.seaCrest[1])}, ${Math.round(c.seaCrest[2])})`;

    drawWave(height * 0.55, 24, 0.002, 0.8, deepRgb, null);
    drawWave(height * 0.68, 32, 0.003, -1.1, midRgb, crestRgb);
    drawWave(height * 0.82, 38, 0.004, 1.4, deepRgb, crestRgb);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
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
