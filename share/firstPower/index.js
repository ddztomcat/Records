(function () {
    function firstPower(a, n) {
        var ans = 1;
        while (n > 0) {
            ans = n & 1 ? ans * a : ans;
            n >>= 1;
            a *= a;
        }
        return ans;
    }

    function matFirstPower(n) {
        console.log(new Date().getTime())
        function matMulti(a, b) {
            let ans = [[],[]];
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    let temp =0;
                    for (let k = 0; k < 2; k++)
                        temp += (a[i][k] * b[k][j]);
                    ans[i].push(temp);
                }
            }
            return ans;
        }
        let d = [[1,1],[1,0]];
        function power(p,m) {
            let ans = [[1,0],[0,1]];
            while (m > 0) {
                ans = m & 1 ? matMulti(ans,p) : ans;
                m >>= 1;
                p = matMulti(p,p);
            }
            return ans;
        }
        let finish = power(d,n-1);
        console.log(finish)
        console.log(new Date().getTime())
    }
    matFirstPower(3);
    console.log(firstPower(2, 10));

})()