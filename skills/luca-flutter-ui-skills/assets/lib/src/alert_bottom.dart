/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 10:03
 */

import 'package:flutter/material.dart';

class LucaAlertBottomWidget<T> extends StatelessWidget {
  /// child
  final Widget? child;

  /// 宽度 默认为屏幕宽度
  final double? width;

  /// 背景色 默认为白色
  final Color? color;

  /// 圆角，默认为30
  final BorderRadius? borderRadius;

  /// 虚拟键返回 回调
  final PopInvokedWithResultCallback<T>? onPopInvokedWithResult;

  /// 是否支持虚拟键返回，默认为false
  final bool? canPop;

  const LucaAlertBottomWidget({
    super.key,
    required this.child,
    this.width,
    this.color = Colors.white,
    this.borderRadius,
    this.canPop,
    this.onPopInvokedWithResult,
  });

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: canPop ?? false,
      onPopInvokedWithResult: onPopInvokedWithResult ??
          (bool didPop, T? result) {
            if (didPop) {
              return;
            }
          },
      child: UnconstrainedBox(
        child: Container(
          width: width ?? MediaQuery.of(context).size.width,
          decoration: BoxDecoration(
            color: color,
            borderRadius: borderRadius ??
                const BorderRadius.only(
                  topRight: Radius.circular(30),
                  topLeft: Radius.circular(30),
                ),
          ),
          child: SafeArea(
            child: child ?? const SizedBox(),
          ),
        ),
      ),
    );
  }
}
