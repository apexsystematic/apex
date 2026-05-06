/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — js/main.js
   Page-level interactions
   ═══════════════════════════════════════════ */

(function () {

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    initScrollReveal();
    initFaqAccordion();
    initFaqNav();
  });

  /* ── Scroll reveal ── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    var revealEls = document.querySelectorAll(
        '.service-card, .step, .pricing-card, .opt-c-tier, .testimonial-card, .about-grid, .audit-form-wrap,'
        + '.hero-stat, .barrier-card, .industry-card, .ib-card, .roadmap-step, .roadmap-col,'
        + '.wf-row:not(.wf-header), .insight-band-inner, .stacking-callout, .mid-cta'
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

  /* ── FAQ accordion ── */
  function initFaqAccordion() {
    var items = document.querySelectorAll('.faq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var btn    = item.querySelector('.faq-question');
      var answer = item.querySelector('.faq-answer');
      btn.addEventListener('click', function () {
        var isOpen = item.classList.contains('is-open');
        /* Close all */
        items.forEach(function (i) {
          i.classList.remove('is-open');
          i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          i.querySelector('.faq-answer').style.maxHeight = null;
        });
        /* Open clicked (unless it was already open) */
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    });
  }

  /* ── FAQ side nav ── */
  function initFaqNav() {
    var groups   = document.querySelectorAll('.faq-group');
    var navItems = document.querySelectorAll('.faq-nav-item');
    if (!groups.length || !navItems.length) return;

    function onScroll() {
      var scrollY = window.scrollY + 140;
      var active  = null;
      groups.forEach(function (g) {
        if (g.offsetTop <= scrollY) active = g.id;
      });
      navItems.forEach(function (n) {
        n.classList.toggle('is-active', n.dataset.target === active);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    navItems.forEach(function (n) {
      n.addEventListener('click', function () {
        var target = document.getElementById(n.dataset.target);
        if (target) {
          var offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 97;
          window.scrollTo({ top: target.offsetTop - offset - 32, behavior: 'smooth' });
        }
      });
    });
  }

})();


/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — Audit multi-step form
   ═══════════════════════════════════════════ */

// ── Point this at your Cloudflare Worker ──
const AUDIT_WEBHOOK = 'https://contact.apexsystematic.com';

const auditData = {};

function auditShowError(message) {
  let el = document.getElementById('audit-error');
  if (!el) {
    el = document.createElement('p');
    el.id = 'audit-error';
    const wrap = document.querySelector('.audit-form-wrap');
    if (wrap) wrap.prepend(el);
  }
  el.textContent = message;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4000);
}

window.auditNext = function (step) {
  if (step === 1) {
    const role = document.getElementById('role').value;
    const teamSize = document.getElementById('team-size').value;
    if (!role || !teamSize) {
      auditShowError('Please complete both fields before continuing.');
      return;
    }
    auditData.role = role;
    auditData.team_size = teamSize;
    gtag('event', 'audit_start');
  }

  if (step === 2) {
    const pain = document.getElementById('pain').value;
    const hoursLost = document.getElementById('hours-lost').value;
    if (!pain || !hoursLost) {
      auditShowError('Please complete both fields before continuing.');
      return;
    }
    auditData.pain = pain;
    auditData.hours_lost = hoursLost;
    gtag('event', 'audit_step2_complete');
  }

  window.showStep(step + 1);
};

window.auditBack = function (step) {
  window.showStep(step - 1);
};

window.auditSubmit = async function () {
  const name  = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const notes = document.getElementById('notes').value.trim();

  if (!name || !email) {
    auditShowError('Please enter your name and email.');
    return;
  }

  auditData.name  = name;
  auditData.email = email;
  auditData.notes = notes;

  // ── Honeypot: include the hidden field value (always blank for real users) ──
  auditData.website = document.getElementById('audit-honeypot')?.value || '';

  const btn = document.getElementById('audit-submit-btn');
  btn.textContent = 'Sending...';
  btn.disabled = true;

  try {
    const res = await fetch(AUDIT_WEBHOOK, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(auditData)
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `Server error ${res.status}`);
    }

    gtag('event', 'audit_submitted');
  } catch (e) {
    console.error('Submission error:', e);
    auditShowError('Something went wrong. Please try again or email us directly.');
    btn.textContent = 'Get My Free Audit';
    btn.disabled = false;
    return;
  }

  window.showStep(4);
};

