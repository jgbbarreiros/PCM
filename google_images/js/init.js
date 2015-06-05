var canvas = document.querySelector("canvas");
var xml = new XMLData("xml/My_database.xml");
//var local_storage_xml = new LocalStorageXML(xml);
var info_images = xml.readXMLImages(10);
//var ipc = new ImageProcessingColor(canvas);
//for (var i = 0; i < info_images.length; i ++) {
//    info_images[i].hist = ipc.colorHist(info_images[i].img);
//}


function ImagesLoaded(images) {

    var ipc = new ImageProcessingColor(canvas);
    for (var i = 0; i<images.length; i++) {
        var pc = ipc.colorHist(images[i]);
    }
}

