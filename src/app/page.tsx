'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ThemePicker } from '@/components/ThemePicker';
import { useMaterialReady } from '@/components/MaterialProvider';

const SECTIONS = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'icon-buttons', label: 'Icon Buttons' },
  { id: 'fabs', label: 'FABs' },
  { id: 'cards', label: 'Cards' },
  { id: 'chips', label: 'Chips' },
  { id: 'text-fields', label: 'Text Fields' },
  { id: 'selects', label: 'Selects' },
  { id: 'switch-checkbox', label: 'Switch & Checkbox' },
  { id: 'radio', label: 'Radio' },
  { id: 'slider', label: 'Slider' },
  { id: 'progress', label: 'Progress' },
  { id: 'tabs', label: 'Tabs' },
  { id: 'dialog', label: 'Dialog' },
  { id: 'lists', label: 'Lists' },
  { id: 'menus', label: 'Menus' },
  { id: 'elevation', label: 'Elevation' },
  { id: 'ripple-divider', label: 'Ripple & Divider' },
  { id: 'segmented', label: 'Segmented Buttons' },
  { id: 'nav-bar', label: 'Navigation Bar' },
  { id: 'badge', label: 'Badge' },
  { id: 'drawer', label: 'Navigation Drawer' },
  { id: 'fields', label: 'Fields' },
  { id: 'focus-ring', label: 'Focus Ring' },
  { id: 'item-nav-tab', label: 'Item & Nav Tab' },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return progress;
}

function useIntersectionObserver() {
  const [activeSection, setActiveSection] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return activeSection;
}

