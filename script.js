//  LOADING SCREEN 
const loadingScreen = document.getElementById('loadingScreen');
const loadingBar    = document.getElementById('loadingBar');
const loadingPct    = document.getElementById('loadingPct');

let pct = 0;
const loadingInterval = setInterval(() => {
  pct += Math.random() * 20;
  if (pct >= 100) {
    pct = 100;
    clearInterval(loadingInterval);
    setTimeout(() => {
      loadingScreen.classList.add('hide');
    }, 400);
  }
  loadingBar.style.width = pct + '%';
  loadingPct.textContent = Math.floor(pct) + '%';
}, 100);



// ===== FADE IN =====
const fadeEls = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
fadeEls.forEach(el => observer.observe(el));
setTimeout(() => document.querySelector('.hero-left').classList.add('visible'), 200);

// ===== SKILL BAR =====
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
        setTimeout(() => {
          bar.style.width = (parseFloat(bar.dataset.width) * 100) + '%';
          bar.classList.add('animate');
        }, i * 150);
      });
      skillObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.about-card').forEach(card => {
  skillObserver.observe(card);
  card.querySelectorAll('.skill-bar-fill').forEach(bar => bar.style.width = '0%');
});

// ===== CAROUSEL =====
const track   = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards   = track.querySelectorAll('.project-card');
let currentIndex = 0;
const maxIndex = cards.length - 3;

function updateCarousel() {
  const cardWidth = cards[0].getBoundingClientRect().width + 20;
  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}
prevBtn.addEventListener('click', () => { if (currentIndex > 0) currentIndex--; updateCarousel(); });
nextBtn.addEventListener('click', () => { if (currentIndex < maxIndex) currentIndex++; updateCarousel(); });
window.addEventListener('resize', updateCarousel);

// ===== NAVIGASI =====
const menuBtn         = document.getElementById('menuBtn');
const navDropdown     = document.getElementById('navDropdown');
const settingsBtn     = document.getElementById('settingsBtn');
const settingsPanel   = document.getElementById('settingsPanel');
const dropdownOverlay = document.getElementById('dropdownOverlay');

function closeAll() {
  navDropdown.classList.remove('open');
  settingsPanel.classList.remove('open');
  menuBtn.classList.remove('menu-open', 'active');
  settingsBtn.classList.remove('active');
  dropdownOverlay.classList.remove('active');
}

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const buka = !navDropdown.classList.contains('open');
  closeAll();
  if (buka) {
    navDropdown.classList.add('open');
    menuBtn.classList.add('menu-open', 'active');
    dropdownOverlay.classList.add('active');
  }
});

settingsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const buka = !settingsPanel.classList.contains('open');
  closeAll();
  if (buka) {
    settingsPanel.classList.add('open');
    settingsBtn.classList.add('active');
    dropdownOverlay.classList.add('active');
  }
});

dropdownOverlay.addEventListener('click', closeAll);
navDropdown.querySelectorAll('a').forEach(a => a.addEventListener('click', closeAll));

// ===== MODAL PROJECT =====
const projectModal  = document.getElementById('projectModal');
const projectIframe = document.getElementById('projectIframe');
const modalLoading  = document.getElementById('modalLoading');
const modalNoPreview= document.getElementById('modalNoPreview');
const modalUrlText  = document.getElementById('modalUrlText');

function openProject(url, title) {
  projectModal.classList.add('open');
  document.body.style.overflow = 'hidden';
  modalUrlText.textContent = url === '#' ? 'Coming soon...' : url;

  if (url === '#') {
    modalLoading.classList.add('hidden');
    modalNoPreview.classList.add('show');
    projectIframe.src = 'about:blank';
    return;
  }

  modalNoPreview.classList.remove('show');
  modalLoading.classList.remove('hidden');
  projectIframe.src = 'about:blank';
  setTimeout(() => { projectIframe.src = url; }, 80);
  projectIframe.onload = () => {
    if (projectIframe.src !== 'about:blank') modalLoading.classList.add('hidden');
  };
}

function closeProject() {
  projectModal.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    projectIframe.src = 'about:blank';
    modalLoading.classList.remove('hidden');
    modalNoPreview.classList.remove('show');
  }, 350);
}

document.getElementById('modalCloseBtn').addEventListener('click', closeProject);
projectModal.addEventListener('click', (e) => { if (e.target === projectModal) closeProject(); });

