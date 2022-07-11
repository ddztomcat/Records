## 关于对象的属性
解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
+ for...in循环：只遍历对象自身的和继承的可枚举的属性。
+ Object.keys()：返回对象自身的所有可枚举的属性的键名。
+ JSON.stringify()：只串行化对象自身的可枚举的属性。
+ Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。
+ 普通解构赋值可以获取到继承的属性
+ 对象的扩展运算符（...）用于取出参数`对象自身的所有可遍历属性`，拷贝到当前对象之中。
```js
// 扩展运算符的解构赋值只能提取自身属性 普通解构赋值可以获取到继承的属性
let o1 = { a: 1 };
let o2 = { b: 2 };
o2.__proto__ = o1;
let { ...o3 } = o2;
o3 // { b: 2 }
o3.a // undefined
let a = {
    s: 1,
    b: 2
}
/// 对象的扩展运算符（...）用于取出参数`对象自身的所有可遍历属性`
let b = Object.create(a)
console.log(b.s, b.b)// 1 2
let {s,...x} = b
console.log(s,x)// 1 {}
b.z = 11
let c = {...b}
console.log(c) // {z: 11}
```
对象obj是可遍历的（iterable），因为具有Symbol.iterator属性。执行这个属性，会返回一个遍历器对象。该对象的根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和done两个属性。

具有Symbol.iterator属性，都可以被for of 访问，也可以用扩展运算符转化成数组

 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的Symbol.iterator属性，从而使得该对象具有 Iterator 接口。
 Generator 就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。
#### 交换a,b
```javascript
//交换a，b的值
//普通做法
let t = a
a = b
b = t
//解构
[a, b] = [b, a]
```

#### 深入理解


```javascript
const o = Object.create({ x: 1, y: 2 });
o.z = 3;

let { x, ...newObj } = o;
let { y, z } = newObj;
x // 1
y // undefined
z // 3
```
#### extends
```js
class B extends A {
}
// 等同于
B.__proto__ = A
B.prototype.__proto__ = A.prototype
// 如何理解？ B 作为对象它需要有__protp__属性，继承A的静态属性
// B 作为函数 它需要有prototype属性，要确保他的实例 也属于A类型  

Object.setPrototypeOf = function (obj, proto) {
  obj.__proto__ = proto;
  return obj;
}
```
```javascript
let a = {
  x: 1
};
function People() {
  this.name = "1";
}
People.prototype = {
  tel: "2"
};
let b = new People();

for (let i in a) {
  console.log(i);
  // x
}
for (let i in b) {
  console.log(i);
  //name tel
}

Object.defineProperty(a, "y", {
  enumerable: true,
  configurable: false,
  writable: false,
  value: "2"
});
for (let i in a) {
  console.log(i);
  // x y
}
Object.defineProperty(a, "z", {
  enumerable: false,
  configurable: false,
  writable: false,
  value: "3"
});
for (let i in a) {
  console.log(i);
  // x y
}
let c = {};
let d = Object.create(null);
console.log(c.__proto__, d.__proto__);
// {} undefined

function H() {
  this.n = "1";
}
H.prototype = {
  h: "h"
};
function P() {
    this.p = 'p'
}
P.prototype = new H()

let e = new P()
// Object.keys只获取自身可遍历属性
console.log(Object.keys(e))
for(let i in e) {
    console.log(i)
    // p n h
}
```
#### set map
+ WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用

#### async await
generator其实就是JS在语法层面对协程的支持，真正支持与否看运行时环境，高版本的node就是支持的。协程就是主程序和子协程直接控制权的切换，并伴随通信的过程，那么，从generator语法的角度来讲，yield，next就是通信接口，next是主协程向子协程通信，而yield就是子协程向主协程通信

