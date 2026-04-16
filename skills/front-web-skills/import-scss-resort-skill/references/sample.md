# 调整示例
- 将 `import '.scss|.less'` 语句重排到导入语句的最后

```js
// 示例一
//调整之前
import "./b";
import "./index.scss";
import "./a";
const ComponentA = lazy(()=>import("./componentA"))
//调整之后
import "./b";
import "./a";
const ComponentA = lazy(()=>import("./componentA"))
import "./index.scss";

// 示例二
//调整之前
import "./b";
import "./index.less";
import "./a";
const ComponentB = lazy(()=>import("./componentB").then((module)=>({default:module.ComponentB})))

//调整之后
import "./b";
import "./a";
const ComponentB = lazy(()=>import("./componentB").then((module)=>({default:module.ComponentB})))
import "./index.less";

```