+ mac安装权限时--unsafe-perm可能会有用 sudo npm i --unsafe-perm  sudo chown -R $(whoami) /usr/local/lib/node_modules/  删除lock文件重装
+ 执行`npm cache verify`或`npm cache clean --force`
+ 重启bash窗口
+ npm init -y 跳过yes
+ npm config get prefix命令获取到prefix的值
+ 本地开发包a下 npm link 到引用包下 npm link a

### package.json resolutions
什么时候需要用到resolutions ？
当项目会依赖一个不常更新的包，但这个包又依赖另一个需要立即升级的包。 这时候，如果这个（不常更新的）包的依赖列表里不包含需要升级的包的新版本，那就只能等待作者升级，没别的办法。
项目的子依赖（依赖的依赖）需要紧急安全更新，来不及等待直接依赖更新。
项目的直接依赖还可以正常工作但已经停止维护，这时子依赖需要更新。 同时，你清楚子依赖的更新不会影响现有系统，但是又不想通过 fork 的方式来升级直接依赖。
项目的直接依赖定义了过于宽泛的子依赖版本范围，恰巧这其中的某个版本有问题，这时你想要把子依赖限制在某些正常工作的版本范围里。