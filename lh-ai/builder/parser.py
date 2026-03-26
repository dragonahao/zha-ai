  
import json
from bean import Annotation, FileSystem
from flex import Flex
 
if __name__ == '__main__':
    filePath = "/Users/ahao/Downloads/lh-ai/builder/ui.json"
    content=FileSystem().readFile(filePath)
    content = json.loads(content)
    annotations=[]
    for item in content["results"]:
        annotation=Annotation()
        annotation.parse(int(item["dataIndex"]),item["annotations"])
        annotations.append(annotation)

    vv = [json.loads(annotation.to_json()) for annotation in annotations]
    print(json.dumps(vv, ensure_ascii=False, indent=2))

    flex=Flex(annotations)
    flex.tree()
