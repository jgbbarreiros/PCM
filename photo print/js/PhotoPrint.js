function PhotoPrint(canvas) {

    this.canvas = canvas;
    this.color = '#ff0000';
    this.myImage = undefined;
    this.myText = undefined;
    this.fillBucket = false;

    this.save = function() {
        try {
            window.open(this.canvas.canvas.toDataURL("imgs/png"));
        } catch(err) {
            alert("You need to change browsers OR upload the file to a server.");
        }
    };

    this.remove = function() {
        if (!canvas.remove(canvas.selected)) {
            alert('Nothing selected, please select something!');
        } else if (canvas.figures.length > 0){
            canvas.selected = canvas.figures[canvas.figures.length-1];
        }
    };

    this.setText = function() {
        this.myText = prompt('Please enter your text', 'text');
        if (this.myText != null) {
            this.canvas.canvas.style.cursor = "pointer";
            this.canvas.canvas.removeEventListener('mousedown', insert, false);
            this.canvas.canvas.removeEventListener('mousedown', drag, false);
            this.canvas.canvas.removeEventListener('mousedown', insertImage, false);
            this.canvas.canvas.addEventListener('mousedown', insertText, false);
        }
    };

    this.setColor = function() {
        this.color = document.getElementById('color').value;
    };

    this.setFillBucket = function() {
        this.fillBucket = document.getElementById('fillBucket').checked;
    };

    this.setImage = function() {
        this.myImage = new Image();
        var fileURL = window.URL.createObjectURL(document.getElementById('img').files[0]);
        this.myImage.src = fileURL;
        this.myImage.onload = function () {
            fp.canvas.canvas.style.cursor = "pointer";
            fp.canvas.canvas.removeEventListener('mousedown', insert, false);
            fp.canvas.canvas.removeEventListener('mousedown', drag, false);
            fp.canvas.canvas.removeEventListener('mousedown', insertText, false);
            fp.canvas.canvas.addEventListener('mousedown', insertImage, false);
        };

    };
}