+ js forEach 函數是sync的，传入的参数有current，倘若要想修改currentValue,当是一个对象时，修改currentValue同样会影响array，但当currentValue是数字或字符串时，需要通过array[index]修改.
+ Date 
    + getDate 方法返回的是1-31
    + getMonth 方法返回的是0-11
+ 函数是一种对象 Function instanceof Object === true
+ scope、Execution Context（执行环境）描述是基于函数的;context是基于对象this，箭头函数的this其实就是在定义的时候就确定好的，以后不管怎么调用这个箭头函数，箭头函数的this始终为定义时的this，箭头函数没有arguments
+ https原理 关键点 数字证书：服务器的相关信息+加密方式+私钥加密数字签名（证书编号），浏览器对证书上的服务器信息使用约定的加密算法加密后与解密后的证书编号比对.
+ 没有一种告别是完美的，我们生命当中所有的重要的告别都是突如其来的，珍惜现实，珍惜当下，珍惜身边所有美好的一切，用完美的心态面对不完美的告别。from 极限挑战
+ 人生就是不断地放下，然而还没来得及好好的告别。from 极限挑战
+ 进程是资源分配的基本单位，线程是运算调度的基本单位，一个进程可以拥有多个线程，各个线程共享进程资源，进程之间都有独立的资源，js是单线程的，所以不存在争夺资源。适合IO密集型操作
+ IO密集型操作：比如涉及到网络、磁盘读写；计算密集型操作：计算圆周率、视频解码等
+ 用户的编程模型是单进程单线程的，NodeJS进程本身是多线程的
+ TCP面向连接、可靠的如：http、https、Ftp、SMTP;UDP是无连接的，尽最大努力交付如：直播、语音
+ Typescript 中的类型、值；class C {} 会产生一个类型（指的它的实例结构）和一个值（指向它的构造函数）
+ UMD模块实际是CMD和AMD的结合
+ 当你设置document.cookie = 'test=123'时，仅仅是会话cookie，<strong>浏览器关闭后cookie消失</strong>，过期时间可能是1969-12-31T23:59:59.000Z，至少在chrome表现是这样
### 几种height的区别
+ clientHeight: 包括padding但不包括border、水平滚动条的高度、margin(可以通过 CSS height + CSS padding - 水平滚动条高度 (如果存在)来计算)
+ offsetHeight: 包括padding、border、滚动条的高度、但不包括margin
+ scrollHeight: clientHeight + 滚动部分
+ scrollTop: 向下滚动的距离
+ offsetTop: 一个元素的 scrollTop 值是这个元素的顶部到它的最顶部可见内容（的顶部）的距离的度量。
+ window.innerWidth: 浏览器视口的宽度，包含滚动条
+ window.outerWidth: 浏览器整体的宽度，包括侧边栏
+ HTMLElement.offsetTop: 距离当前元素父元素顶部border的值
> 滚动条的高度是包括在height里边

+ 扩展运算符的解构赋值只能包含对象自身的可枚举属性
+ 对象的扩展运算符（...）用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
+ ... 用在 = 语句 左边起到收敛 右边发散
```javascript
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3
```
### 根据ip区分内网外网
以下属于内网
1：10.*.*.*
2：172.16.*.*至172.31.*.*
3：192.168.*.* （*为0到255之间的任意数字）


### Number
```javascript
Number('') 0
Number(undefined) NaN
Number(false) 0
Number(null) 0
Number('123') 123
Number('123a') NaN
Number({}) NaN
```
### try catch setTimeout Promise
```javascript
function testB() {
    try {
        setTimeout(() => {
            throw Error('444')
        },3000)
    } catch (error) {
        console.log('555555')
    }
}
function testB() {
    try {
        new Promise(res => {
            setTimeout(() => res(1), 3000)
        }).then(res => {
           throw Error(res)
       })
    } catch (error) {
        console.log('555555')
    }
}
// try catch 并不能捕获，但promise 的async await 写法可以更加可控一些
```