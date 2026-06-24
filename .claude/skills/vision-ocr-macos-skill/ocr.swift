import Vision
  import AppKit
  import Foundation

  func ocrImage(_ imagePath: String) {
      guard let image = NSImage(contentsOfFile: imagePath),
            let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
          print("Failed to load image: \(imagePath)")
          return
      }

      print("Image: \(cgImage.width)x\(cgImage.height)")

      let request = VNRecognizeTextRequest()
      request.recognitionLevel = .accurate
      request.recognitionLanguages = ["zh-Hans", "en"]
      request.usesLanguageCorrection = false

      let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
      do {
          try handler.perform([request])
      } catch {
          print("OCR failed: \(error)")
          return
      }

      guard let results = request.results else {
          print("No results")
          return
      }

      print("Found \(results.count) text blocks\n")

      for (i, observation) in results.enumerated() {
          let text = observation.topCandidates(1).first?.string ?? ""
          let conf = observation.topCandidates(1).first?.confidence ?? 0
          let box = observation.boundingBox
          let y = box.origin.y
          let x = box.origin.x
          let w = box.size.width
          let h = box.size.height
          print("[\(i)] conf=\(String(format: "%.2f", conf)) y=\(String(format: "%.3f", y)) x=\(String(format: "%.3f", x)) w=\(String(format: "%.3f", w)) h=\(String(format: "%.3f", h))")
          print("    \"\(text)\"")
          print()
      }
  }

  // CLI entry
  guard CommandLine.arguments.count > 1 else {
      print("Usage: swift ocr.swift <imagePath>")
      exit(1)
  }
  ocrImage(CommandLine.arguments[1])
