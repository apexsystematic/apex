/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — js/components.js
   Header & footer behaviour.
   Include on every page.
   ═══════════════════════════════════════════ */

(function () {

  /* Scroll → sticky header */
  var headerWrap = document.getElementById('header-wrap');
  if (headerWrap) {
    function onScroll() {
      headerWrap.classList.toggle('scrolled', window.scrollY > 40);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Mobile menu */
  var menuToggle = document.getElementById('menu-toggle');
  var mobileNav  = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('is-open');
        menuToggle.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

})();