export default function Page() {
  const scrollProgress = useScrollProgress();
  const activeSection = useIntersectionObserver();
  const ready = useMaterialReady();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnchorRef = useRef<HTMLButtonElement>(null);
  const [navIndex, setNavIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(65);
  const [sliderValue, setSliderValue] = useState(50);
  const [circularIndeterminate, setCircularIndeterminate] = useState(true);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Progress animation
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      setProgressValue((v) => (v >= 100 ? 0 : v + 1));
    }, 100);
    return () => clearInterval(interval);
  }, [ready]);

  if (!ready) return null;

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Theme Picker */}
      <ThemePicker />

      {/* Chip Navigation */}
      <nav className="chip-nav-wrapper" aria-label="Section navigation">
        <div className="chip-nav">
          {SECTIONS.map(({ id, label }) => (
            <md-filter-chip
              key={id}
              selected={activeSection === id}
              onClick={() => scrollTo(id)}
            >
              {label}
            </md-filter-chip>
          ))}
        </div>
      </nav>

      <div className="page-wrapper">
        <main>
          {/* Hero */}
          <section className="hero">
            <div className="hero-badge">
              <md-icon slot="icon">auto_awesome</md-icon>
              Material Web Components
            </div>
            <h1 className="hero-title">Material 3 Expressive</h1>
            <p className="hero-subtitle">
              A comprehensive showcase of all 48 Material Web Components — real Web Components
              with dynamic M3 theming, dark mode, and expressive design.
            </p>
            <div className="hero-actions">
              <md-filled-button onClick={() => scrollTo('buttons')}>
                <md-icon slot="icon">explore</md-icon>
                Explore Components
              </md-filled-button>
              <md-outlined-button
                href="https://github.com/material-components/material-web"
                target="_blank"
              >
                <md-icon slot="icon">code</md-icon>
                GitHub
              </md-outlined-button>
            </div>
          </section>

          {/* ===== BUTTONS ===== */}
          <section id="buttons" className="section">
            <div className="section-header">
              <p className="section-label">5 Components</p>
              <h2 className="section-title">Buttons</h2>
              <p className="section-description">
                Five button variants — elevated, filled, filled-tonal, outlined, and text. Each conveys
                a different level of emphasis in the UI hierarchy.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Filled Button</div>
                <div className="showcase-card-desc">Primary action. Highest emphasis.</div>
                <div className="showcase-card-content">
                  <md-filled-button>
                    <md-icon slot="icon">add</md-icon>
                    Filled
                  </md-filled-button>
                  <md-filled-button disabled>Disabled</md-filled-button>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Filled Tonal Button</div>
                <div className="showcase-card-desc">Secondary emphasis with tonal fill.</div>
                <div className="showcase-card-content">
                  <md-filled-tonal-button>
                    <md-icon slot="icon">edit</md-icon>
                    Tonal
                  </md-filled-tonal-button>
                  <md-filled-tonal-button disabled>Disabled</md-filled-tonal-button>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Elevated Button</div>
                <div className="showcase-card-desc">Medium emphasis with elevation shadow.</div>
                <div className="showcase-card-content">
                  <md-elevated-button>
                    <md-icon slot="icon">share</md-icon>
                    Elevated
                  </md-elevated-button>
                  <md-elevated-button disabled>Disabled</md-elevated-button>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Outlined Button</div>
                <div className="showcase-card-desc">Medium emphasis with a border outline.</div>
                <div className="showcase-card-content">
                  <md-outlined-button>
                    <md-icon slot="icon">download</md-icon>
                    Outlined
                  </md-outlined-button>
                  <md-outlined-button disabled>Disabled</md-outlined-button>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Text Button</div>
                <div className="showcase-card-desc">Lowest emphasis, text-only style.</div>
                <div className="showcase-card-content">
                  <md-text-button>
                    <md-icon slot="icon">info</md-icon>
                    Text
                  </md-text-button>
                  <md-text-button disabled>Disabled</md-text-button>
                </div>
              </div>
            </div>
          </section>

          {/* ===== ICON BUTTONS ===== */}
          <section id="icon-buttons" className="section">
            <div className="section-header">
              <p className="section-label">5 Components</p>
              <h2 className="section-title">Icon Buttons</h2>
              <p className="section-description">
                Icon buttons for actions like favoriting, sharing, and toggling. Available in
                standard, filled, tonal, and outlined variants.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Standard Icon Button</div>
                <div className="showcase-card-desc">Default style with no background.</div>
                <div className="showcase-card-content">
                  <md-icon-button><md-icon>favorite</md-icon></md-icon-button>
                  <md-icon-button><md-icon>bookmark</md-icon></md-icon-button>
                  <md-icon-button disabled><md-icon>share</md-icon></md-icon-button>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Filled Icon Button</div>
                <div className="showcase-card-desc">Primary container color fill.</div>
                <div className="showcase-card-content">
                  <md-filled-icon-button><md-icon>edit</md-icon></md-filled-icon-button>
                  <md-filled-icon-button><md-icon>delete</md-icon></md-filled-icon-button>
                  <md-filled-icon-button disabled><md-icon>add</md-icon></md-filled-icon-button>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Filled Tonal Icon Button</div>
                <div className="showcase-card-desc">Secondary tonal fill variant.</div>
                <div className="showcase-card-content">
                  <md-filled-tonal-icon-button><md-icon>search</md-icon></md-filled-tonal-icon-button>
                  <md-filled-tonal-icon-button><md-icon>more_vert</md-icon></md-filled-tonal-icon-button>
                  <md-filled-tonal-icon-button disabled><md-icon>home</md-icon></md-filled-tonal-icon-button>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Outlined Icon Button</div>
                <div className="showcase-card-desc">Border-only style icon button.</div>
                <div className="showcase-card-content">
                  <md-outlined-icon-button><md-icon>settings</md-icon></md-outlined-icon-button>
                  <md-outlined-icon-button><md-icon>notifications</md-icon></md-outlined-icon-button>
                  <md-outlined-icon-button disabled><md-icon>person</md-icon></md-outlined-icon-button>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Icon Button Toggle</div>
                <div className="showcase-card-desc">Toggleable state — click to select.</div>
                <div className="showcase-card-content">
                  <md-icon-button-toggle>
                    <md-icon slot="on">visibility</md-icon>
                    <md-icon slot="off">visibility_off</md-icon>
                  </md-icon-button-toggle>
                  <md-icon-button-toggle>
                    <md-icon slot="on">thumb_up</md-icon>
                    <md-icon slot="off">thumb_up</md-icon>
                  </md-icon-button-toggle>
                </div>
              </div>
            </div>
          </section>

          {/* ===== FABs ===== */}
          <section id="fabs" className="section">
            <div className="section-header">
              <p className="section-label">2 Components</p>
              <h2 className="section-title">Floating Action Buttons</h2>
              <p className="section-description">
                FABs represent the primary action on a screen. Standard and branded variants.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Standard FAB</div>
                <div className="showcase-card-desc">Circular FAB with icon and optional label.</div>
                <div className="showcase-card-content" style={{ gap: 24, alignItems: 'flex-start' }}>
                  <md-fab icon="add" label="Create"></md-fab>
                  <md-fab icon="edit" variant="secondary"></md-fab>
                  <md-fab icon="palette" variant="tertiary"></md-fab>
                  <md-fab icon="layers" variant="surface"></md-fab>
                  <md-fab icon="add" lowered></md-fab>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Branded FAB</div>
                <div className="showcase-card-desc">FAB with a branded leading icon slot.</div>
                <div className="showcase-card-content" style={{ gap: 24, alignItems: 'flex-start' }}>
                  <md-branded-fab label="Compose" icon="edit">
                    <svg slot="icon" viewBox="0 0 95 40" width="95" height="40">
                      <path fill="#1a73e8" d="M0 0h95v40H0z" />
                      <path fill="#ffffff" d="M25.6 12.8c0-1.4 1.2-2.6 2.6-2.6h8.6v17.6h-8.6c-1.4 0-2.6-1.2-2.6-2.6V12.8z"/>
                      <path fill="#34a853" d="M28.2 10.2h8.6v17.6h-8.6" />
                      <path fill="#fbbc04" d="M58.4 12.8c0-1.4-1.2-2.6-2.6-2.6h-8.6v17.6h8.6c1.4 0 2.6-1.2 2.6-2.6V12.8z"/>
                      <path fill="#ea4335" d="M47.2 10.2h8.6v17.6h-8.6" />
                    </svg>
                  </md-branded-fab>
                  <md-branded-fab icon="edit" size="small"></md-branded-fab>
                  <md-branded-fab icon="edit" size="large"></md-branded-fab>
                </div>
              </div>
            </div>
          </section>

          {/* ===== CARDS ===== */}
          <section id="cards" className="section">
            <div className="section-header">
              <p className="section-label">3 Labs Components</p>
              <h2 className="section-title">Cards</h2>
              <p className="section-description">
                Cards contain content and actions about a single subject. Available in
                elevated, filled, and outlined variants.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card" style={{ padding: 0, overflow: 'hidden' }}>
                <md-elevated-card style={{ padding: '24px', width: '100%', borderRadius: 'var(--md-sys-shape-corner-extra-large)' }}>
                  <h3 style={{ color: 'var(--md-sys-color-on-surface)', marginBottom: 8, fontSize: 18, fontWeight: 600 }}>Elevated Card</h3>
                  <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                    Elevated cards have a shadow to distinguish them from the background. They are best used on surfaces of similar color.
                  </p>
                  <md-filled-button>Action</md-filled-button>
                </md-elevated-card>
              </div>
              <div className="showcase-card" style={{ padding: 0, overflow: 'hidden' }}>
                <md-filled-card style={{ padding: '24px', width: '100%', borderRadius: 'var(--md-sys-shape-corner-extra-large)' }}>
                  <h3 style={{ color: 'var(--md-sys-color-on-surface)', marginBottom: 8, fontSize: 18, fontWeight: 600 }}>Filled Card</h3>
                  <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                    Filled cards use a surface container color to stand out. They work well on varied backgrounds.
                  </p>
                  <md-filled-tonal-button>Action</md-filled-tonal-button>
                </md-filled-card>
              </div>
              <div className="showcase-card" style={{ padding: 0, overflow: 'hidden' }}>
                <md-outlined-card style={{ padding: '24px', width: '100%', borderRadius: 'var(--md-sys-shape-corner-extra-large)' }}>
                  <h3 style={{ color: 'var(--md-sys-color-on-surface)', marginBottom: 8, fontSize: 18, fontWeight: 600 }}>Outlined Card</h3>
                  <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>
                    Outlined cards use a border for definition. They provide a lighter visual treatment.
                  </p>
                  <md-outlined-button>Action</md-outlined-button>
                </md-outlined-card>
              </div>
            </div>
          </section>

          {/* ===== CHIPS ===== */}
          <section id="chips" className="section">
            <div className="section-header">
              <p className="section-label">5 Components</p>
              <h2 className="section-title">Chips</h2>
              <p className="section-description">
                Compact elements that represent an attribute, action, or entity. Five chip types for
                different interaction patterns.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Filter Chips</div>
                <div className="showcase-card-desc">Toggle selection — tap to select/deselect.</div>
                <div className="showcase-card-content">
                  <md-chip-set>
                    <md-filter-chip label="React" selected></md-filter-chip>
                    <md-filter-chip label="Angular"></md-filter-chip>
                    <md-filter-chip label="Vue" selected></md-filter-chip>
                    <md-filter-chip label="Svelte"></md-filter-chip>
                  </md-chip-set>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Assist Chips</div>
                <div className="showcase-card-desc">Trigger an action when tapped.</div>
                <div className="showcase-card-content">
                  <md-assist-chip>
                    <md-icon slot="icon">directions</md-icon>
                    Get Directions
                  </md-assist-chip>
                  <md-assist-chip>
                    <md-icon slot="icon">language</md-icon>
                    Translate
                  </md-assist-chip>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Input Chips</div>
                <div className="showcase-card-desc">Represent entered information, with a remove button.</div>
                <div className="showcase-card-content">
                  <md-chip-set>
                    <md-input-chip label="Alice" selected></md-input-chip>
                    <md-input-chip label="Bob"></md-input-chip>
                    <md-input-chip label="Charlie" selected></md-input-chip>
                  </md-chip-set>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Suggestion Chips</div>
                <div className="showcase-card-desc">Suggest an action or choice to the user.</div>
                <div className="showcase-card-content">
                  <md-suggestion-chip>
                    <md-icon slot="icon">restaurant</md-icon>
                    Order Food
                  </md-suggestion-chip>
                  <md-suggestion-chip>
                    <md-icon slot="icon">movie</md-icon>
                    Watch Movie
                  </md-suggestion-chip>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Chip Set Container</div>
                <div className="showcase-card-desc">Groups chips with single/multi-select behavior.</div>
                <div className="showcase-card-content">
                  <md-chip-set>
                    <md-filter-chip label="Option A" selected></md-filter-chip>
                    <md-filter-chip label="Option B"></md-filter-chip>
                    <md-filter-chip label="Option C"></md-filter-chip>
                  </md-chip-set>
                </div>
              </div>
            </div>
          </section>

          {/* ===== TEXT FIELDS ===== */}
          <section id="text-fields" className="section">
            <div className="section-header">
              <p className="section-label">2 Components</p>
              <h2 className="section-title">Text Fields</h2>
              <p className="section-description">
                User input fields for text entry. Filled and outlined variants with labels,
                helper text, icons, and validation.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card showcase-card-wide">
                <div className="showcase-card-title">Filled Text Fields</div>
                <div className="showcase-card-desc">Filled background with a bottom border.</div>
                <div className="component-stack">
                  <div className="component-row">
                    <md-filled-text-field label="Email" type="email" value="user@example.com" required></md-filled-text-field>
                    <md-filled-text-field label="Password" type="password" value="secretpass" required></md-filled-text-field>
                  </div>
                  <div className="component-row">
                    <md-filled-text-field label="With icon" value="Hello">
                      <md-icon slot="leading-icon">search</md-icon>
                      <md-icon slot="trailing-icon">clear</md-icon>
                    </md-filled-text-field>
                    <md-filled-text-field label="With helper text" helperText="This is helper text below the field"></md-filled-text-field>
                    <md-filled-text-field label="Error state" error errorText="This field is required" value=""></md-filled-text-field>
                  </div>
                  <div className="component-row">
                    <md-filled-text-field label="Disabled" value="Cannot edit" disabled></md-filled-text-field>
                    <md-filled-text-field label="Textarea" rows={3} value="Multi-line text\ncontent goes here."></md-filled-text-field>
                    <md-filled-text-field label="With prefix/suffix" prefixText="$" suffixText=".00"></md-filled-text-field>
                  </div>
                </div>
              </div>
              <div className="showcase-card showcase-card-wide">
                <div className="showcase-card-title">Outlined Text Fields</div>
                <div className="showcase-card-desc">Outlined border around the field.</div>
                <div className="component-stack">
                  <div className="component-row">
                    <md-outlined-text-field label="First Name" value="John"></md-outlined-text-field>
                    <md-outlined-text-field label="Last Name" value="Doe"></md-outlined-text-field>
                  </div>
                  <div className="component-row">
                    <md-outlined-text-field label="With icon" value="Material Web">
                      <md-icon slot="leading-icon">link</md-icon>
                    </md-outlined-text-field>
                    <md-outlined-text-field label="With character count" maxLength={20} value="Count me" charCounter></md-outlined-text-field>
                    <md-outlined-text-field label="Error" error errorText="Invalid input" value="bad"></md-outlined-text-field>
                  </div>
                  <div className="component-row">
                    <md-outlined-text-field label="Disabled" value="Read only" disabled></md-outlined-text-field>
                    <md-outlined-text-field label="Textarea" rows={3} value="Another multi-line\ntext area example."></md-outlined-text-field>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== SELECTS ===== */}
          <section id="selects" className="section">
            <div className="section-header">
              <p className="section-label">3 Components</p>
              <h2 className="section-title">Selects</h2>
              <p className="section-description">
                Dropdown selection fields. Filled and outlined variants with menu options.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Filled Select</div>
                <div className="showcase-card-desc">Dropdown with a filled background.</div>
                <div className="showcase-card-content">
                  <md-filled-select label="Fruit" value="apple" menuPositioning="fixed">
                    <md-select-option value="apple" headline="Apple"></md-select-option>
                    <md-select-option value="banana" headline="Banana"></md-select-option>
                    <md-select-option value="cherry" headline="Cherry"></md-select-option>
                    <md-select-option value="grape" headline="Grape"></md-select-option>
                  </md-filled-select>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Outlined Select</div>
                <div className="showcase-card-desc">Dropdown with an outlined border.</div>
                <div className="showcase-card-content">
                  <md-outlined-select label="Country" value="us" menuPositioning="fixed">
                    <md-select-option value="us" headline="United States"></md-select-option>
                    <md-select-option value="uk" headline="United Kingdom"></md-select-option>
                    <md-select-option value="de" headline="Germany"></md-select-option>
                    <md-select-option value="jp" headline="Japan"></md-select-option>
                  </md-outlined-select>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Select with Disabled Options</div>
                <div className="showcase-card-desc">Some options can be disabled.</div>
                <div className="showcase-card-content">
                  <md-filled-select label="Priority" value="medium" menuPositioning="fixed">
                    <md-select-option value="low" headline="Low"></md-select-option>
                    <md-select-option value="medium" headline="Medium"></md-select-option>
                    <md-select-option value="high" headline="High"></md-select-option>
                    <md-select-option value="critical" headline="Critical (Unavailable)" disabled></md-select-option>
                  </md-filled-select>
                </div>
              </div>
            </div>
          </section>

          {/* ===== SWITCH & CHECKBOX ===== */}
          <section id="switch-checkbox" className="section">
            <div className="section-header">
              <p className="section-label">2 Components</p>
              <h2 className="section-title">Switch & Checkbox</h2>
              <p className="section-description">
                Toggle controls for binary on/off states. Switches for immediate actions,
                checkboxes for selection.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Switch</div>
                <div className="showcase-card-desc">Toggle switch for on/off settings.</div>
                <div className="component-stack" style={{ gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-switch checked></md-switch>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Notifications (On)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-switch></md-switch>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Dark Mode (Off)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-switch disabled></md-switch>
                    <span style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14 }}>Disabled (Off)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-switch disabled checked></md-switch>
                    <span style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14 }}>Disabled (On)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-switch checked icons></md-switch>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>With Icons</span>
                  </div>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Checkbox</div>
                <div className="showcase-card-desc">Checkboxes for multi-selection.</div>
                <div className="component-stack" style={{ gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-checkbox checked></md-checkbox>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Accept terms</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-checkbox></md-checkbox>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Remember me</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-checkbox disabled checked></md-checkbox>
                    <span style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14 }}>Required (disabled)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-checkbox error></md-checkbox>
                    <span style={{ color: 'var(--md-sys-color-error)', fontSize: 14 }}>Error state</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-checkbox indeterminate></md-checkbox>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Indeterminate</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== RADIO ===== */}
          <section id="radio" className="section">
            <div className="section-header">
              <p className="section-label">2 Components</p>
              <h2 className="section-title">Radio Group</h2>
              <p className="section-description">
                Single-selection controls grouped together. Only one radio can be selected at a time.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Radio Group</div>
                <div className="showcase-card-desc">Mutually exclusive options in a group.</div>
                <md-radio-group value="option2" name="demo-radio">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                    <md-radio value="option1" name="demo-radio"></md-radio>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Option 1</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                    <md-radio value="option2" name="demo-radio" checked></md-radio>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Option 2</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                    <md-radio value="option3" name="demo-radio"></md-radio>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Option 3</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <md-radio value="option4" name="demo-radio" disabled></md-radio>
                    <span style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 14 }}>Disabled</span>
                  </div>
                </md-radio-group>
              </div>
            </div>
          </section>

          {/* ===== SLIDER ===== */}
          <section id="slider" className="section">
            <div className="section-header">
              <p className="section-label">1 Component</p>
              <h2 className="section-title">Slider</h2>
              <p className="section-description">
                Range slider for selecting a value within a range. Supports labels, ticks, and marks.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card showcase-card-wide">
                <div className="showcase-card-title">Slider Variants</div>
                <div className="showcase-card-desc">Interactive range input. Current value: {sliderValue}</div>
                <div className="component-stack" style={{ gap: 32, width: '100%' }}>
                  <md-slider
                    value={sliderValue}
                    min={0}
                    max={100}
                    labels
                    onInput={(e) => setSliderValue(Number((e.target as HTMLElement).getAttribute('value')))}
                  ></md-slider>
                  <md-slider value={30} min={0} max={100} ticks marked></md-slider>
                  <md-slider value={75} min={0} max={100} disabled></md-slider>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14, minWidth: 40 }}>0°C</span>
                    <md-slider value={22} min={0} max={50} labels></md-slider>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14, minWidth: 40 }}>50°C</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== PROGRESS ===== */}
          <section id="progress" className="section">
            <div className="section-header">
              <p className="section-label">2 Components</p>
              <h2 className="section-title">Progress Indicators</h2>
              <p className="section-description">
                Circular and linear progress indicators for loading states and completion tracking.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Circular Progress</div>
                <div className="showcase-card-desc">Spinners and determinate circular indicators.</div>
                <div className="showcase-card-content" style={{ gap: 24, padding: '16px 0' }}>
                  <md-circular-progress indeterminate></md-circular-progress>
                  <md-circular-progress value={progressValue} max={100}></md-circular-progress>
                  <md-circular-progress fourColor indeterminate></md-circular-progress>
                </div>
                <div style={{ marginTop: 16 }}>
                  <md-switch
                    checked={circularIndeterminate}
                    onInput={() => setCircularIndeterminate(!circularIndeterminate)}
                  >
                  </md-switch>
                  <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 13, marginLeft: 8 }}>Indeterminate</span>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Linear Progress</div>
                <div className="showcase-card-desc">Linear bars for determinate and indeterminate progress.</div>
                <div className="component-stack" style={{ gap: 24, width: '100%' }}>
                  <md-linear-progress indeterminate></md-linear-progress>
                  <md-linear-progress value={progressValue} max={100}></md-linear-progress>
                  <md-linear-progress value={40} max={100} buffer={70}></md-linear-progress>
                </div>
              </div>
            </div>
          </section>

          {/* ===== TABS ===== */}
          <section id="tabs" className="section">
            <div className="section-header">
              <p className="section-label">3 Components</p>
              <h2 className="section-title">Tabs</h2>
              <p className="section-description">
                Tab navigation with primary and secondary tab styles. Scrollable for many tabs.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card showcase-card-wide">
                <div className="showcase-card-title">Primary Tabs</div>
                <div className="showcase-card-desc">Top-level navigation tabs with underline indicator.</div>
                <md-tabs>
                  <md-primary-tab active>Home</md-primary-tab>
                  <md-primary-tab>Explore</md-primary-tab>
                  <md-primary-tab>Library</md-primary-tab>
                  <md-primary-tab>Profile</md-primary-tab>
                </md-tabs>
              </div>
              <div className="showcase-card showcase-card-wide">
                <div className="showcase-card-title">Secondary Tabs</div>
                <div className="showcase-card-desc">Sub-navigation with a secondary indicator style.</div>
                <md-tabs>
                  <md-secondary-tab active>Latest</md-secondary-tab>
                  <md-secondary-tab>Popular</md-secondary-tab>
                  <md-secondary-tab>Trending</md-secondary-tab>
                </md-tabs>
              </div>
              <div className="showcase-card showcase-card-wide">
                <div className="showcase-card-title">Scrollable Tabs with Icons</div>
                <div className="showcase-card-desc">Tabs with inline icons, scrollable when many items.</div>
                <md-tabs scrollable>
                  <md-primary-tab active>
                    <md-icon slot="inline-icon">home</md-icon>
                    Home
                  </md-primary-tab>
                  <md-primary-tab>
                    <md-icon slot="inline-icon">search</md-icon>
                    Search
                  </md-primary-tab>
                  <md-primary-tab>
                    <md-icon slot="inline-icon">person</md-icon>
                    Profile
                  </md-primary-tab>
                  <md-primary-tab>
                    <md-icon slot="inline-icon">settings</md-icon>
                    Settings
                  </md-primary-tab>
                  <md-primary-tab>
                    <md-icon slot="inline-icon">notifications</md-icon>
                    Alerts
                  </md-primary-tab>
                </md-tabs>
              </div>
            </div>
          </section>

          {/* ===== DIALOG ===== */}
          <section id="dialog" className="section">
            <div className="section-header">
              <p className="section-label">1 Component</p>
              <h2 className="section-title">Dialog</h2>
              <p className="section-description">
                Modal dialog windows for alerts, confirmations, and form content overlays.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card showcase-card-wide">
                <div className="showcase-card-title">Dialog</div>
                <div className="showcase-card-desc">Click the button to open a modal dialog.</div>
                <div className="component-row">
                  <md-filled-button onClick={() => setDialogOpen(true)}>
                    <md-icon slot="icon">open_in_new</md-icon>
                    Open Dialog
                  </md-filled-button>
                </div>
                <md-dialog
                  open={dialogOpen}
                  closed={() => setDialogOpen(false)}
                >
                  <div slot="headline">Material Web Dialog</div>
                  <div slot="content">
                    <p style={{ color: 'var(--md-sys-color-on-surface)', lineHeight: 1.6 }}>
                      This is a real <code>md-dialog</code> web component.
                      It uses Shadow DOM for style encapsulation and follows
                      Material Design 3 guidelines for layout and spacing.
                    </p>
                    <md-filled-text-field
                      label="Your Name"
                      style={{ marginTop: 16, width: '100%' }}
                    ></md-filled-text-field>
                  </div>
                  <div slot="actions">
                    <md-text-button onClick={() => setDialogOpen(false)}>Cancel</md-text-button>
                    <md-filled-button onClick={() => setDialogOpen(false)}>Confirm</md-filled-button>
                  </div>
                </md-dialog>
              </div>
            </div>
          </section>

          {/* ===== LISTS ===== */}
          <section id="lists" className="section">
            <div className="section-header">
              <p className="section-label">3 Components</p>
              <h2 className="section-title">Lists</h2>
              <p className="section-description">
                Lists present multiple line items as a continuous vertical group. Support for
                leading icons, headlines, and supporting text.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">List with Icons</div>
                <div className="showcase-card-desc">List items with leading icons and text.</div>
                <md-list>
                  <md-list-item>
                    <md-icon slot="start">inbox</md-icon>
                    <div slot="headline">Inbox</div>
                    <div slot="supporting-text">New messages</div>
                  </md-list-item>
                  <md-list-item>
                    <md-icon slot="start">send</md-icon>
                    <div slot="headline">Sent Mail</div>
                    <div slot="supporting-text">Outgoing messages</div>
                  </md-list-item>
                  <md-list-item>
                    <md-icon slot="start">drafts</md-icon>
                    <div slot="headline">Drafts</div>
                    <div slot="supporting-text">Unsent messages</div>
                  </md-list-item>
                  <md-list-item>
                    <md-icon slot="start">star</md-icon>
                    <div slot="headline">Starred</div>
                    <div slot="supporting-text">Important messages</div>
                  </md-list-item>
                </md-list>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Interactive List</div>
                <div className="showcase-card-desc">Clickable list items with types.</div>
                <md-list>
                  <md-list-item type="link" href="https://material-web.dev" target="_blank">
                    <md-icon slot="start">open_in_new</md-icon>
                    <div slot="headline">Material Web Docs</div>
                    <div slot="supporting-text">Opens in new tab</div>
                  </md-list-item>
                  <md-list-item type="button">
                    <md-icon slot="start">touch_app</md-icon>
                    <div slot="headline">Button Item</div>
                    <div slot="supporting-text">Clickable action</div>
                  </md-list-item>
                  <md-list-item disabled>
                    <md-icon slot="start">block</md-icon>
                    <div slot="headline">Disabled Item</div>
                    <div slot="supporting-text">Cannot interact</div>
                  </md-list-item>
                </md-list>
              </div>
            </div>
          </section>

          {/* ===== MENUS ===== */}
          <section id="menus" className="section">
            <div className="section-header">
              <p className="section-label">3 Components</p>
              <h2 className="section-title">Menus</h2>
              <p className="section-description">
                Dropdown menus for actions and options. Supports sub-menus, dividers, and various item types.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Menu</div>
                <div className="showcase-card-desc">Dropdown menu with items and actions.</div>
                <div className="relative-anchor">
                  <md-filled-button ref={menuAnchorRef} id="menu-anchor" onClick={() => setMenuOpen(!menuOpen)}>
                    <md-icon slot="icon">menu</md-icon>
                    Open Menu
                  </md-filled-button>
                  <md-menu
                    id="demo-menu"
                    anchor="menu-anchor"
                    positioning="fixed"
                    open={menuOpen}
                    closed={() => setMenuOpen(false)}
                  >
                    <md-menu-item headline="Cut" />
                    <md-menu-item headline="Copy" />
                    <md-menu-item headline="Paste" />
                    <md-menu-item headline="Delete" />
                    <md-divider></md-divider>
                    <md-menu-item headline="Settings" />
                    <md-menu-item headline="About" />
                  </md-menu>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Sub-Menu</div>
                <div className="showcase-card-desc">Nested menu with sub-options.</div>
                <div className="relative-anchor">
                  <md-outlined-button id="submenu-anchor" onClick={() => {
                    const m = document.getElementById('demo-submenu') as any;
                    if (m) m.open = !m.open;
                  }}>
                    <md-icon slot="icon">folder</md-icon>
                    Sub-Menu
                  </md-outlined-button>
                  <md-menu
                    id="demo-submenu"
                    anchor="submenu-anchor"
                    positioning="fixed"
                  >
                    <md-sub-menu headline="New">
                      <md-menu-item headline="File" />
                      <md-menu-item headline="Folder" />
                      <md-menu-item headline="Project" />
                    </md-sub-menu>
                    <md-sub-menu headline="Export As">
                      <md-menu-item headline="PDF" />
                      <md-menu-item headline="PNG" />
                      <md-menu-item headline="SVG" />
                    </md-sub-menu>
                  </md-menu>
                </div>
              </div>
            </div>
          </section>

          {/* ===== ELEVATION ===== */}
          <section id="elevation" className="section">
            <div className="section-header">
              <p className="section-label">1 Component</p>
              <h2 className="section-title">Elevation</h2>
              <p className="section-description">
                Shadow surface for conveying depth and hierarchy. Six elevation levels from none to highest.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card showcase-card-wide">
                <div className="showcase-card-title">Elevation Levels</div>
                <div className="showcase-card-desc">Six levels of shadow depth (0–5).</div>
                <div className="component-row" style={{ flexWrap: 'wrap' }}>
                  {[0, 1, 2, 3, 4, 5].map((level) => (
                    <div key={level} style={{ textAlign: 'center' }}>
                      <md-elevation level={level}></md-elevation>
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: 'var(--md-sys-shape-corner-large)',
                          background: 'var(--md-sys-color-surface-container-high)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative',
                        }}
                      >
                        <span style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: 13, fontWeight: 500 }}>
                          L{level}
                        </span>
                        <md-elevation level={level}></md-elevation>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ===== RIPPLE & DIVIDER ===== */}
          <section id="ripple-divider" className="section">
            <div className="section-header">
              <p className="section-label">2 Components</p>
              <h2 className="section-title">Ripple & Divider</h2>
              <p className="section-description">
                Standalone ripple effect for custom surfaces and dividers for content separation.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Ripple</div>
                <div className="showcase-card-desc">Tap the area to see the ink ripple effect.</div>
                <div className="showcase-card-content">
                  <div className="ripple-demo-area">
                    <md-ripple></md-ripple>
                    <span>Tap me</span>
                  </div>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Divider</div>
                <div className="showcase-card-desc">Horizontal or vertical content separator.</div>
                <div className="component-stack" style={{ gap: 24, width: '100%' }}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Item A</span>
                    <md-divider style={{ flex: 1 }}></md-divider>
                    <span style={{ color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>Item B</span>
                  </div>
                  <md-divider inset="start"></md-divider>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                    <md-icon style={{ color: 'var(--md-sys-color-primary)', fontSize: 20 }}>star</md-icon>
                    <md-divider inset></md-divider>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== SEGMENTED BUTTONS ===== */}
          <section id="segmented" className="section">
            <div className="section-header">
              <p className="section-label">2 Labs Components</p>
              <h2 className="section-title">Segmented Buttons</h2>
              <p className="section-description">
                Groups of related buttons where selecting one deselects others. Single or multi-select.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Single Select</div>
                <div className="showcase-card-desc">Only one button can be selected at a time.</div>
                <div className="showcase-card-content">
                  <md-outlined-segmented-button-set selected="day" single-select>
                    <md-outlined-segmented-button value="day" selected>
                      <md-icon slot="icon">wb_sunny</md-icon>
                      Day
                    </md-outlined-segmented-button>
                    <md-outlined-segmented-button value="week">
                      <md-icon slot="icon">date_range</md-icon>
                      Week
                    </md-outlined-segmented-button>
                    <md-outlined-segmented-button value="month">
                      <md-icon slot="icon">calendar_month</md-icon>
                      Month
                    </md-outlined-segmented-button>
                  </md-outlined-segmented-button-set>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Multi-Select</div>
                <div className="showcase-card-desc">Multiple buttons can be selected simultaneously.</div>
                <div className="showcase-card-content">
                  <md-outlined-segmented-button-set>
                    <md-outlined-segmented-button selected>
                      <md-icon slot="icon">bold</md-icon>
                      Bold
                    </md-outlined-segmented-button>
                    <md-outlined-segmented-button>
                      <md-icon slot="icon">italic</md-icon>
                      Italic
                    </md-outlined-segmented-button>
                    <md-outlined-segmented-button selected>
                      <md-icon slot="icon">underline</md-icon>
                      Underline
                    </md-outlined-segmented-button>
                  </md-outlined-segmented-button-set>
                </div>
              </div>
            </div>
          </section>

          {/* ===== NAVIGATION BAR ===== */}
          <section id="nav-bar" className="section">
            <div className="section-header">
              <p className="section-label">1 Labs Component</p>
              <h2 className="section-title">Navigation Bar</h2>
              <p className="section-description">
                Bottom navigation bar for switching between primary destinations. Supports icons and labels.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card showcase-card-wide">
                <div className="showcase-card-title">Navigation Bar</div>
                <div className="showcase-card-desc">Interactive bottom navigation. Tap to switch tabs.</div>
                <div style={{
                  maxWidth: 500,
                  margin: '0 auto',
                  borderRadius: 'var(--md-sys-shape-corner-extra-large)',
                  overflow: 'hidden',
                  background: 'var(--md-sys-color-surface-container)',
                  padding: '24px 16px 16px',
                }}>
                  <div style={{ textAlign: 'center', marginBottom: 24, color: 'var(--md-sys-color-on-surface)', fontSize: 14 }}>
                    {['Home', 'Explore', 'Create', 'Profile'][navIndex]} selected
                  </div>
                  <md-navigation-bar
                    activeTabIndex={navIndex}
                    onEvent={(e: any) => {
                      const tab = e.target?.activeTabIndex;
                      if (typeof tab === 'number') setNavIndex(tab);
                    }}
                  >
                    <md-navigation-tab>
                      <md-icon slot="active-icon">home</md-icon>
                      <md-icon slot="inactive-icon">home</md-icon>
                      Home
                    </md-navigation-tab>
                    <md-navigation-tab>
                      <md-icon slot="active-icon">explore</md-icon>
                      <md-icon slot="inactive-icon">explore</md-icon>
                      Explore
                    </md-navigation-tab>
                    <md-navigation-tab>
                      <md-icon slot="active-icon">add_circle</md-icon>
                      <md-icon slot="inactive-icon">add_circle_outline</md-icon>
                      Create
                    </md-navigation-tab>
                    <md-navigation-tab>
                      <md-icon slot="active-icon">person</md-icon>
                      <md-icon slot="inactive-icon">person_outline</md-icon>
                      Profile
                    </md-navigation-tab>
                  </md-navigation-bar>
                </div>
              </div>
            </div>
          </section>

          {/* ===== BADGE ===== */}
          <section id="badge" className="section">
            <div className="section-header">
              <p className="section-label">1 Labs Component</p>
              <h2 className="section-title">Badge</h2>
              <p className="section-description">
                Small status indicators for icons, typically showing notification counts.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Badge</div>
                <div className="showcase-card-desc">Notification badges on icon buttons.</div>
                <div className="showcase-card-content" style={{ gap: 24 }}>
                  <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <md-icon-button>
                      <md-icon>mail</md-icon>
                    </md-icon-button>
                    <md-badge value={5}></md-badge>
                  </div>
                  <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <md-icon-button>
                      <md-icon>notifications</md-icon>
                    </md-icon-button>
                    <md-badge value={99}></md-badge>
                  </div>
                  <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <md-filled-icon-button>
                      <md-icon>chat</md-icon>
                    </md-filled-icon-button>
                    <md-badge value={3}></md-badge>
                  </div>
                  <div style={{ position: 'relative', display: 'inline-flex' }}>
                    <md-outlined-icon-button>
                      <md-icon>shopping_cart</md-icon>
                    </md-outlined-icon-button>
                    <md-badge value={1}></md-badge>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== NAVIGATION DRAWER ===== */}
          <section id="drawer" className="section">
            <div className="section-header">
              <p className="section-label">2 Labs Components</p>
              <h2 className="section-title">Navigation Drawer</h2>
              <p className="section-description">
                Side navigation panels — standard and modal variants for app navigation.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Standard Drawer</div>
                <div className="showcase-card-desc">Inline navigation drawer (non-modal).</div>
                <div className="showcase-card-content">
                  <md-filled-button onClick={() => {
                    const d = document.getElementById('demo-drawer') as any;
                    if (d) d.opened = !d.opened;
                  }}>
                    <md-icon slot="icon">menu</md-icon>
                    Toggle Drawer
                  </md-filled-button>
                </div>
                <md-navigation-drawer
                  id="demo-drawer"
                  style={{ position: 'relative', marginTop: 24, borderRadius: 'var(--md-sys-shape-corner-large)', overflow: 'hidden' }}
                >
                  <div slot="headline">Navigation</div>
                  <md-item type="button">
                    <md-icon slot="start">inbox</md-icon>
                    <div slot="headline">Inbox</div>
                  </md-item>
                  <md-item type="button">
                    <md-icon slot="start">send</md-icon>
                    <div slot="headline">Outbox</div>
                  </md-item>
                  <md-item type="button">
                    <md-icon slot="start">drafts</md-icon>
                    <div slot="headline">Drafts</div>
                  </md-item>
                  <md-item type="button">
                    <md-icon slot="start">delete</md-icon>
                    <div slot="headline">Trash</div>
                  </md-item>
                </md-navigation-drawer>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Modal Drawer</div>
                <div className="showcase-card-desc">Modal drawer with scrim overlay.</div>
                <div className="showcase-card-content">
                  <md-filled-tonal-button onClick={() => setDrawerOpen(true)}>
                    <md-icon slot="icon">menu_open</md-icon>
                    Open Modal Drawer
                  </md-filled-tonal-button>
                </div>
                <md-navigation-drawer-modal
                  id="demo-modal-drawer"
                  opened={drawerOpen}
                  closed={() => setDrawerOpen(false)}
                >
                  <div slot="headline">App Menu</div>
                  <md-item type="button" onClick={() => setDrawerOpen(false)}>
                    <md-icon slot="start">home</md-icon>
                    <div slot="headline">Home</div>
                  </md-item>
                  <md-item type="button" onClick={() => setDrawerOpen(false)}>
                    <md-icon slot="start">search</md-icon>
                    <div slot="headline">Search</div>
                  </md-item>
                  <md-item type="button" onClick={() => setDrawerOpen(false)}>
                    <md-icon slot="start">person</md-icon>
                    <div slot="headline">Profile</div>
                  </md-item>
                  <md-item type="button" onClick={() => setDrawerOpen(false)}>
                    <md-icon slot="start">settings</md-icon>
                    <div slot="headline">Settings</div>
                  </md-item>
                </md-navigation-drawer-modal>
              </div>
            </div>
          </section>

          {/* ===== FIELDS ===== */}
          <section id="fields" className="section">
            <div className="section-header">
              <p className="section-label">2 Components</p>
              <h2 className="section-title">Fields</h2>
              <p className="section-description">
                Low-level field containers for building custom inputs. Filled and outlined variants.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Filled Field</div>
                <div className="showcase-card-desc">Custom input using filled field container.</div>
                <div className="showcase-card-content">
                  <md-filled-field label="Custom Input" style={{ width: '100%' }}>
                    <input slot="input" type="text" defaultValue="Custom content" style={{ background: 'transparent', border: 'none', color: 'var(--md-sys-color-on-surface)', outline: 'none', width: '100%', font: 'inherit' }} />
                  </md-filled-field>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Outlined Field</div>
                <div className="showcase-card-desc">Custom input using outlined field container.</div>
                <div className="showcase-card-content">
                  <md-outlined-field label="Custom Input" style={{ width: '100%' }}>
                    <input slot="input" type="text" defaultValue="Custom content" style={{ background: 'transparent', border: 'none', color: 'var(--md-sys-color-on-surface)', outline: 'none', width: '100%', font: 'inherit' }} />
                  </md-outlined-field>
                </div>
              </div>
            </div>
          </section>

          {/* ===== FOCUS RING ===== */}
          <section id="focus-ring" className="section">
            <div className="section-header">
              <p className="section-label">1 Component</p>
              <h2 className="section-title">Focus Ring</h2>
              <p className="section-description">
                Keyboard focus indicator for custom interactive elements. Shows a ring when focused.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Focus Ring</div>
                <div className="showcase-card-desc">Tab to focus the element to see the focus ring.</div>
                <div className="showcase-card-content">
                  <div
                    tabIndex={0}
                    style={{
                      padding: '16px 24px',
                      borderRadius: 'var(--md-sys-shape-corner-medium)',
                      background: 'var(--md-sys-color-surface-container-high)',
                      color: 'var(--md-sys-color-on-surface)',
                      fontSize: 14,
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    Tab to focus me
                    <md-focus-ring for=""></md-focus-ring>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===== ITEM & NAVIGATION TAB ===== */}
          <section id="item-nav-tab" className="section">
            <div className="section-header">
              <p className="section-label">2 Labs Components</p>
              <h2 className="section-title">Item & Navigation Tab</h2>
              <p className="section-description">
                Generic navigation item and navigation tab components from the labs collection.
              </p>
            </div>
            <div className="showcase-grid">
              <div className="showcase-card">
                <div className="showcase-card-title">Navigation Item</div>
                <div className="showcase-card-desc">Generic item for navigation lists.</div>
                <div className="component-stack" style={{ gap: 8 }}>
                  <md-item type="button">
                    <md-icon slot="start">dashboard</md-icon>
                    <div slot="headline">Dashboard</div>
                  </md-item>
                  <md-item type="button">
                    <md-icon slot="start">analytics</md-icon>
                    <div slot="headline">Analytics</div>
                  </md-item>
                  <md-item type="button">
                    <md-icon slot="start">account_circle</md-icon>
                    <div slot="headline">Account</div>
                  </md-item>
                  <md-item type="button" disabled>
                    <md-icon slot="start">lock</md-icon>
                    <div slot="headline">Admin (Locked)</div>
                  </md-item>
                </div>
              </div>
              <div className="showcase-card">
                <div className="showcase-card-title">Navigation Tab</div>
                <div className="showcase-card-desc">Tab designed for navigation patterns.</div>
                <div className="component-stack" style={{ gap: 4, width: '100%' }}>
                  <md-navigation-tab active>
                    <md-icon slot="active-icon">home</md-icon>
                    <md-icon slot="inactive-icon">home</md-icon>
                    Home
                  </md-navigation-tab>
                  <md-navigation-tab>
                    <md-icon slot="active-icon">search</md-icon>
                    <md-icon slot="inactive-icon">search</md-icon>
                    Search
                  </md-navigation-tab>
                  <md-navigation-tab>
                    <md-icon slot="active-icon">favorite</md-icon>
                    <md-icon slot="inactive-icon">favorite_border</md-icon>
                    Favorites
                  </md-navigation-tab>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* Footer */}
        <footer className="site-footer">
          <p>
            Built with{' '}
            <a href="https://github.com/material-components/material-web" target="_blank" rel="noopener">
              @material/web
            </a>{' '}
            — 48 real Web Components with M3 Expressive theming.
            <br />
            Hosted on{' '}
            <a href="https://pages.github.com" target="_blank" rel="noopener">GitHub Pages</a>.
          </p>
        </footer>
      </div>
    </>
  );
}