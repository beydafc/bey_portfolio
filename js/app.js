// Default configuration
const defaultConfig = {
  agency_name: 'BEY\'S PORTFOLIO',
  hero_title: 'Creamos experiencias digitales',
  hero_subtitle: 'Desarrollo web & diseño de vanguardia para marcas que quieren destacar en el mundo digital',
  about_text: 'Somos un equipo apasionado de diseñadores y desarrolladores comprometidos con crear experiencias digitales excepcionales. Combinamos creatividad con tecnología de vanguardia para impulsar el éxito de nuestros clientes.',
  contact_email: 'hola@nexus.studio',
  background_color: '#ffffff',
  surface_color: '#fafafa',
  text_color: '#000000',
  primary_action_color: '#ff3132',
  secondary_action_color: '#111111',
  font_family: 'Space Grotesk',
  font_size: 16
};

let config = { ...defaultConfig };

// Render function to update UI based on config
async function onConfigChange(cfg) {
  config = { ...defaultConfig, ...cfg };

  const customFont = config.font_family || defaultConfig.font_family;
  const baseFontStack = 'Space Grotesk, sans-serif';
  const syne = 'Syne, sans-serif';
  const baseSize = config.font_size || defaultConfig.font_size;

  // Update text content
  const heroTitle = document.getElementById('hero-title');
  if (heroTitle) {
    const titleParts = (config.hero_title || defaultConfig.hero_title).split(' ');
    if (titleParts.length >= 2) {
      heroTitle.innerHTML = `${titleParts[0]}<br><span class="text-stroke">${titleParts[1]}</span><br><span style="color: ${config.primary_action_color || defaultConfig.primary_action_color};">${titleParts.slice(2).join(' ') || 'digitales'}</span>`;
    }
    heroTitle.style.fontFamily = `${customFont}, ${syne}`;
    heroTitle.style.fontSize = `${baseSize * 4.5}px`;
  }

  const heroSubtitle = document.getElementById('hero-subtitle');
  if (heroSubtitle) {
    heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
    heroSubtitle.style.fontFamily = `${customFont}, ${baseFontStack}`;
    heroSubtitle.style.fontSize = `${baseSize * 1.25}px`;
  }

  const aboutText = document.getElementById('about-text');
  if (aboutText) {
    aboutText.textContent = config.about_text || defaultConfig.about_text;
    aboutText.style.fontFamily = `${customFont}, ${baseFontStack}`;
    aboutText.style.fontSize = `${baseSize * 1.125}px`;
  }

  const contactEmail = document.getElementById('contact-email');
  if (contactEmail) {
    contactEmail.textContent = config.contact_email || defaultConfig.contact_email;
    contactEmail.style.fontFamily = `${customFont}, ${baseFontStack}`;
  }

  // Update logos
  const navLogo = document.getElementById('nav-logo');
  const footerLogo = document.getElementById('footer-logo');
  const agencyName = config.agency_name || defaultConfig.agency_name;
  // If name contains a space, split by space; otherwise split in half
  let firstPart, secondPart;
  if (agencyName.includes(' ')) {
    const spaceIndex = agencyName.lastIndexOf(' ');
    firstPart = agencyName.substring(0, spaceIndex);
    secondPart = agencyName.substring(spaceIndex + 1);
  } else {
    const splitPoint = Math.ceil(agencyName.length / 2);
    firstPart = agencyName.substring(0, splitPoint);
    secondPart = agencyName.substring(splitPoint);
  }

  if (navLogo) {
    navLogo.innerHTML = `<span style="color: ${config.text_color || defaultConfig.text_color};">${firstPart}</span><span style="color: ${config.primary_action_color || defaultConfig.primary_action_color};">${secondPart}</span>`;
  }
  if (footerLogo) {
    footerLogo.innerHTML = `<span>${firstPart}</span><span style="color: ${config.primary_action_color || defaultConfig.primary_action_color};">${secondPart}</span>`;
  }

  // Update colors
  document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
  document.body.style.color = config.text_color || defaultConfig.text_color;

  // Update all elements with primary action color
  document.querySelectorAll('.btn-primary, [style*="background: #ff3132"]').forEach(el => {
    if (el.style.background) {
      el.style.background = config.primary_action_color || defaultConfig.primary_action_color;
    }
  });

  // Update font sizes for headings
  document.querySelectorAll('h2').forEach(el => {
    el.style.fontFamily = `${customFont}, ${syne}`;
    el.style.fontSize = `${baseSize * 3}px`;
  });

  document.querySelectorAll('h3').forEach(el => {
    el.style.fontFamily = `${customFont}, ${syne}`;
    el.style.fontSize = `${baseSize * 1.25}px`;
  });

  document.querySelectorAll('p').forEach(el => {
    el.style.fontFamily = `${customFont}, ${baseFontStack}`;
  });
}

