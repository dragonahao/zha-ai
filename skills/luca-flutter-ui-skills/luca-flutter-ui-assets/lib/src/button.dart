/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 10:34
 */

import 'package:flutter/material.dart';

import 'container.dart';

/// 按钮
class LucaButtonWidget extends StatelessWidget {
  final Widget? child;

  final VoidCallback? onPressed;

  /// 背景色
  final Color? backgroundColor;

  /// 宽度
  final double? width;

  /// 高度
  final double? height;

  /// 圆角
  final BorderRadius? borderRadius;

  /// 描边宽度
  final double? lineWidth;

  /// 描边颜色
  final Color? lineColor;

  const LucaButtonWidget({
    super.key,
    required this.child,
    required this.onPressed,
    this.width = 20.0,
    this.height = 20.0,
    this.lineWidth = 0.0,
    this.lineColor = Colors.transparent,
    this.backgroundColor = Colors.transparent,
    this.borderRadius = BorderRadius.zero,
  });

  @override
  Widget build(BuildContext context) {
    // return OutlinedButton(
    //   onPressed: onPressed,
    //   style: ButtonStyle(
    //     shape: MaterialStateProperty.all(
    //       RoundedRectangleBorder(
    //         borderRadius: borderRadius!,
    //       ),
    //     ),
    //     side: MaterialStateProperty.all(
    //       BorderSide(color: lineColor!, width: lineWidth!),
    //     ),
    //     minimumSize: MaterialStateProperty.all(
    //       Size(width!, height!),
    //     ),
    //     maximumSize: MaterialStateProperty.all(
    //       Size(width!, height!),
    //     ),
    //     backgroundColor: MaterialStateProperty.all(
    //       backgroundColor,
    //     ),
    //     padding: MaterialStateProperty.all(
    //       EdgeInsets.zero,
    //     ),
    //   ),
    //   child: child,
    // );

    return InkWell(
      onTap: onPressed,
      child: LucaContainerWidget(
        width: width,
        height: height,
        borderRadius: borderRadius,
        color: backgroundColor,
        alignment: Alignment.center,
        border: Border.all(
          color: lineColor!,
          width: lineWidth!,
        ),
        child: child,
      ),
    );
  }
}
