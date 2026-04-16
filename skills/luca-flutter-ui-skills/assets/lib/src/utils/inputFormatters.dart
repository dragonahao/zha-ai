import 'package:flutter/services.dart';

class LucaInputFormatters {
  /// 只允许输入数字
  static List<TextInputFormatter> onlyNumber() {
    return [
      FilteringTextInputFormatter.allow(RegExp(r'^\d*')),
    ];
  }

  /// 只允许输入字母
  static List<TextInputFormatter> onlyLetter() {
    return [
      FilteringTextInputFormatter.allow(RegExp(r'^[a-zA-Z]*')),
    ];
  }

  /// 只允许输入字母和数字
  static List<TextInputFormatter> onlyLetterAndNumber() {
    return [
      FilteringTextInputFormatter.allow(RegExp(r'^[a-zA-Z0-9]*')),
    ];
  }

  /// 设置最大长度
  static List<TextInputFormatter> maxLength(int length) {
    return [
      LengthLimitingTextInputFormatter(length),
    ];
  }

  /// 手机号，最多11位数字
  static List<TextInputFormatter> phoneNumber() {
    return [
      FilteringTextInputFormatter.digitsOnly,
      LengthLimitingTextInputFormatter(11),
    ];
  }

  /// 身份证号码：最多18位（含X）
  static List<TextInputFormatter> idCard() {
    return [
      FilteringTextInputFormatter.allow(RegExp(r'[0-9Xx]')),
      LengthLimitingTextInputFormatter(18),
    ];
  }

  /// 组合多个 formatter
  static List<TextInputFormatter> chain(List<TextInputFormatter> formatters) {
    return formatters;
  }

  /// 邮箱地址：基础字符限制
  static TextInputFormatter email() {
    return FilteringTextInputFormatter.allow(
      RegExp(r'[a-zA-Z0-9@._-]'),
    );
  }

  /// 纯英文用户名（字母和下划线）
  static TextInputFormatter username() {
    return FilteringTextInputFormatter.allow(RegExp(r'^[a-zA-Z_]+$'));
  }
}
