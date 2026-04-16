import 'package:flutter/widgets.dart';
import 'package:get/get.dart';

class LucaRouter {
  LucaRouter._privateConstructor();
  static final LucaRouter _instance = LucaRouter._privateConstructor();
  static LucaRouter get instance {
    return _instance;
  }

  String _rootRoute = "";

  void setRootRoute(String route) {
    _rootRoute = route;
  }

  // 跳转到页面
  Future<T?>? toNamed<T>(
    String page, {
    dynamic arguments,
    int? id,
    bool preventDuplicates = false,
    Map<String, String>? parameters,
    bool closePreviousPage = false,
  }) async {
    if (closePreviousPage) {
      return offNamed(
        page,
        arguments: arguments,
        id: id,
        preventDuplicates: preventDuplicates,
        parameters: parameters,
      );
    } else {
      return Get.toNamed(
        page,
        arguments: arguments,
        id: id,
        preventDuplicates: preventDuplicates,
        parameters: parameters,
      );
    }
  }

  // 跳转到页面，关闭上个页面
  Future<T?>? offNamed<T>(
    String page, {
    dynamic arguments,
    int? id,
    bool preventDuplicates = false,
    Map<String, String>? parameters,
  }) async {
    return Get.offNamed(
      page,
      arguments: arguments,
      id: id,
      preventDuplicates: preventDuplicates,
      parameters: parameters,
    );
  }

  // 返回
  void back<T>({
    T? result,
    bool closeOverlays = false,
    bool canPop = true,
    int? id,
    String? pageName,
  }) async {
    if (pageName != null) {
      // 如果指定了页面名称，则返回到指定页面
      until((route) => Get.currentRoute == pageName);
      return;
    } else {
      Get.back(
        result: result,
        closeOverlays: closeOverlays,
        canPop: canPop,
        id: id,
      );
    }
  }

  // 跳转到新页面, 并且关闭之前的所有页面，重新设置路由
  Future<T?>? offAllNamed<T>(
    String newRouteName, {
    RoutePredicate? predicate,
    dynamic arguments,
    int? id,
    Map<String, String>? parameters,
  }) {
    setRootRoute(newRouteName);
    return Get.offAllNamed(
      newRouteName,
      predicate: predicate,
      arguments: arguments,
      id: id,
      parameters: parameters,
    );
  }

  // 跳转到根路由
  void backOffAllRoot() {
    if (_rootRoute.isEmpty) {
      return;
    }
    offAllNamed(_rootRoute);
  }

  // 返回到指定页面
  void until(RoutePredicate predicate, {int? id, String? pageName}) {
    Get.until(predicate, id: id);
  }
}

Future<T?>? lucaToNamed<T>(
  String page, {
  dynamic arguments,
  int? id,
  bool preventDuplicates = false,
  Map<String, String>? parameters,
  bool closePreviousPage = false,
}) {
  return LucaRouter.instance.toNamed<T>(
    page,
    arguments: arguments,
    id: id,
    preventDuplicates: preventDuplicates,
    parameters: parameters,
    closePreviousPage: closePreviousPage,
  );
}

void lucaBack<T>({
  T? result,
  bool closeOverlays = false,
  bool canPop = true,
  int? id,
  String? pageName,
}) {
  LucaRouter.instance.back<T>(
    result: result,
    closeOverlays: closeOverlays,
    canPop: canPop,
    id: id,
    pageName: pageName,
  );
}

Future<T?>? lucaOffAllNamed<T>(
  String newRouteName, {
  RoutePredicate? predicate,
  dynamic arguments,
  int? id,
  Map<String, String>? parameters,
}) {
  return LucaRouter.instance.offAllNamed<T>(
    newRouteName,
    predicate: predicate,
    arguments: arguments,
    id: id,
    parameters: parameters,
  );
}

void lucaBackOffAllRoot() {
  LucaRouter.instance.backOffAllRoot();
}
