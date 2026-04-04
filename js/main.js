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

/* ============================================================
   APEX SYSTEMATIC — CHAT WIDGET
   Paste this block into main.js
   Then add this HTML just before </body> in your index.html:

   <div id="apex-chat-widget"></div>

   ============================================================ */

(function () {
  'use strict';

  // ── Config — update before going live ──────────────────────
  const WEBHOOK_URL      = 'YOUR_MAKE_WEBHOOK_URL'; // ← Replace
  const USE_LIVE_WEBHOOK = false;                    // ← Set true once Make.com scenario is live
  // ──────────────────────────────────────────────────────────

  // ── Mock responses (used while USE_LIVE_WEBHOOK is false) ──
  const mockResponses = [
    {
      trigger: ['law firm', 'lawyer', 'solicitor', 'legal'],
      reply: `For law firms the biggest wins are usually:\n\n**Client intake & qualification** — automatic triage of enquiries, sending Calendly links to qualified leads and polite decline emails to others.\n\n**Document generation** — engagement letters, client care letters generated automatically from intake data.\n\nWhat does your current intake process look like?`
    },
    {
      trigger: ['ifa', 'financial advisor', 'financial adviser', 'wealth'],
      reply: `For IFAs, onboarding and reporting are typically the biggest time drains.\n\n**Client onboarding** — from enquiry to signed letter of engagement, fully automated.\n\n**Suitability reports** — structured drafts generated automatically, ready for your review.\n\nAre you looking to automate a specific part of your workflow?`
    },
    {
      trigger: ['cost', 'price', 'how much', 'pricing', 'fee'],
      reply: `Project-based pricing — you pay once and own the system outright. No retainers, no monthly fees.\n\n- **Quick Win** — one automation, 2-week delivery\n- **Full System** — multiple workflows, 4–6 weeks\n- **Ongoing Partner** — monthly sprints\n\nEvery engagement starts with a free audit. Want to book one?`
    },
    {
      trigger: ['retainer', 'monthly', 'subscription', 'lock-in'],
      reply: `No retainers, no monthly fees — that's a core part of how we work.\n\nYou pay for the project once and own it outright. Most agencies lock you in, we don't.\n\nWant to start with a free audit to see what's possible?`
    },
    {
      trigger: ['how long', 'timeline', 'weeks', 'deliver'],
      reply: `Quick Win builds take **2 weeks**. Full System builds are **4–6 weeks**.\n\nProcess: free audit call → fixed-price proposal within 24hrs → build → handover with full documentation.\n\nWould you like to book an audit call?`
    }
  ];

  function getMock(msg) {
    const lower = msg.toLowerCase();
    for (const r of mockResponses) {
      if (r.trigger.some(t => lower.includes(t))) return r.reply;
    }
    return `Happy to help. AI automation can eliminate a lot of the manual work in professional practices — intake, documents, reporting, onboarding.\n\nThe best starting point depends on where you're losing the most time. What's your role, and what's taking up too much of your day?`;
  }

  // ── State ──────────────────────────────────────────────────
  let history  = [];
  let isTyping = false;
  let isOpen   = false;

  // ── Build DOM ──────────────────────────────────────────────
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
          <div class="apex-chat-avatar">⚡</div>
          <div class="apex-chat-header-info">
            <strong>Apex AI Assistant</strong>
            <span>Usually replies instantly</span>
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
            oninput="apexResize(this)"
          ></textarea>
          <button class="apex-send" id="apexSend" onclick="apexSend()">→</button>
        </div>
        <div class="apex-branding">
          Powered by <a href="https://apexsystematic.com" target="_blank">Apex Systematic</a>
        </div>
      </div>
    `;

    // Initial bot message
    setTimeout(() => {
      apexAddMsg('bot', "Hi there 👋 I'm the Apex AI assistant.\n\nAsk me anything about automating your practice — or just tell me what's taking up too much of your time.");
    }, 600);
  }

  // ── Toggle ─────────────────────────────────────────────────
  window.apexToggleChat = function () {
    isOpen = !isOpen;
    const bubble = document.getElementById('apex-chat-bubble');
    const win    = document.getElementById('apex-chat-window');
    const unread = document.getElementById('apexUnread');

    bubble.classList.toggle('open', isOpen);
    win.classList.toggle('open', isOpen);
    unread.classList.remove('show');

    if (isOpen) {
      setTimeout(() => document.getElementById('apexInput').focus(), 300);
    }
  };

  // ── Add message ────────────────────────────────────────────
  function apexAddMsg(role, text) {
    const messages = document.getElementById('apexMessages');

    const msg = document.createElement('div');
    msg.className = `apex-msg apex-${role}`;

    const av = document.createElement('div');
    av.className = 'apex-msg-av';
    av.textContent = role === 'bot' ? '⚡' : '👤';

    const bubble = document.createElement('div');
    bubble.className = 'apex-bubble';
    bubble.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>');

    msg.appendChild(av);
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
      <div class="apex-msg-av">⚡</div>
      <div class="apex-typing-dots"><span></span><span></span><span></span></div>
    `;
    messages.appendChild(t);
    messages.scrollTop = messages.scrollHeight;
  }

  function apexRemoveTyping() {
    const t = document.getElementById('apexTyping');
    if (t) t.remove();
  }

  // ── Send ───────────────────────────────────────────────────
  window.apexSend = async function () {
    const input   = document.getElementById('apexInput');
    const message = input.value.trim();
    if (!message || isTyping) return;

    isTyping = true;
    input.value = '';
    apexResize(input);
    document.getElementById('apexSend').disabled = true;

    apexAddMsg('user', message);
    history.push({ role: 'user', content: message });
    apexShowTyping();

    try {
      let reply;

      if (USE_LIVE_WEBHOOK && WEBHOOK_URL !== 'YOUR_MAKE_WEBHOOK_URL') {
        const res  = await fetch(WEBHOOK_URL, {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body:    JSON.stringify({ message, history })
        });
        const data = await res.json();
        reply = data.reply;
      } else {
        await new Promise(r => setTimeout(r, 1400 + Math.random() * 800));
        reply = getMock(message);
      }

      // Strip any lead-capture signal before displaying
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

  window.apexResize = function (el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 80) + 'px';
  };

  // ── Init ───────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
