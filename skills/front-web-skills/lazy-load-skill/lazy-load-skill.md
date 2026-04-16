---
name: lazy-load-skill
description: lazy-load改造组件和页面，当用户指明为文件引入React.lazy时使用
---

# 核心功能

- 为文件使用的组件引入 React.lazy 改造，加速页面载入
- 按照5步操作步骤进行改造

# 严格约束

- 只能修改文件的导入结构
- 不要修改组件的 return 结构
- 不要引入<Suspense></Suspense>
- 不要修改import语句中的路径
- **只有以下库的组件，不需要分析也不需要改造**：
  - from "antd"
  - from "reactstrap"
  - from "@luca/antd-ui"
- 项目内部组件，只要在jsx中使用了，**都需要**懒加载改造
- React.lazy 天生只支持 默认导出（export default）
- **被导入的文件（A），如果内部也有内部组件依赖（B），可以改造（A）内部的导入方式**：例如 `BarChart.js` 被 `index.js` 懒加载引入后，`BarChart.js` 内部使用的 `Echarts` 也可以改为懒加载

# 操作步骤

## 第一步：识别所有使用的组件名称 Tag

### 1.1 从 JSX 中识别
从 return 中分析出 <Tag></Tag> 或 <Tag /> 的组件名称 Tag

### 1.2 从 Barrel 文件导入中识别（重要补充）
如果文件使用批量导入模式：
```js
import { ComponentA, ComponentB } from "./index";
import { ComponentC, ComponentD } from "./components";
```
需要进一步分析这些组件是否在 JSX 中使用，通常这些批量导入的组件就是页面使用的组件。

### 1.3 组件定义位置判断
- 如果组件定义在 `const ComponentName = ({...}) => {` 或 `function ComponentName()` 且被导出到外部通过 <ComponentName /> 或 <ComponentName></ComponentName>使用，则是组件

## 第二步：分析被导入文件的的导出方式，导入语句改造为 const Tag= lazy() 的机制,不要去修改被导入文件的内容

### 2.1 判断导出方式
- 检查被导入文件是否有 `export default`
- 如果有，组件是**默认导出**
- 如果只有 `export { A, B }`，组件是**命名导出**

### 2.2 Barrel 文件特殊处理
当从 barrel 文件（如 `./index`、`./components`）批量导入时：
- **优先独立导入**：将 `import { A, B } from "./index"` 拆分为多个独立导入
  ```js
  // 改造前
  import { LzTable, LzPageContainer } from "components/LucaZenithUI";
  
  // 改造后
  const LzTable = lazy(() => import("components/LucaZenithUI").then(module => ({ default: module.LzTable })));
  const LzPageContainer = lazy(() => import("components/LucaZenithUI").then(module => ({ default: module.LzPageContainer })));
  ```
- **然后判断每个组件的导出方式**：
  - 默认导出：`lazy(() => import("./xxx"))`
  - 命名导出：`lazy(() => import("./xxx").then(module => ({ default: module.XXX })))`

## 第三步：确保已经导入 lazy
- `import { lazy } from "react"; `


# 组件Tag分析,举个例子
- 如果改造结果为 `const A = lazy(()=>import("./a"))`，则 A 为组件名称   
## 组件改造示例一
|改造之前|改造之后|
|---|--|
|import A from "./a"  | const A = lazy(()=>import("./a")) 而不是 const A = lazy(()=>import("./a").then((module)=>({default:module.default})))|
|import {B} from "./b"| const B = lazy(()=>import("./b").then((module)=>({default:module.B})))|
## 组件改造示例二（Barrel 文件处理）
```js
//改造之前

import { CustomConfirm } from "components/ModalConfirm";

// 改造之后

const CustomConfirm = lazy(() => import("components/ModalConfirm").then(module => ({ default: module.CustomConfirm })));

```
 
# 第四步：使用**import-scss-resort-skill**技能调整文件中 '.scss'|'.less'|'.css'语句的导入

 
