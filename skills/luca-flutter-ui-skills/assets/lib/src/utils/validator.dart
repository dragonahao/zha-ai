typedef LucaValidator = String? Function(String? input);

class LucaValidatorChain {
  final List<LucaValidator> _validators = [];

  LucaValidatorChain();

  factory LucaValidatorChain.from(List<LucaValidator> validators) {
    final chain = LucaValidatorChain();
    chain._validators.addAll(validators);
    return chain;
  }

  // 支持链式调用
  LucaValidatorChain add(LucaValidator validator) {
    _validators.add(validator);
    return this;
  }

  String? validate(String? input) {
    for (final validator in _validators) {
      final result = validator(input);
      if (result != null) {
        return result; // 返回第一个不通过的验证结果
      }
    }
    return null; // 所有验证都通过
  }

  void clean() {
    _validators.clear();
  }
}

String? notEmptyValidator(String? input) {
  String s = input?.trim() ?? "";
  if (s.isEmpty) {
    return "不能为空";
  }
  return null;
}

String? Function(String? input) minLengthValidator(int minLength) {
  return (String? input) {
    String s = input?.trim() ?? "";
    if (s.length < minLength) {
      return "长度不能小于$minLength";
    }
    return null;
  };
}

String? Function(String? input) maxLengthValidator(int maxLength) {
  return (String? input) {
    String s = input?.trim() ?? "";
    if (s.length > maxLength) {
      return "长度不能大于$maxLength";
    }
    return null;
  };
}

String? mustContainNumberValidator(String? input) {
  String s = input?.trim() ?? "";
  if (s.isNotEmpty && !RegExp(r'\d').hasMatch(s)) {
    return "必须包含数字";
  }
  return null;
}
