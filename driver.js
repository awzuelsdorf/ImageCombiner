const imageCombiner = require(".");
const assert = require('assert');
const fs = require('fs');
const { argv } = require('yargs').option("profile", 
        {
            describe: "Path to profile picture.",
            demandOption: "Please provide a profile picture path."
	}).option("overlay", {
            describe: "Path to overlay picture.",
            demandOption: "Please provide an overlay picture path."
	}).option("output",
        {
            describe: "Path to output picture.",
            demandOption: "Please provide an output picture path."
	}).option("weight", {
            describe: "Weight of overlay picture.",
	});

var profilePicturePath = argv.profile;
var overlayPath = argv.overlay;
var outputPicturePath = argv.output;
var overlayWeight = argv.weight;

if (overlayWeight == null || overlayWeight < 0) {
    console.warn("Invalid overlay weight \"" + overlayWeight + "\" received. Overlay weight must be at least 0. Using default overlay weight of 1."); 
    overlayWeight = 1;
}

imageCombiner.imageCombiner(profilePicturePath, overlayPath, outputPicturePath, overlayWeight, function (err, image) {
        assert.equal(err, null);
        assert.equal(fs.lstatSync(outputPicturePath).isFile(), true);
	console.log("Finished processing.");
    }
);