window.showStep = function (step) {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('audit-step-' + i);
    if (el) el.style.display = i === step ? 'block' : 'none';
  }

  const bar   = document.getElementById('audit-progress-bar');
  const label = document.getElementById('audit-step-label');

  const progress = { 1: '33%', 2: '66%', 3: '99%', 4: '100%' };
  const labels   = { 1: 'Step 1 of 3', 2: 'Step 2 of 3', 3: 'Step 3 of 3', 4: 'Done' };

  if (bar)   bar.style.width    = progress[step];
  if (label) label.textContent  = labels[step];

  if (step === 4) {
    gtag('event', 'audit_complete');
    gtag('event', 'calendly_viewed');
    const widget = document.querySelector('.calendly-inline-widget');
    if (widget && auditData.name && auditData.email) {
      const name  = encodeURIComponent(auditData.name);
      const email = encodeURIComponent(auditData.email);
      widget.innerHTML = '';
      widget.dataset.url = `https://calendly.com/apexsystematic/30min?name=${name}&email=${email}`;
      const iframe = document.createElement('iframe');
      iframe.src         = `https://calendly.com/apexsystematic/30min?name=${name}&email=${email}&embed_type=Inline&embed_domain=apexsystematic.com`;
      iframe.width       = '100%';
      iframe.height      = '700';
      iframe.frameBorder = '0';
      widget.appendChild(iframe);
    }
  }
};


/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — Chat widget
   ═══════════════════════════════════════════ */

