---
name: template-file-super
description: 根据模板文件创建文件
---

# 核心功能 ，按照下面的步骤与用户交互

1.**第一步(提供菜单)**: 询问用户选择创建文件的类型，并提供相应的选项[1.文件类型菜单]。

2.**第二步(选择菜单)**: 等待用户输入菜单编号，记录在变量`menuSelection`中。

3.**第三步(输入文件路径)**: 根据用户选择的类型，询问用户输入文件路径和名称，并将输入的路径存储在变量`rootpath`，`filepath`中。

4.**第四步(创建文件)**: 根据下文的 [2.处理逻辑定义] 执行具体任务。

## 菜单定义

### 1. 文件类型菜单

- [A] Taro+scss
- [B] Taro+less
- [C] Dart+StatusfulWidget

## 2.处理逻辑定义

- **若选择[A]**:
  - 执行脚本

```bash
  # 创建Taro组件和对应的scss文件
  python3 create_taro_scss.py `${rootpath}` `${filepath}`
```

- **若选择[B]**:
  - 执行脚本

```bash
  # 创建Taro组件和对应的less文件
  python3 create_taro_less.py `${rootpath}` `${filepath}`
```

- **若选择[C]**:
  - 执行脚本

```bash
  # 创建Dart文件和对应的StatusfulWidget类
  python3 create_dart_statusfulwidget.py `${rootpath}` `${filepath}`
```
