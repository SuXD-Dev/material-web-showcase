"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Section, ShowcaseBox, ButtonRow, SpringDemo } from "./components";

/* ═══════════════════════════════════════════════════════════
   MATERIAL WEB SHOWCASE — Every M3 component & technique
   ═══════════════════════════════════════════════════════════ */

const COLORS = [
  { key: "blue", dot: "#a1c9ff", label: "Blue" },
  { key: "pink", dot: "#ffaee4", label: "Pink" },
  { key: "green", dot: "#80da88", label: "Green" },
] as const;

type ColorKey = (typeof COLORS)[number]["key"];

const NAV_SECTIONS = [
  { id: "buttons", label: "Buttons", icon: "smart_button" },
  { id: "cards", label: "Cards", icon: "dashboard" },
  { id: "chips", label: "Chips", icon: "filter_alt" },
  { id: "textfields", label: "Fields", icon: "edit_note" },
  { id: "switches", label: "Switch", icon: "toggle_on" },
  { id: "selection", label: "Select", icon: "check_box" },
  { id: "progress", label: "Progress", icon: "hourglass_top" },
  { id: "tabs", label: "Tabs", icon: "tab" },
  { id: "dialogs", label: "Dialogs", icon: "dialog" },
  { id: "lists", label: "Lists", icon: "list" },
  { id: "elevation", label: "Elevation", icon: "layers" },
  { id: "ripple", label: "Ripple", icon: "water_drop" },
  { id: "focus", label: "Focus", icon: "center_focus_strong" },
  { id: "menu", label: "Menu", icon: "menu_open" },
  { id: "snackbar", label: "Snack", icon: "chat_bubble" },
];

