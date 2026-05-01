// ─────────────────────────────────────────────────────────────────────────────
// APEX SYSTEMATIC — Discovery Framework app.js
// Rendering logic, selector handling, localStorage, print, export
// ─────────────────────────────────────────────────────────────────────────────

const DATA = APEX_DATA; // defined in content_data.js as const APEX_DATA

// ── State ────────────────────────────────────────────────────────────────────
let state = {
  region: null,
  firmType: null,
  currency: '€',
};

// ── Currency map ──────────────────────────────────────────────────────────────
const CURRENCY = { UK: '£', US: '$', EU: '€' };

// ── Regulator label map ───────────────────────────────────────────────────────
const REGULATOR_LABELS = {
  UK: {
    lawFirm:          'SRA register checked?',
    financialAdviser: 'FCA register checked?',
    accounting:       'Professional body register checked? (ICAEW / ACCA / CIOT)',
    consulting:       'Companies House / ICO register checked?',
  },
  US: {
    lawFirm:          'State Bar register checked?',
    financialAdviser: 'SEC IAPD / FINRA BrokerCheck checked?',
    accounting:       'State CPA Board licence checked?',
    consulting:       'State business registry / BBB checked?',
  },
  EU: {
    lawFirm:          'National bar register checked?',
    financialAdviser: 'National regulator register checked? (AMF / BaFin / CBI etc.)',
    accounting:       'Professional body register checked?',
    consulting:       'National business registry / ICO equivalent checked?',
  },
};

// ── DOM helpers ───────────────────────────────────────────────────────────────
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
const el = (tag, cls, inner) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (inner !== undefined) e.innerHTML = inner;
  return e;
};
const esc = str => String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');

// ── localStorage ─────────────────────────────────────────────────────────────
function lsKey(id) { return `apex_df_${id}`; }

function saveField(id, value) {
  try { localStorage.setItem(lsKey(id), value); } catch(e) {}
  flashAutosave();
  updateProgress();
}

function loadField(id) {
  try { return localStorage.getItem(lsKey(id)) || ''; } catch(e) { return ''; }
}

function restoreAllFields() {
  $$('input[data-field-id], textarea[data-field-id], select[data-field-id]').forEach(inp => {
    const val = loadField(inp.dataset.fieldId);
    if (inp.type === 'checkbox') {
      inp.checked = val === '1';
    } else if (inp.type === 'radio') {
      inp.checked = inp.value === val;
    } else {
      inp.value = val;
    }
  });
}

function attachAutoSave(container) {
  container.addEventListener('input', e => {
    const inp = e.target;
    if (!inp.dataset.fieldId) return;
    const val = inp.type === 'checkbox' ? (inp.checked ? '1' : '0') : inp.value;
    saveField(inp.dataset.fieldId, val);
  });
  container.addEventListener('change', e => {
    const inp = e.target;
    if (!inp.dataset.fieldId) return;
    const val = inp.type === 'checkbox' ? (inp.checked ? '1' : '0')
              : inp.type === 'radio' ? (inp.checked ? inp.value : loadField(inp.dataset.fieldId))
              : inp.value;
    saveField(inp.dataset.fieldId, val);
  });
}

function clearFirmTypeFields() {
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('apex_df_ft_')) localStorage.removeItem(k);
    });
  } catch(e) {}
}

function clearRegionFields() {
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('apex_df_reg_')) localStorage.removeItem(k);
    });
  } catch(e) {}
}

function clearAllFields() {
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('apex_df_')) localStorage.removeItem(k);
    });
  } catch(e) {}
}

// ── Autosave flash ────────────────────────────────────────────────────────────
let autosaveTimer;
function flashAutosave() {
  const ind = $('#autosave-indicator');
  ind.textContent = 'Saved ✓';
  ind.classList.add('visible');
  clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(() => ind.classList.remove('visible'), 2000);
}

// ── Progress ──────────────────────────────────────────────────────────────────
function updateProgress() {
  const wrap = $('#progress-wrap');
  const all = $$('input[data-field-id]:not([type="checkbox"]):not([type="radio"]), textarea[data-field-id], select[data-field-id]');
  if (!all.length) { wrap.style.display = 'none'; return; }
  const filled = all.filter(inp => inp.value && inp.value.trim() !== '').length;
  const pct = Math.round((filled / all.length) * 100);
  $('#progress-label').textContent = `${filled} / ${all.length} fields`;
  $('#progress-fill').style.width = pct + '%';
  wrap.style.display = 'flex';
}

// ── Field ID generators ───────────────────────────────────────────────────────
const fid = {
  q:      (qid, idx)        => `q_${qid}_${idx}`,
  table:  (tableId, r, c)   => `tbl_${tableId}_${r}_${c}`,
  check:  (group, idx)      => `ft_check_${group}_${idx}`,
  pct:    (group, idx)      => `ft_pct_${group}_${idx}`,
  rank:   (i)               => `rank_pain_${i}`,
  reg:    (tableId, r, c)   => `reg_${tableId}_${r}_${c}`,
  misc:   (id)              => id,
};

// ── Input elements ────────────────────────────────────────────────────────────
function textInput(fieldId, placeholder, rows) {
  const id = fieldId;
  if (rows && rows > 1) {
    return `<textarea data-field-id="${esc(id)}" rows="${rows}" placeholder="${esc(placeholder||'')}"></textarea>`;
  }
  return `<input type="text" data-field-id="${esc(id)}" placeholder="${esc(placeholder||'')}">`;
}

