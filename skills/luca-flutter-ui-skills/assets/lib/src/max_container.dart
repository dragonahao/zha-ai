import 'package:flutter/widgets.dart';

class LucaMaxContainerWidget extends StatelessWidget {
  const LucaMaxContainerWidget({
    super.key,
    this.child,
    this.maxWidth = 540,
    this.padding,
    this.alignment,
    this.margin,
    this.decoration,
  });

  final Widget? child;
  final double maxWidth;
  final EdgeInsetsGeometry? padding;
  final AlignmentGeometry? alignment;
  final EdgeInsetsGeometry? margin;
  final BoxDecoration? decoration;

  @override
  Widget build(BuildContext context) {
    return Container(
      alignment: alignment,
      padding: padding,
      margin: margin,
      decoration: decoration,
      child: ConstrainedBox(
        constraints: BoxConstraints(
          maxWidth: maxWidth,
        ),
        child: child,
      ),
    );
  }
}
