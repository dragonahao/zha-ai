---
name: luca-text
description: Luca UI 文本组件库，包含纯文本组件(LucaTextWidget)，提供了对 Flutter 原生 Text 组件的封装，简化了文本样式的传参流程，并内置了空字符处理逻辑，确保在项目中使用时的稳定性和一致性。WHEN USE 创建文本
version: 1.0.0
author: anhaoz
---

# LucaTextWidget 组件说明文档

`LucaTextWidget` 是对 Flutter 原生 `Text` 组件的轻量级封装。它简化了常用文本样式的传参流程，为项目提供了一致的文本渲染规范，并内置了空字符处理逻辑。

## 1. 功能特性

- **容错处理**：当 `text` 参数为 `null` 时，自动显示为空字符串 `""`，防止界面报错。
- **参数扁平化**：将常用的 `TextStyle` 属性（如 `fontSize`, `color`, `fontWeight`）直接暴露在顶层构造函数中，无需手动编写 `style: TextStyle(...)`。
- **高度兼容**：保留了原生 `Text` 组件的核心功能，如多行控制（`maxLines`）、溢出处理（`overflow`）及文本对齐（`textAlign`）。

## 2. 参数定义

### 文本内容

| 参数   | 类型      | 默认值 | 说明                                     |
| :----- | :-------- | :----- | :--------------------------------------- |
| `text` | `String?` | `""`   | 要显示的文本内容。若为 `null` 则不显示。 |

### 样式属性 (Style)

| 参数            | 类型              | 说明                                                    |
| :-------------- | :---------------- | :------------------------------------------------------ |
| `fontSize`      | `double?`         | 字体大小。                                              |
| `color`         | `Color?`          | 字体颜色。                                              |
| `fontWeight`    | `FontWeight?`     | 字体粗细（如 `FontWeight.bold`）。                      |
| `height`        | `double?`         | 行高（倍数，如 `1.5` 表示 150% 行高）。                 |
| `letterSpacing` | `double?`         | 字符间距。                                              |
| `decoration`    | `TextDecoration?` | 装饰线（如 `underline` 下划线、`lineThrough` 删除线）。 |

### 布局与行为 (Layout)

| 参数        | 类型            | 说明                                         |
| :---------- | :-------------- | :------------------------------------------- |
| `textAlign` | `TextAlign?`    | 文本对齐方式（居左、居中、居右、两端对齐）。 |
| `maxLines`  | `int?`          | 最大显示行数。                               |
| `overflow`  | `TextOverflow?` | 文本溢出处理方案（如 `ellipsis` 省略号）。   |

---

## 3. 使用示例

### 基础用法

```dart
LucaTextWidget(
  text: "这是一段基础文本",
)
```

### 自定义样式

```dart
LucaTextWidget(
  text: "加粗红色标题",
  fontSize: 18.sp,
  color: Colors.red,
  fontWeight: FontWeight.bold,
  textAlign: TextAlign.center,
)
```

### 多行省略显示

常用于列表中的简介内容：

```dart
LucaTextWidget(
  text: "这是一段非常长的文本，如果超过两行就会显示省略号。" ,
  maxLines: 2,
  overflow: TextOverflow.ellipsis,
  height: 1.4, // 设置行高
)
```

### 带装饰线的文本

```dart
LucaTextWidget(
  text: "原价 ￥99.00",
  fontSize: 12.sp,
  color: Colors.grey,
  decoration: TextDecoration.lineThrough, // 删除线
)
```

---

## 4. 注意事项

1.  **参数同步说明**：根据您提供的代码，`decorationStyle` 和 `wordSpacing` 虽然在构造函数中定义了，但**目前并未在 `build` 方法的 `TextStyle` 中应用**。如果需要使用这两个属性，请更新 `build` 方法。
2.  **默认值**：如果不传 `fontSize` 或 `color`，组件将继承父级 `DefaultTextStyle` 或当前主题（Theme）中的样式。
3.  **布局容器**：由于文本默认不带宽度限制，若在 `Row` 中使用且文本过长，请务必嵌套 `Expanded` 或 `Flexible` 以防布局溢出。
