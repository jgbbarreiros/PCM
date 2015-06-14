var canvas = document.querySelector("canvas");
var ipc = new ImageProcessingColor(canvas, colors);
var xml_data = new XMLData("xml/My_database.xml");
var local_storage_xml = new LocalStorageXML();
var num_imgs_by_keyword = 2;
var imgs_all = xml_data.readXMLImages(num_imgs_by_keyword);
var imgs_to_load = imgs_all.length * num_imgs_by_keyword;
var imgs_loaded = 0;
for (var i = 0; i < imgs_all.length; i ++) {
    var imgs_by_keyword = imgs_all[i];
    for (var j = 0; j < imgs_by_keyword.length; j ++) {
        imgs_by_keyword[j].img.onload = function() {
            imgs_loaded += 1;
            if (imgs_loaded == imgs_to_load) {
                allImgsLoaded();
            }
        };
    }
}


allImgsLoaded = function() {
    for (var i = 0; i < imgs_all.length; i ++) {
        var imgs_by_keyword = imgs_all[i];
        //document.write("<h1>" + keywords[i] + ":</h1>");
        for (var j = 0; j < imgs_by_keyword.length; j++) {
            imgs_by_keyword[j].hist = ipc.colorHist(imgs_by_keyword[j].img);
            //document.write("<p>" + imgs_by_keyword[j].hist + "->" + imgs_by_keyword[j].path + "</p>");
        }
    }
    local_storage_xml.saveXMLLS(imgs_all);
    local_storage_xml.readXMLLS();
};

