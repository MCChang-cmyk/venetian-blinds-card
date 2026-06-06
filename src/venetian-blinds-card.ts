import './venetian-blinds-card-editor';
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface VenetianBlindsCardConfig {
  type: string;
  entity: string;
  name?: string;
  show_name?: boolean;
  card_padding?: number;
  orientation?: 'horizontal' | 'vertical';
  tap_action?: 'more-info' | 'open' | 'sloped' | 'none';
  slat_count?: number;
  slat_gap?: number;
  slat_corner_radius?: number;
  slat_height?: number;
  // 根目錄欄位（修正：確實補上這四個選填宣告，對齊第 193 行的防呆相容檢查）
  slat_color?: string | number[];               
  slat_opacity?: number;             
  slat_background_color?: string | number[];    
  slat_background_opacity?: number;
  container_background?: string | number[];    
  container_opacity?: number;         
  card_background?: string | number[];          
  card_opacity?: number;             
  // 摺疊選單子物件
  colors_group?: {
    slat_color?: number[];
    slat_opacity?: number;
    slat_background_color?: number[];
    slat_background_opacity?: number;
    container_background?: number[];
    container_opacity?: number;
    card_background?: number[];
    card_opacity?: number;
  };
  tilt_min?: number;
  tilt_max?: number;
  position_min?: number;
  position_max?: number;
}

@customElement('venetian-blinds-card')
export class VenetianBlindsCard extends LitElement {
  
  @property({ attribute: false }) public hass!: any;
  @state() private _config!: VenetianBlindsCardConfig;

  private _holdTimer?: number;
  private _isHolding = false;

  public static getConfigElement() {
    return document.createElement('venetian-blinds-card-editor');
  }

  public static getStubConfig(hass: any) {
    const covers = Object.keys(hass.states).filter(e => e.startsWith('cover.'));
    return {
      entity: covers[0] || '',
      name: '',
      show_name: true,
      card_padding: 16,
      orientation: 'horizontal',
      tap_action: 'more-info',
      slat_count: 12,
      slat_gap: 4,
      slat_corner_radius: 2,
      slat_height: 12,
      colors_group: {
        slat_color: [149, 165, 166],
        slat_opacity: 1.0,
        slat_background_color: [255, 255, 255],
        slat_background_opacity: 0.03,
        container_background: [0, 0, 0],
        container_opacity: 0.15,
        card_background: [28, 28, 30],
        card_opacity: 1.0
      }
    };
  }

  public setConfig(config: VenetianBlindsCardConfig): void {
    if (!config.entity) {
      throw new Error('請指定一個實體 (entity)');
    }
    this._config = {
      show_name: true,
      card_padding: 16,
      orientation: 'horizontal',
      tap_action: 'more-info',
      slat_count: 12,
      slat_gap: 4,
      slat_corner_radius: 2,
      slat_height: 12,
      tilt_min: 0,
      tilt_max: 100,
      position_min: 0,
      position_max: 100,
      ...config
    };
  }

  private _handleTap(): void {
    if (this._isHolding) return;

    const action = this._config.tap_action || 'more-info';
    const entityId = this._config.entity;
    const entityState = this.hass.states[entityId];
    if (action === 'none' || !entityState) return;

    if (action === 'more-info') {
      this._fireMoreInfo();
    } 
    else if (action === 'open') {
      const isClosed = entityState.state === 'closed' || entityState.attributes.current_position === 0;
      const service = isClosed ? 'open_cover' : 'close_cover';
      this.hass.callService('cover', service, { entity_id: entityId });
    } 
    else if (action === 'sloped') {
      const currentTilt = entityState.attributes.current_tilt_position ?? 0;
      const targetTilt = (currentTilt >= 45 && currentTilt <= 55) ? 0 : 50;
      this.hass.callService('cover', 'set_cover_tilt_position', {
        entity_id: entityId,
        tilt_position: targetTilt
      });
    }
  }

  private _handleHoldStart(ev: Event): void {
    this._isHolding = false;
    if (this._holdTimer) window.clearTimeout(this._holdTimer);
    
    this._holdTimer = window.setTimeout(() => {
      this._isHolding = true;
      this._fireMoreInfo();
    }, 500);
  }

  private _handleHoldEnd(): void {
    if (this._holdTimer) {
      window.clearTimeout(this._holdTimer);
      this._holdTimer = undefined;
    }
    if (this._isHolding) {
      window.setTimeout(() => {
        this._isHolding = false;
      }, 50);
    }
  }

