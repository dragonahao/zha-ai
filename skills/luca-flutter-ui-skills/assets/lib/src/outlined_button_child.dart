import 'package:flutter/material.dart';

class LucaOutlinedChildButton extends StatelessWidget {
  final Widget child;
  final VoidCallback? onPressed;
  final BorderRadius? borderRadius;
  final double? width;
  final double? height;
  final bool isSelected;
  final Color? borderColor;
  final Color? selectedBorderColor;
  final double? borderWidth;

  const LucaOutlinedChildButton({
    super.key,
    required this.child,
    this.onPressed,
    this.borderRadius = const BorderRadius.all(Radius.circular(25.0)),
    this.width,
    this.height,
    this.isSelected = false,
    this.borderColor,
    this.selectedBorderColor,
    this.borderWidth = 1.0,
  });

  @override
  Widget build(BuildContext context) {
    // 边框颜色
    final border = isSelected
        ? selectedBorderColor ?? Theme.of(context).colorScheme.outline
        : borderColor ?? Theme.of(context).colorScheme.outline;

    return SizedBox(
      width: width ?? double.infinity,
      height: height ?? 50.0,
      child: OutlinedButton(
        onPressed: onPressed,
        style: OutlinedButton.styleFrom(
          elevation: 0,
          backgroundColor: Colors.transparent,
          shadowColor: Colors.transparent,
          padding: EdgeInsets.zero,
          side: BorderSide(
            color: border,
            width: borderWidth ?? 1.0,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: borderRadius ?? BorderRadius.circular(25.0),
          ),
        ),
        child: child,
      ),
    );
  }
}
