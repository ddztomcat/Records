+ js forEach 函數是sync的，传入的参数有current，倘若要想修改currentValue,当是一个对象时，修改currentValue同样会影响array，但当currentValue是数字或字符串时，需要通过array[index]修改.
+ Date 
    + getDate 方法返回的是1-31
    + getMonth 方法返回的是0-11
+ 函数是一种对象 Function instanceof Object === true
+ scope、Execution Context（执行环境）描述是基于函数的;context是基于对象this，箭头函数的this其实就是在定义的时候就确定好的，以后不管怎么调用这个箭头函数，箭头函数的this始终为定义时的this，箭头函数没有arguments
+ https原理 关键点 数字证书：服务器的相关信息+加密方式+私钥加密数字签名（证书编号），浏览器对证书上的服务器信息使用约定的加密算法加密后与解密后的证书编号比对.
+ 