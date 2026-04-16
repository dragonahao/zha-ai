import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class LucaAppPage extends StatefulWidget {
  final LucaAppPageConfig config;

  const LucaAppPage({
    super.key,
    required this.config,
  });

  @override
  State<StatefulWidget> createState() {
    return _LucaAppPageState();
  }
}

final RouteObserver<PageRoute> appRouteObserver = RouteObserver<PageRoute>();

class _LucaAppPageState extends State<LucaAppPage> {
  @override
  void initState() {
    widget.config.pageOnInit();
    super.initState();
    widget.config.pageOnReady();
  }

  @override
  void dispose() {
    widget.config.pageOnDispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      navigatorObservers: [appRouteObserver],
      debugShowCheckedModeBanner: widget.config.debugShowCheckedModeBanner,
      theme: widget.config.theme,
      themeMode: widget.config.themeMode,
      darkTheme: widget.config.darkTheme,
      initialRoute: widget.config.initialRoute,
      getPages: widget.config.getPages,
      unknownRoute: widget.config.unknownRoute,
      translations: widget.config.translations,
      onInit: widget.config.onInit,
      onReady: widget.config.onReady,
      onDispose: widget.config.onDispose,
      enableLog: widget.config.enableLog,
      defaultTransition: widget.config.defaultTransition,
      color: widget.config.color,
      locale: widget.config.locale,
      fallbackLocale: widget.config.fallbackLocale,
      builder: (context, child) {
        return widget.config.onBuilder(
          context,
          child ?? const SizedBox.shrink(),
        );
      },
    );
  }
}

abstract class LucaAppPageConfig {
  // 注册路由Pages
  List<GetPage> get getPages;

  // 初始化路由
  String get initialRoute;

  // 未知路由
  GetPage get unknownRoute => GetPage(
        name: '/not-found',
        page: () => const Scaffold(
          body: Center(child: Text('Page not found')),
        ),
      );

  // 应用主题
  ThemeData get theme;

  // 可选的暗黑主题
  ThemeData? get darkTheme => null;

  // 默认主图
  ThemeMode get themeMode => ThemeMode.light;

  // 可选的翻译
  Translations? translations;

  // 是否启用日志
  bool get enableLog => kDebugMode;

  // 是否展示调试模式横幅
  bool get debugShowCheckedModeBanner => false;

  // 可选的过渡动画
  Transition get defaultTransition => Transition.rightToLeft;

  // color
  Color get color => Colors.white;

  // 可选的构建器
  Widget onBuilder(context, child) {
    return MediaQuery(
      data: MediaQuery.of(context).copyWith(textScaler: TextScaler.noScaling),
      child: child,
    );
  }

  // 默认语言
  Locale get locale => const Locale('zh', 'CN');

  // 可选的备用语言
  Locale get fallbackLocale => const Locale('zh', 'CN');

  // Get 生命周期方法 1
  void onInit() {}

  // Get 生命周期方法 2
  void onReady() {}

  // Get 生命周期方法 3
  void onDispose() {}

  // app生命周期方法
  void pageOnInit() {}

  // 页面生命周期方法
  void pageOnReady() {}

  // 页面销毁方法
  void pageOnDispose() {}
}
