---
name: diagram-design
description: "出版級資訊圖表與架構圖設計協議（Editorial Diagram Design）。專門產出獨立自包含 HTML + 內嵌純淨 SVG、支援 42 種視覺類型（架構圖、時序圖、狀態機、資料流、Wardley Map、Sankey 等）、無 Mermaid 粗糙破版壞味道、支援 draw.io / Mermaid / Excalidraw 逆向重繪。終端交談一律使用 ASCII/Unicode 框線圖預覽，實體輸出高質感 HTML 供瀏覽器開啟。快捷指令：/diagram-design。"
license: MIT
metadata:
  version: "2.6-localized"
---

# Diagram Design（出版級架構與資訊圖表設計協議）

> 「最高級的設計往往是刪除。每個節點都有存在意義，告別 Mermaid 粗糙跑版，以雜誌出版級美學呈現系統。」
> 本協議專門將複雜架構、系統流程與狀態演進轉化為**獨立自包含的 HTML + 內嵌純淨 SVG**。秉持 4/10 最佳視覺密度、語義與排版分離、以及嚴格終端環境友善原則（Terminal 輸出維持 ASCII/Unicode 框線圖，落盤交付高質感 HTML 供瀏覽器即時預覽）。

---

## 觸發時機

### 應主動啟動
- 使用者要求為專案、模組或技術文章繪製「高品質架構圖、資料流向圖、時序圖或系統狀態機」時
- 使用者提供現有粗糙的 Mermaid 程式碼塊、draw.io 或 Excalidraw 檔案，要求「重繪 / 美化為出版級圖表」時
- 需要產出可供簡報、技術文檔展示的單一獨立 HTML/SVG 圖檔時
- 使用者明確輸入快捷指令 `/diagram-design`

### 無需啟動（邊界約束）
- 終端機內日常問答的小型概念示意（直接輸出 **Wiretext / Unicode ASCII 框線圖**即可）
- 單純的二維資料或屬性條列（使用 Markdown 表格或清單更佳）
- 單一形狀或極度簡單的單行流程（直接以文字說明即可）

---

## 核心執行流程

```text
[1. 語義對齊] ➔ [2. 類別選型] ➔ [3. 終端框線預覽] ➔ [4. 獨立 HTML 實體落盤] ➔ [5. 品質門禁]
(提取核心意圖)   (42 種版型匹配)   (Unicode Box 圖確認)   (自包含 HTML+純淨 SVG)   (無腳本/無外鏈檢驗)
```

### 步驟 1：意圖與語義模式對齊（Semantic Pattern Alignment）
先決定「傳遞的行為與本質」，再決定版面。若資料涉及狀態演進、瓶頸佇列或權限邊界，優先對齊語義模式：
- **佇列瓶頸 / 扇入（Fan-in queue）** ➔ 對應 **Data flow**
- **階段框架與槽位（Stage framework）** ➔ 對應 **Process**
- **非結構化輸入轉結構化產物** ➔ 對應 **Data flow**
- **規則判斷與政策分歧** ➔ 對應 **Flowchart**
- **信任邊界與安全鋪路（Paved road）** ➔ 對應 **Architecture**
- **生命週期狀態與重試轉移** ➔ 對應 **State machine**

### 步驟 2：視覺類別選型（Visual Type Selection）
從 42 種視覺類型（詳見後文速查表）中挑選最契合的版型。遵守「**刪除法則**」：
- 目標視覺密度保持在 **4/10**。
- 每個節點代表獨立概念；總是繫在一起的兩個節點應合併為一個。
- 焦點強調色（`accent`）最多用於 **1–2 個關鍵節點**，嚴禁全圖花花綠綠。
- 節點數量上限：單圖最多 **9 個節點**、**12 條箭頭連線**。若超過複雜度上限，拆分為「全覽概觀（Overview） + 細節展開（Detail）」。

### 步驟 3：終端機安全速覽（Terminal ASCII Preview Gate）
- **終端機輸出防線**：在 CLI / Terminal 對話中，**絕對禁止**直接貼上未經渲染的原始 SVG 或容易跑版的 Mermaid 語法。
- 主動使用 **Unicode / ASCII 框線圖（Wiretext）** 在終端機向使用者展示結構概要、節點與流向，確認版型與邏輯無誤。

### 步驟 4：實體自包含 HTML 檔案落盤（Stand-alone HTML Generation）
經確認後，將出版級圖表產出為**單一獨立的 `.html` 檔案**：
- **自包含零相依**：內嵌 CSS、純淨內嵌 SVG，無 npm build、無外部 JS、無外部圖片相依。
- **預設靜態安全**：預設輸出靜態向量圖；僅在使用者明確要求動態展示時引入純原生無相依的輕量控制邏輯。
- **色彩系統**：對齊 `references/style-guide.md`，使用專業色票（底紙 `paper`、墨水 `ink`、輔助 `muted`、焦點 `accent`）。
- **落盤路徑**：儲存於使用者指定專案目錄或 Obsidian 筆記目錄（如 `assets/diagrams/<name>.html`），並以 `file://` 點擊連結交付。

