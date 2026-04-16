---
name: luca-ui-loading
description: Luca UI 加载提示工具类，基于 flutter_easyloading 封装，增加了超时自动关闭机制，确保在网络异常或代码异常时不会导致加载框“卡死”在页面上。WHEN USE 显示加载提示
version: 1.0.0
author: anhaoz
---

# LucaLoading 工具类说明文档

`LucaLoading` 是一个全局加载提示（Loading）管理类。它封装了 `flutter_easyloading` 库，主要用于在进行异步请求或耗时操作时显示遮罩提示，并内置了安全超时机制，防止因代码异常导致的加载框“卡死”在页面上。

## 1. 功能特性

- **超时自愈**：内置 `timeout` 逻辑（默认 60s），若规定时间内未手动调用 `dismiss`，组件将自动关闭。
- **并发安全**：通过 `lastShowTime` 时间戳校验，确保多个异步操作重叠时，延迟的自动关闭任务不会误杀新开启的加载框。
- **简化调用**：预设了常用的透明遮罩类型（`EasyLoadingMaskType.clear`）。
- **Toast 支持**：集成轻量级文字提示功能。

## 2. 初始化配置

在项目的 `MaterialApp` 入口处进行初始化：

```dart
MaterialApp(
  title: 'Luca App',
  builder: LucaLoading.init(), // 必须在此注册以支持全局显示
  home: const MyHomePage(),
);
```

---

## 3. 方法详解

### `show()`

显示加载框。

- **参数**：
  - `status`: (String?) 提示文字。
  - `indicator`: (Widget?) 自定义旋转图标或动画。
  - `maskType`: 遮罩类型，默认为 `clear`（不透明遮罩，阻断背景点击）。
  - `dismissOnTap`: (bool?) 点击遮罩层是否自动关闭。
  - `timeout`: (int) **超时秒数**，默认为 60 秒。

### `dismiss()`

关闭当前显示的加载框。

- 调用此方法会重置内部的时间戳计数器，防止触发后续的自动关闭逻辑。

### `showToast(String status)`

显示一个纯文字的黑色浮层提示（Toast），通常在 2s 左右自动消失。

### `isShow` (Getter)

返回当前是否正在显示加载框。

---

## 4. 核心逻辑：超时处理

`LucaLoading` 相比原生 `EasyLoading` 的最大改进在于其内部逻辑：

1.  当执行 `show()` 时，记录当前时间戳到 `lastShowTime`。
2.  开启一个 `Future.delayed` 延时任务。
3.  延时结束时，检查 `lastShowTime` 是否仍然是开启时的那个。如果是，说明这期间没有新的 `show` 被触发，且没有被手动 `dismiss`，此时强制执行关闭。

---

## 5. 使用示例

### 场景 A：基础网络请求

```dart
void fetchData() async {
  LucaLoading.show(status: "加载中...");
  try {
    await apiService.getData();
  } finally {
    LucaLoading.dismiss();
  }
}
```

### 场景 B：自定义超时时间

对于一些极速操作，可以设置较短的超时：

```dart
LucaLoading.show(status: "保存中", timeout: 5);
```

### 场景 C：显示 Toast

```dart
LucaLoading.showToast("账号或密码错误");
```

---

## 6. 注意事项

- **全局单例**：`LucaLoading` 是全局唯一的。开启一个新的 `show` 会覆盖前一个的文字和配置。
- **超时建议**：默认 60s 是为了防止极端弱网。对于特定的用户交互场景，建议根据业务逻辑设定更合理的 `timeout`。
- **遮罩类型**：若需允许用户在加载时继续点击背景，可将 `maskType` 设置为 `EasyLoadingMaskType.none`。
