import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('venetian-blinds-card-editor')
export class VenetianBlindsCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: any;

  public setConfig(config: any): void {
    this._config = config;
  }

  private _schema() {
    return [
      { name: 'entity', selector: { entity: { domain: 'cover' } } },
      { name: 'name', selector: { text: {} } },
      { name: 'show_name', selector: { boolean: {} } },
      {
        name: 'orientation',
        selector: {
          select: {
            options: [
              { value: 'horizontal', label: '水平' }, // 文案修正
              { value: 'vertical', label: '垂直' }     // 文案修正
            ]
          }
        }
      },
      {
        name: 'tap_action',
        selector: {
          select: {
            options: [
              { value: 'more-info', label: '詳細資訊 (More Info)' },
              { value: 'open', label: '打開關閉窗簾' }, // 文案修正
              { value: 'sloped', label: '切換角度' },    // 文案修正
              { value: 'none', label: '無動作 (None)' }
            ]
          }
        }
      },
      { name: 'card_padding', selector: { number: { min: 0, max: 40, unit_of_measurement: 'px', mode: 'slider' } } },
      { name: 'slat_count', selector: { number: { min: 2, max: 50, mode: 'box' } } },
      { name: 'slat_height', selector: { number: { min: 2, max: 40, unit_of_measurement: 'px', mode: 'slider' } } },
      { name: 'slat_gap', selector: { number: { min: 0, max: 20, unit_of_measurement: 'px', mode: 'slider' } } },
      { name: 'slat_corner_radius', selector: { number: { min: 0, max: 15, unit_of_measurement: 'px', mode: 'slider' } } },
      
      {
        name: 'colors_group',
        type: 'expandable',
        title: '色彩設定',
        icon: 'mdi:palette',
        schema: [
          { name: 'slat_color', label: '1. 放下來的葉片顏色', selector: { color_rgb: {} } },
          { name: 'slat_opacity', label: '葉片不透明度', selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
          
          { name: 'slat_background_color', label: '2. 拉起後的隱藏葉片顏色', selector: { color_rgb: {} } },
          { name: 'slat_background_opacity', label: '隱藏葉片不透明度', selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
          
          { name: 'container_background', label: '3. 內部容器底色', selector: { color_rgb: {} } },
          { name: 'container_opacity', label: '內部容器不透明度', selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
          
          { name: 'card_background', label: '4. 卡片最外層底色', selector: { color_rgb: {} } },
          { name: 'card_opacity', label: '卡片底色不透明度', selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } }
        ]
      }
    ];
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

    const data = {
      show_name: true,
      card_padding: 16,
      slat_count: 12,
      slat_gap: 4,
      slat_corner_radius: 2,
      slat_height: 12,
      orientation: 'horizontal',
      tap_action: 'more-info',
      ...this._config
    };

    const computeLabel = (schema: any) => {
      if (schema.label) return schema.label;
      const labels: Record<string, string> = {
        entity: '對應窗簾實體',
        name: '自訂顯示名稱 (選填)',
        show_name: '顯示卡片標題名稱',
        tap_action: '點擊卡片後的行為',
        card_padding: '顯示比例',    
        orientation: '顯示方向',    
        slat_count: '葉片總數量',
        slat_height: '葉片厚度',     
        slat_gap: '葉片間距',        
        slat_corner_radius: '葉片邊緣圓角'
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