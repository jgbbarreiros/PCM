function Img(hist) {
    this.hist = hist;
}
var hist1 = [1, 5];
var hist2 = [2, 3];

var imgs = [new Img(hist1), new Img(hist2)];
console.log(imgs);
var copy = imgs.slice(0);

console.log("sorting...");
copy.sort(
    function (a, b) {
        var keyA = a.hist[0];
        var keyB = b.hist[0];
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    }
);
console.log("sorted");
console.log(copy);