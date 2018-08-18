## 小程序开发名言警句
+ wxs 模块在第一次被引用时，会自动初始化为单例对象。多个页面，多个地方，多次引用，使用的都是同一个 wxs 模块对象。
如果一个 wxs 模块在定义之后，一直没有被引用，则该模块<strong>不会被解析与运行。</strong>
+ navigateTo, redirectTo 只能打开非 tabBar 页面。
+ switchTab 只能打开 tabBar 页面。
+ reLaunch 可以打开任意页面。
+ 页面底部的 tabBar 由页面决定，即只要是定义为 tabBar 的页面，底部都有 tabBar。
+ 调用页面路由带的参数可以在目标页面的onLoad中获取。
+ import可以在该文件中使用目标文件定义的template
+ include 可以将目标文件除了 <template/> <wxs/> 外的整个代码引入，相当于是拷贝到 include 位置