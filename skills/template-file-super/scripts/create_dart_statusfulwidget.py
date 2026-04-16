import sys
import os 
import re

def split_path(rootpath: str, filepath: str):
    """
    拆分文件路径为目录路径 and 文件名
    """
    allpaths = filepath.split(os.path.sep)
    parentPath = os.path.sep.join([rootpath] + allpaths[0:-1])

    fileName = allpaths[-1]
 
    generate_page_template(parentPath, fileName)

    return parentPath, fileName


def generate_page_template(parentPath: str, fileName: str):
    """
    根据模板生成页面文件
    """
    os.makedirs(parentPath, exist_ok=True)
    fileNameLogic = f"{fileName}Logic.dart"
    fileNameState = f"{fileName}State.dart"
    fileNamePage = f"{fileName}Page.dart"

    # 获取模板目录的绝对路径，假设脚本在 scripts 目录下
    script_dir = os.path.dirname(os.path.abspath(__file__))
    template_dir = os.path.join(os.path.dirname(script_dir), "references", "template-dart-statefulwidget")

    if not os.path.exists(os.path.join(parentPath, fileNameLogic)):
        template_path = os.path.join(template_dir, "fileNameLogic.dart")
        if os.path.exists(template_path):
            with open(template_path, "r", encoding="utf-8") as templateLogicFile:
                templateLogic = templateLogicFile.read()
                templateLogic = templateLogic.replace("fileName", fileName)
                with open(os.path.join(parentPath, fileNameLogic), "w", encoding="utf-8") as newLogicFile:
                    newLogicFile.write(templateLogic)

    if not os.path.exists(os.path.join(parentPath, fileNameState)):
        template_path = os.path.join(template_dir, "fileNameState.dart")
        if os.path.exists(template_path):
            with open(template_path, "r", encoding="utf-8") as templateStateFile:
                templateState = templateStateFile.read()
                templateState = templateState.replace("fileName", fileName)
                with open(os.path.join(parentPath, fileNameState), "w", encoding="utf-8") as newStateFile:
                    newStateFile.write(templateState)

    if not os.path.exists(os.path.join(parentPath, fileNamePage)):
        template_path = os.path.join(template_dir, "fileNamePage.dart")
        if os.path.exists(template_path):
            with open(template_path, "r", encoding="utf-8") as templatePageFile:
                templatePage = templatePageFile.read()
                templatePage = templatePage.replace("fileName", fileName)
                with open(os.path.join(parentPath, fileNamePage), "w", encoding="utf-8") as newPageFile:
                    newPageFile.write(templatePage)


 

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 create-dart-statefulwidget.py <rootpath> <filepath>")
        sys.exit(1)
    rootpath = sys.argv[1]
    filepath = sys.argv[2]
    split_path(rootpath, filepath)
