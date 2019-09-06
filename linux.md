### 关于path
```bash
# 1、临时修改 当前窗口关闭后立即失效
export PATH=/your/path:$PATH
# 2、修改当前用户的系统变量，关闭终端重新开启生效 或 source ~/.bashrc
vim ~/.bashrc # vim ~/.bash_profile
export PATH=/your/path:$PATH
# 3、修改所有用户的变量 source /etc/profile
vim /etc/profile
export PATH=/your/path:$PATH
# 4、查看path
echo $PATH
# 5、查看ip地址
ifconfig | grep "inet " | grep -v 127.0.0.1
# 6、mac 查看端口号
sudo lsof -i :9000
sudo kill -9 716
```