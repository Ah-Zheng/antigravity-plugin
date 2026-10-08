---
name: live-panel
description: "配置驅動的動態即時架構圖與短影音設計協議（Animated Architecture Live Panel）。將 JSON 配置轉化為終端式即時運轉架構圖或馬卡龍淺色資訊圖動效，支援數據封包流動（Packets）、滾動 Log、計數器跳動與狀態高亮。輸出為 H.264 MP4 短影音（適配 Threads、X、小紅書）或自包含動態網頁。快捷指令：/live-panel。"
license: MIT
metadata:
  version: "1.0-localized"
---

# Live Panel（動態即時架構圖與短影音設計協議）

> 「每一幀都是完整的架構圖，流動的是系統狀態而非裝飾。告別靜態截圖，以即時運轉面板呈現系統生命力。」
> 本協議專門將複雜架構、多代理協作（Agent Tree）或系統管道轉化為**「永遠在即時運轉的系統監控面板（Always-running Live Panel）」**。透過純 JSON 設定驅動，自動生成數據光點穿梭（Packets）、滾動日誌、計數器狀態翻轉，並可一鍵渲染為高畫質 H.264 MP4 影音檔或獨立執行的動態網頁。

---

## 觸發時機

### 應主動啟動
- 使用者要求為架構、AI Agent 協同、資料管道或組織架構繪製「帶有流動動效、生命感、短影音級別」的展示圖時
- 需要產出可發布至社群媒體（Threads, X, 小紅書）的高質感架構展示短影音（MP4）或動態網頁時
- 使用者提及想製作類似「小紅書 @林纾 的 AI Agent 完整架構動態版」或「@thedelost Codex 終端動態樹」時
- 使用者明確輸入快捷指令 `/live-panel`

### 無需啟動（邊界約束）
- 技術文件或 Obsidian 筆記內的靜態歸檔圖（請使用 `/diagram-design` 產出靜態向量圖）
- 終端機內的快速文字概念示意（使用 Unicode/ASCII Wiretext）
- 需要使用者大量互動的拖拉式 Canvas

---

## 核心執行流程（五階 SOP）

```text
[1. 盤點內容與數據] ➔ [2. 編寫 config.json] ➔ [3. 終端結構確認] ➔ [4. 渲染 MP4/HTML] ➔ [5. 幀級品質驗證]
(確定節點/狀態機)     (設定畫布/顏色/連線)    (ASCII 框線對齊佈局)    (Python + ffmpeg)    (check_frames 幾何零衝突)
```

### 步驟 1：盤點模組節點與指標數據（Content & Metric Inventory）
- 列出系統中所有核心方塊（Boxes）、誰與誰通訊（Wires/Routes）、有哪些觸發器（Triggers）、以及終端日誌（Logs）該顯示什麼。
- **真實性原則**：若數據非專案真實指標，必須明確在畫面上標註 `(illustrative)`（示意）或在 footer 註明數據來源。

### 步驟 2：編寫結構化設定檔（Write Config JSON）
依據 `references/config-schema.md` 規範撰寫單一 JSON 檔案（可從 `examples/` 複製起手）：
- **畫布比例（Canvas Preset）**：依目標發布平台選定（4:5、3:4、1:1）。
- **主題風格（Theme Preset）**：選擇 `terminal-dark` 或 `light-pastel`。
- **絕對坐標配置**：設定每個方塊的 `(x, y, w, h)`，並定義內部標籤與狀態機。
- **版權宣告（Credit Rule）**：若復刻現有作者的圖表，必須在 `credit` 欄位完整保留原作者標註。

### 步驟 3：終端機結構預覽（Terminal Layout Preview）
在正式呼叫 GPU/瀏覽器渲染前，先以 **ASCII 框線圖** 向使用者展示節點拓撲與主要數據流向，確認版面配置符合預期。

### 步驟 4：執行渲染產出（Render Pipeline）
調用內建標準函式庫腳本執行渲染：
```bash
# 產出 H.264 MP4 影片 (預設 30 fps, 含靜音 AAC 軌道防社交平台降級為 GIF)
python3 scripts/render.py --config path/to/config.json --out output.mp4

# 同步保留獨立運行的 HTML 動態網頁 (可在任何現代瀏覽器開啟)
python3 scripts/render.py --config path/to/config.json --out output.mp4 --html-out output.html
```

