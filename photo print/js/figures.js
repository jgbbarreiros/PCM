var canvas = document.getElementById("figures");

Oval.prototype = new Figure();
Bear.prototype = new Figure();
var bear = new Bear(100, 100, 50, "#452200", canvas);
bear.draw();

function Figure() {

    this.init = function(x, y, s, color, canvas) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.color = color;
        this.canvas = canvas;
    };

    this.draw = function() {};

    this.overcheck = function(mx,my) {
        return mx>=this.x-this.w/2 && mx<=this.x+this.w/2 && my>=this.y-this.h/2 && my<=this.y+this.h/2;
    };

    this.distsq = function (x1,y1,x2,y2) {
        //done to avoid taking square roots
        var xd = x1 - x2;
        var yd = y1 - y2;
        return xd*xd + yd*yd;
    };
}

function Oval(x, y, s, hor, ver, color, canvas) {

    this.init(x, y, s, color, canvas);
    this.radsq = this.s*this.s;
    this.hor = hor;
    this.ver = ver;

    this.overcheck = function overoval(mx,my) {
        var x1 = 0;  //this is this.x - this.x
        var y1 = 0;
        var x2 = (mx-this.x)/this.hor;
        var y2 = (my-this.y)/this.ver;
        return this.distsq(x1,y1,x2,y2)<=this.radsq
    };

    this.draw = function() {
        var ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.scale(this.hor,this.ver);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0,0,this.s,0,2*Math.PI,true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };
}


function Bear(x, y, s, color, canvas) {

    this.init(x, y, s, color, canvas);

    var outside = function(x,y,w,h,mx,my) {
        return ((mx<x) || (mx > (x+w)) || (my < y) || (my > (y+h)));
    };

    this.overcheck = function(mx, my) {
    };

    this.draw = function() {
        ear(this.x - (this.s*Math.cos(.25*Math.PI)), this.y - (this.s*Math.sin(.25*Math.PI)), this.s*.4, this.color);
        ear(this.x + (this.s*Math.cos(.25*Math.PI)), this.y - (this.s*Math.sin(.25*Math.PI)), this.s*.4, this.color);
        head(this.x, this.y, this.s, this.color);
        eye(this.x - (this.s*.4*Math.cos(.20*Math.PI)), this.y - (this.s*.4*Math.sin(.20*Math.PI)), this.s*.15);
        eye(this.x + (this.s*.4*Math.cos(.20*Math.PI)), this.y - (this.s*.4*Math.sin(.20*Math.PI)), this.s*.15);
        nose(this.x, this.y+this.s*.2, this.s*.22);
        mouth(this.x, this.y+this.s*.42, this.s*.3);
    };

    var ear = function(x, y, s, color) {
        new Oval(x, y, s, 1.3, 1.2, color, canvas).draw();
        new Oval(x, y, s*.5, 1.3, 1.2, "#D19F74", canvas).draw();
    };

    var head = function(x, y, s, color) {
        new Oval(x, y, s, 1.05, 1, color, canvas).draw();
    };

    var eye = function(x, y, s) {
        new Oval(x, y, s, 1, 1, "black", canvas).draw();
        new Oval(x-s*.6*Math.cos(.25*Math.PI), y-s*.6*Math.cos(.25*Math.PI), s*.4, 1, 1, "white", canvas).draw();
    };

    var nose = function(x, y, s) {
        new Oval(x, y, s, 1.4, 1, "black", canvas).draw();
        new Oval(x-s*.7*Math.cos(.25*Math.PI), y-s*.7*Math.cos(.25*Math.PI), s*.3, 1.4, 1, "white", canvas).draw();
    };

    var mouth = function(x, y, s) {
        var ctx = canvas.getContext("2d");
        ctx.save();
        ctx.lineWidth = s*.05;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(x - s, y-Math.sin(2.1 * Math.PI)*s, s, .9*Math.PI, 2.1*Math.PI, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x + s, y-Math.sin(2.1 * Math.PI)*s, s, .9*Math.PI, 2.1*Math.PI, true);
        ctx.stroke();
        ctx.restore();
    };

}

