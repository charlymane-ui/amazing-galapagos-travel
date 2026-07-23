// ============ HEADER SCROLL STATE ============
const header = document.getElementById('header');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 40;
  header.classList.toggle('scrolled', scrolled);
  backToTop.classList.toggle('show', window.scrollY > 500);
});

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ============ MOBILE NAV ============
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    nav.classList.remove('open');
  });
});

// ============ HERO VIDEO FALLBACK ============
// If no real video file has been dropped into assets/video/hero.mp4, fall back
// to the animated photo slideshow instead of showing a broken/empty player.
const heroVideo = document.getElementById('heroVideo');
const heroSlideshow = document.getElementById('heroSlideshow');

if (heroVideo) {
  function useSlideshowFallback() {
    heroVideo.classList.add('hidden');
    startSlideshow();
  }

  heroVideo.addEventListener('error', useSlideshowFallback);
  if (heroVideo.readyState === 0) {
    // Give the browser a moment to try loading the source before deciding it's missing.
    setTimeout(() => {
      if (heroVideo.error || heroVideo.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) {
        useSlideshowFallback();
      } else {
        heroSlideshow.style.display = 'none';
      }
    }, 800);
  }

  function startSlideshow() {
    const slides = heroSlideshow.querySelectorAll('.slide');
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('slide-active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('slide-active');
    }, 5500);
  }
}

// ============ SCROLL REVEAL ============
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('in-view'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => revealObserver.observe(el));

// ============ ANIMATED STAT COUNTERS ============
const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(progress * target);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

statNums.forEach(el => statObserver.observe(el));

// ============ REVIEWS CAROUSEL ============
const track = document.getElementById('reviewsTrack');
if (track) {
  document.getElementById('revNext').addEventListener('click', () => {
    track.scrollBy({ left: 320, behavior: 'smooth' });
  });
  document.getElementById('revPrev').addEventListener('click', () => {
    track.scrollBy({ left: -320, behavior: 'smooth' });
  });
}

// ============ GALLERY COVERFLOW CAROUSEL ============
// Mirrors the Figma prototype: 9 photos, active slide centered with the
// previous/next slides peeking on each side, arrow buttons to navigate,
// auto-advance every 5s (matching the design's AFTER_TIMEOUT reaction), and
// a progress bar on the active dot that fills over that same 5s window.
const coverflowPhotos = [
  { src: 'assets/images/slide-1.jpg', crop: { height: '150%', left: '-0.05%', top: '0.01%' } },
  { src: 'assets/images/slide-2.jpg', crop: { height: '266.67%', left: '-0.03%', top: '-61.21%' } },
  { src: 'assets/images/slide-3.jpg', crop: { height: '266.67%', left: '0.01%', top: '-68.17%' } },
  { src: 'assets/images/slide-4.jpg', crop: { height: '266.67%', left: '0.04%', top: '-46.98%' } },
  { src: 'assets/images/slide-5.jpg', crop: { height: '266.67%', left: '-0.02%', top: '-50.81%' } },
  { src: 'assets/images/slide-6.jpg', crop: null },
  { src: 'assets/images/slide-7.jpg', crop: null },
  { src: 'assets/images/slide-8.jpg', crop: { height: '150%', left: '0.02%', top: '-11.61%' } },
  { src: 'assets/images/slide-9.jpg', crop: { height: '150%', left: '0.02%', top: '-10.65%' } },
];

