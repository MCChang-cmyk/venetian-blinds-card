/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

var common$1 = {
	missing_entity: "Entity not found"
};
var editor$1 = {
	entity: "Primary Entity (Height Control)",
	blind_type: "Blind Type",
	secondary_entity: "Secondary Entity (Top Slat Ratio)",
	name: "Custom Name (Optional)",
	show_name: "Show Card Title",
	orientation: "Direction",
	tap_action: "Tap Action",
	card_padding: "Card Padding",
	slat_count: "Slat Count",
	slat_height: "Slat Thickness",
	slat_gap: "Slat Gap",
	slat_corner_radius: "Corner Radius",
	types: {
		venetian: "Venetian Blinds",
		roller: "Roller Shades",
		double_honeycomb: "Double Honeycomb Blinds"
	},
	actions: {
		more_info: "More Info",
		open: "Open / Close",
		sloped: "Tilt Angle (Sloped)",
		none: "None"
	},
	directions: {
		horizontal: "Horizontal",
		vertical: "Vertical"
	},
	groups: {
		colors: "Color Settings"
	},
	colors: {
		slat_color_double: "1. Top Slat Color (Sheer)",
		slat_color_single: "1. Blade / Fabric Color",
		slat_opacity_double: "Top Slat Opacity",
		slat_opacity_single: "Fabric Opacity",
		slat_bg_double: "2. Bottom Slat Color (Blackout)",
		slat_bg_single: "2. Hidden Slat Color",
		slat_bg_opacity_double: "Bottom Slat Opacity",
		slat_bg_opacity_single: "Hidden Slat Opacity",
		container_bg: "3. Container Background",
		container_opacity: "Container Opacity",
		card_bg: "4. Card Background",
		card_opacity: "Card Opacity"
	}
};
var en = {
	common: common$1,
	editor: editor$1
};

var en$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common$1,
    default: en,
    editor: editor$1
});

var common = {
	missing_entity: "找不到指定實體"
};
var editor = {
	entity: "主要實體 (控制整體高度)",
	blind_type: "窗簾類型",
	secondary_entity: "上層比例實體 (控制紗簾區間)",
	name: "自訂顯示名稱 (選填)",
	show_name: "顯示卡片標題名稱",
	orientation: "顯示方向",
	tap_action: "點擊卡片後的行為",
	card_padding: "顯示比例 (框線間距)",
	slat_count: "葉片總數量",
	slat_height: "葉片厚度",
	slat_gap: "葉片間距",
	slat_corner_radius: "窗簾邊緣圓角",
	types: {
		venetian: "百葉窗",
		roller: "卷簾 / 蜂巢簾",
		double_honeycomb: "雙層蜂巢簾"
	},
	actions: {
		more_info: "詳細資訊 (More Info)",
		open: "打開關閉窗簾",
		sloped: "切換角度",
		none: "無動作 (None)"
	},
	directions: {
		horizontal: "水平",
		vertical: "垂直"
	},
	groups: {
		colors: "色彩設定"
	},
	colors: {
		slat_color_double: "1. 上層布料顏色 (紗簾)",
		slat_color_single: "1. 窗簾布料/放下來的顏色",
		slat_opacity_double: "上層不透明度",
		slat_opacity_single: "布料不透明度",
		slat_bg_double: "2. 下層布料顏色 (遮光)",
		slat_bg_single: "2. 拉起後的隱藏葉片顏色",
		slat_bg_opacity_double: "下層不透明度",
		slat_bg_opacity_single: "隱藏葉片不透明度",
		container_bg: "3. 內部容器底色",
		container_opacity: "內部容器不透明度",
		card_bg: "4. 卡片最外層底色",
		card_opacity: "卡片底色不透明度"
	}
};
var zhTW = {
	common: common,
	editor: editor
};

var zhTW$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    common: common,
    default: zhTW,
    editor: editor
});

const languages = {
    en: en$1,
    'zh-TW': zhTW$1,
    'zh-Hant': zhTW$1
};
/**
 * 升級版翻譯函式：優先使用傳入的實時系統語系
 * @param stringKey 格式如 "editor.name"
 * @param hassLang 來自卡片的 this.hass.language (選填)
 */
function localize(stringKey, hassLang, search = '', replace = '', fallbackLanguage = 'en') {
    // 🎯 核心修正：優先使用傳入的 HA 實時語系，若無才降級使用 localStorage 或預設英文
    const browserLang = (localStorage.getItem('selectedLanguage') || 'en').replace(/_/, '-');
    const lang = (hassLang || browserLang).replace(/_/, '-');
    let translated;
    try {
        translated = stringKey.split('.').reduce((o, i) => o[i], languages[lang]);
    }
    catch (e) {
        translated = undefined;
    }
    if (translated === undefined) {
        try {
            translated = stringKey.split('.').reduce((o, i) => o[i], languages[fallbackLanguage]);
        }
        catch (e) {
            translated = undefined;
        }
    }
    if (translated === undefined)
        return stringKey;
    if (search !== '' && replace !== '') {
        translated = translated.replace(search, replace);
    }
    return translated;
}

