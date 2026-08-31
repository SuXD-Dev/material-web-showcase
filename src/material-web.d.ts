/* TypeScript JSX declarations for @material/web components */

declare namespace React {
  namespace JSX {
    interface IntrinsicElements {
      // Buttons
      'md-elevated-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          trailingIcon?: boolean;
          icon?: string;
        },
        HTMLElement
      >;
      'md-filled-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          trailingIcon?: boolean;
          icon?: string;
        },
        HTMLElement
      >;
      'md-filled-tonal-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          trailingIcon?: boolean;
          icon?: string;
        },
        HTMLElement
      >;
      'md-outlined-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          trailingIcon?: boolean;
          icon?: string;
        },
        HTMLElement
      >;
      'md-text-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          trailingIcon?: boolean;
          icon?: string;
        },
        HTMLElement
      >;

      // Checkbox
      'md-checkbox': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          error?: boolean;
          indeterminate?: boolean;
          value?: string;
          name?: string;
        },
        HTMLElement
      >;

      // Chips
      'md-assist-chip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          elevated?: boolean;
          href?: string;
          label?: string;
          removeOnly?: boolean;
        },
        HTMLElement
      >;
      'md-chip-set': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      'md-filter-chip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          elevated?: boolean;
          selected?: boolean;
          removable?: boolean;
          label?: string;
        },
        HTMLElement
      >;
      'md-input-chip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          elevated?: boolean;
          label?: string;
          removeOnly?: boolean;
          selected?: boolean;
        },
        HTMLElement
      >;
      'md-suggestion-chip': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          elevated?: boolean;
          href?: string;
        },
        HTMLElement
      >;

      // Dialog
      'md-dialog': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          open?: boolean;
          fullscreen?: boolean;
          header?: string;
          closed?: string | (() => void);
        },
        HTMLElement
      >;

      // Divider
      'md-divider': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          inset?: boolean | string;
          role?: string;
        },
        HTMLElement
      >;

      // Elevation
      'md-elevation': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          level?: number;
        },
        HTMLElement
      >;

      // FABs
      'md-fab': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          extended?: boolean;
          icon?: string;
          label?: string;
          lowered?: boolean;
          size?: 'medium' | 'large' | 'small';
          variant?: 'primary' | 'secondary' | 'surface' | 'tertiary';
        },
        HTMLElement
      >;
      'md-branded-fab': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          extended?: boolean;
          icon?: string;
          label?: string;
          size?: 'medium' | 'large' | 'small';
        },
        HTMLElement
      >;

      // Fields (low-level)
      'md-filled-field': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          error?: boolean;
          focused?: boolean;
          label?: string;
          placeholder?: string;
          populated?: boolean;
          required?: boolean;
          resizable?: boolean;
        },
        HTMLElement
      >;
      'md-outlined-field': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          error?: boolean;
          focused?: boolean;
          label?: string;
          placeholder?: string;
          populated?: boolean;
          required?: boolean;
          resizable?: boolean;
        },
        HTMLElement
      >;

      // Focus Ring
      'md-focus-ring': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          for?: string;
          inward?: boolean;
          visible?: boolean;
        },
        HTMLElement
      >;

      // Icon
      'md-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;

      // Icon Buttons
      'md-icon-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          toggle?: boolean;
          selected?: boolean;
        },
        HTMLElement
      >;
      'md-filled-icon-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          toggle?: boolean;
          selected?: boolean;
        },
        HTMLElement
      >;
      'md-filled-tonal-icon-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          toggle?: boolean;
          selected?: boolean;
        },
        HTMLElement
      >;
      'md-outlined-icon-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          toggle?: boolean;
          selected?: boolean;
        },
        HTMLElement
      >;
      'md-icon-button-toggle': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          selected?: boolean;
        },
        HTMLElement
      >;

      // List
      'md-list': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      'md-list-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          headline?: string;
          supportingText?: string;
          overline?: string;
          type?: 'text' | 'button' | 'link';
          href?: string;
          target?: string;
        },
        HTMLElement
      >;
      'md-list-item-leading': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;

      // Menu
      'md-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          anchor?: string | HTMLElement;
          positioning?: 'fixed' | 'absolute' | 'document' | 'popover' | 'tooltip';
          quick?: boolean;
          stayOpenOnFocusout?: boolean;
          hasOverflow?: boolean;
          xOffset?: number;
          yOffset?: number;
          type?: 'menu' | 'listbox';
          open?: boolean;
          closed?: () => void;
        },
        HTMLElement
      >;
      'md-menu-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          focused?: boolean;
          headline?: string;
          overline?: string;
          supportingText?: string;
          href?: string;
          target?: string;
          keepOpen?: boolean;
          selected?: boolean;
          type?: 'menuitem' | 'option' | 'button';
        },
        HTMLElement
      >;
      'md-sub-menu': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          headline?: string;
          overline?: string;
          supportingText?: string;
        },
        HTMLElement
      >;

      // Progress
      'md-circular-progress': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: number;
          max?: number;
          indeterminate?: boolean;
          fourColor?: boolean;
        },
        HTMLElement
      >;
      'md-linear-progress': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: number;
          max?: number;
          indeterminate?: boolean;
          buffer?: number;
        },
        HTMLElement
      >;

      // Radio
      'md-radio': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          name?: string;
          value?: string;
        },
        HTMLElement
      >;
      'md-radio-group': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          name?: string;
          value?: string;
        },
        HTMLElement
      >;

      // Ripple
      'md-ripple': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          unbounded?: boolean;
        },
        HTMLElement
      >;

      // Selects
      'md-filled-select': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          error?: boolean;
          label?: string;
          menuPositioning?: 'fixed' | 'absolute' | 'popover';
          placeholder?: string;
          quick?: boolean;
          required?: boolean;
          value?: string;
          type?: 'text' | 'search';
        },
        HTMLElement
      >;
      'md-outlined-select': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          error?: boolean;
          label?: string;
          menuPositioning?: 'fixed' | 'absolute' | 'popover';
          placeholder?: string;
          quick?: boolean;
          required?: boolean;
          value?: string;
          type?: 'text' | 'search';
        },
        HTMLElement
      >;
      'md-select-option': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          headline?: string;
          selected?: boolean;
          value?: string;
        },
        HTMLElement
      >;

      // Slider
      'md-slider': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          labels?: boolean;
          marked?: boolean;
          max?: number;
          min?: number;
          name?: string;
          range?: boolean;
          step?: number;
          ticks?: boolean;
          value?: number;
          valueEnd?: number;
          valueStart?: number;
        },
        HTMLElement
      >;

      // Switch
      'md-switch': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          checked?: boolean;
          disabled?: boolean;
          icon?: string;
          icons?: boolean;
          label?: string;
          name?: string;
          value?: string;
        },
        HTMLElement
      >;

      // Tabs
      'md-tabs': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          activeTabIndex?: number;
          autoActivate?: boolean;
          dir?: string;
          dragHeight?: number;
          scrollable?: boolean;
          activeTab?: string;
        },
        HTMLElement
      >;
      'md-primary-tab': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          active?: boolean;
          disabled?: boolean;
          inlineIcon?: string;
          stacked?: boolean;
        },
        HTMLElement
      >;
      'md-secondary-tab': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          active?: boolean;
          disabled?: boolean;
          inlineIcon?: string;
          stacked?: boolean;
        },
        HTMLElement
      >;

      // Text Fields
      'md-filled-text-field': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          error?: boolean;
          errorText?: string;
          helperText?: string;
          label?: string;
          max?: number;
          maxLength?: number;
          min?: number;
          minLength?: number;
          pattern?: string;
          placeholder?: string;
          prefixText?: string;
          readOnly?: boolean;
          required?: boolean;
          rows?: number;
          suffixText?: string;
          type?: string;
          value?: string;
          inputMode?: string;
        },
        HTMLElement
      >;
      'md-outlined-text-field': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          error?: boolean;
          errorText?: string;
          helperText?: string;
          label?: string;
          max?: number;
          maxLength?: number;
          min?: number;
          minLength?: number;
          pattern?: string;
          placeholder?: string;
          prefixText?: string;
          readOnly?: boolean;
          required?: boolean;
          rows?: number;
          suffixText?: string;
          type?: string;
          value?: string;
          inputMode?: string;
          charCounter?: boolean;
        },
        HTMLElement
      >;

      // Labs components
      'md-badge': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          value?: number;
          max?: number;
        },
        HTMLElement
      >;
      'md-elevated-card': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      'md-filled-card': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      'md-outlined-card': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      'md-item': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          href?: string;
          target?: string;
          type?: 'text' | 'button' | 'link';
        },
        HTMLElement
      >;
      'md-navigation-bar': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          activeTabIndex?: number;
          hideInactiveLabels?: boolean;
          onEvent?: (e: any) => void;
        },
        HTMLElement
      >;
      'md-navigation-drawer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          opened?: boolean;
          modal?: boolean;
          overline?: string;
          headline?: string;
          type?: string;
          value?: string;
        },
        HTMLElement
      >;
      'md-navigation-drawer-modal': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          opened?: boolean;
          overline?: string;
          headline?: string;
          type?: string;
          value?: string;
          closed?: () => void;
        },
        HTMLElement
      >;
      'md-navigation-tab': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          active?: boolean;
          disabled?: boolean;
          inlineIcon?: string;
          stacked?: boolean;
          value?: string;
        },
        HTMLElement
      >;
      'md-outlined-segmented-button': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          disabled?: boolean;
          selected?: boolean;
          value?: string;
        },
        HTMLElement
      >;
      'md-outlined-segmented-button-set': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          selectOnClick?: boolean;
          selected?: string;
          singleSelect?: boolean;
          value?: string;
        },
        HTMLElement
      >;
    }
  }
}