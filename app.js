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
  try { initWebGLOcean(); } catch(e) { console.warn('WebGL Ocean error', e); }
  try { initAdaptiveSoundscape(); } catch(e) { console.warn('Audio error', e); }
  try { initHolographicPass(); } catch(e) { console.warn('Pass error', e); }
  try { renderAllEvents(); } catch(e) { console.warn('Events render error', e); }
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

      return `
        <div class="apple-reveal island-atoll-card flex flex-col justify-between group">
          <div>
            <div class="relative aspect-video overflow-hidden rounded-t-[22px]">
              <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
              <div class="absolute inset-0 bg-gradient-to-t from-[#0D101A] via-transparent to-transparent"></div>
              
              <div class="absolute top-3 left-3">
                <span class="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-black/75 border border-white/20 text-white backdrop-blur-md">
                  ${event.category}
                </span>
              </div>

              <div class="absolute bottom-2 right-3">
                <span class="bounty-tag text-[11px] shadow-lg">
                  ${event.totalBounty || event.bounty}
                </span>
              </div>
            </div>

            <div class="p-5">
              <div class="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
                <i data-lucide="shield" class="w-3 h-3 text-amber-400"></i>
                <span>${event.club || 'IIIT Dharwad'}</span>
              </div>
              
              <h4 class="font-display font-bold text-lg text-white mb-2 group-hover:text-amber-400 transition-colors">
                ${event.title}
              </h4>
              
              <p class="text-xs text-slate-300 font-body line-clamp-2 mb-4 leading-relaxed">
                ${event.summary}
              </p>

              ${event.sponsors && event.sponsors.length > 0 ? `
                <div class="p-2 rounded-xl bg-white/5 border border-white/5 mb-4 text-[10px] font-mono flex items-center justify-between text-slate-300">
                  <span class="text-slate-400">Partner:</span>
                  <span class="text-sky-300 font-semibold">${event.sponsors[0].name}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <div class="p-5 pt-0">
            <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span class="flex items-center gap-1.5">
                <i data-lucide="clock" class="w-3.5 h-3.5 text-amber-400"></i>
                ${event.time.split('-')[0].trim()}
              </span>
              
              <a href="${eventPageUrl}" class="px-3 py-1.5 rounded-full bg-white/10 hover:bg-amber-500 hover:text-black text-amber-400 font-bold transition-all flex items-center gap-1">
                <span>Dossier & QR</span>
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
   THREE.JS 3D PROCEDURAL OCEAN & SAILING SHIP ENGINE
   ========================================================================== */
function initWebGLOcean() {
  const container = document.getElementById('webgl-ocean-container');
  if (!container || typeof THREE === 'undefined') return;

  let scene, camera, renderer, oceanMesh, oceanGeometry, originalPositions, shipGroup, sailMesh, dirLight, oceanMaterial;

  try {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05060A, 0.018);

    camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 11, 26);
    camera.lookAt(0, -1, 0);

    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
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

  dirLight = new THREE.DirectionalLight(0xF59E0B, 2.4);
  dirLight.position.set(20, 35, 18);
  scene.add(dirLight);

  const fillLight = new THREE.PointLight(0x38BDF8, 2.0, 60);
  fillLight.position.set(-18, 12, 10);
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

  // Procedural Ocean Geometry (Flat-shaded low-poly wave mesh)
  const oceanWidth = 140;
  const oceanHeight = 140;
  const segments = 64;
  oceanGeometry = new THREE.PlaneGeometry(oceanWidth, oceanHeight, segments, segments);
  oceanGeometry.rotateX(-Math.PI / 2);

  const posAttr = oceanGeometry.attributes.position;
  originalPositions = new Float32Array(posAttr.array);

  oceanMaterial = new THREE.MeshStandardMaterial({
    color: 0x081326,
    roughness: 0.2,
    metalness: 0.85,
    flatShading: true,
    wireframe: false
  });

  oceanMesh = new THREE.Mesh(oceanGeometry, oceanMaterial);
  oceanMesh.position.y = -6.5;
  scene.add(oceanMesh);

  // Procedural Exploration Sailing Ship
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
    return Math.sin(x * 0.10 + t * 1.5) * 1.25 +
           Math.cos(z * 0.12 + t * 1.2) * 1.10 +
           Math.sin((x + z) * 0.08 + t * 0.9) * 0.65;
  }

  // Mouse Parallax
  let targetCamX = 0;
  let targetCamY = 11;
  window.addEventListener('mousemove', (e) => {
    const normX = (e.clientX / window.innerWidth) * 2 - 1;
    const normY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetCamX = normX * 4;
    targetCamY = 11 + normY * 1.8;
  });

  // Animation Loop
  const clock = new THREE.Clock();
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

    // 2. Position Ship on Waves & Track Page Scroll
    const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
    const scrollPct = window.scrollY / maxScroll;

    const targetShipX = -12 + scrollPct * 24;
    const targetShipZ = 7 - scrollPct * 15;
    shipGroup.position.x += (targetShipX - shipGroup.position.x) * 0.05;
    shipGroup.position.z += (targetShipZ - shipGroup.position.z) * 0.05;

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
    shipGroup.rotation.y = -Math.PI / 2 + Math.sin(t * 0.7) * 0.08 + (scrollPct * 0.35);

    // Billow Sail gently
    sailMesh.rotation.y = 0.15 + Math.sin(t * 2.4) * 0.05;

    // Smooth Camera Follow
    camera.position.x += (targetCamX - camera.position.x) * 0.03;
    camera.position.y += (targetCamY - camera.position.y) * 0.03;
    camera.lookAt(shipGroup.position.x * 0.3, -1, shipGroup.position.z * 0.3);

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
