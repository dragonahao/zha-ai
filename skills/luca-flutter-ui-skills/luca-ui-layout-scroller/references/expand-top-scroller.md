这份是为你的 `LucaExpandTopWidget` 组件编写的 Markdown 说明文档。该组件适用于“底部固定内容 + 顶部占据剩余空间并支持滚动”的页面布局。

---

# LucaExpandTopWidget 组件说明文档

`LucaExpandTopWidget` 是一个布局辅助组件，专门用于处理**底部固定、顶部伸缩滚动**的场景。它通过 `Expanded` 机制让顶部的 `child` 自动填充屏幕剩余的所有空间，并内置了滚动支持，确保内容超出时可平滑滑动。封装了 `SingleChildScrollView`的滚动功能

## 1. 功能特性

- **倒置二段式布局**：将界面分为随内容伸展的顶部主体（Body）和固定不动的底部（Footer）。
- **空间利用最大化**：顶部的 `child` 会自动占据除 `bottomChild` 以外的所有剩余空间。
- **内置滚动容器**：顶部区域自动包裹在 `SingleChildScrollView` 中，处理长内容显示。
- **键盘联动优化**：支持设置滚动时自动隐藏软键盘（如在聊天或表单输入场景中非常有用）。

## 2. 参数定义

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| **`child`** | `Widget?` | **必填** | 顶部区域的主体内容，支持溢出滚动。 |
| `bottomChild` | `Widget?` | `null` | 底部固定内容（如：提交按钮栏、底部导航、输入框等）。 |
| `padding` | `EdgeInsets?` | `null` | 顶部滚动区域的内边距。 |
| `scrollDirection` | `Axis?` | `Axis.vertical` | 滚动方向（垂直或水平）。 |
| `keyboardDismissBehavior` | `ScrollViewKeyboardDismissBehavior` | `.manual` | 滚动时键盘的行为（如设为 `onDrag` 则滚动时自动收起键盘）。 |

---

## 3. 布局结构逻辑

该组件在内部通过 `Column` (或 `Row`) 配合 `Expanded` 实现：

1.  **顶部填充层 (`child`)**：
    - 使用 `Expanded` 锁定剩余空间。
    - 嵌套 `SingleChildScrollView` 提供滚动能力。
    - 最终承载用户传入的 `child` 及其 `padding`。
2.  **底部 (`bottomChild`)**：静态放置在布局最下方，不具备滚动属性，高度由其内容决定。

---

## 4. 使用示例

### 场景 A：聊天界面（消息列表 + 底部输入框）
这是最典型的用法：上方是滚动的消息区域，下方是固定的发送栏。

```dart
LucaExpandTopWidget(
  padding: EdgeInsets.symmetric(horizontal: 16),
  keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag,
  child: Column(
    children: [
      ChatMessageWidget(text: "你好！"),
      ChatMessageWidget(text: "请问有什么可以帮您的？"),
      // ... 很多历史消息
    ],
  ),
  bottomChild: ChatInputBar(), // 固定的输入框组件
)
```

### 场景 B：购物车/结算页面
上方是滚动的商品列表，下方是固定的结算总价栏：

```dart
LucaExpandTopWidget(
  child: ProductListView(), // 所有的商品条目
  bottomChild: Container(
    height: 60,
    color: Colors.white,
    child: Row(
      children: [
        Text("合计: ￥99.00"),
        Spacer(),
        ElevatedButton(onPressed: () {}, child: Text("去结算")),
      ],
    ),
  ),
)
```

### 场景 C：水平方向布局
虽然少见，但支持水平方向的左右分布：

```dart
LucaExpandTopWidget(
  scrollDirection: Axis.horizontal,
  child: HorizontalContent(), // 左侧占据剩余空间并可滚动
  bottomChild: FixedRightSidebar(), // 右侧固定的侧边栏
)
```

---

## 5. 注意事项

1.  **布局约束**：由于内部使用了 `Expanded`，此组件必须放置在有明确约束的父组件中（如 `Scaffold` 的 `body`）。
2.  **内容高度**：如果 `child` 的内容很少（不足以填满屏幕），它依然会占据顶部所有剩余空间。如果希望内容靠下显示，可以在 `child` 内部使用 `Spacer` 或 `MainAxisAlignment.end`。
3.  **滚动冲突**：如果 `child` 参数本身是一个 `ListView`，建议将 `ListView` 的 `shrinkWrap` 设为 `true` 并禁用其物理滚动，或者直接将 `ListView` 放在 `Expanded` 中而不使用此组件。
4.  **内边距位置**：建议通过组件自带的 `padding` 参数设置边距，这会作用于 `SingleChildScrollView` 内部，确保滚动条位置正确。