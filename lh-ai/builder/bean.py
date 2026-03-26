from dataclasses_json import dataclass_json
from dataclasses import dataclass
import enum
 
class FileSystem:
    def readFile(self, file_path):
        with open(file_path, 'r',encoding="utf-8") as f:
            data = f.read()
        return data

    def writeFile(self, file_path, data):
        with open(file_path, 'w',encoding="utf-8") as f:
            f.write(data)

@dataclass_json
@dataclass 
class Position:
    x:float
    y:float
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __str__(self):
        return f"Position(x={self.x}, y={self.y})"

@dataclass_json
@dataclass 
class Size:
    width:float
    height:float
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def __str__(self):
        return f"Size(width={self.width}, height={self.height})"

@dataclass_json
@dataclass 
class Rect:
    left:float
    right:float
    top:float
    bottom:float
    width:float
    height:float
    def __init__(self, position:Position, size:Size):
       
        self.width=size.width
        self.height=size.height

        self.left=position.x
        self.right=size.width+position.x
        self.top=position.y
        self.bottom=position.y+size.height
    def __str__(self) -> str:
        return f"Rect(left={self.left}, right={self.right}, top={self.top}, bottom={self.bottom}, width={self.width}, height={self.height})"
 
 
class AnnotationType(enum.Enum):
    CONTAINER="container"
    RICH_TEXT="richtext"
    TEXT="text"
    IMAGE="image"

    def serialize(self):
        return self.value


@dataclass_json
@dataclass 
class Element:
    pass

@dataclass_json
@dataclass 
class ElementImage(Element):
    code:str
    src:str
    def __init__(self,code:str,src:str=""):
        self.code=code
        self.src=src

    def __str__(self):
        return f"ElementImage(code={self.code}, src={self.src})"
    
    @staticmethod
    def parse(item:list[dict]):
        last=item[-1]
        return ElementImage(last["code"],last["properties"]["切图名称"])
 
@dataclass_json
@dataclass 
class ElementText(Element):
    code:str
    text:str
    def __init__(self,code:str,text:str=""):
        self.code=code
        self.text=text

    def __str__(self):
        return f"ElementText(code={self.code}, text={self.text})"

    @staticmethod
    def parse(item:list[dict]):
        itemSecond=item[1]
        last = item[-1]
        text=itemSecond["properties"]["内容"]
        code=last["code"]
        return ElementText(code,text)

@dataclass_json
@dataclass 
class ElementRichTextSpan(Element):
    code:str
    text:str
    def __init__ (self,code:str,text:str=""):
        self.code=code
        self.text=text

@dataclass_json
@dataclass 
class ElementRichText(Element):
    code:str
    text:str
    children:list[ElementRichTextSpan]

    def __init__(self,code:str,src:str=""):
        self.code=code
        self.src=src
    
    def __str__(self):
        return f"ElementRichText(code={self.code}, src={self.src})"
        
    @staticmethod
    def parse(item:list[dict]):
        itemSecond=item[1]
        last=item[-1]
        children=item[2:-2]
        el =  ElementRichText("","")
        el.code=last["code"]
        el.text=itemSecond["properties"]["内容"]
        el.children=[]
        for child in children:
            props = child["properties"]
            colors = child["colors"]
            span = ElementRichTextSpan(props,props["内容"])
            el.children.append(span)

        return el 
 

@dataclass_json
@dataclass 
class ElementContainer(Element):
    code:str
    def __init__(self,code:str):
        self.code=code 
    
    def __str__(self):
        return f"ElementContainer(code={self.code})"
        
    @staticmethod
    def parse(item:list[dict]):
        last=item[-1]
        return ElementContainer(last["code"])

 
@dataclass_json()
@dataclass 
class Annotation:
    dataIndex:int=0
    rect:Rect=None
    type:AnnotationType=AnnotationType.CONTAINER # 容器、富文本、文本、图片等
    element:Element=None


    def __str__(self):
        return f"Annotation(dataIndex={self.dataIndex}, rect={self.rect}, type={self.type}, element={self.element})"
     
    def parse(self,dataIndex:int, results:list[dict]):
        self.dataIndex=dataIndex
        itemFirst=results[0]
        self.parse_position_size_type(itemFirst)
           
        if self.type==AnnotationType.CONTAINER:
            self.parse_container(results)
        elif self.type==AnnotationType.IMAGE:
            self.parse_image(results)
        elif self.type==AnnotationType.TEXT:
            self.parse_text(results)
        elif self.type==AnnotationType.RICH_TEXT:
            self.parse_rich_text(results)
         
    def parse_position_size_type(self,item:dict):
        self.type=AnnotationType(item["type"])
        position=Position(float(item["position"]["x"].replace("px","")),float(item["position"]["y"].replace("px","")))
        size=Size(float(item["size"]["width"].replace("px","")),float(item["size"]["height"].replace("px","")))
        self.rect=Rect(position,size)
    
    def parse_container(self,item:list[dict]):
        self.element=ElementContainer.parse(item)

    def parse_image(self,item:list[dict]):
        self.element=ElementImage.parse(item)
        self.element.code=f"width:{self.rect.width}px;height:{self.rect.height}px;"

    def parse_text(self,item:list[dict]):
        self.element=ElementText.parse(item)
    
    def parse_rich_text(self,item:list[dict]):
        self.element=ElementRichText.parse(item)
