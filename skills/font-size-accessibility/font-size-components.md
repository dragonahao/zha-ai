# components和views目录下文件的font-size修改
不要创建新的文件，直接在原文件中修改。

## less/scss文件 根节点添加font-size变量
```
--font-size-scale-factor: 1;
```
## 动态计算字体大小font-size属性
- 将 font-size:Nrpx 转换为 calc(Nrpx * var(--font-size-scale-factor))
- 比如 font-size:2rpx 转换为 calc(2rpx * var(--font-size-scale-factor))

## 为组件添加 rootFontSizeStyle 属性
```tsx
rootFontSizeStyle : React.CSSProperties
```

## 为组件设置 rootFontSizeStyle 属性
```tsx
// 举例
<Component rootFontSizeStyle={rootFontSizeStyle} />
```

