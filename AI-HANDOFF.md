# AI Handoff — Material Web Showcase

> **Ler este arquivo ANTES de qualquer mudança no repo.**

---

## 1. Projeto

| Campo | Valor |
|---|---|
| **Nome** | Material Web Showcase |
| **Tipo** | Showcase de componentes Material Web 3 (Next.js static export) |
| **Dono** | SuXD-Dev (GitHub: `SuXD-Dev`) |
| **URL** | `https://suxd-dev.github.io/material-web-showcase/` |
| **Deploy** | GitHub Pages via Actions (`build` + `deploy` jobs separados) |
| **Branch** | `main` |

## 2. Stack Técnica

- **Framework**: Next.js (static export, `output: "export"`)
- **Componentes**: `@material/web@2.5.0` — 48 Web Components reais (`<md-*>`)
- **Estilo**: CSS puro com tokens M3 (`--md-sys-color-*`, `--md-sys-shape-*`, etc.)
- **Fontes**: Roboto (Material default), JetBrains Mono (code)
| **Ícones**: Material Symbols Outlined
- **Linguagem**: TypeScript + React
- **Tema**: 5 esquemas de cores M3 (Blue, Pink, Green, Purple, Amber) + dark/light toggle

## 3. Estrutura de Arquivos

```
material-web-showcase/
├── .github/workflows/deploy.yml   # CI/CD — NÃO MEXER
├── src/
│   ├── app/
│   │   ├── globals.css            # Tokens M3, layout, animações
│   │   ├── layout.tsx              # Root layout + MaterialProvider
│   │   └── page.tsx                # Showcase com 48 componentes em 24 seções
│   ├── components/
│   │   ├── MaterialProvider.tsx    # Dynamic imports + customElements.define guard
│   │   └── ThemePicker.tsx         # 5 esquemas de cores + dark/light toggle
│   └── material-web.d.ts          # TypeScript JSX declarations para <md-*> elements
├── next.config.ts                  # basePath: process.env.NEXT_PUBLIC_BASE_PATH
├── package.json
├── tsconfig.json
└── AI-HANDOFF.md                   # ESTE ARQUIVO
```

## 4. Como Funciona (IMPORTANTE)

### Web Components + Next.js Static Export

Os componentes `<md-*>` são Web Components (Custom Elements v1) do `@material/web`. Eles precisam do browser para funcionar (Shadow DOM, `customElements.define`). Por isso:

1. **`MaterialProvider.tsx`** faz dynamic imports em `useEffect` (client-side only)
2. **`customElements.define` guard** previne double-registration no React StrictMode
3. **Loading screen** com `<md-circular-progress>` aparece até os componentes carregarem
4. O HTML estático não contém os componentes — eles são hidratados via JS no browser
5. **NÃO importar `@material/web` em server components ou fora de `useEffect`**

### Tokens M3

Todos os tokens são CSS custom properties. Para customizar um componente:
```css
.meu-botao-vermelho {
  --md-sys-color-primary: var(--md-sys-color-error);
  --md-sys-color-on-primary: var(--md-sys-color-on-error);
}
```

Shadow DOM impede CSS externo de estilizar internos dos componentes. Use tokens ou `::part()`.

### Componentes Disponíveis (48 total)

**Stable (38)**: md-filled-button, md-filled-tonal-button, md-elevated-button, md-outlined-button, md-text-button, md-checkbox, md-assist-chip, md-filter-chip, md-input-chip, md-suggestion-chip, md-chip-set, md-dialog, md-divider, md-elevation, md-fab, md-branded-fab, md-filled-field, md-outlined-field, md-focus-ring, md-icon, md-icon-button, md-filled-icon-button, md-filled-tonal-icon-button, md-outlined-icon-button, md-icon-button-toggle, md-list-item, md-menu, md-sub-menu, md-menu-item, md-circular-progress, md-linear-progress, md-radio, md-radio-group, md-ripple, md-filled-select, md-outlined-select, md-select-option, md-slider, md-switch, md-tabs, md-primary-tab, md-secondary-tab, md-filled-text-field, md-outlined-text-field

**Labs (10)**: md-badge, md-elevated-card, md-filled-card, md-outlined-card, md-item, md-navigation-bar, md-navigation-drawer, md-navigation-drawer-modal, md-navigation-tab, md-outlined-segmented-button, md-outlined-segmented-button-set

## 5. Deploy (NÃO MEXER)

Mesma arquitetura do Who-Am-I:
- Job `build` + Job `deploy` separados
- `environment: github-pages` no deploy
- `build_type: workflow` (não legacy)
- `NEXT_PUBLIC_BASE_PATH` injetado pelo configure-pages

## 6. Git / Commits

- **User**: `SuXD-Dev` <overtonightisgoat@gmail.com>
- **Commits**: Conventional commits
- **Branch**: `main` apenas
- **Push**: Direto para `main`

## 7. O Que NÃO Fazer

- ❌ Não importar `@material/web` fora de `useEffect` / client components
- ❌ Não usar Tailwind (o site usa tokens M3 puros)
- ❌ Não mexer no deploy workflow
- ❌ Não apagar o `AI-HANDOFF.md`
- ❌ Não adicionar SSR — é static export
- ❌ Não esquecer o customElements.define guard ao modificar MaterialProvider

## 8. Antes de Qualquer Mudança

1. ✅ Ler este arquivo completo
2. ✅ `git pull`
3. ✅ `npm install && npm run build` — verificar que compila
4. ✅ Fazer commit conventional
5. ✅ `git push origin main`
6. ✅ Verificar deploy em `https://suxd-dev.github.io/material-web-showcase/`