function selectInput(fieldId, options) {
  const opts = options.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
  return `<select data-field-id="${esc(fieldId)}"><option value="">—</option>${opts}</select>`;
}

function currencyInput(fieldId) {
  return `<div class="df-currency-field">
    <span class="df-currency-symbol">${state.currency}</span>
    <input type="text" data-field-id="${esc(fieldId)}" placeholder="0">
  </div>`;
}

// ── Renderers ─────────────────────────────────────────────────────────────────

function renderSectionHeader(num, title, desc) {
  return `<div class="df-section-header">
    <div>
      <div class="df-section-num">${esc(num)}</div>
      <h2 class="df-section-title">${esc(title)}</h2>
      ${desc ? `<p class="df-section-desc">${esc(desc)}</p>` : ''}
    </div>
  </div>`;
}

function renderSubsectionTitle(num, title) {
  return `<div class="df-subsection-title">${num ? `<span class="sub-num">${esc(num)}</span>` : ''}${esc(title)}</div>`;
}

function renderQuestionCard(q, fieldPrefix) {
  const fieldsHtml = q.fields.map((f, i) => {
    const fId = fieldPrefix ? `${fieldPrefix}_${i}` : fid.q(q.id, i);
    const multiline = f.length > 50 || ['Step', 'step', 'Walk', 'detail', 'process', 'describe'].some(w => f.includes(w));
    return `<div class="df-q-field">
      <label>${esc(f)}</label>
      ${textInput(fId, '', multiline ? 3 : 1)}
    </div>`;
  }).join('');

  return `<div class="df-q-card">
    <div class="df-q-card-header">
      ${q.id ? `<span class="df-q-id">${esc(q.id)}</span>` : ''}
      <span class="df-q-text">${esc(q.question)}</span>
    </div>
    ${q.why ? `<p class="df-q-why">↳ ${esc(q.why)}</p>` : ''}
    <div class="df-q-fields">${fieldsHtml}</div>
  </div>`;
}

function renderCallout(type, title, body) {
  return `<div class="df-callout df-callout-${type}">
    ${title ? `<div class="df-callout-title">${esc(title)}</div>` : ''}
    <p>${body}</p>
  </div>`;
}

function renderTable(headers, rows, id) {
  const headHtml = headers.map(h => `<th>${esc(h)}</th>`).join('');
  const bodyHtml = rows.map((row, r) =>
    `<tr>${row.map((cell, c) => `<td>${cell}</td>`).join('')}</tr>`
  ).join('');
  return `<div class="df-table-wrap">
    <table class="df-table" id="${id||''}">
      <thead><tr>${headHtml}</tr></thead>
      <tbody>${bodyHtml}</tbody>
    </table>
  </div>`;
}

// ── INTRO SECTION ─────────────────────────────────────────────────────────────
function renderIntro() {
  const d = DATA.universal;
  const target = $('#sec-intro');

  const journeyRows = d.clientJourney.map(s =>
    `<div class="df-journey-step">
      <div class="df-journey-num">${s.step}</div>
      <div class="df-journey-timing">${esc(s.timing)}</div>
      <div class="df-journey-content">
        <h4>${esc(s.title)}</h4>
        <p>${esc(s.desc)}</p>
      </div>
    </div>`
  ).join('');

  const callRows = d.callStructure.map((s, i) => [
    esc(s.time), esc(s.focus), esc(s.goal)
  ]);

  target.innerHTML = `
    <div class="df-section" id="intro-section">
      ${renderSectionHeader('Intro', 'The 11-Step Client Journey', 'Reference: how every new client moves from first contact to handover.')}
      <div class="df-subsection">
        <div class="df-journey-grid">${journeyRows}</div>
      </div>
      <div class="df-subsection">
        ${renderSubsectionTitle('', 'How to Run the Call')}
        ${renderTable(['Time', 'Focus', 'Goal'], callRows, 'tbl-call-structure')}
      </div>
    </div>`;
}

// ── PRE-CALL SECTION ──────────────────────────────────────────────────────────
function renderPreCall() {
  const prep = DATA.universal.preCallPrep;
  const regulatorLabel = REGULATOR_LABELS[state.region] && state.firmType
    ? REGULATOR_LABELS[state.region][state.firmType]
    : 'Regulator register checked?';

  const rows = prep.map((item, i) => {
    const label = item.field === 'Regulator register checked?' ? regulatorLabel : item.field;
    const fId = fid.misc(`precall_${i}`);
    return [
      `<td class="df-td-label">${esc(label)}</td>`,
      `<td>${textInput(fId, item.placeholder, 1)}</td>`
    ].join('');
  });

  const tableHtml = `<div class="df-table-wrap"><table class="df-table">
    <thead><tr><th>Field</th><th>Notes</th></tr></thead>
    <tbody>${rows.map(r => `<tr>${r}</tr>`).join('')}</tbody>
  </table></div>`;

  const callout = renderCallout('info', 'Before you dial',
    'Spend 20–30 minutes before the call. Review their website, check the regulator register, note visible tech (booking links, client portals). Fill in what you know before you dial in.');

  $('#sec-precall').innerHTML = `
    <div class="df-section">
      ${renderSectionHeader('Pre-Call', 'Pre-Call Prep', null)}
      ${callout}
      ${tableHtml}
    </div>`;
}

