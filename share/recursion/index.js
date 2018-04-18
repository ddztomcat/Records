(function () {
    function solve(n) {
        if (n <= 2) return n;
        return solve(n - 1) + solve(n - 2);
    }

    let num = 5;
    let array = [];
    for (let i = 0; i < 5; i++) {
        array.push(i + 1);
    }

    function swap(a, b) {
        let temp = array[a];
        array[a] = array[b];
        array[b] = temp;
    }

    function show() {
        console.log(array.join());
    }

    function quanPL(now, target) {
        if (now === target) show();
        for (let i = now; i < target; i++) {
            swap(now, i);
            quanPL(now + 1, target);
            swap(now, i);
        }
    }
    function FibonacciRec(n) {
        console.log(new Date().getTime())
        if(n < 2) return n;
        let f1 = 0;
        let f2 = 1;
        let ans = 0;
        for(let i=2;i<=n;i++) {
            ans = f1 + f2;
            f1 = f2;
            f2 = ans;
        }
        console.log(new Date().getTime())
        return ans;
    }
    function Fibonacci(n) {
        if(n < 2) return n;
        return Fibonacci(n-1)+Fibonacci(n-2);
    }
    quanPL(0, num);
    console.log(solve(4));
    console.log(Fibonacci(54));
})()