// ===== MODAL RECOUNT =====
function bukaRecount() {
  document.getElementById('recountOverlay').classList.add('aktif');
  document.body.style.overflow = 'hidden';
}
function tutupRecount() {
  document.getElementById('recountOverlay').classList.remove('aktif');
  document.body.style.overflow = '';
}
document.getElementById('recountOverlay').addEventListener('click', function(e) {
  if (e.target === this) tutupRecount();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') { closeProject(); tutupRecount(); }
});



// ===== ROBOT ANIMASI =====
// Deklarasi variabel robot dulu sebelum dipakai fungsi manapun
const robotSVG      = document.getElementById('robotSVG');
const robotHead     = document.getElementById('robotHead');
const eyePupilLeft  = document.getElementById('eyePupilLeft');
const eyePupilRight = document.getElementById('eyePupilRight');
const eyeShineLeft  = document.getElementById('eyeShineLeft');
const eyeShineRight = document.getElementById('eyeShineRight');
const eyeGlowLeft   = document.getElementById('eyeGlowLeft');
const eyeGlowRight  = document.getElementById('eyeGlowRight');
const antennaTip    = document.getElementById('antennaTip');
const reactorCore   = document.getElementById('reactorCore');
const scanLine      = document.getElementById('scanLine');
const laserDot      = document.getElementById('laserDot');
const robotWrapper  = document.querySelector('.robot-wrapper');

// ===== TEMA WARNA (setelah variabel robot dideklarasikan) =====
function setTheme(tema, btn) {
  document.body.className = 'theme-' + tema;
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  localStorage.setItem('af-theme', tema);
  updateRobotColors();
}

function updateRobotColors() {
  const style = getComputedStyle(document.body);
  const accent      = style.getPropertyValue('--accent').trim();
  const accentLight = style.getPropertyValue('--accent-light').trim();

  // Update semua stroke yang pakai warna accent lama
  document.querySelectorAll('#robotSVG [stroke]').forEach(el => {
    const stroke = el.getAttribute('stroke');
    if (stroke && (
      stroke.includes('7c3aed') || stroke.includes('a855f7') ||
      stroke.includes('1d4ed8') || stroke.includes('60a5fa') ||
      stroke.includes('dc2626') || stroke.includes('f87171') ||
      stroke.includes('059669') || stroke.includes('34d399')
    )) {
      if (stroke.includes('light') || stroke.includes('a855f7') || stroke.includes('60a5fa') || stroke.includes('f87171') || stroke.includes('34d399')) {
        el.setAttribute('stroke', accentLight);
      } else {
        el.setAttribute('stroke', accent);
      }
    }
  });

  // Update semua fill yang pakai warna accent lama
  document.querySelectorAll('#robotSVG [fill]').forEach(el => {
    const fill = el.getAttribute('fill');
    if (fill && (
      fill.includes('7c3aed') || fill.includes('1d4ed8') ||
      fill.includes('dc2626') || fill.includes('059669')
    )) {
      el.setAttribute('fill', accent);
    }
  });

  // Update teks AF di badan robot
  const afText = document.querySelector('#robotSVG text');
  if (afText) afText.setAttribute('fill', accent);

  // Update gradient mata
  const eyeGradStops = document.querySelectorAll('#eyeGrad stop');
  if (eyeGradStops.length >= 2) {
    eyeGradStops[0].setAttribute('stop-color', accentLight);
    eyeGradStops[1].setAttribute('stop-color', accent);
  }

  // Update reactor dan antena
  antennaTip.setAttribute('fill', 'url(#eyeGrad)');
  reactorCore.setAttribute('fill', accentLight);

  // Update border robot-ring (elemen HTML bukan SVG)
  document.querySelectorAll('.robot-ring').forEach(ring => {
    ring.style.borderColor = accent.replace(')', ', 0.3)').replace('rgb', 'rgba');
  });

  // Update glow background robot
  const glowBg = document.querySelector('.robot-glow-bg');
  if (glowBg) {
    glowBg.style.background = `radial-gradient(circle, ${accent}40 0%, transparent 70%)`;
  }

  // Update laser dot cursor
const laserDot = document.getElementById('laserDot');
if (laserDot) {
  laserDot.style.background = `radial-gradient(circle, ${accentLight}, ${accent})`;
  laserDot.style.boxShadow = `0 0 12px ${accent}, 0 0 24px ${accent}40`;
}

// Update warna stroke badan robot (semua rgba hardcode)
document.querySelectorAll('#robotSVG [stroke]').forEach(el => {
  const stroke = el.getAttribute('stroke');
  if (stroke && stroke.startsWith('rgba(124')) el.setAttribute('stroke', accent.replace(')', ', 0.3)').replace('rgb(', 'rgba('));
  if (stroke && stroke.startsWith('rgba(168')) el.setAttribute('stroke', accentLight.replace(')', ', 0.3)').replace('rgb(', 'rgba('));
});

// Update warna fill badan (rgba hardcode)
document.querySelectorAll('#robotSVG [fill]').forEach(el => {
  const fill = el.getAttribute('fill');
  if (fill && fill.startsWith('rgba(124,58,237')) {
    el.setAttribute('fill', fill.replace('124,58,237', getRGBFromHex(accent)));
  }
  if (fill && fill.startsWith('rgba(168,85,247')) {
    el.setAttribute('fill', fill.replace('168,85,247', getRGBFromHex(accentLight)));
  }
});
}

