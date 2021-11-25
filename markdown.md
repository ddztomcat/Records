
## 标题二
### 标题三

**加粗**

*斜体*

***xie斜体且加粗***

~~刪除线~~

>引用
>>引用

---
------
分割线
****
***

![图片alt](https://avatars0.githubusercontent.com/u/23070926?s=400&u=18a40e9e818cfbc60424c184142d570f42cace5f&v=4 "title")

[百度](http://www.baidu.com "title")

- 列表
+ 列表
* 列表

1. 有序
2. 有序
3. 有序
---

1. 有序
   - 嵌套列表
   - 嵌套列表
2. 有序
3. 有序

```
表头|表头|表头
---|:--:|---:
内容|内容|内容
内容|内容|内容

第二行分割表头和内容。
- 有一个就行，为了对齐，多加了几个
文字默认居左
-两边加：表示文字居中
-右边加：表示文字居右
注：原生的语法两边都要用 | 包起来。此处省略
```
表头|表头|表头
-|-|-
内容|内容|内容
内容|内容|内容

`单行代码`
```bash
npm install
```


```flow
st=>start: Start
op=>operation: Your Operation
cond=>condition: Yes or No?
e=>end
st->op->cond
cond(yes)->e
cond(no)->op
```