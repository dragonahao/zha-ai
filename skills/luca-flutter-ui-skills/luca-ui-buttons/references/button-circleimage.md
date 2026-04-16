这份是为你的 `LucaButtonImageWidget` 组件编写的 Markdown 说明文档。该组件是对 Flutter 原生 `IconButton` 的简单封装，主要用于提供统一命名的图标按钮。

---

# LucaButtonImageWidget 组件说明文档

`LucaButtonImageWidget` 是一个基于图标或图片的按钮组件。它封装了 Flutter 原生的 `IconButton`，旨在为应用提供一致的交互体验，适用于导航栏按钮、操作栏图标以及各类单纯以图标驱动的交互场景。

## 1. 功能特性

- **简单易用**：直接传递 `Widget` 类型的图标，支持 `Icon`、`Image` 或自定义 SVG 组件。
- **点击反馈**：继承自 `IconButton`，内置了标准的 Material Design 点击水波纹效果。
- **灵活样式**：支持快速设置图标的大小（`iconSize`）和颜色（`color`）。

## 2. 参数定义

| 参数 | 类型 | 是否必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `icon` | `Widget` | **是** | 按钮显示的图标组件。通常是 `Icon` 或 `Image`。 |
| `onPressed` | `VoidCallback` | **是** | 按钮点击后的回调函数。 |
| `iconSize` | `double?` | 否 | 图标的大小。如果设置，会覆盖图标组件自身的尺寸设定。 |
| `color` | `Color?` | 否 | 图标的颜色。主要用于填充 `Icon` 组件的颜色。 |

---

## 3. 核心优势

相比于直接使用原生 `IconButton`，在项目中使用 `LucaButtonImageWidget` 可以：
1. **命名统一**：遵循项目中 `Luca` 系列组件的命名规范，代码可读性更强。
2. **易于扩展**：如果未来需要全局修改图标按钮的点击效果或埋点逻辑，只需在该组件内部修改即可覆盖全项目。

---

## 4. 使用示例

### 基础用法（使用 Icon）
最常见的返回按钮或关闭按钮场景：
```dart
LucaButtonImageWidget(
  icon: const Icon(Icons.close),
  onPressed: () {
    Navigator.pop(context);
  },
)
```

### 自定义尺寸与颜色
```dart
LucaButtonImageWidget(
  icon: const Icon(Icons.favorite),
  iconSize: 32.0,
  color: Colors.red,
  onPressed: () {
    print("收藏成功");
  },
)
```

### 使用图片资产作为图标
如果你的图标是自定义的图片：
```dart
LucaButtonImageWidget(
  icon: Image.asset('assets/images/custom_icon.png'),
  onPressed: () {
    // 逻辑处理
  },
)
```

---

## 5. 注意事项

- **热区大小**：`IconButton` 默认有最小 48x48 像素的点击热区。如果你发现按钮周围有留白，这是为了符合人机交互规范。
- **颜色优先级**：如果你在 `icon` 参数中传入了 `Icon` 组件并设置了其 `color` 属性，同时又在 `LucaButtonImageWidget` 外部设置了 `color` 属性，外部属性通常会生效。
- **禁用状态**：虽然当前定义中 `onPressed` 是必填的，但如果传入 `null`（在修改代码允许的情况下），按钮将呈现禁用状态。在该组件目前的定义中，请确保传入有效函数。