function getRGBFromHex(hex) {
  hex = hex.replace('#','');
  if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
  const r = parseInt(hex.substring(0,2), 16);
  const g = parseInt(hex.substring(2,4), 16);
  const b = parseInt(hex.substring(4,6), 16);
  return `${r},${g},${b}`;
}

// Load tema tersimpan
const temaTersimpan = localStorage.getItem('af-theme');
if (temaTersimpan) {
  document.body.className = 'theme-' + temaTersimpan;
  const btn = document.querySelector(`[data-theme="${temaTersimpan}"]`);
  if (btn) {
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }
}
// Panggil setelah variabel robot sudah ada
updateRobotColors();

let headRot = 0, eyeLX = 122, eyeLY = 112, eyeRX = 178, eyeRY = 112, bodyTilt = 0;
let isNearRobot = false, scanY = 95, scanDir = 1, antennaFlash = 0, reactorPulse = 0;
let mouseX = 0, mouseY = 0, roboCX = 0, roboCY = 0;

function updateRobotCenter() {
  const r = robotWrapper.getBoundingClientRect();
  roboCX = r.left + r.width / 2;
  roboCY = r.top  + r.height / 2;
}
updateRobotCenter();
window.addEventListener('resize', updateRobotCenter);
window.addEventListener('scroll', updateRobotCenter);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX; mouseY = e.clientY;
  const r = robotSVG.getBoundingClientRect();
  const diAtas = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
  if (diAtas) {
    laserDot.style.display = 'block';
    laserDot.style.left = (e.clientX - r.left) + 'px';
    laserDot.style.top  = (e.clientY - r.top)  + 'px';
  } else {
    laserDot.style.display = 'none';
  }
  isNearRobot = Math.hypot(e.clientX - roboCX, e.clientY - roboCY) < 300;
});

document.addEventListener('click', () => {
  antennaFlash = 1;
  laserDot.style.width = '20px'; laserDot.style.height = '20px';
  setTimeout(() => { laserDot.style.width = '12px'; laserDot.style.height = '12px'; }, 180);
});

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

