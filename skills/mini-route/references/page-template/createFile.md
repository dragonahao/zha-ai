## 创建文件

- 创建目录 `parentPath`
- 创建在`parentPath`路径下创建`fileName`文件
- 创建 `fileName`.scss文件，并在其中添加基础样式代码
- 创建 `fileName`.tsx文件，并在其中添加基础组件代码

# 参考文件模板

- `fileName`.scss文件模板 ，读取自`references/page-template/fileName.scss`
- `fileName`.tsx文件模板，读取自`references/page-template/fileName.tsx`
- 用解读到的`fileName`处理模板中的占位符，生成最终的文件内容


## 分配路由

- 在pages/app.config.ts中的subpackage下,添加路由配置

```js
{
      root: `${subpackageRoot}`,
      pages: [`${subpackageFileName}`],
    }
```