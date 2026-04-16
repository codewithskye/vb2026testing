// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

// Initialize AOS (ready for future sections)
AOS.init({
  duration: 900,
  once: true,
  offset: 40,
  easing: 'ease-out-cubic'
});

// 👇 Add it directly below
window.addEventListener('load', () => {
  AOS.refresh();
});

  // Mobile Menu Toggle
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenu && navMenu) {
    mobileMenu.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      
      mobileMenu.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

      // Close mobile menu after navigation
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenu.textContent = '☰';
      }
    });
  });
});


// Hero Background Slider with smooth fade + Ken Burns effect
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showNextSlide() {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}

let sliderInterval = setInterval(showNextSlide, 5500);

const heroSection = document.querySelector('.hero');

if (heroSection) {
  heroSection.addEventListener('mouseenter', () => {
    clearInterval(sliderInterval);
  });

  heroSection.addEventListener('mouseleave', () => {
    sliderInterval = setInterval(showNextSlide, 5500);
  });
}


// Highlight current page in navigation
const currentPage = window.location.pathname.split("/").pop();
document.querySelectorAll('#nav-menu a').forEach(link => {
  if (link.getAttribute('href') === currentPage || 
      (currentPage === '' && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  }
});


// Wedding badge

const WEDDING_DATE = '2026-04-18';

function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

function updateTimeline() {
  const items = document.querySelectorAll('.timeline-item');
  const now = new Date();
  const eventDate = new Date(WEDDING_DATE);

  if (!isSameDay(now, eventDate)) return;

  items.forEach(item => {
    const start = item.dataset.start;
    const end = item.dataset.end;

    if (!start || !end) return;

    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);

    const startTime = new Date(eventDate);
    startTime.setHours(startH, startM, 0, 0);

    const endTime = new Date(eventDate);
    endTime.setHours(endH, endM, 0, 0);

    item.classList.remove('done', 'active');

    const existingBadge = item.querySelector('.live-badge');
    if (existingBadge) existingBadge.remove();

    if (now > endTime) {
      item.classList.add('done');
    } 
    else if (now >= startTime && now <= endTime) {
      item.classList.add('active');

      const eventEl = item.querySelector('.event');
      if (eventEl) {
        const badge = document.createElement('span');
        badge.className = 'live-badge';
        badge.textContent = 'LIVE NOW';
        eventEl.appendChild(badge);
      }
    }
  });
}

updateTimeline();
setInterval(updateTimeline, 60000);

// Show Toast Notification
function showToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}


// ==== EVENT STATUS ========
function updateEventStatus() {
  const weddingDate = new Date('2026-04-18T11:00:00+01:00').getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const countdownEl = document.getElementById('countdown');
  const statusEl = document.getElementById('status-message');
  const eventStatusContainer = document.getElementById('event-status');

  if (distance < 0) {
    // Wedding has passed
    eventStatusContainer.style.display = 'none';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Update countdown numbers
  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

  const minutesLeft = Math.floor(distance / 60000);

  if (minutesLeft <= 20 && minutesLeft > 0) {
    countdownEl.style.display = 'none';
    statusEl.textContent = "Starting Soon";
    statusEl.className = "status-message show starting-soon";
  } 
  else if (minutesLeft <= 0) {
    // Live Now
    countdownEl.style.display = 'none';
    statusEl.textContent = "LIVE NOW";
    statusEl.className = "status-message show live-now";
  } 
  else {
    // Normal countdown (more than 20 minutes left)
    countdownEl.style.display = 'flex';
    statusEl.classList.remove('show');
  }
}

// Initialize
updateEventStatus();

// Update every second
setInterval(updateEventStatus, 1000);

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

function toggleScrollButton() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
}

// Show/hide button on scroll
window.addEventListener('scroll', toggleScrollButton);

// Scroll to top when clicked
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});


// document.addEventListener("contextmenu", e => e.preventDefault());
// document.addEventListener("keydown", e => {
//     if (e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S")) {
//         e.preventDefault();
//     }
//     if (e.keyCode === 123) {
//         e.preventDefault();
//     }
// });