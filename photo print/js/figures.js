//var canvas = document.getElementById("figures");

//var bear = new Bear(100, 100, 50, "#452200", canvas);
//bear.draw();

function Figure() {

    this.init = function(x, y, s, color, canvas) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.color = color;
        this.canvas = canvas;
    };

    this.draw = function() {};

    this.overcheck = function(mx,my) {};

    this.distsq = function (x1,y1,x2,y2) {
        //done to avoid taking square roots
        var xd = x1 - x2;
        var yd = y1 - y2;
        return xd*xd + yd*yd;
    };
}

function Poligon(points, s, color, canvas) {

    this.init(points[0][0], points[0][1], s, color, canvas);

    this.draw = function() {
        var ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.lineWidth = this.s;
        ctx.fillStyle = this.color;
        ctx.moveTo(this.x, this.y);
        ctx.beginPath();
        for (var i = 0; i<points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    };

    this.overcheck = function(mx,my) {

    };
}

Poligon.prototype = new Figure();

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
Oval.prototype = new Figure();

function Bear(x, y, s, color, canvas) {

    this.init(x, y, s, color, canvas);

    this.draw = function() {
        this.earlb = new Oval(this.x-(this.s*Math.cos(.25*Math.PI)), this.y-(this.s*Math.sin(.25*Math.PI)), this.s*.4, 1.3, 1.2, this.color, this.canvas);
        this.earlb.draw();
        this.earls = new Oval(this.x-(this.s*Math.cos(.25*Math.PI)), this.y-(this.s*Math.sin(.25*Math.PI)), this.s*.2, 1.3, 1.2, "#D19F74", this.canvas);
        this.earls.draw();
        this.earrb = new Oval(this.x+(this.s*Math.cos(.25*Math.PI)), this.y-(this.s*Math.sin(.25*Math.PI)), this.s*.4, 1.3, 1.2, this.color, this.canvas);
        this.earrb.draw();
        this.earrs = new Oval(this.x+(this.s*Math.cos(.25*Math.PI)), this.y-(this.s*Math.sin(.25*Math.PI)), this.s*.2, 1.3, 1.2, "#D19F74", this.canvas);
        this.earrs.draw();
        this.head  = new Oval(this.x, this.y, this.s, 1.05, 1, this.color, this.canvas);
        this.head.draw();
        this.eyelb = new Oval(this.x-(this.s*.4*Math.cos(.20*Math.PI)), this.y-(this.s*.4*Math.sin(.20*Math.PI)), this.s*.15, 1, 1, "black", this.canvas);
        this.eyelb.draw();
        this.eyels = new Oval(this.x-(this.s*.4*Math.cos(.20*Math.PI))-this.s*.09*Math.cos(.25*Math.PI), this.y-(this.s*.4*Math.sin(.20*Math.PI))-this.s*.09*Math.cos(.25*Math.PI), this.s*.06, 1, 1, "white", this.canvas);
        this.eyels.draw();
        this.eyerb = new Oval(this.x+(this.s*.4*Math.cos(.20*Math.PI)), this.y-(this.s*.4*Math.sin(.20*Math.PI)), this.s*.15, 1, 1, "black", this.canvas);
        this.eyerb.draw();
        this.eyers = new Oval(this.x+(this.s*.4*Math.cos(.20*Math.PI))-this.s*.09*Math.cos(.25*Math.PI), this.y-(this.s*.4*Math.sin(.20*Math.PI))-this.s*.09*Math.cos(.25*Math.PI), this.s*.06, 1, 1, "white", this.canvas);
        this.eyers.draw();
        this.noseb = new Oval(this.x, this.y+this.s*.2, this.s*.22, 1.4, 1, "black", this.canvas);
        this.noseb.draw();
        this.noses = new Oval(this.x-this.s*.154*Math.cos(.25*Math.PI), this.y+this.s*.2-this.s*.154*Math.cos(.25*Math.PI), this.s *.066, 1.4, 1, "white", this.canvas);
        this.noses.draw();
        var ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.lineWidth = this.s*.3*.05;
        ctx.strokeStyle = 'black';
        ctx.beginPath();
        ctx.arc(this.x - this.s*.3, this.y+this.s*.42-Math.sin(2.1 * Math.PI)*this.s*.3, this.s*.3, .9*Math.PI, 2.1*Math.PI, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(this.x + this.s*.3, this.y+this.s*.42-Math.sin(2.1 * Math.PI)*this.s*.3, this.s*.3, .9*Math.PI, 2.1*Math.PI, true);
        ctx.stroke();
        ctx.restore();
    };

    this.overcheck = function(mx, my) {
        return this.earlb.overcheck(mx, my) || this.earrb.overcheck(mx, my) || this.head.overcheck(mx, my);
    };

}
Bear.prototype = new Figure();

function Cat(x, y, s, color, canvas) {

    this.init(x, y, s, color, canvas);

    this.draw = function() {
        var earlbp = [[this.x, this.y-this.s*.5], [this.x - this.s*(Math.cos(.40*Math.PI)+ .7), this.y - this.s*(Math.sin(.40*Math.PI)+.7)], [this.x-.75*this.s, this.y]];
        this.earlb = new Poligon(earlbp, this.s*.3, this.color, this.canvas);
        this.earlb.draw();
        var earlsp = [[this.x, this.y-this.s*.2], [this.x - this.s*(Math.cos(.40*Math.PI)+ .7)+this.s*.2, this.y - this.s*(Math.sin(.40*Math.PI)+.7)+this.s*.4], [this.x-.75*this.s+this.s*.2, this.y+this.s*.2]];
        this.earls = new Poligon(earlsp, this.s*.3, "white", this.canvas);
        this.earls.draw();
        var earrbp = [[this.x, this.y-this.s*.5], [this.x+this.s*(Math.cos(.40*Math.PI)+ .7), this.y - this.s*(Math.sin(.40*Math.PI)+.7)], [this.x+.75*this.s, this.y]];
        this.earrb = new Poligon(earrbp, this.s*.3, this.color, this.canvas);
        this.earrb.draw();
        var earrsp = [[this.x, this.y-this.s*.2], [this.x + this.s*(Math.cos(.40*Math.PI)+ .7)-this.s*.2, this.y - this.s*(Math.sin(.40*Math.PI)+.7)+this.s*.4], [this.x+.75*this.s-this.s*.2, this.y+this.s*.2]];
        this.earrs = new Poligon(earrsp, this.s*.3, "white", this.canvas);
        this.earrs.draw();

        var ctx = this.canvas.getContext("2d");
        ctx.save();
        ctx.strokeStyle = 'black';
        for (var i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y+this.s*.15*i);
            ctx.lineTo(this.x - this.s * 1.6, this.y - this.s * 1.6 * Math.sin(1.05 * Math.PI) + this.s*.15*i);
            ctx.closePath();
            ctx.stroke();
        }
        for (i = 0; i < 3; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y+this.s*.15*i);
            ctx.lineTo(this.x + this.s * 1.6, this.y - this.s * 1.6 * Math.sin(1.95 * Math.PI) + this.s*.15*i);
            ctx.closePath();
            ctx.stroke();
        }
        ctx.restore();
        this.head = new Oval(this.x, this.y, this.s, 1.1,.9, this.color, this.canvas);
        this.head.draw();

        //var radius_eye = r*.4;
        //var radius_eyeball = radius_eye*.35;
        //var l_eye = [x - radius_eye - r *.05, y];
        //var r_eye = [x + radius_eye + r *.05, y];
        //this.eyelb = new Oval(this.x - this.s *.4- this.s *.05, l_eye[1], this.s, 1, 1.1, "white");
        //this.eyels = new Oval(r_eye[0], r_eye[1], radius_eye, 1, 1.1, "white");
        //this.eyerb = new Oval(l_eye[0] + radius_eye *.6, l_eye[1], radius_eyeball, 1, 1.1, "black");
        //this.eyels = new Oval(r_eye[0] + radius_eye *.6, r_eye[1], radius_eyeball, 1, 1.1, "black");

    };

    this.overcheck = function(mx, my) {
        return this.head.overcheck(mx, my);
    };

}

Cat.prototype = new Figure();