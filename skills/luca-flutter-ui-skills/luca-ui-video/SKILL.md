---
name: luca-ui-video
description: Luca UI 视频组件(LucaVideoComponent)，基于 video_player 封装，支持本地和网络视频播放，并集成了路由感知功能，能够在页面切换时自动暂停和恢复视频播放。WHEN USE 创建视频播放器
version: 1.0.0
author: anhaoz
---

# LucaVideoComponent 组件说明文档

`LucaVideoComponent` 是一个基于 `video_player` 封装的视频播放组件。它不仅支持本地资源和网络视频的播放，还内置了路由监控功能，能够根据页面的切换自动切换视频的播放与暂停状态。

## 1. 功能特性

- **双资源支持**：支持播放本地 `assets` 视频和远程 `network` 视频。
- **智能生命周期管理**：通过集成 `RouteAware`，当用户跳转到下一页时视频自动暂停，返回本页时视频自动恢复播放。
- **自定义布局**：支持设置视频容器的宽度、高度以及圆角（`borderRadius`）。
- **自动化配置**：支持配置自动播放（`autoPlay`）和循环播放（`isLooping`）。

## 2. 参数定义

| 参数           | 类型           | 默认值   | 说明                                                        |
| :------------- | :------------- | :------- | :---------------------------------------------------------- |
| `assetPath`    | `String`       | **必填** | 视频路径（本地路径或网络 URL）。                            |
| `isNetwork`    | `bool`         | `false`  | 是否为网络视频。`true` 代表网络视频，`false` 代表本地资源。 |
| `width`        | `double?`      | `300.0`  | 视频组件的宽度。                                            |
| `height`       | `double?`      | `300.0`  | 视频组件的高度。                                            |
| `autoPlay`     | `bool`         | `true`   | 初始化完成后是否自动播放。                                  |
| `isLooping`    | `bool`         | `true`   | 是否开启循环播放。                                          |
| `borderRadius` | `BorderRadius` | `zero`   | 视频容器的圆角。                                            |

---

## 3. 核心机制详解

### 3.1 路由感知 (Route Awareness)

该组件使用了 `RouteAware` 混入，并订阅了全局的 `appRouteObserver`：

- **`didPushNext()`**: 当从当前页面跳转到新页面时，触发此方法，视频会自动**暂停**。
- **`didPopNext()`**: 当从下一页返回到当前页面时，触发此方法，视频会自动**恢复播放**。

> **注意**：使用此功能前，请确保在 `MaterialApp` 中配置了 `appRouteObserver`。

### 3.2 初始化逻辑

组件在 `initState` 中根据 `isNetwork` 标志位选择不同的 `VideoPlayerController`：

- 网络视频：使用 `VideoPlayerController.network`。
- 本地视频：使用 `VideoPlayerController.asset`。

---

## 4. 使用示例

### 播放本地资源（带圆角）

```dart
LucaVideoComponent(
  assetPath: 'assets/videos/intro.mp4',
  width: MediaQuery.of(context).size.width,
  height: 200,
  borderRadius: BorderRadius.circular(12),
  autoPlay: true,
)
```

### 播放网络视频

```dart
LucaVideoComponent(
  assetPath: 'https://www.example.com/sample_video.mp4',
  isNetwork: true,
  isLooping: false,
  width: 320,
  height: 180,
)
```

---

## 5. 注意事项

1.  **全局依赖**：该组件依赖于 `app.dart` 中定义的 `appRouteObserver`。请确保你的应用入口处有类似如下配置：

    ```dart
    // app.dart
    final RouteObserver<PageRoute> appRouteObserver = RouteObserver<PageRoute>();

    // main.dart
    MaterialApp(
      navigatorObservers: [appRouteObserver],
      // ...
    )
    ```

2.  **资源权限**：
    - 播放网络视频时，请确保 Android 的 `AndroidManifest.xml` 已开启网络权限。
    - iOS 需要在 `Info.plist` 中配置 `NSAppTransportSecurity` 以支持 HTTP 资源（建议使用 HTTPS）。
3.  **内存管理**：组件在 `dispose` 时会自动释放 `VideoPlayerController`，无需手动干预，有效防止内存泄漏。
4.  **加载状态**：目前视频在初始化完成前显示为空白（`SizedBox`），如果需要，可以在 `_videoController!.value.isInitialized` 判断中加入加载占位图。
