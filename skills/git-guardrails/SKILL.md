---
name: git-guardrails
description: Git 防呆與安全防護欄協議。強制阻斷 AI 執行可能造成代碼丟失、歷史覆蓋或分支刪除的危險 Git 指令。當準備執行 Git 提交、推送、重置或分支操作時自動防禦。
---

# Git Guardrails（Git 安全防護欄協議）

> 「代碼丟失不可逆；嚴格阻斷高危指令，防範 AI 誤操作。」

本協議改寫自 Matt Pocock 之 Git 安全防護機制，旨在杜絕 AI 助理在終端機中誤跑高危險性的 Git 命令，保護開發者的代碼庫安全。

---

## 🚫 絕對禁止執行的危險 Git 命令（Zero-Tolerance Blacklist）

AI 在任何情況下，**絕對嚴禁主動執行**以下指令：

1. **強制推送（Force Push）**：
   - ❌ `git push --force`、`git push -f`
   - 理由：可能覆蓋遠端共享分支的他人提交。
2. **硬重置（Hard Reset）**：
   - ❌ `git reset --hard`
   - 理由：會徹底抹殺未提交的工作區與暫存區變更。若需取消修改，應優先使用 `git stash` 保留備份。
3. **未備份的強制清除（Force Clean）**：
   - ❌ `git clean -fd`、`git clean -f`
   - 理由：未受版本控管的新建檔案會被永久刪除。
4. **刪除遠端分支與標籤**：
   - ❌ `git push origin --delete <branch>`、`git push origin :<branch>`
5. **跳過鉤子檢查（Bypass Hooks）**：
   - ❌ `git commit --no-verify`、`git push --no-verify`
   - 理由：絕不能為了偷懶而繞過專案既有的安全與型別檢查門禁。

---

## 🛡️ 安全 Git 操作規範

當需要處理版本管理時，必須遵守以下安全路徑：
- **取消變更**：使用 `git stash push -m "backup-before-change"` 暫存備份，而非直接 drop 或 hard reset。
- **單一小步提交**：提交訊息必須清晰明確（遵循 Conventional Commits：`feat:`, `fix:`, `refactor:`），絕不使用無意義的 `update` 或 `fix bug`。
- **敏感資訊防護**：執行 `git add` 前，自動檢查 `git status`，嚴禁將 `.env`, `credentials`, `pem` 等含有機密的檔案納入暫存區。