const coverflow = document.getElementById('coverflow');
if (coverflow) {
  const prevImg = document.getElementById('coverflowPrevImg');
  const activeImg = document.getElementById('coverflowActiveImg');
  const nextImg = document.getElementById('coverflowNextImg');
  const dotsWrap = document.getElementById('coverflowDots');
  const AUTOPLAY_MS = 5000;
  let current = 0;
  let timer = null;

  const dots = coverflowPhotos.map((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'coverflow-dot';
    dot.setAttribute('aria-label', `Go to photo ${i + 1}`);
    dot.innerHTML = '<span class="coverflow-dot-fill"></span>';
    dot.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function applyCrop(imgEl, photo) {
    imgEl.src = photo.src;
    const crop = photo.crop;
    imgEl.style.height = crop ? crop.height : '100%';
    imgEl.style.left = crop ? crop.left : '0';
    imgEl.style.top = crop ? crop.top : '0';
  }

  function render() {
    const n = coverflowPhotos.length;
    applyCrop(prevImg, coverflowPhotos[(current - 1 + n) % n]);
    applyCrop(activeImg, coverflowPhotos[current]);
    applyCrop(nextImg, coverflowPhotos[(current + 1) % n]);
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
  }

  function goTo(index, manual) {
    const n = coverflowPhotos.length;
    current = ((index % n) + n) % n;
    render();
    if (manual) restartAutoplay();
  }

  function next(manual) { goTo(current + 1, manual); }
  function prev(manual) { goTo(current - 1, manual); }

  function restartAutoplay() {
    clearInterval(timer);
    timer = setInterval(() => next(false), AUTOPLAY_MS);
  }

  document.getElementById('coverflowArrowLeft').addEventListener('click', () => prev(true));
  document.getElementById('coverflowArrowRight').addEventListener('click', () => next(true));
  document.getElementById('coverflowPrev').addEventListener('click', () => prev(true));
  document.getElementById('coverflowNext').addEventListener('click', () => next(true));

  render();
  restartAutoplay();
}

// ============ CRUISE BOOKING FORM ============
const cruiseForm = document.getElementById('cruiseForm');
const cruiseSuccess = document.getElementById('cruiseSuccess');

if (cruiseForm) {
  cruiseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // No booking backend is wired up yet — this only confirms the request was
    // captured client-side. Connect this to a real email/CRM endpoint before launch.
    cruiseSuccess.classList.add('show');
    cruiseForm.reset();
    setTimeout(() => cruiseSuccess.classList.remove('show'), 4000);
  });
}

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // No backend is wired up yet — this only confirms the message was
    // captured client-side. Connect this to a real email/CRM endpoint before launch.
    contactSuccess.classList.add('show');
    contactForm.reset();
    setTimeout(() => contactSuccess.classList.remove('show'), 4000);
  });
}

// ============ FOOTER YEAR ============
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ============ TOUR DETAIL PAGE ============
// Reads ?slug= from the URL and renders the matching entry from TOURS
// (assets/js/tours-data.js) into the static tour-detail.html shell.
const tourTitleEl = document.getElementById('tourTitle');
if (tourTitleEl && typeof TOURS !== 'undefined') {
  const slug = new URLSearchParams(window.location.search).get('slug');
  const tour = TOURS[slug];

  if (!tour) {
    document.querySelector('.tour-detail-header .container').innerHTML =
      '<p class="island-header-title" style="font-size:1.5rem;">Tour not found. <a href="index.html#islands">Browse islands →</a></p>';
    document.querySelector('.tour-detail-body').style.display = 'none';
  } else {
    const islandPage = ISLAND_PAGES[tour.island] || 'index.html#islands';
    document.getElementById('tourBackLink').href = islandPage;
    document.getElementById('tourBackLink').textContent = `← Back to ${tour.island} tours`;
    document.getElementById('tourChip').textContent = tour.island;
    const category = tourCategory(tour.bookingDurationType);
    const categoryBadgeEl = document.getElementById('tourCategoryBadge');
    categoryBadgeEl.textContent = category.label;
    categoryBadgeEl.classList.add(category.colorClass);
    document.getElementById('tourTitle').textContent = tour.title;
    document.title = `${tour.title} | Amazing Galapagos Travel`;
    const tourGalleryEl = document.getElementById('tourGallery');
    if (tour.image) {
      tourGalleryEl.style.backgroundImage = `url('${tour.image}')`;
      tourGalleryEl.classList.add('tour-detail-gallery-main--photo');
      document.getElementById('tourIcon').remove();
    } else {
      document.getElementById('tourIcon').textContent = tourIcon(tour.bookingDurationType);
    }
    document.getElementById('tourOverview').textContent = tour.overview;
    document.getElementById('tourCtaHeading').textContent = `Ready to book ${tour.title}?`;

    document.getElementById('tourHighlights').innerHTML =
      tour.highlights.map(h => `<li>${h}</li>`).join('');

    document.getElementById('tourIncluded').innerHTML =
      TOUR_SHARED.included.map(i => `<li>${i}</li>`).join('');

    document.getElementById('tourItinerary').innerHTML = TOUR_SHARED.itinerary.map((step, i, arr) => `
      <div class="tour-detail-step">
        <div class="tour-detail-step-track">
          <div class="tour-detail-step-dot"></div>
          ${i < arr.length - 1 ? '<div class="tour-detail-step-line"></div>' : ''}
        </div>
        <div class="tour-detail-step-body">
          <div class="tour-detail-step-time">${step.time}</div>
          <div class="tour-detail-step-activity">${step.activity}</div>
          <div class="tour-detail-step-desc">${step.description}</div>
        </div>
      </div>
    `).join('');

    document.getElementById('tourBookingLocation').textContent = tour.island;
    document.getElementById('tourBookingDurationType').textContent = tour.bookingDurationType;
    document.getElementById('tourMeetingPoint').textContent = TOUR_SHARED.meetingPoint;
    document.getElementById('tourGroupSize').textContent = TOUR_SHARED.maxGroupSize;
  }
}

