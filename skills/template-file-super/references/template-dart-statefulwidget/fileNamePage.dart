import 'package:flutter/material.dart';
import 'fileNameLogic.dart';

class fileNamePage extends StatefulWidget {
  @override
  _fileNamePageState createState() => _fileNamePageState();
}

class _fileNamePageState extends State<fileNamePage> {
  final logic = filenameLogic();

  @override
  void initState() {
    logic.onInit();
    super.initState();
    logic.onReady();
  }

  @override
  void dispose() {
    logic.onClose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('fileNamePage')),
      body: Center(child: Text('This is the fileNamePage')),
    );
  }
}
