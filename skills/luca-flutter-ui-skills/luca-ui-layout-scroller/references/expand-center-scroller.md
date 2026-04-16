这份是为你的 `LucaExpandCenterWidget` 组件编写的 Markdown 说明文档。该组件是一个经典的页面布局脚手架，常用于实现“头部固定 + 中间滚动 + 底部固定”的界面结构。

---

# LucaExpandCenterWidget 组件说明文档

`LucaExpandCenterWidget` 是一个专门用于处理**局部滚动布局**的容器组件。它将页面划分为三个部分：顶部固定区、中部滚动区和底部固定区。通过 `Expanded` 机制，中间部分会自动占据屏幕剩余的全部空间，并支持内部滚动。封装了   `SingleChildScrollView`的滚动功能

## 1. 功能特性

- **经典三段式布局**：轻松实现带固定页眉（Header）和页脚（Footer）的页面。
- **自动伸缩**：中部区域（`centerChild`）自动填充父容器剩余空间。
- **内置滚动**：中部区域通常包装在滚动视图中，支持自定义滚动方向和内边距。
- **键盘联动**：支持配置滚动时是否自动收起软键盘（`keyboardDismissBehavior`）。

## 2. 参数定义

| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `centerChild` | `Widget?` | **必填** | 中部可滚动区域的主体组件。 |
| `topChild` | `Widget?` | `null` | 顶部固定区域。不随页面滚动。 |
| `bottomChild` | `Widget?` | `null` | 底部固定区域。不随页面滚动。 |
| `centerPadding` | `EdgeInsets?` | `null` | 中部滚动区域的内边距。 |
| `scrollDirection` | `Axis?` | `Axis.vertical` | 滚动方向（垂直或水平）。 |
| `keyboardDismissBehavior` | `ScrollViewKeyboardDismissBehavior` | `.manual` | 滚动时键盘的行为（如：`onDrag` 滚动即收起）。 |

---

## 3. 布局结构逻辑

该组件在内部通过 `Column` (垂直) 或 `Row` (水平) 实现，其核心逻辑如下：

1.  **顶部 (`topChild`)**：直接放置在布局起始位置。
2.  **中部 (`centerChild`)**：包裹在 `Expanded` 组件中，并嵌套 `SingleChildScrollView`，确保它能占据所有剩余空间并支持溢出滚动。
3.  **底部 (`bottomChild`)**：直接放置在布局末尾。

---

## 4. 使用示例

### 场景 A：标准表单页面（带固定提交按钮）
这是最常见的用法：顶部是标题，中间是长表单，底部是固定的提交按钮。

```dart
LucaExpandCenterWidget(
  topChild: AppBar(title: Text("编辑资料"), automaticallyImplyLeading: false),
  centerPadding: EdgeInsets.all(16.0),
  centerChild: Column(
    children: [
      TextField(decoration: InputDecoration(labelText: "用户名")),
      SizedBox(height: 20),
      // ... 很多表单项
    ],
  ),
  bottomChild: Container(
    padding: EdgeInsets.all(16.0),
    child: LucaFormsTextButton(text: "保存修改", onPressed: () {}),
  ),
)
```

### 场景 B：滚动时自动收起键盘
在移动端表单中，提升用户体验的技巧：

```dart
LucaExpandCenterWidget(
  keyboardDismissBehavior: ScrollViewKeyboardDismissBehavior.onDrag, // 拖动即隐藏键盘
  centerChild: MyLongFormWidget(),
)
```

### 场景 C：水平分布布局
如果需要左右固定、中间滚动的效果：

```dart
LucaExpandCenterWidget(
  scrollDirection: Axis.horizontal,
  topChild: FixedLeftSidebar(),
  centerChild: HorizontalContentList(),
  bottomChild: FixedRightToolbar(),
)
```

---

## 5. 注意事项

1.  **高度约束**：由于中部使用了 `Expanded`，该组件必须被放置在具有明确高度约束的容器中（如 `Scaffold` 的 `body` 或指定了高度的 `Container`），否则会抛出布局异常。
2.  **避免嵌套滚动**：如果 `centerChild` 本身已经是一个 `ListView` 或 `GridView`，请注意处理滚动冲突（通常建议将 `centerChild` 设置为非滚动组件，让 `LucaExpandCenterWidget` 内部的 `SingleChildScrollView` 统一处理）。
3.  **内边距说明**：请优先使用 `centerPadding` 而不是在 `centerChild` 内部手动加 `Padding`，这能确保滚动条（如果有）的显示位置更加自然。