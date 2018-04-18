# Records
1. #### 如何用js判断一个对象是不是Array
  + Array.isArray(obj) 调用数组的isArray方法
  + obj instanceof Array  判断对象是否是Array的实例
  + Object.prototype.toString.call(obj) === ‘[object Array]’  Object.prototype.toString方法会取得对象的一个内部属性［［Class］］，然后依据这个属性，返回一个类似于［object Array］的字符串作为结果，call用来改变toString的this指向为待检测的对象
  + 判断对象是否有push等数组的一些方法。（这个方法有兼容问题，但也是一个简单易用的方法）
  + obj.constructor===Array   //true同理判断一个对象是否是函数：
    console.log(Object.prototype.toString.call(obj)==='[object Function]')    //true或false
2. #### js实现AJAX
```javascript
function ajax (options) {
        let url = options.url
        const method = options.method.toLocaleLowerCase() || 'get'
        const async = options.async != false // default is true
        const data = options.data
        let xhr = null
        if (window.XMLHttpRequest){// code for IE7, Firefox, Opera, etc.
          xhr = new XMLHttpRequest()
         }else if (window.ActiveXObject){// code for IE6, IE5
          xhr = new ActiveXObject("Microsoft.XMLHTTP")
         }
        if(!xhr) return

        if (options.timeout && options.timeout > 0) {
            xhr.timeout = options.timeout
        }

        return new Promise ( (resolve, reject) => {
            xhr.ontimeout = () => reject && reject('请求超时')
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4) {
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                        resolve && resolve(xhr.responseText)
                    } else {
                        reject && reject()
                    }
                }
            }
            xhr.onerror = err => reject && reject(err)

            let paramArr = []
            let encodeData
            if (data instanceof Object) {
                for (let key in data) {
                    // 参数拼接需要通过 encodeURIComponent 进行编码
                    paramArr.push( encodeURIComponent(key) + '=' + encodeURIComponent(data[key]) )
                }
                encodeData = paramArr.join('&')
            }

            if (method === 'get') {
                  // 检测 url 中是否已存在 ? 及其位置
                const index = url.indexOf('?')
                if (index === -1) url += '?'
                else if (index !== url.length -1) url += '&'
                  // 拼接 url
                url += encodeData
            }

            xhr.open(method, url, async)
            if (method === 'get') xhr.send(null)
            else {
                // post 方式需要设置请求头
                xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8')
                xhr.send(encodeData)
            }
        } )
    }
```
3. #### fetch
```javascript
/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj, arr = [], idx = 0) {
  for (let item in obj) {
    arr[idx++] = [item, obj[item]]
  }
  return new URLSearchParams(arr).toString()
}

/**
 * 真正的请求
 * @param url 请求地址
 * @param options 请求参数
 * @param method 请求方式
 */
function commonFetcdh(url, options, method = 'GET') {
  const searchStr = obj2String(options)
  let initObj = {}
  if (method === 'GET') { // 如果是GET请求，拼接url
    url += '?' + searchStr
    initObj = {
      method: method,
      credentials: 'include'
    }
  } else {
    initObj = {
      method: method,
      credentials: 'include',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }),
      body: searchStr
    }
  }
  fetch(url, initObj).then((res) => {
    return res.json()
  }).then((res) => {
    return res
  })
}

/**
 * GET请求
 * @param url 请求地址
 * @param options 请求参数
 */
function GET(url, options) {
  return commonFetcdh(url, options, 'GET')
}

/**
 * POST请求
 * @param url 请求地址
 * @param options 请求参数
 */
function POST(url, options) {
  return commonFetcdh(url, options, 'POST')
}
```