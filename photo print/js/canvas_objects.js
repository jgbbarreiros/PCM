var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

Bear(20, 50, 10, "green");
Bear(100, 50, 30, "#752953");
Bear(300, 80, 60, "red");
Bear(130, 200, 80, "#452200");
// Oval(50, 50, 20, 10, "pink");

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
    Oval(l_eye_glare[0], l_eye_glare[1], radius_eye_glare, 1, 1, "#fff");
    Oval(r_eye_glare[0], r_eye_glare[1], radius_eye_glare, 1, 1, "#fff");
    // nose
    Oval(nose[0], nose[1], radius_nose, 1.4, 1, "#black");
    Oval(nose_glare[0], nose_glare[1], radius_nose_glare, 1.4, 1, "#fff");
    // mouth
    ctx.beginPath();
    ctx.arc(mouth[0], mouth[1], radius_mouth, start_ang_mouth, end_ang_mouth, true);
    ctx.arc(mouth[0]+radius_mouth*2, mouth[1], radius_mouth, start_ang_mouth, end_ang_mouth, true);
    ctx.lineWidth = r*.05;

    // line color
    ctx.strokeStyle = 'black';
    ctx.stroke();

    ctx.restore();
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

// Heart(100,100,80,30,"pink");
// Heart(200,100,60,20,"pink");

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