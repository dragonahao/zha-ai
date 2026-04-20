---
name: template-file-super
description: 根据模板文件创建文件
---

# 核心功能 ，按照下面的步骤与用户交互

1.**第一步(提供菜单)**: 询问用户选择创建文件的类型，并提供相应的选项[1.文件类型菜单]。

2.**第二步(选择菜单)**: 等待用户输入菜单编号，记录在变量`menuSelection`中。

3.**第三步(输入文件路径)**: 根据用户选择的类型，询问用户输入文件路径和名称，并将输入的路径存储在变量`rootpath`，`filepath`中。

4.**第四步(创建文件)**: 根据下文的 [2.处理逻辑定义] 执行具体任务。

## 路径解析
- **路径与处理**：识别用户输入的相对路径或绝对路径
- 用户输入一个路径时需要解析为两部分
- 将"文件A" 放在变量 `rootpath`中
- 将"文件B" 放在变量 `filepath`中
- **rootpath**: 基准参考文件路径(用户输入中的"文件A")
- **filepath**: 目标创建路径(用户输入中的"文件B")
- 脚本会自动根据 `rootpath`和`filepath`创建文件

## 菜单定义

### 1. 文件类型菜单

- [A] Taro+scss
- [B] Taro+less
- [C] Dart+StatusfulWidget
- [D] TS+ToolTask

## 文件结构
- SKILL.md 所在目录: `{skill_path}`
- 脚本位置: `{skill_path}/scripts/create_taro_scss.py`
- 执行时需要先 cd 到 `{skill_path}`
  
## 2.处理逻辑定义

> ⚠️ **执行规则**: 脚本会自动在 `{rootpath}` 下根据 `filepath` 创建文件，无需额外询问基准文件路径。

- **若选择[A]**:
  - 执行脚本

```bash
  # 创建Taro组件和对应的scss文件
  python3 scripts/create_taro_scss.py "${rootpath}" "${filepath}"
```

- **若选择[B]**:
  - 执行脚本

```bash
  # 创建Taro组件和对应的less文件
  python3 scripts/create_taro_less.py "${rootpath}" "${filepath}"
```

- **若选择[C]**:
  - 执行脚本

```bash
  # 创建Dart文件和对应的StatusfulWidget类
  python3 scripts/create_dart_statusfulwidget.py "${rootpath}" "${filepath}"
```

- **若选择[D]**:
  - 执行脚本

```bash
  # 创建对应的工具任务typescript文件
  python3 scripts/create_ts_tool_task.py "${rootpath}" "${filepath}"
```