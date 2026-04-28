/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — audit.js
   Self-serve automation audit tool
═══════════════════════════════════════════ */

(function () {

  /* ── Data ── */

  var AUTOMATIONS = {
    1:  { name: 'Enquiry & Lead Capture',          saveRate: 0.70, priceRange: '£950–£1,800',   buildTime: '1–2 weeks', priceMid: 1375, included: ['AI-powered enquiry triage', 'Automatic lead qualification', 'CRM record creation', 'Instant response to all new enquiries'] },
    2:  { name: 'Appointment Setting',             saveRate: 0.75, priceRange: '£700–£1,400',   buildTime: '1 week',    priceMid: 1050, included: ['Calendar availability sync', 'Automated booking confirmation and reminders', 'No-show follow-up', 'Rescheduling handled automatically'] },
    3:  { name: 'Client Onboarding',               saveRate: 0.60, priceRange: '£1,400–£2,800', buildTime: '2–3 weeks', priceMid: 2100, included: ['Welcome sequence triggered on signature', 'Document request and collection', 'Portal or folder setup', 'Internal team notifications'] },
    4:  { name: 'Document & Proposal Generation',  saveRate: 0.65, priceRange: '£1,200–£2,400', buildTime: '2–3 weeks', priceMid: 1800, included: ['Template-driven document generation', 'Client data pre-populated from your CRM', 'Draft email prepared for review', 'Record saved automatically'] },
    5:  { name: 'Document & Payment Chasing',      saveRate: 0.75, priceRange: '£900–£1,600',   buildTime: '1–2 weeks', priceMid: 1250, included: ['Automated chase sequence on schedule', 'Escalating reminders with custom copy', 'Stops automatically on receipt', 'Status logged to your CRM'] },
    6:  { name: 'Deadline & Compliance Tracking',  saveRate: 0.70, priceRange: '£1,100–£2,200', buildTime: '2–3 weeks', priceMid: 1650, included: ['Deadline monitoring across all matters', 'Escalating alerts to the right people', 'Compliance checklist automation', 'Audit trail maintained automatically'] },
    7:  { name: 'Reporting & Data Sync',           saveRate: 0.70, priceRange: '£800–£1,800',   buildTime: '1–2 weeks', priceMid: 1300, included: ['Scheduled report generation and delivery', 'Bi-directional sync between your systems', 'Data validation and error alerts', 'No manual exports or copy-paste'] },
    8:  { name: 'Client Retention & Referrals',   saveRate: 0.50, priceRange: '£700–£1,400',   buildTime: '1 week',    priceMid: 1050, included: ['Automated check-in sequences', 'Anniversary and milestone triggers', 'Referral request workflows', 'Re-engagement for lapsed clients'] },
    9:  { name: 'Client Intake Triage',            saveRate: 0.70, priceRange: '£850–£1,600',   buildTime: '1–2 weeks', priceMid: 1225, included: ['Inbound request classification', 'Routing to the right team member', 'Priority scoring and queue management', 'Acknowledgement sent automatically'] },
    10: { name: 'Invoice Generation',              saveRate: 0.80, priceRange: '£800–£1,500',   buildTime: '1–2 weeks', priceMid: 1150, included: ['Invoices generated from completed work', 'Sent automatically on trigger', 'Payment status tracked and updated', 'Overdue escalation without manual input'] },
    11: { name: 'Call Notes to CRM',               saveRate: 0.75, priceRange: '£900–£1,600',   buildTime: '1 week',    priceMid: 1250, included: ['Meeting transcription and summarisation', 'Action items extracted and assigned', 'CRM record updated automatically', 'Follow-up email drafted for review'] },
    12: { name: 'Client Portal Updates',           saveRate: 0.65, priceRange: '£900–£1,700',   buildTime: '1–2 weeks', priceMid: 1300, included: ['Status updates pushed to client portal', 'Triggered on matter milestones', 'Client notification emails automated', 'No manual logging required'] },
    13: { name: 'NPS & Satisfaction Survey',        saveRate: 0.70, priceRange: '£600–£1,100',   buildTime: '1 week',    priceMid: 850,  included: ['Tally survey triggered automatically after matter close', 'Score and comment pushed to client record', 'High score (9–10) triggers referral nudge', 'Low score (0–6) sends Slack alert for personal follow-up', 'Mid score logged only'] }
  };

  var PAIN_TO_AUTO = {
    'Responding to enquiries and qualifying leads': 1,
    'Booking and managing appointments': 2,
    'Getting new clients set up and onboarded': 3,
    'Generating invoices and chasing payment': 10,
    'Drafting documents, contracts, or proposals': 4,
    'Chasing clients for documents or signatures': 5,
    'Managing requests from existing clients': 9,
    'Tracking deadlines and compliance steps': 6,
    'Keeping clients updated on progress': 12,
    'Capturing call notes and updating records': 11,
    'Moving data between systems or generating reports': 7,
    'Staying in touch with past clients': 8,
    'Staying in touch with and re-engaging past clients': 8,
    'Collecting client feedback and satisfaction scores': 13
  };

  var PRACTICE_LABELS = {
    law: 'law firm',
    accounting: 'accounting practice',
    financial: 'financial advisory firm',
    consulting: 'consulting practice',
    other: 'professional services firm'
  };

  /* ── State ── */
  var state = {
    q1: null, q1Rate: null,
    q2: null, q2Labels: [],
    q3: null, q3Label: null,
    q4: null,
    q5: null,
    currentStep: 1
  };

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initQ1();
    initQ2();
    initQ3();
    initQ4();
    initQ5();
    updateProgress(1);
  });

  /* ── Single-select handler factory ── */
  function initSingleSelect(containerId, stateKey, rateKey, nextStep, extraFn) {
    var container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll('.audit-opt').forEach(function (btn) {
      btn.addEventListener('click', function () {
        container.querySelectorAll('.audit-opt').forEach(function (b) { b.classList.remove('selected'); });
        btn.classList.add('selected');
        state[stateKey] = btn.dataset.value;
        if (rateKey) state[rateKey] = parseInt(btn.dataset.rate, 10);
        if (extraFn) extraFn(btn);
        if (nextStep) setTimeout(function () { goToStep(nextStep); }, 220);
      });
    });
  }

  function initQ1() { initSingleSelect('q1-options', 'q1', 'q1Rate', 2, function () { fireEvent('audit_started'); }); }
  function initQ2() { initSingleSelect('q2-options', 'q2', null, 3, function (btn) { state.q2Labels = [btn.dataset.label]; }); }
  function initQ3() { initSingleSelect('q3-options', 'q3', null, 4, function (btn) { state.q3Label = btn.dataset.label; }); }
  function initQ4() { initSingleSelect('q4-options', 'q4', null, 5); }
  function initQ5() { initSingleSelect('q5-options', 'q5', null, null, function () { setTimeout(renderOutput, 220); }); }

  /* ── Navigation ── */
  function goToStep(step) {
    hideStep(state.currentStep);
    state.currentStep = step;
    showStep(step);
    updateProgress(step);
  }

  function hideStep(n) {
    var el = document.getElementById('step-' + n);
    if (el) el.classList.add('hidden');
  }

  function showStep(n) {
    var el = document.getElementById('step-' + n);
    if (el) el.classList.remove('hidden');
  }

  function updateProgress(step) {
    var pct = Math.round(((step - 1) / 5) * 100);
    var fill  = document.getElementById('audit-progress-fill');
    var label = document.getElementById('audit-progress-label');
    if (fill)  fill.style.width = pct + '%';
    if (label) label.textContent = 'Question ' + step + ' of 5';
  }

  /* Exposed for inline onclick attributes */
  window.auditBack = function (fromStep) {
    if (fromStep <= 1) return;
    goToStep(fromStep - 1);
  };

  window.auditNext = function (fromStep) {
    if (fromStep === 2 && !state.q2) return;
    goToStep(fromStep + 1);
  };

  /* ── Output ── */
  function renderOutput() {
    // Hide the entire questionnaire section — no empty space
    var auditBody = document.querySelector('.audit-body');
    if (auditBody) auditBody.classList.add('hidden');

    var outputSection = document.getElementById('audit-output-section');
    if (outputSection) outputSection.classList.remove('hidden');

    fireEvent('audit_completed');
    buildProposal();

    setTimeout(function () {
      document.getElementById('audit-output-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  function buildProposal() {
    var practiceLabel = PRACTICE_LABELS[state.q1] || 'professional services firm';
    var hoursInput    = parseFloat(state.q3);
    var rate          = state.q1Rate || 100;
    var tone          = state.q5; // 'manual' | 'partial' | 'inconsistent'

    /* Header */
    var headline = document.getElementById('ao-headline');
    headline.textContent = 'Based on your answers, here\'s what we\'d build for your ' + practiceLabel + '.';

    /* Pain tags */
    var painsEl = document.getElementById('ao-pains');
    painsEl.innerHTML = '';
    if (state.q2Labels[0]) {
      var tag = document.createElement('span');
      tag.className = 'ao-pain-tag';
      tag.textContent = state.q2Labels[0];
      painsEl.appendChild(tag);
    }
    /* Cards */
    var cardsEl    = document.getElementById('ao-cards');
    cardsEl.innerHTML = '';

    var combinedHrsSaved = 0;
    var combinedPriceMid = 0;

    [parseInt(state.q2, 10)].forEach(function (autoNum) {
      var a = AUTOMATIONS[autoNum];
      if (!a) return;

      var hrsSavedUpper = Math.round(hoursInput * a.saveRate * 10) / 10;
      var hrsSavedLower = Math.round(hoursInput * (a.saveRate - 0.1) * 10) / 10;
      var hrsDisplay    = hrsSavedLower + '–' + hrsSavedUpper + ' hrs/wk';

      combinedHrsSaved += hrsSavedUpper;
      combinedPriceMid += a.priceMid;

      /* Tone modifier */
      var intro = '';
      if (tone === 'manual') {
        intro = 'Right now this is handled entirely manually. Once built, ';
      } else if (tone === 'inconsistent') {
        intro = 'You have something in place, but it\'s inconsistent. This build standardises it completely — ';
      } else {
        intro = 'This automation takes over the manual parts of ';
      }

      /* Card */
      var card = document.createElement('div');
      card.className = 'ao-card';
      card.innerHTML =
        '<div class="ao-card-name">' + a.name + '</div>' +
        '<div class="ao-card-what">' + intro + getWhatItDoes(autoNum) + '</div>' +
        '<div class="ao-card-stop">You stop: ' + getStopDoing(autoNum) + '</div>' +
        '<ul class="ao-card-included">' +
          a.included.map(function (item) { return '<li>' + item + '</li>'; }).join('') +
        '</ul>' +
        '<div class="ao-card-stats">' +
          '<div class="ao-card-stat"><span class="ao-stat-label">Hours saved</span><span class="ao-stat-val">' + hrsDisplay + '</span></div>' +
          '<div class="ao-card-stat"><span class="ao-stat-label">Build time</span><span class="ao-stat-val">' + a.buildTime + '</span></div>' +
          '<div class="ao-card-stat"><span class="ao-stat-label">Fixed price</span><span class="ao-stat-val ao-stat-val--gold">' + a.priceRange + '</span></div>' +
        '</div>';
      cardsEl.appendChild(card);
    });



    /* Rate + ROI */
    var rateInput = document.getElementById('ao-rate-input');
    rateInput.value = rate;
    updateROI(rate, combinedHrsSaved, combinedPriceMid);

    rateInput.addEventListener('input', function () {
      var r = parseFloat(rateInput.value) || rate;
      fireEvent('audit_rate_adjusted');
      updateROI(r, combinedHrsSaved, combinedPriceMid);
    });

    /* Book a call */
    document.getElementById('ao-book-btn').addEventListener('click', function () {
      fireEvent('audit_call_cta_clicked');
    });
  }

  function updateROI(rate, hrsSaved, priceMid) {
    var roiEl = document.getElementById('ao-roi-calc');
    if (!roiEl || hrsSaved === 0) return;

    var weeklyValue = hrsSaved * rate;
    var weeks       = priceMid / weeklyValue;
    var display;

    if (weeks < 1) {
      display = 'under 1 week';
    } else if (weeks > 52) {
      display = 'over a year';
    } else {
      display = Math.round(weeks * 10) / 10 + ' weeks';
    }

    roiEl.innerHTML =
      'At £' + Math.round(rate) + '/hr, recovering ' +
      Math.round(hrsSaved * 10) / 10 + ' hrs/week pays back the full cost of this build in ' +
      '<strong>' + display + '</strong>.';
  }

  function getCombinedRange(autoNums) {
    var lo = 0, hi = 0;
    autoNums.forEach(function (n) {
      var a = AUTOMATIONS[n];
      if (!a) return;
      var parts = a.priceRange.replace(/£/g, '').split('–');
      lo += parseInt(parts[0].replace(/,/g, ''), 10);
      hi += parseInt(parts[1].replace(/,/g, ''), 10);
    });
    return '£' + lo.toLocaleString() + '–£' + hi.toLocaleString();
  }

  /* ── Email capture ── */
  window.auditEmailSubmit = function (e) {
    e.preventDefault();
    var gdpr = document.getElementById('ao-gdpr-check');
    if (!gdpr.checked) { gdpr.focus(); return; }

    fireEvent('audit_email_captured');

    // Submit to Formspree (update action URL when configured)
    var email = document.getElementById('ao-email-input').value;
    fetch('https://formspree.io/f/apexsystematic', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, source: 'audit_tool' })
    }).catch(function () {}); // silent fail — show confirm regardless

    document.getElementById('ao-email-form').style.display = 'none';
    document.getElementById('ao-email-confirm').classList.remove('hidden');
  };

  /* ── Analytics ── */
  function fireEvent(name) {
    if (typeof gtag === 'function') {
      gtag('event', name);
    }
    if (window.dataLayer) {
      window.dataLayer.push({ event: name });
    }
  }

  /* ── Copy helpers ── */
  function getWhatItDoes(n) {
    var map = {
      1:  'it handles every inbound enquiry automatically — qualifying the lead, updating your CRM, and triggering the right follow-up without you lifting a finger.',
      2:  'every appointment request, confirmation, and reminder runs on autopilot.',
      3:  'the entire onboarding sequence — from signed agreement to fully set-up client — runs without manual intervention.',
      4:  'your documents and proposals are generated from your templates and data the moment a trigger fires.',
      5:  'every outstanding document or payment is chased on schedule, escalated if needed, and stopped the moment it\'s resolved.',
      6:  'every deadline and compliance step across your matters is tracked, flagged, and escalated automatically.',
      7:  'data moves between your systems on schedule and your reports are built and delivered without manual effort.',
      8:  'your past clients receive timely check-ins, milestone messages, and referral prompts — all without manual effort.',
      9:  'every incoming client request is classified, prioritised, and routed to the right person immediately.',
      10: 'invoices are generated and sent automatically the moment work is completed or a trigger fires.',
      11: 'call notes are transcribed, summarised, and logged to your CRM automatically after every meeting.',
      12: 'your clients receive status updates at every milestone without anyone needing to write or send them.',
      13: 'client satisfaction surveys go out automatically after every matter closes, scores are logged to your CRM, and the right follow-up fires based on the result — without you lifting a finger.'
    };
    return map[n] || 'the manual work is handled automatically end to end.';
  }

  function getStopDoing(n) {
    var map = {
      1:  'manually checking, qualifying, and following up on every new enquiry',
      2:  'back-and-forth booking emails and manual calendar management',
      3:  'chasing documents, setting up folders, and managing the onboarding process yourself',
      4:  'drafting documents and proposals from scratch every time',
      5:  'manually tracking and sending chase emails for overdue items',
      6:  'manually monitoring deadlines and reminding the team about compliance steps',
      7:  'manually exporting data, building reports, and copy-pasting between systems',
      8:  'trying to remember to stay in touch with past clients',
      9:  'triaging every request manually and deciding who should handle it',
      10: 'manually generating, checking, and sending invoices',
      11: 'taking notes during calls and manually updating your CRM afterwards',
      12: 'writing update emails to clients at every stage of a matter',
      13: 'manually sending surveys, chasing responses, and deciding what to do with each score'
    };
    return map[n] || 'doing this manually';
  }

})();
