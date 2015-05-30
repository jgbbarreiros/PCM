var app = new FotoPrint();

function FotoPrint()
{
    this.aImg = new AppImages();
    this.thingInMotion;
    this.thingSelectet;
    this.text;

    this.offsetx;
    this.offsetx;

    this.init = function() {
        this.shpinDrawing = new Pool(100);
        this.canvas1 = document.getElementById('scratch');
        this.ctx = this.canvas1.getContext("2d");

        this.drawCanvasRect();

        var r1 = new Rect(2, 10, 50, 50,"red");
        var s1 = new Rect(60, 10, 50, 50, "green");
        //var oval1 = new Oval(200, 30, 20, 2.0, 1.0, "teal");
        //var cir1 = new Oval(300, 30, 20, 1.0, 1.0, "purple");
        var pic1 = new Picture(10, 100, 100, 100, this.aImg.dad);
        var pic2 = new Picture(120, 100, 100, 100, this.aImg.mom);
        var pic3 = new Picture(230, 100, 100, 100, this.aImg.son1);
        var pic4 = new Picture(340, 100, 100, 100, this.aImg.son2);
        var pic5 = new Picture(450, 100, 100, 100, this.aImg.daughter);
        //var hrt = new Heart(510, 30, 60, 20, "pink");


        this.shpinDrawing.insertObj(pic1);
        this.shpinDrawing.insertObj(pic2);
        this.shpinDrawing.insertObj(pic3);
        this.shpinDrawing.insertObj(pic4);
        this.shpinDrawing.insertObj(pic5);
        this.shpinDrawing.insertObj(r1);
        this.shpinDrawing.insertObj(s1);
        //this.shpinDrawing.insertObj(oval1);
        //this.shpinDrawing.insertObj(cir1);
        //this.shpinDrawing.insertObj(hrt);

        this.canvas1.addEventListener('mousedown', drag, false);
        this.canvas1.addEventListener('dblclick', makenewitem, false);
        this.canvas1.addEventListener('mousewheel', changeSizeEV, false);

        this.shpinDrawing2 = new Pool(20);
        this.canvas2 = document.getElementById('figures');
        var bear = new Bear(100, 90, 50, "#452200", this.canvas2);
        var cat = new Cat(100, 250, 50, "brown", this.canvas2);
        this.shpinDrawing2.insertObj(bear);
        this.shpinDrawing2.insertObj(cat);
        this.canvas2.addEventListener('mousedown', select, false);
    };

    this.drawCanvasRect = function() {
        this.ctx.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
        this.ctx.strokeStyle = "black";
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(0, 0, this.canvas1.width, this.canvas1.height);
    };

    this.clone = function (obj) {
        var item = new Object();
        for (var info in obj) {
            item[info] = obj[info];
        }
        return item;
    };
}

function AppImages() {
    this.dad = new Image();
    this.mom = new Image();
    this.son1 = new Image();
    this.son2 = new Image();
    this.daughter = new Image();

    var numImages = 5;
    var numLoaded = 0;

    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            app.init();
        }
    }

    this.dad.onload = function () {
        imageLoaded();
    };

    this.mom.onload = function () {
        imageLoaded();
    };
    this.son1.onload = function () {
        imageLoaded();
    };
    this.son2.onload = function () {
        imageLoaded();
    };
    this.daughter.onload = function () {
        imageLoaded();
    };
    this.dad.src = "imgs/daniel1.jpg";
    this.mom.src = "imgs/allison1.jpg";
    this.son1.src = "imgs/grant1.jpg";
    this.son2.src = "imgs/liam2.jpg";
    this.daughter.src = "imgs/annika.jpg";
}

function Pool(maxSize) {
    var size = maxSize;
    this.stuff = [];

    this.insertObj = function(obj) {
        this.stuff.push(obj);
        obj.draw();
    };

    this.drawshapes= function() {
        app.drawCanvasRect();
        for (var i = 0; i < this.stuff.length; i++) {
            this.stuff[i].draw();
        }
    };

    this.removeObj = function() {
        this.stuff.pop();
        this.drawshapes();
    };
}

function DrawingShape() {
    this.init = function(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
    };

    this.draw = function() {
    };

    this.overcheck = function (mx,my) {
        if ( (mx>=this.x)&&(mx<=(this.x+this.w))&&(my>=this.y)&&(my<=(this.y+this.h))) {
            return true;
        }
        else {
            return false;
        }
    };

    this.distsq = function (x1,y1,x2,y2) {
        //done to avoid taking square roots
        var xd = x1 - x2;
        var yd = y1 - y2;
        return ((xd*xd) + (yd*yd) );
    };
}

function Rect(x,y,w,h,c) {
    this.init(x,y,c);
    this.w = w;
    this.h = h;

    this.draw = function () {
        app.ctx.fillStyle = this.color;
        app.ctx.fillRect(this.x, this.y, this.w, this.h);
    };
}
Rect.prototype = new DrawingShape();

