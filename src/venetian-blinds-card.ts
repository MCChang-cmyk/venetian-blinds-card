import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface VenetianBlindsCardConfig {
  type: string;
  entity: string;
  orientation?: 'horizontal' | 'vertical';
  tap_action?: 'more-info' | 'open' | 'none';
  slat_count?: number;
  slat_gap?: number;
  slat_corner_radius?: number;
  tilt_min?: number;
  tilt_max?: number;
  position_min?: number;
  position_max?: number;
}

@customElement('venetian-blinds-card')
export class VenetianBlindsCard extends LitElement {
  
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: VenetianBlindsCardConfig;

  public setConfig(config: VenetianBlindsCardConfig): void {
    if (!config.entity) {
      throw new Error('請指定一個實體 (entity)');
    }
    this._config = {
      orientation: 'horizontal',
      tap_action: 'more-info',
      slat_count: 12,
      slat_gap: 4,
      slat_corner_radius: 2,
      tilt_min: 0,
      tilt_max: 100,
      position_min: 0,
      position_max: 100,
      ...config
    };
  }

  private _handleTap(): void {
    const action = this._config.tap_action;
    if (action === 'none') return;

    if (action === 'more-info') {
      const event = new CustomEvent('hass-more-info', {
        detail: { entityId: this._config.entity },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    } else if (action === 'open') {
      this.hass.callService('cover', 'open_cover', { entity_id: this._config.entity });
    }
  }

  private _mapValue(val: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  protected render() {
    if (!this.hass || !this._config) return html``;

    const entityState = this.hass.states[this._config.entity];
    if (!entityState) {
      return html`<ha-card class="error">找不到實體: ${this._config.entity}</ha-card>`;
    }

    const rawPosition = entityState.attributes.current_position ?? 0;
    const rawTilt = entityState.attributes.current_tilt_position ?? 0;

    const pMin = this._config.position_min ?? 0;
    const pMax = this._config.position_max ?? 100;
    const tMin = this._config.tilt_min ?? 0;
    const tMax = this._config.tilt_max ?? 100;

    const position = this._mapValue(rawPosition, pMin, pMax, 0, 100);
    const tilt = this._mapValue(rawTilt, tMin, tMax, 0, 100);

    // 【修正 1】角度映射：讓 50 度時側轉 80 度（變極薄、透光）；0 或 100 度時不旋轉（正對視覺、遮光）
    let rotateDeg = 0;
    if (tilt <= 50) {
      rotateDeg = this._mapValue(tilt, 0, 50, 0, 80);
    } else {
      rotateDeg = this._mapValue(tilt, 50, 100, 80, 0);
    }

    const visiblePercent = 100 - position; 
    const slatCount = this._config.slat_count ?? 12;
    const slats = [];

    for (let i = 0; i < slatCount; i++) {
      // 【修正 2】收合方向：反轉索引判定 (slatCount - 1 - i)，讓窗簾拉起時是由最下方開始消失
      const slatThreshold = ((slatCount - 1 - i) / slatCount) * 100;
      const isVisible = visiblePercent > slatThreshold;

      const slatStyle = `
        background-color: ${isVisible ? 'var(--divider-color, #bdc3c7)' : 'rgba(255,255,255,0.03)'};
        border-radius: ${this._config.slat_corner_radius}px;
        transform: ${this._config.orientation === 'horizontal' ? `rotateX(${rotateDeg}deg)` : `rotateY(${rotateDeg}deg)`};
        transition: transform 0.5s ease, background-color 0.3s ease;
      `;

      slats.push(html`<div class="slat" style="${slatStyle}"></div>`);
    }

    return html`
      <ha-card @click="${this._handleTap}">
        <div class="container ${this._config.orientation}" style="gap: ${this._config.slat_gap}px;">
          ${slats}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      overflow: hidden;
      cursor: pointer;
      background: var(--ha-card-background, var(--card-background-color, #2c3e50));
      padding: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      perspective: 400px;
    }
    .error {
      color: var(--error-color, red);
      padding: 16px;
    }
    .container {
      display: flex;
      width: 100%;
      height: 200px;
      box-sizing: border-box;
    }
    .container.horizontal {
      flex-direction: column;
    }
    .container.horizontal .slat {
      width: 100%;
      height: 12px;
      flex: 1;
      transform-origin: center center;
    }
    .container.vertical {
      flex-direction: row;
    }
    .container.vertical .slat {
      height: 100%;
      flex: 1;
      transform-origin: center center;
    }
    .slat {
      box-shadow: 0px 1px 3px rgba(0,0,0,0.15);
    }
  `;
}

// 讓 Home Assistant 的卡片選擇器能辨識這張卡片
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'venetian-blinds-card',
  name: 'Venetian Blinds Card',
  preview: true,
  description: '專門用於呈現百葉窗外觀與狀態的純視覺卡片',
});