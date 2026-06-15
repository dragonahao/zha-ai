---
name: claude-code-update-skill
description: When Use 检查claude-code是否有更新
---

# 1.当前版本

```shell
claude --version
```

# 2.检查新版本

- 最新的版本范围和摘要 ，需要显示出来

```shell
python3 scripts/summary-lastest.py
```

- 检查新版本

```shell
claude update
```

- 如果有新版本,执行[3.更新到新版本],如果当前版本在最新版本范围内,则不需要更新

# 3.更新到新版本

```shell
 brew upgrade
 brew upgrade claude-code
```
