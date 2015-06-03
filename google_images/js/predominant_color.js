red = new Color(204, 0, 0);
orange = new Color(251, 148, 11);
yellow = new Color(255, 255, 0);
green = new Color(0, 204, 0);
teal = new Color(3, 192, 198);
blue = new Color(0, 0, 255);
purple = new Color(118, 44, 167);
pink = new Color(255, 152, 191);
white = new Color(255, 255, 255);
gray = new Color(153, 153, 153);
black = new Color(0, 0, 0);
brown =new Color(136, 84, 24);

function ImageProcessingColor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.num_pixel_Color = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.colors = [this.red, this.orange, this.yellow, this.green, this.teal, this.blue,
                   this.purple, this.pink, this.white, this.gray, this.black, this.brown];

    this.perdominateColor = function(img){

    };
}