import * as en from './languages/en.json';
import * as zhTW from './languages/zh-TW.json';

// 語系字典映射
const languages: any = {
  en: en,
  'zh-TW': zhTW,
  'zh-Hant': zhTW // 相容某些 HA 版本的繁體宣告
};

/**
 * 核心翻譯函式
 * @param stringKey 格式如 "editor.name"
 * @param search 要替換的變數 (選填)
 * @param replace 替換的內容 (選填)
 * @param fallbackLanguage 找不到語系時的防呆預設 (英文)
 */
export function localize(
  stringKey: string,
  search = '',
  replace = '',
  fallbackLanguage = 'en'
): string {
  // 從當前系統或 localStorage 撈取 HA 使用者的語系
  const lang = (localStorage.getItem('selectedLanguage') || 'en').replace(/_/, '-');

  let translated: any;

  try {
    translated = stringKey.split('.').reduce((o, i) => o[i], languages[lang]);
  } catch (e) {
    translated = undefined;
  }

  // 如果當前語系找不到，嘗試去預設語系 (en) 找
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