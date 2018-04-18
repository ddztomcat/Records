(function () {
   function Node(node,x,y,id,left,right,leftLine,rightLine) {
       this.node = node;
       this.left = left;
       this.right = right;
       this.leftLine = leftLine;
       this.rightLine = rightLine;
       this.x = x;
       this.y = y;
       this.id = id;
   }
   var tree = document.getElementById('tree');
   var two = new Two({ width: 600, height: 400 }).appendTo(tree);
   var r = 20,x = 300,y = 50,line = 100;
   var Root = new Node(two.makeGroup(two.makeCircle(x,y,r),two.makeText(1,x,y,)),x,y,1)
    function buildTree(n,root,step,angle) {
        if(step === n) return
        var lx = root.x - line*Math.sin(Math.PI/angle);
        var ly = root.y + line*Math.cos(Math.PI/angle);
        var ry = ly,rx = root.x + line*Math.sin(Math.PI/angle);
        root.left = new Node(two.makeGroup(two.makeCircle(lx,ly,r),two.makeText(root.id*2,lx,ly)),lx,ly,root.id*2)
        root.right = new Node(two.makeGroup(two.makeCircle(rx,ry,r),two.makeText(root.id*2+1,rx,ry)),rx,ry,root.id*2+1)
        root.leftLine = two.makeLine(root.x,root.y,lx,ly);
        root.rightLine = two.makeLine(root.x,root.y,rx,ry);
        buildTree(n,root.left,step+1,angle+2)
        buildTree(n,root.right,step+1,angle+2)
    }
    buildTree(3,Root,1,4)
    two.update()
    function resetOrder(root) {
        if(!root) return;
        root.node.fill = '#fff';
        root.node.stroke = '#000';
        if(root.leftLine) {
            root.leftLine.fill = '#fff';
            root.leftLine.stroke = '#000';
        }
        resetOrder(root.left);
        if(root.rightLine) {
            root.rightLine.fill = '#fff';
            root.rightLine.stroke = '#000';
        }
        resetOrder(root.right);
    }
    var first = []
    function firstOrder(root) {
        if(!root) return;
        first.push(root.node);
        root.leftLine && first.push(root.leftLine);
        firstOrder(root.left);
        root.rightLine && first.push(root.rightLine);
        firstOrder(root.right);
    }
    var mid = []
    function midOrder(root) {
        if(!root) return;
        root.leftLine && mid.push(root.leftLine);
        midOrder(root.left);
        mid.push(root.node);
        root.rightLine && mid.push(root.rightLine)
        midOrder(root.right);
    }
    var last = []
    function lastOrder(root) {
        if(!root) return;
        root.leftLine && last.push(root.leftLine);
        lastOrder(root.left);
        root.rightLine && last.push(root.rightLine)
        lastOrder(root.right);
        last.push(root.node);
    }
    firstOrder(Root)
    midOrder(Root)
    lastOrder(Root)
    var bt = document.getElementsByClassName('button');
    console.log(first)
    console.log(mid)
    console.log(last)
    bt[0].addEventListener('click',function () {
        var temp = first.shift();
        temp.fill = '#ff1300';
        temp.stroke = '#ff1300';
        two.update();
    })
    bt[1].addEventListener('click',function () {
        var temp = mid.shift();
        temp.fill = '#00df31';
        temp.stroke = '#00df31';
        two.update();
    })
    bt[2].addEventListener('click',function () {
        var temp = last.shift();
        temp.fill = '#ffec60';
        temp.stroke = '#ffec60';
        two.update();
    })
    bt[3].addEventListener('click',function () {
        resetOrder(Root)
        two.update();
    })
})()