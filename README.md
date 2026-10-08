# antigravity-plugin

一組工程協作用的 Antigravity Skills，共 27 個：4 條全自動流水線、2 個規劃型技能，以及 21 個單一用途的原子技能。

## 安裝

```bash
# 從 GitHub
agy plugin install https://github.com/Ah-Zheng/antigravity-plugin

# 從本機目錄
agy plugin install ./antigravity-plugin

agy plugin list
```

使用時輸入 `/<skill 名稱>`，例如 `/dev-flow`；也可以直接用自然語言描述需求，agent 會依 skill 的 `description` 自動判斷是否載入。

## 我該用哪個？

| 我想要…                        | 用這個                          |
| ------------------------------ | ------------------------------- |
| 開發新功能、重構模組           | `dev-flow`                      |
| 修 Bug、查疑難雜症             | `debug-flow`                    |
| 審查 Diff 或 GitLab MR         | `review-flow`                   |
| 產出架構說明、技術文件         | `doc-flow`                      |
| 專案很大，不知道文件從哪開始寫 | `doc-scope` → `doc-flow`        |
| 大型重構、跨框架遷移的規劃     | `refactor-planner` → `dev-flow` |
| AI 講太多、太抽象              | `wait-what`                     |

## 全自動流水線（Flows）

把下面的原子技能串成一條龍，多數會先用 `grill-me` 對齊需求再動手。

| Skill         | 流程                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------ |
| `dev-flow`    | 需求對齊 → 脈絡取證 → 證偽 → 實作（`implement` / `tdd` / `swarm-executor`）→ 品質門禁 → 自我審查 |
| `debug-flow`  | 建立紅燈迴圈 → 最小重現 → 假說證偽 → 標籤打點 → 抗回歸修復 → 清理與品質門禁                      |
| `review-flow` | 需求對齊 → 取得 Diff 或 MR → 四維度唯讀審查 → 品質門禁 → 報告落盤與行動分流                      |
| `doc-flow`    | 需求對齊 → 範圍分流 → 決策證偽 → 編寫 → 真實性門禁 → 授權落盤                                    |

## 規劃型技能（只產出計畫，不動手）

| Skill              | 用途                                                  | 交棒給     |
| ------------------ | ----------------------------------------------------- | ---------- |
| `refactor-planner` | 架構審計、遷移策略、Mikado 依賴圖、拆成互斥的任務封包 | `dev-flow` |
| `doc-scope`        | L0 全景圖、文件優先順序、每輪範圍與完成標準           | `doc-flow` |

## 原子技能

### 需求溝通與思維對齊

| Skill       | 用途                                   |
| ----------- | -------------------------------------- |
| `grill-me`  | 決策樹式需求拷問，每題附推薦答案       |
| `wait-what` | AI 太囉嗦或太抽象時，強制改用白話重述  |
| `falsify`   | 下結論前先主動找反例，避免憑感覺下判斷 |

### 程式碼理解

| Skill              | 用途                                   |
| ------------------ | -------------------------------------- |
| `the-honoured-one` | 動手前先做上下文審查，找出還沒讀的檔案 |
| `wiki-onboarding`  | 產出架構師版與新人版兩份專案導覽       |
| `wiki-qa`          | 依實際程式碼與行號回答問題             |

### 實作與並行施工

| Skill            | 用途                                         |
| ---------------- | -------------------------------------------- |
| `implement`      | 依 PRD / Issue / 驗收標準精確實作，不多做    |
| `swarm-executor` | 跨多模組的大規模修改，拆給多個子代理並行施工 |
| `mermaid-expert` | 繪製與修復 Mermaid 圖表                      |
| `diagram-design` | 產出出版級 HTML + SVG 架構圖                 |
| `live-panel`     | 把架構做成動態面板，可輸出 HTML 或 MP4       |

### 測試與除錯

| Skill             | 用途                                               |
| ----------------- | -------------------------------------------------- |
| `diagnosing-bugs` | 先建立能重現的紅燈迴圈，再推論根因                 |
| `tdd`             | 紅 → 綠 → 重構，以公開介面為契約                   |
| `frontend-tester` | Playwright E2E 與 Vitest + Vue Test Utils 元件測試 |

### 審查與品質

| Skill                         | 用途                                                 |
| ----------------------------- | ---------------------------------------------------- |
| `quality-guard`               | 交付前自我檢查：Clean Code、假資料、文件符號是否真實 |
| `review-swarm`                | 4 個唯讀子代理平行審查：行為、資安、效能、測試       |
| `review-and-simplify-changes` | 檢查 Diff 是否重複造輪子或過度複雜                   |
| `gitlab-mr-fetcher`           | 透過 GitLab API 拉取 MR 的 Diff 與描述               |

### 安全與維運

| Skill            | 用途                                                        |
| ---------------- | ----------------------------------------------------------- |
| `git-guardrails` | 阻擋 `push --force`、`reset --hard`、`clean -fd` 等危險指令 |
| `retro`          | 對話復盤，把踩過的坑固化成規則                              |
| `commit-craft`   | 檢視暫存區並產生 Conventional Commit 訊息，含機密攔截       |

## 選用設定

### Obsidian（`doc-flow`、`review-flow`）

預設不啟用。若要把文件或審查報告存進 Obsidian 筆記庫，先設定：

```bash
export OBSIDIAN_VAULT="$HOME/你的筆記庫路徑"
```

### GitLab（`gitlab-mr-fetcher`、`review-flow` 審查 MR 時）

```bash
export GITLAB_TOKEN="<你的 Personal Access Token>"
```

## 注意事項

- `commit-craft` 與 `git-guardrails` 內建作者的 git 習慣，團隊規範不同時請先閱讀 `SKILL.md` 再使用。
- 這些 skill 的文字以繁體中文撰寫。
- `swarm-executor`、`review-swarm` 依賴多代理（subagent）能力，需確認你的環境支援。

## 來源與授權
各 skill 的出處與改寫說明見 [SOURCES.md](SOURCES.md)。
