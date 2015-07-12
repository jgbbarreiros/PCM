function main() {
	var canvas = document.querySelector("canvas");

	var Img_Pro = new Image_Processing_Moments(canvas);
	var img1 = new Image();
	var img2 = new Image();

	img1.src = "images/0003.jpg";
	img2.src = "images/0008.jpg";

	var numImages = 2;
	var numLoaded = 0;

	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			Img_Pro.init(img1);
			Img_Pro.compare(img2);
		}
	}

	img1.onload = function () {
		imageLoaded();
	};

	img2.onload = function () {
		imageLoaded();
	};
}


function Image_Processing_Moments(canvas) {
	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");
	this.img = [];
	this.c_moments = [];

	this.init = function (img1) {
		this.img = img1;
		this.ctx.drawImage(img1, 0, 0);
		this.c_moments = this.ColorMoments(this.img);
	};

	this.compare = function (img2) {
		this.ctx.drawImage(img2, 0, 0);
		var Descritor = this.ColorMoments(img2);

		this.ctx.drawImage(this.img, 300, 0);
		var diff = this.Manhattan_distance(this.c_moments, Descritor);
		this.ctx.fillStyle = "rgb(255,0,0)";
		this.ctx.fillText("Diff =  " + diff, 200, 200);
	};

	this.ColorMoments = function (img) {
		var vector_descriptor = Array.apply(null, Array(54)).map(Number.prototype.valueOf,0);
		this.ctx.drawImage(img, 0, 0, img.width, img.height);

		var block_width = Math.floor(img.width/3);
		var block_height = Math.floor(img.height/3);
		var n = block_width * block_height;
		var block_num = 0;

		for (var y = 0; y<3; y++ ) {
			for (var x = 0; x<3; x++) {
				var block = this.ctx.getImageData(block_width * x, block_height * y, block_width, block_height);

				var mh = 0;
				var ms = 0;
				var mv = 0;
				var vh = 0;
				var vs = 0;
				var vv = 0;

				var hsv_arr = [];

				for (var i = 0; i<block.data.length; i+=4) { // 35
					var r = block.data[i];
					var g = block.data[i+1];
					var b = block.data[i+2];
					var c = this.rgbToHsv(r,g,b);
					hsv_arr.push(c);
					mh += c[0];
					ms += c[1];
					mv += c[2];
				}

				mh /= n;
				ms /= n;
				mv /= n;

				for (var i = 0; i < hsv_arr.length; i++) {
					var c = hsv_arr[i];
					vh += Math.pow(c[0] - mh, 2);
					vs += Math.pow(c[1] - ms, 2);
					vv += Math.pow(c[2] - mv, 2);
				}

				vh /= n;
				vs /= n;
				vv /= n;

				vector_descriptor[block_num * 6]     = mh;
				vector_descriptor[block_num * 6 + 1] = ms;
				vector_descriptor[block_num * 6 + 2] = mv;
				vector_descriptor[block_num * 6 + 3] = vh;
				vector_descriptor[block_num * 6 + 4] = vs;
				vector_descriptor[block_num * 6 + 5] = vv;

				block_num += 1;
			}
		}

		// n = num total de pixels por bloco
		// h/n, s/n, v/n, sigma h, sigma s, sigma v

		return vector_descriptor

	};


	this.rgbToHsv = function (r, g, b) {
		r = r / 255;
		g = g / 255;
		b = b / 255;

		var max = Math.max(r, g, b);
		var min = Math.min(r, g, b);
		var h, s, v = max;

		var dif = max - min;
		s = max == 0 ? 0 : dif / max;

		if (max == min) {
			h = 0;
		} else {
			switch (max) {
				case r:
					h = (g - b) / dif + (g < b ? 6 : 0);
					break;
				case g:
					h = (b - r) / dif + 2;
					break;
				case b:
					h = (r - g) / dif + 4;
					break;
			}
			h /= 6;
		}
		return [h, s, v];
	};

	this.Manhattan_distance = function (vDesc1, vDesc2) {
		var manhattan = 0;
		for (var i = 0; i < vDesc1.length; i++) {
			manhattan += Math.abs(vDesc1[i] - vDesc2[i]);
		}
		manhattan /= 54;
		return manhattan;
	};
}
