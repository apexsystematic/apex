/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — components.js
   Injects shared header and footer.
   Include on every page before </body>.
   ═══════════════════════════════════════════ */

(function () {

  var LOGO_HEADER = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 42 380 70" height="52" role="img">'
    + '<title>Apex Systematic</title>'
    + '<line x1="54" y1="48" x2="34" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"/>'
    + '<line x1="54" y1="48" x2="74" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"/>'
    + '<line x1="34" y1="82" x2="74" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"/>'
    + '<circle cx="54" cy="48" r="2.5" fill="#C9A84C"/>'
    + '<text x="88" y="82" font-family="Georgia, serif" font-size="46" font-weight="400" letter-spacing="10" fill="#FFFFFF">APEX</text>'
    + '<text x="88" y="104" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" font-weight="300" letter-spacing="9.5" fill="#C9A84C">SYSTEMATIC</text>'
    + '</svg>';

  var LOGO_FOOTER = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="30 42 380 70" height="44" role="img">'
    + '<line x1="54" y1="48" x2="34" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"/>'
    + '<line x1="54" y1="48" x2="74" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"/>'
    + '<line x1="34" y1="82" x2="74" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"/>'
    + '<circle cx="54" cy="48" r="2.5" fill="#C9A84C"/>'
    + '<text x="88" y="82" font-family="Georgia, serif" font-size="46" font-weight="400" letter-spacing="10" fill="#FFFFFF">APEX</text>'
    + '<text x="88" y="104" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" font-weight="300" letter-spacing="9.5" fill="#C9A84C">SYSTEMATIC</text>'
    + '</svg>';

  /* ── Header ── */
  function injectHeader() {
    var el = document.getElementById('site-header');
    if (!el) return;
    el.innerHTML =
      '<div class="header-wrap" id="header-wrap">'
      +   '<div class="header container">'
      +     '<a href="index.html" class="header-logo" aria-label="Apex Systematic">' + LOGO_HEADER + '</a>'
      +     '<nav class="header-nav" aria-label="Main navigation">'
      +       '<a href="index.html#services">Services</a>'
      +       '<a href="index.html#how-it-works">How it works</a>'
      +       '<a href="index.html#pricing">Pricing</a>'
      +       '<a href="roi-calculator.html">ROI Calculator</a>'
      +       '<a href="index.html#about">About</a>'
      +     '</nav>'
      +     '<div class="header-right">'
      +       '<a href="index.html#contact" class="btn btn-primary header-cta">Free Audit</a>'
      +       '<button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu" aria-expanded="false">'
      +         '<span></span><span></span><span></span>'
      +       '</button>'
      +     '</div>'
      +   '</div>'
      + '</div>'
      + '<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">'
      +   '<button class="mobile-nav-close" id="mobile-nav-close" aria-label="Close menu">&#10005;</button>'
      +   '<a href="index.html#services">Services</a>'
      +   '<a href="index.html#how-it-works">How it works</a>'
      +   '<a href="index.html#pricing">Pricing</a>'
      +   '<a href="roi-calculator.html">ROI Calculator</a>'
      +   '<a href="index.html#about">About</a>'
      +   '<a href="index.html#contact" class="btn btn-primary">Free Audit</a>'
      + '</nav>';
  }

  /* ── Footer ── */
  function injectFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML =
      '<footer class="footer-wrap">'
      +   '<div class="footer container">'
      +     '<a href="index.html" class="footer-logo" aria-label="Apex Systematic">' + LOGO_FOOTER + '</a>'
      +     '<nav class="footer-nav" aria-label="Footer navigation">'
      +       '<a href="index.html#services">Services</a>'
      +       '<a href="index.html#how-it-works">How it works</a>'
      +       '<a href="index.html#pricing">Pricing</a>'
      +       '<a href="roi-calculator.html">ROI Calculator</a>'
      +       '<a href="index.html#about">About</a>'
      +       '<a href="index.html#contact">Contact</a>'
      +     '</nav>'
      +     '<div class="footer-bottom">'
      +       '<p class="footer-copy">&copy; 2025 Apex Systematic</p>'
      +       '<nav class="footer-legal" aria-label="Legal">'
      +         '<a href="terms.html">Terms</a>'
      +         '<a href="privacy.html">Privacy</a>'
      +         '<a href="cookies.html">Cookies</a>'
      +       '</nav>'
      +     '</div>'
      +   '</div>'
      + '</footer>';
  }

  /* ── Mobile menu ── */
  function initMobileMenu() {
    var menuToggle = document.getElementById('menu-toggle');
    var mobileNav  = document.getElementById('mobile-nav');
    var closeBtn   = document.getElementById('mobile-nav-close');

    if (!menuToggle || !mobileNav) return;

    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* Run — script is placed at end of <body> so DOM is ready */
  injectHeader();
  injectFooter();
  initMobileMenu();

})();
