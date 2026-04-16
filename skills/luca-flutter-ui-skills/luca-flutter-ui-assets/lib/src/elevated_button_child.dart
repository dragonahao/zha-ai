import 'package:flutter/material.dart';

class LucaElevatedChildButton extends StatelessWidget {
  final VoidCallback onPressed;
  final Widget child;
  final BorderRadius? borderRadius;
  final double? width;
  final double? height;
  final bool isSelected;
  final Color? backgroundColor;
  final Color? selectedBackgroundColor;
  final EdgeInsets? margin;

  const LucaElevatedChildButton({
    super.key,
    required this.onPressed,
    required this.child,
    this.borderRadius = const BorderRadius.all(Radius.circular(25.0)),
    this.width,
    this.height,
    this.isSelected = false,
    this.backgroundColor,
    this.selectedBackgroundColor,
    this.margin,
  });

  @override
  Widget build(BuildContext context) {
    // 背景色
    final color = isSelected
        ? selectedBackgroundColor ?? Theme.of(context).colorScheme.primary
        : backgroundColor ?? Theme.of(context).colorScheme.primary;

    return Container(
      width: width ?? double.infinity,
      height: height ?? 50.0,
      margin: margin,
      decoration: BoxDecoration(
        borderRadius: borderRadius,
        color: color,
        shape: BoxShape.rectangle,
      ),
      child: ElevatedButton(
        onPressed: onPressed,
        style: ElevatedButton.styleFrom(
          elevation: 0,
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          padding: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: borderRadius ?? BorderRadius.circular(0),
          ),
        ),
        child: child,
      ),
    );
  }
}
