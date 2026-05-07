// apex-proposals — serve personalised proposal pages from KV
// Requires KV binding: PROPOSALS_KV (id: e48f3cb978ed4a33a7f3742e151f8593)
// Domain: proposals.apexsystematic.com

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight (for Make writing to KV via this worker)
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    // POST /save — Make calls this to store a proposal
    if (request.method === 'POST' && (url.pathname === '/save' || url.pathname === '/proposals/save')) {
      return handleSave(request, env);
    }

    // GET /[uuid] — visitor opens their proposal link
    if (request.method === 'GET') {
      const match = url.pathname.match(/^\/([a-zA-Z0-9_-]{8,64})$/);
      if (match) {
        return handleServe(match[1], env);
      }
    }

    // Everything else — styled not-found
    return new Response(notFoundPage(), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
};

/* ── Save (called by Make) ── */
async function handleSave(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return jsonResponse({ error: 'Invalid JSON' }, 400);
  }

  const { uuid, proposal } = data;
  if (!uuid || !proposal) {
    return jsonResponse({ error: 'Missing uuid or proposal' }, 400);
  }

  // Store with 90-day TTL
  await env.PROPOSALS_KV.put(uuid, JSON.stringify(proposal), {
    expirationTtl: 60 * 60 * 24 * 90
  });

  return jsonResponse({ ok: true, uuid }, 200);
}

