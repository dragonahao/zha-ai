import 'package:flutter/material.dart';

class LucaFormsTextButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final BorderRadius? borderRadius;
  final double? width;
  final double? height;
  final bool isSelected;
  final Color? backgroundColor;
  final Color? selectedBackgroundColor;
  final Color? textColor;
  final Color? selectedTextColor;
  final FontWeight fontWeight;
  final FontWeight selectedFontWeight;
  final double fontSize;
  final double selectedFontSize;
  final Color? borderColor;
  final Color? selectedBorderColor;
  final double? borderWidth;
  final double? selectedBorderWidth;

  const LucaFormsTextButton({
    super.key,
    required this.text,
    this.onPressed,
    this.borderRadius,
    this.width,
    this.height,
    this.isSelected = false,
    this.backgroundColor,
    this.selectedBackgroundColor,
    this.textColor,
    this.selectedTextColor,
    this.fontWeight = FontWeight.w500,
    this.selectedFontWeight = FontWeight.w600,
    this.fontSize = 16.0,
    this.selectedFontSize = 16.0,
    this.borderColor,
    this.selectedBorderColor,
    this.borderWidth,
    this.selectedBorderWidth,
  });

  @override
  Widget build(BuildContext context) {
    // 背景颜色
    final backgroundColor = isSelected
        ? selectedBackgroundColor ?? Theme.of(context).colorScheme.primary
        : this.backgroundColor ??
            Theme.of(context).colorScheme.primaryContainer;
    // 字体颜色
    final textColor = isSelected
        ? selectedTextColor ?? Theme.of(context).colorScheme.onPrimary
        : this.textColor ?? Theme.of(context).colorScheme.onPrimaryContainer;

    // 字体粗细
    final fontWeight = isSelected ? selectedFontWeight : this.fontWeight;

    // 字体大小
    final fontSize = isSelected ? selectedFontSize : this.fontSize;

    // 边框颜色
    final borderColor = isSelected
        ? selectedBorderColor ?? Theme.of(context).colorScheme.outline
        : this.borderColor ?? Theme.of(context).colorScheme.outline;

    // 边框宽度
    final borderWidth =
        isSelected ? selectedBorderWidth ?? 1.0 : this.borderWidth ?? 1.0;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: () {
          onPressed?.call();
        },
        borderRadius: borderRadius ?? BorderRadius.circular(25.0),
        child: Container(
          alignment: Alignment.center,
          width: width ?? double.infinity,
          height: height ?? 50.0,
          decoration: BoxDecoration(
            color: backgroundColor,
            borderRadius: borderRadius ?? BorderRadius.circular(25.0),
            border: Border.all(
              color: borderColor,
              width: borderWidth,
            ),
          ),
          child: Text(
            text,
            style: TextStyle(
              color: textColor,
              fontWeight: fontWeight,
              fontSize: fontSize,
            ),
          ),
        ),
      ),
    );
  }
}
