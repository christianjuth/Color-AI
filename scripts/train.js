const brain = require("brain.js");
const beautify = require('js-beautify').js;
const fs = require("fs");


// helper
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16)/255,
        parseInt(result[2], 16)/255,
        parseInt(result[3], 16)/255
    ] : null;
}


const colorNameNetwork = new brain.NeuralNetwork();
const colorName = require('../data/colorName');

// convert to train data
let namedColorsData = Object.keys(colorName).map((key) => {
	let output = {};

	// parse colors from key value
	let colors = colorName[key].split('/');
	colors.forEach((c) => {
		// ! significes a negative match
		// !color returns 0
		// abc used to convert -1 to 1
		output[c.replace(/^\!/,'')] = Math.abs(c.indexOf('!'));
	});

	return {
		input: hexToRgb(key),
		output: output
	}
});

colorNameNetwork.train(namedColorsData);
let colorNameFile = beautify(JSON.stringify(colorNameNetwork.toJSON()));
fs.writeFileSync('./model/colorName.json', colorNameFile);





const darkLightNetwork = new brain.NeuralNetwork();
const darkLightColors = require('../data/darkLightColors');

// convert to train data
let darkLightData = Object.keys(darkLightColors).map((key) => {
	return {
		input: hexToRgb(key),
		output: [darkLightColors[key] === 'light' ? 0 : 1]
	}
});

darkLightNetwork.train(darkLightData);
let darkLightFile = beautify(JSON.stringify(darkLightNetwork.toJSON()));
fs.writeFileSync('./model/darkLight.json', darkLightFile);