/* ── Serve (visitor opens link) ── */
async function handleServe(uuid, env) {
  const raw = await env.PROPOSALS_KV.get(uuid);
  if (!raw) {
    return new Response(notFoundPage(), {
      status: 404,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }

  let proposal;
  try {
    proposal = JSON.parse(raw);
  } catch {
    return new Response('Proposal data corrupted', { status: 500 });
  }

  const html = renderProposal(proposal);
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}

/* ── Render ── */
function renderProposal(p) {
  // p shape:
  // {
  //   practiceType, practiceLabel,
  //   automationNum, automationName,
  //   painLabel,
  //   hoursLabel, hrsSaved,
  //   currency, currencySymbol,
  //   rate,
  //   priceRange,   // e.g. "£1,100–£2,100"
  //   roiWeeks,     // e.g. "6.2 weeks" | "under 1 week" | "over a year"
  //   included,     // string[]
  //   whatItDoes,
  //   stopDoing,
  //   buildTime,
  //   tone,
  //   generatedAt   // ISO date string
  // }

  const toneIntro = tonePrefix(p.tone);
  const dateStr   = formatDate(p.generatedAt);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, nofollow">
  <title>Your Automation Proposal — Apex Systematic</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" sizes="32x32" href="https://apexsystematic.com/assets/images/favicon.png">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:      #0d1117;
      --surface: #161c26;
      --border:  #1e2a38;
      --gold:    #c9a84c;
      --gold-lt: #e8c97a;
      --text:    #e8e4da;
      --muted:   #8a9bb0;
      --radius:  6px;
    }

    html { font-size: 16px; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-weight: 400;
      line-height: 1.6;
      min-height: 100vh;
      padding: 0 0 80px;
    }

    /* ── Header bar ── */
    .proposal-header {
      border-bottom: 1px solid var(--border);
      padding: 24px 0;
      margin-bottom: 56px;
    }
    .proposal-header-inner {
      max-width: 760px;
      margin: 0 auto;
      padding: 0 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .proposal-logo {
      display: inline-block;
      line-height: 0;
      text-decoration: none;
    }
    .proposal-date {
      font-size: 0.8rem;
      color: var(--muted);
    }

    /* ── Container ── */
    .container {
      max-width: 760px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ── Section tag ── */
    .section-tag {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 16px;
    }

    /* ── Hero ── */
    .proposal-hero {
      margin-bottom: 48px;
    }
    .proposal-hero h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: clamp(1.8rem, 4vw, 2.6rem);
      font-weight: 700;
      line-height: 1.2;
      color: var(--text);
      margin-bottom: 16px;
    }
    .proposal-hero p {
      font-size: 1rem;
      color: var(--muted);
      max-width: 580px;
    }
    .pain-tag {
      display: inline-block;
      background: rgba(201,168,76,0.12);
      border: 1px solid rgba(201,168,76,0.25);
      color: var(--gold);
      font-size: 0.78rem;
      font-weight: 500;
      padding: 5px 12px;
      border-radius: 20px;
      margin-top: 20px;
    }

    /* ── Card ── */
    .ao-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 36px;
      margin-bottom: 24px;
    }
    .ao-card-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--text);
      margin-bottom: 14px;
    }
    .ao-card-what {
      font-size: 0.95rem;
      color: var(--muted);
      margin-bottom: 12px;
      line-height: 1.65;
    }
    .ao-card-stop {
      font-size: 0.82rem;
      color: var(--muted);
      opacity: 0.75;
      margin-bottom: 24px;
      font-style: italic;
    }
    .ao-card-included {
      list-style: none;
      margin-bottom: 28px;
    }
    .ao-card-included li {
      font-size: 0.88rem;
      color: var(--text);
      padding: 7px 0;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: flex-start;
      gap: 10px;
    }
    .ao-card-included li::before {
      content: '';
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--gold);
      margin-top: 7px;
      flex-shrink: 0;
    }
    .ao-card-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      padding-top: 24px;
      border-top: 1px solid var(--border);
    }
    .ao-card-stat {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .ao-stat-label {
      font-size: 0.72rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--muted);
    }
    .ao-stat-val {
      font-size: 1rem;
      font-weight: 500;
      color: var(--text);
    }
    .ao-stat-val--gold {
      color: var(--gold);
      font-weight: 500;
    }

    /* ── ROI block ── */
    .ao-roi {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 28px 36px;
      margin-bottom: 24px;
    }
    .ao-roi-label {
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--muted);
      margin-bottom: 10px;
    }
    .ao-roi-text {
      font-size: 1rem;
      color: var(--text);
      line-height: 1.6;
    }
    .ao-roi-text strong {
      color: var(--gold);
    }

    /* ── Exclusions ── */
    .ao-exclusions {
      font-size: 0.78rem;
      color: var(--muted);
      margin-bottom: 40px;
      line-height: 1.6;
    }

    /* ── CTA ── */
    .ao-cta {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 36px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 32px;
    }
    .ao-cta-text strong {
      display: block;
      font-size: 1rem;
      font-weight: 500;
      color: var(--text);
      margin-bottom: 6px;
    }
    .ao-cta-text p {
      font-size: 0.88rem;
      color: var(--muted);
      max-width: 420px;
    }
    .btn-primary {
      display: inline-block;
      background: var(--gold);
      color: #0d1117;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.88rem;
      font-weight: 500;
      padding: 13px 26px;
      border-radius: var(--radius);
      text-decoration: none;
      white-space: nowrap;
      transition: background 0.15s;
    }
    .btn-primary:hover { background: var(--gold-lt); }

    /* ── Footer ── */
    .proposal-footer {
      margin-top: 64px;
      padding-top: 32px;
      border-top: 1px solid var(--border);
      text-align: center;
    }
    .proposal-footer a {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 0.95rem;
      color: var(--gold);
      text-decoration: none;
    }
    .proposal-footer p {
      font-size: 0.75rem;
      color: var(--muted);
      margin-top: 8px;
    }

    /* ── Mobile ── */
    @media (max-width: 600px) {
      .ao-card { padding: 24px 20px; }
      .ao-card-stats { grid-template-columns: 1fr 1fr; }
      .ao-cta { flex-direction: column; align-items: flex-start; }
      .proposal-header-inner { flex-direction: column; align-items: flex-start; gap: 4px; }
    }
  </style>
