var c = document.getElementById("figures");

var bear = new Bear(100, 100, 50, "#452200", c);
bear.draw();

function Bear(x, y, s, color, canvas) {
    this.x = x;
    this.y = y;

    var outside = function (x,y,w,h,mx,my) {
        return ((mx<x) || (mx > (x+w)) || (my < y) || (my > (y+h)));
    };

    this.overcheck = function(mx, my) {
        this.overcheck = function (mx,my) {

        }
    };

    this.draw = function() {
        ear(x - (s*Math.cos(.25*Math.PI)), y - (s*Math.sin(.25*Math.PI)), s *.4, color);
        ear(x + (s*Math.cos(.25*Math.PI)), y - (s*Math.sin(.25*Math.PI)), s *.4, color);
        head(x, y, s, color);
        eye(x - (s*.4*Math.cos(.20*Math.PI)), y - (s*.4*Math.sin(.20*Math.PI)), s*.15);
        eye(x + (s*.4*Math.cos(.20*Math.PI)), y - (s*.4*Math.sin(.20*Math.PI)), s*.15);
        nose(x, y+s*.2, s*.22);
        mouth(x, y+s*.2+s*.22-Math.sin(2.1 * Math.PI)*s*.3, s*.3)
    };

    var ear = function(x, y, s, color) {
        var e1 = new Oval(x, y, s, 1.3, 1.2, color, canvas);
        var e2 = new Oval(x, y, s*.5, 1.3, 1.2, "#D19F74", canvas);
        e1.draw();
        e2.draw();
    };

    var head = function(x, y, s, color) {
        Oval(x, y, s, 1.05, 1, color, canvas);
    };

    var eye = function(x, y, s) {
        Oval(x, y, s, 1, 1, "black", canvas);
        Oval(x - ((s-s*.4)*Math.cos(.25*Math.PI)), y - ((s-s*.4)*Math.cos(.25*Math.PI)), s*.4, 1, 1, "white", canvas);
    };

    var nose = function(x, y, s) {
        Oval(x, y, s, 1.4, 1, "black", canvas);
        Oval(x - ((s-s*.3)*Math.cos(.25*Math.PI)), y - ((s-s*.3)*Math.cos(.25*Math.PI)), s*.3, 1.4, 1, "white", canvas);
    };

    var mouth = function(x, y, s) {
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.lineWidth = s*.05;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(x - s, y, s, .9*Math.PI, 2.1*Math.PI, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + s, y, s, .9*Math.PI, 2.1*Math.PI, true);
        ctx.stroke();
        ctx.restore();
    };

}

function Oval(x, y, r, hor, ver, color, canvas) {
    this.draw = function() {

    };

    this.overcheck = function overoval(mx,my) {
        var x1 = 0;  //this is this.x - this.x
        var y1 = 0;
        var x2 = (mx-this.x)/this.hor;
        var y2 = (my-this.y)/this.ver;
        if (this.distsq(x1,y1,x2,y2)<=(this.radsq) ){
            return true;
        }
        else {
            return false;
        }
    };

    this.draw = function() {
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.scale(this.hor,this.ver);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0,0,this.r,0,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };
}