// ── SECTION 1 — FIRM IDENTITY ─────────────────────────────────────────────────
function renderS1() {
  const ft = DATA.firmTypes[state.firmType];
  if (!ft) return;

  // Practice areas checklist
  const paItems = ft.practiceAreas.map((pa, i) => {
    const cId = fid.check(state.firmType + '_pa', i);
    const pId = fid.pct(state.firmType + '_pa', i);
    return `<div class="df-check-item">
      <input type="checkbox" id="${cId}" data-field-id="${cId}">
      <label for="${cId}">${esc(pa)}</label>
      <input type="text" class="df-check-pct" data-field-id="${pId}" placeholder="%" title="% of work">
    </div>`;
  }).join('');

  // Team roles table
  const roleRows = ft.teamRoles.map((role, i) => {
    const rId = fid.table(`ft_roles_${state.firmType}`, i, 0);
    const rId2 = fid.table(`ft_roles_${state.firmType}`, i, 1);
    return `<tr>
      <td class="df-td-label">${esc(role)}</td>
      <td>${textInput(rId, '#', 1)}</td>
      <td>${textInput(rId2, 'Key responsibilities / notes', 1)}</td>
    </tr>`;
  }).join('');

  // Business metrics table
  const metricRows = ft.businessMetrics.map((m, i) => {
    const mId = fid.table(`ft_metrics_${state.firmType}`, i, 0);
    return `<tr>
      <td class="df-td-label">${esc(m.metric)}</td>
      <td>${textInput(mId, '', 1)}</td>
      <td class="df-td-note">${esc(m.note)}</td>
    </tr>`;
  }).join('');

  // Firm name / contact
  const firmFields = [
    { label: 'Firm name', id: 's1_firm_name', ph: '' },
    { label: 'Primary contact', id: 's1_contact', ph: 'Name / Role' },
    { label: 'Phone / email', id: 's1_contact_info', ph: '' },
    { label: 'Founded', id: 's1_founded', ph: 'Year' },
    { label: 'Location(s)', id: 's1_location', ph: '' },
    { label: 'Growth stage', id: 's1_growth', ph: 'Startup / Growing / Stable / Consolidating' },
  ];
  const identityRows = firmFields.map(f =>
    `<tr><td class="df-td-label">${esc(f.label)}</td><td>${textInput(f.id, f.ph, 1)}</td></tr>`
  ).join('');

  $('#sec-s1').innerHTML = `
    <div class="df-section">
      ${renderSectionHeader('Section 1', 'Firm Identity & Structure', null)}

      <div class="df-subsection">
        ${renderSubsectionTitle('1.1', 'Firm Identity')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Field</th><th>Answer</th></tr></thead>
          <tbody>${identityRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('1.2', 'Practice Areas / Service Lines')}
        <p class="df-instruction">Check all that apply. Add approximate % of total work in the field on the right.</p>
        <div class="df-checklist">${paItems}</div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('1.3', 'Team Structure')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Role</th><th>Count</th><th>Responsibilities / Notes</th></tr></thead>
          <tbody>${roleRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('1.4', 'Business Scale & Metrics')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Metric</th><th>Answer</th><th>Note</th></tr></thead>
          <tbody>${metricRows}</tbody>
        </table></div>
      </div>
    </div>`;
}

// ── SECTION 2 — PROCESS ───────────────────────────────────────────────────────
function renderS2() {
  const universal = DATA.universal.coreProcessQuestions;
  const sector = DATA.firmTypes[state.firmType] && DATA.firmTypes[state.firmType].sectorProcessQuestions || [];

  // Group universal questions by sectionTitle
  let currentSection = '';
  let qHtml = '';
  universal.forEach(q => {
    if (q.sectionTitle && q.sectionTitle !== currentSection) {
      currentSection = q.sectionTitle;
      qHtml += `<div class="df-subsection">
        ${renderSubsectionTitle(q.section || '', q.sectionTitle)}`;
    }
    qHtml += renderQuestionCard(q);
  });
  qHtml += '</div>'; // close last subsection

  // Sector-specific questions
  let sectorHtml = '';
  if (sector.length) {
    sectorHtml = `<div class="df-subsection">
      ${renderSubsectionTitle('2.x', `${DATA.firmTypes[state.firmType].label} — Sector-Specific Process`)}
      <span class="badge badge-firmtype" style="margin-bottom:14px;display:inline-block">Firm Type</span>
      ${sector.map(q => renderQuestionCard(q)).join('')}
    </div>`;
  }

  $('#sec-s2').innerHTML = `
    <div class="df-section">
      ${renderSectionHeader('Section 2', 'Process & Pain Points', 'Work through every question. Let them talk — take notes verbatim. The answers here directly drive your automation candidates in Section 6.')}
      ${qHtml}
      ${sectorHtml}
    </div>`;
}

