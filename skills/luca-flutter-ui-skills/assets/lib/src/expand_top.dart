/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 10:13
 */

import 'package:flutter/material.dart';

class LucaExpandTopWidget extends StatelessWidget {
  /// 可滑动的widget
  final Widget? child;

  /// 不需要滑动的widget
  final Widget? bottomChild;

  /// 可滑动的widget的间隔
  final EdgeInsets? padding;

  /// 方向
  final Axis? scrollDirection;

  /// 滚动时键盘的行为
  final ScrollViewKeyboardDismissBehavior keyboardDismissBehavior;

  const LucaExpandTopWidget({
    super.key,
    required this.child,
    this.bottomChild,
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
            Expanded(
              child: SingleChildScrollView(
                keyboardDismissBehavior: keyboardDismissBehavior,
                padding: padding,
                scrollDirection: Axis.horizontal,
                child: child,
              ),
            ),
            bottomChild ?? const SizedBox(),
          ],
        );
      case Axis.vertical:
        return Column(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Expanded(
              child: SingleChildScrollView(
                keyboardDismissBehavior: keyboardDismissBehavior,
                scrollDirection: Axis.vertical,
                padding: padding,
                child: child,
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
