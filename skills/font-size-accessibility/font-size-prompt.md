# 字体根据微信设置进行变化

## 一、页面的tsx文件修改
参考  src/plugin/pages/introduce/index.tsx

### 使用相对路径引入 useRootFontSizeAccessibility 
比如
```tsx
import {useRootFontSizeAccessibility} from "../utils/use-root-fontsize-accessibility"
```
### 运用 useRootFontSizeAccessibility 函数
在页面的顶部添加
```tsx
const [rootFontSizeStyle, setRootFontSizeStyle] = useRootFontSizeAccessibility();
```

### 运用 rootFontSizeStyle 样式
在需要改变字体大小的元素上添加样式
```tsx
style={rootFontSizeStyle as React.CSSProperties}
```

## 二、scss/less文件修改
参考  src/plugin/pages/introduce/index.scss

### scss/less文件的顶部添加
```css
page{
  --font-size-scale-factor: 1;
}
```

### 动态计算字体大小font-size属性
- 将 font-size:Nrpx 转换为 calc(Nrpx * var(--font-size-scale-factor))
- 比如 font-size:2rpx 转换为 calc(2rpx * var(--font-size-scale-factor))