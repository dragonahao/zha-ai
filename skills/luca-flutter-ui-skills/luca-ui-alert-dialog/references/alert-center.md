这份是为你的 `LucaAlertCenterWidget` 组件编写的 Markdown 说明文档。该组件是一个通用的居中弹窗容器，集成了样式定制与现代 Flutter 的导航返回拦截逻辑。

---

# LucaAlertCenterWidget 组件说明文档

`LucaAlertCenterWidget` 是一个用于构建居中对话框（Alert Dialog）的样式容器。它封装了背景色、圆角、宽度控制等视觉属性，并集成了 Flutter 最新的 `PopScope` 逻辑，用于安全地控制物理返回键或虚拟返回键的行为。

## 1. 功能特性

- **视觉统一**：默认提供白色背景与 30 像素的大圆角，符合现代移动端 UI 设计风格。
- **返回拦截**：通过 `canPop` 和 `onPopInvokedWithResult` 属性，可以精确控制用户是否能通过返回键关闭弹窗。
- **宽度自适应**：支持自定义宽度，默认情况下通常适配屏幕宽度。
- **泛型支持**：支持泛型 `<T>`，便于在弹窗关闭时处理特定类型的数据返回。

## 2. 参数定义

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| **`child`** | `Widget?` | **必填** | 弹窗内部显示的具体内容组件。 |
| `width` | `double?` | - | 弹窗容器的宽度。如果不传，通常受父级约束影响。 |
| `color` | `Color?` | `Colors.white` | 弹窗的背景颜色。 |
| `borderRadius` | `BorderRadius?` | `circular(30)` | 弹窗的圆角半径。 |
| `canPop` | `bool?` | `false` | 是否允许通过系统返回键（虚拟/物理）关闭弹窗。 |
| `onPopInvokedWithResult` | `PopInvokedWithResultCallback<T>?` | - | 当返回行为发生时的回调函数（用于处理拦截逻辑）。 |

---

## 3. 返回拦截机制

该组件使用了 Flutter 3.16+ 推荐的导航拦截方式：

1.  **`canPop`**: 
    - 设为 `true`：用户按下返回键时，弹窗直接关闭。
    - 设为 `false` (默认)：用户按下返回键时，弹窗不会自动关闭，需在回调中手动处理。
2.  **`onPopInvokedWithResult`**: 
    - 无论 `canPop` 为何值，只要发生了返回尝试，此回调就会被触发。你可以在这里执行一些清理工作或显示二次确认提示。

---

## 4. 使用示例

### 场景 A：基础信息弹窗
一个简单的居中提示，不允许通过返回键关闭，必须点击弹窗内的按钮：

```dart
showDialog(
  context: context,
  builder: (context) => LucaAlertCenterWidget(
    canPop: false, // 禁用返回键
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text("提示"),
        Text("您必须点击下方按钮才能关闭"),
        TextButton(
          onPressed: () => Navigator.pop(context),
          child: Text("我知道了"),
        ),
      ],
    ),
  ),
);
```

### 场景 B：自定义宽度与样式的表单弹窗
```dart
LucaAlertCenterWidget(
  width: 320,
  color: LucaColors.colorF6F8FF,
  borderRadius: BorderRadius.circular(16),
  canPop: true, // 允许返回键关闭
  child: Padding(
    padding: EdgeInsets.all(20),
    child: MyFormWidget(),
  ),
)
```

### 场景 C：拦截返回键并执行特定逻辑
```dart
LucaAlertCenterWidget<bool>(
  canPop: false,
  onPopInvokedWithResult: (didPop, result) {
    if (didPop) return;
    print("用户尝试返回，但不允许直接关闭");
  },
  child: Text("安全区域"),
)
```

---

## 5. 注意事项

1.  **与 `showDialog` 配合**：该组件通常作为 `showDialog` 函数中 `builder` 的根节点使用。
2.  **默认圆角说明**：虽然代码定义中 `borderRadius` 可选，但在 UI 规范中建议统一使用默认的 `30` 像素圆角以保持风格一致。
3.  **高度处理**：弹窗高度默认由 `child` 的内容撑开。如果内容过长，建议在 `child` 内部嵌套 `SingleChildScrollView`。
4.  **泛型匹配**：如果你的弹窗需要 `Navigator.pop(context, value)` 返回特定类型的值，请确保 `LucaAlertCenterWidget<T>` 的 `T` 与返回值类型一致。