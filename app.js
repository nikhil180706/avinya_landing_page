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
  try { initWebGLOcean(); } catch(e) { console.warn('WebGL Ocean error', e); }
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
  if (!ship) return;

  window.sailToIsland = function(dayNum) {
    let topPos = '68%';
    let leftPos = '16%';
    let sectionId = 'day1';

    if (dayNum === 1) {
      topPos = '60%';
      leftPos = '24%';
      sectionId = 'day1';
    } else if (dayNum === 2) {
      topPos = '45%';
      leftPos = '52%';
      sectionId = 'day2';
    } else if (dayNum === 3) {
      topPos = '25%';
      leftPos = '82%';
      sectionId = 'day3';
    }

    ship.style.top = topPos;
    ship.style.left = leftPos;

    const targetSection = document.getElementById(sectionId);
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
      const eventPageUrl = `event.html?id=${event.id}`;
      const placeName = event.islandPlace || event.venue;

      return `
        <div class="apple-reveal island-atoll-card flex flex-col justify-between group">
          <div>
            <div class="relative aspect-video overflow-hidden rounded-t-[22px]">
              <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-[#0D101A] via-transparent to-transparent"></div>
              
              <!-- Island Place Pin Badge -->
              <div class="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/85 border border-white/20 text-white backdrop-blur-md">
                <i data-lucide="map-pin" class="w-3 h-3" style="color: ${island.accentColor};"></i>
                <span class="text-[10px] font-mono font-bold uppercase tracking-wider">
                  ${placeName}
                </span>
              </div>

              <div class="absolute bottom-2 right-3">
                <span class="bounty-tag text-[11px] shadow-lg">
                  ${event.totalBounty || event.bounty}
                </span>
              </div>
            </div>

            <div class="p-5">
              <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
                <span class="flex items-center gap-1.5">
                  <i data-lucide="shield" class="w-3 h-3" style="color: ${island.accentColor};"></i>
                  <span>${event.club || 'IIIT Dharwad'}</span>
                </span>
                <span class="font-semibold" style="color: ${island.accentColor};">${event.category}</span>
              </div>
              
              <h4 class="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                ${event.title}
              </h4>
              
              <p class="text-xs text-slate-300 font-body line-clamp-2 mb-4 leading-relaxed">
                ${event.summary}
              </p>

              ${event.sponsors && event.sponsors.length > 0 ? `
                <div class="p-2 rounded-xl bg-white/5 border border-white/5 mb-4 text-[10px] font-mono flex items-center justify-between text-slate-300">
                  <span class="text-slate-400">Patron:</span>
                  <span class="text-sky-300 font-semibold">${event.sponsors[0].name}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <div class="p-5 pt-0">
            <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span class="flex items-center gap-1.5">
                <i data-lucide="clock" class="w-3.5 h-3.5" style="color: ${island.accentColor};"></i>
                ${event.time.split('-')[0].trim()}
              </span>
              
              <a href="${eventPageUrl}" class="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black text-amber-400 font-bold transition-all flex items-center gap-1">
                <span>Place Dossier & QR</span>
                <i data-lucide="arrow-right" class="w-3 h-3"></i>
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  });

  if (window.lucide) lucide.createIcons();
  try { initIslandAtollCardsTilt(); } catch(e) {}
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
   THREE.JS 3D PROCEDURAL OCEAN & SAILING SHIP ENGINE (WITH 3 PROCEDURAL ISLANDS)
   ========================================================================== */
