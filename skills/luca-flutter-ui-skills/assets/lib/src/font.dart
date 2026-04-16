/*
 * @description:
 * @author: 雷子
 * @data: 2025/1/20 09:40
 */

import 'dart:io';

import 'package:flutter/material.dart';

class LucaFontWeight {
  static regular() {
    return FontWeight.w400;
  }

  static medium() {
    if (Platform.isAndroid) {
      return FontWeight.w500;
    } else {
      return semiBold();
    }
  }

  static semiBold() {
    return FontWeight.w600;
  }

  static bold() {
    return FontWeight.w700;
  }

  static extraBold() {
    return FontWeight.w800;
  }
}

class LucaTextStyle {
  static TextStyle regular({
    double? fontSize,
    Color? color,
    TextDecoration? decoration,
  }) {
    return TextStyle(
      fontSize: fontSize ?? 14.0,
      color: color ?? Colors.black,
      fontWeight: LucaFontWeight.regular(),
      decoration: decoration,
    );
  }

  static TextStyle medium({
    double? fontSize,
    Color? color,
    TextDecoration? decoration,
  }) {
    return TextStyle(
      fontSize: fontSize ?? 14.0,
      color: color ?? Colors.black,
      fontWeight: LucaFontWeight.medium(),
      decoration: decoration,
    );
  }

  static TextStyle semiBold({
    double? fontSize,
    Color? color,
    TextDecoration? decoration,
  }) {
    return TextStyle(
      fontSize: fontSize ?? 14.0,
      color: color ?? Colors.black,
      fontWeight: LucaFontWeight.semiBold(),
      decoration: decoration,
    );
  }

  static TextStyle bold({
    double? fontSize,
    Color? color,
    TextDecoration? decoration,
  }) {
    return TextStyle(
      fontSize: fontSize ?? 14.0,
      color: color ?? Colors.black,
      fontWeight: LucaFontWeight.bold(),
      decoration: decoration,
    );
  }

  static TextStyle extraBold({
    double? fontSize,
    Color? color,
    TextDecoration? decoration,
  }) {
    return TextStyle(
      fontSize: fontSize ?? 14.0,
      color: color ?? Colors.black,
      fontWeight: LucaFontWeight.extraBold(),
      decoration: decoration,
    );
  }
}
