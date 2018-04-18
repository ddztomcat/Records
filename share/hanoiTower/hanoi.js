(function () {
    function Point(a, b) {
        this.x = a;
        this.y = b;
    }

    function getPosition(targetA, targetB, step) {
        var k = (targetA.y - targetB.y) / (targetA.x - targetB.x);
        var temp = new Point()
        if (targetB.x > targetA.x) {
            temp.x = targetA.x + step;
            temp.y = targetA.y + step * k;
        } else {
            temp.x = targetA.x - step;
            temp.y = targetA.y - step * k;
        }
        return temp
    }

    function isequal(isA, isB) {
        return (Math.abs(isA.x - isB.x) < 5) && (Math.abs(isB.y - isA.y) < 5)
    }

    var elem = document.getElementById('hanoi');
    var w = 600, h = 200;
    var jianju = 50;
    var xw = (w - jianju * 4) / 3;
    var yh = xw;
    var xh = 10, yw = 10;
    var two = new Two({width: w, height: h}).appendTo(elem);
    var GA = []
    var startx = jianju + xw / 2;
    var starty = 150;
    for (var j = 0; j < 3; j++) {
        GA.push(two.makeGroup(two.makeRectangle(startx + j * (xw + jianju), starty, xw, xh), two.makeRectangle(startx + j * (xw + jianju), starty - yh / 2, yw, yh)))
        GA[j].fill = '#000'
        GA[j].position = new Point(startx + j * (xw + jianju), starty - xh)
        GA[j].data = []
    }
    var n = 3
    for (var i = 0; i < n; i++) {
        GA[2].data.push(two.makeRectangle(startx + 2 * (xw + jianju), starty - 10 - i * xh, xw - 10 - i * 10, xh))
        GA[2].data[i].position = new Point(GA[2].data[i].translation.x, GA[2].data[i].translation.y)
        GA[2].position.y -= xh
    }
    two.update()

    function move(ta, tb) {
        two.bind("update", function (frameCount) {
            if (!isequal(ta.position, tb.position)) {
                var temp = getPosition(ta.position, tb.position, 10);
                ta.translation.x = temp.x;
                ta.translation.y = temp.y;
                ta.position = temp
            } else {
                ta.translation.x = tb.position.x;
                ta.translation.y = tb.position.y;
                ta.position = tb.position
                tb.position.y -= xh
                two.unbind("update", arguments.callee)
            }
        }).play()
    }

    var ans = []

    function hanoiTower(n, a, b, c) {
        if (n === 1) {
            ans.push({from: a, to: b})
        } else {
            hanoiTower(n - 1, a, c, b)
            ans.push({from: a, to: b})
            hanoiTower(n - 1, c, b, a)
        }
    }

    hanoiTower(3, 2, 0, 1)
    var bt = document.getElementById('next')
    var lt = document.getElementById('list')
    var step = 0;
    bt.addEventListener('click', function () {
        if (ans.length < 1) {
            alert('最少' + step + '步')
            return
        }
        step++
        var temp = ans.shift()
        var top = GA[temp.from].data.pop()
        GA[temp.to].data.push(top)
        GA[temp.from].position.y += xh
        move(top, GA[temp.to])
        var span = document.createElement('p')
        span.innerHTML = '从第' + temp.from + '移动到第' + temp.to
        lt.appendChild(span)
    })
    console.log(ans)
})()