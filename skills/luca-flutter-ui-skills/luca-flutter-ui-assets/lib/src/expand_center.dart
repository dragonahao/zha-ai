/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 10:20
 */

import 'package:flutter/material.dart';

class LucaExpandCenterWidget extends StatelessWidget {
  /// 不需要滑动的widget
  final Widget? topChild;

  /// 可滑动的widget
  final Widget? centerChild;

  /// 不需要滑动的widget
  final Widget? bottomChild;

  /// 可滑动的widget的间隔
  final EdgeInsets? centerPadding;

  /// 方向
  final Axis? scrollDirection;

  /// 滚动时键盘的行为
  final ScrollViewKeyboardDismissBehavior keyboardDismissBehavior;

  const LucaExpandCenterWidget({
    super.key,
    this.topChild,
    this.bottomChild,
    this.centerPadding,
    this.scrollDirection = Axis.vertical,
    required this.centerChild,
    this.keyboardDismissBehavior = ScrollViewKeyboardDismissBehavior.manual,
  });

  @override
  Widget build(BuildContext context) {
    switch (scrollDirection) {
      case Axis.horizontal:
        return Row(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Column(
                children: [
                  topChild ?? const SizedBox(),
                  Expanded(
                    child: SingleChildScrollView(
                      padding: centerPadding,
                      scrollDirection: Axis.horizontal,
                      keyboardDismissBehavior: keyboardDismissBehavior,
                      child: centerChild!,
                    ),
                  ),
                ],
              ),
            ),
            bottomChild ?? const SizedBox(),
          ],
        );
      case Axis.vertical:
        return Column(
          mainAxisSize: MainAxisSize.min,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: Column(
                children: [
                  topChild ?? const SizedBox(),
                  Expanded(
                    child: SingleChildScrollView(
                      padding: centerPadding,
                      keyboardDismissBehavior: keyboardDismissBehavior,
                      child: centerChild!,
                    ),
                  ),
                ],
              ),
            ),
            bottomChild ?? const SizedBox(),
          ],
        );
      case null:
        return const SizedBox();
    }
  }
}
