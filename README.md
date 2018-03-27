# Records
records
.如何用js判断一个对象是不是Array
  1.Array.isArray(obj) 调用数组的isArray方法
  2.obj instanceof Array  判断对象是否是Array的实例
  3.Object.prototype.toString.call(obj) ===‘[object Array]’  
     Object.prototype.toString方法会取得对象的一个内部属性［［Class］］，然后依据这个属性，返回一个类似于［object Array］的字符串作为结果，call用来改变toString的this指向为待检测的对象
  4.判断对象是否有push等数组的一些方法。（这个方法有兼容问题，但也是一个简单易用的方法）
    
    5.obj.constructor===Array   //true


同理判断一个对象是否是函数：
console.log(Object.prototype.toString.call(obj)==='[object Function]')    //true或false