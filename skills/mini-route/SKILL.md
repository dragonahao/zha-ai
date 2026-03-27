---
name: mini-route
description: 根据文件名称创建文件和路由
---

# 核心功能

- 解析用户输入中的文件路径，创建对应的文件和路由
- **用户输入**: 利用mini-route技能，在"文件A"中创建"文件B"

## 解读文件路径

- 将"文件A" 放在变量 `rootpath`中
- 将"文件B" 放在变量 `filepath`中
- 执行脚本，分析结果分配到 `parentPath`,`fileName`,`subpackageRoot`, `subpackageFileName`

```bash
# 创建文件
python3 scripts/mini-route.py  `${rootpath}` `${filepath}`
```


