// ===== NAVBAR =====
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

// ===== TEMA WARNA =====
function setTheme(tema, btn) {
  document.body.className = 'theme-' + tema;
  document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  localStorage.setItem('af-theme', tema);
}

const temaTersimpan = localStorage.getItem('af-theme');
if (temaTersimpan) {
  document.body.className = 'theme-' + temaTersimpan;
  const btn = document.querySelector(`[data-theme="${temaTersimpan}"]`);
  if (btn) {
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
  }
}

// ===== FOOTER SEARCH =====
const footerPages = [
  { label:'Home',    icon:'fa-house',      href:'index.html#home'     },
  { label:'About Me',icon:'fa-user',        href:'index.html#about'    },
  { label:'Target',  icon:'fa-bullseye',    href:'index.html#target'   },
  { label:'Skills',  icon:'fa-code',        href:'index.html#skills'   },
  { label:'My Work', icon:'fa-folder-open', href:'index.html#projects' },
  { label:'Contact', icon:'fa-envelope',    href:'contact.html'        },
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
    if (box) box.classList.remove('show');
  }
});

// ===== EMAILJS =====
const EMAILJS_PUBLIC_KEY  = 'GANTI_PUBLIC_KEY_ANDA';
const EMAILJS_SERVICE_ID  = 'GANTI_SERVICE_ID_ANDA';
const EMAILJS_TEMPLATE_ID = 'GANTI_TEMPLATE_ID_ANDA';

emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

function showToast(msg, isError = false) {
  const wrap = document.getElementById('toastWrap');
  const box  = document.getElementById('toastBox');
  const txt  = document.getElementById('toastMsg');
  const ico  = box.querySelector('i');
  txt.textContent = msg;
  box.classList.toggle('error-toast', isError);
  ico.className = isError ? 'ti ti-alert-circle' : 'ti ti-circle-check';
  wrap.classList.add('show');
  setTimeout(() => wrap.classList.remove('show'), 4000);
}

function clearErrors() {
  ['err-name','err-email','err-subject','err-msg'].forEach(id => {
    document.getElementById(id).classList.remove('show');
  });
  ['fname','femail','fsubject','fmessage'].forEach(id => {
    document.getElementById(id).classList.remove('error-field');
  });
}

document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  clearErrors();

  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const msg     = document.getElementById('fmessage').value.trim();
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  if (!name)                    { document.getElementById('err-name').classList.add('show');    document.getElementById('fname').classList.add('error-field');    valid = false; }
  if (!email || !emailRe.test(email)) { document.getElementById('err-email').classList.add('show');   document.getElementById('femail').classList.add('error-field');   valid = false; }
  if (!subject)                 { document.getElementById('err-subject').classList.add('show'); document.getElementById('fsubject').classList.add('error-field'); valid = false; }
  if (!msg)                     { document.getElementById('err-msg').classList.add('show');     document.getElementById('fmessage').classList.add('error-field'); valid = false; }
  if (!valid) return;

  const btn     = document.getElementById('sendBtn');
  const btnText = document.getElementById('btnText');
  btn.disabled  = true;
  btnText.textContent = 'Mengirim...';
  btn.querySelector('i').className = 'ti ti-loader';

  try {
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this);
    btnText.textContent = 'Terkirim!';
    btn.querySelector('i').className = 'ti ti-check';
    showToast('Pesan berhasil terkirim! 🎉');
    this.reset();
    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'Send Message';
      btn.querySelector('i').className = 'ti ti-send';
    }, 3500);
  } catch (err) {
    console.error('EmailJS error:', err);
    btnText.textContent = 'Gagal Terkirim';
    btn.querySelector('i').className = 'ti ti-alert-circle';
    showToast('Pengiriman gagal. Coba lagi.', true);
    setTimeout(() => {
      btn.disabled = false;
      btnText.textContent = 'Send Message';
      btn.querySelector('i').className = 'ti ti-send';
    }, 3000);
  }
});