function animateRobot() {
  updateRobotCenter();
  const dx = mouseX - roboCX;
  headRot  = lerp(headRot,  clamp((dx / window.innerWidth) * 36, -18, 18), 0.06);
  bodyTilt = lerp(bodyTilt, clamp((dx / window.innerWidth) * 6,  -3,  3),  0.04);
  robotHead.style.transform = `rotate(${headRot}deg)`;
  robotSVG.style.transform = `translateY(${Math.sin(Date.now() / 900) * 8 - 4}px) rotate(${bodyTilt}deg)`;

  const r    = robotSVG.getBoundingClientRect();
  const svgX = (mouseX - r.left) / r.width;
  const svgY = (mouseY - r.top)  / r.height;
  eyeLX = lerp(eyeLX, clamp(122 + (svgX - 0.5) * 16, 114, 130), 0.08);
  eyeLY = lerp(eyeLY, clamp(112 + (svgY - 0.35) * 10, 106, 118), 0.08);
  eyeRX = lerp(eyeRX, clamp(178 + (svgX - 0.5) * 16, 170, 186), 0.08);
  eyeRY = lerp(eyeRY, clamp(112 + (svgY - 0.35) * 10, 106, 118), 0.08);
  eyePupilLeft.setAttribute('cx', eyeLX);  eyePupilLeft.setAttribute('cy', eyeLY);
  eyeShineLeft.setAttribute('cx', eyeLX + 3); eyeShineLeft.setAttribute('cy', eyeLY - 3);
  eyePupilRight.setAttribute('cx', eyeRX); eyePupilRight.setAttribute('cy', eyeRY);
  eyeShineRight.setAttribute('cx', eyeRX + 3); eyeShineRight.setAttribute('cy', eyeRY - 3);

  const proximity = clamp(1 - Math.hypot(mouseX - roboCX, mouseY - roboCY) / 500, 0, 1);
  eyeGlowLeft.setAttribute('opacity',  0.5 + proximity * 0.5);
  eyeGlowRight.setAttribute('opacity', 0.5 + proximity * 0.5);

  const warnaMata = isNearRobot ? '#ff79f9' : '#c084fc';
  eyePupilLeft.setAttribute('fill', warnaMata);
  eyePupilRight.setAttribute('fill', warnaMata);

  scanY += scanDir * 0.4;
  if (scanY > 127) scanDir = -1;
  if (scanY < 97)  scanDir =  1;
  scanLine.setAttribute('y', scanY);

  if (antennaFlash > 0) {
    antennaTip.setAttribute('fill', '#ff79f9');
    antennaTip.setAttribute('r', 9);
    antennaFlash -= 0.06;
  } else {
    antennaTip.setAttribute('fill', 'url(#eyeGrad)');
    antennaTip.setAttribute('r', 7);
  }

  reactorPulse += 0.05;
  const rp = Math.sin(reactorPulse);
  reactorCore.setAttribute('r', 5 + rp * 2);
  reactorCore.setAttribute('opacity', 0.7 + rp * 0.3);

  requestAnimationFrame(animateRobot);
}
animateRobot();

// ===== HIGHLIGHT NAV AKTIF =====
const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('.nav-dropdown a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => { if (window.scrollY >= sec.offsetTop - 100) current = sec.id; });
  navLinks.forEach(a => {
    a.style.borderLeftColor = 'transparent';
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) a.style.color = 'var(--white)';
  });
});


//FOOTER
 const footerPages = [
    { label:'Home',        icon:'fa-house',       href:'#home'     },
    { label:'About Me',    icon:'fa-user',         href:'#about'    },
    { label:'Target',      icon:'fa-bullseye',     href:'#about'    },
    { label:'Skills',      icon:'fa-code',         href:'#skills'   },
    { label:'My Work',     icon:'fa-folder-open',  href:'#projects' },
    { label:'HTML',        icon:'fa-code',         href:'#skills'   },
    { label:'CSS',         icon:'fa-paint-brush',  href:'#skills'   },
    { label:'JavaScript',  icon:'fa-js',           href:'#skills'   },
    { label:'Bootstrap',   icon:'fa-bootstrap',    href:'#skills'   },
    { label:'Tailwind CSS',icon:'fa-wind',         href:'#skills'   },
    { label:'Landing Page',icon:'fa-rocket',       href:'#projects' },
    { label:'Portfolio V1',icon:'fa-user-tie',     href:'#projects' },
    { label:'Web Agency',  icon:'fa-globe',        href:'#projects' },
    { label:'Dashboard UI',icon:'fa-chart-bar',    href:'#projects' },
    { label:'E-Commerce',  icon:'fa-shopping-bag', href:'#projects' },
  ];
 
  function footerSearch(q) {
    const box = document.getElementById('footerSearchResults');
    q = q.trim().toLowerCase();
    if (!q) { box.classList.remove('show'); box.innerHTML = ''; return; }
 
    const hits = footerPages.filter(p => p.label.toLowerCase().includes(q));
    if (!hits.length) {
      box.innerHTML = '<div class="footer-search-none">Tidak ditemukan </div>';
      box.classList.add('show');
      return;
    }
    box.innerHTML = hits.slice(0,5).map(p =>
      `<a class="footer-search-result" href="${p.href}">
        <i class="fas ${p.icon}"></i>${p.label}
      </a>`
    ).join('');
    box.classList.add('show');
  }
 
  document.addEventListener('click', e => {
    if (!e.target.closest('.footer-search')) {
      const box = document.getElementById('footerSearchResults');
      if (box) { box.classList.remove('show'); }
    }
  });

  // SMOOTH SCROLL dengan offset navbar
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navHeight = document.querySelector('nav').offsetHeight;
    // projects butuh offset lebih besar karena ada header + cards
    const extraOffset = this.getAttribute('href') === '#projects' ? 2 : 16;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - extraOffset;
    window.scrollTo({ top: targetTop, behavior: 'smooth' });
  });
});