import 'package:flutter/material.dart';
import 'package:ui_package/src/utils/debouncer.dart';

/// 自动释放资源的 mixin
mixin LucaAutoDisposeMixin<T extends StatefulWidget> on State<T> {
  final List<ChangeNotifier> _notifierDisposables = [];
  final List<ScrollController> _scrollDisposables = [];
  final List<FocusNode> _focusDisposables = [];
  final List<TextEditingController> _textEditingDisposables = [];
  final List<TabController> _tabDisposables = [];
  final List<AnimationController> _animationDisposables = [];
  final List<LucaDebouncer> _debouncerDisposables = [];

  TController
      registerChangeNotifierController<TController extends ChangeNotifier>(
          TController controller) {
    _notifierDisposables.add(controller);
    return controller;
  }

  TController registerScrollController<TController extends ScrollController>(
      TController controller) {
    _scrollDisposables.add(controller);
    return controller;
  }

  TFocus registerFocusNode<TFocus extends FocusNode>(TFocus node) {
    _focusDisposables.add(node);
    return node;
  }

  TController
      registerTextEditingController<TController extends TextEditingController>(
          TController controller) {
    _textEditingDisposables.add(controller);
    return controller;
  }

  TController registerTabController<TController extends TabController>(
      TController controller) {
    _tabDisposables.add(controller);
    return controller;
  }

  TController
      registerAnimationController<TController extends AnimationController>(
          TController controller) {
    _animationDisposables.add(controller);
    return controller;
  }

  LucaDebouncer registerDebouncer(LucaDebouncer debouncer) {
    _debouncerDisposables.add(debouncer);
    return debouncer;
  }

  @override
  void dispose() {
    for (final notifier in _notifierDisposables) {
      notifier.dispose();
    }

    for (final scrollController in _scrollDisposables) {
      scrollController.dispose();
    }

    for (final focusNode in _focusDisposables) {
      focusNode.dispose();
    }

    for (final textEditingController in _textEditingDisposables) {
      textEditingController.dispose();
    }

    for (final tabController in _tabDisposables) {
      tabController.dispose();
    }

    for (final animationController in _animationDisposables) {
      animationController.dispose();
    }

    for (final debouncer in _debouncerDisposables) {
      debouncer.dispose();
    }

    super.dispose();
  }

  @override
  void initState() {
    super.initState();
  }
}
