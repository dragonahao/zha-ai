import os
import re
import glob
import sys

def get_scss_files(dir_path):
    return glob.glob(os.path.join(dir_path, '**/*.scss'), recursive=True)

def handle_scss_file(file_path):
    modified = False
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        original_content = content
        if(original_content.count("utilities/text") or original_content.count("utilities/_text") ):
            print(f"文件路径是 {file_path}")
            import_pattern = r'@import\s+"([^"]*utilities/_?text)"'
            content = re.sub(import_pattern, r'@use "\1" as txt', content)

            fs_pattern = r'\$fs-(\d+)'
            content = re.sub(fs_pattern, r'txt.$fs-\1', content)
            
            fw_pattern = r'\$fw-(\w+)'
            content = re.sub(fw_pattern, r'txt.$fw-\1', content)

            if content != original_content:
                with open(file_path, 'w', encoding='utf-8') as file:
                    file.write(content)
                print(f"✓ {file_path}")
                return True
    except Exception as e:
        print(f"✗ {file_path}: {e}")
    
    return modified

def main():
    dir_path = sys.argv[1] if len(sys.argv) > 1 else '.'
    print(f"开始处理目录: {dir_path}")
    print("-" * 50)

    scss_files = get_scss_files(dir_path)
    modified_files = []

    for scss_file in scss_files:
        if handle_scss_file(scss_file):
            modified_files.append(scss_file)

    print("-" * 50)
    print(f"处理完成！共修改 {len(modified_files)} 个文件")

if __name__ == "__main__":
    main()
