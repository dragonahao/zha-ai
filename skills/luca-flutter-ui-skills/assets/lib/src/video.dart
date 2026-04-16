// ignore_for_file: deprecated_member_use

import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';

import 'app.dart';

class LucaVideoComponent extends StatefulWidget {
  final double? width;
  final double? height;
  final String assetPath;
  final bool autoPlay;
  final bool isLooping;
  final BorderRadius borderRadius;
  final bool isNetwork;

  const LucaVideoComponent({
    super.key,
    required this.assetPath,
    this.width,
    this.height,
    this.autoPlay = true,
    this.isLooping = true,
    this.isNetwork = false,
    this.borderRadius = const BorderRadius.all(Radius.circular(0.0)),
  });

  @override
  State<StatefulWidget> createState() {
    return _LucaVideoComponentState();
  }
}

class _LucaVideoComponentState extends State<LucaVideoComponent>
    with RouteAware {
  late VideoPlayerController? _videoController;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    appRouteObserver.subscribe(this, ModalRoute.of(context) as PageRoute);
  }

  @override
  void dispose() {
    _videoController?.dispose();
    appRouteObserver.unsubscribe(this);
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    _initializeVideo();
  }

  void _initializeVideo() {
    if (widget.isNetwork) {
      _videoController =
          VideoPlayerController.network(Uri.parse(widget.assetPath).toString())
            ..initialize().then((_) {
              _videoController?.setLooping(widget.isLooping);
              if (widget.autoPlay) {
                _videoController?.play();
              }
              setState(() {});
            });
    } else {
      _videoController = VideoPlayerController.asset(widget.assetPath)
        ..initialize().then((_) {
          _videoController?.setLooping(widget.isLooping);
          if (widget.autoPlay) {
            _videoController?.play();
          }
          setState(() {});
        });
    }
  }

  @override
  void didPushNext() {
    _videoController?.pause();
  }

  @override
  void didPopNext() {
    _videoController?.play();
  }

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: widget.borderRadius,
      child: SizedBox(
        width: widget.width ?? 300.0,
        height: widget.height ?? 300.0,
        child: _videoController != null
            ? VideoPlayer(_videoController!)
            : const SizedBox(),
      ),
    );
  }
}
