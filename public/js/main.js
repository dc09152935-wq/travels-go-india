/* ============================================
   GO INDIA TRAVEL - Main JavaScript
   Handles all dynamic functionality
   ============================================ */

// ============================================
// PAGE LOADER
// ============================================
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('pageLoader').classList.add('hidden');
  }, 800);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  lastScroll = currentScroll;
});

// ============================================
// MOBILE NAV TOGGLE
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
});

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a[data-nav]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('data-nav') === current) {
      item.classList.add('active');
    }
  });
});

// ============================================
// HERO PARTICLES
// ============================================
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (10 + Math.random() * 20) + 's';
    particle.style.width = (2 + Math.random() * 4) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}
createParticles();

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-count'));
    const suffix = target >= 100 ? '+' : '+';
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + suffix;
      }
    }, 25);
  });
}

// Start counter animation when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      heroObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const heroSection = document.getElementById('home');
if (heroSection) heroObserver.observe(heroSection);

// ============================================
// SCROLL ANIMATIONS
// ============================================
const animateObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  animateObserver.observe(el);
});

// ============================================
// FETCH & RENDER DESTINATIONS
// ============================================
async function loadDestinations() {
  try {
    const response = await fetch('/api/destinations');
    const data = await response.json();

    if (data.success) {
      renderDestinationCards(data.data);
      renderTourPackages(data.data);
    }
  } catch (error) {
    console.error('Error loading destinations:', error);
    // Fallback: render from static data if API fails
  }
}

