---
name: luca-flutter-ui-skills
description: 这是 Luca Flutter UI 技能库的总目录文档，包含了所有 UI 组件技能的概览和使用指南。每个技能模块都在其子目录下有详细的 `SKILL.md` 文档，介绍了功能特性、参数定义、使用示例等内容。WHEN USE 构建flutter相关的ui
---

# 🚀 Luca Flutter UI 技能总库 (Main Index)

欢迎来到 Luca UI 技能库。这是一个原子化驱动的 Flutter 组件仓库，每个目录代表一个独立的 UI 技能模块。

## 🧭 技能地图 (Routing)

点击下方链接可跳转至具体技能的详细说明书：

| 技能模块                | 核心职责                                     | 详细文档                                  |
| :---------------------- | :------------------------------------------- | :---------------------------------------- |
| 🚨 **Alert Dialog**     | 居中/底部弹窗样式容器，支持返回拦截          | 查看`./luca-ui-alert-dialog/SKILL.md`     |
| 🔘 **Buttons**          | 包含填充、边框、文本、表单等多种状态按钮     | 查看 `./luca-ui-buttons/SKILL.md`         |
| 🎨 **Color**            | 十六进制颜色解析工具及项目标准色库           | 查看 `./luca-ui-color/SKILL.md`           |
| 📦 **Container**        | 装饰属性扁平化的基础容器组件                 | 查看 `./luca-ui-container/SKILL.md`       |
| ✍️ **Font & TextStyle** | 跨平台字重适配与标准文本样式预设             | 查看 `./luca-ui-font-textstyle/SKILL.md`  |
| 🔢 **Input Formatter**  | 手机号、身份证等常见表单输入过滤规则         | 查看 `./luca-ui-input-formatter/SKILL.md` |
| 📜 **Layout Scroller**  | 三段式（头中尾）滚动布局架子                 | 查看 `./luca-ui-layout-scroller/SKILL.md` |
| ⏳ **Loading**          | 全局加载状态管理，内置超时自愈逻辑           | 查看 `./luca-ui-loading/SKILL.md`         |
| 🔤 **Text**             | 基础文本封装，处理 null 值与溢出             | 查看 `./luca-ui-text/SKILL.md`            |
| 🎬 **Video**            | 路由感知的视频播放组件（离开暂停，回来播放） | 查看 `./luca-ui-video/SKILL.md`           |

---


## 1. 外部依赖项

在你的 `pubspec.yaml` 中添加以下插件（部分组件强制要求）:

```yaml
dependencies:
  ui_package:
    git:
      url: https://git.lucahealthcare.cn/native-app/flutter/luca_flutter_repos.git
      path: packages/ui_package
```

### 2. 全局初始化

在 `main.dart` 的 `MaterialApp` 中注入以下配置：

```dart
MaterialApp(
  builder: LucaLoading.init(), // 初始化全局 Loading
  navigatorObservers: [appRouteObserver], // 开启 Video 模块路由感知
)
```

---
