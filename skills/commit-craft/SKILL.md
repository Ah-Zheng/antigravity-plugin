---
name: commit-craft
description: Conventional Commit 提交訊息專家。自動檢視暫存區變更（git diff --cached），分析變更意圖與影響模組，產出符合 Conventional Commits 規範之結構化 Commit 訊息，具備機密攔截與保護分支安全防護，經使用者確認後方可執行提交。當需要撰寫 Commit 訊息、提交代碼或執行 git commit 時觸發。
---

# Conventional Commit 提交訊息專家 (Commit Craft)

> 「提交即文檔，意圖勝於代碼；小步安全遞進，杜絕粗製濫造。」
> 本協議為高品質 Git Commit 的標準專家。專門協助工程師分析暫存變更（Staged Changes），自動推導影響範疇（Scope）與動機，產出符合業界最高標準的 Conventional Commits 訊息，並在嚴格的資安與分支安全門禁把關下執行安全提交。

---

## 觸發時機與快捷指令
- 快捷指令：**`/commit-craft`**
- 開發或重構完成，準備將變更提交進版本控制時
- 需要為當前修改起草標準 Conventional Commit 訊息時
- 當使用者提及「幫我 commit」、「產生 commit message」、「提交修改」時

---

## 核心執行流程（四步 SOP）

```mermaid
flowchart TD
    P1["1. 狀態與機密檢驗<br>(git status & diff 審計)"] --> P2["2. 意圖分析與規格推導<br>(Conventional Commits)"]
    P2 --> P3["3. 產出結構化 Commit 草案<br>(雙語選項 / 推薦答案)"]
    P3 --> P4["4. 授權確認與安全提交<br>(確認後執行 commit，絕不 push)"]
```

---

### 第一步：狀態檢驗與資安審計 (Status & Secret Audit)

在撰寫 Commit 訊息前，強制執行以下防禦檢查：

1. **分支安全檢查**：
   - 執行 `git branch --show-current` 確認當前分支。
   - ⚠️ **保護分支警戒**：若當前處於 `main` 或 `master` 分支，主動發出提醒，詢問是否需先建立 Feature Branch，防止直接污染主幹。
2. **暫存區狀態檢驗**：
   - 檢查 `git status -s`。若暫存區（Staged）為空，但工作區有未暫存修改，主動提示並建議加入暫存的檔案清單。
3. **🚨 機密外洩阻斷門禁（Zero Leak Gate）**：
   - 檢查 `git diff --cached` 內容，嚴禁提交任何包含敏感機密（如 `.env*`、JWT Secret、API Key、私鑰憑證、密碼、Production Token）的檔案！
   - 一旦發現敏感檔案被加入暫存，**立即中斷提交流程並發出高危告警**。

---

### 第二步：意圖分析與規格推導 (Intent Analysis)

基於 `git diff --cached` 實際修改內容，依據 **Conventional Commits 1.0.0** 規範自動推導結構：

```text
<type>(<scope>): <subject>

<why & what: 說明變更動機、核心行為與前後差異>

<footer> (關聯 Issue 或重大變更聲明)
```

#### 1. Type 類型定義（嚴格遵循業界標準）
| Type | 適用情境 | 範例 |
| :--- | :--- | :--- |
| `feat` | 新增功能或業務模組 | `feat(auth): 新增 Google OAuth 第三方登入` |
| `fix` | 修復程式碼 Bug 或異常行為 | `fix(cart): 修復折扣碼計算浮點數精度誤差` |
| `refactor`| 代碼重構（既不修復 Bug 也不新增功能） | `refactor(user): 將 Options API 遷移至 Composition API` |
| `perf` | 提升效能、降低記憶體或優化載入速度 | `perf(table): 導入虛擬滾動降低 DOM 節點數量` |
| `test` | 新增或修正測試（單元、E2E、整合測試） | `test(e2e): 新增購物車結帳流程之 Playwright 測試` |
| `docs` | 僅修改文件、註解或說明檔 | `docs(readme): 更新本地開發環境啟動指南` |
| `style` | 不影響代碼邏輯的排版、空格或格式調整 | `style(components): 修正 Prettier 代碼排版格式` |
| `chore` | 建置工具、依賴套件升級或輔助工具變更 | `chore(deps): 升級 vite 至 6.0 版本` |

#### 2. Scope 範圍推導
- 自動根據修改的目錄或元件推導出最小合理範圍（如 `auth`, `cart`, `checkout`, `router`, `store`, `ui`）。

#### 3. Subject 標題鐵律
- 以動詞開頭、簡明扼要、現在式。
- 句尾**絕對不加句號**。
- 長度嚴格限制在 50~72 字元以內。

#### 4. Body 說明內容
- 著重在 **Why（為什麼要改）** 與 **What（改了什麼行為）**，而非重複敘述「How（怎麼寫）」。
- 說明修改動機與變更前後的行為差異。

---

### 第三步：草案輸出與選項展示 (Draft Presentation)

分析完畢後，向使用者輸出結構清晰的 Commit 草稿卡：

```text
📝 [COMMIT-CRAFT] 提交訊息草案

🎯 分支：feature/user-auth
📁 變更檔案：3 個檔案（+45, -12）

【推薦草案 - 繁體中文】：
--------------------------------------------------
feat(auth): 新增 JWT Token 自動無感刷新機制

當 Access Token 過期回傳 401 時，透過 Axios 攔截器自動使用 Refresh Token
請求新憑證並無感重發原始請求，避免使用者強制跳出登入頁。

Refs #42
--------------------------------------------------

【備選草案 - 英文版】：
--------------------------------------------------
feat(auth): add silent JWT token refresh mechanism

Implement Axios response interceptor to catch 401 errors and exchange
refresh token for a new access token, preventing disruptive session timeouts.

Refs #42
--------------------------------------------------
```

---

### 第四步：授權確認與安全提交 (Execution Gate)

向使用者確認草案並提供明確行動指令：

> 💡 **確認行動**：
> - 回覆 **「確認提交」** 或 **「1」** ➔ 執行繁中版 `git commit`。
> - 回覆 **「英文提交」** 或 **「2」** ➔ 執行英文版 `git commit`。
> - 若需微調，可直接指定修改（例如：「將 scope 改為 login」）。

#### 🛡️ 安全鐵律（Iron Rules）
1. **未經確認絕不 commit**：只有在使用者明確回覆確認後，方可呼叫命令執行提交。
2. **絕對嚴禁自動 push**：提交完成後，輸出提交成功訊息與 commit hash，**永遠禁止私自執行 `git push`**，最終推送權歸使用者所有。
3. **杜絕空洞 Commit**：嚴禁產出 `update`、`fix bug`、`wip` 等無意義訊息。
