---
name: vision-ocr-macos-skill
description: Use when extracting text from images or screenshots, especially Chinese/English mixed content, or when needing precise text positions (bounding boxes) from UI screenshots
---

# Vision OCR macOS

## Overview

Use macOS Vision framework (`VNRecognizeTextRequest`) for precise OCR on images. Returns text with per-character bounding box coordinates and confidence scores. Unlike AI-based image reading, Vision OCR does not hallucinate or summarize—it reports exactly what it detects.

## When to Use

- Extracting text from UI screenshots, charts, tables
- Chinese + English mixed content
- Need pixel-level text positions (bounding boxes) to reconstruct layout
- AI image reading produces inaccurate or incomplete text

## When NOT to Use

- Need color, font size, or style information (Vision OCR is text-only)
- Handwritten text (accuracy significantly lower)
- Low-resolution images where text is under ~12px

## Quick Reference

| Capability | Support |
|---|---|
| Text content | Precise character-level |
| Bounding box (x,y,w,h) | Normalized coordinates |
| Confidence score | Per text block |
| Color/Style | Not supported |
| Languages | Configurable (`zh-Hans`, `en`, etc.) |

## Usage

```bash
swift ~/.claude/skills/vision-ocr-macos-skill/ocr.swift <imagePath>
```

Output format:
```
Image: WxH
Found N text blocks

[i] conf=0.50 y=0.xxx x=0.xxx w=0.xxx h=0.xxx
    "extracted text"
```

## Combining with AI Image Reading

Vision OCR provides precise text + positions. AI image reading provides colors, styles, and layout structure. Use both together:

1. Run OCR for exact text and coordinates
2. Ask AI agent for colors, fonts, shadows, and layout
3. Combine into accurate HTML/CSS

## Common Mistakes

- **Relying on AI alone for text**: AI models hallucinate, summarize, or miss text. Always run OCR first for text content.
- **Not checking confidence**: Low confidence (<0.5) often means garbled text, especially for Chinese characters.
- **Forgetting to sort by y-coordinate**: OCR results are unordered. Sort by `y` descending to reconstruct top-to-bottom reading order.