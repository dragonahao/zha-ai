// 防抖
import 'dart:async';

import 'package:flutter/foundation.dart';

class LucaDebouncer {
  final Duration delay;
  VoidCallback? _lastAction;
  Timer? _timer;

  /// 是否在首次调用时立即执行一次
  final bool immediate;

  /// 内部记录是否已执行 immediate
  bool _hasExecutedImmediate = false;

  LucaDebouncer(
      {this.delay = const Duration(milliseconds: 500), this.immediate = false});

  void run(VoidCallback action) {
    if (immediate && !_hasExecutedImmediate) {
      _hasExecutedImmediate = true;
      action();
      return;
    }

    _lastAction = action;
    _timer?.cancel();
    _timer = Timer(delay, () {
      if (_lastAction != null) {
        _lastAction!();
        _lastAction = null;
      }
    });
  }

  void cancel() {
    _timer?.cancel();
    _lastAction = null;
  }

  void dispose() => cancel();
}
