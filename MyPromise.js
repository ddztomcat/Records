const PENDING = 0
const FULFILLED = 1
const REJECTED = 2
const StaticResolve = function (value) {
    if (this._state !== PENDING) return
    this._value = value
    this._state = FULFILLED
    setTimeout(() => {
        while (this._deferreds.length > 0) {
            let defer = this._deferreds.shift()
            defer.ResolveCallBack(value)
        }
    }, 0)

}
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
        fnc(StaticResolve.bind(this), StaticReject.bind(this))
    }

    then(resCallBack, rejCallBack) {
        let _promise = this
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

export default MyPromise