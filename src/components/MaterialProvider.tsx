'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const MaterialReadyContext = createContext(false);

export function useMaterialReady() {
  return useContext(MaterialReadyContext);
}

export function MaterialProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Guard against React StrictMode double-registration
    const _customElementsDefine = window.customElements.define;
    window.customElements.define = (name: string, cl: CustomElementConstructor, conf?: ElementDefinitionOptions) => {
      if (!customElements.get(name)) {
        _customElementsDefine.call(window.customElements, name, cl, conf);
      }
    };

    let cancelled = false;

    async function loadComponents() {
      // Import all stable components
      await import('@material/web/all.js');

      // Import labs components individually
      await Promise.all([
        import('@material/web/labs/badge/badge.js'),
        import('@material/web/labs/card/elevated-card.js'),
        import('@material/web/labs/card/filled-card.js'),
        import('@material/web/labs/card/outlined-card.js'),
        import('@material/web/labs/item/item.js'),
        import('@material/web/labs/navigationbar/navigation-bar.js'),
        import('@material/web/labs/navigationdrawer/navigation-drawer.js'),
        import('@material/web/labs/navigationdrawer/navigation-drawer-modal.js'),
        import('@material/web/labs/navigationtab/navigation-tab.js'),
        import('@material/web/labs/segmentedbutton/outlined-segmented-button.js'),
        import('@material/web/labs/segmentedbuttonset/outlined-segmented-button-set.js'),
      ]);

      // Import and apply Material 3 typescale styles
      try {
        const { styles } = await import('@material/web/typography/md-typescale-styles.js');
        if (styles?.styleSheet) {
          document.adoptedStyleSheets = [
            ...document.adoptedStyleSheets,
            styles.styleSheet,
          ];
        }
      } catch {
        // Typescale styles are optional
      }

      if (!cancelled) {
        setReady(true);
      }
    }

    loadComponents();

    return () => {
      cancelled = true;
      window.customElements.define = _customElementsDefine;
    };
  }, []);

  if (!ready) {
    return (
      <div className="loading-screen">
        <md-circular-progress indeterminate></md-circular-progress>
        <span className="loading-screen-text">Loading Material Web Components...</span>
      </div>
    );
  }

  return (
    <MaterialReadyContext.Provider value={true}>
      {children}
    </MaterialReadyContext.Provider>
  );
}