</head>
<body>

  <header class="proposal-header">
    <div class="proposal-header-inner">
      <a href="https://apexsystematic.com" class="proposal-logo" aria-label="Apex Systematic">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="30 42 380 70" height="36" role="img"><title>Apex Systematic</title><line x1="54" y1="48" x2="34" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"></line><line x1="54" y1="48" x2="74" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"></line><line x1="34" y1="82" x2="74" y2="82" stroke="#FFFFFF" stroke-width="2.2" stroke-linecap="square"></line><circle cx="54" cy="48" r="2.5" fill="#C9A84C"></circle><text x="88" y="82" font-family="Georgia, serif" font-size="46" font-weight="400" letter-spacing="10" fill="#FFFFFF">APEX</text><text x="88" y="104" font-family="Helvetica Neue, Arial, sans-serif" font-size="11" font-weight="300" letter-spacing="9.5" fill="#C9A84C">SYSTEMATIC</text></svg>
      </a>
      <span class="proposal-date">Prepared ${dateStr}</span>
    </div>
  </header>

  <main class="container">

    <div class="proposal-hero">
      <span class="section-tag">Your Automation Proposal</span>
      <h1>Here&#8217;s what we&#8217;d build for your ${escHtml(p.practiceLabel)}.</h1>
      <p>Based on your answers, this is the automation that would have the biggest impact on your practice.</p>
      ${p.painLabel ? `<span class="pain-tag">${escHtml(p.painLabel)}</span>` : ''}
    </div>

    <div class="ao-card">
      <div class="ao-card-name">${escHtml(p.automationName)}</div>
      <div class="ao-card-what">${escHtml(toneIntro)}${escHtml(p.whatItDoes)}</div>
      <div class="ao-card-stop">You stop: ${escHtml(p.stopDoing)}</div>
      <ul class="ao-card-included">
        ${p.included.map(item => `<li>${escHtml(item)}</li>`).join('\n        ')}
      </ul>
      <div class="ao-card-stats">
        <div class="ao-card-stat">
          <span class="ao-stat-label">Hours saved</span>
          <span class="ao-stat-val">${escHtml(p.hrsSaved)} hrs/wk</span>
        </div>
        <div class="ao-card-stat">
          <span class="ao-stat-label">Build time</span>
          <span class="ao-stat-val">${escHtml(p.buildTime)}</span>
        </div>
        <div class="ao-card-stat">
          <span class="ao-stat-label">Fixed price</span>
          <span class="ao-stat-val ao-stat-val--gold">${escHtml(p.priceRange)}</span>
        </div>
      </div>
    </div>

    <div class="ao-roi">
      <div class="ao-roi-label">Return on investment</div>
      <p class="ao-roi-text">
        At ${escHtml(p.currencySymbol)}${escHtml(String(p.rate))}/hr, recovering ${escHtml(String(p.hrsSaved))} hrs/week
        pays back the full cost of this build in <strong>${escHtml(p.roiWeeks)}</strong>.
      </p>
    </div>

    <p class="ao-exclusions">Prices exclude Make.com subscription and third-party API costs. Full documentation and 30-day bug fix warranty included on every build. You own everything we deliver.</p>

    <div class="ao-cta">
      <div class="ao-cta-text">
        <strong>Got questions about this proposal?</strong>
        <p>Book a free 30-minute call and we&#8217;ll walk through exactly what your build would involve &#8212; and confirm the price before anything starts.</p>
      </div>
      <a href="https://calendly.com/apexsystematic/30min" class="btn-primary">Book a Call</a>
    </div>

    <footer class="proposal-footer">
      <a href="https://apexsystematic.com">apexsystematic.com</a>
      <p>This proposal was generated based on information you provided and is indicative only. Final scope and price confirmed at audit.</p>
    </footer>

  </main>

</body>
</html>`;
}

/* ── Helpers ── */
function tonePrefix(tone) {
  if (tone === 'manual')       return 'Right now this is handled entirely manually. Once built, ';
  if (tone === 'inconsistent') return 'You have something in place, but it\'s inconsistent. This build standardises it completely — ';
  return 'This automation takes over the manual parts of ';
}

function formatDate(iso) {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch { return ''; }
}

function escHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function notFoundPage() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proposal Not Found — Apex Systematic</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
  <style>
    body { background: #0d1117; color: #8a9bb0; font-family: 'DM Sans', sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; text-align: center; padding: 24px; }
    h1 { color: #e8e4da; font-size: 1.4rem; margin-bottom: 12px; }
    p { font-size: 0.9rem; line-height: 1.6; }
    a { color: #c9a84c; }
  </style>
</head>
<body>
  <div>
    <h1>Proposal not found</h1>
    <p>This link may have expired or been entered incorrectly.<br>
    <a href="https://apexsystematic.com/tools/audit/">Generate a new proposal →</a></p>
  </div>
</body>
</html>`;
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function jsonResponse(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders() }
  });
}