function Picture(x,y,w,h,imagename) {
    this.init(x,y,"white");
    this.w = w;
    this.h = h;
    this.imagename = imagename;

    this.draw = function() {
        app.ctx.drawImage(this.imagename,this.x,this.y,this.w,this.h);
    };
}
Picture.prototype = new DrawingShape();

//function Oval(x,y,r,hor,ver,c) {
//    this.init(x,y,c);
//    this.r = r;
//    this.radsq = r*r;
//    this.hor = hor;
//    this.ver = ver;
//
//    this.overcheck = function overoval(mx,my) {
//        var x1 = 0;  //this is this.x - this.x
//        var y1 = 0;
//        var x2 = (mx-this.x)/this.hor;
//        var y2 = (my-this.y)/this.ver;
//        if (this.distsq(x1,y1,x2,y2)<=(this.radsq) ){
//            return true;
//        }
//        else {
//            return false;
//        }
//    };
//
//    this.draw = function() {
//        app.ctx.save();
//        app.ctx.translate(this.x,this.y);
//        app.ctx.scale(this.hor,this.ver);
//        app.ctx.fillStyle = this.color;
//        app.ctx.beginPath();
//        app.ctx.arc(0,0,this.r,0,2*Math.PI,true);
//        app.ctx.closePath();
//        app.ctx.fill();
//        app.ctx.restore();
//    };
//}
//Oval.prototype = new DrawingShape();

function Heart(x,y,h,drx,color) {
    this.init(x,y,color);
    this.h = h;
    this.drx = drx;
    this.radsq = drx*drx;
    this.ang = .25*Math.PI;

    var outside = function (x,y,w,h,mx,my) {
        return ((mx<x) || (mx > (x+w)) || (my < y) || (my > (y+h)));
    };

    this.draw = function() {
        var leftctrx = this.x-this.drx;
        var rightctrx = this.x+this.drx;
        var cx = rightctrx+this.drx*Math.cos(this.ang);
        var cy = this.y + this.drx*Math.sin(this.ang);
        app.ctx.fillStyle = this.color;
        app.ctx.beginPath();
        app.ctx.moveTo(this.x,this.y);
        app.ctx.arc(leftctrx,this.y,this.drx,0,Math.PI-this.ang,true);
        app.ctx.lineTo(this.x,this.y+this.h);
        app.ctx.lineTo(cx,cy);
        app.ctx.arc(rightctrx,this.y,this.drx,this.ang,Math.PI,true);
        app.ctx.closePath();
        app.ctx.fill();
    };

    this.overcheck = function (mx,my) {
        var leftctrx = this.x-this.drx;
        var rightctrx = this.x+this.drx;
        var qx = this.x-2*this.drx;
        var qy = this.y-this.drx;
        var qwidth = 4*this.drx;
        var qheight = this.drx+this.h;

        //quick test if it is in bounding rectangle
        if (outside(qx,qy,qwidth,qheight,mx,my)) {
            return false;
        }

        //compare to two centers
        if (this.distsq(mx,my,leftctrx,this.y)<this.radsq) return true;
        if (this.distsq(mx,my,rightctrx,this.y)<this.radsq) return true;

        // if outside of circles AND less than equal to y, return false
        if (my<=this.y) return false;

        // compare to each slope
        var x2 = this.x
        var y2 = this.y + this.h;
        var m = (this.h)/(2*this.drx);

        // left side
        if (mx<=this.x) {
            if (my < (m*(mx-x2)+y2)) {

                return true;
            }
            else {

                return false;
            }
        }
        // right side
        else {
            m = -m;
            if (my < (m*(mx-x2)+y2)) {
                return true;
            }
            else return false;
        }
    };
}
Heart.prototype = new DrawingShape();


//Drag & Drop
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
    var endpt = app.shpinDrawing.stuff.length-1;
    for (var i=endpt;i>=0;i--) {
        if (app.shpinDrawing.stuff[i].overcheck(mx,my)) {
            app.offsetx = mx-app.shpinDrawing.stuff[i].x;
            app.offsety = my-app.shpinDrawing.stuff[i].y;
            var item = app.shpinDrawing.stuff[i];
            app.thingInMotion = app.shpinDrawing.stuff.length-1;
            app.shpinDrawing.stuff.splice(i,1);
            app.shpinDrawing.stuff.push(item);
            app.canvas1.style.cursor = "pointer";   // change to finger when dragging
            app.canvas1.addEventListener('mousemove',move,false);
            app.canvas1.addEventListener('mouseup',drop,false);
            break;
        }
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
    app.shpinDrawing.stuff[app.thingInMotion].x = mx-app.offsetx; //adjust for flypaper dragging
    app.shpinDrawing.stuff[app.thingInMotion].y = my-app.offsety;
    app.shpinDrawing.drawshapes();
}

