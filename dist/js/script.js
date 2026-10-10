
/**
 * Portfolio JavaScript — Nabil Qualita Akhsan
 * Visual Reference: Honkai: Star Rail Aesthetic (Clean & Professional)
 * Essential Features: Interactive Starfield Canvas, Theme Switcher, Copy Email, Form Handling, Smooth UI
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Interactive Cosmic Starfield Canvas
     ========================================================================== */
  const canvas = document.getElementById('starfieldCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    window.addEventListener('mousemove', (e) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    });

    // Star Generation
    const stars = [];
    const starCount = Math.min(150, Math.floor((width * height) / 9000));
    const colors = ['#ffffff', '#dfab52', '#67e8f9', '#f7d27f', '#cbd5e1'];

    function initStars() {
      stars.length = 0;
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.7 + 0.3,
          twinkleSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          speedX: (Math.random() - 0.5) * 0.12,
          speedY: (Math.random() - 0.5) * 0.12,
          depth: Math.random() * 2 + 1,
        });
      }
    }
    initStars();

    // Subtle Shooting Star (Warp Streak)
    let shootingStar = null;
    function spawnShootingStar() {
      if (shootingStar) return;
      shootingStar = {
        x: Math.random() * (width * 0.8),
        y: Math.random() * (height * 0.4),
        length: Math.random() * 90 + 60,
        speed: Math.random() * 7 + 8,
        angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2,
        opacity: 0.9,
      };
    }
    setInterval(spawnShootingStar, 8000);

    // Animation Loop
    function renderStarfield() {
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;
      const offsetX = (mouseX - width / 2) * 0.015;
      const offsetY = (mouseY - height / 2) * 0.015;

      ctx.clearRect(0, 0, width, height);

      const isLight = document.body.classList.contains('light-mode');

      // Render Stars
      stars.forEach((star) => {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 0.95 || star.alpha < 0.2) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const posX = star.x - offsetX * star.depth;
        const posY = star.y - offsetY * star.depth;

        // Dynamic star color adaptation for light mode (Solar Amber & Topaz Dust)
        let starColor = star.color;
        if (isLight) {
          if (star.color === '#ffffff') starColor = '#d49a2a';
          else if (star.color === '#dfab52' || star.color === '#f7d27f') starColor = '#b88526';
          else if (star.color === '#67e8f9') starColor = '#0284c7';
          else starColor = '#8b5cf6';
        }

        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = starColor;
        ctx.globalAlpha = isLight ? Math.max(0.18, Math.min(0.7, star.alpha * 0.8)) : Math.max(0, Math.min(1, star.alpha));
        ctx.fill();

        if (star.size > 1.3) {
          ctx.beginPath();
          ctx.arc(posX, posY, star.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = starColor;
          ctx.globalAlpha = isLight ? star.alpha * 0.18 : star.alpha * 0.2;
          ctx.fill();
        }
      });

      // Render Shooting Star
      if (shootingStar) {
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.globalAlpha = isLight ? shootingStar.opacity * 0.85 : shootingStar.opacity;

        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length;

        const grad = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y);
        if (isLight) {
          grad.addColorStop(0, 'rgba(184, 133, 38, 0)');
          grad.addColorStop(0.7, 'rgba(212, 154, 42, 0.7)');
          grad.addColorStop(1, '#0284c7');
        } else {
          grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
          grad.addColorStop(0.7, 'rgba(223, 171, 82, 0.5)');
          grad.addColorStop(1, '#ffffff');
        }

        ctx.strokeStyle = grad;
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.stroke();

        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.opacity -= 0.015;

        if (shootingStar.opacity <= 0 || shootingStar.x > width || shootingStar.y > height) {
          shootingStar = null;
        }
        ctx.restore();
      }

      ctx.globalAlpha = 1;
      requestAnimationFrame(renderStarfield);
    }
    renderStarfield();
  }

  /* ==========================================================================
     2. Dynamic Footer Year
     ========================================================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     3. Navbar Scroll Class
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  /* ==========================================================================
     4. Dark / Light Mode Switcher
     ========================================================================== */
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
  } else {
    body.classList.remove('light-mode');
    if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      if (themeIcon) {
        themeIcon.className = isLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    });
  }

  /* ==========================================================================
     5. Mobile Menu Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  /* ==========================================================================
     6. Active Section Highlighting
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-item-link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(sec => observer.observe(sec));
  }

  /* ==========================================================================
     7. 1-Click Copy Email to Clipboard
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'nabilqualitaakhsan@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyEmailBtn.innerHTML;
        copyEmailBtn.classList.add('copied');
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';

        setTimeout(() => {
          copyEmailBtn.classList.remove('copied');
          copyEmailBtn.innerHTML = originalText;
        }, 2200);
      }).catch(err => {
        console.error('Gagal menyalin email:', err);
      });
    });
  }

  /* ==========================================================================
     8. Coffee Support Modal (QRIS)
     ========================================================================== */
  const floatingCoffeeBtn = document.getElementById('floatingCoffeeBtn');
  const supportModal = document.getElementById('supportModal');
  const closeSupportBtn = document.getElementById('closeSupportBtn');

  function openSupportModal() {
    if (supportModal) {
      supportModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeSupportModal() {
    if (supportModal) {
      supportModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (floatingCoffeeBtn) {
    floatingCoffeeBtn.addEventListener('click', openSupportModal);
  }

  if (closeSupportBtn) {
    closeSupportBtn.addEventListener('click', closeSupportModal);
  }

  if (supportModal) {
    supportModal.addEventListener('click', (e) => {
      if (e.target === supportModal) {
        closeSupportModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && supportModal && supportModal.classList.contains('active')) {
      closeSupportModal();
    }
  });

  /* ==========================================================================
     9. Formspree Contact Form Submission
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const transmitBtn = document.getElementById('transmitBtn');

  if (contactForm && formStatus && transmitBtn) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const originalBtnHTML = transmitBtn.innerHTML;
      transmitBtn.disabled = true;
      transmitBtn.innerHTML = '<span>Mengirim Pesan...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
      formStatus.innerHTML = '';

      const formData = new FormData(contactForm);

      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          formStatus.innerHTML = '<span style="color:#67e8f9;"><i class="fa-solid fa-circle-check"></i> Pesan berhasil dikirim ke Nabil! Terima kasih.</span>';
          contactForm.reset();
        } else {
          const data = await response.json();
          if (Object.hasOwn(data, 'errors')) {
            formStatus.innerHTML = `<span style="color:#f43f5e;"><i class="fa-solid fa-triangle-exclamation"></i> ${data["errors"].map(error => error["message"]).join(", ")}</span>`;
          } else {
            formStatus.innerHTML = '<span style="color:#f43f5e;"><i class="fa-solid fa-triangle-exclamation"></i> Gagal mengirim pesan. Silakan hubungi via email langsung.</span>';
          }
        }
      } catch (error) {
        formStatus.innerHTML = '<span style="color:#f43f5e;"><i class="fa-solid fa-triangle-exclamation"></i> Terjadi kesalahan jaringan. Periksa koneksi internet Anda.</span>';
      } finally {
        transmitBtn.disabled = false;
        transmitBtn.innerHTML = originalBtnHTML;
      }
    });
  }

  /* ==========================================================================
     10. Subtle 3D Card Hover Perspective & Holographic Tilt
     ========================================================================== */
  const interactiveCards = document.querySelectorAll('.work-card, .capability-card, .achievement-card, .channel-card');
  interactiveCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ==========================================================================
     11. Initialize AOS (Animate On Scroll)
     ========================================================================== */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 40,
    });
  }

});
