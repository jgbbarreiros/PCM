function Canvas(canvas) {

    this.w = canvas.width;
    this.h = canvas.height;
    this.figures = [];
    this.selected = undefined;
    this.offsetX = undefined;
    this.offsetY = undefined;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.color = undefined;

    this.add = function(figure) {
        // add figure to last position
        this.figures.push(figure);
        this.selected = figure;
        figure.draw();
    };

    this.remove = function(figure) {
        // remove figure, return success
        var pos = this.figures.indexOf(figure);
        if (pos == -1) {
            return false;
        } else {
            this.figures.splice(pos, 1);
            this.draw();
            return true;
        }
    };

    this.copy = function(figure) {
        var item = new Object();
        for (var info in figure) {
            item[info] = figure[info];
        }
        return item;
    };

    this.draw = function() {
        // draw background and figures
        if (this.color != undefined) {
            this.ctx.fillStyle = this.color;
            this.ctx.fillRect(0, 0, this.w, this.h);
        } else this.clear();
        for (var i = 0; i < this.figures.length; i++) {
            this.figures[i].draw();
        }
    };

    this.clear = function() {
        // clear canvas
        this.ctx.clearRect(0, 0, this.w, this.h);
    };

    this.clearAll = function() {
        this.clear();
        this.selected = undefined;
        this.figures = [];
        this.color = undefined;
    };


    this.setColor = function(color) {
        // set background color
        this.color = color;
        this.draw();
    };

    this.style = function(color, thickness) {
        // set border style
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = thickness;
        this.ctx.strokeRect(0, 0, this.w, this.h);
    };
}