function drop(ev) {
    app.canvas1.removeEventListener('mousemove',move,false);
    app.canvas1.removeEventListener('mouseup',drop,false);
    app.canvas1.style.cursor = "crosshair";
}

//Resposta ao evento doubleClick
function makenewitem(ev) {
    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    var endpt = app.shpinDrawing.stuff.length-1;
    var item;
    for (var i=endpt;i>=0;i--) {  //reverse order
        if (app.shpinDrawing.stuff[i].overcheck(mx,my)) {
            item = app.clone(app.shpinDrawing.stuff[i]);
            item.x +=20;
            item.y += 20;
            app.shpinDrawing.insertObj(item);
            break;
        }
    }
}

//Resposta ao evento onclick no botão
function removeobj() {
    app.shpinDrawing.removeObj();
}

//Resposta ao evento onclick no botão
function saveasimage() {
    try {
        window.open(app.canvas1.toDataURL("imgs/png"));}
    catch(err) {
        alert("You need to change browsers OR upload the file to a server.");
    }
}

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
    var endpt = app.shpinDrawing2.stuff.length-1;
    for (var i=endpt;i>=0;i--) {
        if (app.shpinDrawing2.stuff[i].overcheck(mx,my)) {
            app.offsetx = mx-app.shpinDrawing2.stuff[i].x;
            app.offsety = my-app.shpinDrawing2.stuff[i].y;
            app.thingSelectet = app.clone(app.shpinDrawing2.stuff[i]);
            //app.shpinDrawing2.stuff.push(item);
            app.canvas1.style.cursor = "pointer";   // change to finger when dragging
            app.canvas1.removeEventListener('mousedown', drag, false);
            app.canvas1.addEventListener('mousedown',insert,false);
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
    //app.thingSelectet.init(mx, my);
    var item = app.thingSelectet;
    item.init(mx, my, item.s, document.forms["frm1"]["color"].value, app.canvas1);
    app.shpinDrawing.insertObj(item);
    app.thingInMotion = app.shpinDrawing.stuff.length-1;
    app.canvas1.style.cursor = "crosshair";
    app.canvas1.removeEventListener('mousedown',insert,false);
    app.canvas1.addEventListener('mousedown', drag, false);
}

function insertText() {
    app.text = prompt('Please enter your text', 'text');
    if (app.text != null) {
        app.canvas1.style.cursor = "pointer";
        app.canvas1.removeEventListener('mousedown', insert, false);
        app.canvas1.removeEventListener('mousedown', drag, false);
        app.canvas1.addEventListener('mousedown', insertTextEV, false);
    }
}

function insertTextEV(ev) {

    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }

    var item = new Text(mx, my, 30, app.text, document.forms["frm1"]["color"].value, app.canvas1);
    app.shpinDrawing.insertObj(item);
    app.thingInMotion = app.shpinDrawing.stuff.length-1;
    app.canvas1.style.cursor = "crosshair";
    app.canvas1.removeEventListener('mousedown', insertTextEV, false);
    app.canvas1.addEventListener('mousedown', drag, false);
}

function inserirImagem() {
    app.myImage = new Image();
    var filea = document.getElementById('img');
    var coisa = filea.files[0];
    var fileURLa = createObjectURL(coisa);
    app.myImage.src = fileURLa;
    app.myImage.onload = function () {
        app.canvas1.removeEventListener('mousedown', drag, false);
        app.canvas1.addEventListener('mousedown', insertImageEV, false);
    };
}

function insertImageEV(ev) {
    var mx;
    var my;
    if ( ev.layerX ||  ev.layerX == 0) {
        mx= ev.layerX;
        my = ev.layerY;
    } else if (ev.offsetX || ev.offsetX == 0) {
        mx = ev.offsetX;
        my = ev.offsetY;
    }
    var pic = new Picture(mx, my, app.myImage.width, app.myImage.height, app.myImage);
    app.shpinDrawing.insertObj(pic);
    app.thingInMotion = app.shpinDrawing.stuff.length-1;
    app.canvas1.style.cursor = "crosshair";
    app.canvas1.removeEventListener('mousedown', insertImageEV, false);
    app.canvas1.addEventListener('mousedown', drag, false);
}

function createObjectURL ( file ) {
    if ( window.webkitURL ) {
        return window.webkitURL.createObjectURL( file );
    } else if ( window.URL && window.URL.createObjectURL ) {
        return window.URL.createObjectURL( file );
    } else {
        return null;
    }
}

function changeSizeEV(ev) {
    //alert('mousewheel worked!');
    var item = app.shpinDrawing.stuff[app.thingInMotion];
    if (ev.wheelDelta >= 0) {
        removeobj();
        item.s += 10;
        app.shpinDrawing.insertObj(item);
    }
    else {
        if (item.s >= 15) {
            removeobj();
            item.s -= 10;
            app.shpinDrawing.insertObj(item);
        }
    }
}