// ── SECTION 3 — TECH STACK ────────────────────────────────────────────────────
function renderS3() {
  const cats = DATA.universal.techStackCategories;
  const painQs = DATA.universal.techPainQuestions;
  const dataInfra = DATA.universal.dataInfrastructureQuestions;
  const ft = DATA.firmTypes[state.firmType];

  // Tech stack fillable table
  const stackRows = cats.map((c, i) => {
    const cId = fid.table('techstack', i, 0);
    const nId = fid.table('techstack', i, 1);
    return `<tr>
      <td class="df-td-label">${esc(c.category)}</td>
      <td>${textInput(cId, c.placeholder, 1)}</td>
      <td>${textInput(nId, 'Notes / version / issues', 1)}</td>
    </tr>`;
  }).join('');

  // Software examples (read-only + in-use toggle)
  const swRows = ft.softwareExamples.map((s, i) => {
    const sId = fid.table(`sw_${state.firmType}`, i, 0);
    return `<tr>
      <td class="df-td-label">${esc(s.category)}</td>
      <td style="color:var(--text-muted);font-size:0.78rem">${esc(s.examples)}</td>
      <td>${selectInput(sId, ['Y','N','N/A','Unsure'])}</td>
    </tr>`;
  }).join('');

  // Data infrastructure
  const infraRows = dataInfra.map((q, i) => {
    const aId = fid.table('datainfra', i, 0);
    return `<tr>
      <td class="df-td-label" style="width:40%">${esc(q.question)}</td>
      <td>${textInput(aId, q.answer || '', 1)}</td>
      <td class="df-td-note">${esc(q.impact)}</td>
    </tr>`;
  }).join('');

  const painCards = painQs.map(q => renderQuestionCard(q)).join('');

  $('#sec-s3').innerHTML = `
    <div class="df-section">
      ${renderSectionHeader('Section 3', 'Technology & Data', 'Map the current stack before discussing what to build. Integration possibilities and constraints come directly from this.')}

      <div class="df-subsection">
        ${renderSubsectionTitle('3.1', 'Core Tech Stack')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Category</th><th>Tool(s) in use</th><th>Notes</th></tr></thead>
          <tbody>${stackRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('3.2', 'Sector Software Reference')}
        <p class="df-instruction">Reference list for this firm type. Note what is in use — do not prompt; let them volunteer names first.</p>
        <span class="badge badge-firmtype" style="margin-bottom:12px;display:inline-block">Firm Type</span>
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Category</th><th>Common platforms</th><th>In use?</th></tr></thead>
          <tbody>${swRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('3.3', 'Tech Pain')}
        ${painCards}
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('3.4', 'Data Infrastructure')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Question</th><th>Answer</th><th>Impact</th></tr></thead>
          <tbody>${infraRows}</tbody>
        </table></div>
      </div>
    </div>`;
}

// ── SECTION 4 — COMPLIANCE ────────────────────────────────────────────────────
function renderS4() {
  const region = DATA.regions[state.region];
  if (!region) return;

  // firmTypeCompliance key mapping
  const ftKeyMap = {
    lawFirm: 'lawFirm',
    financialAdviser: 'financialAdviser',
    accounting: 'accounting',
    consulting: 'consulting',
  };
  const ftKey = ftKeyMap[state.firmType];
  const comp = region.firmTypeCompliance && region.firmTypeCompliance[ftKey];

  const dpHeader = `<div class="df-regulator-badge">
    <span class="df-regulator-label">Data Protection Framework</span>
    <span class="df-regulator-name">${esc(region.dataProtection)}</span>
  </div>
  <div class="df-regulator-badge" style="margin-left:12px">
    <span class="df-regulator-label">Authority</span>
    <span class="df-regulator-name">${esc(region.dataProtectionAuthority)}</span>
  </div>
  <div class="df-regulator-badge" style="margin-left:12px">
    <span class="df-regulator-label">AML Framework</span>
    <span class="df-regulator-name">${esc(region.amlFramework)}</span>
  </div>`;

  // Regulator + obligations (firm type + region combined)
  let regulatorHtml = '';
  if (comp) {
    const oblRows = comp.keyObligations.map((o, i) => {
      const aId = fid.reg(`oblig_${state.region}_${state.firmType}`, i, 0);
      return `<tr>
        <td class="df-td-label">${esc(o.obligation)}</td>
        <td>${textInput(aId, o.answer || '', 1)}</td>
      </tr>`;
    }).join('');

    regulatorHtml = `
      <div class="df-subsection">
        ${renderSubsectionTitle('4.1', 'Regulator & Key Obligations')}
        <span class="badge badge-region" style="margin-bottom:10px;display:inline-block">Region + Firm Type</span>
        <div class="df-regulator-badge" style="margin-bottom:18px">
          <span class="df-regulator-label">Regulator</span>
          <span class="df-regulator-name">${esc(comp.regulator)}</span>
        </div>
        ${renderCallout('warn', 'Compliance Note', esc(comp.complianceNote))}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Obligation</th><th>Status / Answer</th></tr></thead>
          <tbody>${oblRows}</tbody>
        </table></div>
      </div>`;
  }

  // Universal compliance questions
  const ucRows = DATA.universal.universalComplianceQuestions.map((q, i) => {
    const aId = fid.misc(`q_${q.id}_0`);
    const rId = fid.misc(`q_${q.id}_risk`);
    return `<tr>
      <td class="df-td-label">${esc(q.question)}</td>
      <td>${textInput(aId, q.answer || '', 1)}</td>
      <td>${textInput(rId, q.riskLevel || '', 1)}</td>
    </tr>`;
  }).join('');

  // Security questions
  const secRows = DATA.universal.securityQuestions.map((s, i) => {
    const aId = fid.misc(`sec_${i}_ans`);
    return `<tr>
      <td class="df-td-label" style="width:40%">${esc(s.area)}</td>
      <td>${textInput(aId, s.current || '', 1)}</td>
      <td class="df-td-note">${esc(s.flag)}</td>
    </tr>`;
  }).join('');

  // Automation compliance questions
  const aCompCards = DATA.universal.automationComplianceQuestions.map(q => renderQuestionCard(q)).join('');

  // Automation mitigations (read-only)
  let mitigationsHtml = '';
  if (comp && comp.automationMitigations) {
    const mitRows = comp.automationMitigations.map(m =>
      `<tr>
        <td>${esc(m.gap)}</td>
        <td style="color:var(--warn-text)">${esc(m.risk)}</td>
        <td style="color:var(--success-text)">${esc(m.mitigation)}</td>
      </tr>`
    ).join('');
    mitigationsHtml = `<div class="df-subsection">
      ${renderSubsectionTitle('4.5', 'Automation Compliance Mitigations')}
      <span class="badge badge-region" style="margin-bottom:10px;display:inline-block">Region + Firm Type</span>
      <p class="df-instruction">Reference only — use in proposal. Shows where automation closes compliance gaps.</p>
      <div class="df-table-wrap"><table class="df-table">
        <thead><tr><th>Gap identified</th><th>Risk</th><th>Automation mitigation</th></tr></thead>
        <tbody>${mitRows}</tbody>
      </table></div>
    </div>`;
  }

  $('#sec-s4').innerHTML = `
    <div class="df-section">
      ${renderSectionHeader('Section 4', 'Compliance & Risk', 'Cover carefully. Compliance gaps are often the strongest ROI case — and the most sensitive topic.')}

      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px">
        ${dpHeader}
      </div>

      ${regulatorHtml}

      <div class="df-subsection">
        ${renderSubsectionTitle('4.2', 'Data Protection')}
        <span class="badge badge-universal" style="margin-bottom:10px;display:inline-block">Universal</span>
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Question</th><th>Answer</th><th>Risk / Note</th></tr></thead>
          <tbody>${ucRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('4.3', 'Security')}
        <span class="badge badge-universal" style="margin-bottom:10px;display:inline-block">Universal</span>
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Area</th><th>Current state</th><th>Flag</th></tr></thead>
          <tbody>${secRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('4.4', 'Automation Compliance Questions')}
        <span class="badge badge-universal" style="margin-bottom:10px;display:inline-block">Universal</span>
        ${aCompCards}
      </div>

      ${mitigationsHtml}
    </div>`;
}

