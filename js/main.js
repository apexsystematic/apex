/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — js/main.js
   Page-level interactions
   ═══════════════════════════════════════════ */

(function () {

  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
  });

  /* ── Scroll reveal ── */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    var revealEls = document.querySelectorAll(
      '.service-card, .step, .pricing-card, .testimonial-card, .about-grid, .audit-form-wrap,'
      + '.hero-stat, .barrier-card, .industry-card, .roadmap-step, .roadmap-col,'
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
   APEX SYSTEMATIC — Localised pricing
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   APEX SYSTEMATIC — Geo pricing
   ═══════════════════════════════════════════ */

(function () {

  // ── Prices per tier ──
  const PRICES = {
    foundation:         { USD: [899,  1499], GBP: [699,  1099], EUR: [799,  1299] },
    connected_practice: { USD: [2199, 3399], GBP: [1599, 2499], EUR: [1899, 2899] },
    agent_suite:        { USD: [4199, 5699], GBP: [3099, 4199], EUR: [3599, 4899] },
  };

  const SYMBOLS = { USD: '$', GBP: '£', EUR: '€' };

  // ── Format ──
  function fmt(symbol, amount) {
    return symbol + amount.toLocaleString('en-GB');
  }

  function fmtRange(currency, tier) {
    const sym = SYMBOLS[currency];
    const [lo, hi] = PRICES[tier][currency];
    return fmt(sym, lo) + '–' + fmt(sym, hi);
  }

  // ── Apply to DOM ──
  function applyPricing(currency) {
    document.querySelectorAll('[data-tier]').forEach(function (el) {
      const tier = el.dataset.tier;
      if (PRICES[tier] && PRICES[tier][currency]) {
        el.textContent = fmtRange(currency, tier);
      }
    });

    document.querySelectorAll('.currency-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.currency === currency);
    });

    try { localStorage.setItem('apex_currency', currency); } catch (e) {}
  }

  // ── Toggle handler (called from HTML) ──
  window.apexSetCurrency = function (currency) {
    applyPricing(currency);
  };

  // ── Init ──
  async function init() {
    let currency;

    // 1. Honour manual override
    try { currency = localStorage.getItem('apex_currency'); } catch (e) {}

    if (!currency) {
      // 2. Ask the geo worker
      try {
        const res  = await fetch('https://geo.apexsystematic.com');
        const data = await res.json();
        currency = data.currency;
      } catch (e) {
        currency = 'EUR'; // fallback
      }
    }

    applyPricing(currency);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
