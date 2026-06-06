# Venetian Blinds & Roller Shades Card 🎨 
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
![Version](https://img.shields.io/badge/version-v1.9.3-E13460)


 [ [English](README.md) | [中文](README_zh-tw.md) ]

專為 Home Assistant 設計的極致高質感、扁平化（Flat Design）純視覺窗簾狀態整合卡片。本卡片不僅支援傳統的**百葉窗**，更完美相容**單層卷簾/蜂巢簾**以及頂級的**雙層蜂巢簾（日間/夜間簾）**，並內建完整的圖形化 UI 視覺編輯器。

---

## 預覽

![Preview](images/preview.jpg)

## ✨ 核心特色

* 支援 `百葉窗`、`單層卷簾` 或 `雙層蜂巢簾` 顯示型態。
* 📐 **圖形化 UI 視覺編輯器**：對齊 2026 年 Home Assistant 現代元件，完全拋棄 YAML，滑桿自訂厚度、數量、圓角與顯示比例。
* 🎨 **極致色彩選單群組**：獨創摺疊式色彩控制，支援調色盤與獨立的「不透明度（Opacity）」滑桿微調。
* 🧠 **雙層簾智能物理推擠**：雙層蜂巢簾模式下，自動計算主要高度實體與上層比例實體的交界，完美模擬擬真機械推擠伸縮。
* ⚡ **頂級雙軌動作分流**：
  * **點擊（Tap）**：雙層模式下輕點瞬移切換上層 0%/100% 或彈出中軌控制；單層模式下控制全開全關。
  * **長壓（Hold）**：不論任何模式，按住面板 0.5 秒永遠精準彈出主要高度實體的官方 `More Info` 控制台。
* 💎 **幾何美學極致優化**：字體留白精細減半、外框容器與布料圓角完美平行咬合、自動消除卷簾模式下的交界黑線空隙。

---

## 🛠️ 安裝步驟

### HACS (Recommended)

1. 開啟 HACS > Frontend。
2. 點擊右上角的三個點，選擇 Custom repositories。
3. 貼上本專案的 GitHub 網址，類別選擇 Lovelace。
4. 點擊 Install。


### 手動安裝 (Manual)
1. 下載本專案編譯後的 `dist/venetian-blinds-card.js` 檔案。
2. 將該檔案上傳至您的 Home Assistant 設定目錄中的 `www/` 資料夾（例如 `/config/www/venetian-blinds-card.js`）。
3. 前往 Home Assistant 的 **設定 -> 儀表板 -> 右上角三個點 -> 資源管理**。
4. 點擊「新增資源」，輸入以下內容並儲存：
   * **URL**: `/local/venetian-blinds-card.js?v=1.0.0`
   * **資源類型**: `JavaScript 模組`

---

## ⚙️ 配置參數 (Configuration)

雖然本卡片支援 100% 圖形化介面設定，如果您希望使用 YAML 進行高級配置，參數對齊如下：

| 參數名稱 | 類型 | 預設值 | 說明 |
| :--- | :--- | :--- | :--- |
| `type` | string | **必填** | 必須為 `custom:venetian-blinds-card` |
| `entity` | string | **必填** | 主要窗簾實體 ID（控制整體高度） |
| `blind_type` | string | `venetian` | 窗簾類型：`venetian` (百葉), `roller` (單層卷簾), `double_honeycomb` (雙層簾) |
| `secondary_entity` | string | optional | 雙層簾模式下專用：控制上層紗簾比例的實體 ID |
| `name` | string | optional | 自訂顯示標題名稱，留空則顯示實體友善名稱 |
| `show_name` | boolean | `true` | 是否顯示卡片最上方的標題文字 |
| `orientation` | string | `horizontal` | 運行方向：`horizontal` (水平), `vertical` (垂直) |
| `card_padding` | number | `16` | 內部窗框容器到卡片最外層邊緣的留白間距 (px) |
| `slat_count` | number | `12` | 百葉窗專用：葉片總數量 |
| `slat_height` | number | `12` | 百葉窗專用：葉片厚度粗細 (px) |
| `slat_gap` | number | `4` | 百葉窗專用：葉片之間的間距 (px) |
| `slat_corner_radius` | number | `2` | 窗簾與內部容器一體化邊緣圓角的修飾半徑 (px) |
| `tap_action` | string | `more-info` | 點擊行為：`more-info` (詳細資訊), `open` (打開關閉), `sloped` (翻轉角度), `none` |

### 🎨 `colors_group` 進階色彩嵌套參數

```yaml
colors_group:
  slat_color: [149, 165, 166]            # 1. 窗簾布料/放下來的葉片顏色 (RGB 陣列)
  slat_opacity: 1.0                      # 窗簾布料不透明度 (0.0 ~ 1.0)
  slat_background_color: [255, 255, 255] # 2. 拉起後的隱藏葉片顏色 / 雙層簾下層顏色
  slat_background_opacity: 0.03          # 隱藏葉片不透明度 / 雙層下層不透明度
  container_background: [0, 0, 0]        # 3. 內部襯底容器窗框底色
  container_opacity: 0.15                # 內部容器不透明度
  card_background: [28, 28, 30]          # 4. 卡片最外層底色
  card_opacity: 1.0                      # 卡片最外層底色不透明度
  ```

### 💡 YAML 範例
1. 頂級雙層蜂巢簾配置
```yaml
type: custom:venetian-blinds-card
blind_type: double_honeycomb
entity: cover.living_room_blind_height     # 控制整體高度
secondary_entity: cover.living_room_blind_day # 控制上層紗簾比例
name: 客廳雙層簾
show_name: true
card_padding: 16
slat_corner_radius: 12
tap_action: open                           # 點擊切換紗簾 0%/100%，長按控制整體 More Info
colors_group:
  slat_color: [240, 240, 240]
  slat_opacity: 0.45                       # 唯美半透明紗感
  slat_background_color: [44, 62, 80]
  slat_background_opacity: 1.0             # 100% 厚重遮光布
```

2. 極簡扁平百葉窗配置
```yaml
type: custom:venetian-blinds-card
blind_type: venetian
entity: cover.bedroom_blind
show_name: false                           # 隱藏文字，達成極簡風格
slat_count: 16
slat_height: 8
slat_gap: 5
slat_corner_radius: 4
tap_action: sloped                         # 點擊一下一鍵透光/翻轉角度
```

📄 授權條款 (License)
本專案採用 MIT License 授權開源發布。歡迎自由 Fork、修改與提交 Pull Request！