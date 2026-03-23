/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — js/components.js
   Reusable header & footer injection.
   Include at the bottom of <body> on every page.
   ═══════════════════════════════════════════ */

(function () {

  /* ── Logo SVG ── */
  function logoSVG(height) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 42 380 70" height="' + height + '" role="img" aria-label="Apex Systematic">'
      + '<title>Apex Systematic</title>'
      + '<line x1="54" y1="48" x2="34" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"/>'
      + '<line x1="54" y1="48" x2="74" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"/>'
      + '<line x1="34" y1="82" x2="74" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"/>'
      + '<circle cx="54" cy="48" r="2.5" fill="#C9A84C"/>'
      + '<text x="88" y="82" font-family="Georgia, serif" font-size="46" font-weight="400" letter-spacing="10" fill="#FFFFFF">APEX</text>'
      + '<text x="88" y="104" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" font-weight="300" letter-spacing="9.5" fill="#C9A84C">SYSTEMATIC</text>'
      + '</svg>';
  }

  /* ── Header HTML ── */
  function headerHTML() {
    return '<div class="header-wrap" id="header-wrap">'
      + '<div class="header container">'
      + '<a href="index.html" class="header-logo" aria-label="Apex Systematic — Home">' + logoSVG(34) + '</a>'
      + '<nav class="header-nav" aria-label="Main navigation">'
      + '<a href="#services">Services</a>'
      + '<a href="#how-it-works">How it works</a>'
      + '<a href="#pricing">Pricing</a>'
      + '<a href="#about">About</a>'
      + '</nav>'
      + '<div class="header-right">'
      + '<a href="#contact" class="btn btn-primary header-cta">Free Audit</a>'
      + '<button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="mobile-nav">'
      + '<span></span><span></span><span></span>'
      + '</button>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>'
      + '<a href="#services">Services</a>'
      + '<a href="#how-it-works">How it works</a>'
      + '<a href="#pricing">Pricing</a>'
      + '<a href="#about">About</a>'
      + '<a href="#contact" class="btn btn-primary">Free Audit</a>'
      + '</nav>';
  }

  /* ── Footer HTML ── */
  function footerHTML() {
    var year = new Date().getFullYear();
    return '<div class="footer-wrap">'
      + '<div class="footer container">'
      + '<a href="index.html" class="footer-logo" aria-label="Apex Systematic — Home">' + logoSVG(28) + '</a>'
      + '<nav class="footer-nav" aria-label="Footer navigation">'
      + '<a href="#services">Services</a>'
      + '<a href="#how-it-works">How it works</a>'
      + '<a href="#pricing">Pricing</a>'
      + '<a href="#about">About</a>'
      + '<a href="#contact">Contact</a>'
      + '</nav>'
      + '<div class="footer-bottom">'
      + '<p class="footer-copy">&copy; ' + year + ' Apex Systematic</p>'
      + '<nav class="footer-legal" aria-label="Legal">'
      + '<a href="terms.html">Terms</a>'
      + '<a href="privacy.html">Privacy</a>'
      + '<a href="cookies.html">Cookies</a>'
      + '</nav>'
      + '</div>'
      + '</div>'
      + '</div>';
  }

  /* ── Inject ── */
  /* Scripts loaded at end of <body> — DOM is already ready, no DOMContentLoaded needed */
  var headerEl = document.getElementById('site-header');
  if (headerEl) {
    headerEl.innerHTML = headerHTML();
    initHeader();
  }

  var footerEl = document.getElementById('site-footer');
  if (footerEl) {
    footerEl.innerHTML = footerHTML();
  }

  /* ── Header behaviour ── */
  function initHeader() {
    var headerWrap = document.getElementById('header-wrap');
    var menuToggle = document.getElementById('menu-toggle');
    var mobileNav  = document.getElementById('mobile-nav');

    if (headerWrap) {
      function onScroll() {
        headerWrap.classList.toggle('scrolled', window.scrollY > 40);
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    if (menuToggle && mobileNav) {
      menuToggle.addEventListener('click', function () {
        var isOpen = mobileNav.classList.toggle('is-open');
        menuToggle.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        mobileNav.hidden = !isOpen;
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });

      mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileNav.classList.remove('is-open');
          menuToggle.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          mobileNav.hidden = true;
          document.body.style.overflow = '';
        });
      });
    }
  }

})();
