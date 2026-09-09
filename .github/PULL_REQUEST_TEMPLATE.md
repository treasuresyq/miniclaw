# Pull Request 模板 / Pull Request Template

## 📌 改动概述 / Summary

<!-- 一两句话说清楚 PR 改了什么、解决哪个 Issue -->

- 关联 Issue: #

## 🧩 改动类型 / Type of change

请勾选（多选）：

- [ ] 🐞 Bug 修复 (non-breaking)
- [ ] ✨ 新功能 / 新接口 (non-breaking)
- [ ] 💥 破坏性改动 (会影响现有 API / 配置，需在 CHANGELOG 中标记)
- [ ] 📚 仅文档改动
- [ ] 🧪 仅测试 / CI 改动
- [ ] ♻️ 重构（不改行为）

## 📂 涉及文件 / Affected modules

<!-- 把改动的关键文件列一下，方便 reviewer 重点 review -->

- `src/...`
- `web/...`
- `electron/...`
- `config/...`
- `docs/...`

## ✅ 自测清单 / Self-test checklist

提交前请按本仓库的 `Makefile` / `package.json` 自测以下命令：

- [ ] `npm run typecheck` — TypeScript 类型检查通过
- [ ] `npm test -- --run` — 单元测试通过
- [ ] `npm run format:check` — Prettier 格式检查通过
- [ ] `npm run docs:check` — 文档同步检查通过（如适用）
- [ ] 我已在本地跑通 `npm run dev` / `npm run desktop:dev` 验证改动生效
- [ ] 我已就改动对原有 ACL / 安全策略的影响做评估

## 🖼️ 截图 / 录屏（UI 改动必填）

<!-- UI / Web / Electron 截图；命令行改动截终端 -->

| 改动前 | 改动后 |
| --- | --- |
|  |  |

## ⚠️ 风险与注意事项 / Risks & notes

<!-- 例如：是否需要迁移数据、是否需要新环境变量、是否需要 NPM 发版 -->

- [ ] **是否需要新增环境变量**：否 / 是（变量名：____）
- [ ] **是否改变 CLI / API 接口**：否 / 是（说明：____）
- [ ] **是否需要更新文档**：否 / 是（已更新：____）
- [ ] **是否需要发版（npm / Docker / 桌面包）**：否 / 是

## 🔐 安全 / 隐私

- [ ] 我已检查未提交任何密钥、token、用户聊天内容
- [ ] 如涉及权限/ACL 改动，我已在 SECURITY.md / 权限模型文档同步