// Map config to capabilities
function mapToCapabilities(cfg) {
  return {
    recolorables: [
      {
        get: () => cfg.background_color || defaultConfig.background_color,
        set: (value) => { cfg.background_color = value; window.elementSdk.setConfig({ background_color: value }); }
      },
      {
        get: () => cfg.surface_color || defaultConfig.surface_color,
        set: (value) => { cfg.surface_color = value; window.elementSdk.setConfig({ surface_color: value }); }
      },
      {
        get: () => cfg.text_color || defaultConfig.text_color,
        set: (value) => { cfg.text_color = value; window.elementSdk.setConfig({ text_color: value }); }
      },
      {
        get: () => cfg.primary_action_color || defaultConfig.primary_action_color,
        set: (value) => { cfg.primary_action_color = value; window.elementSdk.setConfig({ primary_action_color: value }); }
      },
      {
        get: () => cfg.secondary_action_color || defaultConfig.secondary_action_color,
        set: (value) => { cfg.secondary_action_color = value; window.elementSdk.setConfig({ secondary_action_color: value }); }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => cfg.font_family || defaultConfig.font_family,
      set: (value) => { cfg.font_family = value; window.elementSdk.setConfig({ font_family: value }); }
    },
    fontSizeable: {
      get: () => cfg.font_size || defaultConfig.font_size,
      set: (value) => { cfg.font_size = value; window.elementSdk.setConfig({ font_size: value }); }
    }
  };
}

// Map to edit panel values
function mapToEditPanelValues(cfg) {
  return new Map([
    ['agency_name', cfg.agency_name || defaultConfig.agency_name],
    ['hero_title', cfg.hero_title || defaultConfig.hero_title],
    ['hero_subtitle', cfg.hero_subtitle || defaultConfig.hero_subtitle],
    ['about_text', cfg.about_text || defaultConfig.about_text],
    ['contact_email', cfg.contact_email || defaultConfig.contact_email]
  ]);
}

// Initialize Element SDK
if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
}

// Mobile menu toggle
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

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Form submission
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    contactForm.classList.add('hidden');
    successMessage.classList.remove('hidden');

    setTimeout(() => {
      contactForm.classList.remove('hidden');
      successMessage.classList.add('hidden');
      contactForm.reset();
    }, 3000);
  });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }

  lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = `all 0.6s ease ${index * 0.1}s`;
  observer.observe(card);
});

// Animate stats on scroll
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
    { element: document.querySelector('.py-20 .text-5xl'), target: 150, suffix: '+' },
    { element: document.querySelectorAll('.py-20 .text-5xl')[1], target: 98, suffix: '%' },
    { element: document.querySelectorAll('.py-20 .text-5xl')[2], target: 8, suffix: '+' }
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

// Project card hover effects
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.zIndex = '10';
  });

  card.addEventListener('mouseleave', function() {
    this.style.zIndex = '1';
  });
});

// Add project overlay divs
document.querySelectorAll('.project-card > div').forEach(card => {
  const overlay = document.createElement('div');
  overlay.className = 'project-overlay absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500';
  card.style.position = 'relative';
  card.appendChild(overlay);
});

// Enhanced button hover effects
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px) scale(1.02)';
  });

  btn.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Add loading state to form button
const submitBtn = document.getElementById('submit-btn');
if (submitBtn && contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span>Enviando...</span>
    `;

    // Simulate form submission
    setTimeout(() => {
      contactForm.classList.add('hidden');
      successMessage.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <span>Enviar Mensaje</span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
        </svg>
      `;

      setTimeout(() => {
        contactForm.classList.remove('hidden');
        successMessage.classList.add('hidden');
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}

// Parallax effect for geometric shapes
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

// Add ripple effect to service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 49, 50, 0.3)';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple-effect 0.6s ease-out';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-effect {
    to {
      width: 300px;
      height: 300px;
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Initial render
onConfigChange(config);
