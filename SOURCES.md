# Skill 來源與授權

本 plugin 的 27 個 skill 多數改寫自開源專案，這份文件記錄各 skill 的出處。所有 skill 皆已完成資安審查與繁體中文在地化改寫。

## 來源倉庫

| 倉庫 | 授權 | 說明 |
|---|---|---|
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | MIT | 目前最大的 Agent Skill 開源目錄之一（約 47,000 Stars、2,478+ 個 `SKILL.md`），[線上目錄](https://aaskills.tech/)。匯集多位開發者成果 |
| [mattpocock/skills](https://github.com/mattpocock/skills) | 未於原清單記載 | Matt Pocock 的「真軟體工程」技能包：決策樹拷問、科學除錯、溝通急煞車、對話復盤 |
| [Dimillian/Skills](https://github.com/Dimillian/Skills) | 未於原清單記載 | Diff 審查流與批次重構編排 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | MIT | 出版級雜誌美學架構圖，42 種視覺模型，輸出自包含 HTML + inline SVG |
| [ythx-101/live-panel-skill](https://github.com/ythx-101/live-panel-skill) | MIT | 設定檔驅動的動態架構面板，可輸出 HTML 動畫或 H.264 MP4 |
| [amElnagdy/guard-skills](https://github.com/amElnagdy/guard-skills) | 未於原清單記載 | `clean-code-guard`、`docs-guard` |
| [263311487-ux/falsify](https://github.com/263311487-ux/falsify) | 未於原清單記載 | 科學證偽協議（經由 agentic-awesome-skills 取得） |
| [LambdaTest/agent-skills](https://github.com/LambdaTest/agent-skills) | 未於原清單記載 | `vitest-skill` |

> 標示「未於原清單記載」的授權，請對照各倉庫的 LICENSE 確認後再對外散布。

## 全自動流水線

由本 plugin 自行整合下列原子技能而成，來源為各原子技能的出處。

| Skill | 調度的技能 |
|---|---|
| [`dev-flow`](skills/dev-flow/SKILL.md) | `grill-me`、`the-honoured-one`、`falsify`、`implement` / `tdd` / `swarm-executor`、`quality-guard`、`review-swarm` |
| [`doc-flow`](skills/doc-flow/SKILL.md) | `grill-me`、`wiki-onboarding` / `the-honoured-one`、`falsify`、`quality-guard` |
| [`review-flow`](skills/review-flow/SKILL.md) | `grill-me`、`gitlab-mr-fetcher`、`review-swarm`、`quality-guard` |
| [`debug-flow`](skills/debug-flow/SKILL.md) | `grill-me`（條件式）、`diagnosing-bugs`、`falsify`、`tdd`、`quality-guard` |

## 規劃型技能

| Skill | 來源 | 交棒給 |
|---|---|---|
| [`refactor-planner`](skills/refactor-planner/SKILL.md) | 整合 Mikado Method、Strangler Fig 等既有方法論（原清單未標註出處） | `dev-flow` |
| [`doc-scope`](skills/doc-scope/SKILL.md) | 自主研發 | `doc-flow` |

## 原子技能

### 需求溝通與思維對齊
| Skill | 來源 |
|---|---|
| [`grill-me`](skills/grill-me/SKILL.md) | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [`wait-what`](skills/wait-what/SKILL.md) | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [`falsify`](skills/falsify/SKILL.md) | [263311487-ux/falsify](https://github.com/263311487-ux/falsify)，經由 agentic-awesome-skills |

### 程式碼理解與架構探勘
| Skill | 來源 |
|---|---|
| [`the-honoured-one`](skills/the-honoured-one/SKILL.md) | [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) |
| [`wiki-onboarding`](skills/wiki-onboarding/SKILL.md) | [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) |
| [`wiki-qa`](skills/wiki-qa/SKILL.md) | [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) |

### 規格實作與並行施工
| Skill | 來源 |
|---|---|
| [`implement`](skills/implement/SKILL.md) | [mattpocock/skills](https://github.com/mattpocock/skills)，修正原版自動 commit 缺陷 |
| [`swarm-executor`](skills/swarm-executor/SKILL.md) | [Dimillian/Skills](https://github.com/Dimillian/Skills)（orchestrate-batch-refactor） |
| [`mermaid-expert`](skills/mermaid-expert/SKILL.md) | 改寫自 [sickn33/mermaid-expert](https://github.com/sickn33/agentic-awesome-skills)，並強化官方語法防爆規範 |
| [`diagram-design`](skills/diagram-design/SKILL.md) | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) |
| [`live-panel`](skills/live-panel/SKILL.md) | [ythx-101/live-panel-skill](https://github.com/ythx-101/live-panel-skill) |

### 測試驅動與科學排錯
| Skill | 來源 |
|---|---|
| [`diagnosing-bugs`](skills/diagnosing-bugs/SKILL.md) | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [`tdd`](skills/tdd/SKILL.md) | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [`frontend-tester`](skills/frontend-tester/SKILL.md) | 多技能融合改寫：e2e-testing-patterns、playwright-skill（[agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills)）與 vitest-skill（[LambdaTest/agent-skills](https://github.com/LambdaTest/agent-skills)） |

### 代碼審查與品質門禁
| Skill | 來源 |
|---|---|
| [`quality-guard`](skills/quality-guard/SKILL.md) | 雙核心融合改寫：clean-code-guard、docs-guard（[amElnagdy/guard-skills](https://github.com/amElnagdy/guard-skills)） |
| [`review-swarm`](skills/review-swarm/SKILL.md) | [Dimillian/Skills](https://github.com/Dimillian/Skills)，加上原生多代理蜂群強化 |
| [`review-and-simplify-changes`](skills/review-and-simplify-changes/SKILL.md) | [Dimillian/Skills](https://github.com/Dimillian/Skills) |
| [`gitlab-mr-fetcher`](skills/gitlab-mr-fetcher/SKILL.md) | 自主研發 |

### 安全與維運
| Skill | 來源 |
|---|---|
| [`git-guardrails`](skills/git-guardrails/SKILL.md) | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [`retro`](skills/retro/SKILL.md) | [mattpocock/skills](https://github.com/mattpocock/skills) |
| [`commit-craft`](skills/commit-craft/SKILL.md) | [sickn33/commit](https://github.com/sickn33/agentic-awesome-skills)，加上安全強化改寫 |