// ============ PACKAGE DETAIL PAGE ============
// Reads ?slug= from the URL and renders the matching entry from PACKAGES
// (assets/js/packages-data.js) into the static package-detail.html shell.
const pkgTitleEl = document.getElementById('pkgTitle');
if (pkgTitleEl && typeof PACKAGES !== 'undefined') {
  const slug = new URLSearchParams(window.location.search).get('slug');
  const pkg = PACKAGES[slug];

  if (!pkg) {
    document.querySelector('.tour-detail-header .container').innerHTML =
      '<p class="island-header-title" style="font-size:1.5rem;">Package not found. <a href="index.html#packages">Browse packages →</a></p>';
    document.querySelector('.tour-detail-body').style.display = 'none';
  } else {
    document.getElementById('pkgDurationChip').textContent = pkg.duration;
    document.getElementById('pkgTitle').textContent = pkg.title;
    document.title = `${pkg.title} | Amazing Galapagos Travel`;
    const pkgGalleryEl = document.getElementById('pkgGallery');
    if (pkg.image) {
      pkgGalleryEl.style.backgroundImage = `url('${pkg.image}')`;
      pkgGalleryEl.classList.add('tour-detail-gallery-main--photo');
      document.getElementById('pkgIcon').remove();
    } else {
      document.getElementById('pkgIcon').textContent = pkg.icon;
    }
    document.getElementById('pkgOverview').textContent = pkg.overview;
    document.getElementById('pkgCtaHeading').textContent = `Ready to book ${pkg.title}?`;
    document.getElementById('pkgTitleSidebar').textContent = pkg.title;
    document.getElementById('pkgDurationSidebar').textContent = `${pkg.duration} · ${pkg.tag}`;

    document.getElementById('pkgMeta').innerHTML = `
      <span><strong>Duration:</strong> ${pkg.duration}</span>
      <span>${pkg.tag}</span>
    `;

    document.getElementById('pkgItinerary').innerHTML = pkg.itinerary.map((step, i, arr) => `
      <div class="tour-detail-step">
        <div class="tour-detail-step-track">
          <div class="tour-detail-step-dot"></div>
          ${i < arr.length - 1 ? '<div class="tour-detail-step-line"></div>' : ''}
        </div>
        <div class="tour-detail-step-body">
          <div class="tour-detail-step-time">${step.day}</div>
          <div class="tour-detail-step-activity">${step.title}</div>
          ${step.description ? `<div class="tour-detail-step-desc">${step.description}</div>` : ''}
        </div>
      </div>
    `).join('');

    document.getElementById('pkgIncluded').innerHTML =
      PACKAGE_SHARED.included.map(i => `<li>${i}</li>`).join('');
    document.getElementById('pkgNotIncluded').innerHTML =
      PACKAGE_SHARED.notIncluded.map(i => `<li>${i}</li>`).join('');
  }
}
