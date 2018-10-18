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