// ── SECTION 5 — PRIORITIES & BUDGET ──────────────────────────────────────────
function renderS5() {
  const pb = DATA.universal.prioritiesAndBudget;
  const cur = state.currency;

  // Pain ranking
  const rankRows = Array.from({length: 5}, (_, i) => {
    const pId = fid.rank(i);
    const uId = fid.misc(`rank_urgency_${i}`);
    return `<div class="df-pain-row">
      <div class="df-pain-rank-num">${i+1}</div>
      <div>${textInput(pId, 'Pain point (their exact words)', 1)}</div>
      <div>${selectInput(uId, ['Critical','High','Medium','Low'])}</div>
    </div>`;
  }).join('');

  // Constraints table
  const conRows = pb.constraints.map((c, i) => {
    const dId = fid.table('constraints', i, 0);
    return `<tr>
      <td class="df-td-label">${esc(c.constraint)}</td>
      <td>${textInput(dId, c.details || '', 1)}</td>
      <td class="df-td-note">${esc(c.impact)}</td>
    </tr>`;
  }).join('');

  // Budget fields
  const budgetRows = pb.budgetFields.map((f, i) => {
    const bId = fid.table('budget', i, 0);
    const isCurrency = f.question.toLowerCase().includes('budget') || f.question.toLowerCase().includes('spend') || f.question.toLowerCase().includes('invest');
    const inputHtml = isCurrency
      ? currencyInput(bId)
      : textInput(bId, '', 1);
    return `<tr>
      <td class="df-td-label">${esc(f.question)}</td>
      <td>${inputHtml}</td>
      <td class="df-td-note">${esc(f.note)}</td>
    </tr>`;
  }).join('');

  $('#sec-s5').innerHTML = `
    <div class="df-section">
      ${renderSectionHeader('Section 5', 'Priorities & Budget', 'Rank the pain. Confirm the envelope. Identify the decision-maker.')}

      <div class="df-subsection">
        ${renderSubsectionTitle('5.1', 'Pain Ranking')}
        <p class="df-instruction">${esc(pb.painRankingInstruction)}</p>
        <div class="df-pain-rank">
          <div class="df-pain-row" style="font-size:0.7rem;color:var(--text-dim);padding-bottom:4px">
            <div></div><div>Pain point</div><div>Urgency</div>
          </div>
          ${rankRows}
        </div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('5.2', 'Success & Buy-in')}
        ${renderQuestionCard({
          id: null,
          question: pb.successQuestion.question,
          why: pb.successQuestion.why,
          fields: pb.successQuestion.fields,
        }, 'success_q')}
        ${renderQuestionCard({
          id: null,
          question: pb.buyInQuestion.question,
          why: pb.buyInQuestion.why,
          fields: pb.buyInQuestion.fields,
        }, 'buyin_q')}
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('5.3', 'Constraints')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Constraint</th><th>Details</th><th>Impact</th></tr></thead>
          <tbody>${conRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('5.4', 'Budget')}
        ${renderCallout('info', 'Budget Script', esc(pb.budgetScript.replace(/\"/g, '"').replace(/\"/g, '"')))}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Question</th><th>Answer</th><th>Note</th></tr></thead>
          <tbody>${budgetRows}</tbody>
        </table></div>
      </div>
    </div>`;
}

