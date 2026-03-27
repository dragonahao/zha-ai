import sys
import os 
import re

def split_path(rootpath: str, filepath: str):
    """
    拆分文件路径为目录路径 and 文件名
    """
    absolutePath = os.path.join(rootpath, filepath)
    allpaths = absolutePath.split(os.path.sep)
    parentPath = os.path.sep.join(allpaths[0:-1])

    fileName = allpaths[-1]
    subpackageRoot = None
    subpackageFileName = None

    os.makedirs(parentPath, exist_ok=True)
    if "pages" in allpaths:
        pagesIndex = allpaths.index("pages")
        # 找到 pages 所在的目录，假设 app.config.ts 在该目录下
        appConfigDir = os.path.sep.join(allpaths[:pagesIndex + 1])
        appConfigPath = os.path.join(appConfigDir, "app.config.ts")

        # 提取相对于 pages 的路径信息用于路由
        relativePaths = allpaths[pagesIndex:]

        if len(relativePaths) > 2:
            subpackageRoot = os.path.sep.join(relativePaths[0:2])
            subpackageFileName = os.path.sep.join(relativePaths[2:])
        else:
            subpackageRoot = relativePaths[0]
            subpackageFileName = fileName

        generate_page_template(parentPath, fileName)
        modify_app_config(appConfigPath, subpackageRoot, subpackageFileName)

    return parentPath, fileName, subpackageRoot, subpackageFileName


def generate_page_template(parentPath: str, fileName: str):
    """
    根据模板生成页面文件
    """
    os.makedirs(parentPath, exist_ok=True)
    fileNameScss = f"{fileName}.scss"
    fileNameTsx = f"{fileName}.tsx"
    
    # 获取模板目录的绝对路径，假设脚本在 scripts 目录下
    script_dir = os.path.dirname(os.path.abspath(__file__))
    template_dir = os.path.join(os.path.dirname(script_dir), "references", "page-template")

    if not os.path.exists(os.path.join(parentPath, fileNameScss)):
        template_path = os.path.join(template_dir, "fileName.scss")
        if os.path.exists(template_path):
            with open(template_path, "r", encoding="utf-8") as templateScssFile:
                templateScss = templateScssFile.read()
                templateScss = templateScss.replace("fileName", fileName)
                with open(os.path.join(parentPath, fileNameScss), "w", encoding="utf-8") as newScssFile:
                    newScssFile.write(templateScss)

    if not os.path.exists(os.path.join(parentPath, fileNameTsx)):
        template_path = os.path.join(template_dir, "fileName.tsx")
        if os.path.exists(template_path):
            with open(template_path, "r", encoding="utf-8") as templateTsxFile:
                templateTsx = templateTsxFile.read()
                templateTsx = templateTsx.replace("fileName", fileName)
                with open(os.path.join(parentPath, fileNameTsx), "w", encoding="utf-8") as newTsxFile:
                    newTsxFile.write(templateTsx)


def find_array_end(content, start_index):
    """
    从 start_index 开始，寻找数组 [ ] 的闭合位置，考虑嵌套
    """
    count = 0
    in_array = False
    for i in range(start_index, len(content)):
        if content[i] == '[':
            count += 1
            in_array = True
        elif content[i] == ']':
            count -= 1
            if count == 0 and in_array:
                return i
    return -1

def modify_app_config(appConfigPath: str, subpackageRoot: str, subpackageFileName: str):
    """
    修改 app.config.ts 文件，添加新的页面路径，注重格式化
    """
    if not os.path.exists(appConfigPath):
        print(f"Error: {appConfigPath} does not exist.")
        return

    with open(appConfigPath, "r", encoding="utf-8") as appConfigFile:
        content = appConfigFile.read()

    # 缩进检测（默认为 2 空格）
    indent = "  "
    
    # 检查 subpackageRoot 是否已经在 subPackages 数组中
    root_pattern = r'root:\s*["\']' + re.escape(subpackageRoot) + r'["\']'
    root_match = re.search(root_pattern, content)

    if root_match:
        # 子包已存在，寻找对应的 pages 数组
        obj_start = content.rfind('{', 0, root_match.start())
        count = 0
        obj_end = -1
        for i in range(obj_start, len(content)):
            if content[i] == '{': count += 1
            elif content[i] == '}':
                count -= 1
                if count == 0:
                    obj_end = i
                    break
        
        if obj_end != -1:
            obj_content = content[obj_start:obj_end+1]
            pages_match = re.search(r'pages:\s*\[', obj_content)
            if pages_match:
                pages_start_in_obj = pages_match.end() - 1
                pages_end_in_obj = find_array_end(obj_content, pages_start_in_obj)
                
                if pages_end_in_obj != -1:
                    inner_pages = obj_content[pages_match.end():pages_end_in_obj]
                    if f'"{subpackageFileName}"' not in inner_pages and f"'{subpackageFileName}'" not in inner_pages:
                        new_inner = inner_pages.strip()
                        if new_inner:
                            # 保持现有缩进风格
                            if not new_inner.endswith(','): new_inner += ','
                            new_inner += f'\n{indent * 4}"{subpackageFileName}",'
                        else:
                            new_inner = f'"{subpackageFileName}"'
                        
                        # 重新组装对象内容，保持括号缩进
                        new_obj_content = obj_content[:pages_match.end()] + "\n" + indent * 4 + new_inner.strip() + "\n" + indent * 3 + obj_content[pages_end_in_obj:]
                        new_content = content[:obj_start] + new_obj_content + content[obj_end+1:]
                        with open(appConfigPath, "w", encoding="utf-8") as f:
                            f.write(new_content)
                        print(f"Added '{subpackageFileName}' to existing subpackage '{subpackageRoot}'.")
                        return

    # 子包不存在，在 subPackages 数组中插入新项
    subpackages_match = re.search(r'subPackages:\s*\[', content)
    if subpackages_match:
        array_start = subpackages_match.end() - 1
        array_end = find_array_end(content, array_start)
        
        if array_end != -1:
            inner_content = content[subpackages_match.end():array_end].strip()
            
            prefix_comma = ""
            if inner_content:
                if not inner_content.endswith(','):
                    prefix_comma = ","
            
            # 构建结构化的新子包配置
            new_subpackage = (
                f'{prefix_comma}\n{indent * 2}{{\n'
                f'{indent * 3}root: "{subpackageRoot}",\n'
                f'{indent * 3}pages: ["{subpackageFileName}"],\n'
                f'{indent * 2}}}'
            )
            
            # 在 array_end 之前插入，保持 subPackages 数组的闭合括号缩进
            new_content = content[:array_end].rstrip() + new_subpackage + "\n" + indent + content[array_end:]
            with open(appConfigPath, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Created new subpackage '{subpackageRoot}' with page '{subpackageFileName}'.")
    else:
        print("Error: Could not find subPackages array in app.config.ts")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 mini-route.py <rootpath> <filepath>")
        sys.exit(1)
    rootpath = sys.argv[1]
    filepath = sys.argv[2]
    split_path(rootpath, filepath)
