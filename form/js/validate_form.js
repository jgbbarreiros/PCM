/**
 * Created by Joao on 5/8/2015.
 */

function validatefrm1()  {
    var d = new Date();
    var xmlRowString = '<Questionario id="' + d.getTime() + '">';

    var age= document.forms["frm1"]["age"].value;
    xmlRowString += '<q id="age">' + age + '</q>';

    var sex= document.forms["frm1"]["sex"].value;
    xmlRowString += '<q id="sex">' + sex + '</q>';

    if (document.forms["frm1"]["internet"].value != '') {
        var internet= document.getElementById(document.forms["frm1"]["internet"].value).innerHTML;
        xmlRowString += '<q id="internet">' + internet + '</q>';
    } else {
        xmlRowString += '<q id="internet">Sem resposta</q>';
    }

    if (document.forms["frm1"]["browser1"].value != '') {
        var browser1= document.getElementById('b' + document.forms["frm1"]["browser1"].value).innerHTML;
        xmlRowString += '<q id="browser1">' + browser1 + '</q>';
    } else {
        xmlRowString += '<q id="browser1">Sem resposta</q>';
    }

    if (document.forms["frm1"]["browser2"].value != '') {
        var browser2= document.getElementById('b' + document.forms["frm1"]["browser2"].value).innerHTML;
        xmlRowString += '<q id="browser2">' + browser2 + '</q>';
    } else {
        xmlRowString += '<q id="browser2">Sem resposta</q>';
    }

    if (document.forms["frm1"]["browser3"].value != '') {
        var browser3= document.getElementById('b' + document.forms["frm1"]["browser3"].value).innerHTML;
        xmlRowString += '<q id="browser3">' + browser3 + '</q>';
    } else {
        xmlRowString += '<q id="browser3">Sem resposta</q>';
    }

    if (document.forms["frm1"]["sites"].value != '') {
        var sites = document.forms["frm1"]["sites"].value;
        if (sites == 'Sim') {
            var sites_outros = document.forms["frm1"]["psqimg"].value;
            xmlRowString += '<q id="sites">' + sites + ', ' + sites_outros + '</q>';

        } else {
            xmlRowString += '<q id="sites">' + sites + '</q>';
        }
    } else {
        xmlRowString += '<q id="sites">Sem resposta</q>';
    }

    xmlRowString += "</Questionario>";
    window.localStorage.setItem(d.getTime().toString(), xmlRowString);
}


function validatefrm2()  {
    var d = new Date();
    var xmlRowString = '<Questionario id="' + d.getTime() + '">';
    if (document.forms["frm2"]["t1"].value != '') {
        var t1 = document.forms["frm2"]["t1"].value;
        xmlRowString += '<q id="t1">' + t1 + '</q>';
    } else {
        xmlRowString += '<q id="t1">Sem resposta</q>';
    }

    if (document.forms["frm2"]["t2"].value != '') {
        var t2 = document.forms["frm2"]["t2"].value;
        xmlRowString += '<q id="t2">' + t2 + '</q>';
    } else {
        xmlRowString += '<q id="t2">Sem resposta</q>';
    }

    if (document.forms["frm2"]["t3"].value != '') {
        var t3 = document.forms["frm2"]["t3"].value;
        xmlRowString += '<q id="t3">' + t3 + '</q>';
    } else {
        xmlRowString += '<q id="t3">Sem resposta</q>';
    }

    if (document.forms["frm2"]["t41"].value != '') {
        var t41 = document.forms["frm2"]["t41"].value;
        xmlRowString += '<q id="t41">' + t41 + '</q>';
    } else {
        xmlRowString += '<q id="t41">Sem resposta</q>';
    }

    if (document.forms["frm2"]["t42"].value != '') {
        var t42 = document.forms["frm2"]["t42"].value;
        xmlRowString += '<q id="t42">' + t42 + '</q>';
    } else {
        xmlRowString += '<q id="t42">Sem resposta</q>';
    }
    xmlRowString += "</Questionario>";
    window.localStorage.setItem(d.getTime().toString(), xmlRowString);
}

