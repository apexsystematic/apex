// ─────────────────────────────────────────────────────────────────────────────
// APEX SYSTEMATIC — Discovery Framework lock.js
// Client-side password gate. Stores session in sessionStorage.
// ─────────────────────────────────────────────────────────────────────────────

(function () {
  const HASH = '95fa3b1a044c538764200eff4a4658aca6ce59c576fa25d3af18253eb5cc5e62';
  const SESSION_KEY = 'apex_df_auth';

  if (sessionStorage.getItem(SESSION_KEY) === '1') return;

  // ── Inject lock screen ──
  const overlay = document.createElement('div');
  overlay.id = 'df-lock';
  overlay.innerHTML = `
    <div id="df-lock-box">
      <div id="df-lock-logo">
        <span class="df-lock-apex">APEX</span><span class="df-lock-sys">SYSTEMATIC</span>
      </div>
      <div id="df-lock-badge">Discovery Framework</div>
      <input id="df-lock-input" type="password" placeholder="Enter password" autocomplete="current-password" autofocus>
      <button id="df-lock-btn">Unlock</button>
      <p id="df-lock-error"></p>
    </div>`;

  const style = document.createElement('style');
  style.textContent = `
    #df-lock {
      position: fixed; inset: 0; z-index: 9999;
      background: #0E1117;
      display: flex; align-items: center; justify-content: center;
    }
    #df-lock-box {
      display: flex; flex-direction: column; align-items: center;
      gap: 14px; width: 320px;
    }
    #df-lock-logo {
      display: flex; align-items: baseline; gap: 7px; margin-bottom: 4px;
    }
    .df-lock-apex {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.4rem; font-weight: 700; color: #fff; letter-spacing: 0.04em;
    }
    .df-lock-sys {
      font-size: 0.88rem; font-weight: 400; letter-spacing: 0.18em;
      color: #C9A84C; text-transform: uppercase;
      font-family: 'DM Sans', sans-serif;
    }
    #df-lock-badge {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: #4F5B6E; margin-bottom: 12px;
    }
    #df-lock-input {
      width: 100%; padding: 11px 14px;
      background: #131820; color: #D8DCE4;
      border: 1px solid #263040; border-radius: 2px;
      font-family: 'DM Sans', sans-serif; font-size: 0.95rem;
      outline: none; transition: border-color 0.18s ease;
      text-align: center; letter-spacing: 0.12em;
    }
    #df-lock-input:focus { border-color: #2E6DA4; }
    #df-lock-input.shake {
      animation: df-shake 0.35s ease;
      border-color: #c0392b !important;
    }
    #df-lock-btn {
      width: 100%; padding: 11px;
      background: #C9A84C; color: #0E1117;
      border: none; border-radius: 2px; cursor: pointer;
      font-family: 'DM Sans', sans-serif; font-size: 0.95rem; font-weight: 500;
      letter-spacing: 0.06em; transition: background 0.18s ease;
    }
    #df-lock-btn:hover { background: #DDB95A; }
    #df-lock-error {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.85rem; color: #c0392b;
      min-height: 1.2em; text-align: center;
    }
    @keyframes df-shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-8px); }
      40%      { transform: translateX(8px); }
      60%      { transform: translateX(-5px); }
      80%      { transform: translateX(5px); }
    }
  `;

  document.head.appendChild(style);
  document.body.appendChild(overlay);

  // ── Block body scroll while locked ──
  document.body.style.overflow = 'hidden';

  // ── Hash + compare ──
  async function attempt() {
    const val = document.getElementById('df-lock-input').value;
    if (!val) return;

    const buf  = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(val));
    const hash = Array.from(new Uint8Array(buf)).map(x => x.toString(16).padStart(2, '0')).join('');

    if (hash === HASH) {
      sessionStorage.setItem(SESSION_KEY, '1');
      document.body.style.overflow = '';
      overlay.remove();
      style.remove();
    } else {
      const inp = document.getElementById('df-lock-input');
      const err = document.getElementById('df-lock-error');
      inp.classList.remove('shake');
      void inp.offsetWidth; // reflow to restart animation
      inp.classList.add('shake');
      inp.value = '';
      err.textContent = 'Incorrect password.';
      setTimeout(() => { err.textContent = ''; inp.classList.remove('shake'); }, 2000);
    }
  }

  document.getElementById('df-lock-btn').addEventListener('click', attempt);
  document.getElementById('df-lock-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') attempt();
  });
})();
