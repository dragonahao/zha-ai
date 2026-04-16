/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/21 17:11
 */

import 'package:flutter/material.dart';

class LucaButtonImageWidget extends StatelessWidget {
  final Widget icon;
  final VoidCallback onPressed;
  final double? iconSize;
  final Color? color;

  const LucaButtonImageWidget({
    super.key,
    required this.icon,
    required this.onPressed,
    this.iconSize,
    this.color,
  });

  @override
  Widget build(BuildContext context) {
    return IconButton(
      onPressed: onPressed,
      icon: icon,
      iconSize: iconSize,
      color: color,
    );
  }
}
