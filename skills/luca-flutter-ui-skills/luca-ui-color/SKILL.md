---
name: luca-ui-color
description: Luca UI 颜色工具库，提供十六进制颜色解析功能和预定义的颜色常量，方便在项目中统一管理和使用颜色资源。WHEN USE 创建颜色
author:anhaoz
version: 1.0.0
---

# LucaColors 颜色工具库说明文档

`LucaColors` 是一个基于 Flutter `Color` 类的扩展（Extension），它为项目提供了强大的十六进制（Hex）颜色处理能力，并集中管理了 UI 设计稿中使用的所有色值。

## 1. 核心功能

- **十六进制解析**：支持将 `#RRGGBB` 格式的字符串直接转换为 Flutter `Color` 对象。
- **透明度处理**：支持在解析十六进制颜色的同时，动态设置 `alpha` 透明度。
- **静态色库**：内置了大量以 `colorXXXXXX` 命名的预定义常量，确保全项目视觉风格的高度统一。

## 2. 静态方法详解

### `parse(String hex)`
将十六进制字符串转换为颜色对象。
- **参数**：`hex` (String) - 必须为 `#` 开头的 7 位字符串（例如 `"#FF5050"`）。
- **校验逻辑**：如果字符串长度不等于 7 或格式不正确，将默认返回**白色** (`#FFFFFF`)。
- **原理**：自动为 6 位色值添加 `0xFF` 前缀（不透明）。

### `alphaColor(String hex, double alpha)`
解析颜色并应用透明度。
- **参数**：
    - `hex` (String) - 十六进制颜色值。
    - `alpha` (double) - 透明度，取值范围为 `0.0`（完全透明）到 `1.0`（完全不透明）。
- **用途**：适用于需要背景遮罩、阴影或半透明文本的场景。

---

## 3. 预定义颜色库 (示例)

组件库中定义了大量的静态常量，命名规则为 `color + 十六进制代码（大写）`。以下是部分常用颜色：
 | 常量名      | 色样      |
