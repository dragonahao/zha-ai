/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 10:23
 */

import 'package:flutter/widgets.dart';

class LucaContainerWidget extends StatelessWidget {
  final EdgeInsetsGeometry? padding;
  final EdgeInsetsGeometry? margin;
  final AlignmentGeometry? alignment;
  final double? width;
  final double? height;
  final Color? color;
  final BorderRadius? borderRadius;
  final List<BoxShadow>? boxShadow;
  final BoxBorder? border;
  final Widget? child;
  final LinearGradient? linearGradient;
  final Clip? clipBehavior;

  const LucaContainerWidget({
    super.key,
    this.padding,
    this.margin,
    this.alignment,
    this.width,
    this.height,
    this.color,
    this.borderRadius,
    this.boxShadow,
    this.border,
    this.child,
    this.linearGradient,
    this.clipBehavior,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      alignment: alignment,
      margin: margin,
      width: width,
      height: height,
      clipBehavior: clipBehavior ?? Clip.none,
      decoration: BoxDecoration(
        color: color,
        borderRadius: borderRadius,
        boxShadow: boxShadow,
        border: border,
        gradient: linearGradient,
      ),
      child: child,
    );
  }
}
