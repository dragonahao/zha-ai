/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 10:15
 */

import 'package:flutter/material.dart';

class LucaExpandBottomWidget extends StatelessWidget {
  /// 可滑动的widget
  final Widget? child;

  /// 不需要滑动的widget
  final Widget? topChild;

  /// 可滑动的widget的间隔
  final EdgeInsets? padding;

  /// 方向
  final Axis? scrollDirection;

  /// 滚动时键盘的行为
  final ScrollViewKeyboardDismissBehavior keyboardDismissBehavior;

  const LucaExpandBottomWidget({
    super.key,
    required this.child,
    this.topChild,
    this.padding,
    this.scrollDirection = Axis.vertical,
    this.keyboardDismissBehavior = ScrollViewKeyboardDismissBehavior.manual,
  });

  @override
  Widget build(BuildContext context) {
    switch (scrollDirection) {
      case Axis.horizontal:
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            topChild ?? const SizedBox(),
            Expanded(
              child: SingleChildScrollView(
                padding: padding,
                scrollDirection: Axis.horizontal,
                keyboardDismissBehavior: keyboardDismissBehavior,
                child: child,
              ),
            ),
          ],
        );
      case Axis.vertical:
        return Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            topChild ?? const SizedBox(),
            Expanded(
              child: SingleChildScrollView(
                padding: padding,
                keyboardDismissBehavior: keyboardDismissBehavior,
                child: child,
              ),
            ),
          ],
        );
      case null:
        return const SizedBox();
    }
  }
}
