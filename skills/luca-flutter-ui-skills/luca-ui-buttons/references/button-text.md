这份是为你的 `LucaButtonTextWidget` 组件编写的 Markdown 说明文档。

---

# LucaButtonTextWidget 组件说明文档

`LucaButtonTextWidget` 是一个轻量级的文本按钮组件。它通过封装 `InkWell`、`LucaContainerWidget` 和 `LucaTextWidget` 实现，旨在提供一个具有点击反馈（波纹效果）且易于控制布局和样式的文本点击区域。

## 1. 功能特性

- **点击反馈**：内置 `InkWell` 组件，点击时会有水波纹效果。
- **居中对齐**：内部文本默认在容器内居中（`Alignment.center`）。
- **高度封装**：集成了项目中自定义的容器（`LucaContainerWidget`）和文本（`LucaTextWidget`）组件，保持 UI 风格统一。
- **灵活布局**：支持手动指定按钮的宽度和高度。

## 2. 参数定义

| 参数 | 类型 | 是否必填 | 说明 |
| :--- | :--- | :--- | :--- |
| `text` | `String` | **是** | 按钮上显示的文本内容。 |
| `onPressed` | `VoidCallback?` | 否 | 点击按钮后的回调函数。若为 `null`，点击将无反应。 |
| `width` | `double?` | 否 | 按钮容器的宽度。 |
| `height` | `double?` | 否 | 按钮容器的高度。 |
| `fontSize` | `double?` | 否 | 文本字体大小。 |
| `color` | `Color?` | 否 | 文本颜色。 |
| `fontWeight` | `FontWeight?` | 否 | 文本字体粗细（如 `FontWeight.bold`）。 |
| `textAlign` | `TextAlign?` | 否 | 文本在文字组件内部的对齐方式。 |

---

## 3. 组件结构

该组件的层级结构如下：
1. **`InkWell`**: 提供点击事件监听及视觉上的点击反馈（波纹）。
2. **`LucaContainerWidget`**: 负责按钮的外围布局，如宽高设置，并将内容强制居中。
3. **`LucaTextWidget`**: 负责最终文本的渲染，继承了文本相关的样式属性。

---

## 4. 使用示例

### 基础用法
最简单的点击文本：
```dart
LucaButtonTextWidget(
  text: "点击我",
  onPressed: () {
    print("文本被点击了");
  },
)
```

### 指定固定大小的按钮
常用于需要固定点击区域大小的场景（如底部栏按钮）：
```dart
LucaButtonTextWidget(
  text: "发送",
  width: 100.w,
  height: 44.w,
  color: Colors.blue,
  fontWeight: FontWeight.bold,
  onPressed: () => _handleSend(),
)
```

### 自定义文字样式
```dart
LucaButtonTextWidget(
  text: "取消",
  fontSize: 14.sp,
  color: Colors.grey,
  textAlign: TextAlign.right,
  onPressed: () => Navigator.pop(context),
)
```

---

## 5. 注意事项

- **点击区域**：如果你设置了 `width` 和 `height`，整个定义的矩形区域都是可点击的。如果不设置，点击区域将根据 `LucaTextWidget` 的内容大小决定。
- **依赖性**：该组件强依赖于 `ui_package` 中的 `LucaContainerWidget` 和 `LucaTextWidget`。如果这两个基础组件发生样式变更，此按钮的样式也会同步改变。
- **手势冲突**：内部使用了 `InkWell`，如果将其放置在另一个具有手势识别的组件中，请注意手势冲突的处理。