 
// 位置类
class Position {
  constructor(x, y) {
    this.x = parseFloat(x);
    this.y = parseFloat(y);
  }

  toString() {
    return `Position(x=${this.x}, y=${this.y})`;
  }
  
  toJSON() {
    return { x: this.x, y: this.y };
  }

  static fromJSON(json) {
    return new Position(json.x, json.y);
  }
}

// 尺寸类
class Size {
  constructor(width, height) {
    this.width = parseFloat(width);
    this.height = parseFloat(height);
  }

  toString() {
    return `Size(width=${this.width}, height=${this.height})`;
  }

  toJSON() {
    return { width: this.width, height: this.height };
  }

  static fromJSON(json) {
    return new Size(json.width, json.height);
  }
}

// 矩形类
class Rect {
  constructor(position, size) {
    this.width = size.width;
    this.height = size.height;
    this.left = position.x;
    this.right = size.width + position.x;
    this.top = position.y;
    this.bottom = position.y + size.height;
  }

  toString() {
    return `Rect(left=${this.left}, right=${this.right}, top=${this.top}, bottom=${this.bottom}, width=${this.width}, height=${this.height})`;
  }

  toJSON() {
    return {
      left: this.left,
      right: this.right,
      top: this.top,
      bottom: this.bottom,
      width: this.width,
      height: this.height
    };
  }

  static fromJSON(json) {
    const position = new Position(json.left, json.top);
    const size = new Size(json.width, json.height);
    return new Rect(position, size);
  }
}

// 注解类型枚举
const AnnotationType = Object.freeze({
  CONTAINER: "container",
  RICH_TEXT: "richtext",
  TEXT: "text",
  IMAGE: "image",

  // 模拟枚举的 serialize 方法
  serialize: function (type) {
    return type;
  }
});

// 基础元素类
class Element {
  constructor() {
    if (new.target === Element) {
      throw new Error("Cannot instantiate abstract class Element");
    }
  }

  toJSON() {
    return { ...this };
  }

  static fromJSON(json) {
    throw new Error("Abstract method fromJSON not implemented");
  }
}

// 图片元素类
class ElementImage extends Element {
  constructor(code, src = "") {
    super();
    this.code = code;
    this.src = src;
  }

  toString() {
    return `ElementImage(code=${this.code}, src=${this.src})`;
  }

  static parse(item) {
    const last = item[item.length - 1];
    return new ElementImage(last.code, last.properties?.["切图名称"] || "");
  }

  static fromJSON(json) {
    return new ElementImage(json.code, json.src);
  }
}

// 文本元素类
class ElementText extends Element {
  constructor(code, text = "") {
    super();
    this.code = code;
    this.text = text;
  }

  toString() {
    return `ElementText(code=${this.code}, text=${this.text})`;
  }

  static parse(item) {
    const itemSecond = item[1];
    const last = item[item.length - 1];
    const text = itemSecond.properties?.["内容"] || "";
    const code = last.code;
    return new ElementText(code, text);
  }

  static fromJSON(json) {
    return new ElementText(json.code, json.text);
  }
}

// 富文本片段类
class ElementRichTextSpan extends Element {
  constructor(code, text = "") {
    super();
    this.code = code;
    this.text = text;
  }

  static fromJSON(json) {
    return new ElementRichTextSpan(json.code, json.text);
  }
}

// 富文本元素类
class ElementRichText extends Element {
  constructor(code, src = "") {
    super();
    this.code = code;
    this.src = src;
    this.text = "";
    this.children = [];
  }

  toString() {
    return `ElementRichText(code=${this.code}, src=${this.src})`;
  }

  static parse(item) {
    const itemSecond = item[1];
    const last = item[item.length - 1];
    const children = item.slice(2, -2);
    const el = new ElementRichText("", "");
    el.code = last.code;
    el.text = itemSecond.properties?.["内容"] || "";
    el.children = [];

    for (const child of children) {
      const props = child.properties;
      // 原代码中 colors 未使用，保留兼容
      // const colors = child.colors;
      const span = new ElementRichTextSpan(props, props?.["内容"] || "");
      el.children.push(span);
    }
    return el;
  }

  static fromJSON(json) {
    const el = new ElementRichText(json.code, json.src);
    el.text = json.text;
    el.children = json.children?.map(c => ElementRichTextSpan.fromJSON(c)) || [];
    return el;
  }
}

// 容器元素类
class ElementContainer extends Element {
  constructor(code) {
    super();
    this.code = code;
  }

  toString() {
    return `ElementContainer(code=${this.code})`;
  }

  static parse(item) {
    const last = item[item.length - 1];
    return new ElementContainer(last.code);
  }

  static fromJSON(json) {
    return new ElementContainer(json.code);
  }
}

// 注解核心类 ,处理的结果更加精致
class Annotation {
  constructor() {
    this.dataIndex = 0;
    this.rect = null;
    this.type = AnnotationType.CONTAINER;
    this.element = null;
  }

  toString() {
    return `Annotation(dataIndex=${this.dataIndex}, rect=${this.rect?.toString()}, type=${this.type}, element=${this.element?.toString()})`;
  }

  parse(dataIndex, results) {
    this.dataIndex = dataIndex;
    const itemFirst = results[0];
    this.parse_position_size_type(itemFirst);

    switch (this.type) {
      case AnnotationType.CONTAINER:
        this.parse_container(results);
        break;
      case AnnotationType.IMAGE:
        this.parse_image(results);
        break;
      case AnnotationType.TEXT:
        this.parse_text(results);
        break;
      case AnnotationType.RICH_TEXT:
        this.parse_rich_text(results);
        break;
    }
  }

  parse_position_size_type(item) {
    this.type = item.type;
    const positionX = item.position.x.replace("px", "");
    const positionY = item.position.y.replace("px", "");
    const position = new Position(positionX, positionY);

    const sizeWidth = item.size.width.replace("px", "");
    const sizeHeight = item.size.height.replace("px", "");
    const size = new Size(sizeWidth, sizeHeight);

    this.rect = new Rect(position, size);
  }

  parse_container(item) {
    this.element = ElementContainer.parse(item);
  }

  parse_image(item) {
    this.element = ElementImage.parse(item);
    this.element.code = `width:${this.rect.width}px;height:${this.rect.height}px;`;
  }

  parse_text(item) {
    this.element = ElementText.parse(item);
  }

  parse_rich_text(item) {
    this.element = ElementRichText.parse(item);
  }

  toJSON() {
    return {
      dataIndex: this.dataIndex,
      rect: this.rect?.toJSON(),
      type: this.type,
      element: this.element?.toJSON()
    };
  }

  static fromJSON(json) {
    const annotation = new Annotation();
    annotation.dataIndex = json.dataIndex;
    annotation.rect = json.rect ? Rect.fromJSON(json.rect) : null;
    annotation.type = json.type;
    
    switch (json.type) {
      case AnnotationType.CONTAINER:
        annotation.element = ElementContainer.fromJSON(json.element);
        break;
      case AnnotationType.IMAGE:
        annotation.element = ElementImage.fromJSON(json.element);
        break;
      case AnnotationType.TEXT:
        annotation.element = ElementText.fromJSON(json.element);
        break;
      case AnnotationType.RICH_TEXT:
        annotation.element = ElementRichText.fromJSON(json.element);
        break;
    }
    return annotation;
  }
}
 

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Annotation;
}else{
  // 浏览器环境，将函数添加到全局作用域
  window.Annotation =  Annotation
}