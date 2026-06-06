import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('venetian-blinds-card-editor')
export class VenetianBlindsCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: any;

  public setConfig(config: any): void {
    this._config = config;
  }

  private _schema(): any[] {
    const bType = this._config?.blind_type || 'venetian';
    const isVenetian = bType === 'venetian';
    const isDouble = bType === 'double_honeycomb';

    const baseSchema: any[] = [
      { name: 'entity', label: '主要實體 (控制整體窗簾高度)', selector: { entity: { domain: 'cover' } } },
      {
        name: 'blind_type',
        label: '窗簾類型',
        selector: {
          select: {
            options: [
              { value: 'venetian', label: '百葉窗 Mode' },
              { value: 'roller', label: '卷簾 / 蜂巢簾 Mode' },
              { value: 'double_honeycomb', label: '雙層蜂巢簾 Mode 🎨' }
            ]
          }
        }
      }
    ];

    if (isDouble) {
      baseSchema.push({ name: 'secondary_entity', label: '上層比例實體 (控制紗簾區間)', selector: { entity: { domain: 'cover' } } });
    }

    baseSchema.push(
      { name: 'name', selector: { text: {} } },
      { name: 'show_name', selector: { boolean: {} } },
      {
        name: 'orientation',
        selector: {
          select: {
            options: [
              { value: 'horizontal', label: '水平' },
              { value: 'vertical', label: '垂直' }
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
              { value: 'open', label: '打開關閉窗簾' },
              ...(isVenetian ? [{ value: 'sloped', label: '切換角度' }] : []),
              { value: 'none', label: '無動作 (None)' }
            ]
          }
        }
      },
      { name: 'card_padding', selector: { number: { min: 0, max: 40, unit_of_measurement: 'px', mode: 'slider' } } }
    );

    // 🎯 幾何控制動態分流
    if (isVenetian) {
      baseSchema.push(
        { name: 'slat_count', selector: { number: { min: 2, max: 50, mode: 'box' } } },
        { name: 'slat_height', selector: { number: { min: 2, max: 40, unit_of_measurement: 'px', mode: 'slider' } } },
        { name: 'slat_gap', selector: { number: { min: 0, max: 20, unit_of_measurement: 'px', mode: 'slider' } } }
      );
    }

    // 🎯 修正：將圓角控制獨立出來，不論是百葉窗還是卷簾、雙層簾，全面開放微調！
    baseSchema.push(
      { name: 'slat_corner_radius', selector: { number: { min: 0, max: 15, unit_of_measurement: 'px', mode: 'slider' } } }
    );

    baseSchema.push({
      name: 'colors_group',
      type: 'expandable',
      title: '色彩設定',
      icon: 'mdi:palette',
      schema: [
        { name: 'slat_color', label: isDouble ? '1. 上層布料顏色 (紗簾)' : '1. 窗簾布料/放下來的顏色', selector: { color_rgb: {} } },
        { name: 'slat_opacity', label: isDouble ? '上層不透明度' : '布料不透明度', selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
        
        { name: 'slat_background_color', label: isDouble ? '2. 下層布料顏色 (遮光)' : '2. 拉起後的隱藏葉片顏色', selector: { color_rgb: {} } },
        { name: 'slat_background_opacity', label: isDouble ? '下層不透明度' : '隱藏葉片不透明度', selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
        
        { name: 'container_background', label: '3. 內部容器底色', selector: { color_rgb: {} } },
        { name: 'container_opacity', label: '內部容器不透明度', selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } },
        
        { name: 'card_background', label: '4. 卡片最外層底色', selector: { color_rgb: {} } },
        { name: 'card_opacity', label: '卡片底色不透明度', selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } } }
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
        entity: '主要實體',
        name: '自訂顯示名稱 (選填)',
        show_name: '顯示卡片標題名稱',
        tap_action: '點擊卡片後的行為',
        card_padding: '顯示比例',
        orientation: '顯示方向',
        slat_count: '葉片總數量',
        slat_height: '葉片厚度',
        slat_gap: '葉片間距',
        slat_corner_radius: '窗簾邊緣圓角' // 繁體在地化修飾
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