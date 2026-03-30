---
name: mini-route
description: 微信小程序路由与文件自动创建工具
---

# 核心功能

- 解析用户输入中的文件路径，创建对应的文件和路由
- 当用户发出“在[文件A]中创建[文件B]”或类似指令时,触发此技能

# 输入参数
- **rootpath**: 基准参考文件路径(用户输入中的"文件A")
- **filepath**: 目标创建路径(用户输入中的"文件B")

# 处理逻辑
## 解读文件路径
- **路径与处理**：识别用户输入的相对路径或绝对路径
- 将"文件A" 放在变量 `rootpath`中
- 将"文件B" 放在变量 `filepath`中
- **执行脚本**，分析结果分配到 `parentPath`,`fileName`,`subpackageRoot`, `subpackageFileName`

```bash
# 创建文件
python3 scripts/mini-route.py  "${rootpath}" "${filepath}"
```


