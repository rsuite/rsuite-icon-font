# RSUITE Icon Svg
rsuite 全部图标源文件
## 快速入门
### 安装
```bash
npm install -D rsuite-icon-svg 
#或者 
yarn add -D rsuite-icon-svg
```
### 配置 webpack
添加 `svg-sprite-loader`
配置如下
```javascript
{
    test: /\.svg$/,
    include: [path.resolve(__dirname, './node_modules/rsuite-icon-font/icons')],
    use: [{
      loader: 'svg-sprite-loader',
      options: {
        symbolId: 'icon-[name]'
      }
    }]
}
```
### 使用
```javascript
import 'rsuite-icon-font/icons/globe.svg';

<svg className="icon-svg">
  <use xlinkHref="#icon-globe" />
</svg>
```

### 自定义样式
```less
.icon-svg {
  width: 14px;
  height: 14px;
}

[id^=icon-] path {
  fill: @B900;
}
```