  private _fireMoreInfo(): void {
    const event = new CustomEvent('hass-more-info', {
      detail: { entityId: this._config.entity },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private _mapValue(val: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  private _rgba(rgb: any, opacity: any, fallback: string): string {
    if (Array.isArray(rgb) && rgb.length === 3) {
      return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity ?? 1.0})`;
    }
    if (typeof rgb === 'string') return rgb;
    return fallback;
  }

  protected render() {
    if (!this.hass || !this._config) return html``;

    const entityState = this.hass.states[this._config.entity];
    if (!entityState) {
      return html`<ha-card class="error">找不到實體: ${this._config.entity}</ha-card>`;
    }

    const position = this._mapValue(entityState.attributes.current_position ?? 0, this._config.position_min ?? 0, this._config.position_max ?? 100, 0, 100);
    const tilt = this._mapValue(entityState.attributes.current_tilt_position ?? 0, this._config.tilt_min ?? 0, this._config.tilt_max ?? 100, 0, 100);

    let rotateDeg = 0;
    if (tilt <= 50) {
      rotateDeg = this._mapValue(tilt, 0, 50, 0, 80);
    } else {
      rotateDeg = this._mapValue(tilt, 50, 100, 80, 0);
    }

    const coverPercent = 100 - position; 
    const slatCount = Number(this._config.slat_count ?? 12); 
    const slats = [];
    const sHeight = this._config.slat_height ?? 12;

    const cg = this._config.colors_group || {};
    const mainSlatColor = this._rgba(cg.slat_color ?? this._config.slat_color, cg.slat_opacity ?? this._config.slat_opacity, 'rgba(149, 165, 166, 1)');
    const bgSlatColor = this._rgba(cg.slat_background_color ?? this._config.slat_background_color, cg.slat_background_opacity ?? this._config.slat_background_opacity, 'rgba(255, 255, 255, 0.03)');
    const containerBg = this._rgba(cg.container_background ?? this._config.container_background, cg.container_opacity ?? this._config.container_opacity, 'rgba(0, 0, 0, 0.15)');
    const cardBg = this._rgba(cg.card_background ?? this._config.card_background, cg.card_opacity ?? this._config.card_opacity, 'rgba(28, 28, 30, 1)');

    for (let i = 0; i < slatCount; i++) {
      const slatPosition = (i / slatCount) * 100;
      const isVisible = coverPercent > slatPosition;

      const slatStyle = `
        background-color: ${isVisible ? mainSlatColor : bgSlatColor};
        border-radius: ${this._config.slat_corner_radius ?? 2}px;
        transform: ${this._config.orientation === 'vertical' ? `rotateY(${rotateDeg}deg)` : `rotateX(${rotateDeg}deg)`};
        height: ${this._config.orientation === 'vertical' ? '100%' : `${sHeight}px`};
        width: ${this._config.orientation === 'vertical' ? `${sHeight}px` : '100%'};
        transition: transform 0.5s ease, background-color 0.3s ease;
      `;

      slats.push(html`<div class="slat" style="${slatStyle}"></div>`);
    }

    const displayName = this._config.name ?? entityState.attributes.friendly_name ?? this._config.entity;
    const paddingVal = `${this._config.card_padding ?? 16}px`;

    return html`
      <ha-card 
        style="background: ${cardBg}; padding: ${paddingVal};" 
        @click="${this._handleTap}"
        @mousedown="${this._handleHoldStart}"
        @mouseup="${this._handleHoldEnd}"
        @mouseleave="${this._handleHoldEnd}"
        @touchstart="${this._handleHoldStart}"
        @touchend="${this._handleHoldEnd}"
      >
        ${this._config.show_name 
          ? html`<div class="card-header">${displayName}</div>` 
          : html``}
        <div class="container ${this._config.orientation || 'horizontal'}" style="gap: ${this._config.slat_gap ?? 4}px; background: ${containerBg};">
          ${slats}
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      overflow: hidden;
      cursor: pointer;
      perspective: 800px;
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none;
    }
    .card-header {
      color: var(--primary-text-color, white);
      font-size: 14px;
      font-weight: 500;
      line-height: 1;
      margin: 0 0 6px 0; 
      padding: 0;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .error {
      color: var(--error-color, red);
      padding: 16px;
    }
    .container {
      display: flex;
      width: 100%;
      height: 180px; 
      box-sizing: border-box;
      padding: 8px;
      border-radius: 12px;
    }
    .container.horizontal {
      flex-direction: column;
      justify-content: space-between;
    }
    .container.horizontal .slat {
      transform-origin: center center;
    }
    .container.vertical {
      flex-direction: row;
      justify-content: space-between;
    }
    .container.vertical .slat {
      transform-origin: center center;
    }
  `;
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'venetian-blinds-card',
  name: 'Venetian Blinds Card',
  preview: true,
  description: '專門用於呈現百葉窗外觀與狀態的純視覺卡片',
});