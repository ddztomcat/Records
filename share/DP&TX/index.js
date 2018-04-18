(function () {
    var M = [1,5,11];
    function TX(money) {
        var ans = 0;
        var index = 2;
        while (money > 0) {
            let left = money%M[index];
            ans+=Math.floor(money/M[index]);
            money = left;
            index--;
        }
        return ans;
    }
    function DP(money) {
        const masn = 1e8;
        var dp = [[],[],[]];
        for(let i =0;i <3;i++) {
            for(let j=0;j<=money;j++) {
                if(i===0 || j===0) {
                    dp[i].push(j);
                }else {
                    dp[i][j] = masn;
                }
            }
        }
        for(let i =1;i <3;i++) {
            for(let j=1;j<=money;j++) {
                if(j >= M[i]) {
                    dp[i][j] = Math.min(dp[i][j-M[i]]+1,dp[i-1][j]);
                }else {
                    dp[i][j] = dp[i-1][j];
                }
            }
        }
        console.log(dp)
        return dp[2][money];
    }
    console.log(TX(15),DP(15))
})()