### 步驟 5：品質門禁檢驗（Pre-Output Taste Gate）
交付前自動檢驗：
1. **SVG 可存取性契約**：`<svg>` 具備 `role="img"`、前置 `<title>` 與 `<desc>`。
2. **正交連接線規範**：轉角一律為圓角直角（`r=8`），禁止斜線穿插；箭頭文字標籤具備底色遮罩，不與線條交疊。
3. **無 Mermaid 壞味道**：無粗劣陰影（Shadows）、無過度發光（Glow）、邊角圓角半徑不超過 6–10px。
4. **瀏覽器相容性**：提供適當的 `viewBox` 與水平滾動包裝（`overflow-x: auto`），在各種螢幕均能清晰閱讀。

---

## 42 種視覺圖表類型速查表（Visual Types Guide）

| 編號 | 分類領域 | 圖表類型 (Visual Type) | 適用情境與說明 | 參考指南 |
| :---: | :--- | :--- | :--- | :--- |
| **01** | **系統架構** | **Architecture** | 系統組件、服務連線與即時架構快照 | [type-architecture.md](references/type-architecture.md) |
| **02** | | **Architecture delta** | 系統重構前後（Before / After）拓撲對比與變更紀錄清單 | [type-architecture-delta.md](references/type-architecture-delta.md) |
| **03** | | **IT current-state** | 現有舊系統架構、部門分層與現代化前現狀 | [type-it-state.md](references/type-it-state.md) |
| **04** | | **High-Level** | 容器叢集上的端到端完整數據技術棧架構 | [type-high-level.md](references/type-high-level.md) |
| **05** | | **Deployment** | 部署拓撲、實體/虛擬節點、容器 Pods、連接埠與複本 | [type-deployment.md](references/type-deployment.md) |
| **06** | | **Layer stack** | 軟體分層抽象架構（UI ➔ Service ➔ Data） | [type-layers.md](references/type-layers.md) |
| **07** | **邏輯流程** | **Flowchart** | 條件分支決策邏輯與演算法路徑 | [type-flowchart.md](references/type-flowchart.md) |
| **08** | | **Sequence** | 物件/系統之間的時間序列訊息互動時序 | [type-sequence.md](references/type-sequence.md) |
| **09** | | **State machine** | 狀態機、轉移條件（Guards）與物件生命週期 | [type-state.md](references/type-state.md) |
| **10** | | **Process** | 多角色循序流程、數據交接與職責矩陣 | [type-process.md](references/type-process.md) |
| **11** | | **Swimlane** | 跨部門/跨職能的流程泳道圖與交付節點 | [type-swimlane.md](references/type-swimlane.md) |
| **12** | | **Loop / Flywheel** | 正向回饋迴圈、飛輪效應與共享狀態中心 | [type-loop.md](references/type-loop.md) |
| **13** | **資料模型** | **ER / Data model** | 實體關聯、欄位型別與資料表約束 | [type-er.md](references/type-er.md) |
| **14** | | **Database schema** | 實體資料庫 SQL 綱要、外鍵約束與索引 | [type-db-schema.md](references/type-db-schema.md) |
| **15** | | **Data flow** | 角色範圍的管道步驟、操作權限與資料流向 | [type-data-flow.md](references/type-data-flow.md) |
| **16** | | **Medallion** | 數據湖倉分層架構（Bronze ➔ Silver ➔ Gold） | [type-medallion.md](references/type-medallion.md) |
| **17** | | **DP integration** | 數據平台整合拓撲（來源 ➔ 核心處理 ➔ 下游消費者） | [type-dp-integration.md](references/type-dp-integration.md) |
| **18** | | **DP security matrix** | 各角色與組件的訪問授權與安全矩陣 | [type-dp-security-matrix.md](references/type-dp-security-matrix.md) |
| **19** | | **Sankey** | 流量分流與匯聚桑基圖（頻寬比例可視化） | [type-sankey.md](references/type-sankey.md) |
| **20** | **依賴組織** | **Dependency graph** | 模組依賴網、扇入扇出與循環依賴檢測 | [type-dependency.md](references/type-dependency.md) |
| **21** | | **Tree** | 樹狀父子階層結構與分解關係 | [type-tree.md](references/type-tree.md) |
| **22** | | **Nested** | 包含與作用域的嵌套階層關係 | [type-nested.md](references/type-nested.md) |
| **23** | | **Org chart** | 人員/Agent 權責、報告線與升級路徑 | [type-org-chart.md](references/type-org-chart.md) |
| **24** | | **UML class** | 物件導向類別、介面繼承、封裝與關聯 | [type-uml-class.md](references/type-uml-class.md) |
| **25** | **戰略時間** | **Wardley map** | 價值鏈演進地圖（自研 vs 採購戰略決策） | [type-wardley.md](references/type-wardley.md) |
| **26** | | **User journey** | 使用者旅程地圖與各階段感受體驗 | [type-journey.md](references/type-journey.md) |
| **27** | | **Story map** | 敏捷用戶故事地圖與發布切線（Cut line） | [type-story-map.md](references/type-story-map.md) |
| **28** | | **Kanban** | 在製品狀態、WIP 限制與阻塞項目看板 | [type-kanban.md](references/type-kanban.md) |
| **29** | | **Timeline** | 時間軸上的事件序列與關鍵里程碑 | [type-timeline.md](references/type-timeline.md) |
| **30** | | **Gantt** | 甘特圖專案排程與任務相依時程 | [type-gantt.md](references/type-gantt.md) |
| **31** | **根因矩陣** | **Fishbone** | 根因分析魚骨圖（Root-Cause Analysis / Ishikawa） | [type-fishbone.md](references/type-fishbone.md) |
| **32** | | **Quadrant** | 二維四象限定位與優先級矩陣（2x2） | [type-quadrant.md](references/type-quadrant.md) |
| **33** | | **Radar / Spider** | 多維度量化評估雷達圖 | [type-radar.md](references/type-radar.md) |
| **34** | | **Polar chart** | 極座標圓形圖表（角度=類別，半徑=量級） | [type-polar.md](references/type-polar.md) |
| **35** | | **Venn** | 集合交集文氏圖 | [type-venn.md](references/type-venn.md) |
| **36** | | **Pyramid / Funnel** | 金字塔階層或轉化漏斗圖 | [type-pyramid.md](references/type-pyramid.md) |
| **37** | **數據分析** | **Bar chart** | 跨類別量化對比長條圖 | [type-bar.md](references/type-bar.md) |
| **38** | | **Waterfall** | 瀑布圖（起始總額到結尾總額的增減過渡） | [type-waterfall.md](references/type-waterfall.md) |
| **39** | | **Treemap** | 矩形樹狀圖（整體與部分的面積比例） | [type-treemap.md](references/type-treemap.md) |
| **40** | | **Heatmap** | 交叉製表熱力圖（顏色深度代表數值） | [type-heatmap.md](references/type-heatmap.md) |
| **41** | | **Line chart** | 連續趨勢折線圖、坡度圖（Slopegraph）與山脊圖 | [type-line.md](references/type-line.md) |
| **42** | | **Scatter plot** | 二維/三維散佈圖（氣泡圖 Bubble 與蜂群圖 Beeswarm） | [type-scatter.md](references/type-scatter.md) |

