/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 15:37
 */

import 'package:flutter/material.dart';

abstract class LucaWidgetBindingObserverState<T extends StatefulWidget>
    extends State<T> with WidgetsBindingObserver {
  bool _subscribed = false;

  @override
  void initState() {
    super.initState();
    if (!_subscribed) {
      WidgetsBinding.instance.addObserver(this);
      _subscribed = true;
    }
  }

  @override
  void dispose() {
    super.dispose();
    WidgetsBinding.instance.removeObserver(this);
  }

  @override
  void didChangeAppLifecycleState(state) {
    super.didChangeAppLifecycleState(state);
    switch (state) {
      case AppLifecycleState.inactive:
        appWillBackground();
        break;
      case AppLifecycleState.paused:
        appDidBackground();
        break;
      case AppLifecycleState.resumed:
        appDidResume();
        break;
      case AppLifecycleState.detached:
        appDidExit();
        break;
      case AppLifecycleState.hidden:
        appDidBackground();
        break;
    }
  }

  /// app 将要进去后台
  void appWillBackground() {}

  /// app 已经进入后台
  void appDidBackground() {}

  /// app 已经进入前台
  void appDidResume() {}

  /// app 已经退出
  void appDidExit() {}
}
