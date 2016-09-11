var imageCombiner = require("../index.js");
var path = require('path');
var assert = require('assert');
var fs = require('fs');

var profilePicture = path.join(path.join(__dirname, "../images"),
								"andrew zuelsdorf.jpg");
var usflag = path.join(path.join(__dirname, "../images"),
								"usflag.jpeg");

describe('imageCombiner', function() {
	describe('#imageCombiner', function () {
		it('Takes a profile picture and drapes the US flag overtop of it' +
			' before outputting the image to "andrew zuelsdorf.jpeg',
			function (done) {
				this.timeout(30000); //Timeout after 30 seconds. Default
				//timeout of two seconds is not usually enough, and cannot
				//generally make assumptions about how long I/O will take.
				imageCombiner.imageCombiner(profilePicture, usflag,
					"andrew zuelsdorf.jpeg", function (err, image) {
						assert.equal(err, null);
						assert.equal(fs.lstatSync("andrew zuelsdorf.jpeg").isFile(), true);
						done();
					}
				);
			}
		);
	});
});
