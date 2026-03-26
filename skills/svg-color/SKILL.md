---
name: svg-color
description: 将 SVG 文件中的指定颜色替换为目标颜色。当用户需要批量或单个修改 SVG 颜色属性时调用。
version: 1.0.0
triggers:
  - svg-color
  - replace-svg-color
---

# 核心功能
- **颜色替换**：支持将 SVG 源代码中所有的 `fill`, `stroke`, `style` 等属性中的特定颜色值替换为新的颜色值。
- **目录支持**：支持传入目录路径，脚本将递归遍历目录下所有的 `.svg` 文件并进行处理。
- **批量处理能力**：脚本设计为可扩展支持多个颜色对。
- **不区分大小写**：自动识别并替换不分大小写的十六进制颜色值。

# 使用说明

## 脚本位置
脚本位于：`scripts/svg-color-replace.py`

## 命令格式
在终端中执行以下命令：

```bash
python3 .trae/skills/svg-color/scripts/svg-color-replace.py -i <输入文件> -color [<原颜色>,<目标颜色>]
```

## 参数说明
- `-i` / `--input`: **必需**。指定要处理的 SVG 文件路径。
- `-o` / `--output`: *可选*。指定保存的文件路径。如果不指定，将覆盖原文件。
- `-color`: **必需**。格式为 `[sourceColor,targetColor]`。例如 `[#FFFFFF,#000000]`。

# 示例
将 `icon.svg` 中的白色替换为红色：
```bash
python3 .trae/skills/svg-color/scripts/svg-color-replace.py -i icon.svg -color [#FFFFFF,#FF0000]
```
