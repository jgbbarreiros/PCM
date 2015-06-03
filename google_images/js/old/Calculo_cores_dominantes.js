function main() {
    var canvas = document.querySelector("canvas");
    var img_Color = new Image_Processing_Color(canvas);
    var img = new Image();
    img.onload = function () {
        img_Color.init(img);
    };
    img.src = "images/daniel1.jpg";
}

function Image_Processing_Color(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.num_pixel_Color = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.red = new Color(204, 0, 0);
    this.orange = new Color(251, 148, 11);
    this.yellow = new Color(255, 255, 0);
    this.green = new Color(0, 204, 0);
    this.teal = new Color(3, 192, 198);
    this.blue = new Color(0, 0, 255);
    this.purple = new Color(118, 44, 167);
    this.pink = new Color(255, 152, 191);
    this.white = new Color(255, 255, 255);
    this.gray = new Color(153, 153, 153);
    this.black = new Color(0, 0, 0);
    this.brown =new Color(136, 84, 24);
    this.colors = [this.red, this.orange, this.yellow, this.green, this.teal, this.blue, this.purple, this.pink, this.white, this.gray, this.black, this.brown];


    this.init = function (img) {
        this.ctx.drawImage(img, 0, 0);
        imgData=this.gen_Image();
        imgData = this.ctx.getImageData(0, 0, img.width, img.height);
        this.count_Pixels(imgData);
        this.build_Color_Rect();
    };

    this.gen_Image = function () {
        var imgData = this.ctx.createImageData(100, 100);

        for (var i = 0; i < imgData.data.length; i += 4) {
            imgData.data[i] = 204;
            imgData.data[i + 1] = 0;
            imgData.data[i + 2] = 0;
            imgData.data[i + 3] = 255;
            if ((i >= 8000 && i < 8400) || (i >= 16000 && i < 16400) || (i >= 24000 && i < 24400) || (i >= 32000 && i < 32400)) {
                imgData.data[i + 1] = 255;
                imgData.data[i] = 255;
            }
        }
        this.ctx.putImageData(imgData, 150, 0);
        return imgData;
    };

    this.build_Color_Rect = function() {

        for (var i = 0; i < this.num_pixel_Color.length; i++) {
            var ctx = this.canvas.getContext("2d");
            ctx.save();
            ctx.fillStyle = "black";
            ctx.font = "25px Arial";
            ctx.fillText(this.num_pixel_Color[i].toString(),i*75,295);
            var c = this.colors[i];
            ctx.fillStyle = 'rgb(' + c.r.toString() + ',' + c.g.toString() + ',' + c.b.toString() + ')';
            ctx.fillRect(i*75, 300, 50, 50);
            ctx.restore();
        }
    };	
    
    this.count_Pixels=function(pixels) {

        var me = 130;
        for (var i = 0; i < pixels.data.length; i+=4) {
            var r = pixels.data[i];
            var g = pixels.data[i + 1];
            var b = pixels.data[i + 2];
            for (var j = 0; j< this.colors.length; j++) {
                var c = this.colors[j];
                // orange = 251, 148, 11;
                // yellow = 255, 255, 0;
                if ((c.r-me < r < c.r+me) &&
                    (c.g-me < g < c.g+me) &&
                    (c.b-me < b < c.b+me) &&
                    ((Math.abs(c.r-r) + Math.abs(c.g-g) + Math.abs(c.b-b)) < me)) {
                    this.num_pixel_Color[j] += 1;
                    break;
                }

            }
        }
    };
}

function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}