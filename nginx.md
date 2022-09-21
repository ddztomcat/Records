### 集群与域名
### location 匹配优先级
1. =
2. (None)    如果 pattern 完全匹配 URI（不是只匹配 URI 的头部）
3. ^~ 匹配情况类似 location (None) 的情况，以指定匹配模式开头的 URI 被匹配，不同的是，一旦匹配成功，那么 Nginx 就停止去寻找其他的 Location 块进行匹配了
4. ~ 或 ~* location modifier 对大小写敏感，且 pattern 须是正则表达式 或 location modifier 不区分大小写，pattern 须是正则表达式
5. (None)    pattern 匹配 URI 的头部

```dash
location  = / {
  # 精确匹配 / ，主机名后面不能带任何字符串
  [ configuration A ] 
}
location  / {
  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  # 但是正则和最长字符串会优先匹配
  [ configuration B ] 
}
location /documents/ {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration C ] 
}
location ~ /documents/Abc {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration CC ] 
}
location ^~ /images/ {
  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
  [ configuration D ] 
}
location ~* \.(gif|jpg|jpeg)$ {
  # 匹配所有以 gif,jpg或jpeg 结尾的请求
  # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
  [ configuration E ] 
}
location /images/ {
  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
  [ configuration F ] 
}
location /images/abc {
  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
  # F与G的放置顺序是没有关系的
  [ configuration G ] 
}
location ~ /images/abc/ {
  # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
  [ configuration H ] 
}
location ~* /js/.*/\.js
```

### root alias

root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。
root的处理结果是：root路径＋location路径
alias的处理结果是：使用alias路径替换location路径
alias是一个目录别名的定义，root则是最上层目录的定义。

``` dash
location ^~ /t/ {
     root /www/root/html/;
}
```
如果一个请求的URI是/t/a.html时
web服务器将会返回服务器上的/www/root/html/t/a.html的文件。

```bash
location ^~ /t/ {
 alias /www/root/html/new_t/;
}
```
如果一个请求的URI是/t/a.html时，web服务器将会返回服务器上的/www/root/html/new_t/a.html的文件。注意这里是new_t，因为alias会把location后面配置的路径丢弃掉，把当前匹配到的目录指向到指定的目录。
**注意**
使用alias时，目录名后面一定要加"/"。
alias在使用正则匹配时，必须捕捉要匹配的内容并在指定的内容处使用。
alias只能位于location块中。（root可以不放在location中）


### rewrite

```
server {
    rewrite 规则 定向路径 重写类型;
}

规则：可以是字符串或者正则来表示想匹配的目标url
定向路径：表示匹配到规则后要定向的路径，如果规则里有正则，则可以使用$index来表示正则里的捕获分组
重写类型：
last ：相当于Apache里德(L)标记，表示完成rewrite，浏览器地址栏URL地址不变
break；本条规则匹配完成后，终止匹配，不再匹配后面的规则，浏览器地址栏URL地址不变
redirect：返回302临时重定向，浏览器地址会显示跳转后的URL地址
permanent：返回301永久重定向，浏览器地址栏会显示跳转后的URL地址
```
```
server {
    # 访问 /last.html 的时候，页面内容重写到 /index.html 中
    rewrite /last.html /index.html last;

    # 访问 /break.html 的时候，页面内容重写到 /index.html 中，并停止后续的匹配
    rewrite /break.html /index.html break;

    # 访问 /redirect.html 的时候，页面直接302定向到 /index.html中
    rewrite /redirect.html /index.html redirect;

    # 访问 /permanent.html 的时候，页面直接301定向到 /index.html中
    rewrite /permanent.html /index.html permanent;

    # 把 /html/*.html => /post/*.html ，301定向
    rewrite ^/html/(.+?).html$ /post/$1.html permanent;

    # 把 /search/key => /search.html?keyword=key
    rewrite ^/search\/([^\/]+?)(\/|$) /search.html?keyword=$1 permanent;
}
```

> [https://www.jianshu.com/p/0022ffa4046a]