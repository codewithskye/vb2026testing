// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {

  // Initialize AOS (ready for future sections)
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100
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

// document.addEventListener("contextmenu", e => e.preventDefault());
// document.addEventListener("keydown", e => {
//     if (e.ctrlKey && (e.key === "u" || e.key === "U" || e.key === "s" || e.key === "S")) {
//         e.preventDefault();
//     }
//     if (e.keyCode === 123) {
//         e.preventDefault();
//     }
// });