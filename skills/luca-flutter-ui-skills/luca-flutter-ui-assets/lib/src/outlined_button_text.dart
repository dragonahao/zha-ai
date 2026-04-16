import 'package:flutter/material.dart';

import 'outlined_button_child.dart';

class LucaOutlinedTextButton extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;
  final double? width;
  final double? height;
  final BorderRadius? borderRadius;
  final double? borderWidth;
  final bool isSelected;
  final Color? borderColor;
  final Color? textColor;
  final Color? selectedBorderColor;
  final Color? selectedTextColor;
  final FontWeight fontWeight;
  final double fontSize;
  final FontWeight selectedFontWeight;
  final double selectedFontSize;

  const LucaOutlinedTextButton({
    super.key,
    required this.text,
    this.onPressed,
    this.width,
    this.height,
    this.borderRadius,
    this.borderWidth,
    this.isSelected = false,
    this.borderColor,
    this.selectedBorderColor,
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

    return LucaOutlinedChildButton(
      width: width,
      height: height,
      onPressed: onPressed,
      isSelected: isSelected,
      borderRadius: borderRadius,
      borderWidth: borderWidth,
      borderColor: borderColor,
      selectedBorderColor: selectedBorderColor,
      child: Text(
        text,
        style: TextStyle(
          color: textColor,
          fontWeight: fontWeight,
          fontSize: fontSize,
        ),
      ),
    );
  }
}
