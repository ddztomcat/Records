(function () {
    function merge(left, right) {
        var ans = [];
        while (left.length && right.length) {
            if (left[0] <= right[0]) {
                ans.push(left.shift());
            } else {
                ans.push(right.shift());
            }
        }
        return ans.concat(left, right);
    }

    function mergeSort(array) {
        if (array.length === 1) return array;
        var mid = Math.floor(array.length / 2);
        return merge(mergeSort(array.slice(0, mid)), mergeSort(array.slice(mid)));
    }

    var a = [3, 4, 7, 5, 9, 0];
    console.log(mergeSort(a))
})()