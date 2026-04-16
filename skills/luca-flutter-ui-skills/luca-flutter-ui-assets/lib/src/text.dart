/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 11:19
 */

import 'package:flutter/material.dart';

class LucaTextWidget extends StatelessWidget {
  final String? text;
  final double? fontSize;
  final Color? color;
  final FontWeight? fontWeight;
  final TextAlign? textAlign;
  final TextDecoration? decoration;
  final double? letterSpacing;
  final double? height;
  final int? maxLines;
  final TextOverflow? overflow;
  final TextDecorationStyle? decorationStyle;
  final double? wordSpacing;

  const LucaTextWidget({
    super.key,
    this.text,
    this.fontSize,
    this.color,
    this.fontWeight,
    this.textAlign,
    this.decoration,
    this.letterSpacing,
    this.height,
    this.maxLines,
    this.overflow,
    this.decorationStyle,
    this.wordSpacing,
  });

  @override
  Widget build(BuildContext context) {
    return Text(
      text ?? "",
      style: TextStyle(
        fontSize: fontSize,
        color: color,
        fontWeight: fontWeight,
        decoration: decoration,
        letterSpacing: letterSpacing,
        height: height,
      ),
      textAlign: textAlign,
      maxLines: maxLines,
      overflow: overflow,
    );
  }
}
