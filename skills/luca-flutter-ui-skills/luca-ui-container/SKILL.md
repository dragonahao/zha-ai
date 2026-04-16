---
name: luca-ui-container
description: Luca UI 基础容器组件(LucaContainerWidget)，基于 Flutter 原生 Container 封装，优化了样式属性的传参方式，支持圆角、边框、阴影,渐变等常用装饰效果，并提供了裁剪功能，确保子组件能够按照容器的形状进行显示。WHEN USE 创建基础容器
---

# LucaContainerWidget 组件说明文档

`LucaContainerWidget` 是一个多功能容器组件。它封装了 Flutter 原生的 `Container` 和 `BoxDecoration`，将常用的装饰属性（如圆角、边框、阴影、渐变）直接提取到顶层构造函数中。

## 1. 功能特性

- **装饰属性扁平化**：无需手动编写 `decoration: BoxDecoration(...)`，直接通过组件参数设置圆角、边框、阴影等。
- **布局增强**：完整保留了 `Container` 的布局能力，包括内外边距（Padding/Margin）、对齐（Alignment）和尺寸控制。
- **裁剪支持**：通过 `clipBehavior` 属性，可以轻松实现子组件按容器圆角进行裁剪的效果。
- **渐变支持**：内置线性渐变（`LinearGradient`）快捷入口。

## 2. 参数定义

### 布局与尺寸

| 参数           | 类型                  | 说明                                                                            |
| :------------- | :-------------------- | :------------------------------------------------------------------------------ |
| `width`        | `double?`             | 容器宽度。                                                                      |
| `height`       | `double?`             | 容器高度。                                                                      |
| `padding`      | `EdgeInsetsGeometry?` | 内边距，控制内容与边缘的距离。                                                  |
| `margin`       | `EdgeInsetsGeometry?` | 外边距，控制容器与其他组件的距离。                                              |
| `alignment`    | `AlignmentGeometry?`  | 子组件在容器内的对齐方式（如 `Alignment.center`）。                             |
| `clipBehavior` | `Clip`                | 裁剪行为，默认为 `Clip.none`。若有圆角且子组件溢出，建议设为 `Clip.antiAlias`。 |

### 装饰样式 (Decoration)

| 参数             | 类型               | 说明                       |
| :--------------- | :----------------- | :------------------------- |
| `color`          | `Color?`           | 背景颜色。                 |
| `borderRadius`   | `BorderRadius?`    | 容器圆角半径。             |
| `border`         | `BoxBorder?`       | 边框样式（颜色、粗细等）。 |
| `boxShadow`      | `List<BoxShadow>?` | 阴影效果列表。             |
| `linearGradient` | `LinearGradient?`  | 背景渐变效果。             |

### 内容

| 参数    | 类型      | 说明                 |
| :------ | :-------- | :------------------- |
| `child` | `Widget?` | 容器内嵌套的子组件。 |

---

## 3. 设计优势

在原生 Flutter 中，如果你想同时设置 `color` 和 `decoration`，代码会报错，必须将颜色移入 `BoxDecoration`。`LucaContainerWidget` 在内部自动处理了这种逻辑：

```dart
// 内部实现逻辑
decoration: BoxDecoration(
  color: color,       // 颜色自动归位
  borderRadius: borderRadius,
  border: border,
  gradient: linearGradient,
  boxShadow: boxShadow,
),
```

这使得代码编写更加直观，减少了嵌套层级。

---

## 4. 使用示例

### 场景 A：带阴影和圆角的卡片

```dart
LucaContainerWidget(
  width: double.infinity,
  padding: EdgeInsets.all(16),
  color: Colors.white,
  borderRadius: BorderRadius.circular(12),
  boxShadow: [
    BoxShadow(
      color: Colors.black.withOpacity(0.1),
      blurRadius: 10,
      offset: Offset(0, 4),
    ),
  ],
  child: Text("这是一张卡片"),
)
```

### 场景 B：渐变背景按钮容器

```dart
LucaContainerWidget(
  width: 200,
  height: 50,
  alignment: Alignment.center,
  borderRadius: BorderRadius.circular(25),
  linearGradient: LinearGradient(
    colors: [Colors.blue, Colors.purple],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  ),
  child: Text("渐变按钮", style: TextStyle(color: Colors.white)),
)
```

### 场景 C：带边框的圆形头像容器

```dart
LucaContainerWidget(
  width: 80,
  height: 80,
  borderRadius: BorderRadius.circular(40),
  border: Border.all(color: Colors.blue, width: 2),
  clipBehavior: Clip.antiAlias, // 确保子图片被裁剪成圆形
  child: Image.network("https://example.com/avatar.jpg", fit: BoxFit.cover),
)
```

---

## 5. 注意事项

1.  **颜色与渐变**：如果同时设置了 `color` 和 `linearGradient`，渐变色通常会覆盖纯色背景。
2.  **裁剪失效问题**：如果你设置了 `borderRadius` 但发现子组件（如图片）仍然显示为直角，请务必将 `clipBehavior` 设置为 `Clip.antiAlias` 或 `Clip.hardEdge`。
3.  **性能提示**：过多的 `boxShadow` 或复杂的裁剪操作可能会在低端设备上影响滚动性能，请适度使用。