function renderDestinationCards(destinations) {
  const grid = document.getElementById('destinationsGrid');
  if (!grid) return;

  grid.innerHTML = destinations.map((dest, index) => `
    <div class="dest-card animate-on-scroll delay-${(index % 4) + 1}" onclick="openDestination('${dest.id}')">
      <div class="dest-card-image">
        ${dest.image
          ? `<img src="${dest.image}" alt="${dest.name}, ${dest.state} - Travel destination" loading="lazy">`
          : `<div class="gradient-placeholder" style="background: ${dest.gradient || 'linear-gradient(135deg, #1e40af, #7c3aed)'}">🏔️</div>`
        }
        <div class="dest-card-rating">⭐ ${dest.rating}</div>
      </div>
      <div class="dest-card-body">
        <div class="dest-card-state">${dest.state}</div>
        <h3 class="dest-card-name">${dest.name}</h3>
        <p class="dest-card-tagline">${dest.tagline}</p>
        <div class="dest-card-meta">
          <div class="dest-card-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            ${dest.bestTime}
          </div>
          <div class="dest-card-meta-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
            ${dest.duration}
          </div>
        </div>
        <div class="dest-card-cta">
          Explore Details
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe new elements for scroll animation
  grid.querySelectorAll('.animate-on-scroll').forEach(el => {
    animateObserver.observe(el);
  });
}

function renderTourPackages(destinations) {
  const grid = document.getElementById('toursGrid');
  if (!grid) return;

  // Collect top packages from various destinations
  const topTours = [
    { ...destinations.find(d => d.id === 'manali'), pkgIndex: 1 },
    { ...destinations.find(d => d.id === 'uttarakhand'), pkgIndex: 2 },
    { ...destinations.find(d => d.id === 'goa'), pkgIndex: 1 },
    { ...destinations.find(d => d.id === 'jaipur'), pkgIndex: 2 },
    { ...destinations.find(d => d.id === 'kerala'), pkgIndex: 2 },
    { ...destinations.find(d => d.id === 'ladakh'), pkgIndex: 1 },
  ];

  // We'll fetch full data for packages
  const tourCards = topTours.map((dest, index) => {
    const badges = ['Bestseller', 'Popular', 'Trending', 'Premium', 'Top Rated', 'Adventure'];
    return `
      <div class="tour-card animate-on-scroll delay-${(index % 4) + 1}" onclick="openDestination('${dest.id}')">
        <div class="tour-image">
          ${dest.image
            ? `<img src="${dest.image}" alt="${dest.name} tour package" loading="lazy">`
            : `<div class="gradient-placeholder" style="background: ${dest.gradient || 'linear-gradient(135deg, #1e40af, #7c3aed)'}; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 2.5rem;">🏔️</div>`
          }
          <div class="tour-badge">${badges[index]}</div>
        </div>
        <div class="tour-body">
          <h3 class="tour-name">${dest.name} ${index === 3 ? 'Golden Triangle' : index === 4 ? 'Complete Tour' : 'Adventure'}</h3>
          <div class="tour-details">
            <div class="tour-detail">📍 ${dest.name}</div>
            <div class="tour-detail">📅 ${dest.duration}</div>
            <div class="tour-detail">⭐ ${dest.rating}</div>
          </div>
          <div class="tour-price-row">
            <div class="tour-price">${dest.budget.split(' - ')[0]} <span>onwards</span></div>
            <a class="btn btn-sm btn-primary" onclick="event.stopPropagation(); openDestination('${dest.id}');">View Details</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.innerHTML = tourCards;

  grid.querySelectorAll('.animate-on-scroll').forEach(el => {
    animateObserver.observe(el);
  });
}

// ============================================
// OPEN DESTINATION DETAIL
// ============================================
async function openDestination(id) {
  try {
    const response = await fetch(`/api/destinations/${id}`);
    const data = await response.json();

    if (data.success) {
      renderDestinationModal(data.data);
    }
  } catch (error) {
    console.error('Error loading destination:', error);
  }
}

function renderDestinationModal(dest) {
  const modal = document.getElementById('destModal');
  const content = document.getElementById('destModalContent');

  content.innerHTML = `
    <button class="modal-close" onclick="closeDestModal()" aria-label="Close modal">✕</button>
    <div class="modal-hero">
      ${dest.image
        ? `<img src="${dest.image}" alt="${dest.name}">`
        : `<div class="gradient-placeholder" style="background: ${dest.gradient || 'linear-gradient(135deg, #1e40af, #7c3aed)'}">🏔️</div>`
      }
      <div class="modal-hero-overlay">
        <h2 class="modal-hero-title">${dest.name}</h2>
        <p class="modal-hero-tagline">${dest.tagline}</p>
      </div>
    </div>

    <div class="modal-body">
      <!-- Quick Info -->
      <div class="modal-meta">
        <div class="modal-meta-item">
          <div class="modal-meta-icon">📅</div>
          <div>
            <div class="modal-meta-label">Best Time</div>
            <div class="modal-meta-value">${dest.bestTime}</div>
          </div>
        </div>
        <div class="modal-meta-item">
          <div class="modal-meta-icon">⏱️</div>
          <div>
            <div class="modal-meta-label">Duration</div>
            <div class="modal-meta-value">${dest.duration}</div>
          </div>
        </div>
        <div class="modal-meta-item">
          <div class="modal-meta-icon">💰</div>
          <div>
            <div class="modal-meta-label">Budget</div>
            <div class="modal-meta-value">${dest.budget}</div>
          </div>
        </div>
        <div class="modal-meta-item">
          <div class="modal-meta-icon">⭐</div>
          <div>
            <div class="modal-meta-label">Rating</div>
            <div class="modal-meta-value">${dest.rating} / 5.0</div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <p class="modal-desc">${dest.description}</p>

      <!-- Attractions -->
      <div class="modal-section">
        <h3 class="modal-section-title">Top Attractions</h3>
        <div class="attractions-grid">
          ${dest.attractions.map(att => `
            <div class="attraction-item">
              <div class="attraction-icon">📍</div>
              <div>
                <div class="attraction-name">${att.name}</div>
                <div class="attraction-desc">${att.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Activities -->
      <div class="modal-section">
        <h3 class="modal-section-title">Activities & Experiences</h3>
        <div class="activities-list">
          ${dest.activities.map(act => `
            <span class="activity-tag">${act}</span>
          `).join('')}
        </div>
      </div>

      <!-- Travel Tips -->
      <div class="modal-section">
        <h3 class="modal-section-title">Travel Tips</h3>
        <div class="tips-list">
          ${dest.travelTips.map(tip => `
            <div class="tip-item">
              <span class="tip-icon">💡</span>
              <span>${tip}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Packages -->
      <div class="modal-section">
        <h3 class="modal-section-title">Tour Packages</h3>
        <div class="packages-grid">
          ${dest.packages.map(pkg => `
            <div class="package-card">
              <div class="package-name">${pkg.name}</div>
              <div class="package-duration">${pkg.days} Days / ${pkg.days - 1} Nights</div>
              <div class="package-price">${pkg.price}</div>
              <div class="package-per">per person</div>
              <div class="package-includes">
                ${pkg.includes.map(inc => `
                  <div class="package-include-item">${inc}</div>
                `).join('')}
              </div>
              <button class="btn btn-primary btn-sm" style="width: 100%; justify-content: center;" onclick="openBooking('${dest.id}', '${pkg.name}', '${pkg.price}')">
                Book Now
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDestModal() {
  const modal = document.getElementById('destModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Close modal on overlay click
document.getElementById('destModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) {
    closeDestModal();
  }
});

// ============================================
// BOOKING MODAL
// ============================================
function openBooking(destId, pkgName, price) {
  const modal = document.getElementById('bookingModal');
  const subtitle = document.getElementById('bookingSubtitle');
  document.getElementById('bookingDest').value = destId;
  document.getElementById('bookingPkg').value = pkgName || '';

  if (pkgName && price) {
    subtitle.textContent = `${pkgName} — ${price} per person`;
  } else {
    subtitle.textContent = 'Fill in your details and we\'ll plan the perfect trip for you.';
  }

  // Reset form
  document.getElementById('bookingForm').reset();
  document.getElementById('bookingForm').style.display = 'block';
  document.getElementById('bookingSuccess').classList.remove('active');

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('bookingModalClose').addEventListener('click', closeBookingModal);
document.getElementById('bookingModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeBookingModal();
});

// Booking form submit
document.getElementById('bookingForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('bookingForm').style.display = 'none';
      document.getElementById('bookingSuccess').classList.add('active');
    }
  } catch (error) {
    alert('Something went wrong. Please try calling us at +91 7906038019');
  }
});

// ============================================
// CONTACT FORM
// ============================================
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.success) {
      document.getElementById('contactForm').style.display = 'none';
      document.getElementById('contactSuccess').classList.add('active');
    }
  } catch (error) {
    alert('Something went wrong. Please try calling us at +91 7906038019');
  }
});

