
var fpallet = new Canvas(document.getElementById('fpallet'));
var scratch = new Canvas(document.getElementById('scratch'));

var fp = new PhotoPrint(scratch);

fpallet.style('black', 5);
fpallet.setColor('white');


var bear = new Bear(100, 90, 50, "#452200", fpallet.canvas);
var cat = new Cat(100, 250, 50, "brown", fpallet.canvas);
var flowerDonger = new FlowerDonger(100, 365, 50, "black", fpallet.canvas);
var flower = new Flower(6, 100, 500, 50, "#FFB32B", fpallet.canvas);

fpallet.add(cat);
fpallet.add(bear);
fpallet.add(flowerDonger);
fpallet.add(flower);

var bear2 = new Bear(100, 100, 50, '#452200', scratch.canvas);

scratch.add(bear2);

scratch.canvas.addEventListener('mousedown', drag, false);
scratch.canvas.addEventListener('dblclick', duplicate, false);
scratch.canvas.addEventListener('mousewheel', size, false);

fpallet.canvas.addEventListener('mousedown', select, false);

function select(ev) {
    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    var figures = fpallet.figures;
    for (var i=figures.length-1; i>=0; i--) {
        if (figures[i].overcheck(mx, my)) {
            fpallet.selected = fpallet.copy(figures[i]);
            scratch.canvas.style.cursor = "pointer";
            scratch.canvas.removeEventListener('mousedown', drag, false);
            scratch.canvas.addEventListener('mousedown', insert, false);
            break;
        }
    }
}

function insert(ev) {
    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    fpallet.selected.init(mx, my, fpallet.selected.s, fpallet.selected.color, scratch.canvas);
    scratch.add(fpallet.selected);
    scratch.canvas.style.cursor = "crosshair";
    scratch.canvas.removeEventListener('mousedown',insert, false);
    scratch.canvas.addEventListener('mousedown', drag, false);
}

function drag(ev) {
    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    var figures = scratch.figures;
    for (var i=figures.length-1; i>=0; i--) {
        if (figures[i].overcheck(mx, my)) {
            scratch.offsetX = mx-figures[i].x;
            scratch.offsetY = my-figures[i].y;
            var figure = figures[i];
            scratch.remove(figure);
            if (fp.fillBucket) {
                figure.color = fp.color;
            }
            scratch.add(figure);
            scratch.canvas.style.cursor = "move";
            scratch.canvas.addEventListener('mousemove', move, false);
            scratch.canvas.addEventListener('mouseup', drop, false);
            return;
        }
    }
    if (fp.fillBucket) {
        scratch.setColor(fp.color);
    }
}

function move(ev) {
    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    scratch.selected.x = mx-scratch.offsetX;
    scratch.selected.y = my-scratch.offsetY;
    scratch.draw();
}

function drop(ev) {
    var canvas = ev.target;
    canvas.removeEventListener('mousemove', move, false);
    canvas.removeEventListener('mouseup', drop, false);
    canvas.style.cursor = "crosshair";
}

function duplicate(ev) {
    clearSelection();
    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    var figures = scratch.figures;
    for (var i=figures.length-1; i>=0; i--) {
        if (figures[i].overcheck(mx,my)) {
            scratch.selected = scratch.copy(figures[i]);
            scratch.selected.x +=20;
            scratch.selected.y += 20;
            scratch.add(scratch.selected);
            break;
        }
    }
}

function clearSelection() {
    if(document.selection && document.selection.empty) {
        document.selection.empty();
    } else if(window.getSelection) {
        var sel = window.getSelection();
        sel.removeAllRanges();
    }
}

function size(ev) {
    var item = scratch.copy(scratch.selected);
    scratch.remove(scratch.selected);
    if (ev.wheelDelta >= 0) {
        item.s += 10;
    }
    else if (item.s >= 20) {
        item.s -= 10;
    }
    scratch.add(item);
}

function insertImage(ev) {
    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    var pic = new Picture(fp.myImage, fp.myImage.width, fp.myImage.height, mx, my, 1000, 'white',scratch.canvas);
    scratch.add(pic);
    scratch.canvas.style.cursor = "crosshair";
    document.getElementById('img').value = null;
    scratch.canvas.removeEventListener('mousedown', insertImage, false);
    scratch.canvas.addEventListener('mousedown', drag, false);
}

function insertText(ev) {
    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }

    var item = new Text(fp.myText, mx, my, 30, 'black', scratch.canvas);
    scratch.add(item);
    scratch.canvas.style.cursor = "crosshair";
    scratch.canvas.removeEventListener('mousedown', insertText, false);
    scratch.canvas.addEventListener('mousedown', drag, false);
}

