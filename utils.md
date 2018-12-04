## 常用工具方法
### 获取url中某一参数的值
```javascript
function getQueryUrl(query, key) {
    let reg = /&?(\w+)=([^&]+)(?:$|&)/gmi
    let arr = null
    while(arr = reg.exec(query)) {
        if(key === arr[1]) return arr[2]
    }    
    return ''
}
```
### 1px兼容
```scss
=border-1px-before($color)
  position: relative
  &::before
    display: block
    position: absolute
    left: 0
    top: 0
    width: 100%
    border-top: 1px solid $color
    content: ''
    @media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5)
      transform: scaleY(0.7)
    @media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2)
      transform: scaleY(0.5)

=border-1px-after($color)
  position: relative
  &::after
    display: block
    position: absolute
    left: 0
    bottom: 0
    width: 100%
    border-top: 1px solid $color
    content: ''
    @media (-webkit-min-device-pixel-ratio:1.5),(min-device-pixel-ratio:1.5)
      transform: scaleY(0.7)
    @media (-webkit-min-device-pixel-ratio:2),(min-device-pixel-ratio:2)
      transform: scaleY(0.5)
```