// ── SECTION 6 — BUILD INPUTS ──────────────────────────────────────────────────
function renderS6() {
  const bi = DATA.universal.buildInputs;

  // Platform decision table
  const platRows = bi.platformDecision.map((p, i) => {
    const cId = fid.table('platform', i, 0);
    const rId = fid.table('platform', i, 1);
    return `<tr>
      <td class="df-td-label">${esc(p.decision)}</td>
      <td>${textInput(cId, p.choice, 1)}</td>
      <td>${textInput(rId, 'Rationale / notes', 1)}</td>
    </tr>`;
  }).join('');

  // ROI inputs
  const roiRows = bi.roiInputs.map((inp, i) => {
    const rId = fid.table('roi', i, 0);
    const isCurrency = inp.input.toLowerCase().includes('rate') || inp.input.toLowerCase().includes('value');
    return `<tr>
      <td class="df-td-label">${esc(inp.input)}</td>
      <td>${isCurrency ? currencyInput(rId) : textInput(rId, '', 1)}</td>
    </tr>`;
  }).join('');

  // Automation candidates
  const candidateRows = Array.from({length: 6}, (_, i) => {
    const wfId = fid.table('autocand', i, 0);
    const phId = fid.table('autocand', i, 1);
    const efId = fid.table('autocand', i, 2);
    const prId = fid.table('autocand', i, 3);
    return `<tr>
      <td>${i+1}</td>
      <td>${textInput(wfId, 'e.g. Client onboarding', 1)}</td>
      <td>${textInput(phId, 'Phase 1 / 2 / 3', 1)}</td>
      <td>${selectInput(efId, ['High','Medium','Low'])}</td>
      <td>${selectInput(prId, ['P1','P2','P3'])}</td>
    </tr>`;
  }).join('');

  // Roadmap
  const roadmapRows = bi.roadmapPhases.map((p, i) => {
    const wId = fid.table('roadmap', i, 0);
    const dId = fid.table('roadmap', i, 1);
    return `<tr>
      <td class="df-td-label">${esc(p.phase)}</td>
      <td style="color:var(--text-muted);font-size:0.78rem">${esc(p.weeks)}</td>
      <td>${textInput(wId, p.workflows || 'Key workflows', 2)}</td>
      <td>${textInput(dId, p.dependencies, 1)}</td>
    </tr>`;
  }).join('');

  // Compliance flags
  const flagRows = Array.from({length: 4}, (_, i) => {
    const fId = fid.table('compflag', i, 0);
    const aId = fid.table('compflag', i, 1);
    return `<tr>
      <td>${textInput(fId, 'Compliance gap or flag', 1)}</td>
      <td>${textInput(aId, 'Mitigation or action', 1)}</td>
    </tr>`;
  }).join('');

  // Stakeholder notes
  const stakeRows = Array.from({length: 4}, (_, i) => {
    const nId = fid.table('stakeholder', i, 0);
    const pId = fid.table('stakeholder', i, 1);
    const rId = fid.table('stakeholder', i, 2);
    return `<tr>
      <td>${textInput(nId, 'Name', 1)}</td>
      <td>${textInput(pId, 'Role', 1)}</td>
      <td>${textInput(rId, 'Champion / Neutral / Resistant', 1)}</td>
    </tr>`;
  }).join('');

  $('#sec-s6').innerHTML = `
    <div class="df-section">
      ${renderSectionHeader('Section 6', 'Build Inputs', 'Complete within 2 hours of the call. This feeds directly into the Audit Report and Proposal.')}

      <div class="df-subsection">
        ${renderSubsectionTitle('6.1', 'Automation Candidate Ranking')}
        <p class="df-instruction">List the top automation opportunities in priority order.</p>
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>#</th><th>Workflow / Automation</th><th>Phase</th><th>Effort</th><th>Priority</th></tr></thead>
          <tbody>${candidateRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('6.2', 'Platform & Tier Decision')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Decision</th><th>Choice</th><th>Rationale</th></tr></thead>
          <tbody>${platRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('6.3', 'ROI Inputs')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Input</th><th>Value</th></tr></thead>
          <tbody>${roiRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('6.4', 'Roadmap Draft')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Phase</th><th>Timing</th><th>Workflows</th><th>Dependencies</th></tr></thead>
          <tbody>${roadmapRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('6.5', 'Compliance Flags')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Flag</th><th>Mitigation / Action</th></tr></thead>
          <tbody>${flagRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('6.6', 'Stakeholder Notes')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Name</th><th>Role</th><th>Position</th></tr></thead>
          <tbody>${stakeRows}</tbody>
        </table></div>
      </div>

    </div>`;
}

// ── SECTION 7 — CLOSE ─────────────────────────────────────────────────────────
function renderS7() {
  const cc = DATA.universal.callClose;

  // Next steps table
  const nsRows = cc.nextSteps.map((s, i) => {
    const owId = fid.table('nextsteps', i, 0);
    const dtId = fid.table('nextsteps', i, 1);
    return `<tr>
      <td>${esc(s.action)}</td>
      <td>${textInput(owId, s.owner || '', 1)}</td>
      <td>${textInput(dtId, '', 1)}</td>
    </tr>`;
  }).join('');

  // Self-assessment checklist
  const selfItems = cc.selfAssessment.map((item, i) => {
    const cId = fid.misc(`selfcheck_${i}`);
    return `<div class="df-check-list-item">
      <input type="checkbox" id="${cId}" data-field-id="${cId}">
      <label for="${cId}">${esc(item)}</label>
    </div>`;
  }).join('');

  $('#sec-s7').innerHTML = `
    <div class="df-section">
      ${renderSectionHeader('Section 7', 'Call Close & Next Steps', null)}

      <div class="df-subsection">
        ${renderSubsectionTitle('7.1', 'Confirmation Script')}
        <div class="df-script">
          <div class="df-script-label">Say this before you hang up</div>
          <p>${esc(cc.confirmationScript.replace(/\\\"/g, '"').replace(/"/g,'"').replace(/"/g,'"'))}</p>
        </div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('7.2', 'Next Steps')}
        <div class="df-table-wrap"><table class="df-table">
          <thead><tr><th>Action</th><th>Owner</th><th>Date</th></tr></thead>
          <tbody>${nsRows}</tbody>
        </table></div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('7.3', 'Self-Assessment')}
        <div class="df-check-list">${selfItems}</div>
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('7.4', 'Final Checklist')}
        ${renderCallout('warn', 'Before you write the proposal', esc(cc.finalChecklist))}
      </div>
    </div>`;
}