| ----------- | --------- |
| color009EDF | "#009EDF" |
| colorFF5050 | "#FF5050" |
| colorB7FF02 | "#B7FF02" |
| colorDDE3FF | "#DDE3FF" |
| colorFF4444 | "#FF4444" |
| color5F73D6 | "#5F73D6" |
| color2A2A2A | "#2A2A2A" |
| colorF6F8FF | "#F6F8FF" |
| color277ADC | "#277ADC" |
| color1F1F1F | "#1F1F1F" |
| color6E727C | "#6E727C" |
| color8F919A | "#8F919A" |
| color325D85 | "#325D85" |
| colorD1E6FF | "#D1E6FF" |
| colorF3F9FF | "#F3F9FF" |
| color34B76F | "#34B76F" |
| color0C965C | "#0C965C" |
| color8FFFC2 | "#8FFFC2" |
| colorEAFFF3 | "#EAFFF3" |
| color2ADA7A | "#2ADA7A" |
| color5BFFA6 | "#5BFFA6" |
| color36BA72 | "#36BA72" |
| colorCC4646 | "#CC4646" |
| colorFFEEEC | "#FFEEEC" |
| color86908A | "#86908A" |
| colorA3AFB9 | "#A3AFB9" |
| colorE14647 | "#E14647" |
| colorFFF5F5 | "#FFF5F5" |
| colorFFEAEA | "#FFEAEA" |
| color007AFF | "#007AFF" |
| color3C3C43 | "#3C3C43" |
| colorCBCBCB | "#CBCBCB" |
| color333333 | "#333333" |
| colorF1F4F7 | "#F1F4F7" |
| color666666 | "#666666" |
| colorF2F2F2 | "#F2F2F2" |
| color3D3D3D | "#3D3D3D" |
| color999999 | "#999999" |
| colorF6F8FA | "#F6F8FA" |
| color8CA1B9 | "#8CA1B9" |
| color097BBA | "#097BBA" |
| colorFF0000 | "#FF0000" |
| color5791D0 | "#5791D0" |
| color0F1826 | "#0F1826" |
| colorD9D9D9 | "#D9D9D9" |
| colorF5F5F5 | "#F5F5F5" |
| color3B628C | "#3B628C" |
| colorFFF6F6 | "#FFF6F6" |
| colorF9FAFA | "#F9FAFA" |
| colorEEEEEE | "#EEEEEE" |
| colorF6F6F6 | "#F6F6F6" |
| colorAFB5F2 | "#AFB5F2" |
| color8995C7 | "#8995C7" |
| color262626 | "#262626" |
| color6977B4 | "#6977B4" |
| color9AA3F4 | "#9AA3F"  |
| colorC9CEFA | "#C9CEFA" |
| color8696E5 | "#8696E5" |
| color9CA6DD | "#9CA6DD" |
| colorF5F7FF | "#F5F7FF" |
| colorFFFFFF | "#FFFFFF" |
| color6377E0 | "#6377E0" |
| colorFF6D64 | "#FF6D64" |
| color536EFF | "#536EFF" |
| color6D82F0 | "#6D82F0" |
| color1C1C1E | "#1C1C1E" |
| color535355 | "#535355" |
| color444444 | "#444444" |
| color2C3C8E | "#2C3C8E" |
| color2D83E1 | "#2D83E1" |
| color4290E4 | "#4290E4" |
| color6079FC | "#6079FC" |
| colorD8D8D8 | "#D8D8D8" |
| color6A73C7 | "#6A73C7" |
| color7488F9 | "#7488F9" |
| colorDFE4FF | "#DFE4FF" |
| colorFF5858 | "#FF5858" |
| colorA3E583 | "#A3E583" |
| colorFF898A | "#FF898A" |
| color1890FF | "#1890FF" |
| colorEA5E60 | "#EA5E60" |
| color1DD949 | "#1DD949" |
| colorFAFAFE | "#FAFAFE" |
| color18206B | "#18206B" |
| colorA8A8A8 | "#A8A8A8" |
| color7F79FF | "#7F79FF" |
| color2C8CF4 | "#2C8CF4" |
| color3C94F3 | "#3C94F3" |
| color4D53C2 | "#4D53C2" |
| colorB3B3B3 | "#B3B3B3" |
| color9BCBFF | "#9BCBFF" |
| color5865AB | "#5865AB" |
| colorD1D6FB | "#D1D6FB" |
| colorF5F5FE | "#F5F5FE" |
| color3A3A3A | "#3A3A3A" |
| colorC4C4C4 | "#C4C4C4" |
| color38E249 | "#38E249" |
| color2488AF | "#2488AF" |
| colorEEF9FE | "#EEF9FE" |
| color21C732 | "#21C732" |
| colorFF1414 | "#FF1414" |
| colorE5E5E5 | "#E5E5E5" |
| color24BC67 | "#24BC67" |
| colorFFF6ED | "#FFF6ED" |
| colorF9F3FF | "#F9F3FF" |
| colorE9FAF9 | "#E9FAF9" |
| color6E82E5 | "#6E82E5" |
| color7A8DEB | "#7A8DEB" |
| colorECEEFF | "#ECEEFF" |
| color37D4CA | "#37D4CA" |
| color01BBAF | "#01BBAF" |
| color7DA4FF | "#7DA4FF" |
| color4A81FF | "#4A81FF" |
| colorA2A9B0 | "#A2A9B0" |
| colorF1C246 | "#F1C246" |
| color3270FF | "#3270FF" |
| color23D0C4 | "#23D0C4" |
| colorF1F7FF | "#F1F7FF" |
| colorC2DAFF | "#C2DAFF" |
| colorDDDBE4 | "#DDDBE4" |
| color718DB5 | "#718DB5" |
| colorAEB5F7 | "#AEB5F7" |
| color2C91FF | "#2C91FF" |
| colorF9FAFB | "#F9FAFB" |
| color888888 | "#888888" |
| colorEDF7FF | "#EDF7FF" |
| colorEBF4FF | "#EBF4FF" |
| colorF1F8FF | "#F1F8FF" |
| colorE1E1E1 | "#E1E1E1" |
| colorED8D1A | "#ED8D1A" |
| colorEAFAFF | "#EAFAFF" |
| color358DAA | "#358DAA" |
| color979797 | "#979797" |
| colorB8BED4 | "#B8BED4" |
| color1DD968 | "#1DD968" |
| color6393F1 | "#6393F1" |
| colorF0B748 | "#F0B748" |
| colorFF6A6A | "#FF6A6A" |
| color7467CD | "#7467CD" |
| colorF3F3FA | "#F3F3FA" |
| colorFFFEFA | "#FFFEFA" |
| colorE5E6EB | "#E5E6EB" |
| colorF37C7C | "#F37C7C" |
| colorFFCBCB | "#FFCBCB" |
| colorF6F5FF | "#F6F5FF" |
| colorBEBEBE | "#BEBEBE" |
| color000000 | "#000000" |
| colorF3B622 | "#F3B622" |
| colorFFF7F6 | "#FFF7F6" |
| colorDCE0EF | "#DCE0EF" |
| colorCDCDCD | "#CDCDCD" |
| color3A3A3C | "#3A3A3C" |
| color6B79C3 | "#6B79C3" |
| colorFF7171 | "#FF7171" |
| color808FFF | "#808FFF" |
| color7888FF | "#7888FF" |
| colorF4F5FD | "#F4F5FD" |
| colorC7CCFA | "#C7CCFA" |
| colorA5ADF6 | "#A5ADF6" |
| colorECFCFB | "#ECFCFB" |
| colorFF9B21 | "#FF9B21" |
| colorEAFFFE | "#EAFFFE" |
| color151B37 | "#151B37" |
| colorBBBBBB | "#BBBBBB" |
| color7B8CD9 | "#7B8CD9" |
| color3149FF | "#3149FF" |
| colorBBC4FF | "#BBC4FF" |
| colorE7E9FF | "#E7E9FF" |
| color2F3353 | "#2F3353" |
| colorF5F6F8 | "#F5F6F8" |
| color23DFAA | "#23DFAA" |
| color43E38C | "#43E38C" |
| colorE5E6E8 | "#E5E6E8" |
| colorE7E9F6 | "#E7E9F6" |
| colorD8D9E5 | "#D8D9E5" |
| colorF0F2F6 | "#F0F2F6" |
| colorFF5E61 | "#FF5E61" |
| colorFF5A4F | "#FF5A4F" |
| colorE6EAFB | "#E6EAFB" |
| colorE7EEFB | "#E7EEFB" |
| colorF2F5FA | "#F2F5FA" |
| colorFF3232 | "#FF3232" |
| colorEBEDF2 | "#EBEDF2" |
| colorFF758E | "#FF758E" |
| colorCECED8 | "#CECED8" |
| colorFFEC8D | "#FFEC8D" |
| color7EDAFF | "#7EDAFF" |
| colorE7E7E7 | "#E7E7E7" |
| colorF9494A | "#F9494A" |
| colorFFF0F0 | "#FFF0F0" |
| colorFFD466 | "#FFD466" |
| color6964DE | "#6964DE" |
| color7A8DEC | "#7A8DEC" |
| colorE1B100 | "#E1B100" |
| colorFFF5DD | "#FFF5DD" |
| colorF3E8CD | "#F3E8CD" |
| color6D84E6 | "#6D84E6" |
| color8BA1FF | "#8BA1FF" |
| colorD4D9FF | "#D4D9FF" |
| colorFFF9F9 | "#FFF9F9" |
| colorE84A4A | "#E84A4A" |
| colorF9FAFF | "#F9FAFF" |
| colorD5E0FF | "#D5E0FF" |
| colorFFE2E2 | "#FFE2E2" |
| color777777 | "#777777" |
| colorF1F5FF | "#F1F5FF" |
| colorFFEEEE | "#FFEEEE" |
| color4E5884 | "#4E5884" |
| color963036 | "#963036" |
| colorF6F6F9 | "#F6F6F9" |
| colorE0F2FE | "#E0F2FE" |



