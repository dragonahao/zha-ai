import 'package:flutter/widgets.dart';
import 'package:flutter_easyloading/flutter_easyloading.dart';

class LucaLoading {
  static int? lastShowTime;

  static TransitionBuilder init() {
    return EasyLoading.init();
  }

  static show({
    String? status,
    Widget? indicator,
    EasyLoadingMaskType? maskType = EasyLoadingMaskType.clear,
    bool? dismissOnTap,
    int timeout = 60,
  }) {
    LucaLoading.lastShowTime = DateTime.now().millisecondsSinceEpoch;

    EasyLoading.show(
        status: status,
        indicator: indicator,
        maskType: maskType,
        dismissOnTap: dismissOnTap);

    Future.delayed(Duration(seconds: timeout)).then((value) {
      if (LucaLoading.lastShowTime != null) {
        int now = DateTime.now().millisecondsSinceEpoch;
        if (now - LucaLoading.lastShowTime! >= timeout * 1000) {
          EasyLoading.dismiss();
        }
      }
    });
  }

  static dismiss({
    bool animation = true,
  }) {
    LucaLoading.lastShowTime = null;
    EasyLoading.dismiss(animation: animation);
  }

  static showToast(String status) {
    EasyLoading.showToast(status);
  }

  static get isShow {
    return EasyLoading.isShow;
  }
}
