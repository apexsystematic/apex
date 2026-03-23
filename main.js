/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — js/main.js
   Page-level interactions
   ═══════════════════════════════════════════ */

(function () {

  document.addEventListener('DOMContentLoaded', function () {

    initContactForm();
    initScrollReveal();

  });

  /* ── Contact form ── */
  function initContactForm() {
    var form    = document.getElementById('contact-form');
    var success = document.getElementById('form-success');

    if (!form || !success) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      var originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending\u2026';
      submitBtn.disabled = true;

      /*
        Replace the setTimeout below with your actual form endpoint.
        e.g. fetch('/api/contact', { method: 'POST', body: new FormData(form) })
      */
      setTimeout(function () {
        form.style.display = 'none';
        success.style.display = 'block';
      }, 900);
    });
  }

  /* ── Scroll reveal ── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    var revealEls = document.querySelectorAll(
      '.service-card, .step, .pricing-card, .testimonial-card, .about-grid, .contact-form'
    );

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

})();
