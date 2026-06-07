import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { localize } from './localize/localize'; 

@customElement('venetian-blinds-card-editor')
export class VenetianBlindsCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: any;

  public setConfig(config: any): void {
    this._config = config;
  }

  private _schema(): any[] {
    // 🎯 抓取即時語系
    const lang = this.hass?.language || 'en';
    const bType = this._config?.blind_type || 'venetian';
    const isVenetian = bType === 'venetian';
    const isDouble = bType === 'double_honeycomb';

    const baseSchema: any[] = [
      { name: 'entity', label: localize('editor.entity', lang), selector: { entity: { domain: 'cover' } } },
      {
        name: 'blind_type',
        label: localize('editor.blind_type', lang),
        selector: {
          select: {
            options: [
              { value: 'venetian', label: localize('editor.types.venetian', lang) },
              { value: 'roller', label: localize('editor.types.roller', lang) },
              { value: 'double_honeycomb', label: localize('editor.types.double_honeycomb', lang) }
            ]
          }
        }
      }
    ];

    if (isDouble) {
      baseSchema.push({ name: 'secondary_entity', label: localize('editor.secondary_entity', lang), selector: { entity: { domain: 'cover' } } });
    }

    baseSchema.push(
      { name: 'name', selector: { text: {} } },
      { name: 'show_name', selector: { boolean: {} } },
      {
        name: 'orientation',
        selector: {
          select: {
            options: [
              { value: 'horizontal', label: localize('editor.directions.horizontal', lang) },
              { value: 'vertical', label: localize('editor.directions.vertical', lang) }
            ]
          }
        }
      },
      {
        name: 'tap_action',
        selector: {
          select: {
            options: [
              { value: 'more-info', label: localize('editor.actions.more_info', lang) },
              { value: 'open', label: localize('editor.actions.open', lang) },
              ...(isVenetian ? [{ value: 'sloped', label: localize('editor.actions.sloped', lang) }] : []),
              { value: 'none', label: localize('editor.actions.none', lang) }
            ]
          }
        }
      },
      { name: 'card_padding', selector: { number: { min: 0, max: 40, unit_of_measurement: 'px', mode: 'slider' } } }
    );

    if (isVenetian) {
      baseSchema.push(
        { name: 'slat_count', selector: { number: { min: 2, max: 50, mode: 'box' } } },
        { name: 'slat_height', selector: { number: { min: 2, max: 40, unit_of_measurement: 'px', mode: 'slider' } } },
        { name: 'slat_gap', selector: { number: { min: 0, max: 20, unit_of_measurement: 'px', mode: 'slider' } } }
      );
    }

    baseSchema.push(
      { name: 'slat_corner_radius', selector: { number: { min: 0, max: 15, unit_of_measurement: 'px', mode: 'slider' } } }
    );

    baseSchema.push({
      name: 'colors_group',
      type: 'expandable',
      title: localize('editor.groups.colors', lang),
      icon: 'mdi:palette',
      schema: [
        { name: 'slat_color', label: isDouble ? localize('editor.colors.slat_color_double', lang) : localize('editor.colors.slat_color_single', lang), selector: { color_rgb: {} } },
        { name: 'slat_opacity', label: isDouble ? localize('editor.colors.slat_opacity_double', lang) : localize('editor.colors.slat_opacity_single', lang), selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
        
        { name: 'slat_background_color', label: isDouble ? localize('editor.colors.slat_bg_double', lang) : localize('editor.colors.slat_bg_single', lang), selector: { color_rgb: {} } },
        { name: 'slat_background_opacity', label: isDouble ? localize('editor.colors.slat_bg_opacity_double', lang) : localize('editor.colors.slat_bg_opacity_single', lang), selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
        
        { name: 'container_background', label: localize('editor.colors.container_bg', lang), selector: { color_rgb: {} } },
        { name: 'container_opacity', label: localize('editor.colors.container_opacity', lang), selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
        
        { name: 'card_background', label: localize('editor.colors.card_bg', lang), selector: { color_rgb: {} } },
        { name: 'card_opacity', label: localize('editor.colors.card_opacity', lang), selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } }
      ]
    });

    return baseSchema;
  }

  private _valueChanged(ev: CustomEvent): void {
    const config = ev.detail.value;
    const event = new CustomEvent('config-changed', {
      detail: { config },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  protected render() {
    if (!this.hass || !this._config) return html``;

    const lang = this.hass?.language || 'en'; // 🎯 抓取即時語系
    const data = {
      blind_type: 'venetian',
      show_name: true,
      card_padding: 16,
      slat_count: 12,
      slat_gap: 4,
      slat_corner_radius: 2,
      slat_height: 12,
      orientation: 'horizontal',
      tap_action: 'more-info',
      slat_color: [149, 165, 166],
      slat_opacity: 0.4, 
      slat_background_color: [52, 73, 94],
      slat_background_opacity: 1.0,
      container_background: [0, 0, 0],
      container_opacity: 0.15,
      card_background: [28, 28, 30],
      card_opacity: 1.0,
      ...this._config
    };

    const computeLabel = (schema: any) => {
      if (schema.label) return schema.label;
      const labels: Record<string, string> = {
        name: localize('editor.name', lang),
        show_name: localize('editor.show_name', lang),
        card_padding: localize('editor.card_padding', lang),
        orientation: localize('editor.orientation', lang),
        slat_count: localize('editor.slat_count', lang),
        slat_height: localize('editor.slat_height', lang),
        slat_gap: localize('editor.slat_gap', lang),
        slat_corner_radius: localize('editor.slat_corner_radius', lang),
        tap_action: localize('editor.tap_action', lang)
      };
      return labels[schema.name] || schema.name;
    };

    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._schema()}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}