### 步驟 5：幀級自動化品質門禁（Frame-level Quality Gate）
執行內建幾何驗證工具，抽樣檢驗 ~120 個時間點的 DOM 渲染狀態：
```bash
python3 scripts/check_frames.py --config path/to/config.json --out-dir /tmp/frames --repeat
```
- 自動檢驗文字是否溢出（Text Overflow）、節點是否異常重疊（Box Collision）、以及幀重現確定性（Replay Determinism）。
- 必須返回 exit code 0 方可完成交付。

---

## 畫布比例與主題風格預設

### 1. 畫布規格（Canvas Presets）

| 預設規格 | 畫布解析度 (px) | 最佳應用場景 |
| :--- | :---: | :--- |
| **`4:5`** | `1200 x 1500` | X (Twitter)、Instagram 資訊圖 |
| **`3:4`** | `1080 x 1440` | 小紅書 (Xiaohongshu)、Threads 直式貼文 |
| **`1:1`** | `1080 x 1080` | 方形社群貼圖、簡報嵌入 |

### 2. 主題風格（Theme Presets）

- **`terminal-dark`**：暗黑終端機風格、等寬字型（Monospace）、分段式終端邊框、高亮螢光流動光點。適合硬核技術架構、後端管道、分散式系統監控。
- **`light-pastel`**：明亮馬卡龍配色、柔和圓角卡片（Rounded Pastel Boxes）、柔和發光與圓角箭頭。適合 AI Agent、產品流程、社群科普圖表（如小紅書 @林纾 風格）。

---

## 動態語法三節奏（Motion Grammar）

整個動畫不靠相機位移、不靠生硬的淡入淡出，畫面自第 0 幀起就是完整可讀的架構圖。藉由**三個不同頻率的狀態變化**賦予系統生命力：

1. **快節奏（Fast Tempo - ~1.5s 循環）**：
   - 數據封包（Packets）帶著拖尾在所有連線上平滑流動。
   - 快速跳動的微型計數器與 Spinner。
2. **中節奏（Medium Tempo - ~4-6s 循環）**：
   - 終端 Log 向上滾動，最新一行高亮、舊紀錄變暗。
   - 狀態條（Progress Bars）重新計算數值，跨過閾值時自動變換顏色與標籤。
3. **慢節奏（Slow Tempo - ~10-15s 循環）**：
   - 側邊觸發器（Side-rail triggers）依序點亮。
   - 點亮時觸發關聯箭頭變色、輸送雙倍封包、並在日誌中打印對應操作。
   - 全局統計總數緩慢遞增累積。

---

## 官方範例索引（Examples Catalog）

本技能自帶三個極高品質的完整範例（包含 `config.json`、`mp4` 與截圖）：

1. **`examples/agent-architecture/`**：
   - **主題**：`light-pastel`（小紅書 3:4 比例）
   - **內容**：小紅書 @林纾 的《AI Agent 的完整架構》（Planner, Reasoning, 核心循環, Tools, MCP, Reflection）。
2. **`examples/codex-agents/`**：
   - **主題**：`terminal-dark`（4:5 比例）
   - **內容**：Codex 多代理樹狀監控面板（復刻 @thedelost 原創設計）。
3. **`examples/airbnb/`**：
   - **主題**：`terminal-dark`（中文內容）
   - **內容**：Airbnb 架構指標訪談視覺化（帶動態計數器與日誌）。

---

## 資安防護與邊界（Security Safeguards）

1. **離線安全無外鏈**：
   - 腳本一律採用 Python 3.8+ 標準函式庫，零 pip / npm 外部依賴。
   - 透過本地無頭 Chrome 與 ffmpeg 進行管線串流，不對外部任何第三方伺服器發送數據。
2. **敏感機密與假造數據防線**：
   - 嚴格禁止讀取專案內的 `.env*`、Token、金鑰或生產環境機密作為日誌文字。
   - 嚴禁捏造虛假數字偽裝成真實業務指標，模擬數據必須明確標註 `(illustrative)`。
3. **寫入安全**：
   - 渲染產出之 MP4 或 HTML 僅限寫入使用者指定目錄或 `assets/diagrams/`，嚴禁覆寫任何現有專案原始程式碼。

---

## 鐵則（Iron Rules）

1. **佈局永遠不移動**：禁止攝影機縮放或逐步顯現（Step-by-step reveal）；第 0 幀就是完整架構，流動的是系統狀態而非裝飾。
2. **跨元件數值唯一真實性**：Log 中印出的數字必須與進度條上的數字一致，觸發器亮起時與 Log 提到的名稱完全同步，杜絕前後矛盾。
3. **嚴格標註原作者版權**：凡是復刻社群公開圖表或訪談數據，必須在影片下方 `credit` 標註原作者與出處。
