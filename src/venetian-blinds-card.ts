import './venetian-blinds-card-editor';
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface VenetianBlindsCardConfig {
  type: string;
  entity: string;
  secondary_entity?: string;         
  blind_type?: 'venetian' | 'roller' | 'double_honeycomb';
  name?: string;
  show_name?: boolean;
  card_padding?: number;
  orientation?: 'horizontal' | 'vertical';
  tap_action?: 'more-info' | 'open' | 'sloped' | 'none';
  slat_count?: number;
  slat_gap?: number;
  slat_corner_radius?: number;
  slat_height?: number;
  slat_color?: string | number[];               
  slat_opacity?: number;             
  slat_background_color?: string | number[];    
  slat_background_opacity?: number;
  container_background?: string | number[];    
  container_opacity?: number;         
  card_background?: string | number[];          
  card_opacity?: number;             
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
      secondary_entity: covers[1] || '',
      blind_type: 'venetian',
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
        slat_color: [230, 230, 230],        
        slat_opacity: 0.4,
        slat_background_color: [52, 73, 94], 
        slat_background_opacity: 1.0,
        container_background: [0, 0, 0],
        container_opacity: 0.15,
        card_background: [28, 28, 30],
        card_opacity: 1.0
      }
    };
  }

  public setConfig(config: VenetianBlindsCardConfig): void {
    if (!config.entity) {
      throw new Error('請指定主要實體 (entity)');
    }
    this._config = {
      blind_type: 'venetian',
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
    const mainEntityId = this._config.entity;
    const subEntityId = this._config.secondary_entity;
    const bType = this._config.blind_type || 'venetian';

    if (action === 'none') return;

    if (action === 'more-info') {
      if (bType === 'double_honeycomb' && subEntityId) {
        this._fireMoreInfo(subEntityId);
      } else {
        this._fireMoreInfo(mainEntityId);
      }
    } 
    else if (action === 'open') {
      if (bType === 'double_honeycomb' && subEntityId) {
        const subState = this.hass.states[subEntityId];
        if (subState) {
          const currentPos = subState.attributes.current_position ?? 0;
          const targetPos = currentPos > 50 ? 0 : 100;
          this.hass.callService('cover', 'set_cover_position', {
            entity_id: subEntityId,
            position: targetPos
          });
        }
      } else {
        const mainState = this.hass.states[mainEntityId];
        if (mainState) {
          const isClosed = mainState.state === 'closed' || mainState.attributes.current_position === 0;
          const service = isClosed ? 'open_cover' : 'close_cover';
          this.hass.callService('cover', service, { entity_id: mainEntityId });
        }
      }
    } 
    else if (action === 'sloped' && bType === 'venetian') {
      const mainState = this.hass.states[mainEntityId];
      if (mainState) {
        const currentTilt = mainState.attributes.current_tilt_position ?? 0;
        const targetTilt = (currentTilt >= 45 && currentTilt <= 55) ? 0 : 50;
        this.hass.callService('cover', 'set_cover_tilt_position', {
          entity_id: mainEntityId,
          tilt_position: targetTilt
        });
      }
    }
  }

  private _handleHoldStart(ev: Event): void {
    this._isHolding = false;
    if (this._holdTimer) window.clearTimeout(this._holdTimer);
    
    this._holdTimer = window.setTimeout(() => {
      this._isHolding = true;
      this._fireMoreInfo(this._config.entity);
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

  private _fireMoreInfo(entityId: string): void {
    const event = new CustomEvent('hass-more-info', {
      detail: { entityId: entityId },
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

    const mainEntity = this.hass.states[this._config.entity];
    if (!mainEntity) {
      return html`<ha-card class="error">找不到主要實體: ${this._config.entity}</ha-card>`;
    }

    const bType = this._config.blind_type || 'venetian';
    const isVertical = this._config.orientation === 'vertical';
    const radius = `${this._config.slat_corner_radius ?? 2}px`; 

    const cg = this._config.colors_group || {};
    const topColor = this._rgba(cg.slat_color ?? this._config.slat_color, cg.slat_opacity ?? this._config.slat_opacity, 'rgba(149, 165, 166, 1)');
    const bottomColor = this._rgba(cg.slat_background_color ?? this._config.slat_background_color, cg.slat_background_opacity ?? this._config.slat_background_opacity, 'rgba(44, 62, 80, 1)');
    const containerBg = this._rgba(cg.container_background ?? this._config.container_background, cg.container_opacity ?? this._config.container_opacity, 'rgba(0, 0, 0, 0.15)');
    const cardBgRaw = cg.card_background ?? this._config.card_background ?? [28, 28, 30];
    const cardOpacityRaw = cg.card_opacity ?? this._config.card_opacity ?? 1.0;
    const cardBg = this._rgba(cardBgRaw, cardOpacityRaw, 'rgba(28, 28, 30, 1)');

    let content: any;

    if (bType === 'double_honeycomb') {
      const mainPos = this._mapValue(mainEntity.attributes.current_position ?? 0, this._config.position_min ?? 0, this._config.position_max ?? 100, 0, 100);
      const L_total = 100 - mainPos; 

      let L_day = 0;
      if (this._config.secondary_entity && this.hass.states[this._config.secondary_entity]) {
        const secondaryEntity = this.hass.states[this._config.secondary_entity];
        const secondaryPos = this._mapValue(secondaryEntity.attributes.current_position ?? 0, this._config.position_min ?? 0, this._config.position_max ?? 100, 0, 100);
        L_day = 100 - secondaryPos; 
      }

      const bottomVisiblePercent = Math.max(0, L_total - L_day); 
      const topVisiblePercent = L_total - bottomVisiblePercent;   

      const topRadiusStr = isVertical ? `${radius} 0 0 ${radius}` : `${radius} ${radius} 0 0`;
      const bottomRadiusStr = isVertical ? `0 ${radius} ${radius} 0` : `0 0 ${radius} ${radius}`;

      const topShadeStyle = isVertical
        ? `background-color: ${topColor}; width: ${topVisiblePercent}%; height: 100%; border-radius: ${topRadiusStr}; transition: width 0.5s ease;`
        : `background-color: ${topColor}; height: ${topVisiblePercent}%; width: 100%; border-radius: ${topRadiusStr}; transition: height 0.5s ease;`;

      const bottomShadeStyle = isVertical
        ? `background-color: ${bottomColor}; width: ${bottomVisiblePercent}%; height: 100%; border-radius: ${bottomRadiusStr}; transition: width 0.5s ease;`
        : `background-color: ${bottomColor}; height: ${bottomVisiblePercent}%; width: 100%; border-radius: ${bottomRadiusStr}; transition: height 0.5s ease;`;

      content = html`
        <div class="roller-shade top-shade" style="${topShadeStyle}"></div>
        <div class="roller-shade bottom-shade" style="${bottomShadeStyle}"></div>
      `;
    } 
    else if (bType === 'roller') {
      const position = this._mapValue(mainEntity.attributes.current_position ?? 0, this._config.position_min ?? 0, this._config.position_max ?? 100, 0, 100);
      const coverPercent = 100 - position;
      
      const rollerStyle = isVertical
        ? `background-color: ${topColor}; width: ${coverPercent}%; height: 100%; border-radius: ${radius}; transition: width 0.5s ease;`
        : `background-color: ${topColor}; height: ${coverPercent}%; width: 100%; border-radius: ${radius}; transition: height 0.5s ease;`;

      content = html`<div class="roller-shade" style="${rollerStyle}"></div>`;
    } 
    else {
      const position = this._mapValue(mainEntity.attributes.current_position ?? 0, this._config.position_min ?? 0, this._config.position_max ?? 100, 0, 100);
      const coverPercent = 100 - position;
      const tilt = this._mapValue(mainEntity.attributes.current_tilt_position ?? 0, this._config.tilt_min ?? 0, this._config.tilt_max ?? 100, 0, 100);
      
      let rotateDeg = 0;
      if (tilt <= 50) {
        rotateDeg = this._mapValue(tilt, 0, 50, 0, 80);
      } else {
        rotateDeg = this._mapValue(tilt, 50, 100, 80, 0);
      }

      const slatCount = Number(this._config.slat_count ?? 12); 
      const slats = [];
      const sHeight = this._config.slat_height ?? 12;
      const bgSlatColor = this._rgba(cg.slat_background_color ?? this._config.slat_background_color, cg.slat_background_opacity ?? this._config.slat_background_opacity, 'rgba(255, 255, 255, 0.03)');

      for (let i = 0; i < slatCount; i++) {
        const slatPosition = (i / slatCount) * 100;
        const isVisible = coverPercent > slatPosition;

        const slatStyle = `
          background-color: ${isVisible ? topColor : bgSlatColor};
          border-radius: ${radius};
          transform: ${isVertical ? `rotateY(${rotateDeg}deg)` : `rotateX(${rotateDeg}deg)`};
          height: ${isVertical ? '100%' : `${sHeight}px`};
          width: ${isVertical ? `${sHeight}px` : '100%'};
          transition: transform 0.5s ease, background-color 0.3s ease;
        `;
        slats.push(html`<div class="slat" style="${slatStyle}"></div>`);
      }
      content = slats;
    }

    const displayName = this._config.name ?? mainEntity.attributes.friendly_name ?? this._config.entity;
    const paddingVal = `${this._config.card_padding ?? 16}px`;
    
    // 🎯 核心修復點：精準修正間距邏輯
    // 只有在百葉窗（venetian）模式下才使用動態間距，卷簾（roller）和雙層簾（double_honeycomb）一律為 0px 以防色塊分離黏貼錯誤！
    const gapVal = bType === 'venetian' ? `${this._config.slat_gap ?? 4}px` : '0px';

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
        ${this._config.show_name ? html`<div class="card-header">${displayName}</div>` : html``}
        <div class="container ${this._config.orientation || 'horizontal'}" style="gap: ${gapVal}; background: ${containerBg}; border-radius: ${radius};">
          ${content}
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
      overflow: hidden;
    }
    .container.horizontal {
      flex-direction: column;
      justify-content: flex-start;
    }
    .container.horizontal .slat {
      transform-origin: center center;
    }
    .container.vertical {
      flex-direction: row;
      justify-content: flex-start;
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
  description: '專門用於呈現百葉窗與卷簾外觀與狀態的純視覺卡片',
});