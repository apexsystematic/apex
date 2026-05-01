// ─────────────────────────────────────────────────────────────────────────────
// APEX SYSTEMATIC — DISCOVERY FRAMEWORK CONTENT DATA
// Master content file for all firm types × regions
// This file is the source of truth for the developer spec document
// ─────────────────────────────────────────────────────────────────────────────

const APEX_DATA = {

  // ───────────────────────────────────────────────────────────────────────────
  // UNIVERSAL CONTENT — shown for all firm types and all regions
  // ───────────────────────────────────────────────────────────────────────────

  universal: {

    clientJourney: [
      { step: 1,  title: "Lead comes in",                 timing: "Day 0",         desc: "Prospect contacts you — referral, LinkedIn, cold outreach. Respond within a few hours. Single goal: book the discovery call." },
      { step: 2,  title: "Pre-call research",             timing: "Before call",   desc: "Spend 20–30 minutes before the call. Check their website, regulator register, Companies House / state registry. Know their service lines, headcount, and any visible tech. Fill in what you can in Section 1 before you dial." },
      { step: 3,  title: "Discovery call",                timing: "60–75 min",     desc: "Work through this framework. Sections 1–5 on the call, Section 6 you complete alone afterwards." },
      { step: 4,  title: "Post-call processing",          timing: "Within 2 hrs",  desc: "Complete Section 6 while it's fresh. Rank automation candidates, lock in the platform decision, draft ROI inputs, flag compliance gaps. If anything is missing — email the client before writing. Do not guess." },
      { step: 5,  title: "Write Audit Report & Proposal", timing: "3–5 days",      desc: "Using the framework answers, produce the two-document deliverable. Audit report first (current state, gaps, readiness score), then the proposal (roadmap, solution designs, ROI, change management)." },
      { step: 6,  title: "Proposal walkthrough call",     timing: "45 min",        desc: "Do not just email the document. Book a call to walk them through it. Focus on the ROI table and phased roadmap — that is where decisions get made. Handle objections live." },
      { step: 7,  title: "Scope confirmation & deposit",  timing: "Day 0 of build", desc: "Fixed-price statement of work. 50% deposit received before any build starts. No exceptions." },
      { step: 8,  title: "Phase 0 — Foundation",          timing: "Wks 1–2",       desc: "Data foundation first. Airtable CRM or equivalent. Nothing gets automated until the data structure is clean and agreed." },
      { step: 9,  title: "Build phases 1–2",              timing: "Wks 3–10",      desc: "Weekly async updates. Deliver each phase, test internally, then UAT with client before go-live. Phase 3 follows the same pattern if in scope." },
      { step: 10, title: "Go-live & handover",            timing: "Final week",    desc: "Training session per the resource plan. Hand over all scenario documentation. 30-day bug-fix warranty begins. Final invoice raised." },
      { step: 11, title: "Post-handover",                 timing: "Day 30",        desc: "Monitor for errors, fix anything that breaks. Close the warranty at day 30. Optionally pitch Phase 3 or an optimisation retainer." },
    ],

    callStructure: [
      { time: "0–3 min",   focus: "Warm-up",               goal: "Confirm attendees and their roles. One rapport question. Then get to work." },
      { time: "3–15 min",  focus: "Firm snapshot (S1)",    goal: "Structure, headcount, service lines, revenue context." },
      { time: "15–35 min", focus: "Pain & process (S2)",   goal: "Where the real problems are. Let them talk. Take notes verbatim." },
      { time: "35–45 min", focus: "Tech stack (S3)",       goal: "What exists, what's missing, what they hate." },
      { time: "45–55 min", focus: "Compliance & risk (S4)", goal: "Regulatory posture, data handling, security gaps." },
      { time: "55–65 min", focus: "Priorities & budget (S5)", goal: "Rank pain points. Confirm budget envelope. Agree next step." },
      { time: "65–70 min", focus: "Close",                 goal: "Confirm deliverable, timeline, decision-maker." },
    ],

    preCallPrep: [
      { field: "Firm name", placeholder: "" },
      { field: "Website reviewed?", placeholder: "Y / N — Key observation:" },
      { field: "Regulator register checked?", placeholder: "Y / N — Any flags:" },
      { field: "Service lines (from website)", placeholder: "" },
      { field: "Headcount (approx.)", placeholder: "" },
      { field: "Visible tech (booking links, portals, client login)", placeholder: "" },
      { field: "How did they find you?", placeholder: "Referral / LinkedIn / other:" },
      { field: "Call date & time", placeholder: "" },
      { field: "Who is on the call?", placeholder: "Name / Role:" },
    ],

    // Core process questions — universal across all firm types
    coreProcessQuestions: [

      // 2.1 Enquiry Handling
      {
        id: "Q-ENQ-1",
        section: "2.1",
        sectionTitle: "Lead & Enquiry Handling",
        question: "What happens the moment an enquiry comes in?",
        why: "Maps the first 30 minutes of the client journey — the highest drop-off window across every firm type.",
        fields: ["Step 1 (who, what, how long)", "Step 2", "Step 3", "Anything automated currently?"],
      },
      {
        id: "Q-ENQ-2",
        section: "2.1",
        question: "What is your average first response time?",
        why: "Every hour of delay reduces conversion. This becomes a headline KPI in the proposal.",
        fields: ["Current first response time", "Target response time", "Weekends / out of hours — what happens?"],
      },
      {
        id: "Q-ENQ-3",
        section: "2.1",
        question: "How do you qualify a new enquiry?",
        why: "Qualification criteria drive the AI lead scoring prompt — cannot be built without documented criteria.",
        fields: ["Who qualifies?", "What makes a good client? (service type, geography, financial threshold)", "What makes you decline?", "Is there a documented criteria list? (Y/N)"],
      },
      {
        id: "Q-ENQ-4",
        section: "2.1",
        question: "What percentage of enquiries do you estimate are never followed up?",
        why: "Recoverable revenue. Even a rough estimate anchors the ROI case.",
        fields: ["Estimate %", "Why do they fall through?", "Any follow-up sequence currently?"],
      },

      // 2.2 Appointment & Booking
      {
        id: "Q-APT-1",
        section: "2.2",
        sectionTitle: "Appointment & Consultation Booking",
        question: "How does a prospect book an initial meeting or consultation?",
        why: "Booking friction is a direct conversion killer regardless of firm type.",
        fields: ["Current booking method", "Who manages the calendar?", "How long does a booking take to arrange?", "Phone tag / email back-and-forth? How often?"],
      },
      {
        id: "Q-APT-2",
        section: "2.2",
        question: "What happens after a meeting is booked?",
        why: "Prep materials and reminders reduce no-shows and improve first impression.",
        fields: ["Confirmation sent? (Y/N — how?)", "Reminder sent? (Y/N — how?)", "Prep materials sent? (Y/N — what?)", "No-show rate (estimate)?", "Rescheduling process?"],
      },

      // 2.3 Client Onboarding
      {
        id: "Q-ONB-1",
        section: "2.3",
        sectionTitle: "Client Onboarding",
        question: "Walk me through everything that happens after a client decides to engage you — from the first step to the engagement being open.",
        why: "Onboarding is typically the highest-volume manual process in a small firm — 2–4 hours per client.",
        fields: ["Step-by-step (capture every manual task)", "Who does each step?", "How long does each step take?", "What gets missed or done out of order?"],
      },
      {
        id: "Q-ONB-2",
        section: "2.3",
        question: "How do you collect client data at the start of an engagement?",
        why: "Data collection method determines which tools integrate and whether a CRM build is required first.",
        fields: ["How is client info collected? (verbal, email, paper form, online form)", "Where is it stored?", "Who enters it and when?", "What data do you always need?"],
      },
      {
        id: "Q-ONB-3",
        section: "2.3",
        question: "How do you send out engagement letters and service agreements?",
        why: "Document dispatch is automatable immediately — high impact, low complexity.",
        fields: ["Current method (Word + email?)", "How long does it take?", "Do you chase for signatures? How?", "Where are signed copies stored?", "E-signatures in use? (Y/N)"],
      },

      // 2.4 Client Management & Pipeline
      {
        id: "Q-CRM-1",
        section: "2.4",
        sectionTitle: "Client Management & Pipeline",
        question: "How do you track the status of active clients and engagements?",
        why: "No CRM = no automation foundation. This reveals the data infrastructure gap.",
        fields: ["Current tools (spreadsheet, dedicated CRM, software built-in, email, memory?)", "Who updates the status?", "How often is it up to date?", "Can you see pipeline value at a glance right now?"],
      },
      {
        id: "Q-CRM-2",
        section: "2.4",
        question: "How do you manage deadlines and task lists across your team?",
        why: "Deadline management is a compliance and quality risk — automation has a strong case here.",
        fields: ["Current method", "Who is responsible?", "Have deadlines ever been missed due to process failure?", "How are tasks assigned?"],
      },
      {
        id: "Q-CRM-3",
        section: "2.4",
        question: "How do you handle client updates and communication during an engagement?",
        why: "Client communication automation is a quick win for satisfaction and fee-earner time.",
        fields: ["How often do clients chase for updates?", "Who handles update calls/emails?", "Estimated time per week on reactive client comms?", "Is there a standard update cadence?"],
      },

      // 2.5 Billing & Finance
      {
        id: "Q-BIL-1",
        section: "2.5",
        sectionTitle: "Billing & Finance",
        question: "How do you raise invoices and chase payment?",
        why: "Billing automation has direct cash flow impact — always resonates with firm principals.",
        fields: ["Current invoicing method / software", "Who raises invoices?", "Average time from work completion to invoice raised?", "How are unpaid invoices chased?", "Current debtor days (estimate)?"],
      },

      // 2.6 Post-Engagement & Retention
      {
        id: "Q-RET-1",
        section: "2.6",
        sectionTitle: "Post-Engagement & Client Retention",
        question: "What happens after an engagement closes?",
        why: "Most small firms leave post-engagement revenue on the table.",
        fields: ["Closing process?", "File archiving?", "Do you ask for reviews / referrals?", "Any re-engagement sequence for past clients?", "Estimated repeat client rate?"],
      },
    ],

    // Tech stack — universal categories
    techStackCategories: [
      { category: "Email platform", placeholder: "Google Workspace / Microsoft 365 / other?" },
      { category: "Document storage", placeholder: "Google Drive / SharePoint / OneDrive / local server?" },
      { category: "CRM", placeholder: "Dedicated CRM / spreadsheet / built into practice software / none?" },
      { category: "Website platform", placeholder: "WordPress / Squarespace / Wix / bespoke? Webhook possible?" },
      { category: "Calendar / booking", placeholder: "Google Calendar / Outlook / Calendly / Cal.com / none?" },
      { category: "Document creation", placeholder: "Word templates / Google Docs / document automation tool?" },
      { category: "E-signature", placeholder: "DocuSign / Adobe Sign / PandaDoc / HelloSign / none?" },
      { category: "Accounts / billing", placeholder: "Xero / QuickBooks / Sage / other?" },
      { category: "Communication / messaging", placeholder: "Slack / Teams / WhatsApp / email only?" },
      { category: "Forms / intake", placeholder: "Typeform / Tally / Gravity Forms / paper / email / none?" },
      { category: "Automation (existing)", placeholder: "Zapier / Make.com / n8n / Power Automate / none?" },
      { category: "Password / security", placeholder: "1Password / LastPass / none?" },
    ],

    techPainQuestions: [
      {
        id: "Q-TECH-1",
        question: "Which tools do your team actively dislike or avoid using?",
        why: "Friction with existing tools signals where adoption will be hard — or easy wins if you replace the pain.",
        fields: ["Tool + reason it's disliked", "Who avoids it?", "What do they do instead?"],
      },
      {
        id: "Q-TECH-2",
        question: "Are there tools you pay for but barely use?",
        why: "Identifies budget reallocation opportunities and dead integrations.",
        fields: ["Tool + why underused"],
      },
      {
        id: "Q-TECH-3",
        question: "What tools do you wish existed or wish talked to each other?",
        why: "This is often where the most specific pain lives.",
        fields: ["Tool A should connect to Tool B because...", "Manual re-entry pain points (copy-paste between systems)"],
      },
    ],

    dataInfrastructureQuestions: [
      { question: "Where does client data live today?", impact: "Multiple silos = Phase 0 data migration needed before automation." },
      { question: "Is there a single source of truth for client records?", answer: "Y / N", impact: "No = Airtable CRM build required as foundation." },
      { question: "How clean is your client data? (duplicates, incomplete records)", answer: "Good / Moderate / Poor", impact: "Poor = add 1 week to Phase 0 estimate." },
      { question: "Do you have a documented naming convention for files/folders?", answer: "Y / N", impact: "No = must agree one before Drive automation is built." },
      { question: "Primary ecosystem: Google Workspace or Microsoft 365?", answer: "", impact: "Determines which native Make.com modules are central." },
      { question: "Any data stored locally (not cloud)?", answer: "", impact: "Local = security risk and integration blocker." },
    ],

    // Universal compliance questions (data protection, AI posture)
    universalComplianceQuestions: [
      {
        id: "Q-COMP-GDPR-1",
        question: "Is there a documented data retention policy?",
        answer: "Y / N",
        riskLevel: "",
      },
      {
        id: "Q-COMP-GDPR-2",
        question: "Lawful basis for processing client data?",
        answer: "Documented / Assumed / Unknown",
        riskLevel: "",
      },
      {
        id: "Q-COMP-GDPR-3",
        question: "Is consent collected for marketing communications?",
        answer: "Y / N / No marketing",
        riskLevel: "",
      },
      {
        id: "Q-COMP-GDPR-4",
        question: "Where is personal data stored? List all systems.",
        answer: "",
        riskLevel: "Cloud-only or local? Servers in EU/UK/US?",
      },
      {
        id: "Q-COMP-GDPR-5",
        question: "Is any sensitive personal data processed? (health, financial, immigration status)",
        answer: "Y / N — specify",
        riskLevel: "Special category / sensitive data requires additional safeguards in all regions.",
      },
      {
        id: "Q-COMP-GDPR-6",
        question: "Any data processor agreements in place with vendors?",
        answer: "Y / N / Unsure",
        riskLevel: "Required for Make.com, Airtable, PandaDoc etc. under GDPR, UK GDPR, and equivalent frameworks.",
      },
      {
        id: "Q-COMP-GDPR-7",
        question: "Is client data currently sent via unencrypted email?",
        answer: "Y / N",
        riskLevel: "Flag — migrate to secure upload regardless of region.",
      },
    ],

    securityQuestions: [
      { area: "ID / sensitive documents: how received and stored?", current: "", flag: "Email = security risk — flag for Tally secure upload." },
      { area: "Shared login credentials across staff?", current: "Y / N", flag: "Shared = audit trail gap." },
      { area: "Two-factor authentication on email / cloud tools?", current: "Enabled / Not enabled / Partial", flag: "" },
      { area: "Password manager in use?", current: "Y / N", flag: "" },
      { area: "Access controls — can all staff see all client data?", current: "Y / N", flag: "Principle of least privilege?" },
      { area: "Data backup process?", current: "Automated / Manual / Unknown", flag: "" },
      { area: "Any previous data breach or near-miss?", current: "Y / N — details", flag: "" },
    ],

    automationComplianceQuestions: [
      {
        id: "Q-ACOMP-1",
        question: "Who is the decision-maker for compliance approval on new clients — one principal, multiple, or a designated officer?",
        why: "Determines how the compliance gate approval routing is built in Airtable and Make.com.",
        fields: ["Name / role of approver", "Backup approver if unavailable?"],
      },
      {
        id: "Q-ACOMP-2",
        question: "Are there client categories or engagement types where you require enhanced scrutiny before proceeding?",
        why: "Triggers enhanced due diligence branch in the onboarding workflow.",
        fields: ["High-risk categories (specify)", "What does enhanced scrutiny involve currently?"],
      },
      {
        id: "Q-ACOMP-3",
        question: "What is your position on AI-drafted client communications?",
        why: "Determines whether email sequences are auto-sent or reviewed before dispatch.",
        fields: ["Preference: auto-send / review first / review only for certain engagement types", "Who reviews? How quickly?", "Any previous experience with AI tools?", "Concerns about AI-generated content?"],
      },
    ],

    // Priorities & budget — universal
    prioritiesAndBudget: {
      painRankingInstruction: "Read back the pain points you captured in Section 2. Ask the principal to rank their top 5 by urgency (1 = most urgent).",
      successQuestion: {
        question: "If we delivered this project perfectly, what would be different 3 months from now?",
        why: "Anchors the proposal outcome to their own definition of success — use their exact words in the proposal summary.",
        fields: ["Their answer (capture verbatim)", "Secondary outcome mentioned?", "What would make this feel like a failure?"],
      },
      buyInQuestion: {
        question: "Who in the firm would be most affected by this change — positively and negatively?",
        why: "Identifies the internal champion and potential resistors before you start.",
        fields: ["Most affected (role)", "Most resistant (role + likely concern)", "Who needs to be bought in for go-live?"],
      },
      constraints: [
        { constraint: "Budget ceiling (£ / $ / €)", details: "", impact: "See budget section — do not leave blank." },
        { constraint: "Timeline pressure (hard deadline?)", details: "", impact: "Staff departure, regulatory deadline, growth target?" },
        { constraint: "Technical blockers (tools that cannot change)", details: "", impact: "e.g. Locked into a platform for N years." },
        { constraint: "Staff resistance or change fatigue", details: "", impact: "Recent failed tech project?" },
        { constraint: "Partner / principal sign-off from someone not on this call?", details: "Y / N — who?", impact: "" },
        { constraint: "IT / data restrictions (cloud policy, jurisdiction)", details: "", impact: "Some firms restrict certain cloud tools." },
      ],
      budgetScript: "\"We work to fixed prices, so I need to give you a range that's realistic for the scope we've discussed. Our typical engagement for a firm of your size and complexity is between £X and £Y for a first phase. Does that range work for you, or is there a ceiling I should know about before I put the proposal together?\" — then stop talking.",
      budgetFields: [
        { question: "Budget envelope — stated or implied", answer: "", note: "Even a range is useful. 'Not sure' = ask what they've invested in tech before." },
        { question: "Approval process for spend of this size?", answer: "", note: "One principal? Multiple? Finance committee?" },
        { question: "Preferred payment structure?", answer: "One-time / Phased / Monthly retainer", note: "" },
        { question: "Previous spend on tech / consultancy?", answer: "", note: "Context for what they consider normal." },
        { question: "Timeline to decision?", answer: "", note: "" },
      ],
    },

    // Build inputs — universal
    buildInputs: {
      platformDecision: [
        { decision: "Automation platform", choice: "Make.com / n8n", rationale: "" },
        { decision: "CRM / data foundation", choice: "Airtable / existing software / other", rationale: "" },
        { decision: "Form tool", choice: "Tally / Typeform / other", rationale: "" },
        { decision: "E-signature", choice: "PandaDoc / DocuSign / other", rationale: "" },
        { decision: "Booking tool", choice: "Cal.com / Calendly / other", rationale: "" },
        { decision: "AI component?", choice: "Y (Claude API) / N", rationale: "" },
        { decision: "Agentic or Standard tier?", choice: "Per workflow", rationale: "" },
      ],
      roiInputs: [
        { input: "Admin hourly rate (£/$/ €)" },
        { input: "Principal / fee-earner billing rate (per hr)" },
        { input: "New enquiries per week" },
        { input: "Current conversion rate (%)" },
        { input: "Manual time per enquiry (mins)" },
        { input: "Current onboarding time per client (hrs)" },
        { input: "New clients per month" },
        { input: "Average engagement value" },
        { input: "Estimated % conversion uplift from automation" },
        { input: "Estimated no-show reduction (%)" },
      ],
      roadmapPhases: [
        { phase: "Phase 0 — Foundation", weeks: "Wks 1–2", workflows: "", dependencies: "Data migration, CRM schema sign-off" },
        { phase: "Phase 1 — Quick wins",  weeks: "Wks 3–6", workflows: "", dependencies: "" },
        { phase: "Phase 2 — Core automation", weeks: "Wks 7–10", workflows: "", dependencies: "" },
        { phase: "Phase 3 — Optional / advanced", weeks: "Wks 11+", workflows: "", dependencies: "" },
      ],
    },

    // Call close — universal
    callClose: {
      confirmationScript: "\"Let me confirm what I've heard. Your biggest pain points are [1], [2], and [3]. The areas with the most automation potential are [X] and [Y]. I'm going to put together a Workflow Audit Report and Implementation Proposal scoped around those priorities. You'll have it by [date]. Does that sound right?\"",
      nextSteps: [
        { action: "Apex to deliver Audit Report + Implementation Proposal", owner: "Apex Systematic", date: "" },
        { action: "Client to provide answers to any open items", owner: "", date: "" },
        { action: "Client to confirm decision / proceed", owner: "", date: "" },
        { action: "Scoping call follow-up / Q&A (if needed)", owner: "", date: "" },
        { action: "Deposit received — build commences", owner: "", date: "" },
      ],
      selfAssessment: [
        "Did you understand their #1 pain point clearly?",
        "Do you have enough to build a credible ROI case?",
        "Do you know the budget envelope?",
        "Do you know who signs off the decision?",
        "Do you know the compliance posture accurately?",
        "Did you identify any deal-breakers or red flags?",
        "Overall: can you write the proposal now? (Y / N / Need X first)",
      ],
      finalChecklist: "You must have answers to: (1) Top 3 pain points in their words. (2) Current tools — especially CRM and email platform. (3) Enquiry volume and conversion rate estimate. (4) Onboarding time per client. (5) Compliance / regulatory current state. (6) Budget envelope. (7) Who approves the decision. If any of these are blank — send a follow-up email before writing.",
    },

    // Appendix — universal
    appendix: {
      makeVsN8n: [
        { factor: "Hosting",                   make: "Fully managed cloud",          n8n: "Self-hosted or cloud" },
        { factor: "Maintenance overhead",      make: "None",                         n8n: "Regular updates required" },
        { factor: "Technical skill needed",    make: "Low — visual builder",         n8n: "Medium — some debugging skill" },
        { factor: "Cost (small firm)",         make: "~£16/month Pro",               n8n: "~£15/month (self-hosted server)" },
        { factor: "Execution logs",            make: "30-day log retention",         n8n: "Configurable" },
        { factor: "Best for",                  make: "Firms without in-house tech",  n8n: "Firms with a tech-capable person" },
        { factor: "Recommended 1–15 person firm?", make: "YES",                     n8n: "Only if client requests or has tech staff" },
      ],
      standardVsAgentic: [
        { characteristic: "Input is structured and predictable",     standard: "YES",        agentic: "Not required" },
        { characteristic: "Output is templated (same every time)",   standard: "YES",        agentic: "Not required" },
        { characteristic: "Requires natural language understanding", standard: "No",         agentic: "YES" },
        { characteristic: "Requires personalisation by context",     standard: "No",         agentic: "YES" },
        { characteristic: "Client relationship sensitivity is high", standard: "Acceptable", agentic: "Recommended" },
        { characteristic: "Build speed",                             standard: "Faster",     agentic: "Slower (prompt engineering required)" },
        { characteristic: "Build cost",                              standard: "Lower",      agentic: "Higher" },
        { characteristic: "Monthly running cost",                    standard: "Lower",      agentic: "Higher (Claude API usage)" },
      ],
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // FIRM-TYPE-SPECIFIC CONTENT
  // ───────────────────────────────────────────────────────────────────────────

  firmTypes: {

    // ─── LAW FIRMS ───────────────────────────────────────────────────────────
    lawFirm: {
      label: "Law Firm",
      practiceAreas: [
        "Family law (divorce, separation)",
        "Child arrangements / custody",
        "Financial remedy / consent orders",
        "Cohabitation disputes",
        "Private client (wills, probate, trusts)",
        "Residential conveyancing",
        "Commercial property",
        "Employment law",
        "Personal injury / clinical negligence",
        "Criminal defence",
        "Immigration",
        "Corporate / commercial",
        "Other (specify)",
      ],
      teamRoles: [
        "Equity partners / directors",
        "Salaried partners / associates",
        "Solicitors / fee-earners",
        "Paralegals",
        "Legal secretaries / administrators",
        "Practice manager / operations",
        "Accounts / finance",
        "Receptionist / front of house",
      ],
      businessMetrics: [
        { metric: "Approx. annual fee income", note: "Ask directly. Unease = sensitivity = probe gently." },
        { metric: "Average matter value", note: "By practice area if mixed." },
        { metric: "Active matters at any one time", note: "" },
        { metric: "New enquiries per week (estimate)", note: "They may not know — that itself is a finding." },
        { metric: "Current conversion rate (enquiry → instruction)", note: "May not know. Flag as a gap." },
        { metric: "Target growth (12 months)", note: "Revenue? Headcount? Matters?" },
        { metric: "Billing model", note: "Fixed fee / hourly / hybrid" },
      ],
      // Sector-specific process questions
      sectorProcessQuestions: [
        {
          id: "Q-LAW-1",
          section: "2.3",
          question: "How do you collect KYC / ID documents from new clients?",
          why: "Compliance hot-spot. Critical to understand exactly — KYC failure is the #1 SRA enforcement risk for small firms.",
          fields: ["Current method", "What documents are required?", "Where are docs stored?", "Who reviews them?", "How is completion recorded?", "How would you demonstrate compliance to the regulator today?"],
        },
        {
          id: "Q-LAW-2",
          section: "2.5",
          question: "How do you handle disbursements and client account?",
          why: "Client account mishandling is a serious regulatory risk — relevant to compliance design of any billing automation.",
          fields: ["How are disbursements recorded?", "Client account software?", "Any manual reconciliation steps?"],
        },
        {
          id: "Q-LAW-3",
          section: "2.4",
          question: "How do you manage court deadlines, limitation periods, and regulatory filing dates?",
          why: "Missed deadlines in litigation or conveyancing can result in negligence claims — automation here has a strong compliance case.",
          fields: ["Current tracking method", "Who is responsible?", "Have deadlines ever been missed due to process failure?", "Any diarising system in use?"],
        },
      ],
      softwareExamples: [
        { category: "Case management", examples: "Clio, LEAP, Osprey, Actionstep, Smokeball, InfoTrack, none" },
        { category: "ID verification / KYC", examples: "Thirdfort, SmartSearch, Verify 365, manual, none" },
        { category: "AML screening", examples: "Integrated in case management / separate tool / manual" },
        { category: "Legal accounts", examples: "LEAP, Xero, QuickBooks, Sage, dedicated legal accounts software" },
        { category: "Client portal", examples: "Clio Connect, Actionstep portal, custom, none" },
      ],
      caseManagementIntegrations: [
        { platform: "Clio",         makeIntegration: "Native module available",       notes: "Full API. Best-in-class for automation." },
        { platform: "LEAP",         makeIntegration: "No native module — API available", notes: "HTTP module required. Possible but needs API key setup." },
        { platform: "Osprey",       makeIntegration: "No native module",              notes: "API available but limited documentation. Webhooks possible." },
        { platform: "Actionstep",   makeIntegration: "No native module — REST API",   notes: "Custom HTTP calls. Feasible for experienced builder." },
        { platform: "Smokeball",    makeIntegration: "No native module",              notes: "Closed API. Automation limited to document output / email." },
        { platform: "None",         makeIntegration: "N/A — build Airtable CRM first", notes: "Airtable becomes the data foundation for all automations." },
      ],
    },

    // ─── FINANCIAL ADVISERS ──────────────────────────────────────────────────
    financialAdviser: {
      label: "Financial Advisory Firm",
      practiceAreas: [
        "Financial planning (holistic / goals-based)",
        "Retirement planning & pension advice",
        "Investment advice & portfolio management",
        "Protection & insurance (life, income, critical illness)",
        "Mortgage & lending advice",
        "Estate planning & inheritance tax",
        "Business financial planning",
        "Employee benefits & group schemes",
        "Tax planning & mitigation",
        "Socially responsible / ESG investing",
        "Other (specify)",
      ],
      teamRoles: [
        "Principal / director adviser",
        "Senior financial advisers / planners",
        "Paraplanners",
        "Client services / administrators",
        "Compliance officer",
        "Practice manager / operations",
        "Accounts / finance",
        "Reception / front of house",
      ],
      businessMetrics: [
        { metric: "Approx. annual revenue (fees + trail)", note: "Fee-only, commission, or hybrid?" },
        { metric: "Assets under advice / management (AUA/AUM)", note: "Key context for automation ROI." },
        { metric: "Active client households", note: "" },
        { metric: "New enquiries per month (estimate)", note: "FA enquiry volume tends to be lower but higher value." },
        { metric: "Current conversion rate (enquiry → client)", note: "" },
        { metric: "Average ongoing service fee per client (annual)", note: "Recurring revenue model context." },
        { metric: "Billing model", note: "Ongoing fee / one-time advice / hybrid" },
      ],
      sectorProcessQuestions: [
        {
          id: "Q-FA-1",
          section: "2.3",
          question: "How do you complete a fact-find for a new client?",
          why: "The fact-find is the single most time-intensive onboarding step in financial advice — and the most automatable.",
          fields: ["Current method (paper form, PDF, software, verbal?)", "Who completes it?", "How long does it take?", "Where is the data stored after?", "Is it linked to your back-office system?"],
        },
        {
          id: "Q-FA-2",
          section: "2.3",
          question: "How do you produce suitability reports?",
          why: "Suitability reports are a regulatory requirement and a major time sink — AI drafting is the highest-value agentic opportunity in financial advice.",
          fields: ["Current method (from scratch / template / paraplanner?)", "How long does a standard suitability report take?", "Who reviews and signs off?", "How many are produced per month?"],
        },
        {
          id: "Q-FA-3",
          section: "2.4",
          question: "How do you manage annual review scheduling and delivery?",
          why: "Annual reviews are a recurring revenue obligation — missed reviews risk compliance breaches and client attrition.",
          fields: ["How are reviews scheduled?", "Who triggers the process?", "What prep is required before the review meeting?", "How many reviews per month on average?", "What percentage are completed on time?"],
        },
        {
          id: "Q-FA-4",
          section: "2.4",
          question: "How do you track ongoing service obligations for clients on retainer?",
          why: "Ongoing service charges require evidenced service delivery — a critical compliance and commercial risk.",
          fields: ["What ongoing services are clients entitled to?", "How is service delivery tracked?", "How do you evidence it for compliance purposes?", "Any clients who receive the charge but not the service?"],
        },
        {
          id: "Q-FA-5",
          section: "2.5",
          question: "How do you interact with investment platforms and product providers?",
          why: "Platform integration is the biggest technical constraint in FA automation — determines what is and isn't automatable.",
          fields: ["Platforms in use (Transact, Nucleus, Quilter, Fidelity, etc.)", "How do you pull valuations / statements?", "Any manual data re-entry between platform and back-office?", "Any API access to platforms?"],
        },
      ],
      softwareExamples: [
        { category: "Back-office / CRM", examples: "Intelliflo (iO), Salesforce Financial Services Cloud, Curo, XPLAN, Advisor.io, spreadsheet, none" },
        { category: "Financial planning software", examples: "Voyant, Truth, Prestwood, CashCalc, none" },
        { category: "Risk profiling", examples: "Dynamic Planner, Defaqto Engage, FinaMetrica, Oxford Risk, none" },
        { category: "Investment platforms", examples: "Transact, Nucleus, Quilter, Fidelity, Aviva, AJ Bell, other" },
        { category: "Suitability report tools", examples: "Intelliflo, Pathways, ATEB Suitability, manual Word templates" },
        { category: "Client portal", examples: "Intelliflo portal, Wealth Wizards, custom, none" },
        { category: "Client ID / AML", examples: "SmartSearch, Thirdfort, Verify 365, manual, none" },
      ],
      platformIntegrations: [
        { platform: "Intelliflo (iO)", makeIntegration: "No native module — REST API available", notes: "Well-documented API. HTTP module in Make.com. Feasible with effort." },
        { platform: "Salesforce FSC",  makeIntegration: "Native Salesforce module",              notes: "Strong integration. May be over-engineered for small firms." },
        { platform: "XPLAN",           makeIntegration: "No native module — API available",      notes: "IRESS API. Possible via HTTP. Limited community documentation." },
        { platform: "Voyant",          makeIntegration: "No native module",                      notes: "No public API. Data must be exported manually." },
        { platform: "None",            makeIntegration: "N/A — build Airtable CRM first",        notes: "Airtable becomes the data and pipeline foundation." },
      ],
    },

    // ─── ACCOUNTING & CPA FIRMS ──────────────────────────────────────────────
    accounting: {
      label: "Accounting / CPA Firm",
      practiceAreas: [
        "Tax preparation & filing (personal / business)",
        "Management accounts & reporting",
        "Bookkeeping & payroll",
        "Audit & assurance",
        "Advisory & CFO services",
        "Corporate tax & planning",
        "VAT / sales tax compliance",
        "R&D tax credits",
        "Estate & trust accounting",
        "Business formation & startup advisory",
        "Forensic accounting",
        "Other (specify)",
      ],
      teamRoles: [
        "Partners / principals / CPAs",
        "Managers / senior accountants",
        "Staff accountants",
        "Bookkeepers",
        "Payroll specialists",
        "Practice administrator",
        "Accounts / billing",
        "Reception / front of house",
      ],
      businessMetrics: [
        { metric: "Approx. annual fee income", note: "Seasonal revenue context — peak periods affect automation timing." },
        { metric: "Number of active client entities", note: "Clients may have multiple entities — clarify." },
        { metric: "Number of returns / filings per year (estimate)", note: "Key volume driver for automation ROI." },
        { metric: "New enquiries per month (estimate)", note: "" },
        { metric: "Current conversion rate (enquiry → engagement)", note: "" },
        { metric: "Average annual fee per client", note: "" },
        { metric: "Billing model", note: "Fixed fee / hourly / value-based / subscription" },
      ],
      sectorProcessQuestions: [
        {
          id: "Q-ACC-1",
          section: "2.3",
          question: "How do you collect documents and data from clients ahead of a filing deadline?",
          why: "Document chasing is the single biggest time drain in accounting — and the most straightforwardly automatable.",
          fields: ["Current method (email chase, phone, client portal?)", "How many chasing touchpoints per client per deadline?", "Average time spent chasing per client?", "What percentage submit on time without chasing?"],
        },
        {
          id: "Q-ACC-2",
          section: "2.4",
          question: "How do you manage filing deadlines across your entire client base?",
          why: "Deadline management at scale is an operational and compliance risk — automation has a strong case here.",
          fields: ["Current tracking method (spreadsheet, software, memory?)", "Who owns the deadline calendar?", "How far in advance do you start the process per client?", "Have deadlines ever been missed due to process failure?"],
        },
        {
          id: "Q-ACC-3",
          section: "2.4",
          question: "How do you produce and deliver management accounts or reports to clients?",
          why: "Recurring deliverable automation — report generation and delivery — is high-volume and highly repeatable.",
          fields: ["How often? (monthly / quarterly)", "How long does a standard report take to produce?", "What software generates the report?", "How is it delivered to the client?", "Any standard commentary or narrative required?"],
        },
        {
          id: "Q-ACC-4",
          section: "2.3",
          question: "How do you onboard a new client's books — especially when taking over from another accountant?",
          why: "New client setup and data migration is time-intensive and error-prone — a high-value automation target.",
          fields: ["Step-by-step process", "How long does it take?", "What software access is needed?", "What's the most painful part of this process?"],
        },
        {
          id: "Q-ACC-5",
          section: "2.5",
          question: "How do you manage billing at peak periods — are you invoicing as you go or in batches?",
          why: "Accounting firms often have seasonal cash flow gaps tied to billing processes — automation here has direct revenue impact.",
          fields: ["Invoicing process and timing", "Who raises invoices?", "How long after work completion is the invoice raised?", "Payment terms and average debtor days"],
        },
      ],
      softwareExamples: [
        { category: "Practice management", examples: "Karbon, Canopy, TaxDome, Practice Ignition (Ignition), Pixie, none" },
        { category: "Accounting / GL software", examples: "Xero, QuickBooks, Sage, FreshBooks, Wave, other" },
        { category: "Tax preparation", examples: "TaxCalc, IRIS, Thomson Reuters, Drake, UltraTax, Lacerte, other" },
        { category: "Payroll", examples: "BrightPay, Sage Payroll, Gusto, ADP, QuickBooks Payroll, other" },
        { category: "Document management", examples: "SmartVault, Karbon, Canopy, SharePoint, Google Drive, none" },
        { category: "Client portal", examples: "TaxDome, Canopy, SmartVault, Liscio, custom, none" },
        { category: "E-signature", examples: "DocuSign, Adobe Sign, PandaDoc, TaxDome built-in, none" },
      ],
      platformIntegrations: [
        { platform: "Karbon",           makeIntegration: "No native module — API available",   notes: "REST API. Feasible via HTTP module. Good documentation." },
        { platform: "TaxDome",          makeIntegration: "No native module — API available",   notes: "API access on higher plans. HTTP module workable." },
        { platform: "Practice Ignition", makeIntegration: "No native module — Zapier native", notes: "Zapier integration exists. Make.com via HTTP or Zapier bridge." },
        { platform: "Xero",             makeIntegration: "Native module available",            notes: "Strong integration. Invoicing, contacts, reporting automatable." },
        { platform: "QuickBooks",        makeIntegration: "Native module available",           notes: "Good coverage. Invoicing and client data well-supported." },
        { platform: "None",             makeIntegration: "N/A — build Airtable CRM first",    notes: "Airtable becomes the client and deadline management foundation." },
      ],
    },

    // ─── CONSULTING FIRMS ────────────────────────────────────────────────────
    consulting: {
      label: "Consulting Firm",
      practiceAreas: [
        "Strategy & management consulting",
        "Operations & process improvement",
        "Technology & digital transformation",
        "HR / people & organisational consulting",
        "Marketing & growth consulting",
        "Financial consulting & interim CFO",
        "Risk & compliance consulting",
        "Change management",
        "Sustainability & ESG consulting",
        "Training & facilitation",
        "Other (specify)",
      ],
      teamRoles: [
        "Partners / principals / directors",
        "Senior consultants / managers",
        "Consultants / analysts",
        "Project coordinators / administrators",
        "Business development / sales",
        "Accounts / finance",
        "Operations / practice management",
      ],
      businessMetrics: [
        { metric: "Approx. annual revenue", note: "" },
        { metric: "Average project / engagement value", note: "Project-based or retainer? Both?" },
        { metric: "Average engagement duration (months)", note: "Short engagements = higher onboarding cost ratio." },
        { metric: "Active engagements at any one time", note: "" },
        { metric: "New enquiries / opportunities per month", note: "" },
        { metric: "Current conversion rate (proposal → win)", note: "Win rate context for proposal automation ROI." },
        { metric: "Billing model", note: "Day rate / project fee / retainer / value-based" },
        { metric: "Utilisation rate (approximate)", note: "Unbillable admin time is the core problem we solve." },
      ],
      sectorProcessQuestions: [
        {
          id: "Q-CON-1",
          section: "2.3",
          question: "How do you produce proposals and statements of work?",
          why: "Proposal production is the highest-value document automation opportunity in consulting — directly tied to win rate and revenue.",
          fields: ["Current process (from scratch / template / repurposed?)", "How long does a standard proposal take to produce?", "Who writes it?", "How many proposals per month?", "Current win rate (estimate)?"],
        },
        {
          id: "Q-CON-2",
          section: "2.4",
          question: "How do you manage project status, milestones, and deliverables across multiple engagements?",
          why: "Multi-project visibility is the #1 operational pain in small consulting firms — and the most straightforwardly solvable.",
          fields: ["Current tools (spreadsheet, project management software, email, memory?)", "Who updates project status?", "How do clients get visibility on progress?", "What slips most often?"],
        },
        {
          id: "Q-CON-3",
          section: "2.4",
          question: "How do you track and record billable hours and activities?",
          why: "Timesheet gaps directly reduce revenue — automating reminders and capture is a quick win with measurable ROI.",
          fields: ["Current method (time tracking software, spreadsheet, memory?)", "How often is time entered? (daily / weekly / 'when we remember')", "How much unbillable time do you estimate is lost per consultant per month?"],
        },
        {
          id: "Q-CON-4",
          section: "2.3",
          question: "How do you capture and store knowledge from completed engagements?",
          why: "Knowledge management is a recurring pain in consulting — automation can systematise capture and make it searchable.",
          fields: ["Current method (shared drive, wiki, none?)", "Is knowledge reused across engagements?", "How long does it take to find a relevant past deliverable?"],
        },
        {
          id: "Q-CON-5",
          section: "2.6",
          question: "How do you stay in contact with past clients between engagements?",
          why: "Repeat business and referrals are the primary revenue source for most consulting firms — most do nothing systematic here.",
          fields: ["Any nurture / re-engagement sequence?", "How often do past clients return?", "How do you track when a past client might need you again?"],
        },
      ],
      softwareExamples: [
        { category: "Project management", examples: "Asana, Monday.com, ClickUp, Notion, Basecamp, Teamwork, none" },
        { category: "CRM / pipeline", examples: "HubSpot, Pipedrive, Salesforce, Notion, spreadsheet, none" },
        { category: "Time tracking", examples: "Harvest, Toggl, Clockify, Timely, spreadsheet, none" },
        { category: "Proposal / SOW tools", examples: "Proposify, PandaDoc, Better Proposals, Word templates, none" },
        { category: "Knowledge management", examples: "Notion, Confluence, SharePoint, Google Drive, none" },
        { category: "Client portal", examples: "Clinked, Moxo, custom SharePoint, none" },
        { category: "Invoicing / billing", examples: "Xero, QuickBooks, Harvest (invoicing), FreshBooks, none" },
      ],
      platformIntegrations: [
        { platform: "HubSpot",    makeIntegration: "Native module available",            notes: "Strong CRM integration. Deals, contacts, tasks all accessible." },
        { platform: "Pipedrive",  makeIntegration: "Native module available",            notes: "Good coverage. Pipeline and deal automation well-supported." },
        { platform: "Asana",      makeIntegration: "Native module available",            notes: "Tasks, projects, milestones. Good for project status automation." },
        { platform: "Monday.com", makeIntegration: "Native module available",            notes: "Boards, items, statuses. Strong Make.com support." },
        { platform: "Harvest",    makeIntegration: "Native module available",            notes: "Time entries, invoices, clients. Good for billing automation." },
        { platform: "Notion",     makeIntegration: "Native module available",            notes: "Database pages. Good for knowledge capture and project tracking." },
        { platform: "None",       makeIntegration: "N/A — build Airtable CRM first",    notes: "Airtable becomes the client, pipeline, and project foundation." },
      ],
    },
  },

  // ───────────────────────────────────────────────────────────────────────────
  // REGION-SPECIFIC COMPLIANCE MODULES
  // ───────────────────────────────────────────────────────────────────────────

  regions: {

    UK: {
      label: "United Kingdom",
      dataProtection: "UK GDPR / Data Protection Act 2018",
      dataProtectionAuthority: "ICO (Information Commissioner's Office)",
      amlFramework: "Money Laundering Regulations 2017 (MLR 2017)",
      registrationNote: "ICO registration required for all data controllers.",

      firmTypeCompliance: {

        lawFirm: {
          regulator: "Solicitors Regulation Authority (SRA)",
          keyObligations: [
            { obligation: "AML/KYC — documented policy exists?",       answer: "Y / N / Partial" },
            { obligation: "Designated MLRO identified?",               answer: "Y / N — Who?" },
            { obligation: "CDD completed for all new clients?",        answer: "Always / Usually / Inconsistently" },
            { obligation: "Enhanced due diligence for high-risk?",     answer: "Y / N" },
            { obligation: "Sanctions screening process?",              answer: "Documented / Ad hoc / None" },
            { obligation: "SRA Transparency Rules compliance?",        answer: "Y / N / Unsure" },
            { obligation: "Client care letter process documented?",    answer: "Y / N" },
            { obligation: "Complaints log maintained?",                answer: "Y / N" },
            { obligation: "Last SRA audit / file review?",            answer: "" },
          ],
          complianceNote: "If audited by the SRA, the firm must demonstrate a consistent, evidenced KYC process. Person-dependent processes leave no reliable audit trail — this is the highest-priority compliance gap in most small law firms.",
          automationMitigations: [
            { gap: "KYC docs collected via unencrypted email",    risk: "GDPR / data security breach risk",          mitigation: "Replace with Tally secure upload → restricted Google Drive folder" },
            { gap: "No consistent KYC checklist",                 risk: "MLR 2017 — inconsistent CDD",              mitigation: "Tally form enforces required fields. No submission without all docs." },
            { gap: "No audit trail for matter acceptance",        risk: "SRA Code of Conduct — client care",        mitigation: "Airtable records every status change with timestamp + user" },
            { gap: "Client care letter not tracked",              risk: "SRA Transparency Rules",                   mitigation: "PandaDoc tracks open, sign, timestamp. Stored in Drive." },
            { gap: "Sanctions screening — ad hoc",                risk: "MLR 2017",                                 mitigation: "Integrate sanctions check into onboarding workflow as required step" },
          ],
        },

        financialAdviser: {
          regulator: "Financial Conduct Authority (FCA)",
          keyObligations: [
            { obligation: "FCA authorisation / appointed representative status?", answer: "Directly authorised / AR — which network?" },
            { obligation: "Consumer Duty implementation documented?",             answer: "Y / N / In progress" },
            { obligation: "Suitability assessment process documented?",           answer: "Y / N" },
            { obligation: "Vulnerability assessment process in place?",           answer: "Y / N" },
            { obligation: "PROD rules compliance (product governance)?",          answer: "Y / N / Unsure" },
            { obligation: "Ongoing service charges evidenced?",                   answer: "Y / N / Partially" },
            { obligation: "Annual review process documented?",                    answer: "Y / N" },
            { obligation: "Complaints process (FCA DISP)?",                       answer: "Documented / Informal / None" },
            { obligation: "Last FCA / network compliance audit?",                 answer: "" },
          ],
          complianceNote: "Consumer Duty (effective July 2023) requires firms to demonstrate positive client outcomes. Automation that creates evidence of service delivery — review completion, suitability documentation, communication logs — directly supports Consumer Duty compliance.",
          automationMitigations: [
            { gap: "Annual reviews missed or undocumented",          risk: "FCA Consumer Duty — evidenced outcomes",    mitigation: "Automated review scheduling and completion tracking in Airtable" },
            { gap: "Suitability reports produced inconsistently",    risk: "FCA suitability requirements",             mitigation: "AI-assisted suitability report drafting with mandatory paraplanner review" },
            { gap: "Ongoing service charges without evidence",       risk: "FCA / COBS ongoing charges rules",         mitigation: "Service delivery log in Airtable — timestamped per client" },
            { gap: "Vulnerability not assessed / recorded",         risk: "FCA Consumer Duty — vulnerable clients",   mitigation: "Vulnerability flag in onboarding form, routed for adviser review" },
            { gap: "Client data in uncontrolled systems",            risk: "UK GDPR / ICO enforcement",                mitigation: "Centralise in Airtable with role-based access controls" },
          ],
        },

        accounting: {
          regulator: "ICAEW / ACCA / CIOT / AAT (depending on services offered)",
          keyObligations: [
            { obligation: "Professional body membership current?",              answer: "Y / N — which body?" },
            { obligation: "AML supervision in place?",                         answer: "Y / N — supervised by whom?" },
            { obligation: "AML/KYC policy documented?",                        answer: "Y / N / Partial" },
            { obligation: "Engagement letters for all clients?",               answer: "Always / Usually / Inconsistently" },
            { obligation: "PCRT (Professional Conduct in Tax) compliance?",    answer: "Y / N / Unsure" },
            { obligation: "MTD (Making Tax Digital) process for clients?",     answer: "Documented / Ad hoc" },
            { obligation: "Complaints process documented?",                    answer: "Y / N" },
            { obligation: "Professional indemnity insurance current?",         answer: "Y / N" },
            { obligation: "Last professional body inspection?",                answer: "" },
          ],
          complianceNote: "UK accounting firms are subject to AML supervision through their professional body. Every client must have an engagement letter and a documented risk assessment. These are automatable compliance gates that most small firms execute inconsistently.",
          automationMitigations: [
            { gap: "Engagement letters not tracked",        risk: "Professional body AML supervision",    mitigation: "PandaDoc engagement letter with tracked delivery and signature" },
            { gap: "AML risk assessment informal",          risk: "MLR 2017 — professional body audit",  mitigation: "Structured Tally form enforces AML risk classification per client" },
            { gap: "Deadline tracking in spreadsheet",      risk: "Filing deadline failures",            mitigation: "Airtable deadline calendar with automated client chasing sequences" },
            { gap: "Document collection ad hoc",            risk: "Late filings, quality errors",        mitigation: "Automated document request sequences with completion tracking" },
            { gap: "Client data scattered across email",    risk: "UK GDPR / ICO",                       mitigation: "Centralise in practice management tool or Airtable with access controls" },
          ],
        },

        consulting: {
          regulator: "No universal sector regulator. Applicable frameworks: UK GDPR, ICO, sector-specific regulation if operating in regulated industries.",
          keyObligations: [
            { obligation: "UK GDPR compliance documented?",                    answer: "Y / N / Partial" },
            { obligation: "ICO registration in place?",                        answer: "Y / N" },
            { obligation: "Data processor agreements with all vendors?",       answer: "Y / N / Unsure" },
            { obligation: "Engagement contracts with limitation of liability?", answer: "Y / N" },
            { obligation: "Professional indemnity insurance current?",         answer: "Y / N" },
            { obligation: "NDA / confidentiality process for new clients?",    answer: "Y / N" },
            { obligation: "IP ownership clauses in contracts?",                answer: "Y / N / Varies" },
            { obligation: "Any sector-specific regulation? (FCA, SRA, etc.)", answer: "Y / N — specify" },
          ],
          complianceNote: "Consulting firms face lighter regulatory burden than law or financial advice, but contractual and data protection obligations are still significant. The compliance focus here is on data handling, IP protection, and contractual governance — all of which automation can systematise.",
          automationMitigations: [
            { gap: "NDAs not consistently executed",           risk: "IP / confidentiality exposure",        mitigation: "NDA dispatch automated on new client record creation in Airtable" },
            { gap: "Engagement contracts ad hoc",              risk: "Scope creep, payment disputes",        mitigation: "PandaDoc SOW template auto-generated from scoping form inputs" },
            { gap: "Client data in uncontrolled shared drives", risk: "UK GDPR / ICO",                      mitigation: "Structured Google Drive with access controls per client matter" },
            { gap: "No IP assignment process",                 risk: "Disputed ownership of deliverables",  mitigation: "IP clause in standard SOW, e-signed via PandaDoc" },
          ],
        },
      },
    },

    US: {
      label: "United States",
      dataProtection: "CCPA (California) / state privacy laws / sector-specific federal law",
      dataProtectionAuthority: "FTC + state attorneys general (no single federal authority)",
      amlFramework: "Bank Secrecy Act (BSA) / FinCEN regulations",
      registrationNote: "No single federal data protection registration — state obligations vary. California (CCPA/CPRA), Virginia (VCDPA), Colorado (CPA), and others have specific requirements.",

      firmTypeCompliance: {

        lawFirm: {
          regulator: "State Bar (varies by state — e.g. State Bar of California, New York State Bar)",
          keyObligations: [
            { obligation: "State Bar membership / good standing?",              answer: "Y / N — which state(s)?" },
            { obligation: "AML policy documented (where applicable)?",          answer: "Y / N / N/A" },
            { obligation: "Client identification process documented?",           answer: "Y / N" },
            { obligation: "Engagement / retainer agreement for all clients?",   answer: "Always / Usually / Inconsistently" },
            { obligation: "IOLTA / client trust account management?",           answer: "Y / N — software used?" },
            { obligation: "Conflicts of interest check process?",               answer: "Documented / Ad hoc / None" },
            { obligation: "State-specific confidentiality compliance (MRPC)?",  answer: "Y / N" },
            { obligation: "Malpractice insurance current?",                     answer: "Y / N" },
            { obligation: "Last State Bar audit / trust account review?",       answer: "" },
          ],
          complianceNote: "US law firms are regulated at the state level. AML obligations are less prescriptive than UK/EU but IOLTA trust accounting is a significant compliance area. Model Rules of Professional Conduct (MRPC) apply in most states — client confidentiality obligations affect data storage and automation design.",
          automationMitigations: [
            { gap: "Client intake informal / undocumented",       risk: "State Bar — engagement requirements",     mitigation: "Tally intake form → Airtable record → retainer agreement via PandaDoc" },
            { gap: "Conflicts check ad hoc",                      risk: "MRPC Rule 1.7 — conflict of interest",   mitigation: "Airtable conflict check against existing client records on new enquiry" },
            { gap: "Trust account entries manual",                risk: "IOLTA mismanagement — State Bar risk",   mitigation: "Flag trust account entries for manual review — never auto-post" },
            { gap: "Client data in unencrypted email",            risk: "MRPC Rule 1.6 — confidentiality",        mitigation: "Secure upload via Tally → restricted Drive folder" },
            { gap: "No audit trail for client communications",    risk: "Malpractice liability",                  mitigation: "All automated comms logged in Airtable with timestamp" },
          ],
        },

        financialAdviser: {
          regulator: "SEC (RIAs with >$110M AUM) / State securities regulators (smaller RIAs) / FINRA (broker-dealers)",
          keyObligations: [
            { obligation: "RIA registration — SEC or state?",                  answer: "SEC / State — which state?" },
            { obligation: "Form ADV current and accurate?",                    answer: "Y / N — last filed?" },
            { obligation: "Fiduciary standard documented and applied?",        answer: "Y / N" },
            { obligation: "Reg BI compliance (broker-dealers)?",               answer: "Y / N / N/A" },
            { obligation: "AML program in place (FinCEN)?",                    answer: "Y / N" },
            { obligation: "Written supervisory procedures (WSPs) documented?", answer: "Y / N" },
            { obligation: "Client suitability / best interest documented?",    answer: "Y / N" },
            { obligation: "Complaints log maintained?",                        answer: "Y / N" },
            { obligation: "Last SEC / state / FINRA examination?",             answer: "" },
          ],
          complianceNote: "SEC-registered RIAs face examination risk — automated audit trails and documented processes directly reduce examination risk. Reg BI (for broker-dealers) requires best interest documentation. Suitability records must be retrievable. Automation that creates consistent, timestamped records is a compliance asset.",
          automationMitigations: [
            { gap: "Suitability documentation inconsistent",       risk: "SEC exam / Reg BI compliance",           mitigation: "Structured suitability capture in Airtable — mandatory before engagement" },
            { gap: "AML program not documented",                   risk: "FinCEN / BSA obligations",               mitigation: "AML checklist enforced in onboarding workflow — no engagement without completion" },
            { gap: "Client communications not archived",           risk: "SEC books & records requirements",       mitigation: "All automated emails logged and archived — Gmail + Airtable" },
            { gap: "Annual review process undocumented",           risk: "Fiduciary duty — ongoing suitability",   mitigation: "Review scheduling and completion tracking in Airtable" },
            { gap: "Client data in uncontrolled systems",          risk: "SEC cybersecurity rules (2023)",         mitigation: "Centralise with access controls — Airtable RBAC + Drive permissions" },
          ],
        },

        accounting: {
          regulator: "AICPA / State CPA Boards / IRS (for tax practitioners — Circular 230)",
          keyObligations: [
            { obligation: "CPA licence current (by state)?",                   answer: "Y / N — which state(s)?" },
            { obligation: "PTIN (Preparer Tax ID) current?",                   answer: "Y / N" },
            { obligation: "Engagement letters for all clients?",               answer: "Always / Usually / Inconsistently" },
            { obligation: "AML program (if required by services)?",            answer: "Y / N / N/A" },
            { obligation: "Circular 230 compliance for tax advice?",           answer: "Y / N" },
            { obligation: "Peer review completed (AICPA)?",                    answer: "Y / N — last date?" },
            { obligation: "Malpractice / E&O insurance current?",             answer: "Y / N" },
            { obligation: "Data security policy (IRS requirements)?",          answer: "Y / N / Partial" },
            { obligation: "Written information security plan (WISP)?",         answer: "Y / N" },
          ],
          complianceNote: "The IRS requires all tax preparers to have a Written Information Security Plan (WISP) — most small CPA firms do not have one documented. Automation that centralises and controls access to client tax data directly supports WISP compliance. Engagement letters are a AICPA professional standard — automation ensures consistency.",
          automationMitigations: [
            { gap: "No WISP / data security policy",               risk: "IRS requirements / state CPA board",     mitigation: "Airtable access controls + Drive folder permissions = documented data governance" },
            { gap: "Engagement letters inconsistent",              risk: "AICPA standards / malpractice",          mitigation: "PandaDoc engagement letter auto-dispatched on new client creation" },
            { gap: "Client documents via unencrypted email",       risk: "IRS data security / CCPA / state law",   mitigation: "Secure portal or Tally upload replaces email for sensitive docs" },
            { gap: "Deadline tracking informal",                   risk: "IRS filing penalties / client loss",     mitigation: "Airtable deadline calendar with automated client document chase" },
            { gap: "No audit trail for advice given",              risk: "Circular 230 / malpractice",             mitigation: "All client communications logged in Airtable with timestamp" },
          ],
        },

        consulting: {
          regulator: "No universal sector regulator. Key frameworks: FTC regulations, CCPA / state privacy laws, sector-specific if operating in regulated industries.",
          keyObligations: [
            { obligation: "CCPA / state privacy law compliance?",              answer: "Y / N / Unsure — which states?" },
            { obligation: "Data processor agreements with vendors?",           answer: "Y / N / Unsure" },
            { obligation: "Engagement contracts with limitation of liability?", answer: "Y / N" },
            { obligation: "Professional liability / E&O insurance?",           answer: "Y / N" },
            { obligation: "NDA / confidentiality process for new clients?",    answer: "Y / N" },
            { obligation: "IP ownership clauses in contracts?",                answer: "Y / N / Varies" },
            { obligation: "Any sector-specific regulation?",                   answer: "Y / N — specify (HIPAA, SOC 2, etc.)" },
            { obligation: "Data breach response plan?",                        answer: "Y / N" },
          ],
          complianceNote: "US consulting firms working with clients in California, Virginia, Colorado, and other states with privacy laws need to understand their data handling obligations. If the firm works with healthcare, financial services, or government clients, additional sector-specific obligations apply (HIPAA, SOC 2, FedRAMP).",
          automationMitigations: [
            { gap: "NDAs not consistently executed",               risk: "IP / confidentiality exposure",          mitigation: "NDA auto-dispatched on new client record creation in Airtable" },
            { gap: "Engagement contracts ad hoc",                  risk: "Scope creep, payment disputes, liability", mitigation: "PandaDoc SOW template from scoping form inputs — e-signed" },
            { gap: "Client data in uncontrolled systems",          risk: "CCPA / state privacy laws",              mitigation: "Centralised Airtable with RBAC + Google Drive access controls" },
            { gap: "No data breach response process",              risk: "State notification obligations",         mitigation: "Flag for manual process design — not automatable but document it" },
          ],
        },
      },
    },

    EU: {
      label: "European Union",
      dataProtection: "GDPR (Regulation (EU) 2016/679)",
      dataProtectionAuthority: "National supervisory authorities (e.g. CNIL — France, BfDI — Germany, DPC — Ireland)",
      amlFramework: "AMLD6 (6th Anti-Money Laundering Directive) — transposed into national law",
      registrationNote: "GDPR applies to all EU-established firms and any firm processing data of EU data subjects. Data Protection Officer (DPO) required for certain organisations. Processing records (ROPA) required under Article 30.",

      firmTypeCompliance: {

        lawFirm: {
          regulator: "National bar association (varies by member state — e.g. Ordre des avocats — France, Rechtsanwaltskammer — Germany, Law Society — Ireland)",
          keyObligations: [
            { obligation: "Bar association membership / good standing?",         answer: "Y / N — which bar?" },
            { obligation: "AML/KYC policy documented (AMLD6)?",                  answer: "Y / N / Partial" },
            { obligation: "Designated MLRO / compliance officer?",               answer: "Y / N — Who?" },
            { obligation: "CDD completed for all new clients?",                  answer: "Always / Usually / Inconsistently" },
            { obligation: "Enhanced due diligence for high-risk?",               answer: "Y / N" },
            { obligation: "Beneficial ownership verification?",                  answer: "Y / N" },
            { obligation: "GDPR Article 30 — Records of Processing (ROPA)?",     answer: "Y / N / Partial" },
            { obligation: "DPO appointed (if required)?",                        answer: "Y / N / N/A" },
            { obligation: "Client care / engagement letter process?",            answer: "Y / N" },
          ],
          complianceNote: "AMLD6 introduced criminal liability for AML failures — significantly higher stakes than previous directives. Beneficial ownership verification is now mandatory. GDPR Article 30 requires a documented record of all processing activities. Automation that creates consistent evidence trails is a direct compliance asset.",
          automationMitigations: [
            { gap: "KYC/CDD inconsistent across clients",           risk: "AMLD6 — criminal liability for failures", mitigation: "Tally form enforces all required CDD fields — no matter opens without completion" },
            { gap: "Beneficial ownership not verified",             risk: "AMLD6 mandatory requirement",            mitigation: "Beneficial ownership check built into onboarding workflow as hard gate" },
            { gap: "No ROPA / Article 30 records",                  risk: "GDPR — supervisory authority fine",       mitigation: "Airtable processing log updated automatically as data is collected" },
            { gap: "Client data sent via unencrypted email",        risk: "GDPR Article 32 — security obligations", mitigation: "Secure upload via Tally → access-controlled Drive folder" },
            { gap: "No audit trail for client decisions",           risk: "AMLD6 / national bar obligations",       mitigation: "Every Airtable status change logged with timestamp and user" },
          ],
        },

        financialAdviser: {
          regulator: "National financial regulator (varies by state — e.g. AMF — France, BaFin — Germany, CBI — Ireland) + ESMA framework",
          keyObligations: [
            { obligation: "National regulator authorisation?",                   answer: "Y / N — which regulator?" },
            { obligation: "MiFID II / IDD compliance documented?",               answer: "Y / N" },
            { obligation: "Suitability assessment process documented?",          answer: "Y / N" },
            { obligation: "Appropriateness assessment (execution-only)?",        answer: "Y / N / N/A" },
            { obligation: "KID / KIID provided for all products?",              answer: "Y / N" },
            { obligation: "AML/CDD process documented (AMLD6)?",                answer: "Y / N / Partial" },
            { obligation: "Best execution policy documented?",                   answer: "Y / N / N/A" },
            { obligation: "Complaints process (per national rules)?",            answer: "Y / N" },
            { obligation: "GDPR Article 30 (ROPA) in place?",                   answer: "Y / N / Partial" },
          ],
          complianceNote: "MiFID II requires documented suitability assessments, best execution policies, and extensive record-keeping. AMLD6 adds AML obligations. Together these create a significant compliance documentation burden — exactly the type of structured, repeatable documentation that automation handles well.",
          automationMitigations: [
            { gap: "Suitability records inconsistent",              risk: "MiFID II — national regulator enforcement", mitigation: "Structured suitability capture in onboarding workflow — mandatory completion" },
            { gap: "AML/CDD not documented per AMLD6",             risk: "AMLD6 criminal liability",               mitigation: "AML checklist enforced in workflow — hard gate before engagement opens" },
            { gap: "KID/KIID not systematically provided",         risk: "MiFID II / PRIIPs",                      mitigation: "Product document dispatch automated at recommendation stage" },
            { gap: "Client communications not archived",            risk: "MiFID II record-keeping (5 years)",      mitigation: "All automated comms logged in Airtable — Gmail archive + Airtable record" },
            { gap: "No ROPA",                                       risk: "GDPR Article 30",                        mitigation: "Airtable processing log — updated automatically as data collected" },
          ],
        },

        accounting: {
          regulator: "National professional body (varies — e.g. OEC — France, WPK — Germany, CPA Ireland) + AMLD6 supervision",
          keyObligations: [
            { obligation: "Professional body membership current?",               answer: "Y / N — which body?" },
            { obligation: "AML supervision in place (AMLD6)?",                   answer: "Y / N — supervised by whom?" },
            { obligation: "AML/KYC policy documented?",                          answer: "Y / N / Partial" },
            { obligation: "Engagement letters for all clients?",                 answer: "Always / Usually / Inconsistently" },
            { obligation: "GDPR Article 30 (ROPA) in place?",                   answer: "Y / N / Partial" },
            { obligation: "DPO appointed (if required)?",                        answer: "Y / N / N/A" },
            { obligation: "DAC6 reporting obligations (cross-border)?",          answer: "Y / N / N/A" },
            { obligation: "Professional indemnity insurance current?",           answer: "Y / N" },
            { obligation: "Last professional body inspection?",                  answer: "" },
          ],
          complianceNote: "AMLD6 places accounting firms under AML supervision — they must have a documented risk assessment, CDD process, and MLRO. GDPR Article 30 requires processing records. DAC6 applies to firms advising on cross-border arrangements. These are all documentation obligations that automation can systematise.",
          automationMitigations: [
            { gap: "AML risk assessment informal",                 risk: "AMLD6 — professional body audit",        mitigation: "Structured AML risk classification in onboarding workflow — mandatory" },
            { gap: "Engagement letters inconsistent",              risk: "Professional body standards",            mitigation: "PandaDoc engagement letter auto-dispatched on new client creation" },
            { gap: "No ROPA",                                      risk: "GDPR Article 30 — supervisory fine",     mitigation: "Airtable data processing log — updated automatically" },
            { gap: "Document collection ad hoc",                   risk: "Filing deadline failures",               mitigation: "Automated document request sequences with completion tracking" },
            { gap: "Client data in uncontrolled email",            risk: "GDPR Article 32",                        mitigation: "Secure upload + access-controlled Drive folder" },
          ],
        },

        consulting: {
          regulator: "No universal sector regulator. Primary framework: GDPR + AMLD6 (if providing financial / legal adjacent services).",
          keyObligations: [
            { obligation: "GDPR compliance documented?",                         answer: "Y / N / Partial" },
            { obligation: "GDPR Article 30 (ROPA) in place?",                   answer: "Y / N" },
            { obligation: "DPO appointed (if required)?",                        answer: "Y / N / N/A" },
            { obligation: "Data processor agreements with all vendors?",         answer: "Y / N / Unsure" },
            { obligation: "Engagement contracts with liability cap?",            answer: "Y / N" },
            { obligation: "NDA / confidentiality process for new clients?",      answer: "Y / N" },
            { obligation: "IP ownership clauses in contracts?",                  answer: "Y / N / Varies" },
            { obligation: "Any sector-specific regulation?",                     answer: "Y / N — specify" },
            { obligation: "Data breach notification process (72hr GDPR)?",       answer: "Y / N" },
          ],
          complianceNote: "GDPR is the dominant compliance obligation for EU consulting firms. The 72-hour breach notification requirement (Article 33) is often overlooked by small firms. Data processor agreements are mandatory for every vendor handling personal data — Make.com, Airtable, and PandaDoc all require DPAs. Automation that documents data flows supports ROPA compliance.",
          automationMitigations: [
            { gap: "No vendor DPAs in place",                      risk: "GDPR Article 28 — mandatory DPAs",       mitigation: "Checklist: confirm DPA with Make.com, Airtable, PandaDoc before build" },
            { gap: "No ROPA",                                      risk: "GDPR Article 30",                        mitigation: "Airtable data processing log — updated as data is collected" },
            { gap: "NDAs not consistently executed",               risk: "IP / confidentiality exposure",          mitigation: "NDA auto-dispatched on new client record — PandaDoc e-sign" },
            { gap: "No breach notification process",               risk: "GDPR Article 33 — 72hr notification",   mitigation: "Flag for manual process design — document the response plan" },
            { gap: "Client data in uncontrolled systems",          risk: "GDPR Article 32",                        mitigation: "Centralise in Airtable with RBAC + Drive access controls" },
          ],
        },
      },
    },
  },
};
