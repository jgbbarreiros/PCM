var keywords = ["beach", "birthday", "face", "indoor", "manmade/artificial", "manmade/manmade",
                "manmade/urban", "marriage", "nature", "no_people", "outdoor", "party", "people", "snow"];

function XMLData(file) {
    this.filename = file;

    this.loadXML = function () {
        var xmlhttp;
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", this.filename, false);
        xmlhttp.send();
        return xmlhttp.responseXML;
    };

    this.readXMLImages = function(num_imgs) {
        var imgs_all = [];
        var xml = this.loadXML();

        for (var i = 0; i < keywords.length; i ++) {
            var imgs_class = xml.getElementsByClassName(keywords[i]);
            var imgs_by_keyword = [];
            //document.write("<h1>" + keywords[i] + ":</h1>");
            for (var j = 0; j < num_imgs; j++) {
                var img = new Image();
                var path = imgs_class[j].getElementsByTagName("path")[0].childNodes[0].nodeValue;
                //imgs_by_keyword[j].img.onload = function() {
                //    imgs_loaded += 1;
                //    if (imgs_loaded == imgs_to_load) {
                //        allImgsLoaded();
                //    }
                //};
                img.src = path;
                imgs_by_keyword.push(new ImageInfo(img, path, keywords[i]));
                //document.write("<p>" + (j+1) + "->" + path + "</p>");
            }
            imgs_all.push(imgs_by_keyword);
        }
        return imgs_all;
    };
}

function ImageInfo(img, path, keyword) {
    this.img = img;
    this.path = path;
    this.keyword = keyword;
    this.hist = undefined;
}

//var loaded_images = 0;
//img.onload = function () {
//    loaded_images += 1;
//    images_arr.push(new ImageInfo(img, path));
//    if (num_images == loaded_images)
//        ImagesLoaded(images_arr);
//};

function LocalStorageXML() {
    //this.xml_d= xml_d;
    //this.cores = ["Azul", "Amarelo", "Vermelho", "Verde"];
    //this.localStorageName = "birthday";

    this.saveXMLLS = function (imgs_all){
        for (var i = 0; i < imgs_all.length; i ++) {
            var xmlRowString = '<images>';
            for (var j = 0; j < colors.length; j++) {
                xmlRowString += '<image class="' + colors[j].name + '">';
                //this.sortByColor(imgs_all[i], j);
                imgs_all[i].sort(
                    function (a, b) {
                        var keyA = a.hist[j];
                        var keyB = b.hist[j];
                        if (keyA < keyB) return 1;
                        if (keyA > keyB) return -1;
                        return 0;
                    }
                );
                for (var k = 0; k < imgs_all[i].length; k++) {
                    xmlRowString += '<path>"' + imgs_all[i][k].path + '"</path>';
                }
                xmlRowString += '</image>';
            }
            xmlRowString += '</images>';
            if (typeof(localStorage) == 'undefined')
                alert('Your browser does not support HTML5 localStorage. Try upgrading.');
            else {
                try {
                    localStorage.setItem(keywords[i], xmlRowString);
                }
                catch (e) {
                    alert("save failed!");
                    if (e == QUOTA_EXCEEDED_ERR)
                        alert('Quota exceeded!');
                }
            }
        }
    };

    this.readXMLLS = function () {
        for (var i = 0; i < keywords.length; i ++) {
            document.write("<h1>" + keywords[i] + "</h1>");
            var localStorageRow = localStorage.getItem(keywords[i]);

            if (window.DOMParser) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(localStorageRow, "text/xml");
            }
            for (var j = 0; j < colors.length; j++) {
                var imgs_color = xmlDoc.getElementsByClassName(colors[j].name)[0];
                document.write("<h2>" + colors[j].name + "</h2>");
                for (var k = 0; k < imgs_color.childNodes.length; k++) {
                    document.write("<p>" + imgs_color.childNodes[k].childNodes[0].nodeValue + "</p>");
                }
            }
        }

    };

}