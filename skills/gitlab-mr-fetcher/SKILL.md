---
name: gitlab-mr-fetcher
description: 拉取 GitLab Merge Request (MR) 的詳情與變更內容。當使用者提供 GitLab MR 連結、或提供 MR ID 與專案 ID 時，觸發此技能來獲取 MR 上下文（Context）。
---

# GitLab MR Fetcher

此技能專注於從 GitLab API 抓取 Merge Request 的完整資料，包括標題、描述以及代碼變更（Diff），並將其作為對話上下文供後續分析或審核使用。

## 核心流程

1. **識別輸入**：辨識使用者提供的 GitLab MR 網址或 (MR ID + Project ID)。
2. **抓取資料**：執行內建腳本獲取 MR 詳情。
3. **注入上下文**：將抓取到的 MR 標題、描述與代碼變更（Diff）作為當前對話的 Context，並呈現清晰摘要。

## 使用方式

### 1. 透過 URL 觸發
當使用者輸入類似 `https://gitlab.com/group/project/-/merge_requests/123` 時：
- 執行腳本：`node scripts/fetch_mr.cjs <MR_URL>`
- 腳本路徑：`skills/gitlab-mr-fetcher/scripts/fetch_mr.cjs`

### 2. 透過 ID 觸發
當使用者提供 MR ID 且已在環境變數中設定好 `GITLAB_PROJECT_ID` 時：
- 執行腳本：`node scripts/fetch_mr.cjs <MR_ID> <PROJECT_ID>`

## 環境變數要求

在使用此技能前，請確保已設定以下環境變數：
- `GITLAB_TOKEN`: GitLab 的 Personal Access Token (需具備 API 讀取權限)。
- `GITLAB_HOST`: (選填) GitLab 伺服器位址，預設為 `https://gitlab.com`。

## 資料呈現規範

抓取資料成功後，請遵循以下步驟：
1. 輸出 MR 基本資訊（標題、作者、來源/目標分支、描述）。
2. 列出異動檔案清單與變更統計。
3. 確認 Diff 內容已成功注入對話上下文，供使用者後續自由調用（如進行問答、自訂審查或搭配其他工具）。
