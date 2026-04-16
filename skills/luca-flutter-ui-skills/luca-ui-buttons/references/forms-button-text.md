这份是为你的 `LucaFormsTextButton` 组件编写的 Markdown 说明文档。该组件是一个功能极其全面的表单文本按钮，支持背景、边框、文字样式的全方位状态切换逻辑。

---

# LucaFormsTextButton 组件说明文档

`LucaFormsTextButton` 是一个多功能的表单专用按钮组件。它集成了背景填充、边框描边以及文本样式的动态切换逻辑。通过 `isSelected` 属性，该按钮可以轻松胜任单选列表、多选标签或表单提交按钮等多种场景。

## 1. 功能特性

- **全状态控制**：支持对背景色、文字颜色、边框颜色、边框宽度、字体粗细及大小进行“选中”与“非选中”的双状态配置。
- **自动布局**：默认宽度为 `double.infinity`（撑满父容器），默认高度为 `50.0`，非常适合移动端表单设计。
- **内置反馈**：使用 `Material` 与 `InkWell` 实现点击时的水波纹扩散效果。
- **智能配色**：当未指定颜色时，自动适配系统主题色（`primary`、`outline` 等）。

## 2. 参数定义

### 基础属性
| 参数 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `text` | `String` | **必填** | 按钮显示的文本。 |
| `onPressed` | `VoidCallback?` | `null` | 点击回调。为 `null` 时不触发点击效果。 |
| `isSelected` | `bool` | `false` | 是否处于选中状态。 |
| `width` | `double?` | `double.infinity` | 按钮宽度。 |
| `height` | `double?` | `50.0` | 按钮高度。 |
| `borderRadius` | `BorderRadius?` | `circular(25.0)` | 按钮圆角。 |

### 样式属性 (支持双状态)
| 属性分类 | 非选中参数 (`isSelected=false`) | 选中参数 (`isSelected=true`) | 默认逻辑 (若未传参) |
| :--- | :--- | :--- | :--- |
| **背景色** | `backgroundColor` | `selectedBackgroundColor` | 选中: `primary` / 非选中: `primaryContainer` |
| **文字颜色** | `textColor` | `selectedTextColor` | 选中: `onPrimary` / 非选中: `onPrimaryContainer` |
| **文字粗细** | `fontWeight` (w500) | `selectedFontWeight` (w600) | - |
| **文字大小** | `fontSize` (16.0) | `selectedFontSize` (16.0) | - |
| **边框颜色** | `borderColor` | `selectedBorderColor` | 均默认为主题的 `outline` 颜色 |
| **边框宽度** | `borderWidth` (1.0) | `selectedBorderWidth` (1.0) | - |

---

## 3. 样式回退逻辑

组件构建时会根据 `isSelected` 进行判断，优先级如下：
1. **用户显式传入的参数**（如 `selectedBackgroundColor`）。
2. **系统默认配置参数**（如 `Theme.of(context).colorScheme.primary`）。

例如文字颜色的逻辑：
- `isSelected == true` $\rightarrow$ 使用 `selectedTextColor` $\rightarrow$ 否则使用 `Theme...onPrimary`。
- `isSelected == false` $\rightarrow$ 使用 `textColor` $\rightarrow$ 否则使用 `Theme...onPrimaryContainer`。

---

## 4. 使用示例

### 场景：作为表单中的状态选择（如性别选择）
```dart
Row(
  children: [
    Expanded(
      child: LucaFormsTextButton(
        text: "男",
        isSelected: _gender == 'male',
        onPressed: () => setState(() => _gender = 'male'),
      ),
    ),
    SizedBox(width: 10),
    Expanded(
      child: LucaFormsTextButton(
        text: "女",
        isSelected: _gender == 'female',
        onPressed: () => setState(() => _gender = 'female'),
      ),
    ),
  ],
)
```

---

## 5. 注意事项
- **水波纹层级**：组件内部使用了 `Material` -> `InkWell` -> `Container` 的结构，确保了点击反馈（水波纹）会被限制在 `borderRadius` 定义的圆角范围内。
- **默认宽度**：注意其默认宽度是 `double.infinity`。如果需要按钮宽度随文字自适应，请显式将 `width` 设为 `null` 或特定数值。
- **主题依赖**：该组件深度依赖 `Theme.of(context).colorScheme`。如果你的应用没有配置完整的 `ColorScheme`，可能会出现默认颜色不符合预期的情况。