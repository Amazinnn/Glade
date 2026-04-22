# 开发流程规范

## 1. Git 工作流

**GitFlow** 分支模型：

```
main          ← 生产环境，稳定版本
  └─ develop   ← 开发集成分支
       └─ feature/xxx  ← 功能分支
       └─ fix/xxx      ← 修复分支
       └─ docs/xxx     ← 文档分支
```

- `main`：保护分支，只有发布时合并，不直接开发
- `develop`：集成分支，所有功能先合并到这里
- Feature/Fix/Docs 分支从 `develop` 拉取，完成后 PR 合并回 `develop`

## 2. Commit 规范

**Conventional Commits** 格式：

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**type 类型：**

| type | 说明 |
|------|------|
| `feat` | 新功能 |
| `fix` | 修复 bug |
| `docs` | 文档变更 |
| `style` | 代码格式（不影响功能） |
| `refactor` | 重构（不是修复也不是新功能） |
| `perf` | 性能优化 |
| `test` | 添加测试 |
| `chore` | 构建/工具变更 |

**示例：**
```
feat(cli): 添加 log new 命令

支持创建新日志并自动归档到 Markdown 文件

Closes #123
```

## 3. 分支命名规范

**格式：** `<type>/<short-description>`

- `feature/log-crud`
- `feature/ai-provider`
- `fix/event-list-crash`
- `docs/readme`

## 4. 实现流程

每个 Task 遵循：

```
创建分支 → 实现代码 → 自测 → 提交 → PR → 合并到 develop
```

1. 从 `develop` 创建 feature 分支
2. 实现代码，遵循 Conventional Commits
3. 本地测试通过
4. 提交并 push
5. 创建 PR 合并到 `develop`
6. Review 通过后合并

## 5. 分支管理

- **不要在 `main` 或 `develop` 上直接开发**，永远从新分支工作
- **保持分支短期存活**，功能完成立即合并，不要让分支落后太多
- **删除已合并分支**，保持仓库整洁

## 6. 代码规范

- TypeScript 严格模式
- 每个模块有明确的单一职责
- 外部可复用的逻辑抽取为独立函数/类
- 注释仅在 WHY 非 OBVIOUS 时添加

## 7. 测试策略

- 功能完成后手动验证
- 关键逻辑补充单元测试
- GUI 交互手动测试

## 8. 部署流程

- `main` 合并后打 tag：`v1.0.0`
- electron-builder 打包成 portable exe
- 发布到 release 目录