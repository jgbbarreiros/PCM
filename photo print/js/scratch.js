var canvas = document.getElementById("scratch");
var bear = new Bear(100, 100, 50, "#452200", canvas);
bear.draw();

function FotoPrint() {

    this.thingInMotion = undefined;
    this.offsetx = undefined;
    this.offsetx = undefined;

    this.init = function() {
        this.shpinDrawing = new Pool(100);
        this.scratch = document.getElementById('scratch');
        this.ctx = this.scratch.getContext("2d");

        this.drawCanvasRect();

    };

    this.drawCanvasRect = function() {
        this.ctx.clearRect(0, 0, this.scratch.width, this.scratch.height);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, this.scratch.width, this.scratch.height);
    };
}