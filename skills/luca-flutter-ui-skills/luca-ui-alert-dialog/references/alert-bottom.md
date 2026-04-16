这份是为你的 `LucaAlertBottomWidget` 组件编写的 Markdown 说明文档。该组件是一个专门用于从屏幕底部弹出的内容容器（Bottom Sheet 风格），集成了灵活的样式定制与现代 Flutter 的导航返回拦截逻辑。

---

# LucaAlertBottomWidget 组件说明文档

`LucaAlertBottomWidget` 是一个用于构建**底部弹出对话框**（Bottom Alert/Sheet）的样式容器。它通常与 `showModalBottomSheet` 配合使用，封装了背景色、顶部圆角、宽度控制等视觉属性，并集成了 Flutter 最新的 `PopScope` 逻辑，用于安全地控制返回行为。

## 1. 功能特性

- **底部容器设计**：默认提供白色背景。通过自定义 `borderRadius`，可以轻松实现顶部大圆角的现代设计感。
- **返回拦截**：通过 `canPop` 和 `onPopInvokedWithResult` 属性，可以精确控制用户是否能通过系统返回键或滑动手势关闭底部弹窗。
- **高度定制化**：支持自定义颜色、宽度和圆角样式。
- **泛型支持**：支持泛型 `<T>`，确保弹窗关闭时返回的数据类型安全。

## 2. 参数定义

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| **`child`** | `Widget?` | **必填** | 弹窗内部显示的具体内容组件。 |
| `width` | `double?` | - | 弹窗容器的宽度。如果不传，通常默认为屏幕宽度。 |
| `color` | `Color?` | `Colors.white` | 弹窗的背景颜色。 |
| `borderRadius` | `BorderRadius?` | - | 弹窗的圆角。通常建议设置为仅顶部圆角。 |
| `canPop` | `bool?` | `false` | 是否允许通过系统返回键或手势关闭弹窗。 |
| `onPopInvokedWithResult` | `PopInvokedWithResultCallback<T>?` | - | 当返回行为发生时的回调函数。 |

---

## 3. 返回拦截机制

该组件使用了 Flutter 3.16+ 推荐的 `PopScope` 逻辑：

1.  **`canPop`**: 
    - 设为 `true`：用户触发返回时，底部弹窗直接关闭。
    - 设为 `false` (默认)：禁止通过返回键直接关闭。这在强制用户完成表单或选择操作时非常有用。
2.  **`onPopInvokedWithResult`**: 
    - 无论 `canPop` 为何值，只要有返回意图发生（如按下物理返回键），此回调就会执行。
    - 参数 `didPop` 表示该操作是否已经成功关闭了路由。

---

## 4. 使用示例

### 场景 A：基础底部操作菜单
常用于 `showModalBottomSheet` 中，设置顶部圆角：

```dart
showModalBottomSheet(
  context: context,
  backgroundColor: Colors.transparent, // 背景设为透明以展示组件圆角
  builder: (context) => LucaAlertBottomWidget(
    borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        ListTile(leading: Icon(Icons.share), title: Text("分享")),
        ListTile(leading: Icon(Icons.copy), title: Text("复制链接")),
      ],
    ),
  ),
);
```

### 场景 B：禁止意外关闭的表单
当用户在填写底部表单时，防止其因误触返回键而丢失数据：

```dart
LucaAlertBottomWidget<String>(
  canPop: false, // 禁止返回键直接关闭
  onPopInvokedWithResult: (didPop, result) {
    if (didPop) return;
    // 可以在这里弹出二次确认框
    print("请点击弹窗内的取消按钮来关闭");
  },
  child: MyComplexForm(),
)
```

### 场景 C：自定义全屏宽度的底部容器
```dart
LucaAlertBottomWidget(
  width: MediaQuery.of(context).size.width,
  color: LucaColors.colorF6F8FA,
  borderRadius: BorderRadius.zero, // 保持直角
  child: SafeArea(child: BottomActionWidget()),
)
```

---

## 5. 注意事项

1.  **背景透明处理**：在使用 `showModalBottomSheet` 时，务必将 `backgroundColor` 设为 `Colors.transparent`，否则 `LucaAlertBottomWidget` 的 `borderRadius` 效果会被原生组件的背景遮挡。
2.  **高度自适应**：容器高度默认由 `child` 撑开。如果 `child` 是一个 `ListView`，请设置其 `shrinkWrap: true` 且 `physics: NeverScrollableScrollPhysics()`。
3.  **返回逻辑**：`canPop` 默认为 `false`。如果你希望点击背景或物理返回键能直接关闭，请显式将其设为 `true`。
4.  **安全区域**：在底部弹窗中使用时，建议在 `child` 外部嵌套 `SafeArea` 或为底部添加足够的 `padding`，以避开手机底部的导航条（Home Indicator）。