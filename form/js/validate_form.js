/**
 * Created by Joao on 5/8/2015.
 */

function validatefrm1()  {
    var d = new Date();
    var xmlRowString = '<Questionario id="' + d.getTime() + '">';

    var Rq= document.forms["frm1"]["age"].value;
    xmlRowString += '<q id="age">' + Rq + '</q>';

    var Rq= document.forms["frm1"]["sex"].value;
    xmlRowString += '<q id="sex">' + Rq + '</q>';

    xmlRowString += "</Questionario>";
    window.localStorage.setItem(d.getTime().toString(), xmlRowString);
    return true;
}

function getdataForm() {
    var todo_index = window.localStorage.length;
    for (var i = 0; i < todo_index; i++) {
        var localStorageRow=window.localStorage.getItem(window.localStorage.key(i));
        if (window.DOMParser) {
            var parser=new DOMParser();
            var xmlDoc=parser.parseFromString(localStorageRow,"text/xml");
        }
    }
    var x = xmlDoc.getElementsByTagName("q");
    document.write("<!DOCTYPE html>");
    document.write("<html>");
    document.write("<head lang=\"en\">");
    document.write("<meta charset=\"UTF-8\">");
    document.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
    document.write("<title>Google Images Form</title>");
    document.write("<title>Google Images Form</title>");
    document.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"css/gi_stylesheet.css\">");
    document.write("</head>");
    document.write("<body>");
    document.write('<section class="form-header">');
    document.write('<div class="container">');
    document.write("<p> Age: " + x[0].childNodes[0].nodeValue + "</p>");
    document.write("<p> Gender: " + x[1].childNodes[0].nodeValue + "</p>");
    document.write('</div>');
    document.write('</section>');
    document.write("</body>");
    document.write("</html>");

}


function validatefrm2()  {
    //var valid = false;
    //var elems = document.getElementById("myForm").elements;
    //return valid;
}

function validatefrm3()  {
    //var valid = false;
    //var elems = document.getElementById("myForm").elements;
    //return valid;
}

function firstOption() {
    var fop = document.forms["frm1"]["Column 1"].value;
    var sop = document.forms["frm1"]["Column 2"].value;
    var top = document.forms["frm1"]["Column 3"].value;
    if (fop==sop) {
        document.getElementById("s"+sop).checked = false;
    }
    if (fop==top) {
        document.getElementById("t"+top).checked = false;
    }
}


function secondOption() {
    var fop = document.forms["frm1"]["Column 1"].value;
    var sop = document.forms["frm1"]["Column 2"].value;
    var top = document.forms["frm1"]["Column 3"].value;
    if (sop==fop) {
        document.getElementById("f"+fop).checked = false;
    }
    if (sop==top) {
        document.getElementById("t"+top).checked = false;
    }
}

function thirdOption() {
    var fop = document.forms["frm1"]["Column 1"].value;
    var sop = document.forms["frm1"]["Column 2"].value;
    var top = document.forms["frm1"]["Column 3"].value;
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