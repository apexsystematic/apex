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

  var CHEVRON_SVG = '<svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ── Header ── */
  function injectHeader() {
    var el = document.getElementById('site-header');
    if (!el) return;
    el.innerHTML =
      '<div class="header-wrap" id="header-wrap">'
      +   '<div class="header container">'
      +     '<a href="/" class="header-logo" aria-label="Apex Systematic">' + LOGO_HEADER + '</a>'
      +     '<nav class="header-nav" aria-label="Main navigation">'

      /* Services dropdown */
      +     '<div class="nav-dropdown">'
      +       '<button class="nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true">Services ' + CHEVRON_SVG + '</button>'
      +       '<div class="nav-dropdown-menu">'
      +         '<a href="/services/law-firms/">Law Firms</a>'
      +         '<a href="/services/accountants/">Accountants</a>'
      +         '<a href="/services/financial-advisers/">Financial Advisers</a>'
      +         '<a href="/services/insurance-brokers/">Insurance Brokers</a>'
      +         '<a href="/services/mortgage-brokers/">Mortgage Brokers</a>'
      +         '<a href="/services/estate-agents/">Estate Agents</a>'
      +         '<a href="/services/letting-agents/">Letting Agents</a>'
      +         '<a href="/services/consultants/">Consultants</a>'
      +         '<a href="/services/hr-recruitment/">HR &amp; Recruitment</a>'
      +         '<a href="/services/seo-consultants/">SEO Consultants</a>'
      +         '<a href="/services/" class="nav-dropdown-view-all">All Industries →</a>'
      +       '</div>'
      +     '</div>'

      /* Demos — standalone */
      +     '<a href="/demos/" style="color:var(--gold);">Demos</a>'

      /* Tools dropdown */
      +     '<div class="nav-dropdown">'
      +       '<button class="nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true">Tools ' + CHEVRON_SVG + '</button>'
      +       '<div class="nav-dropdown-menu">'
      +         '<a href="/tools/roi-calculator/">ROI Calculator</a>'
      +         '<a href="/tools/cost-of-stalling/">Cost of Stalling</a>'
      +         '<a href="/tools/audit/">Self-Serve Audit</a>'
      +       '</div>'
      +     '</div>'

      /* Reports dropdown */
      +     '<div class="nav-dropdown">'
      +       '<button class="nav-dropdown-toggle" aria-expanded="false" aria-haspopup="true">Reports ' + CHEVRON_SVG + '</button>'
      +       '<div class="nav-dropdown-menu">'
      +         '<a href="/reports/automation-report/">State of Automation</a>'
      +         '<a href="/reports/accounting-firms-insights/">Accounting Insights</a>'
      +         '<a href="/reports/financial-advisers-insights/">Financial Advisers Insights</a>'
      +         '<a href="/reports/law-firms-insights/">Law Firms Insights</a>'
      +         '<a href="/reports/" class="nav-dropdown-view-all">All Reports →</a>'
      +       '</div>'
      +     '</div>'

      +     '<a href="/pricing/">Pricing</a>'
      +     '</nav>'
      +     '<div class="header-right">'
      +       '<a href="/contact/" class="btn btn-primary header-cta">Free Audit</a>'
      +       '<button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu" aria-expanded="false">'
      +         '<span></span><span></span><span></span>'
      +       '</button>'
      +     '</div>'
      +   '</div>'
      + '</div>'

      /* Mobile nav */
      + '<nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation">'
      +   '<button class="mobile-nav-close" id="mobile-nav-close" aria-label="Close menu">&#10005;</button>'

      /* Services accordion */
      +   '<div class="mobile-nav-group">'
      +     '<button class="mobile-nav-group-toggle" data-target="mobile-sub-services">Services ' + CHEVRON_SVG + '</button>'
      +     '<div class="mobile-nav-sub" id="mobile-sub-services">'
      +       '<a href="/services/law-firms/">Law Firms</a>'
      +       '<a href="/services/accountants/">Accountants</a>'
      +       '<a href="/services/financial-advisers/">Financial Advisers</a>'
      +       '<a href="/services/insurance-brokers/">Insurance Brokers</a>'
      +       '<a href="/services/mortgage-brokers/">Mortgage Brokers</a>'
      +       '<a href="/services/estate-agents/">Estate Agents</a>'
      +       '<a href="/services/letting-agents/">Letting Agents</a>'
      +       '<a href="/services/consultants/">Consultants</a>'
      +       '<a href="/services/hr-recruitment/">HR &amp; Recruitment</a>'
      +       '<a href="/services/seo-consultants/">SEO Consultants</a>'
      +       '<a href="/services/" class="mobile-nav-view-all">All Industries →</a>'
      +     '</div>'
      +   '</div>'

      +   '<a href="/demos/" style="color:var(--gold);">Demos</a>'

      /* Tools accordion */
      +   '<div class="mobile-nav-group">'
      +     '<button class="mobile-nav-group-toggle" data-target="mobile-sub-tools">Tools ' + CHEVRON_SVG + '</button>'
      +     '<div class="mobile-nav-sub" id="mobile-sub-tools">'
      +       '<a href="/tools/roi-calculator/">ROI Calculator</a>'
      +       '<a href="/tools/cost-of-stalling/">Cost of Stalling</a>'
      +       '<a href="/tools/audit/">Self-Serve Audit</a>'
      +     '</div>'
      +   '</div>'

      /* Reports accordion */
      +   '<div class="mobile-nav-group">'
      +     '<button class="mobile-nav-group-toggle" data-target="mobile-sub-reports">Reports ' + CHEVRON_SVG + '</button>'
      +     '<div class="mobile-nav-sub" id="mobile-sub-reports">'
      +       '<a href="/reports/automation-report/">State of Automation</a>'
      +       '<a href="/reports/accounting-firms-insights/">Accounting Insights</a>'
      +       '<a href="/reports/financial-advisers-insights/">Financial Advisers Insights</a>'
      +       '<a href="/reports/law-firms-insights/">Law Firms Insights</a>'
      +       '<a href="/reports/" class="mobile-nav-view-all">All Reports →</a>'
      +     '</div>'
      +   '</div>'

      +   '<a href="/pricing/">Pricing</a>'
      +   '<a href="/contact/" class="btn btn-primary">Free Audit</a>'
      + '</nav>';
  }

  /* ── Footer ── */
  function injectFooter() {
    var el = document.getElementById('site-footer');
    if (!el) return;
    el.innerHTML =
      '<footer class="footer-wrap">'
      +   '<div class="footer container">'
      +     '<a href="/" class="footer-logo" aria-label="Apex Systematic">' + LOGO_FOOTER + '</a>'
      +     '<nav class="footer-nav-cols" aria-label="Footer navigation">'

      +       '<div class="footer-nav-col">'
      +         '<h4>Services</h4>'
      +         '<a href="/services/law-firms/">Law Firms</a>'
      +         '<a href="/services/accountants/">Accountants</a>'
      +         '<a href="/services/financial-advisers/">Financial Advisers</a>'
      +         '<a href="/services/insurance-brokers/">Insurance Brokers</a>'
      +         '<a href="/services/mortgage-brokers/">Mortgage Brokers</a>'
      +         '<a href="/services/estate-agents/">Estate Agents</a>'
      +         '<a href="/services/letting-agents/">Letting Agents</a>'
      +         '<a href="/services/consultants/">Consultants</a>'
      +         '<a href="/services/hr-recruitment/">HR &amp; Recruitment</a>'
      +         '<a href="/services/seo-consultants/">SEO Consultants</a>'
      +       '</div>'

      +       '<div class="footer-nav-col">'
      +         '<h4>Tools</h4>'
      +         '<a href="/tools/roi-calculator/">ROI Calculator</a>'
      +         '<a href="/tools/cost-of-stalling/">Cost of Stalling</a>'
      +         '<a href="/tools/audit/">Self-Serve Audit</a>'
      +         '<h4 style="margin-top:24px;">Reports</h4>'
      +         '<a href="/reports/automation-report/">State of Automation</a>'
      +         '<a href="/reports/accounting-firms-insights/">Accounting Firms Insights</a>'
      +         '<a href="/reports/financial-advisers-insights/">Financial Advisers Insights</a>'
      +         '<a href="/reports/law-firms-insights/">Law Firms Insights</a>'
      +         '<a href="/reports/">All Reports \u2192</a>'
      +       '</div>'

      +       '<div class="footer-nav-col">'
      +         '<h4>Company</h4>'
      +         '<a href="/demos/">Demos</a>'
      +         '<a href="/pricing/">Pricing</a>'
      +         '<a href="/faq/">FAQ</a>'
      +         '<a href="/contact/">Contact</a>'
      +         '<h4 style="margin-top:24px;">Legal</h4>'
      +         '<a href="/legal/terms.html">Terms</a>'
      +         '<a href="/legal/privacy.html">Privacy</a>'
      +         '<a href="/legal/cookies.html">Cookies</a>'
      +         '<a href="#" class="cky-banner-element">Cookie Settings</a>'
      +       '</div>'

      +     '</nav>'
      +     '<div class="footer-bottom">'
      +       '<p class="footer-copy">&copy; 2026 Apex Systematic</p>'
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

    function closeMobileNav() {
      mobileNav.classList.remove('is-open');
      menuToggle.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
    }

    menuToggle.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('is-open');
      menuToggle.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      document.documentElement.style.overflow = isOpen ? 'hidden' : '';
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMobileNav);
    }

    /* Mobile accordion toggles */
    mobileNav.querySelectorAll('.mobile-nav-group-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-target');
        var sub = document.getElementById(targetId);
        if (!sub) return;
        var isOpen = sub.classList.toggle('is-open');
        btn.classList.toggle('is-open', isOpen);
      });
    });

    /* Close on link click (but not accordion toggles) */
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });
  }

  /* ── Desktop dropdown keyboard/click handling ── */
  function initDesktopDropdowns() {
    document.querySelectorAll('.nav-dropdown').forEach(function (dropdown) {
      var toggle = dropdown.querySelector('.nav-dropdown-toggle');
      var menu   = dropdown.querySelector('.nav-dropdown-menu');
      if (!toggle || !menu) return;

      /* Click to open/close (for touch/keyboard users) */
      toggle.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        /* Close siblings */
        document.querySelectorAll('.nav-dropdown-menu').forEach(function (m) {
          if (m !== menu) { m.classList.remove('is-open'); }
        });
        document.querySelectorAll('.nav-dropdown-toggle').forEach(function (t) {
          if (t !== toggle) { t.setAttribute('aria-expanded', 'false'); }
        });
      });
    });

    /* Close all dropdowns on outside click */
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.nav-dropdown')) {
        document.querySelectorAll('.nav-dropdown-menu').forEach(function (m) { m.classList.remove('is-open'); });
        document.querySelectorAll('.nav-dropdown-toggle').forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
      }
    });
  }

  /* ── Contact Form shared helpers ── */

  function buildCalendlyStep() {
    return '<div class="audit-step" id="audit-step-4" style="display:none;">'
      + '<div class="audit-thankyou">'
      +   '<h3 class="audit-step-title">One last step.</h3>'
      +   '<p>Book a free 30-minute call to receive a clear breakdown of where your practice is losing time to manual work \u2014 and a precise picture of what automation can recover.</p>'
      +   '<p class="audit-sub">You will hear from us within one business day to confirm your call.</p>'
      + '</div>'
      + '<div class="calendly-inline-widget" data-url="https://calendly.com/apexsystematic/30min" style="min-width:320px;height:700px;"></div>'
      + '</div>';
  }

  function buildFullFormInner() {
    return '<div class="audit-form-wrap">'
      + '<div class="audit-progress"><div class="audit-progress-bar" id="audit-progress-bar"></div></div>'
      + '<p class="audit-step-label" id="audit-step-label">Step 1 of 3</p>'

      + '<div class="audit-step" id="audit-step-1">'
      +   '<h3 class="audit-step-title">Tell us about your practice</h3>'
      +   '<div class="form-group">'
      +     '<label for="role">What do you do?</label>'
      +     '<select id="role" name="role">'
      +       '<option value="" disabled selected>Select your role</option>'
      +       '<option value="lawyer">Lawyer / Solicitor</option>'
      +       '<option value="ifa">Financial Adviser</option>'
      +       '<option value="consultant">Consultant</option>'
      +       '<option value="accountant">Accountant</option>'
      +       '<option value="other">Other</option>'
      +     '</select>'
      +   '</div>'
      +   '<div class="form-group">'
      +     '<label for="team-size">Team size</label>'
      +     '<select id="team-size" name="team_size">'
      +       '<option value="" disabled selected>Select team size</option>'
      +       '<option value="solo">Just me</option>'
      +       '<option value="small">2\u20135 people</option>'
      +       '<option value="medium">6\u201315 people</option>'
      +       '<option value="large">16+ people</option>'
      +     '</select>'
      +   '</div>'
      +   '<button class="btn btn-primary audit-next" onclick="auditNext(1)">Next \u2192</button>'
      + '</div>'

      + '<div class="audit-step" id="audit-step-2" style="display:none;">'
      +   '<h3 class="audit-step-title">Where is your time going?</h3>'
      +   '<div class="form-group">'
      +     '<label for="pain">Biggest time drain</label>'
      +     '<select id="pain" name="pain">'
      +       '<option value="" disabled selected>What is eating most of your time?</option>'
      +       '<option value="onboarding">Client onboarding</option>'
      +       '<option value="documents">Document drafting</option>'
      +       '<option value="data-entry">Data entry &amp; reporting</option>'
      +       '<option value="scheduling">Scheduling &amp; follow-ups</option>'
      +       '<option value="other">Other</option>'
      +     '</select>'
      +   '</div>'
      +   '<div class="form-group">'
      +     '<label for="hours-lost">Estimated hours lost per week</label>'
      +     '<select id="hours-lost" name="hours_lost">'
      +       '<option value="" disabled selected>Select a range</option>'
      +       '<option value="under-5">Less than 5 hrs/week</option>'
      +       '<option value="5-10">5\u201310 hrs/week</option>'
      +       '<option value="10-20">10\u201320 hrs/week</option>'
      +       '<option value="20+">20+ hrs/week</option>'
      +     '</select>'
      +   '</div>'
      +   '<div class="audit-step-nav">'
      +     '<button class="btn btn-ghost" onclick="auditBack(2)">\u2190 Back</button>'
      +     '<button class="btn btn-primary" onclick="auditNext(2)">Next \u2192</button>'
      +   '</div>'
      + '</div>'

      + '<div class="audit-step" id="audit-step-3" style="display:none;">'
      +   '<h3 class="audit-step-title">Book your free audit</h3>'
      +   '<div class="form-row">'
      +     '<div class="form-group">'
      +       '<label for="name">Full name</label>'
      +       '<input type="text" id="name" name="name" placeholder="Your name">'
      +     '</div>'
      +     '<div class="form-group">'
      +       '<label for="email">Email address</label>'
      +       '<input type="email" id="email" name="email" placeholder="your@email.com">'
      +     '</div>'
      +   '</div>'
      +   '<div class="form-group">'
      +     '<label for="notes">Anything else we should know? <span class="field-optional">(optional)</span></label>'
      +     '<textarea id="notes" name="notes" rows="3" placeholder="Anything specific you would like us to look at?"></textarea>'
      +   '</div>'
      +   '<input type="text" id="audit-honeypot" name="website" autocomplete="off" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;pointer-events:none;">'
      +   '<div class="audit-step-nav">'
      +     '<button class="btn btn-ghost" onclick="auditBack(3)">\u2190 Back</button>'
      +     '<button class="btn btn-primary" id="audit-submit-btn" onclick="auditSubmit()">Book My Free Audit</button>'
      +   '</div>'
      + '</div>'

      + buildCalendlyStep()
      + '</div>';
  }

  /* ── Contact Form (page injection) ── */

  function injectContactForm() {
    var el = document.getElementById('site-contact');
    if (!el) return;

    var variant = el.getAttribute('data-variant') || 'full';
    var tag     = el.getAttribute('data-tag')     || 'Get started';
    var heading = el.getAttribute('data-heading') || 'Let\u2019s map where your time is going';
    var sub     = el.getAttribute('data-sub')     || 'Start with a free audit. No commitment, no sales pitch \u2014 just a clear picture of where your time is going and what can be automated.';

    var formInner;

    if (variant === 'short') {
      /* ── Short variant: name + email + notes only ── */
      formInner = '<div class="audit-form-wrap">'
        + '<div class="audit-step" id="audit-step-3">'
        +   '<h3 class="audit-step-title">Book your free audit</h3>'
        +   '<div class="form-row">'
        +     '<div class="form-group">'
        +       '<label for="name">Full name</label>'
        +       '<input type="text" id="name" name="name" placeholder="Your name">'
        +     '</div>'
        +     '<div class="form-group">'
        +       '<label for="email">Email address</label>'
        +       '<input type="email" id="email" name="email" placeholder="your@email.com">'
        +     '</div>'
        +   '</div>'
        +   '<div class="form-group">'
        +     '<label for="notes">Anything else we should know? <span class="field-optional">(optional)</span></label>'
        +     '<textarea id="notes" name="notes" rows="3" placeholder="Any extra context about your situation..."></textarea>'
        +   '</div>'
        +   '<input type="text" id="audit-honeypot" name="website" autocomplete="off" tabindex="-1" aria-hidden="true" style="position:absolute;left:-9999px;opacity:0;pointer-events:none;">'
        +   '<div style="text-align:right;">'
        +     '<button class="btn btn-primary" id="audit-submit-btn" onclick="auditSubmit()">Book My Free Audit</button>'
        +   '</div>'
        + '</div>'
        + buildCalendlyStep()
        + '</div>';
    } else {
      formInner = buildFullFormInner();
    }

    var section = document.createElement('section');
    section.className = 'contact';
    section.id = 'contact';
    section.innerHTML = '<div class="container">'
      + '<div class="section-header">'
      +   '<span class="section-tag">' + tag + '</span>'
      +   '<h2>' + heading + '</h2>'
      +   '<p class="section-sub">' + sub + '</p>'
      + '</div>'
      + formInner
      + '</div>';

    el.replaceWith(section);
  }

  /* ── Demo contact modal ── */

  function injectDemoContactModal() {
    if (document.getElementById('audit-modal-overlay')) return;

    var style = document.createElement('style');
    style.textContent = [
      '#audit-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.88);z-index:9999;display:none;align-items:flex-start;justify-content:center;padding:40px 20px;overflow-y:auto;}',
      '#audit-modal-overlay.is-open{display:flex;}',
      '.audit-modal-panel{background:#0E1117;border:1px solid rgba(201,168,76,0.18);border-radius:4px;padding:48px 52px;max-width:580px;width:100%;position:relative;margin:auto;}',
      '.audit-modal-panel .section-header{margin-bottom:32px;}',
      '.audit-modal-panel .section-header h2{font-size:clamp(22px,3vw,30px);}',
      '.audit-modal-close{position:absolute;top:16px;right:20px;background:none;border:none;color:rgba(255,255,255,0.35);font-size:20px;cursor:pointer;padding:6px 10px;line-height:1;transition:color 0.2s;}',
      '.audit-modal-close:hover{color:rgba(255,255,255,0.8);}',
      '@media(max-width:600px){.audit-modal-panel{padding:36px 24px;}}',
    ].join('');
    document.head.appendChild(style);

    var overlay = document.createElement('div');
    overlay.id = 'audit-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Book a free audit');
    overlay.innerHTML = '<div class="audit-modal-panel" onclick="event.stopPropagation()">'
      + '<button class="audit-modal-close" onclick="closeAuditModal()" aria-label="Close">\u2715</button>'
      + '<div class="section-header">'
      +   '<span class="section-tag">Get started</span>'
      +   '<h2>Let\u2019s build this for you</h2>'
      +   '<p class="section-sub">Start with a free audit \u2014 we\u2019ll map your workflows and show you exactly what can be automated.</p>'
      + '</div>'
      + buildFullFormInner()
      + '</div>';
    document.body.appendChild(overlay);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeAuditModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeAuditModal();
    });
  }

  window.openAuditModal = function () {
    var overlay = document.getElementById('audit-modal-overlay');
    if (!overlay) return;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (typeof window.showStep === 'function') window.showStep(1);
  };

  window.closeAuditModal = function () {
    var overlay = document.getElementById('audit-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  /* ── Google Analytics ── */
  function injectAnalytics() {
    var GA_ID = 'G-S0XM9C592L';
    var s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s1);
    var s2 = document.createElement('script');
    s2.textContent =
      'window.dataLayer = window.dataLayer || [];'
      + 'function gtag(){dataLayer.push(arguments);}'
      + 'gtag("js", new Date());'
      + 'gtag("config", "' + GA_ID + '");';
    document.head.appendChild(s2);
  }

  /* ── CTA click tracking ── */
  function initCtaTracking() {
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.btn-primary, .btn-ghost');
      if (!btn) return;
      var label = (btn.textContent || btn.innerText || '').trim().substring(0, 50);
      gtag('event', 'cta_click', { cta_label: label });
    });
  }

  /* ── ROI Calculator page tracking ── */
  function initRoiTracking() {
    if (!document.querySelector('.roi-section')) return;
    gtag('event', 'roi_calculator_viewed');
  }

  /* ── Calendly appointment tracking ── */
  function initCalendlyTracking() {
    window.addEventListener('message', function (e) {
      if (e.data && e.data.event === 'calendly.event_scheduled') {
        gtag('event', 'calendly_booked');
      }
    });
  }

  /* ── GTM noscript (injected immediately after <body> opens) ── */
  function injectGtmNoscript() {
    var ns = document.createElement('noscript');
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.googletagmanager.com/ns.html?id=GTM-52T88XLZ';
    iframe.height = '0';
    iframe.width = '0';
    iframe.style.cssText = 'display:none;visibility:hidden';
    ns.appendChild(iframe);
    document.body.insertBefore(ns, document.body.firstChild);
  }

  /* ── Chat Widget (auto-injected on every page) ── */
  function injectChatWidget() {
    /* Skip if a widget container already exists in the markup */
    if (document.getElementById('apex-chat-widget')) return;
    var div = document.createElement('div');
    div.id = 'apex-chat-widget';
    document.body.appendChild(div);
  }

  /* Run — script is placed at end of <body> so DOM is ready */
  injectGtmNoscript();
  injectAnalytics();
  injectHeader();
  injectFooter();
  initMobileMenu();
  initDesktopDropdowns();
  injectContactForm();
  injectDemoContactModal();
  injectChatWidget();
  initCtaTracking();
  initRoiTracking();
  initCalendlyTracking();

})();