function validatefrm3()  {
    var d = new Date();
    var xmlRowString2 = '<Questionario id="2' + d.getTime() + '">';

    if (document.forms["frm3"]["fh"].value != '') {
        var fh = document.forms["frm3"]["fh"].value;
        xmlRowString2 += '<q id="fh">' + fh + '</q>';
    } else {
        xmlRowString2 += '<q id="fh">Sem resposta</q>';
    }

    if (document.forms["frm3"]["ea"].value != '') {
        var ea = document.forms["frm3"]["ea"].value;
        xmlRowString2 += '<q id="ea">' + ea + '</q>';
    } else {
        xmlRowString2 += '<q id="ea">Sem resposta</q>';
    }

    if (document.forms["frm3"]["gf"].value != '') {
        var gf = document.forms["frm3"]["gf"].value;
        xmlRowString2 += '<q id="gf">' + gf + '</q>';
    } else {
        xmlRowString2 += '<q id="gf">Sem resposta</q>';
    }

    if (document.forms["frm3"]["fd"].value != '') {
        var fd = document.forms["frm3"]["fd"].value;
        xmlRowString2 += '<q id="fd">' + fd + '</q>';
    } else {
        xmlRowString2 += '<q id="fd">Sem resposta</q>';
    }

    if (document.forms["frm3"]["rating2"].value != '') {
        var rating2 = document.forms["frm3"]["rating2"].value;
        xmlRowString2 += '<q id="rating2">' + rating2 + '</q>';
    } else {
        xmlRowString2 += '<q id="rating2">Sem resposta</q>';
    }

    if (document.forms["frm3"]["rating3"].value != '') {
        var rating3 = document.forms["frm3"]["rating3"].value;
        xmlRowString2 += '<q id="rating3">' + rating3 + '</q>';
    } else {
        xmlRowString2 += '<q id="rating3">Sem resposta</q>';
    }

    if (document.forms["frm3"]["rating4"].value != '') {
        var rating4 = document.forms["frm3"]["rating4"].value;
        xmlRowString2 += '<q id="rating4">' + rating4 + '</q>';
    } else {
        xmlRowString2 += '<q id="rating4">Sem resposta</q>';
    }

    if (document.forms["frm3"]["rating5"].value != '') {
        var rating5 = document.forms["frm3"]["rating5"].value;
        xmlRowString2 += '<q id="rating5">' + rating5 + '</q>';
    } else {
        xmlRowString2 += '<q id="rating5">Sem resposta</q>';
    }

    if (document.forms["frm3"]["rating6"].value != '') {
        var rating6 = document.forms["frm3"]["rating6"].value;
        xmlRowString2 += '<q id="rating6">' + rating6 + '</q>';
    } else {
        xmlRowString2 += '<q id="rating6">Sem resposta</q>';
    }

    if (document.forms["frm3"]["rating7"].value != '') {
        var rating7 = document.forms["frm3"]["rating7"].value;
        xmlRowString2 += '<q id="rating7">' + rating7 + '</q>';
    } else {
        xmlRowString2 += '<q id="rating7">Sem resposta</q>';
    }
    xmlRowString2 += "</Questionario>";
    window.localStorage.setItem(d.getTime().toString(), xmlRowString2);
}

function firstOption() {
    var fop = document.forms["frm1"]["browser1"].value;
    var sop = document.forms["frm1"]["browser2"].value;
    var top = document.forms["frm1"]["browser3"].value;
    if (fop==sop) {
        document.getElementById("s"+sop).checked = false;
    }
    if (fop==top) {
        document.getElementById("t"+top).checked = false;
    }
}


function secondOption() {
    var fop = document.forms["frm1"]["browser1"].value;
    var sop = document.forms["frm1"]["browser2"].value;
    var top = document.forms["frm1"]["browser3"].value;
    if (sop==fop) {
        document.getElementById("f"+fop).checked = false;
    }
    if (sop==top) {
        document.getElementById("t"+top).checked = false;
    }
}

function thirdOption() {
    var fop = document.forms["frm1"]["browser1"].value;
    var sop = document.forms["frm1"]["browser2"].value;
    var top = document.forms["frm1"]["browser3"].value;
    if (top==fop) {
        document.getElementById("f"+fop).checked = false;
    }
    if (top==sop) {
        document.getElementById("s"+sop).checked = false;
    }
}

function enableField() {
    document.forms["frm1"]["psqimg"].disabled =false;
}

function disableField() {
    document.forms["frm1"]["psqimg"].disabled =true;
    document.forms["frm1"]["psqimg"].value = ""
}

function clearLocal() {
    localStorage.clear();
}