// ============================================
// SEARCH FUNCTIONALITY
// ============================================
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');
const searchResults = document.getElementById('searchResults');

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  searchOverlay.classList.add('active');
  searchInput.focus();
  document.body.style.overflow = 'hidden';
});

searchClose.addEventListener('click', () => {
  searchOverlay.classList.remove('active');
  searchInput.value = '';
  searchResults.innerHTML = '';
  document.body.style.overflow = '';
});

searchOverlay.addEventListener('click', (e) => {
  if (e.target === searchOverlay) {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '';
    document.body.style.overflow = '';
  }
});

let searchTimeout;
searchInput.addEventListener('input', (e) => {
  clearTimeout(searchTimeout);
  const query = e.target.value.trim();

  if (query.length < 2) {
    searchResults.innerHTML = '';
    return;
  }

  searchTimeout = setTimeout(async () => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        searchResults.innerHTML = data.data.map(dest => `
          <div class="search-result-item" onclick="searchOverlay.classList.remove('active'); document.body.style.overflow = ''; openDestination('${dest.id}');">
            <div class="search-result-img">
              ${dest.image
                ? `<img src="${dest.image}" alt="${dest.name}">`
                : `<div style="width:100%;height:100%;background:${dest.gradient || 'linear-gradient(135deg, #1e40af, #7c3aed)'};display:flex;align-items:center;justify-content:center;font-size:1.5rem;">🏔️</div>`
              }
            </div>
            <div>
              <div class="search-result-name">${dest.name}</div>
              <div class="search-result-state">${dest.state} — ${dest.tagline}</div>
            </div>
          </div>
        `).join('');
      } else if (query.length >= 2) {
        searchResults.innerHTML = `
          <div style="text-align: center; padding: 30px; color: var(--color-text-muted);">
            <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
            <p>No destinations found for "${query}"</p>
            <p style="font-size: 0.85rem; margin-top: 8px;">Try searching for Manali, Goa, Uttarakhand...</p>
          </div>
        `;
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  }, 300);
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
  // ESC to close modals
  if (e.key === 'Escape') {
    closeDestModal();
    closeBookingModal();
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Ctrl+K to open search
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchOverlay.classList.add('active');
    searchInput.focus();
    document.body.style.overflow = 'hidden';
  }
});

// ============================================
// SMOOTH SCROLL FOR NAV LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// INITIALIZE
// ============================================
loadDestinations();
