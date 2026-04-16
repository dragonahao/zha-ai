/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/21 16:49
 */
import 'package:flutter/material.dart';
import 'package:ui_package/src/container.dart';
import 'package:ui_package/src/text.dart';

class LucaButtonTextWidget extends StatelessWidget {
  final String text;
  final double? fontSize;
  final Color? color;
  final FontWeight? fontWeight;
  final TextAlign? textAlign;
  final double? width;
  final double? height;
  final VoidCallback? onPressed;

  const LucaButtonTextWidget({
    super.key,
    required this.text,
    this.fontSize,
    this.color,
    this.fontWeight,
    this.textAlign,
    this.width,
    this.height,
    this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onPressed,
      child: LucaContainerWidget(
        width: width,
        height: height,
        alignment: Alignment.center,
        child: LucaTextWidget(
          text: text,
          fontSize: fontSize,
          color: color,
          fontWeight: fontWeight,
          textAlign: textAlign,
        ),
      ),
    );
  }
}
