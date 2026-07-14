const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('translate-x-full');
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('translate-x-full');
    });
  });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');
const submitBtnHtml = submitBtn
  ? submitBtn.innerHTML
  : '';

if (contactForm) {
  const formspreeEndpoint = contactForm.getAttribute('action');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!formspreeEndpoint) {
      alert('No se pudo enviar el mensaje. Intenta más tarde.');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Enviando...</span>
      `;
    }

    const serviceSelect = document.getElementById('service');
    const serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
    const formData = new FormData();
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email').value);
    formData.append('service', serviceText);
    formData.append('message', document.getElementById('message').value);

    fetch(formspreeEndpoint, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' }
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            if (data.errors) {
              throw new Error(data.errors.map(err => err.message).join(', '));
            }
            throw new Error('Error al enviar el formulario');
          });
        }

        contactForm.classList.add('hidden');
        successMessage.classList.remove('hidden');

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtnHtml;
        }

        setTimeout(() => {
          contactForm.classList.remove('hidden');
          successMessage.classList.add('hidden');
          contactForm.reset();
        }, 3000);
      })
      .catch(() => {
        alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente o escríbeme a beydafentanes.studio@gmail.com');

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitBtnHtml;
        }
      });
  });
}

const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (!navbar) return;
  navbar.style.boxShadow = window.pageYOffset > 100
    ? '0 4px 20px rgba(0, 0, 0, 0.1)'
    : 'none';
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.service-card, .project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  revealObserver.observe(card);
});

const statsSection = document.querySelector('.py-20.px-6.bg-black');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateStats();
    }
  });
}, { threshold: 0.5 });

if (statsSection) {
  statsObserver.observe(statsSection);
}

function animateStats() {
  const stats = [
    { element: document.querySelector('.py-20 .text-5xl'), target: 7, suffix: '+' },
    { element: document.querySelectorAll('.py-20 .text-5xl')[1], target: 100, suffix: '%' },
    { element: document.querySelectorAll('.py-20 .text-5xl')[2], target: 30, suffix: '+' },
    { element: document.querySelectorAll('.py-20 .text-5xl')[3], target: 3, suffix: '-' }
  ];

  stats.forEach(stat => {
    if (!stat.element) return;

    let current = 0;
    const increment = stat.target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.target) {
        current = stat.target;
        clearInterval(timer);
      }
      stat.element.textContent = Math.floor(current) + stat.suffix;
    }, 30);
  });
}

document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.zIndex = '10';
  });

  card.addEventListener('mouseleave', function () {
    this.style.zIndex = '1';
  });
});

document.querySelectorAll('.project-card > div').forEach(card => {
  const overlay = document.createElement('div');
  overlay.className = 'project-overlay absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500';
  card.style.position = 'relative';
  card.appendChild(overlay);
});

document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mouseenter', function () {
    this.style.transform = 'translateY(-2px) scale(1.02)';
  });

  btn.addEventListener('mouseleave', function () {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

document.addEventListener('mousemove', (e) => {
  const shapes = document.querySelectorAll('.geometric-shape');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  shapes.forEach((shape, index) => {
    const speed = (index + 1) * 0.5;
    const x = (mouseX - 0.5) * speed * 20;
    const y = (mouseY - 0.5) * speed * 20;
    shape.style.transform = `translate(${x}px, ${y}px)`;
  });
});

const wisecostCard = document.getElementById('wisecost-card');
if (wisecostCard) {
  wisecostCard.addEventListener('click', () => {
    alert('Por cuestiones de privacidad, esta página está restringida');
  });
}