function initWebGLOcean() {
  const container = document.getElementById('webgl-ocean-container');
  if (!container || typeof THREE === 'undefined') return;

  let scene, camera, renderer, oceanMesh, oceanGeometry, originalPositions, shipGroup, sailMesh, dirLight, oceanMaterial;
  let outpostGroup, pandemoniumGroup, carnivalGroup, stargateGroup, panRing;

  try {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060A, 0.009);

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 11, 28);
    camera.lookAt(0, -1, 0);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);
  } catch (err) {
    console.warn('WebGL initialization failed, running in 2D fallback mode:', err);
    return;
  }

  // Window Resize
  window.addEventListener('resize', () => {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Lighting
  const ambientLight = new THREE.AmbientLight(0x0e1726, 1.8);
  scene.add(ambientLight);

  dirLight = new THREE.DirectionalLight(0xF59E0B, 2.5);
  dirLight.position.set(25, 40, 20);
  scene.add(dirLight);

  const fillLight = new THREE.PointLight(0x38BDF8, 2.2, 90);
  fillLight.position.set(-20, 14, 15);
  scene.add(fillLight);

  // Dynamic Theme Palette Interpolation
  window.setWebGLTheme = function(hexColor) {
    if (!dirLight || !oceanMaterial) return;
    const targetColor = new THREE.Color(hexColor);
    if (window.gsap) {
      gsap.to(dirLight.color, { r: targetColor.r, g: targetColor.g, b: targetColor.b, duration: 1.2 });
      gsap.to(oceanMaterial.color, {
        r: Math.max(0.02, targetColor.r * 0.12),
        g: Math.max(0.04, targetColor.g * 0.12),
        b: Math.max(0.08, targetColor.b * 0.15),
        duration: 1.2
      });
    } else {
      dirLight.color.copy(targetColor);
    }
  };

  // Procedural Ocean Mesh (Large 280x280 world)
  const oceanWidth = 280;
  const oceanHeight = 280;
  const segments = 72;
  oceanGeometry = new THREE.PlaneGeometry(oceanWidth, oceanHeight, segments, segments);
  oceanGeometry.rotateX(-Math.PI / 2);

  const posAttr = oceanGeometry.attributes.position;
  originalPositions = new Float32Array(posAttr.array);

  oceanMaterial = new THREE.MeshStandardMaterial({
    color: 0x071224,
    roughness: 0.22,
    metalness: 0.82,
    flatShading: true,
    wireframe: false
  });

  oceanMesh = new THREE.Mesh(oceanGeometry, oceanMaterial);
  oceanMesh.position.y = -6.5;
  scene.add(oceanMesh);

  // ========================================================================
  // PROCEDURAL 3D ISLANDS IN THE OCEAN
  // ========================================================================

  // 1. Island 01: The Last Outpost (Desert Citadel at x:16, z:-22)
  outpostGroup = new THREE.Group();
  outpostGroup.position.set(16, -6.0, -22);

  // Lower Atoll Base
  const outBaseGeo = new THREE.CylinderGeometry(15, 20, 5, 12);
  const outBaseMat = new THREE.MeshStandardMaterial({ color: 0xC27803, roughness: 0.8, flatShading: true });
  const outBaseMesh = new THREE.Mesh(outBaseGeo, outBaseMat);
  outBaseMesh.position.y = 2.0;
  outpostGroup.add(outBaseMesh);

  // Upper Desert Dunes
  const outDuneGeo = new THREE.DodecahedronGeometry(6.5, 0);
  outDuneGeo.scale(1.6, 0.7, 1.4);
  const outDuneMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.9, flatShading: true });
  const outDuneMesh = new THREE.Mesh(outDuneGeo, outDuneMat);
  outDuneMesh.position.set(-1, 5.0, 0);
  outpostGroup.add(outDuneMesh);

  // Monolith Spires
  for (let i = 0; i < 4; i++) {
    const spireGeo = new THREE.ConeGeometry(1.2, 7 + i * 1.5, 5);
    const spireMat = new THREE.MeshStandardMaterial({ color: 0x92400E, roughness: 0.7, flatShading: true });
    const spireMesh = new THREE.Mesh(spireGeo, spireMat);
    const ang = (i / 4) * Math.PI * 2;
    spireMesh.position.set(Math.cos(ang) * 6, 6 + i, Math.sin(ang) * 6);
    outpostGroup.add(spireMesh);
  }

  // Outpost Watchtower & Amber Beacon
  const outTowerGeo = new THREE.CylinderGeometry(0.9, 1.3, 9, 6);
  const outTowerMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.6, flatShading: true });
  const outTowerMesh = new THREE.Mesh(outTowerGeo, outTowerMat);
  outTowerMesh.position.set(-3, 8.5, 2);
  outpostGroup.add(outTowerMesh);

  const outBeacon = new THREE.PointLight(0xF59E0B, 3.5, 30);
  outBeacon.position.set(-3, 13.5, 2);
  outpostGroup.add(outBeacon);

  // Harbor Wooden Dock Pier (where ship parks)
  const outPierGeo = new THREE.BoxGeometry(4.5, 0.5, 11);
  const outPierMat = new THREE.MeshStandardMaterial({ color: 0x451A03, roughness: 0.7 });
  const outPierMesh = new THREE.Mesh(outPierGeo, outPierMat);
  outPierMesh.position.set(-7.5, 1.5, 3.0);
  outpostGroup.add(outPierMesh);

  scene.add(outpostGroup);

  // 2. Island 02: The Pandemonium (Cyberpunk Island at x:-18, z:-70)
  pandemoniumGroup = new THREE.Group();
  pandemoniumGroup.position.set(-18, -6.0, -70);

  // Volcanic Base
  const panBaseGeo = new THREE.CylinderGeometry(16, 22, 6, 14);
  const panBaseMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5, metalness: 0.6, flatShading: true });
  const panBaseMesh = new THREE.Mesh(panBaseGeo, panBaseMat);
  panBaseMesh.position.y = 2.5;
  pandemoniumGroup.add(panBaseMesh);

  // Cyberpunk Neon Spire Towers
  const panSpire1Geo = new THREE.BoxGeometry(2.5, 16, 2.5);
  const panSpire1Mat = new THREE.MeshStandardMaterial({
    color: 0x1E1035,
    emissive: 0xEC4899,
    emissiveIntensity: 0.8,
    roughness: 0.2
  });
  const panSpire1 = new THREE.Mesh(panSpire1Geo, panSpire1Mat);
  panSpire1.position.set(0, 10, 0);
  pandemoniumGroup.add(panSpire1);

  const panSpire2Geo = new THREE.BoxGeometry(1.8, 11, 1.8);
  const panSpire2Mat = new THREE.MeshStandardMaterial({
    color: 0x082F49,
    emissive: 0x06B6D4,
    emissiveIntensity: 0.8,
    roughness: 0.2
  });
  const panSpire2 = new THREE.Mesh(panSpire2Geo, panSpire2Mat);
  panSpire2.position.set(4, 7.5, 2);
  pandemoniumGroup.add(panSpire2);

  // Floating Hologram Ring
  const panRingGeo = new THREE.TorusGeometry(3.2, 0.22, 16, 32);
  const panRingMat = new THREE.MeshStandardMaterial({ color: 0xEC4899, emissive: 0xEC4899, emissiveIntensity: 1 });
  panRing = new THREE.Mesh(panRingGeo, panRingMat);
  panRing.position.set(0, 18, 0);
  panRing.rotation.x = Math.PI / 2;
  pandemoniumGroup.add(panRing);

  // Cyber Dock Pier (where ship parks)
  const panPierGeo = new THREE.BoxGeometry(4.5, 0.5, 11);
  const panPierMat = new THREE.MeshStandardMaterial({ color: 0x1F2937, metalness: 0.8, roughness: 0.3 });
  const panPierMesh = new THREE.Mesh(panPierGeo, panPierMat);
  panPierMesh.position.set(7.5, 1.5, 4.0);
  pandemoniumGroup.add(panPierMesh);

  const panHarborLight = new THREE.PointLight(0xEC4899, 4.0, 35);
  panHarborLight.position.set(7.5, 4.0, 4.0);
  pandemoniumGroup.add(panHarborLight);

  scene.add(pandemoniumGroup);

  // 3. Island 03: The Carnival Island (Festival Island at x:18, z:-118)
  carnivalGroup = new THREE.Group();
  carnivalGroup.position.set(18, -6.0, -118);

  // Base Earth
  const carBaseGeo = new THREE.CylinderGeometry(18, 24, 6, 14);
  const carBaseMat = new THREE.MeshStandardMaterial({ color: 0xCA8A04, roughness: 0.8, flatShading: true });
  const carBaseMesh = new THREE.Mesh(carBaseGeo, carBaseMat);
  carBaseMesh.position.y = 2.5;
  carnivalGroup.add(carBaseMesh);

  // Big Top Circus Tent Pavilion
  const carTentGeo = new THREE.ConeGeometry(7, 5.5, 12);
  const carTentMat = new THREE.MeshStandardMaterial({ color: 0xFBBF24, roughness: 0.5, flatShading: true });
  const carTent = new THREE.Mesh(carTentGeo, carTentMat);
  carTent.position.set(0, 7.5, 0);
  carnivalGroup.add(carTent);

  // Festival Boardwalk Pier (where ship parks)
  const carPierGeo = new THREE.BoxGeometry(4.5, 0.5, 12);
  const carPierMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.6 });
  const carPierMesh = new THREE.Mesh(carPierGeo, carPierMat);
  carPierMesh.position.set(-8.0, 1.5, 3.5);
  carnivalGroup.add(carPierMesh);

  const carLantern1 = new THREE.PointLight(0xFBBF24, 3.5, 30);
  carLantern1.position.set(-8.0, 4.0, 3.5);
  carnivalGroup.add(carLantern1);

  const carLantern2 = new THREE.PointLight(0xEF4444, 2.5, 25);
  carLantern2.position.set(3, 8.0, 3);
  carnivalGroup.add(carLantern2);

  scene.add(carnivalGroup);

  // 4. Hack2Future Celestial Star-Gate (x:0, y:16, z:-170)
  stargateGroup = new THREE.Group();
  stargateGroup.position.set(0, 16, -170);

  const gateGeo = new THREE.TorusGeometry(11, 0.5, 16, 64);
  const gateMat = new THREE.MeshStandardMaterial({
    color: 0x38BDF8,
    emissive: 0x38BDF8,
    emissiveIntensity: 1.2,
    roughness: 0.1
  });
  const gateMesh = new THREE.Mesh(gateGeo, gateMat);
  stargateGroup.add(gateMesh);

  const gateCoreLight = new THREE.PointLight(0x38BDF8, 5.0, 70);
  stargateGroup.add(gateCoreLight);

  scene.add(stargateGroup);

  // ========================================================================
  // PROCEDURAL SAILING EXPLORATION SHIP
  // ========================================================================
  shipGroup = new THREE.Group();

  // Ship Hull
  const hullGeo = new THREE.ConeGeometry(2.0, 7.0, 5);
  hullGeo.rotateZ(Math.PI / 2);
  hullGeo.scale(1, 0.45, 0.75);
  const hullMat = new THREE.MeshStandardMaterial({
    color: 0x1E293B,
    roughness: 0.35,
    metalness: 0.65,
    flatShading: true
  });
  const hullMesh = new THREE.Mesh(hullGeo, hullMat);
  hullMesh.position.y = 0.4;
  shipGroup.add(hullMesh);

  // Deck Cabin
  const cabinGeo = new THREE.BoxGeometry(1.5, 0.9, 1.1);
  const cabinMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.3 });
  const cabinMesh = new THREE.Mesh(cabinGeo, cabinMat);
  cabinMesh.position.set(-0.8, 0.9, 0);
  shipGroup.add(cabinMesh);

  // Mast
  const mastGeo = new THREE.CylinderGeometry(0.06, 0.08, 5.2, 8);
  const mastMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.5 });
  const mastMesh = new THREE.Mesh(mastGeo, mastMat);
  mastMesh.position.set(0.6, 2.7, 0);
  shipGroup.add(mastMesh);

  // Billowing Main Sail
  const sailGeo = new THREE.PlaneGeometry(2.6, 3.0, 4, 4);
  const sailPos = sailGeo.attributes.position;
  for (let i = 0; i < sailPos.count; i++) {
    const vx = sailPos.getX(i);
    const vz = Math.sin((vx + 1.3) / 2.6 * Math.PI) * 0.42;
    sailPos.setZ(i, vz);
  }
  sailGeo.computeVertexNormals();
  const sailMat = new THREE.MeshStandardMaterial({
    color: 0xF8FAFC,
    roughness: 0.6,
    side: THREE.DoubleSide
  });
  sailMesh = new THREE.Mesh(sailGeo, sailMat);
  sailMesh.position.set(0.6, 3.1, 0.25);
  sailMesh.rotation.y = 0.15;
  shipGroup.add(sailMesh);

  // Ship Lantern Light
  const lantern = new THREE.PointLight(0xF59E0B, 2.2, 10);
  lantern.position.set(2.8, 1.2, 0);
  shipGroup.add(lantern);

  scene.add(shipGroup);

  // Wave height calculation helper
  function getWaveHeight(x, z, t) {
    return Math.sin(x * 0.08 + t * 1.4) * 1.25 +
           Math.cos(z * 0.10 + t * 1.1) * 1.10 +
           Math.sin((x + z) * 0.06 + t * 0.8) * 0.60;
  }

  // ========================================================================
  // SMOOTH VOYAGE WAYPOINT CHECKPOINTS
  // ========================================================================
  const voyageWaypoints = [
    { s: 0.00, x: 0.0,   z: 16.0,   label: "PORT OF DHARWAD (READY TO EMBARK)" },
    { s: 0.14, x: 4.5,   z: 0.0,    label: "SAILING: HEADING TO ISLAND 01 (18 KNOTS)" },
    { s: 0.28, x: 8.5,   z: -19.0,  label: "DOCKED: PORT OF ARID MONOLITHS (ISLAND 01)" },
    { s: 0.42, x: -2.0,  z: -44.0,  label: "SAILING: CROSSING ARCHIPELAGO STRAITS" },
    { s: 0.56, x: -10.5, z: -67.0,  label: "DOCKED: CYBER-BAY MARINA (ISLAND 02)" },
    { s: 0.70, x: 2.0,   z: -92.0,  label: "SAILING: CROSSING CARNIVAL REEF" },
    { s: 0.82, x: 10.0,  z: -115.0, label: "DOCKED: GRAND LAGOON WHARF (ISLAND 03)" },
    { s: 0.96, x: 0.0,   z: -155.0, label: "ASCENDING: HACK2FUTURE ORBIT STATION" }
  ];

  function getVoyagePosition(scrollPct) {
    const s = Math.max(0, Math.min(1, scrollPct));
    let i = 0;
    while (i < voyageWaypoints.length - 1 && s > voyageWaypoints[i + 1].s) {
      i++;
    }
    if (i >= voyageWaypoints.length - 1) {
      const last = voyageWaypoints[voyageWaypoints.length - 1];
      return { x: last.x, z: last.z, label: last.label };
    }
    const wpA = voyageWaypoints[i];
    const wpB = voyageWaypoints[i + 1];
    const span = Math.max(0.001, wpB.s - wpA.s);
    let ratio = (s - wpA.s) / span;
    // Smoothstep easing
    ratio = ratio * ratio * (3 - 2 * ratio);

    const x = wpA.x + (wpB.x - wpA.x) * ratio;
    const z = wpA.z + (wpB.z - wpA.z) * ratio;
    const label = ratio > 0.5 ? wpB.label : wpA.label;
    return { x, z, label };
  }

  // Mouse Parallax
  let targetCamX = 0;
  let targetCamY = 11;
  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetCamX = normX * 3.5;
    targetCamY = 11 + normY * 1.5;
  });

  // Animation Loop
  const clock = new THREE.Clock();
  const telemetryEl = document.getElementById('logpose-telemetry');

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // 1. Dynamic Wave Vertex Displacement
    const pos = oceanGeometry.attributes.position.array;
    for (let i = 0; i < posAttr.count; i++) {
      const idx = i * 3;
      const ox = originalPositions[idx];
      const oz = originalPositions[idx + 2];
      pos[idx + 1] = getWaveHeight(ox, oz, t);
    }
    oceanGeometry.attributes.position.needsUpdate = true;
    oceanGeometry.computeVertexNormals();

    // 2. Track Page Scroll & Move Ship along Voyage Checkpoints
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollPct = window.scrollY / maxScroll;
    const voyage = getVoyagePosition(scrollPct);

    // Live Telemetry Label update
    if (telemetryEl && telemetryEl.innerText !== voyage.label) {
      telemetryEl.innerText = voyage.label;
    }

    const prevX = shipGroup.position.x;
    const prevZ = shipGroup.position.z;

    shipGroup.position.x += (voyage.x - shipGroup.position.x) * 0.08;
    shipGroup.position.z += (voyage.z - shipGroup.position.z) * 0.08;

    const sx = shipGroup.position.x;
    const sz = shipGroup.position.z;
    const currentWaveY = oceanMesh.position.y + getWaveHeight(sx, sz, t);
    shipGroup.position.y += (currentWaveY - shipGroup.position.y) * 0.15;

    // Pitch & Roll based on local wave slope
    const delta = 0.5;
    const hFront = getWaveHeight(sx + delta, sz, t);
    const hBack  = getWaveHeight(sx - delta, sz, t);
    const hRight = getWaveHeight(sx, sz + delta, t);
    const hLeft  = getWaveHeight(sx, sz - delta, t);

    const pitch = Math.atan2(hFront - hBack, delta * 2);
    const roll  = Math.atan2(hRight - hLeft, delta * 2);

    shipGroup.rotation.z = -pitch * 0.65;
    shipGroup.rotation.x = roll * 0.65;

    // Automatic ship heading in direction of travel
    const moveDX = shipGroup.position.x - prevX;
    const moveDZ = shipGroup.position.z - prevZ;
    const moveDist = Math.hypot(moveDX, moveDZ);
    if (moveDist > 0.002) {
      const targetHeading = Math.atan2(moveDX, -moveDZ) - Math.PI / 2;
      shipGroup.rotation.y += (targetHeading - shipGroup.rotation.y) * 0.08;
    } else {
      // Resting sway at dock
      shipGroup.rotation.y = -Math.PI / 2 + Math.sin(t * 0.7) * 0.08;
    }

    // Billow Sail gently
    sailMesh.rotation.y = 0.15 + Math.sin(t * 2.4) * 0.05;

    // Rotate Stargate ring & Hologram ring
    if (stargateGroup) {
      stargateGroup.rotation.z += 0.006;
      stargateGroup.rotation.y += 0.004;
    }
    if (panRing) {
      panRing.rotation.z += 0.01;
    }

    // Smooth Camera Tracking (Frames ship and destination island)
    const targetCamPosZ = shipGroup.position.z + 24;
    camera.position.x += ((shipGroup.position.x * 0.35 + targetCamX) - camera.position.x) * 0.04;
    camera.position.y += ((shipGroup.position.y + 10.5 + targetCamY) - camera.position.y) * 0.04;
    camera.position.z += (targetCamPosZ - camera.position.z) * 0.04;
    camera.lookAt(shipGroup.position.x, shipGroup.position.y + 0.5, shipGroup.position.z - 8);

    renderer.render(scene, camera);
  }

  animate();
}

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
