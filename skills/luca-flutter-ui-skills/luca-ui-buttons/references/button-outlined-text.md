这份是为你的 `LucaOutlinedTextButton` 组件编写的 Markdown 说明文档。该组件是轮廓风格（Outlined）的按钮，专门用于处理带边框的文本按钮。

---

# LucaOutlinedTextButton 组件说明文档

`LucaOutlinedTextButton` 是一个带边框（Outlined）样式的文本按钮组件。它基于 `LucaOutlinedChildButton` 封装，提供了完善的状态切换逻辑，能够根据**选中状态（Selected）**自动调整文字颜色、边框颜色、字体粗细及大小。

## 1. 功能特性

- **轮廓样式**：默认不填充背景，通过边框界定按钮范围。
- **双状态支持**：内置 `isSelected` 逻辑，支持选中与非选中状态的无缝切换。
- **样式联动**：当 `isSelected` 改变时，边框和文字的颜色、粗细、大小均可自动响应。
- **主题集成**：在未自定义颜色时，自动回退到主题（ThemeData）颜色方案。

## 2. 参数定义

### 基础属性
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `text` | `String` | **必填** | 按钮显示的文本内容。 |
| `onPressed` | `VoidCallback?` | `null` | 按钮点击后的回调。若为 `null`，按钮处于禁用状态。 |
| `width` | `double?` | `null` | 按钮宽度。 |
| `height` | `double?` | `null` | 按钮高度。 |
| `isSelected` | `bool` | `false` | 当前是否处于选中状态。 |

### 边框与形状
| 参数 | 类型 | 说明 |
| :--- | :--- | :--- |
| `borderRadius` | `BorderRadius?` | 按钮的圆角半径。 |
| `borderWidth` | `double?` | 边框的粗细。 |
| `borderColor` | `Color?` | **非选中**状态下的边框颜色。 |
| `selectedBorderColor` | `Color?` | **选中**状态下的边框颜色。 |

### 文本样式
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `textColor` | `Color?` | `onPrimaryContainer` | 非选中状态下的文字颜色。 |
| `selectedTextColor` | `Color?` | `onPrimary` | 选中状态下的文字颜色。 |
| `fontWeight` | `FontWeight` | `w500` | 非选中状态下的字体粗细。 |
| `selectedFontWeight` | `FontWeight` | `w600` | 选中状态下的字体粗细。 |
| `fontSize` | `double` | `16.0` | 非选中状态下的字体大小。 |
| `selectedFontSize` | `double` | `16.0` | 选中状态下的字体大小。 |

---

## 3. 样式切换逻辑

组件在内部通过 `isSelected` 布尔值进行判断，决定最终应用的样式：

- **文字颜色逻辑**：
    - 若 `isSelected` 为 `true`：优先使用 `selectedTextColor` -> 备选主题色 `onPrimary`。
    - 若 `isSelected` 为 `false`：优先使用 `textColor` -> 备选主题色 `onPrimaryContainer`。
- **文字形体逻辑**：
    - `fontWeight` 和 `fontSize` 会在对应状态的参数间自动切换。
- **边框逻辑**：
    - 具体的边框颜色和宽度切换逻辑由底层的 `LucaOutlinedChildButton` 处理。

---

## 4. 使用示例

### 基础用法
```dart
LucaOutlinedTextButton(
  text: "查看详情",
  onPressed: () => print("Tap"),
)
```

### 切换状态示例
常用于多选或单选标签组：

```dart
LucaOutlinedTextButton(
  text: "选项一",
  isSelected: _selectedIndex == 0,
  selectedBorderColor: Colors.blue,
  selectedTextColor: Colors.blue,
  onPressed: () {
    setState(() {
      _selectedIndex = 0;
    });
  },
)
```

### 自定义外观
```dart
LucaOutlinedTextButton(
  text: "删除",
  borderWidth: 2.0,
  borderColor: Colors.red,
  textColor: Colors.red,
  borderRadius: BorderRadius.circular(8),
  fontWeight: FontWeight.bold,
  onPressed: () {
    // 执行删除操作
  },
)
```

---

## 5. 注意事项
- **底层依赖**：本组件依赖于同一目录下的 `outlined_button_child.dart`。
- **高度建议**：在列表或网格中使用时，建议通过 `width` 和 `height` 固定尺寸，以保证 UI 的整齐。
- **颜色提示**：如果按钮文字在选中状态下看不见，请检查 `selectedTextColor` 或主题中的 `onPrimary` 是否与背景色冲突。