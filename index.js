var jimp = require('jimp');
var path = require('path');

exports.imageCombiner = function (image1FileName, image2FileName, outFileName, callback) {
	jimp.read(image1FileName).then(function (image1) {
		jimp.read(image2FileName).then(function (image2) {
			image2.resize(image1.bitmap.width, image1.bitmap.height);

			new jimp(image1.bitmap.width, image1.bitmap.height, function (err, image3) {
				image3.scan(0, 0, image1.bitmap.width, image1.bitmap.height, function (x, y, idx) {
					image3.bitmap.data[idx] = (image1.bitmap.data[idx] + image2.bitmap.data[idx]) / 2;
					image3.bitmap.data[idx + 1] = (image1.bitmap.data[idx + 1] + image2.bitmap.data[idx + 1]) / 2;
					image3.bitmap.data[idx + 2] = (image1.bitmap.data[idx + 2] + image2.bitmap.data[idx + 2]) / 2;
					image3.bitmap.data[idx + 3] = image1.bitmap.data[idx + 3];
				}).write(outFileName, function (err) {
					callback(err, image3);
				});
			});
		}).catch(function (err1) {
			callback(err1, null);
		});
	}).catch(function (err2) {
		callback(err2, null);
	});
};
