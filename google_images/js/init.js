var canvas = document.querySelector("canvas");
var xml = new XMLData("xml/My_database.xml");
var local_storage_xml = new LocalStorageXML(xml);
xml.readXMLImages(1);


function ImagesLoaded(images) {
    var ipc = new ImageProcessingColor(canvas);
    for (var i = 0; i<images.length; i++) {
        var pc = ipc.perdominateColor(images[i]);
    }
}