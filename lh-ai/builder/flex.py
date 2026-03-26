
from typing import Any
from bean import Annotation, AnnotationType, Rect
from dataclasses_json import dataclass_json
from dataclasses import dataclass
import json

class BoundsDetect:
    @staticmethod
    def is_in_rect(rect1:Rect, rect2:Rect):
        """
        判断 rect1 是否 完全在 rect2 内部
        """
        return rect1.left>=rect2.left and rect1.right<=rect2.right and rect1.top>=rect2.top and rect1.bottom<=rect2.bottom

    @staticmethod
    def is_cross_rect(rect1:Rect, rect2:Rect):
        """
        判断 rect1 和 rect2 是否 相交/重叠
        """
        return rect1.left<=rect2.right and rect1.right>=rect2.left and rect1.top<=rect2.bottom and rect1.bottom>=rect2.top

    @staticmethod
    def get_center(rect:Rect):
        """
        获取矩形的中心点
        """
        return ((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2)

    @staticmethod
    def distance_between_centers(rect1:Rect, rect2:Rect):
        """
        计算两个矩形中心点之间的距离
        """
        cx1, cy1 = BoundsDetect.get_center(rect1)
        cx2, cy2 = BoundsDetect.get_center(rect2)
        return ((cx2 - cx1) ** 2 + (cy2 - cy1) ** 2) ** 0.5



@dataclass_json
@dataclass
class FlexBox:
    parentIndex:int
    annotation:Annotation
    children:list["FlexBox"]=None
    def __init__(self,parentIndex:int, annotation:Annotation):
        self.parentIndex=parentIndex
        self.annotation = annotation
        self.children = []

    def __str__(self) -> str:
        return f"FlexBox(parentIndex={self.parentIndex}, annotationDataIndex={self.annotation.dataIndex})"

def generateHTML(item:FlexBox,result:list[str]):
     
    if(item.annotation.type==AnnotationType.CONTAINER):
        result.append(f"<div class=\"container\" data-index=\"{item.annotation.dataIndex}\" style=\"{item.annotation.element.code}\">")
        for child in item.children:
            generateHTML(child,result)
        result.append("</div>")
    else:
        if(item.annotation.type==AnnotationType.RICH_TEXT):
            result.append(f"<div class=\"richtext\" data-index=\"{item.annotation.dataIndex}\" style=\"{item.annotation.element.code}\">{item.annotation.element.code}</div>")
        elif(item.annotation.type==AnnotationType.TEXT):
            result.append(f"<span class=\"text\" data-index=\"{item.annotation.dataIndex}\" style=\"{item.annotation.element.code}\">{item.annotation.element.text}</span>")
        elif(item.annotation.type==AnnotationType.IMAGE):
            result.append(f"<img src=\"{item.annotation.element.src}\" alt=\"{item.annotation.element.code}\" data-index=\"{item.annotation.dataIndex}\" style=\"{item.annotation.element.code}\">")
class Flex:
    def __init__(self, annotations:list[Annotation]):
        self.annotations = annotations

    def get_containers(self) -> list[Annotation]:
        containers = []
        for annotation in self.annotations:
            if annotation.type == AnnotationType.CONTAINER:
                containers.append(annotation)
        return containers

    def find_nearest_parent(self, child_dataIndex:int) -> Annotation | None:
        """
        找到指定子元素的最近父容器
        child_dataIndex: 子元素的 dataIndex
        最近父容器：在所有包含该子元素的容器中，选择中心点距离最小的那个
        如果没有找到任何父容器，返回 None
        """
        child = None
        child_dataIndex_str = str(child_dataIndex)
 
        for annotation in self.annotations:
            if str(annotation.dataIndex) == child_dataIndex_str:
                child = annotation
                break

        if child is None:
             return None

        containers = self.get_containers()
 
        candidate_parents = []
        for container in containers:
            if str(container.dataIndex) != child_dataIndex_str and BoundsDetect.is_in_rect(child.rect, container.rect):
                candidate_parents.append(container)
 
        if not candidate_parents:
           
            return None

        nearest_parent = None
        min_distance = float('inf')
        for parent in candidate_parents:
            distance = BoundsDetect.distance_between_centers(child.rect, parent.rect)
            if distance < min_distance:
                min_distance = distance
                nearest_parent = parent

        return nearest_parent

    def build_tree(self) -> list[FlexBox]:
        """
        构建 FlexBox 树
        使用 find_nearest_parent 找到每个元素的最近父容器
        返回所有顶级 FlexBox 节点（没有父容器的元素组成的森林）
        """
        

        flexbox_map = {}

        for annotation in self.annotations:
            flexbox_map[str(annotation.dataIndex)] = FlexBox(-1, annotation)

        for annotation in self.annotations:
            child_flexbox = flexbox_map[str(annotation.dataIndex)]
            nearest_parent = self.find_nearest_parent(annotation.dataIndex)

            if nearest_parent is not None and str(nearest_parent.dataIndex) != str(annotation.dataIndex):
                
                parent_flexbox = flexbox_map[str(nearest_parent.dataIndex)]
                child_flexbox.parentIndex = nearest_parent.dataIndex
                parent_flexbox.children.append(child_flexbox)

        root_flexboxes = []
        for annotation in self.annotations:
            flexbox = flexbox_map[str(annotation.dataIndex)]
            if flexbox.parentIndex == -1:
                root_flexboxes.append(flexbox)

        
        return root_flexboxes

    def tree(self):
        t =  self.build_tree()
        html=[]
        generateHTML(t[0],html)
        # print("\n".join(html))
        #print(json.dumps(t, ensure_ascii=False, indent=2))
        # okay
        #s=t[0].to_json()
        #print(s)
        return t 