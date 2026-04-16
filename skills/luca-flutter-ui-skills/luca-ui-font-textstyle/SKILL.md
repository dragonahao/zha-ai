---
name: luca-ui-font-textstyle
description: Luca UI 字体样式工具库，提供预定义的文本样式常量，方便在项目中统一管理和使用文本样式资源。WHEN USE 创建文本样式,WHEN USE 文本粗细设置
author:anhaoz
version: 1.0.0
---

# Luca 文本样式工具类说明文档

`LucaFontWeight` 和 `LucaTextStyle` 是项目中用于管理字体粗细和样式的核心工具类。它们通过预定义的常量和方法，确保了全项目文字表现的一致性，并针对不同操作系统进行了视觉优化。

## 1. LucaFontWeight (字体粗细管理)

该类定义了标准的字体粗细阶梯。特别地，它针对 **Medium** 权重进行了平台差异化处理，以达到跨平台视觉效果的一致。

### 权重映射表

| 方法名        | 对应权重值      | 说明                                                                                         |
| :------------ | :-------------- | :------------------------------------------------------------------------------------------- |
| `regular()`   | `w400`          | 标准/常规体。                                                                                |
| `medium()`    | `w500` / `w600` | **平台差异处理**：<br> - **Android**: 返回 `w500`<br> - **iOS/其他**: 返回 `w600` (SemiBold) |
| `semiBold()`  | `w600`          | 半粗体。                                                                                     |
| `bold()`      | `w700`          | 粗体。                                                                                       |
| `extraBold()` | `w800`          | 特粗体。                                                                                     |

> **设计说明**：在 iOS 上，系统字体的 `w500` 有时视觉感较弱，通过在 iOS 上将 `medium` 映射为 `w600`，可以使标题或重点文字在双端看起来同样醒目。

---

## 2. LucaTextStyle (样式构建工具)

`LucaTextStyle` 提供了快速生成 `TextStyle` 的静态方法。它默认配置了常用的字号和颜色，减少了样板代码。

### 常用参数

所有方法（`regular`, `medium`, `semiBold`, `bold`, `extraBold`）均接受以下可选参数：

- **`fontSize`**: 字体大小，默认值为 `14.0`。
- **`color`**: 字体颜色，默认值为 `Colors.black`。
- **`decoration`**: 文本装饰（如 `TextDecoration.underline`）。

### 方法示例

- **`LucaTextStyle.regular(...)`**: 使用 w400 权重。
- **`LucaTextStyle.medium(...)`**: 使用平台适配的中粗权重。
- **`LucaTextStyle.bold(...)`**: 使用 w700 权重。

---

## 3. 使用示例

### 基础用法

使用默认参数快速创建样式：

```dart
Text(
  "这是一段常规文字",
  style: LucaTextStyle.regular(),
)
```

### 自定义样式

指定字号、颜色和权重：

```dart
Text(
  "这是一份加粗标题",
  style: LucaTextStyle.bold(
    fontSize: 18.0,
    color: LucaColors.color009EDF,
  ),
)
```

### 平台适配的中粗体

在 Android 上会显示为 `w500`，在 iOS 上会显示为 `w600`：

```dart
Text(
  "中等粗细的文字",
  style: LucaTextStyle.medium(fontSize: 16.0),
)
```

### 带有装饰线的文字

```dart
Text(
  "查看详情",
  style: LucaTextStyle.regular(
    color: Colors.blue,
    decoration: TextDecoration.underline,
  ),
)
```

---

## 4. 注意事项

1.  **平台判断依赖**：`LucaFontWeight.medium()` 内部使用了 `Platform.isAndroid`。请确保该代码运行在移动端环境中，若在 Web 端运行，通常会走 `else` 分支返回 `semiBold`。
2.  **默认颜色**：默认颜色为 `Colors.black`。如果你的应用支持深色模式，建议在使用时手动传入适配深色模式的颜色，或在 `LucaTextStyle` 内部通过 `Theme.of(context)` 进一步扩展。
3.  **扩展性**：如果需要设置行高（`height`）或字间距（`letterSpacing`），目前需要手动 `.copyWith` 或扩展 `LucaTextStyle` 的方法参数。
