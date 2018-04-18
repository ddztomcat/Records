(function () {
    function solve(array, left, right) {
        var i = left;
        var j = right;
        var key = array[left];
        while (i < j) {
            while (i < j && array[j] >= key) j--;
            array[i] = array[j];
            while (i < j && array[i] <= key) i++;
            array[j] = array[i];
        }
        array[i] = key
        return i;
    }

    function quickSort(array, left, right) {
        if (left >= right) return;
        var mid = solve(array, left, right);
        quickSort(array, left, mid - 1);
        quickSort(array, mid + 1, right);
    }
    function Ksort(array, left, right,k) {
        if (left >= right) return;
        var mid = solve(array, left, right);
        if(mid+1 === k) {
            return array[mid];
        }else if(mid+1 < k) {
            return Ksort(array,mid+1,right,k);
        }else {
            return Ksort(array,left,mid-1,k);
        }
    }
    var a = [2, 4, 6, 1,0, 9, 5, 8, 3];
    quickSort(a, 0, a.length - 1);
    console.log(Ksort(a,0,a.length-1,4));
    console.log(a)
})()