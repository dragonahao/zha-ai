import 'package:flutter/widgets.dart';

mixin LucaKeyboardAwareMixin<T extends StatefulWidget> on State<T> {
  void onKeyboardVisibilityChanged(bool isVisible) {}

  @override
  void initState() {
    super.initState();
  }

  /// 关闭键盘
  void onCloseKeyboard() {
    FocusManager.instance.primaryFocus?.unfocus();
  }

  @override
  void dispose() {
    super.dispose();
  }
}