let VenetianBlindsCardEditor = class VenetianBlindsCardEditor extends i {
    setConfig(config) {
        this._config = config;
    }
    _schema() {
        // 🎯 抓取即時語系
        const lang = this.hass?.language || 'en';
        const bType = this._config?.blind_type || 'venetian';
        const isVenetian = bType === 'venetian';
        const isDouble = bType === 'double_honeycomb';
        const baseSchema = [
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
        baseSchema.push({ name: 'name', selector: { text: {} } }, { name: 'show_name', selector: { boolean: {} } }, {
            name: 'orientation',
            selector: {
                select: {
                    options: [
                        { value: 'horizontal', label: localize('editor.directions.horizontal', lang) },
                        { value: 'vertical', label: localize('editor.directions.vertical', lang) }
                    ]
                }
            }
        }, {
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
        }, { name: 'card_padding', selector: { number: { min: 0, max: 40, unit_of_measurement: 'px', mode: 'slider' } } });
        if (isVenetian) {
            baseSchema.push({ name: 'slat_count', selector: { number: { min: 2, max: 50, mode: 'box' } } }, { name: 'slat_height', selector: { number: { min: 2, max: 40, unit_of_measurement: 'px', mode: 'slider' } } }, { name: 'slat_gap', selector: { number: { min: 0, max: 20, unit_of_measurement: 'px', mode: 'slider' } } });
        }
        baseSchema.push({ name: 'slat_corner_radius', selector: { number: { min: 0, max: 15, unit_of_measurement: 'px', mode: 'slider' } } });
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
    _valueChanged(ev) {
        const config = ev.detail.value;
        const event = new CustomEvent('config-changed', {
            detail: { config },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    render() {
        if (!this.hass || !this._config)
            return b ``;
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
        const computeLabel = (schema) => {
            if (schema.label)
                return schema.label;
            const labels = {
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
        return b `
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${this._schema()}
        .computeLabel=${computeLabel}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
};
__decorate([
    n({ attribute: false })
], VenetianBlindsCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], VenetianBlindsCardEditor.prototype, "_config", void 0);
VenetianBlindsCardEditor = __decorate([
    t('venetian-blinds-card-editor')
], VenetianBlindsCardEditor);

let VenetianBlindsCard = class VenetianBlindsCard extends i {
    constructor() {
        super(...arguments);
        this._isHolding = false;
        // 🎯 過載保護鎖狀態與安全閥計時器
        this._isWaiting = false;
    }
    static getConfigElement() {
        return document.createElement('venetian-blinds-card-editor');
    }
    static getStubConfig(hass) {
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
    setConfig(config) {
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
    // 監聽 HA 實體狀態更新以便自動解鎖
    updated(changedProperties) {
        super.updated(changedProperties);
        if (this.hass && this._config && this._isWaiting) {
            const mainEntity = this.hass.states[this._config.entity];
            const subEntityId = this._config.secondary_entity;
            const subEntity = subEntityId ? this.hass.states[subEntityId] : null;
            const isMainMoving = mainEntity?.state === 'opening' || mainEntity?.state === 'closing';
            const isSubMoving = subEntity?.state === 'opening' || subEntity?.state === 'closing';
            if (isMainMoving || isSubMoving) {
                this._clearUnlockTimer();
                this._isWaiting = false;
            }
        }
    }
    _startUnlockTimer() {
        this._clearUnlockTimer();
        this._unlockTimer = window.setTimeout(() => {
            this._isWaiting = false;
        }, 4000); // 4秒強制防死鎖安全閥
    }
    _clearUnlockTimer() {
        if (this._unlockTimer) {
            window.clearTimeout(this._unlockTimer);
            this._unlockTimer = undefined;
        }
    }
    _handleTap() {
        if (this._isHolding)
            return;
        if (this._isWaiting)
            return; // 處於過載鎖定狀態時直接無視點擊
        const action = this._config.tap_action || 'more-info';
        const mainEntityId = this._config.entity;
        const subEntityId = this._config.secondary_entity;
        const bType = this._config.blind_type || 'venetian';
        if (action === 'none')
            return;
        if (action === 'more-info') {
            if (bType === 'double_honeycomb' && subEntityId) {
                this._fireMoreInfo(subEntityId);
            }
            else {
                this._fireMoreInfo(mainEntityId);
            }
        }
        else if (action === 'open') {
            if (bType === 'double_honeycomb' && subEntityId) {
                const subState = this.hass.states[subEntityId];
                if (subState) {
                    this._isWaiting = true;
                    this._startUnlockTimer();
                    const currentPos = subState.attributes.current_position ?? 0;
                    const targetPos = currentPos > 50 ? 0 : 100;
                    this.hass.callService('cover', 'set_cover_position', {
                        entity_id: subEntityId,
                        position: targetPos
                    });
                }
            }
            else {
                const mainState = this.hass.states[mainEntityId];
                if (mainState) {
                    this._isWaiting = true;
                    this._startUnlockTimer();
                    const isClosed = mainState.state === 'closed' || mainState.attributes.current_position === 0;
                    const service = isClosed ? 'open_cover' : 'close_cover';
                    this.hass.callService('cover', service, { entity_id: mainEntityId });
                }
            }
        }
        else if (action === 'sloped' && bType === 'venetian') {
            const mainState = this.hass.states[mainEntityId];
            if (mainState) {
                this._isWaiting = true;
                this._startUnlockTimer();
                const currentTilt = mainState.attributes.current_tilt_position ?? 0;
                const targetTilt = (currentTilt >= 45 && currentTilt <= 55) ? 0 : 50;
                this.hass.callService('cover', 'set_cover_tilt_position', {
                    entity_id: mainEntityId,
                    tilt_position: targetTilt
                });
            }
        }
    }
    _handleHoldStart(ev) {
        this._isHolding = false;
        if (this._holdTimer)
            window.clearTimeout(this._holdTimer);
        this._holdTimer = window.setTimeout(() => {
            this._isHolding = true;
            this._fireMoreInfo(this._config.entity); // 長按永遠指定為主要實體
        }, 500);
    }
    _handleHoldEnd() {
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
    _fireMoreInfo(entityId) {
        const event = new CustomEvent('hass-more-info', {
            detail: { entityId: entityId },
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    _mapValue(val, inMin, inMax, outMin, outMax) {
        return ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    }
    _rgba(rgb, opacity, fallback) {
        if (Array.isArray(rgb) && rgb.length === 3) {
            return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity ?? 1.0})`;
        }
        if (typeof rgb === 'string')
            return rgb;
        return fallback;
    }
    render() {
        if (!this.hass || !this._config)
            return b ``;
        const mainEntity = this.hass.states[this._config.entity];
        if (!mainEntity) {
            // 🎯 修正：導入 i18n 多國語系動態錯誤訊息提示
            return b `<ha-card class="error">${localize('common.missing_entity', this.hass.language)}: ${this._config.entity}</ha-card>`;
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
        let content;
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
            content = b `
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
            content = b `<div class="roller-shade" style="${rollerStyle}"></div>`;
        }
        else {
            const position = this._mapValue(mainEntity.attributes.current_position ?? 0, this._config.position_min ?? 0, this._config.position_max ?? 100, 0, 100);
            const coverPercent = 100 - position;
            const tilt = this._mapValue(mainEntity.attributes.current_tilt_position ?? 0, this._config.tilt_min ?? 0, this._config.tilt_max ?? 100, 0, 100);
            let rotateDeg = 0;
            if (tilt <= 50) {
                rotateDeg = this._mapValue(tilt, 0, 50, 0, 80);
            }
            else {
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
                slats.push(b `<div class="slat" style="${slatStyle}"></div>`);
            }
            content = slats;
        }
        const displayName = this._config.name ?? mainEntity.attributes.friendly_name ?? this._config.entity;
        const paddingVal = `${this._config.card_padding ?? 16}px`;
        const gapVal = bType === 'venetian' ? `${this._config.slat_gap ?? 4}px` : '0px';
        return b `
      <ha-card 
        class="${this._isWaiting ? 'loading-lock' : ''}"
        style="background: ${cardBg}; padding: ${paddingVal};" 
        @click="${this._handleTap}"
        @mousedown="${this._handleHoldStart}"
        @mouseup="${this._handleHoldEnd}"
        @mouseleave="${this._handleHoldEnd}"
        @touchstart="${this._handleHoldStart}"
        @touchend="${this._handleHoldEnd}"
      >
        ${this._config.show_name ? b `<div class="card-header">${displayName}</div>` : b ``}
        <div class="container ${this._config.orientation || 'horizontal'}" style="gap: ${gapVal}; background: ${containerBg}; border-radius: ${radius};">
          ${content}
        </div>
      </ha-card>
    `;
    }
};
VenetianBlindsCard.styles = i$3 `
    ha-card {
      overflow: hidden;
      cursor: pointer;
      perspective: 800px;
      box-sizing: border-box;
      user-select: none;
      -webkit-user-select: none;
      transition: opacity 0.3s ease;
    }
    ha-card.loading-lock {
      opacity: 0.55;            
      cursor: wait;             
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
__decorate([
    n({ attribute: false })
], VenetianBlindsCard.prototype, "hass", void 0);
__decorate([
    r()
], VenetianBlindsCard.prototype, "_config", void 0);
__decorate([
    r()
], VenetianBlindsCard.prototype, "_isWaiting", void 0);
VenetianBlindsCard = __decorate([
    t('venetian-blinds-card')
], VenetianBlindsCard);
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'venetian-blinds-card',
    name: 'Venetian Blinds Card',
    preview: true,
    description: '專門用於呈現百葉窗與卷簾外觀與狀態的純視覺卡片',
});

export { VenetianBlindsCard };
