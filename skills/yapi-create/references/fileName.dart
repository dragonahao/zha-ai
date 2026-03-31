import 'package:json_annotation/json_annotation.dart';
part 'fileName.g.dart';

@JsonSerializable()
class `fileName` {
  // 属性定义
  int? propertyName;
  String? propertyName2;

  // 全参数
  `fileName`({
    this.propertyName,
    this.propertyName2,
  });

  // 模板方法
  factory `fileName`.fromJson(Map<String, dynamic> json) =>
      _$`fileName`FromJson(json);
  Map<String, dynamic> toJson() => _$`fileName`ToJson(this);
}
