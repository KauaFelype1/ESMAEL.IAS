// ===== CURSOR CUSTOMIZADO =====
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

if (cursor && cursorDot) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.12;
    cursorY += (mouseY - cursorY) * 0.12;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

// ===== CANVAS DE PARTÍCULAS =====
const canvas = document.getElementById('bgCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const PARTICLE_COUNT = 60;

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(124, 58, 237, ${p.opacity})`;
      ctx.fill();
    });
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(124, 58, 237, ${0.08 * (1 - dist/120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }

  initParticles();
  drawParticles();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  });
}

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) link.classList.add('active');
    });
  });
}

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.querySelector('.nav-links');

if (hamburger && navLinksEl) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinksEl.style.display === 'flex';
    navLinksEl.style.display = isOpen ? 'none' : 'flex';
    if (!isOpen) {
      Object.assign(navLinksEl.style, {
        flexDirection: 'column', position: 'absolute',
        top: '70px', right: '1.5rem',
        background: 'rgba(10,10,15,0.98)',
        padding: '1.5rem', borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.07)',
        gap: '1.2rem', zIndex: '200',
      });
    }
  });
}

// ===== TERMINAL ANIMADO =====
const terminalOutput = document.getElementById('terminalOutput');
if (terminalOutput) {
  const outputs = [
    'Iniciando aprendizado...', 'Trilha criada com sucesso!',
    'Pronto para o primeiro desafio!', 'Aprendendo juntos! 🚀', 'Bem-vindo, futuro dev!',
  ];
  let outputIndex = 0;
  setInterval(() => {
    outputIndex = (outputIndex + 1) % outputs.length;
    terminalOutput.style.opacity = '0';
    setTimeout(() => {
      terminalOutput.textContent = outputs[outputIndex];
      terminalOutput.style.opacity = '1';
      terminalOutput.style.transition = 'opacity 0.4s ease';
    }, 300);
  }, 2500);
}

// ===== REVEAL ON SCROLL =====
const revealEls = document.querySelectorAll('.lang-card, .path-node, .feature-list li');
if (revealEls.length > 0) {
  revealEls.forEach(el => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 80 * i);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => observer.observe(el));
}

// ===== HOVER GLOW NAS CARDS =====
document.querySelectorAll('.lang-card').forEach(card => {
  const color = card.dataset.color;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    const bg = card.querySelector('.lang-card-bg');
    if (bg) bg.style.background = `radial-gradient(circle at ${x}% ${y}%, ${color}18, transparent 70%)`;
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

console.log('%c🚀 ESMAEL.IAS', 'font-size: 2rem; font-weight: bold; color: #a855f7;');
console.log('%cBem-vindo! Escolha uma linguagem e comece sua jornada.', 'color: #9898b8;');