window.onload = function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        ball = new Ball(),
        angle = 0;
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;

    var myreq;
    (function drawFrame() {
        myreq=window.requestAnimationFrame(drawFrame);
        context.clearRect(0, 0, canvas.width, canvas.height);

        ball.scaleX = ball.scaleY = 1 + 2*Math.sin(angle) * 0.5;
        angle += 0.05;
        ball.draw(context);
    }());

};

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
        return window.setTimeout(callback, 17 /*~ 1000/60*/);
    });
}

function Ball() {
    this.x = 0;
    this.y = 0;
    this.radius = 40;
    this.rotation = 0;
    this.color = "#FF0000";
    this.scaleX = 1;
    this.scaleY = 1;

    this.draw = function (context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.rotation);
        context.scale(this.scaleX, this.scaleY);
        context.lineWidth = this.lineWidth;
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
        context.closePath();
        context.fill();
        context.restore();
    }
};