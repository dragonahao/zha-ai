/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/21 11:03
 */

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

class LucaTheme {
  static SystemUiOverlayStyle themeDark() {
    const dark = SystemUiOverlayStyle(
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: Colors.black,
    );

    return dark;
  }

  static SystemUiOverlayStyle themeLight() {
    const light = SystemUiOverlayStyle(
      statusBarIconBrightness: Brightness.dark,
      systemNavigationBarColor: Colors.white,
    );

    return light;
  }

  static setStatusBarLight() {
    SystemChrome.setSystemUIOverlayStyle(
      SystemUiOverlayStyle.dark.copyWith(
        statusBarColor: Colors.transparent,
        systemNavigationBarColor: Colors.transparent,
      ),
    );
  }
}