// ── APPENDIX ──────────────────────────────────────────────────────────────────
function renderAppendix() {
  const app = DATA.universal.appendix;
  const ft = DATA.firmTypes[state.firmType];

  const mvnRows = app.makeVsN8n.map(r => [
    esc(r.factor), esc(r.make), esc(r.n8n)
  ]);

  const svaRows = app.standardVsAgentic.map(r => [
    esc(r.characteristic), esc(r.standard), esc(r.agentic)
  ]);

  // Integration notes (case management / platform)
  let intNotes = '';
  const integrations = ft.caseManagementIntegrations || ft.platformIntegrations || [];
  if (integrations.length) {
    const intRows = integrations.map(r => [
      esc(r.platform), esc(r.makeIntegration), esc(r.notes)
    ]);
    intNotes = `<div class="df-subsection">
      ${renderSubsectionTitle('A3', `${ft.label} — Integration Notes`)}
      <span class="badge badge-firmtype" style="margin-bottom:10px;display:inline-block">Firm Type</span>
      ${renderTable(['Platform', 'Make.com Integration', 'Notes'], intRows, 'tbl-int')}
    </div>`;
  }

  // Compliance mitigations appendix (same as S4)
  const region = DATA.regions[state.region];
  const ftKeyMap = { lawFirm:'lawFirm', financialAdviser:'financialAdviser', accounting:'accounting', consulting:'consulting' };
  const comp = region && region.firmTypeCompliance && region.firmTypeCompliance[ftKeyMap[state.firmType]];
  let mitAppendix = '';
  if (comp && comp.automationMitigations) {
    const mitRows = comp.automationMitigations.map(m => [
      esc(m.gap), `<span style="color:var(--warn-text)">${esc(m.risk)}</span>`, `<span style="color:var(--success-text)">${esc(m.mitigation)}</span>`
    ]);
    mitAppendix = `<div class="df-subsection">
      ${renderSubsectionTitle('A4', 'Automation Compliance Mitigations')}
      <span class="badge badge-region" style="margin-bottom:10px;display:inline-block">Region + Firm Type</span>
      ${renderTable(['Gap', 'Risk', 'Mitigation'], mitRows, 'tbl-mit-app')}
    </div>`;
  }

  $('#sec-appendix').innerHTML = `
    <div class="df-section">
      ${renderSectionHeader('Appendix', 'Reference Tables', 'Decision-support material. Read before the call, reference during.')}

      <div class="df-subsection">
        ${renderSubsectionTitle('A1', 'Make.com vs n8n')}
        ${renderTable(['Factor', 'Make.com', 'n8n'], mvnRows, 'tbl-mkn8n')}
      </div>

      <div class="df-subsection">
        ${renderSubsectionTitle('A2', 'Standard vs Agentic Automation')}
        ${renderTable(['Characteristic', 'Standard', 'Agentic'], svaRows, 'tbl-sva')}
      </div>

      ${intNotes}
      ${mitAppendix}
    </div>`;
}

// ── RENDER ALL ────────────────────────────────────────────────────────────────
function renderAll() {
  renderIntro();
  renderPreCall();
  renderS1();
  renderS2();
  renderS3();
  renderS4();
  renderS5();
  renderS6();
  renderS7();
  renderAppendix();

  restoreAllFields();
  updateProgress();
  attachAutoSave($('#df-main'));
}

// ── VISIBILITY TOGGLE ─────────────────────────────────────────────────────────
function showFramework() {
  $('#empty-state').style.display = 'none';
  $('#framework-content').style.display = 'block';
  $('#progress-wrap').style.display = 'flex';
}

function showEmptyState(hint) {
  $('#empty-state').style.display = 'flex';
  $('#framework-content').style.display = 'none';
  $('#progress-wrap').style.display = 'none';
  if (hint) $('#empty-hint').textContent = hint;
}

// ── SELECTOR CHANGE ───────────────────────────────────────────────────────────
function onSelectorsChange() {
  const region   = $('#sel-region').value;
  const firmType = $('#sel-firmtype').value;

  if (!region && !firmType) {
    showEmptyState('Use the selectors above to load the framework for this call.');
    return;
  }
  if (region && !firmType) {
    showEmptyState('Now select your firm type to load the full framework.');
    return;
  }
  if (!region && firmType) {
    showEmptyState('Now select your region to load the compliance module.');
    return;
  }

  state.region   = region;
  state.firmType = firmType;
  state.currency = CURRENCY[region] || '€';

  showFramework();
  renderAll();
  updateSidenavActive();
}

let pendingRegion   = null;
let pendingFirmType = null;

