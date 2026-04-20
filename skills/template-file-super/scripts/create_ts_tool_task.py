import os
import re
import sys


def split_path(rootpath: str, filepath: str):
    """
    拆分文件路径为目录路径 and 文件名
    """
    absolutePath = os.path.join(rootpath, filepath)
    allpaths = absolutePath.split(os.path.sep)
    parentPath = os.path.sep.join(allpaths[0:-1])

    fileName = allpaths[-1]

    # parentPath=os.path.sep.join([parentPath, fileName])

    generate_page_template(parentPath, fileName)

    return parentPath, fileName


def generate_page_template(parentPath: str, fileName: str):
    """
    根据模板生成页面文件
    """
    os.makedirs(parentPath, exist_ok=True)
    fileNameTs = f"{fileName}.ts"

    # 获取模板目录的绝对路径，假设脚本在 scripts 目录下
    script_dir = os.path.dirname(os.path.abspath(__file__))
    template_dir = os.path.join(
        os.path.dirname(script_dir), "references", "template-ts-tool-task"
    )

    if not os.path.exists(os.path.join(parentPath, fileNameTs)):
        template_path = os.path.join(template_dir, "fileName.ts")
        with open(template_path, "r", encoding="utf-8") as templateTsFile:
            templateTs = templateTsFile.read()
            templateTs = templateTs.replace("fileName", fileName)
            with open(
                os.path.join(parentPath, fileNameTs), "w", encoding="utf-8"
            ) as newTsFile:
                newTsFile.write(templateTs)


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 create-taro-scss.py <rootpath> <filepath>")
        sys.exit(1)
    rootpath = sys.argv[1]
    filepath = sys.argv[2]
    split_path(rootpath, filepath)