---

## 既有圖表逆向重繪規範（Import & Redraw）

當使用者提供既有的圖表來源（如 Markdown 中的 Mermaid 區塊、`.drawio` 或 `.excalidraw` 檔案）要求美化時：
1. **提取語義結構，絕非像素搬運**：
   - 執行本技能內建的抽取工具（位於 `scripts/`）：
     - Mermaid: `python3 scripts/mermaid_extract.py <input>`
     - Draw.io: `python3 scripts/drawio_extract.py <input>`
     - Excalidraw: `python3 scripts/excalidraw_extract.py <input>`
   - 提取節點、關聯、方向與分組，丟棄粗糙的自動座標、奇怪配色與雜訊字型。
2. **重繪為 Editorial 風格**：依據本協議之排版美學、正交線條與焦點色原則全新繪製。
3. **主動回報保真度紀錄（Fidelity Ledger）**：清楚說明在重繪過程中合併了哪些重複節點、精簡了哪些次要連線。

---

## 資安防護與邊界（Security Safeguards）

1. **零外部網路連線與機密讀取封鎖**：
   - 未經使用者明確授權前，絕對不主動對外部網址發送爬蟲或 HTTP 請求。
   - 嚴格禁止讀取專案內的 `.env*`、私密金鑰（`*.pem`, `*.key`）或 Token 檔案作為圖表資料來源。
2. **寫入安全與無破壞保證**：
   - 實體 HTML/SVG 輸出僅能寫入使用者明確授權的路徑或標準產物目錄（如 `assets/diagrams/`、`docs/` 或 Obsidian Vault 筆記資料夾）。
   - 嚴禁覆寫任何現有專案原始代碼或重要設定檔。
3. **終端機輸出防禦**：
   - 禁止在終端直接噴出大段無效的 SVG 代碼或易損壞終端版面的語法，終端速覽一律採用 ASCII / Unicode 框線圖。

---

## 鐵則（Iron Rules）

1. **終端一律 ASCII，落盤一律 HTML**：聊天對話視窗僅以 Unicode / ASCII 框線圖提供精確速覽；完整出版級圖表一律輸出為自包含 HTML 檔案供瀏覽器開啟。
2. **嚴格遵守 4/10 密度與單焦點原則**：不堆砌無效節點，每圖強調色（Accent）上限 2 處，以清晰傳遞架構本質為唯一目標。
3. **零外部 JS/CSS 依賴**：產出的 HTML 必須能完全離線、在任何現代瀏覽器中即開即讀，拒絕粗製濫造的圖表壞味道。
