这份是为你的 `LucaExpandBottomWidget` 组件编写的 Markdown 说明文档。该组件适用于“头部固定 + 底部占据剩余空间并可滚动”的页面布局。

---

# LucaExpandBottomWidget 组件说明文档

`LucaExpandBottomWidget` 是一个布局辅助组件，专门用于处理**顶部固定、底部伸缩滚动**的场景。它通过 `Expanded` 机制让底部的 `child` 自动填充屏幕剩余的所有空间，并内置了滚动支持。封装了 `SingleChildScrollView`的滚动功能

## 1. 功能特性

- **两段式布局**：将界面分为固定不动的顶部（Header）和随内容伸展的底部（Body）。
- **空间利用最大化**：底部的 `child` 会自动占据除 `topChild` 以外的所有剩余空间。
- **内置滚动容器**：底部区域自动包裹在 `SingleChildScrollView` 中，处理内容溢出问题。
- **键盘联动优化**：支持设置滚动时自动隐藏软键盘，提升移动端输入体验。

## 2. 参数定义

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| **`child`** | `Widget?` | **必填** | 底部区域的主体内容，支持溢出滚动。 |
| `topChild` | `Widget?` | `null` | 顶部固定内容（如标题栏、统计栏、筛选栏等）。 |
| `padding` | `EdgeInsets?` | `null` | 底部滚动区域的内边距。 |
| `scrollDirection` | `Axis?` | `Axis.vertical` | 滚动方向（垂直或水平）。 |
| `keyboardDismissBehavior` | `ScrollViewKeyboardDismissBehavior` | `.manual` | 滚动时键盘的行为（如设为 `onDrag` 则滚动时自动收起键盘）。 |

---

## 3. 布局结构逻辑

该组件在内部通过 `Column` (或 `Row`) 配合 `Expanded` 实现：

1.  **顶部 (`topChild`)**：静态放置，不具备滚动属性，高度由其内容决定。
2.  **底部填充层**：
    - 使用 `Expanded` 锁定剩余空间。
    - 嵌套 `SingleChildScrollView` 提供滚动能力。
    - 最终承载用户传入的 `child`。

---

## 4. 使用示例

### 场景 A：个人中心页（固定背景，滚动菜单）
顶部显示用户头像信息，下方是长列表菜单：

```dart
LucaExpandBottomWidget(
  topChild: UserHeaderWidget(), // 固定显示的用户信息卡片
  padding: EdgeInsets.symmetric(vertical: 20),
  child: Column(
    children: [
      ListTile(title: Text("我的订单")),
      ListTile(title: Text("地址管理")),
      ListTile(title: Text("优惠券")),
      // ... 更多项
    ],
  ),
)
```

### 场景 B：搜索结果页
顶部是一个固定的搜索框，下方是滚动的搜索结果：

```dart
LucaExpandBottomWidget(
  topChild: SearchBarWidget(), // 固定的搜索栏
  keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag, // 翻看结果时自动收起键盘
  child: SearchResultList(),   // 搜索结果内容
)
```

### 场景 C：水平方向滚动
虽然少见，但支持水平方向的布局逻辑：

```dart
LucaExpandBottomWidget(
  scrollDirection: Axis.horizontal,
  topChild: LeftMenuIcon(),
  child: HorizontalScrollContent(),
)
```

---

## 5. 注意事项

1.  **布局约束**：由于内部使用了 `Expanded`，此组件必须放置在有明确约束的父组件中（如 `Scaffold` 的 `body`）。
2.  **滚动冲突**：如果 `child` 参数本身是一个 `ListView` 或 `GridView`，建议：
    - 方案一：将 `child` 的 `physics` 设为 `NeverScrollableScrollPhysics()` 且将 `shrinkWrap` 设为 `true`。
    - 方案二：不要使用此组件，直接使用原生 `Column` 并在顶部放置 `topChild`，底部放置包装在 `Expanded` 里的 `ListView`。
3.  **内边距位置**：建议通过组件自带的 `padding` 参数设置边距，而不是在 `child` 内部包装 `Padding`，这样可以确保内容在滚动到边界时不会被截断。