/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — audit.js
   8-Hour Audit form logic.
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // --- Config ----------------------------------------------------
  // Endpoint for the Cloudflare Worker that handles the submission.
  // Update this once the Worker is deployed.
  var ENDPOINT = '/api/audit';

  var TOTAL_STEPS = 10;

  // --- Element refs ---------------------------------------------
  var introScreen   = document.getElementById('intro-screen');
  var formScreen    = document.getElementById('form-screen');
  var thankyouScreen = document.getElementById('thankyou-screen');
  var startBtn      = document.getElementById('audit-start-btn');
  var form          = document.getElementById('audit-form');
  var errorBox      = document.getElementById('audit-error');
  var progressBar   = document.getElementById('audit-progress-bar');
  var stepCurrent   = document.getElementById('audit-step-current');
  var stepTotal     = document.getElementById('audit-step-total');
  var backNav       = document.getElementById('audit-back-nav');
  var backBtn       = document.getElementById('audit-back-btn');
  var submitBtn     = document.getElementById('audit-submit-btn');

  if (!form) return; // safety: if markup isn't on the page, do nothing

  stepTotal.textContent = TOTAL_STEPS;

  // --- State ----------------------------------------------------
  var currentStep = 1;
  var data = {
    firm_type: null,
    firm_size: null,
    top_timesinks: [],
    weekly_hours_lost: null,
    current_software: [],
    previous_automation: null,
    main_blocker: null,
    reclaimed_time_use: null,
    budget: null,
    email: '',
    firm_name: ''
  };

  // --- Helpers --------------------------------------------------
  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.style.display = 'block';
  }

  function clearError() {
    errorBox.style.display = 'none';
    errorBox.textContent = '';
  }

  function updateProgress() {
    var pct = Math.round((currentStep / TOTAL_STEPS) * 100);
    progressBar.style.width = pct + '%';
    stepCurrent.textContent = currentStep;
    backNav.hidden = currentStep === 1;
  }

  function showStep(n) {
    var steps = form.querySelectorAll('.audit-step');
    steps.forEach(function (s) {
      s.classList.toggle('is-active', Number(s.dataset.step) === n);
    });
    currentStep = n;
    updateProgress();
    clearError();
    // Scroll to top of form on mobile
    if (window.innerWidth < 768) {
      formScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function goNext() {
    if (currentStep < TOTAL_STEPS) {
      showStep(currentStep + 1);
    }
  }

  function goBack() {
    if (currentStep > 1) {
      showStep(currentStep - 1);
    }
  }

  // --- Start button ---------------------------------------------
  startBtn.addEventListener('click', function () {
    introScreen.hidden = true;
    formScreen.hidden = false;
    showStep(1);
    formScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // --- Back button ----------------------------------------------
  backBtn.addEventListener('click', goBack);

  // --- Option selection (single + multi) ------------------------
  form.addEventListener('click', function (e) {
    var btn = e.target.closest('.audit-option');
    if (!btn) return;

    var group = btn.closest('.audit-options');
    var name = group.dataset.name;
    var type = group.dataset.type;
    var max = group.dataset.max ? Number(group.dataset.max) : null;
    var value = btn.dataset.value;

    if (type === 'single') {
      // Deselect siblings, select this, then auto-advance.
      group.querySelectorAll('.audit-option').forEach(function (b) {
        b.classList.remove('is-selected');
      });
      btn.classList.add('is-selected');
      data[name] = value;

      // Brief delay so the user sees the selection before moving on.
      setTimeout(goNext, 220);
    } else if (type === 'multi') {
      var arr = data[name];
      var idx = arr.indexOf(value);

      if (idx > -1) {
        arr.splice(idx, 1);
        btn.classList.remove('is-selected');
      } else {
        if (max && arr.length >= max) {
          showError('Maximum ' + max + ' selections.');
          return;
        }
        arr.push(value);
        btn.classList.add('is-selected');
        clearError();
      }
    }
  });

  // --- Continue buttons on multi-select steps -------------------
  form.querySelectorAll('.audit-next-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var step = Number(btn.dataset.step);
      var group = form.querySelector('.audit-step[data-step="' + step + '"] .audit-options');
      var name = group.dataset.name;

      if (data[name].length === 0) {
        showError('Pick at least one option to continue.');
        return;
      }
      goNext();
    });
  });

  // --- Final submit ---------------------------------------------
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearError();

    var emailEl = document.getElementById('audit-email');
    var firmEl = document.getElementById('audit-firm-name');
    var consentEl = document.getElementById('audit-consent');

    data.email = emailEl.value.trim();
    data.firm_name = firmEl.value.trim();

    // Validation
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showError('Please enter a valid work email address.');
      emailEl.focus();
      return;
    }
    if (!data.firm_name) {
      showError('Please enter your firm name.');
      firmEl.focus();
      return;
    }
    if (!consentEl.checked) {
      showError('Please confirm you\'re happy to receive the report.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.classList.add('audit-loading');
    var originalLabel = submitBtn.textContent;
    submitBtn.textContent = 'Generating';

    // Push to dataLayer for GTM (optional but useful)
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'audit_submit',
        firm_type: data.firm_type,
        firm_size: data.firm_size,
        budget: data.budget
      });
    }

    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (res) {
        if (!res.ok) throw new Error('Server returned ' + res.status);
        return res.json().catch(function () { return {}; });
      })
      .then(function () {
        formScreen.hidden = true;
        thankyouScreen.hidden = false;
        thankyouScreen.scrollIntoView({ behavior: 'smooth', block: 'start' });
      })
      .catch(function (err) {
        console.error('Audit submission failed:', err);
        submitBtn.disabled = false;
        submitBtn.classList.remove('audit-loading');
        submitBtn.textContent = originalLabel;
        showError('Something went wrong sending your audit. Please try again, or email apex@apexsystematic.com directly.');
      });
  });

  // --- Initial state --------------------------------------------
  updateProgress();
})();
