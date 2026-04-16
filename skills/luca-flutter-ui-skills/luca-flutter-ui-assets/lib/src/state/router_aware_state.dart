import 'package:flutter/widgets.dart';
import 'package:ui_package/ui_package.dart';

abstract class LucaRouterAwareState<T extends StatefulWidget> extends State<T>
    with RouteAware {
  @override
  void initState() {
    super.initState();
  }

  bool _subscribed = false;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    if (!_subscribed) {
      appRouteObserver.subscribe(this, ModalRoute.of(context) as PageRoute);
      _subscribed = true;
    }
  }

  @override
  void dispose() {
    super.dispose();
    appRouteObserver.unsubscribe(this);
  }

  @override
  void didPop() {
    pageDidPop();
    super.didPop();
  }

  @override
  void didPopNext() {
    pageDidPopNext();
    super.didPopNext();
  }

  @override
  void didPushNext() {
    pageDidPushNext();
    super.didPushNext();
  }

  @override
  void didPush() {
    pageDidPush();
    super.didPush();
  }

  /// 离开当前页面时调用，销毁当前页面
  /// 适合做销毁、释放资源等操作
  void pageDidPop() {}

  /// 回到当前页面时调用
  /// 适合做媒体播放、恢复等操作
  void pageDidPopNext() {}

  /// 进入下一页面时调用
  /// 适合做媒体暂停、停止等操作
  void pageDidPushNext() {}

  /// 首次进入当前页面时调用
  /// 适合做页面初始化、加载数据等操作
  void pageDidPush() {}
}
