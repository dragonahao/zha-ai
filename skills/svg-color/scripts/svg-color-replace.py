#!/usr/bin/env python3
import argparse
import os
import re
import sys

def parse_color_pairs(color_str):
    """
    Parses [sourceColor,targetColor] format.
    Also supports multiple pairs if needed, e.g., [s1,t1],[s2,t2]
    """
    pairs = []
    # Match pattern [something,something]
    matches = re.findall(r'\[([^,]+),([^\]]+)\]', color_str)
    for src, tgt in matches:
        pairs.append((src.strip(), tgt.strip()))
    
    if not pairs and ',' in color_str:
        # Fallback if brackets are missing but comma is present
        parts = color_str.replace('[','').replace(']','').split(',')
        if len(parts) >= 2:
            pairs.append((parts[0].strip(), parts[1].strip()))
            
    return pairs

def replace_colors_in_svg(file_path, color_pairs):
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} not found.")
        return False

    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False

    original_content = content
    for src, tgt in color_pairs:
        s_esc = re.escape(src)
        # Match as a color value
        pattern = re.compile(s_esc, re.IGNORECASE)
        content = pattern.sub(tgt, content)

    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully updated: {file_path}")
        return True
    return False

def process_path(input_path, color_pairs):
    if os.path.isfile(input_path):
        if input_path.lower().endswith('.svg'):
            replace_colors_in_svg(input_path, color_pairs)
        else:
            print(f"Skipping non-SVG file: {input_path}")
    elif os.path.isdir(input_path):
        print(f"Processing directory: {input_path}")
        for root, dirs, files in os.walk(input_path):
            for file in files:
                if file.lower().endswith('.svg'):
                    full_path = os.path.join(root, file)
                    replace_colors_in_svg(full_path, color_pairs)
    else:
        print(f"Error: Path {input_path} is not a file or directory.")

def main():
    parser = argparse.ArgumentParser(description='Replace colors in SVG files or directories.')
    parser.add_argument('-i', '--input', required=True, help='Input SVG file or directory path')
    parser.add_argument('-color', required=True, help='Color replacement in format [sourceColor,targetColor]')

    args = parser.parse_args()

    color_pairs = parse_color_pairs(args.color)
    if not color_pairs:
        print("Error: Invalid color format. Use [sourceColor,targetColor]")
        sys.exit(1)

    process_path(args.input, color_pairs)

if __name__ == '__main__':
    main()
