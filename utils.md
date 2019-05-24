## 常用工具方法
### 获取url中某一参数的值
```javascript
function getQueryUrl(query, key) {
    let reg = /&?(\w+)=([^&]+)(?:$|&)/gmi
    let arr = null
    while((arr = reg.exec(query)) !== null) {
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
### 正则表达式只允许输入0-100且最多两位小数
```javascript
'rrr56.5656'.replace(/[^\d.]/g, '').replace(/^((0\.\d{1,2})|(([1-9]\d{0,2})(\.\d{1,2})?))(\d*)$/, '$1|$6')
// $1 ((0\.\d{1,2})|(([1-9]\d{0,2})(\.\d{1,2})?))
// $2 (0\.\d{1,2})
// $3 (([1-9]\d{0,2})(\.\d{1,2})?))
// $4 ([1-9]\d{0,2})
// $5 (\.\d{1,2})
// $6 (\d*)
```
### 判断某两天是否在同一周内
```js
function judgeTimeInWeek(target, t) {
  let d = new Date(target);
  let a = d.getDate();
  let b = d.getDay();
  // console.log(d.toString())
  let c = 0;
  if (b < 1) {
      c = 1;
  } else {
      c = 8 - b;
  }
  // console.log((new Date(t)).toString());
  let e = new Date(d.getFullYear(), d.getMonth(), a + c);
  // console.log(e.toString())
  if (t < e.getTime()) return true;
  return false;
}
```
### 函数防抖与节流
```js
// 是否立即执行 immediate = true 立即执行 否 延迟t ms 后执行
function debounce(fun, t, immediate = false) {
  let lastTime = 0
  let id = null
  let excid = null
  let exc = immediate
  return function(...arg) {
    if(exc) {
      exc = false
      fun.apply(null, arg)
    }else {
      clearInterval(id)
      id = setInterval(() => {
        fun.apply(null, arg)
        if(immediate) {
          clearInterval(excid)
          excid = setInterval(() => exc = true, t)
        }
      }, t)
    }
  }
}
function throttle(fun, t) {
  let lastTime = 0
  let id = null
  return function(...arg) {
    let now = Date.now()
    if(now - lastTime >= t) {
      fun.apply(null, arg)
      lastTime = now
    }else {
      clearInterval(id)
      setInterval(() => {
        fun.apply(null, arg)
        lastTime = Date.now()
      })
    }
  }
}
```