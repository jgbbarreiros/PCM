var c = document.getElementById("scratch");

var bear = new Bear(150, 150, 150, "#452200", c);
bear.draw();

function Bear(x, y, s, color, canvas) {
    this.x = x;
    this.y = y;

    this.draw = function() {
        ear(x - (s*Math.cos(.25*Math.PI)), y - (s*Math.sin(.25*Math.PI)), s, color)
    };

    var ear = function(x, y, s) {
        Oval(x, y, s*.4, 1.3, 1.2, color, canvas);
        Oval(x, y, s*.2, 1.3, 1.2, "#D19F74", canvas);
    };
}

function Oval(x, y, r, hor, ver, color, canvas) {
    var ctx = canvas.getContext("2d");
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(hor, ver);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, 2 * Math.PI, true);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

