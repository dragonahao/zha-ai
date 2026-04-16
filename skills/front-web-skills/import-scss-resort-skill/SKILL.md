---
name: import-scss-resort-skill
description: 当需要调整文件中 导入'.scss'|'.less'|'.css'语句时使用
---
# 核心功能
- lazy组件放在导入之后
- less|scss放在lazy组件后面
- 调整文件中 '.scss'|'.less'|'.css' 语句的导入，放到最后一个导入
- 将 `import '.scss|.less|.css'` 语句重排到**放到最后一个导入,而不是最后一行,有lazy导入的组件,则放到lazy导入的组件后面**
- **没有lazy组件,则放到导入语句的最后面**
- **读取示例**：必需读取 references/sample.md

