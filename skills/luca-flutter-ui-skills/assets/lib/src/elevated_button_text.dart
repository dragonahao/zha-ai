import 'package:flutter/material.dart';

import 'elevated_button_child.dart';

class LucaElevatedTextButton extends StatelessWidget {
  final VoidCallback onPressed;
  final String text;
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

  const LucaElevatedTextButton({
    super.key,
    required this.onPressed,
    required this.text,
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
  });

  @override
  Widget build(BuildContext context) {
    // 文字颜色
    final textColor = isSelected
        ? selectedTextColor ?? Theme.of(context).colorScheme.onPrimary
        : this.textColor ?? Theme.of(context).colorScheme.onPrimaryContainer;

    // 字体粗细
    final fontWeight = isSelected ? selectedFontWeight : this.fontWeight;

    // 字体大小
    final fontSize = isSelected ? selectedFontSize : this.fontSize;

    return LucaElevatedChildButton(
      width: width,
      height: height,
      backgroundColor: backgroundColor,
      selectedBackgroundColor: selectedBackgroundColor,
      onPressed: onPressed,
      borderRadius: borderRadius,
      isSelected: isSelected,
      child: Text(
        text,
        textAlign: TextAlign.center,
        style: TextStyle(
          color: textColor,
          fontWeight: fontWeight,
          fontSize: fontSize,
        ),
      ),
    );
  }
}