(function () {
  'use strict';

  // ── Config ────────────────────────────────────────────────
  const WEBHOOK_URL = 'https://chat.apexsystematic.com';
  // ─────────────────────────────────────────────────────────

  // ── State ─────────────────────────────────────────────────
  let history  = [];
  let isTyping = false;
  let isOpen   = false;

  // ── Build DOM ─────────────────────────────────────────────
  function init() {
    const wrap = document.getElementById('apex-chat-widget');
    if (!wrap) return;

    wrap.innerHTML = `
      <div id="apex-chat-bubble" onclick="apexToggleChat()">
        <span class="unread-dot show" id="apexUnread"></span>
        <svg class="bubble-open" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0E1117" stroke-width="2.2" stroke-linecap="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
        <svg class="bubble-close" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0E1117" stroke-width="2.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
      <div id="apex-chat-window">
        <div class="apex-chat-header">
          <div class="apex-chat-header-info">
            <strong>Apex AI Assistant</strong>
          </div>
          <div class="apex-online"></div>
        </div>
        <div class="apex-messages" id="apexMessages"></div>
        <div class="apex-input-area">
          <textarea
            class="apex-input"
            id="apexInput"
            placeholder="Ask me anything..."
            rows="1"
            onkeydown="apexHandleKey(event)"
          ></textarea>
          <button class="apex-send" id="apexSend" onclick="apexSend()">→</button>
        </div>
        <div class="apex-branding">
          Powered by <a href="https://apexsystematic.com" target="_blank">Apex Systematic</a>
        </div>
      </div>
    `;

    setTimeout(() => {
      apexAddMsg('bot', "Hi there 👋 I'm the Apex AI assistant.\n\nAsk me anything about automating your practice — or just tell me what's taking up too much of your time.");
    }, 600);
  }

  // ── Toggle ────────────────────────────────────────────────
  window.apexToggleChat = function () {
    isOpen = !isOpen;
    const bubble = document.getElementById('apex-chat-bubble');
    const win    = document.getElementById('apex-chat-window');
    const unread = document.getElementById('apexUnread');

    bubble.classList.toggle('open', isOpen);
    win.classList.toggle('open', isOpen);
    unread.classList.remove('show');

    if (isOpen) {
      if (typeof gtag === 'function') gtag('event', 'chatbot_opened');
      setTimeout(() => document.getElementById('apexInput').focus(), 300);
    }
  };

  // ── Add message ───────────────────────────────────────────
  function apexAddMsg(role, text) {
    const messages = document.getElementById('apexMessages');

    const msg = document.createElement('div');
    msg.className = `apex-msg apex-${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'apex-bubble';
    bubble.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(
        /https:\/\/calendly\.com\/[^\s<"]+/g,
        '<a href="$&" target="_blank" rel="noopener" style="color:#C9A84C;text-decoration:underline;">book directly here</a>'
      )
      .replace(
        /(?<!href=")https?:\/\/(?!calendly\.com)[^\s<"]+/g,
        '<a href="$&" target="_blank" rel="noopener" style="color:#C9A84C;text-decoration:underline;">$&</a>'
      );

    msg.appendChild(bubble);
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;

    if (role === 'bot' && !isOpen) {
      document.getElementById('apexUnread').classList.add('show');
    }
  }

  function apexShowTyping() {
    const messages = document.getElementById('apexMessages');
    const t = document.createElement('div');
    t.className = 'apex-msg apex-bot';
    t.id = 'apexTyping';
    t.innerHTML = `
      <div class="apex-typing-dots"><span></span><span></span><span></span></div>
    `;
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
  }

  function apexRemoveTyping() {
    const t = document.getElementById('apexTyping');
    if (t) t.remove();
  }

  // ── Send ──────────────────────────────────────────────────
  window.apexSend = async function () {
    const input   = document.getElementById('apexInput');
    const message = input.value.trim();
    if (!message || isTyping) return;

    isTyping = true;
    input.value = '';
    document.getElementById('apexSend').disabled = true;

    if (history.filter(m => m.role === 'user').length === 0) {
      if (typeof gtag === 'function') gtag('event', 'chatbot_message_sent');
    }

    apexAddMsg('user', message);
    history.push({ role: 'user', content: message });
    apexShowTyping();

    try {
      const res  = await fetch(WEBHOOK_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ message, history })
      });
      const data = await res.json();
      let reply  = data.reply;
      reply = reply.replace(/LEAD_CAPTURED:\{[^}]+\}/g, '').trim();

      apexRemoveTyping();
      apexAddMsg('bot', reply);
      history.push({ role: 'assistant', content: reply });

    } catch (e) {
      apexRemoveTyping();
      apexAddMsg('bot', 'Sorry, I hit a connection issue. Please try again.');
    }

    isTyping = false;
    document.getElementById('apexSend').disabled = false;
    input.focus();
  };

  window.apexHandleKey = function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      apexSend();
    }
  };

  // ── Init ──────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — Geo pricing
   Prices are stored in Cloudflare KV and
   returned by the geo worker. EUR fallback
   is hardcoded here in case the worker is
   unreachable.
   ═══════════════════════════════════════════ */

(function () {

  // ── EUR fallback (update KV, not here) ──
  const PRICES_FALLBACK = {
    EUR: {
      enquiry_lead_capture:        [1100,  2100],
      appointment_setting:         [800,   1600],
      client_onboarding:           [1600,  3250],
      client_intake_triage:        [1000,  1850],
      client_portal_updates:       [1050,  1950],
      invoice_generation:          [950,   1750],
      document_payment_chasing:    [1050,  1850],
      document_proposal_generation:[1400,  2800],
      deadline_compliance_tracking:[1250,  2550],
      call_notes_crm:              [1050,  1850],
      reporting_data_sync:         [950,   2100],
      client_retention_referrals:  [800,   1600],
      nps_satisfaction_survey:     [700,   1250],
      intake_suite:                [3000,  5900],
      client_suite:                [3400,  6300],
      admin_suite:                 [3950,  7850],
      retention_suite:             [1250,  2500],
      complete_firm:               [10250, 19900],
      addon_chatbot:               [2100,  4650],
      addon_voice_setter:          [2550,  4400],
      addon_rag:                   [2100,  5200],
      addon_crm:                   [3250,  6350],
    }
  };

  const SYMBOLS = { USD: '$', GBP: '£', EUR: '€' };

  let _prices   = null;   // populated from KV via worker
  let _currency = 'EUR';

  // ── Helpers ──────────────────────────────
  function fmt(symbol, amount) {
    return symbol + amount.toLocaleString('en-GB');
  }

  function fmtRange(currency, tier) {
    const table = (_prices && _prices[currency]) || PRICES_FALLBACK[currency] || PRICES_FALLBACK.EUR;
    const entry = table[tier] || (PRICES_FALLBACK.EUR[tier]);
    if (!entry) return '';

    const sym = SYMBOLS[currency] || SYMBOLS.EUR;
    return fmt(sym, entry[0]) + '–' + fmt(sym, entry[1]);
  }

  // ── Apply to DOM ─────────────────────────
  function applyPricing(currency) {
    _currency = currency;

    document.querySelectorAll('[data-tier]').forEach(function (el) {
      const tier = el.dataset.tier;
      const text = fmtRange(currency, tier);
      if (text) el.textContent = text;
    });

    document.querySelectorAll('.currency-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.currency === currency);
    });

    try { localStorage.setItem('apex_currency', currency); } catch (e) {}
  }

  // ── Toggle handler (called from HTML) ────
  window.apexSetCurrency = function (currency) {
    applyPricing(currency);
  };

  // ── Accessors for other scripts (e.g. audit.js) ──
  window.apexGetPrices   = function () { return _prices; };
  window.apexGetCurrency = function () { return _currency; };

  // ── Init ─────────────────────────────────
  async function init() {
    let currency;

    // 1. Honour manual override
    try { currency = localStorage.getItem('apex_currency'); } catch (e) {}

    // 2. Ask the geo worker (returns detected currency + KV prices)
    try {
      const res  = await fetch('https://geo.apexsystematic.com');
      const data = await res.json();
      if (data.prices) _prices = data.prices;
      if (!currency) currency = data.currency;
    } catch (e) {
      // Worker unreachable — EUR fallback prices used
    }

    applyPricing(currency || 'EUR');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();