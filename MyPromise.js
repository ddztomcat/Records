const PENDING = 0
const FULFILLED = 1
const REJECTED = 2
// 首先定义三种状态，每个promise的状态只允许从pending -> fulfilled 或者 pending -> rejected
const StaticResolve = function (value) {
    // 只有当state是Pending时才允许改变
    if (this._state !== PENDING) return
    // 此时状态从pending -> fulfilled,当前的value 实际上通过 new Promise((resolve, reject) => {resolve(value)}) 这种方式传递过来的
    this._value = value
    this._state = FULFILLED
    // 这里就相当于调用then(res => console.log(res), rej => console.log(rej))中的 ResolveCallBack 实际是 res => console.log(res) 的一个封装，同理
    // RejectCallBack 是 rej => console.log(rej) 的一个封装
    // 这里使用setTimeout 模拟异步，实际上源码中不是这么做的，貌似是用的asap
    setTimeout(() => {
        while (this._deferreds.length > 0) {
            let defer = this._deferreds.shift()
            defer.ResolveCallBack(value)
        }
    }, 0)

}
// 跟 StaticResolve 大同小异
const StaticReject = function (value) {
    if (this._state !== PENDING) return
    this._value = value
    this._state = REJECTED
    setTimeout(() => {
        while (this._deferreds.length > 0) {
            let defer = this._deferreds.shift()
            defer.RejectCallBack(value)
        }
    }, 0)
}
class MyPromise {
    constructor(fnc) {
        this._state = PENDING
        this._value = null
        this._deferreds = []
        // 这里在new 的过程立即调用fun函数，Promise 也是这么做的
        fnc(StaticResolve.bind(this), StaticReject.bind(this))
    }

    then(resCallBack, rejCallBack) {
        let _promise = this
        // then函数执行的时候干了两件事 
        // 1、将传过来的resCallBack函数和rejCallBack函数封装成一个defer对象，然后push到上一个promise的_deferreds属性中，如果上一个promise状态不为pending，则直接执行
        // 2、返回一个新的Prosime ---这里理解是一定要记得结合上面的fnc(StaticResolve.bind(this), StaticReject.bind(this))代码
        // 这些代码都是同步的除了我们setTimeout，也就是说当你在new MyProsime().then()时他们是同步执行的
        return new MyPromise(function (resolve, reject) {
            let defer = {
                ResolveCallBack(value) {
                    try {
                        if (typeof resCallBack !== 'function') {
                            throw TypeError('参数类型错误')
                        }
                        let res = resCallBack(value)
                        if (res instanceof MyPromise) {
                            res.then(function (val) {
                                resolve(val)
                            }, function (val) {
                                reject(val)
                            })
                        } else {
                            resolve(res)
                        }
                    } catch (error) {
                        reject(error)
                    }

                },
                RejectCallBack(value) {
                    try {
                        if (rejCallBack !== undefined) {
                            if (typeof rejCallBack !== 'function') {
                                throw TypeError('参数类型错误')
                            }
                            let rej = rejCallBack(value)
                            reject(rej)
                        }
                        reject(value)
                    } catch (error) {
                        reject(error)
                    }
                }
            }
            if (_promise._state === PENDING) {
                _promise._deferreds.push(defer)
            } else if (_promise._state === FULFILLED) {
                defer.ResolveCallBack(_promise._value)
            } else if (_promise._state === REJECTED) {
                defer.RejectCallBack(_promise._value)
            }
        })
    }
    // 一下catch，resolve，reject all方法实际上都是在原有已实现代码导航的简单封装
    catch(error) {
        return this.then(() => { }, error)
    }

    static resolve(value) {
        return new MyPromise(res => res(value))
    }

    static reject(value) {
        return new MyPromise((res, rej) => rej(value))
    }

    static all(promises) {
        if(!Array.isArray(promises)) {
            throw TypeError('参数类型错误')
        }
        return new MyPromise((resolve, reject) => {
            let values = []
            let len = promises.length
            promises.forEach((item, index) => {
                item.then(res => {
                    len--
                    values[index] = res
                    if(len === 0) {
                        resolve(values)
                    }
                }, rej => {
                    reject(rej)
                })
            })
        })
    }
}

// export default MyPromise
// let p1 = new MyPromise((res, rej) => {
//     setTimeout(() => {
//         res('delay 5s')
//     }, 5000)
// })
// p1.then(res => {
//     console.log(res)
//     return res + ' success'
// })
// .then(res => {
//     console.log(res)
// })
// let p2 = new MyPromise((res, rej) => {
//     setTimeout(() => {
//         rej('delay 3s')
//     }, 3000)
// })

// MyPromise.all([p1, p2])
// .then(res => {
//     console.log(res)
// }, rej => {
//     console.log(rej)
// })