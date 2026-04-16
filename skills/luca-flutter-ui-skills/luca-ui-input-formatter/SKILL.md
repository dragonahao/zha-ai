---
name: luca-ui-input-formatter
description: Luca UI 输入格式化工具类，用于处理文本输入的格式化和验证。WHEN USE 格式化输入文本
version: 1.0.0
author: anhaoz
---

# LucaInputFormatters 工具类说明文档

`LucaInputFormatters` 是一个用于管理文本输入格式化器（`TextInputFormatter`）的静态工具类。它提供了一系列预设的规则，用于限制用户的输入内容（如纯数字、手机号、身份证等），有效提升表单数据的合规性。

## 1. 功能特性

- **按需过滤**：通过正则表达式（RegExp）精确限制字符类型（数字、字母、特定符号）。
- **长度控制**：内置最大长度限制逻辑。
- **业务场景覆盖**：内置手机号、身份证、邮箱等常用业务场景的输入模版。
- **灵活组合**：支持通过 `chain` 模式将多个格式化规则叠加使用。

## 2. 静态方法详解

### 基础过滤 (返回 `List<TextInputFormatter>`)

| 方法名                  | 说明         | 允许的内容                         |
| :---------------------- | :----------- | :--------------------------------- |
| `onlyNumber()`          | 纯数字输入   | `0-9`                              |
| `onlyLetter()`          | 纯字母输入   | `a-z`, `A-Z`                       |
| `onlyLetterAndNumber()` | 字母与数字   | `0-9`, `a-z`, `A-Z`                |
| `maxLength(int length)` | 限制最大长度 | 任意字符，但超过指定长度后无法输入 |

### 业务场景过滤 (返回 `List<TextInputFormatter>`)

| 方法名          | 说明       | 规则细节                                          |
| :-------------- | :--------- | :------------------------------------------------ |
| `phoneNumber()` | 手机号格式 | 仅限数字，且长度限制为 **11** 位。                |
| `idCard()`      | 身份证格式 | 允许数字及字符 `X` 或 `x`，长度限制为 **18** 位。 |

### 单个格式化器 (返回 `TextInputFormatter`)

_注意：以下方法返回单个对象，通常用于组合使用。_
| 方法名 | 说明 | 允许的内容 |
| :--- | :--- | :--- |
| `email()` | 基础邮箱过滤 | 允许字母、数字及 `@` `.` `_` `-` 符号。 |
| `username()` | 英文用户名 | 仅允许字母和下划线 `_`。 |

### 组合工具

- **`chain(List<TextInputFormatter> formatters)`**：接受一个格式化器列表并返回。虽然目前仅透传列表，但在代码规范上定义了组合的逻辑入口。

---

## 3. 使用示例

### 场景 A：手机号输入框

限制只能输入 11 位纯数字：

```dart
TextField(
  decoration: InputDecoration(hintText: "请输入手机号"),
  keyboardType: TextInputType.phone,
  inputFormatters: LucaInputFormatters.phoneNumber(),
)
```

### 场景 B：身份证输入框

```dart
TextField(
  decoration: InputDecoration(hintText: "请输入身份证号"),
  inputFormatters: LucaInputFormatters.idCard(),
)
```

### 场景 C：组合自定义规则

例如：限制输入字母数字，且最大长度为 10：

```dart
TextField(
  inputFormatters: [
    ...LucaInputFormatters.onlyLetterAndNumber(),
    ...LucaInputFormatters.maxLength(10),
  ],
)
```

### 场景 D：邮箱基础过滤

```dart
TextField(
  inputFormatters: [
    LucaInputFormatters.email(),
  ],
)
```

---

## 4. 注意事项

1.  **返回类型差异**：
    - 绝大部分方法返回的是 `List<TextInputFormatter>`，可以直接解构或直接赋值给 `inputFormatters`。
    - `email()` 和 `username()` 返回的是单个 `TextInputFormatter` 对象，使用时需放入方括号内，如 `[LucaInputFormatters.email()]`。
2.  **键盘类型配合**：虽然格式化器可以过滤输入内容，但为了更好的用户体验，建议同时设置合适的 `keyboardType`（例如手机号对应 `TextInputType.phone`），以便弹出正确的系统键盘。
3.  **正则边界**：`onlyNumber` 等方法使用的是 `allow` 模式。这意味着它会实时拦截不符合正则的字符，用户在输入非法字符时，输入框内容不会发生变化。
4.  **校验说明**：此工具类仅负责**输入过程中的格式过滤**（Format），不负责**最终提交时的合法性验证**（Validate，例如校验身份证校验码或邮箱域名是否存在）。建议配合 `TextFormField` 的 `validator` 进行二次校验。