---

## 4. 使用示例

### 使用预定义常量
直接通过扩展名访问静态常量：
```dart
Container(
  color: LucaColors.color009EDF, // 使用预定义的蓝色
  child: Text(
    "Hello Luca",
    style: TextStyle(color: LucaColors.colorFFFFFF), // 使用预定义的白色
  ),
)
```

### 动态解析十六进制
当你从后端 API 获取动态颜色值时：
```dart
Color dynamicColor = LucaColors.parse("#AABBCC");
```

### 创建半透明颜色
创建一个 50% 透明度的红色背景：
```dart
Container(
  color: LucaColors.alphaColor("#FF0000", 0.5),
)
```

---

## 5. 开发建议与注意事项

1.  **优先使用常量**：在开发 UI 时，应优先查找 `LucaColors` 中是否已有对应的色值，避免在代码中随意硬编码 `Color(0xFF...)`，这样有利于后期全局修改主题。
2.  **十六进制格式**：`parse` 方法目前严格匹配 `#RRGGBB`（7位）。如果传入 8 位（带透明度）或不带 `#` 的字符串，会触发 fallback 逻辑返回白色。
3.  **扩展维护**：当 UI 设计师提供了新的全局色值时，应按照 `colorXXXXXX` 的格式在此文件中新增静态常量。
4.  **容错性**：`parse` 内部使用了 `tryParse` 校验，增强了代码的健壮性，防止因错误的颜色字符串导致应用崩溃。