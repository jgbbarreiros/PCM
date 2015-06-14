var red    = new Color(204,   0,   0,    "red");
var orange = new Color(251, 148,  11, "orange");
var yellow = new Color(255, 255,   0, "yellow");
var green  = new Color(  0, 204,   0,  "green");
var teal   = new Color(  3, 192, 198,   "teal");
var blue   = new Color(  0,   0, 255,   "blue");
var purple = new Color(118,  44, 167, "purple");
var pink   = new Color(255, 152, 191,   "pink");
var white  = new Color(255, 255, 255,  "white");
var gray   = new Color(153, 153, 153,   "gray");
var black  = new Color(  0,   0,   0,  "black");
var brown  = new Color(136,  84,  24,  "brown");
var colors = [red, orange, yellow, green, teal, blue, purple, pink, white, gray, black, brown];

function Color(r, g, b, name) {
    this.r = Math.floor(r);
    this.g = Math.floor(g);
    this.b = Math.floor(b);
    this.name = name;
    this.color = ["rgb(",this.r,",",this.g,",",this.b,")"].join("");
}

function ImageProcessingColor(canvas, colors) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.colors = colors;

    this.colorHist = function(img){
        var hist = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.ctx.drawImage(img, 0, 0, img.width*.5, img.height*.5);
        var pixels = this.ctx.getImageData(0, 0, img.width, img.height);
        var me = 130;
        for (var i = 0; i < pixels.data.length; i+=4) {
            var r = pixels.data[i];
            var g = pixels.data[i + 1];
            var b = pixels.data[i + 2];
            for (var j = 0; j< this.colors.length; j++) {
                var c = this.colors[j];
                if ((c.r-me < r < c.r+me) &&
                    (c.g-me < g < c.g+me) &&
                    (c.b-me < b < c.b+me) &&
                    ((Math.abs(c.r-r) + Math.abs(c.g-g) + Math.abs(c.b-b)) < me)) {
                    hist[j] += 1;
                    break;
                }
            }
        }
        //this.build_Color_Rect(hist);
        //this.colors[hist.indexOf(Math.max.apply(Math, hist))]
        return hist;
    };

    this.build_Color_Rect = function(hist) {
        for (var i = 0; i < hist.length; i++) {
            var h = 500;
            this.ctx.save();
            this.ctx.fillStyle = "black";
            this.ctx.font = "15px Arial";
            this.ctx.fillText(hist[i].toString(),i*75, h-5);
            this.ctx.fillStyle = this.colors[i].color;
            this.ctx.fillRect(i*75, h, 50, 50);
            this.ctx.restore();
        }
    };
}