export default function Showcase() {
  const [scrolled, setScrolled] = useState(false);
  const [color, setColor] = useState<ColorKey>("blue");
  const [mobileNav, setMobileNav] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(true);
  const [switch2, setSwitch2] = useState(false);
  const [checks, setChecks] = useState([true, false, true]);
  const [radio, setRadio] = useState(0);
  const [filterChips, setFilterChips] = useState([true, false, true, false]);
  const [tabActive, setTabActive] = useState(0);
  const [progress, setProgress] = useState(65);
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll handler
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const bar = document.getElementById("scroll-progress");
      if (bar) bar.style.width = `${pct}%`;
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("revealed"); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".scroll-reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Close menu on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile nav on link click
  function scrollToSection(id: string) {
    setMobileNav(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  // Animate progress
  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 1));
    }, 80);
    return () => clearInterval(t);
  }, []);

  const toggleCheck = useCallback((i: number) => {
    setChecks((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }, []);

  const toggleFilter = useCallback((i: number) => {
    setFilterChips((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }, []);

  return (
    <>
      {/* ═══ NAV ═══ */}
      <header className={`nav-glass ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-glass-inner">
          <a href="#" className="flex items-center gap-1.5 text-sm font-semibold tracking-tight text-[var(--color-text)] no-underline">
            <span className="material-symbols-outlined icon-primary" style={{ fontSize: 20 }}>blur_on</span>
            <span className="font-mono text-xs">
              material-web<span className="text-[var(--color-primary)]">{"//"}</span>
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Sections">
            {NAV_SECTIONS.slice(0, 7).map((s) => (
              <button key={s.id} onClick={() => scrollToSection(s.id)} className="nav-link">
                {s.label}
              </button>
            ))}
            <div className="ml-2 flex items-center gap-1.5">
              {COLORS.map((c) => (
                <button
                  key={c.key}
                  onClick={() => { setColor(c.key); document.documentElement.setAttribute("data-color", c.key); }}
                  className="w-5 h-5 rounded-full border-2 transition-transform hover:scale-110"
                  style={{ background: c.dot, borderColor: color === c.key ? "var(--color-text)" : "var(--color-border-hover)" }}
                  aria-label={`${c.label} theme`}
                />
              ))}
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button className="md:hidden p-2" onClick={() => setMobileNav(!mobileNav)} aria-label="Menu">
            <span className="material-symbols-outlined text-[var(--color-text-sec)]" style={{ fontSize: 22 }}>
              {mobileNav ? "close" : "menu"}
            </span>
          </button>
        </div>

        {/* Mobile panel */}
        {mobileNav && (
          <div className="md:hidden absolute left-0 right-0 top-full border-t border-[var(--color-border)] p-4 flex flex-col gap-1" style={{ background: "color-mix(in srgb, var(--color-bg) 95%, transparent)", backdropFilter: "blur(20px)" }}>
            {NAV_SECTIONS.map((s) => (
              <button key={s.id} onClick={() => scrollToSection(s.id)} className="nav-link flex items-center gap-2 py-2.5 text-left">
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "var(--color-text-muted)" }}>{s.icon}</span>
                {s.label}
              </button>
            ))}
            <div className="my-2 border-t border-[var(--color-border)]" />
            <div className="flex items-center gap-2 px-2">
              {COLORS.map((c) => (
                <button key={c.key} onClick={() => { setColor(c.key); document.documentElement.setAttribute("data-color", c.key); }}
                  className="w-6 h-6 rounded-full border-2"
                  style={{ background: c.dot, borderColor: color === c.key ? "var(--color-text)" : "var(--color-border-hover)" }} />
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="pt-[calc(var(--nav-h)+2rem)]">
        {/* ═══ HERO ═══ */}
        <section className="px-6 pb-16 pt-8">
          <div className="max-w-[1100px] mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border font-mono text-xs font-medium tracking-wide" style={{ background: "var(--color-primary-dim)", borderColor: "var(--color-primary-border)", color: "var(--color-primary)" }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-primary)", animation: "pulse-dot 2s ease-in-out infinite" }} />
              material web 3
            </span>
            <h1 className="mt-5" style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "clamp(36px, 7vw, 72px)", lineHeight: 1.05, letterSpacing: "-1.5px" }}>
              <span className="gradient-text">Every component.</span><br />
              <span style={{ color: "var(--color-text)" }}>One showcase.</span>
            </h1>
            <p className="mt-5 text-lg max-w-xl" style={{ color: "var(--color-text-sec)", lineHeight: 1.7 }}>
              A complete reference of Material Web 3 features — dual-shadow elevation,
              state layers, radial-gradient ripples, expressive springs, focus ring pulses,
              and every M3 component. Built with raw CSS, zero libraries.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button onClick={() => scrollToSection("buttons")} className="md-btn md-btn-filled">
                <span className="material-symbols-outlined">explore</span>Explore
              </button>
              <button onClick={() => scrollToSection("elevation")} className="md-btn md-btn-outlined">
                <span className="material-symbols-outlined">layers</span>Elevation
              </button>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
              {[{ v: "15", l: "Sections" }, { v: "6", l: "Buttons" }, { v: "3", l: "Cards" }, { v: "5", l: "Elevations" }].map((s) => (
                <div key={s.l} className="md-elev-1 p-3 rounded-2xl text-center" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", transition: "transform var(--dur-s3) var(--spring-interactive), box-shadow 280ms var(--ease-standard)" }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.5rem", color: "var(--color-primary)" }}>{s.v}</div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-widest mt-0.5" style={{ color: "var(--color-text-muted)" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="max-w-[80px] mx-auto h-px" style={{ background: "var(--color-border)" }} aria-hidden="true" />

        {/* ═══════════ BUTTONS ═══════════ */}
        <Section id="buttons" kicker="buttons" title="M3 Buttons">
          <p>All 6 Material 3 button variants with state layers, dual-shadow elevation, and expressive spring animations.</p>
          <div className="showcase-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}>
            <ShowcaseBox label="Filled">
              <ButtonRow>
                <button className="md-btn md-btn-filled"><span className="material-symbols-outlined">add</span>Filled</button>
                <button className="md-btn md-btn-filled" disabled style={{ opacity: 0.38, pointerEvents: "none" }}>Disabled</button>
              </ButtonRow>
            </ShowcaseBox>
            <ShowcaseBox label="Tonal">
              <ButtonRow>
                <button className="md-btn md-btn-tonal"><span className="material-symbols-outlined">edit</span>Tonal</button>
              </ButtonRow>
            </ShowcaseBox>
            <ShowcaseBox label="Outlined">
              <ButtonRow>
                <button className="md-btn md-btn-outlined">Outlined</button>
              </ButtonRow>
            </ShowcaseBox>
            <ShowcaseBox label="Text">
              <ButtonRow>
                <button className="md-btn md-btn-text">Text</button>
                <button className="md-btn md-btn-text"><span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>With Icon</button>
              </ButtonRow>
            </ShowcaseBox>
            <ShowcaseBox label="Elevated">
              <ButtonRow>
                <button className="md-btn md-btn-elevated">Elevated</button>
              </ButtonRow>
            </ShowcaseBox>
            <ShowcaseBox label="FABs">
              <div className="flex items-end gap-3 flex-wrap">
                <button className="md-btn md-btn-filled md-btn-fab md-elev-3" title="Add"><span className="material-symbols-outlined">add</span></button>
                <button className="md-btn md-btn-tonal md-btn-fab-small md-elev-2" title="Edit"><span className="material-symbols-outlined">edit</span></button>
                <button className="md-btn md-btn-filled md-btn-fab-large md-elev-4" title="Create"><span className="material-symbols-outlined">add</span></button>
              </div>
            </ShowcaseBox>
            <ShowcaseBox label="Icon Buttons">
              <div className="flex items-center gap-2 flex-wrap">
                <button className="md-btn md-btn-filled md-btn-icon md-elev-2" title="Favorite"><span className="material-symbols-outlined">favorite</span></button>
                <button className="md-btn md-btn-tonal md-btn-icon" title="Share"><span className="material-symbols-outlined">share</span></button>
                <button className="md-btn md-btn-outlined md-btn-icon" title="More"><span className="material-symbols-outlined">more_vert</span></button>
              </div>
            </ShowcaseBox>
          </div>
        </Section>

        {/* ═══════════ CARDS ═══════════ */}
        <Section id="cards" kicker="cards" title="M3 Cards">
          <p>Three Material 3 card variants — Filled, Outlined, and Elevated — each with integrated state layers and dual-shadow transitions.</p>
          <div className="grid gap-5 sm:grid-cols-3">
            <div className="md-card md-card-filled p-6 scroll-reveal">
              <span className="material-symbols-outlined icon-primary" style={{ fontSize: 28 }}>inbox</span>
              <h3 className="mt-3 font-semibold" style={{ color: "var(--color-on-surface)" }}>Filled Card</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-on-surface-variant)", lineHeight: 1.6 }}>Highest surface container with state layer on hover/active. No resting elevation.</p>
              <button className="md-btn md-btn-text mt-4">Action</button>
            </div>
            <div className="md-card md-card-outlined p-6 scroll-reveal">
              <span className="material-symbols-outlined icon-cyan" style={{ fontSize: 28 }}>description</span>
              <h3 className="mt-3 font-semibold" style={{ color: "var(--color-on-surface)" }}>Outlined Card</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-on-surface-variant)", lineHeight: 1.6 }}>Surface container with outline border. Gains dual-shadow elevation on hover.</p>
              <button className="md-btn md-btn-text mt-4">Action</button>
            </div>
            <div className="md-card md-card-elevated p-6 scroll-reveal">
              <span className="material-symbols-outlined icon-violet" style={{ fontSize: 28 }}>auto_awesome</span>
              <h3 className="mt-3 font-semibold" style={{ color: "var(--color-on-surface)" }}>Elevated Card</h3>
              <p className="mt-2 text-sm" style={{ color: "var(--color-on-surface-variant)", lineHeight: 1.6 }}>Resting dual-shadow elevation (Level 1). Promotes to Level 3 on hover with spring transition.</p>
              <button className="md-btn md-btn-text mt-4">Action</button>
            </div>
          </div>
        </Section>

        {/* ═══════════ CHIPS ═══════════ */}
        <Section id="chips" kicker="chips" title="M3 Chips">
          <p>Assist, Filter, Input, and Suggestion chip types with spring-interactive press animations.</p>
          <div className="showcase-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            <ShowcaseBox label="Assist Chips">
              <div className="flex flex-wrap gap-2">
                {[["lightbulb", "Suggestion"], ["edit", "Edit"], ["share", "Share"]].map(([icon, label]) => (
                  <span key={label as string} className="md-chip md-chip-assist">
                    <span className="material-symbols-outlined">{icon}</span>{label}
                  </span>
                ))}
              </div>
            </ShowcaseBox>
            <ShowcaseBox label="Filter Chips">
              <div className="flex flex-wrap gap-2">
                {["Kotlin", "Compose", "Kernel", "Android"].map((label, i) => (
                  <button key={label} className={`md-chip md-chip-filter ${filterChips[i] ? "selected" : ""}`} onClick={() => toggleFilter(i)}>
                    {filterChips[i] && <span className="material-symbols-outlined" style={{ fontSize: 16 }}>check</span>}{label}
                  </button>
                ))}
              </div>
            </ShowcaseBox>
            <ShowcaseBox label="Input Chip">
              <div className="flex flex-wrap gap-2">
                {["Material", "Web", "Showcase"].map((label) => (
                  <span key={label} className="md-chip md-chip-input">
                    {label}
                    <span className="material-symbols-outlined" style={{ fontSize: 16, cursor: "pointer" }}>close</span>
                  </span>
                ))}
                <span className="md-chip md-chip-input">
                  <input type="text" placeholder="Add..." />
                </span>
              </div>
            </ShowcaseBox>
            <ShowcaseBox label="Suggestion Chips">
              <div className="flex flex-wrap gap-2">
                {["Next.js", "TypeScript", "Tailwind"].map((label) => (
                  <span key={label} className="md-chip md-chip-suggestion">{label}</span>
                ))}
              </div>
            </ShowcaseBox>
          </div>
        </Section>

        {/* ═══════════ TEXT FIELDS ═══════════ */}
        <Section id="textfields" kicker="text fields" title="M3 Text Fields">
          <p>Filled and Outlined text fields with animated labels, leading/trailing icons, and helper text.</p>
          <div className="showcase-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            <ShowcaseBox label="Filled">
              <div className="md-textfield">
                <input type="text" className="md-textfield-input" placeholder=" " />
                <label className="md-textfield-label">Email address</label>
              </div>
              <div className="md-textfield mt-3">
                <input type="password" className="md-textfield-input" placeholder=" " defaultValue="password123" />
                <label className="md-textfield-label">Password</label>
                <div className="md-textfield-helper">At least 8 characters</div>
              </div>
            </ShowcaseBox>
            <ShowcaseBox label="Outlined">
              <div className="md-textfield md-textfield-outlined">
                <input type="text" className="md-textfield-input" placeholder=" " defaultValue="SuXD" />
                <label className="md-textfield-label">Username</label>
                <span className="md-textfield-trailing material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
              </div>
              <div className="md-textfield md-textfield-outlined mt-3">
                <input type="text" className="md-textfield-input" placeholder=" " />
                <label className="md-textfield-label">Search</label>
                <span className="md-textfield-leading material-symbols-outlined" style={{ fontSize: 18 }}>search</span>
              </div>
            </ShowcaseBox>
          </div>
        </Section>

        {/* ═══════════ SWITCHES ═══════════ */}
        <Section id="switches" kicker="switch" title="M3 Switch">
          <p>Material 3 switch with overshoot cubic-bezier (0.175, 0.885, 0.32, 1.275) thumb animation and track color transition.</p>
          <ShowcaseBox label="demo">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>Dark mode</div>
                  <div className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>Using M3 spring overshoot</div>
                </div>
                <button className={`md-switch ${switchOn ? "on" : ""}`} onClick={() => setSwitchOn(!switchOn)} role="switch" aria-checked={switchOn}>
                  <span className="md-switch-thumb" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--color-on-surface)" }}>Notifications</div>
                  <div className="text-xs" style={{ color: "var(--color-on-surface-variant)" }}>Thumb grows on toggle</div>
                </div>
                <button className={`md-switch ${switch2 ? "on" : ""}`} onClick={() => setSwitch2(!switch2)} role="switch" aria-checked={switch2}>
                  <span className="md-switch-thumb" />
                </button>
              </div>
            </div>
          </ShowcaseBox>
        </Section>

        {/* ═══════════ SELECTION ═══════════ */}
        <Section id="selection" kicker="selection" title="M3 Checkbox & Radio">
          <p>Checkboxes with spring-bounce press animation and radios with spring-enter inner dot scale.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <ShowcaseBox label="Checkboxes">
              <div className="flex flex-col gap-3">
                {["Enable Material Web", "Use Expressive Springs", "Dark theme only"].map((label, i) => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer">
                    <button className={`md-checkbox ${checks[i] ? "checked" : ""}`} onClick={() => toggleCheck(i)} aria-checked={checks[i]} role="checkbox">
                      <span className="material-symbols-outlined check-icon">check</span>
                    </button>
                    <span className="text-sm" style={{ color: "var(--color-on-surface)" }}>{label}</span>
                  </label>
                ))}
              </div>
            </ShowcaseBox>
            <ShowcaseBox label="Radio Buttons">
              <div className="flex flex-col gap-3">
                {["Blue", "Pink", "Green"].map((label, i) => (
                  <label key={label} className="flex items-center gap-3 cursor-pointer" onClick={() => setRadio(i)}>
                    <button className={`md-radio ${radio === i ? "selected" : ""}`} role="radio" aria-checked={radio === i}>
                      <span className="md-radio-inner" />
                    </button>
                    <span className="text-sm" style={{ color: "var(--color-on-surface)" }}>{label}</span>
                  </label>
                ))}
              </div>
            </ShowcaseBox>
          </div>
        </Section>

        {/* ═══════════ PROGRESS ═══════════ */}
        <Section id="progress" kicker="progress" title="M3 Progress">
          <p>Linear (determinate & indeterminate) and Circular (determinate & indeterminate) progress indicators.</p>
          <div className="showcase-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            <ShowcaseBox label="Linear Determinate">
              <div className="md-progress-linear"><div className="md-progress-linear-fill" style={{ width: `${progress}%` }} /></div>
              <div className="font-mono text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>{progress}%</div>
            </ShowcaseBox>
            <ShowcaseBox label="Linear Indeterminate">
              <div className="md-progress-linear md-progress-linear-indeterminate"><div className="md-progress-linear-fill" /></div>
            </ShowcaseBox>
            <ShowcaseBox label="Circular Determinate">
              <div className="flex items-center gap-4">
                <div className="md-progress-circular">
                  <svg width="48" height="48" viewBox="0 0 48 48"><circle className="md-progress-circular-track" cx="24" cy="24" r="20" /><circle className="md-progress-circular-fill" cx="24" cy="24" r="20" style={{ strokeDashoffset: 125.6 - (125.6 * progress / 100) }} /></svg>
                </div>
                <div className="md-progress-circular" style={{ width: 64, height: 64 }}>
                  <svg width="64" height="64" viewBox="0 0 48 48"><circle className="md-progress-circular-track" cx="24" cy="24" r="20" /><circle className="md-progress-circular-fill" cx="24" cy="24" r="20" style={{ strokeDashoffset: 125.6 - (125.6 * progress / 100) }} /></svg>
                </div>
              </div>
            </ShowcaseBox>
            <ShowcaseBox label="Circular Indeterminate">
              <div className="md-progress-circular md-progress-circular-indeterminate">
                <svg width="48" height="48" viewBox="0 0 48 48"><circle className="md-progress-circular-track" cx="24" cy="24" r="20" /><circle className="md-progress-circular-fill" cx="24" cy="24" r="20" /></svg>
              </div>
            </ShowcaseBox>
          </div>
        </Section>

        {/* ═══════════ TABS ═══════════ */}
        <Section id="tabs" kicker="tabs" title="M3 Tabs">
          <p>Primary tabs with animated active indicator (spring-enter width transition) and secondary pill tabs.</p>
          <ShowcaseBox label="demo">
            <div className="md-tabs" style={{ marginBottom: "2rem" }}>
              {["Overview", "Features", "Code"].map((label, i) => (
                <button key={label} className={`md-tab ${tabActive === i ? "active" : ""}`} onClick={() => setTabActive(i)}>
                  <span className="material-symbols-outlined">{["info", "star", "code"][i]}</span>{label}
                </button>
              ))}
            </div>
            <div className="md-tabs">
              {["All", "Android", "Web", "Desktop"].map((label, i) => (
                <button key={label} className={`md-tab md-tab-secondary ${tabActive === i ? "active" : ""}`} onClick={() => setTabActive(i)} style={{ borderRadius: "var(--radius-full)", padding: "0.5rem 1rem", flex: "none" }}>
                  {label}
                </button>
              ))}
            </div>
          </ShowcaseBox>
        </Section>

        {/* ═══════════ DIALOGS ═══════════ */}
        <Section id="dialogs" kicker="dialogs" title="M3 Dialog & Sheet">
          <p>Dialog with spring-enter scale animation and Bottom Sheet with expressive slide-up transition.</p>
          <div className="flex gap-3 flex-wrap">
            <button className="md-btn md-btn-tonal" onClick={() => setDialogOpen(true)}>
              <span className="material-symbols-outlined">dialog</span>Open Dialog
            </button>
            <button className="md-btn md-btn-tonal" onClick={() => setSheetOpen(true)}>
              <span className="material-symbols-outlined">bottom_sheet</span>Open Sheet
            </button>
          </div>

          {/* Dialog */}
          <div className={`md-dialog-overlay ${dialogOpen ? "open" : ""}`} onClick={() => setDialogOpen(false)}>
            <div className="md-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined md-dialog-icon" style={{ fontSize: 24 }}>vpn_key</span>
                <h3 className="md-dialog-title">Use Material Web?</h3>
              </div>
              <p className="md-dialog-body">
                This dialog uses the M3 spring-enter cubic-bezier for its entry animation,
                with a scale(0.9) → scale(1) overshoot transition. The overlay uses
                emphasized-decel easing for a smooth fade-in.
              </p>
              <div className="md-dialog-actions">
                <button className="md-btn md-btn-text" onClick={() => setDialogOpen(false)}>Cancel</button>
                <button className="md-btn md-btn-filled" onClick={() => { setDialogOpen(false); setSnackbarOpen(true); }}>Accept</button>
              </div>
            </div>
          </div>

          {/* Sheet */}
          <div className={`md-sheet-overlay ${sheetOpen ? "open" : ""}`} onClick={() => setSheetOpen(false)} />
          <div className={`md-sheet ${sheetOpen ? "open" : ""}`}>
            <div className="md-sheet-handle" />
            <h3 className="font-semibold text-lg mb-3" style={{ color: "var(--color-on-surface)" }}>Bottom Sheet</h3>
            <p className="text-sm mb-4" style={{ color: "var(--color-on-surface-variant)", lineHeight: 1.7 }}>
              Slides up with spring-enter cubic-bezier. Uses surface-container-high background.
              Drag handle for visual affordance.
            </p>
            <div className="md-list">
              {["Save", "Share", "Download", "Delete"].map((item) => (
                <div key={item} className="md-list-item" onClick={() => { setSheetOpen(false); setSnackbarOpen(true); }}>
                  <span className="material-symbols-outlined md-list-item-leading">{item.toLowerCase()}</span>
                  <span className="md-list-item-headline">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══════════ LISTS ═══════════ */}
        <Section id="lists" kicker="lists" title="M3 Lists">
          <p>List items with leading icons, two-line content, trailing actions, state layers, and dividers.</p>
          <ShowcaseBox label="demo">
            <div className="md-list">
              {[{ icon: "person", title: "SuXD", sub: "Developer & Security Researcher", trailing: "arrow_forward" },
               { icon: "terminal", title: "Root-My-Galaxy", sub: "KernelSU root automation via CVE-2026-43499", trailing: "open_in_new" },
               { icon: "science", title: "Lab Experiments", sub: "4 entries — mobile, kernel, security", trailing: "arrow_forward" },
               { icon: "palette", title: "Material Web Showcase", sub: "This page — every M3 component", trailing: "" }].map((item, i, arr) => (
                <div key={item.title}>
                  <div className="md-list-item">
                    <span className="material-symbols-outlined md-list-item-leading">{item.icon}</span>
                    <div className="md-list-item-content">
                      <div className="md-list-item-headline">{item.title}</div>
                      <div className="md-list-item-supporting">{item.sub}</div>
                    </div>
                    {item.trailing && <span className="material-symbols-outlined md-list-item-trailing" style={{ fontSize: 18 }}>{item.trailing}</span>}
                  </div>
                  {i < arr.length - 1 && <div className="md-divider md-divider-inset" />}
                </div>
              ))}
            </div>
          </ShowcaseBox>
        </Section>

        {/* ═══════════ ELEVATION ═══════════ */}
        <Section id="elevation" kicker="elevation" title="Dual-Shadow Elevation">
          <p>Material Web dual-shadow system: key shadow (30% opacity) + ambient shadow (15% opacity) with 280ms standard easing.</p>
          <div className="showcase-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))" }}>
            {[{ level: 0, label: "Level 0", desc: "No shadow" },
             { level: 1, label: "Level 1", desc: "Resting" },
             { level: 2, label: "Level 2", desc: "Hover" },
             { level: 3, label: "Level 3", desc: "Raised" },
             { level: 4, label: "Level 4", desc: "Dragged" },
             { level: 5, label: "Level 5", desc: "FAB" }].map((e) => (
              <div key={e.level} className={`md-elev-${e.level} rounded-2xl p-5 text-center transition-transform hover:-translate-y-1`} style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", cursor: "default" }}>
                <div className="font-mono text-xs" style={{ color: "var(--color-primary)" }}>{e.label}</div>
                <div className="font-mono text-[0.6rem] mt-1" style={{ color: "var(--color-text-muted)" }}>{e.desc}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ═══════════ RIPPLE ═══════════ */}
        <Section id="ripple" kicker="ripple" title="Radial-Gradient Ripple">
          <p>Material Web soft-edge ripple using <code className="font-mono text-xs px-1.5 py-0.5 rounded" style={{ background: "var(--color-primary-dim)", color: "var(--color-primary)" }}>radial-gradient(closest-side, ... max(calc(100% - 70px), 65%), transparent 100%)</code> with 105ms linear transition.</p>
          <ShowcaseBox label="demo">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[["smart_button", "Button"], ["dashboard", "Card"], ["filter_alt", "Chip"], ["edit_note", "Field"]].map(([icon, label]) => (
                <button key={label as string} className="ripple-soft rounded-2xl p-5 text-center transition-transform hover:-translate-y-1" style={{ background: "var(--color-card)", border: "1px solid var(--color-border)", cursor: "pointer" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 28, color: "var(--color-primary)" }}>{icon}</span>
                  <div className="font-mono text-xs mt-2" style={{ color: "var(--color-text-sec)" }}>{label}</div>
                </button>
              ))}
            </div>
            <p className="text-xs mt-3 font-mono" style={{ color: "var(--color-text-muted)" }}>Press and hold to see the soft-edge radial gradient ripple effect.</p>
          </ShowcaseBox>
        </Section>

        {/* ═══════════ FOCUS ═══════════ */}
        <Section id="focus" kicker="focus" title="Focus Ring Pulse">
          <p>2-phase focus ring: outward grow (25% duration) then shrink to resting (75% duration) with 500ms total.</p>
          <ShowcaseBox label="demo">
            <div className="flex flex-wrap gap-3">
              <button className="md-btn md-btn-filled">Focus me (Tab)</button>
              <button className="md-btn md-btn-outlined">Or me</button>
              <button className="md-btn md-btn-tonal">Also me</button>
              <input type="text" className="rounded-full px-4 py-2 text-sm" style={{ background: "var(--color-card)", border: "1px solid var(--color-outline)", color: "var(--color-on-surface)", outline: "none" }} placeholder="Text field focus" />
            </div>
            <p className="text-xs mt-3 font-mono" style={{ color: "var(--color-text-muted)" }}>Use Tab key to navigate and see the 2-phase focus ring animation.</p>
          </ShowcaseBox>
        </Section>

        {/* ═══════════ MENU ═══════════ */}
        <Section id="menu" kicker="menu" title="M3 Dropdown Menu">
          <p>Dropdown menu with spring-enter scale animation, state layer items, and leading icons.</p>
          <div className="relative inline-block" ref={menuRef}>
            <button className="md-btn md-btn-filled" onClick={() => setMenuOpen(!menuOpen)}>
              <span className="material-symbols-outlined">menu_open</span>Open Menu
            </button>
            <div className={`md-menu ${menuOpen ? "open" : ""}`}>
              {[{ icon: "cut", label: "Cut", shortcut: "Ctrl+X" },
               { icon: "content_copy", label: "Copy", shortcut: "Ctrl+C" },
               { icon: "content_paste", label: "Paste", shortcut: "Ctrl+V" }].map((item) => (
                <button key={item.label} className="md-menu-item" onClick={() => setMenuOpen(false)}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                  <span className="flex-1 text-left">{item.label}</span>
                  <span className="font-mono text-xs" style={{ color: "var(--color-on-surface-variant)" }}>{item.shortcut}</span>
                </button>
              ))}
              <div className="md-divider" style={{ margin: "0.25rem 0.5rem" }} />
              <button className="md-menu-item" onClick={() => setMenuOpen(false)}>
                <span className="material-symbols-outlined">delete</span>
                <span>Delete</span>
              </button>
            </div>
          </div>
        </Section>

        {/* ═══════════ SNACKBAR ═══════════ */}
        <Section id="snackbar" kicker="snackbar" title="M3 Snackbar">
          <p>Snackbar with spring-enter slide-up animation, inverse-surface colors, and action button.</p>
          <button className="md-btn md-btn-tonal" onClick={() => setSnackbarOpen(true)}>
            <span className="material-symbols-outlined">chat_bubble</span>Show Snackbar
          </button>
          <div className={`md-snackbar ${snackbarOpen ? "show" : ""}`}>
            <span className="md-snackbar-text">Action completed successfully.</span>
            <button className="md-snackbar-action" onClick={() => setSnackbarOpen(false)}>UNDO</button>
          </div>
        </Section>

        {/* ═══════════ MOTION TOKENS ═══════════ */}
        <Section kicker="motion" title="Expressive Spring Easings">
          <p>All 6 Material Expressive 3 spring cubic-bezier curves applied as CSS transitions. Each box demonstrates a different spring.</p>
          <ShowcaseBox label="demo">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[{ name: "Interactive", css: "var(--spring-interactive)", color: "var(--color-primary)" },
               { name: "Enter", css: "var(--spring-enter)", color: "var(--color-cyan)" },
               { name: "Exit", css: "var(--spring-exit)", color: "var(--color-violet)" },
               { name: "Soft", css: "var(--spring-soft)", color: "var(--color-green)" },
               { name: "Bounce", css: "var(--spring-bounce)", color: "var(--color-amber)" },
               { name: "Overshoot", css: "var(--switch-overshoot)", color: "var(--color-red)" }].map((s) => (
                <SpringDemo key={s.name} name={s.name} css={s.css} color={s.color} />
              ))}
            </div>
          </ShowcaseBox>
        </Section>

        {/* ═══ FOOTER ═══ */}
        <footer className="px-6 py-12 text-center relative z-[2]">
          <div className="h-px max-w-[80px] mx-auto mb-8" style={{ background: "var(--color-border)" }} />
          <p className="font-mono text-xs" style={{ color: "var(--color-text-muted)" }}>
            material-web showcase<span className="mx-1.5" style={{ color: "var(--color-primary)" }}>{"//"}</span>
            built with next.js + tailwind + zero component libraries
          </p>
          <p className="font-mono text-[0.6rem] mt-2" style={{ color: "var(--color-text-muted)" }}>
            every shadow, ripple, spring, and state layer is raw css
          </p>
        </footer>
      </main>
    </>
  );
}