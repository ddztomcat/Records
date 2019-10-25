+ mac安装权限时--unsafe-perm可能会有用 sudo npm i --unsafe-perm  sudo chown -R $(whoami) /usr/local/lib/node_modules/  删除lock文件重装
+ 执行`npm cache verify`或`npm cache clean --force`
+ 重启bash窗口
+ npm init -y 跳过yes