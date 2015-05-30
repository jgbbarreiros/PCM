var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

//Bear(20, 50, 10, "green");
//Bear(100, 50, 30, "#752953");
//Bear(300, 80, 60, "red");
Bear(900, 200, 15, "#452200");
Cat(350, 500, 15, "grey");
//Flower(750, 600, 50, 5, "red");
FlowerDonger(850, 500, 100, "green");


function Bear(x, y, r, color) {
    ctx.save();
    ctx.moveTo(x,y);

    var ang_ear = .25*Math.PI;
    var ang_eye = .20*Math.PI;
    var ang_eye_glare = .25*Math.PI;
    var radius_eye = r*.15;
    var radius_eye_glare = radius_eye*.4;
    var radius_nose = r*.22;
    var radius_nose_glare = radius_nose*.3;
    var ang_nose_glare = .25*Math.PI;
    var radius_mouth = r*.3;
    var start_ang_mouth = .9 * Math.PI;
    var end_ang_mouth = 2.1 * Math.PI;

    var l_ear = [x - (r*Math.cos(ang_ear)), y - (r*Math.sin(ang_ear))];
    var r_ear = [x + (r*Math.cos(ang_ear)), y - (r*Math.sin(ang_ear))];

    var l_eye = [x - (r*.4*Math.cos(ang_eye)), y - (r*.4*Math.sin(ang_eye))];
    var r_eye = [x + (r*.4*Math.cos(ang_eye)), y - (r*.4*Math.sin(ang_eye))];

    var l_eye_glare = [l_eye[0] - ((radius_eye-radius_eye_glare)*Math.cos(ang_eye_glare)),
                       l_eye[1] - ((radius_eye-radius_eye_glare)*Math.sin(ang_eye_glare))];
    var r_eye_glare = [r_eye[0] - ((radius_eye-radius_eye_glare)*Math.cos(ang_eye_glare)),
                       r_eye[1] - ((radius_eye-radius_eye_glare)*Math.sin(ang_eye_glare))];

    var nose = [x, y+r *.2];
    var nose_glare = [nose[0] - ((radius_nose-radius_nose_glare)*Math.cos(ang_nose_glare)),
        nose[1] - ((radius_nose-radius_nose_glare)*Math.sin(ang_nose_glare))];

    var mouth = [x-radius_mouth, nose[1]+radius_nose-Math.sin(2.1 * Math.PI)*radius_mouth];

    // ears
    Oval(l_ear[0], l_ear[1], r*.4, 1.3, 1.2, color);
    Oval(l_ear[0], l_ear[1], r*.2, 1.3, 1.2, "#D19F74");
    Oval(r_ear[0], r_ear[1], r*.4, 1.3, 1.2, color);
    Oval(r_ear[0], r_ear[1], r*.2, 1.3, 1.2, "#D19F74");
    // head
    Oval(x, y, r, 1.05, 1, color);
    //eyes
    Oval(l_eye[0], l_eye[1], radius_eye, 1, 1, "black");
    Oval(r_eye[0], r_eye[1], radius_eye, 1, 1, "black");
    Oval(l_eye_glare[0], l_eye_glare[1], radius_eye_glare, 1, 1, "white");
    Oval(r_eye_glare[0], r_eye_glare[1], radius_eye_glare, 1, 1, "white");
    // nose
    Oval(nose[0], nose[1], radius_nose, 1.4, 1, "black");
    Oval(nose_glare[0], nose_glare[1], radius_nose_glare, 1.4, 1, "white");
    // mouth
    ctx.lineWidth = r*.05;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(mouth[0], mouth[1], radius_mouth, start_ang_mouth, end_ang_mouth, true);
    ctx.arc(mouth[0]+radius_mouth*2, mouth[1], radius_mouth, start_ang_mouth, end_ang_mouth, true);
    ctx.stroke();
    ctx.restore();
}

