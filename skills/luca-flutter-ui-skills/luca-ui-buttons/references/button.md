这份是为你的基础按钮组件 `LucaButtonWidget` 编写的 Markdown 说明文档。该组件是项目中大多数按钮的基础，提供了对容器样式（边框、圆角、背景）的全面控制。

---

# LucaButtonWidget 组件说明文档

`LucaButtonWidget` 是一个通用的容器型按钮组件。它结合了 `InkWell` 的点击反馈效果和 `LucaContainerWidget` 的布局能力，允许开发者将任何自定义的 `Widget`（如图标、文本、图片或组合布局）包装成一个具有点击功能的按钮。

## 1. 功能特性

- **高度自定义**：可以自由定义按钮的背景色、边框（粗细与颜色）、圆角和尺寸。
- **点击反馈**：内置 `InkWell` 组件，提供 Material Design 风格的水波纹点击效果。
- **居中布局**：内部子组件（`child`）默认在容器内水平和垂直居中。
- **组合灵活**：由于 `child` 接受任何 `Widget`，因此它是构建复杂 UI 交互的基础块。

## 2. 参数定义

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `child` | `Widget?` | **必填** | 按钮内部显示的内容。 |
| `onPressed` | `VoidCallback?` | **必填** | 点击按钮后的回调函数。 |
| `width` | `double?` | `20.0` | 按钮的宽度。 |
| `height` | `double?` | `20.0` | 按钮的高度。 |
| `backgroundColor` | `Color?` | `transparent` | 按钮的背景颜色。 |
| `borderRadius` | `BorderRadius?`| `zero` | 按钮的圆角弧度。 |
| `lineWidth` | `double?` | `0.0` | 边框线的宽度。 |
| `lineColor` | `Color?` | `transparent` | 边框线的颜色。 |

---

## 3. 组件结构

该组件放弃了 Flutter 原生的 `OutlinedButton` 样式（代码中已注释），转而采用更灵活的自定义方案：
1. **`InkWell`**: 捕捉手势并处理点击波纹。
2. **`LucaContainerWidget`**: 负责核心样式渲染。
    - 使用 `Border.all` 实现描边。
    - 使用 `Alignment.center` 确保内容居中。

---

## 4. 使用示例

### 基础自定义容器按钮
```dart
LucaButtonWidget(
  width: 100,
  height: 50,
  backgroundColor: Colors.blue,
  borderRadius: BorderRadius.circular(12),
  onPressed: () => print("Tap!"),
  child: const Text("提交", style: TextStyle(color: Colors.white)),
)
```

### 带边框的圆形按钮
```dart
LucaButtonWidget(
  width: 60,
  height: 60,
  lineWidth: 2.0,
  lineColor: Colors.red,
  borderRadius: BorderRadius.circular(30), // 设置为高度的一半即为圆形
  onPressed: () {},
  child: const Icon(Icons.add, color: Colors.red),
)
```

### 透明背景按钮
```dart
LucaButtonWidget(
  width: 150,
  height: 40,
  onPressed: () {},
  child: const Text("跳过"),
)
```

---

## 5. 注意事项

- **默认尺寸警告**：该组件的 `width` 和 `height` 默认值均为 `20.0`。在大多数情况下，这个尺寸较小，**使用时务必根据实际 UI 需求手动设置宽高**。
- **点击区域**：`InkWell` 的点击热区会跟随 `LucaContainerWidget` 的 `width` 和 `height` 定义的范围。
- **描边逻辑**：即使设置了 `lineColor`，如果 `lineWidth` 为 `0.0`（默认值），边框也将不可见。
- **依赖性**：该组件内部使用了同一目录下的 `LucaContainerWidget`，请确保该依赖组件已正确导出或引用。