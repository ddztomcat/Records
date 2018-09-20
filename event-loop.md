### 事件循环

1. 浏览器的Event Loop和NodeJS的Event Loop是不同的，实现机制也不一样，不要混为一谈。
2. 浏览器可以理解成只有1个宏任务队列和1个微任务队列，先执行全局Script代码，执行完同步代码调用栈清空后，从微任务队列中依次取出所有的任务放入调用栈执行，微任务队列清空后，从宏任务队列中只取位于队首的任务放入调用栈执行，注意这里和Node的区别，只取一个，然后继续执行微队列中的所有任务，再去宏队列取一个，以此构成事件循环。
3. NodeJS可以理解成有4个宏任务队列和2个微任务队列，但是执行宏任务时有6个阶段。先执行全局Script代码，执行完同步代码调用栈清空后，先从微任务队列Next Tick Queue中依次取出所有的任务放入调用栈中执行，再从微任务队列Other Microtask Queue中依次取出所有的任务放入调用栈中执行。然后开始宏任务的6个阶段，每个阶段都将该宏任务队列中的所有任务都取出来执行（注意，这里和浏览器不一样，浏览器只取一个），6个阶段执行完毕后，再开始执行微任务，以此构成事件循环。
4. MacroTask包括： setTimeout、setInterval、 setImmediate(Node)、requestAnimation(浏览器)、IO、UI rendering
5. Microtask包括： process.nextTick(Node)、Promise、Object.observe、MutationObserver
![](https://user-gold-cdn.xitu.io/2018/9/5/165a8667bb6e623e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
[详细链接](https://juejin.im/post/5b8f76675188255c7c653811)

事件循环的顺序是从script开始第一次循环，随后全局上下文进入函数调用栈，碰到macro-task就将其交给处理它的模块处理完之后将回调函数放进macro-task的队列之中，碰到micro-task也是将其回调函数放进micro-task的队列之中。直到函数调用栈清空只剩全局执行上下文，然后开始执行所有的micro-task。当所有可执行的micro-task执行完毕之后。循环再次执行macro-task中的一个任务队列，执行完之后再执行所有的micro-task，就这样一直循环。
```javascript
console.log('golb1');
setImmediate(function() {
    console.log('immediate1');
    process.nextTick(function() {
        console.log('immediate1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('immediate1_promise');
        resolve();
    }).then(function() {
        console.log('immediate1_then')
    })
})
setTimeout(function() {
    console.log('timeout1');
    process.nextTick(function() {
        console.log('timeout1_nextTick');
    })
    new Promise(function(resolve) {
        console.log('timeout1_promise');
        resolve();
    }).then(function() {
        console.log('timeout1_then')
    })
    setTimeout(function() {
    	console.log('timeout1_timeout1');
    process.nextTick(function() {
        console.log('timeout1_timeout1_nextTick');
    })
    setImmediate(function() {
    	console.log('timeout1_setImmediate1');
    })
    });
})
new Promise(function(resolve) {
    console.log('glob1_promise');
    resolve();
}).then(function() {
    console.log('glob1_then')
})
process.nextTick(function() {
    console.log('glob1_nextTick');
})
```