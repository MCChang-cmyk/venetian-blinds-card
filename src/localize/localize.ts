import * as en from './languages/en.json';
import * as zhTW from './languages/zh-TW.json';

const languages: any = {
  en: en,
  'zh-TW': zhTW,
  'zh-Hant': zhTW
};

/**
 * 升級版翻譯函式：優先使用傳入的實時系統語系
 * @param stringKey 格式如 "editor.name"
 * @param hassLang 來自卡片的 this.hass.language (選填)
 */
export function localize(
  stringKey: string,
  hassLang?: string,
  search = '',
  replace = '',
  fallbackLanguage = 'en'
): string {
  // 🎯 核心修正：優先使用傳入的 HA 實時語系，若無才降級使用 localStorage 或預設英文
  const browserLang = (localStorage.getItem('selectedLanguage') || 'en').replace(/_/, '-');
  const lang = (hassLang || browserLang).replace(/_/, '-');

  let translated: any;

  try {
    translated = stringKey.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = undefined;
  }

  if (translated === undefined) {
    try {
      translated = stringKey.split('.').reduce((o, i) => o[i], languages[fallbackLanguage]);
    } catch (e) {
      translated = undefined;
    }
  }

  if (translated === undefined) return stringKey;

  if (search !== '' && replace !== '') {
    translated = translated.replace(search, replace);
  }

  return translated;
}