function Cat(x, y, r, color) {
    ctx.save();
    var ang_ear = .40*Math.PI;
    var ang_l_whiskers = 1.05*Math.PI;
    var ang_r_whiskers = 1.95*Math.PI;
    var radius_eye = r*.4;
    var radius_eyeball = radius_eye*.35;

    var l_ear = [[x, y-r *.5], [x - r*(Math.cos(ang_ear) + .7), y - r*(Math.sin(ang_ear) +.7)], [x-.75*r, y]];
    var r_ear = [[x, y-r *.5], [x + r*(Math.cos(ang_ear) + .7), y - r*(Math.sin(ang_ear) +.7)], [x+.75*r, y]];
    var l_eye = [x - radius_eye - r *.05, y];
    var r_eye = [x + radius_eye + r *.05, y];
    var l_whiskers = [x - r *1.6, y - r *1.6*Math.sin(ang_l_whiskers)];
    var r_whiskers = [x + r *1.6, y - r *1.6*Math.sin(ang_r_whiskers)];

    ctx.lineWidth = r*.03;
    // ears
    ctx.fillStyle = color;
    ctx.moveTo(x,y);
    ctx.beginPath();
    for (var i = 0; i < l_ear.length; i++) {
        ctx.lineTo(l_ear[i][0], l_ear[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x +r*.2,y+r*.4);
    for (i = 0; i < l_ear.length; i++) {
        ctx.lineTo(l_ear[i][0]+r*.2, l_ear[i][1]+r*.4);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x,y);
    for (i = 0; i < r_ear.length; i++) {
        ctx.lineTo(r_ear[i][0], r_ear[i][1]);
    }
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(x -r*.2,y+r*.4);
    for (i = 0; i < r_ear.length; i++) {
        ctx.lineTo(r_ear[i][0]-r*.2, r_ear[i][1]+r*.4);
    }
    ctx.closePath();
    ctx.fill();
    // whiskers
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(l_whiskers[0], l_whiskers[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x,y+ r *.15);
    ctx.lineTo(l_whiskers[0], l_whiskers[1] + r *.15);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x,y+ r *.3);
    ctx.lineTo(l_whiskers[0], l_whiskers[1] + r *.3);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(r_whiskers[0], r_whiskers[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x,y+ r *.15);
    ctx.lineTo(r_whiskers[0], r_whiskers[1] + r *.15);
    ctx.closePath();
    ctx.stroke();
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x,y+ r *.3);
    ctx.lineTo(r_whiskers[0], r_whiskers[1] + r *.3);
    ctx.closePath();
    ctx.stroke();
    // head
    Oval(x, y, r, 1.1,.9, color);
    // eyes
    Oval(l_eye[0], l_eye[1], radius_eye, 1, 1.1, "white");
    Oval(r_eye[0], r_eye[1], radius_eye, 1, 1.1, "white");
    Oval(l_eye[0] + radius_eye *.6, l_eye[1], radius_eyeball, 1, 1.1, "black");
    Oval(r_eye[0] + radius_eye *.6, r_eye[1], radius_eyeball, 1, 1.1, "black");

    ctx.restore();
}

function FlowerDonger(x, y, r, color) {

    ctx.save();
    Flower(x+Math.cos(.95*Math.PI)* r *.9, y - Math.sin(.95*Math.PI)* r *.75, r *.1, 5, color);

    ctx.strokeStyle = color;

    // head
    ctx.lineWidth = r*.06;
    ctx.beginPath();
    ctx.arc(x-r *.3, y, r*1,.8*Math.PI, 1.2*Math.PI, false);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x+r *.3, y, r*1,.2*Math.PI, 1.8*Math.PI, true);
    ctx.stroke();

    // eyes
    ctx.lineWidth = r*.03;
    ctx.beginPath();
    ctx.arc(x- r*.2, y - r*.1, r *.25,-.05*Math.PI,-.95*Math.PI, true);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + r *.7, y - r*.1, r *.25,-.05*Math.PI,-.95*Math.PI, true);
    ctx.stroke();

    // mouth
    ctx.beginPath();
    ctx.arc(x+ r*.265, y + r*.2, r *.25,.2*Math.PI,.8*Math.PI, false);
    ctx.stroke();

    ctx.restore();
}

function Flower(x, y, r, p, color) {
    ctx.save();
    var ang_init = .5*Math.PI;
    var ang = 2*Math.PI/p;
    var hip = 1.5*r;
    for (var i = 0; i < p; i++) {
        var ang_current = ang_init + ang*i;
        var w = Math.cos(ang_current)*hip;
        var h = Math.sin(ang_current)*hip;
        Oval(x+w, y-h, r, .9, .9, color);
    }
    Oval(x, y, r, 1, 1, "white");
    ctx.restore();
}

function Heart(x,y,h,drx,color) {
    var ang = .25*Math.PI;
    var leftctrx = x-drx;
    var rightctrx = x+drx;
    var cx = rightctrx+drx*Math.cos(ang);
    var cy = y + drx*Math.sin(ang);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.arc(leftctrx,y,drx,0,Math.PI-ang,true);
    ctx.lineTo(x,y+h);
    ctx.lineTo(cx,cy);
    ctx.arc(rightctrx,y,drx,ang,Math.PI,true);
    ctx.closePath();
    ctx.fill();
}

function Oval(x, y, r, hor, ver, color) {
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