$('#sel-region').addEventListener('change', function() {
  const newRegion = this.value;
  if (!state.region || !state.firmType) {
    onSelectorsChange();
    return;
  }
  if (newRegion === state.region) return;
  pendingRegion = newRegion;
  showModal(
    'Change Region',
    'Changing region will clear compliance section fields. Universal fields will be preserved. Continue?',
    () => {
      clearRegionFields();
      state.region = pendingRegion;
      state.currency = CURRENCY[pendingRegion] || '€';
      localStorage.setItem('apex_df_sel_region', pendingRegion);
      onSelectorsChange();
    },
    () => {
      // Restore old value
      document.getElementById('sel-region').value = state.region || '';
    }
  );
});

$('#sel-firmtype').addEventListener('change', function() {
  const newFT = this.value;
  if (!state.firmType || !state.region) {
    onSelectorsChange();
    return;
  }
  if (newFT === state.firmType) return;
  pendingFirmType = newFT;
  showModal(
    'Change Firm Type',
    'Changing firm type will clear firm-specific fields. Universal fields will be preserved. Continue?',
    () => {
      clearFirmTypeFields();
      state.firmType = pendingFirmType;
      localStorage.setItem('apex_df_sel_firmtype', pendingFirmType);
      onSelectorsChange();
    },
    () => {
      document.getElementById('sel-firmtype').value = state.firmType || '';
    }
  );
});

// ── MODAL ─────────────────────────────────────────────────────────────────────
let modalConfirmCb = null;
let modalCancelCb  = null;

function showModal(title, body, onConfirm, onCancel) {
  $('#modal-title').textContent = title;
  $('#modal-body').textContent  = body;
  modalConfirmCb = onConfirm;
  modalCancelCb  = onCancel;
  $('#confirm-modal').style.display = 'flex';
}

$('#modal-confirm').addEventListener('click', () => {
  $('#confirm-modal').style.display = 'none';
  if (modalConfirmCb) modalConfirmCb();
});
$('#modal-cancel').addEventListener('click', () => {
  $('#confirm-modal').style.display = 'none';
  if (modalCancelCb) modalCancelCb();
});

// ── PRINT ─────────────────────────────────────────────────────────────────────
$('#btn-print').addEventListener('click', () => {
  window.print();
});

// ── NEW CALL ──────────────────────────────────────────────────────────────────
$('#btn-new-call').addEventListener('click', () => {
  showModal(
    'Start New Call',
    'This will clear all field values and reset the framework. The region and firm type selectors will also be reset. Are you sure?',
    () => {
      clearAllFields();
      $('#sel-region').value   = '';
      $('#sel-firmtype').value = '';
      state.region   = null;
      state.firmType = null;
      $$('input[data-field-id], textarea[data-field-id], select[data-field-id]').forEach(inp => {
        if (inp.type === 'checkbox' || inp.type === 'radio') inp.checked = false;
        else inp.value = '';
      });
      showEmptyState('Use the selectors above to load the framework for this call.');
    }
  );
});

// ── EXPORT JSON ───────────────────────────────────────────────────────────────
$('#btn-export').addEventListener('click', () => {
  if (!state.region || !state.firmType) {
    alert('Select region and firm type first.');
    return;
  }
  const data = { region: state.region, firmType: state.firmType, timestamp: new Date().toISOString(), fields: {} };
  $$('[data-field-id]').forEach(inp => {
    const val = inp.type === 'checkbox' ? inp.checked : inp.value;
    if (val !== '' && val !== false) {
      data.fields[inp.dataset.fieldId] = val;
    }
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `apex-discovery-${state.region}-${state.firmType}-${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
});

// ── SIDEBAR ACTIVE TRACKING ───────────────────────────────────────────────────
function updateSidenavActive(forceId) {
  if (forceId) {
    $$('.snav-link').forEach(l => l.classList.toggle('active', l.dataset.sec === forceId));
    return;
  }
  const sections = $$('.df-section');
  const scrollTop = window.scrollY + 100;
  let current = '';
  sections.forEach(s => {
    if (s.getBoundingClientRect().top + window.scrollY <= scrollTop) {
      const parent = s.closest('[id]');
      if (parent) current = parent.id.replace('sec-', '');
    }
  });
  $$('.snav-link').forEach(l => l.classList.toggle('active', l.dataset.sec === current));
}

window.addEventListener('scroll', () => updateSidenavActive(), { passive: true });

$$('.snav-link').forEach(l => {
  l.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(l.getAttribute('href'));
    if (target) {
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '58');
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset - 20, behavior: 'smooth' });
      updateSidenavActive(l.dataset.sec);
    }
  });
});

// ── INIT ──────────────────────────────────────────────────────────────────────
(function init() {
  // Restore selectors from localStorage
  try {
    const savedRegion   = localStorage.getItem('apex_df_sel_region');
    const savedFirmType = localStorage.getItem('apex_df_sel_firmtype');
    if (savedRegion)   { $('#sel-region').value   = savedRegion; }
    if (savedFirmType) { $('#sel-firmtype').value = savedFirmType; }
  } catch(e) {}

  // Save selector on change
  $('#sel-region').addEventListener('change', function() {
    try { if (this.value) localStorage.setItem('apex_df_sel_region', this.value); } catch(e) {}
  });
  $('#sel-firmtype').addEventListener('change', function() {
    try { if (this.value) localStorage.setItem('apex_df_sel_firmtype', this.value); } catch(e) {}
  });

  // Trigger render if both are set
  if ($('#sel-region').value && $('#sel-firmtype').value) {
    onSelectorsChange();
  } else if ($('#sel-region').value) {
    showEmptyState('Now select your firm type to load the full framework.');
  } else if ($('#sel-firmtype').value) {
    showEmptyState('Now select your region to load the compliance module.');
  }
})();


