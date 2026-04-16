/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 09:44
 */

import 'package:flutter/material.dart';

class LucaSafeBottomWidget extends StatelessWidget {
  /// child
  final Widget? child;

  /// 顶部距离其它widget的间隔
  /// 默认 20
  final double? topMargin;

  /// 底部距离屏幕底部的间隔
  /// 默认 20
  final double? bottomMargin;

  const LucaSafeBottomWidget({
    super.key,
    required this.child,
    this.bottomMargin,
    this.topMargin,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: topMargin ?? 20,
        ),
        child!,
        SizedBox(
          height: bottomMargin ?? 20,
        ),
      ],
    );
  }
}
