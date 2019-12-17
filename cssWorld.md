+ 块级格式化上下文 display：table
+ outline 不会影响width，height即不会reflow repaint
+ border-radius 会影响box-shadow
+ background-clip 用来规定背景绘制，background-origin规定背景图像定位模式
+ 替换元素img embed video input[type=image]iframe  object-fit object-position
+ display:table-cell最强的应用是可以任意个数列表的等宽效果。
+ :before :after伪类 不适用可替换元素
+ table table-layout word-break white-space colspan rowspan border-collapse: collapse;
+ transition height 0 -> auto 用max-height代替
+ elem.style.属性名="值"，修改元素的内敛样式
+ 伪类元素的区别在于 伪元素可以创建不在文档树的元素 ::before  :hover
+ 圣杯模式
```html
<div id="container">
  <div id="center" class="column"></div>
  <div id="left" class="column"></div>
  <div id="right" class="column"></div>
</div>
```
```css
body {
  min-width: 550px;
}
#container {
  padding-left: 200px; 
  padding-right: 150px;
}
#container .column {
  float: left;
}
#center {
  width: 100%;
}
#left {
  width: 200px; 
  margin-left: -100%;
  position: relative;
  right: 200px;
}
#right {
  width: 150px; 
  margin-right: -150px; 
}
```
+ 双飞翼
```html
<div id="container" class="column">
<div id="center"></div>
</div>
<div id="left" class="column"></div>
<div id="right" class="column"></div>
```

```css
body {
  min-width: 500px;
}

#container {
  width: 100%;
}

.column {
  float: left;
}
        
#center {
  margin-left: 200px;
  margin-right: 150px;
}
        
#left {
  width: 200px; 
  margin-left: -100%;
}
        
#right {
  width: 150px; 
  margin-left: -150px;
}
```