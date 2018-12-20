let brain = require("brain.js");
let hexToRgb = require('./hexToRgb');
let beautify = require('js-beautify').js;
let fs = require("fs");



// -------------------------------
// DARK LIGHT NETWORK
// -------------------------------
let darkLightNet = new brain.NeuralNetwork();
let darkLightData = require('../data/darkLightColors');

// convert to train data
darkLightData = Object.keys(darkLightData).map((hex) => {
	return {
		input: hexToRgb(hex),
		output: [darkLightData[hex] === 'light' ? 0 : 1]
	}
});

darkLightNet.train(darkLightData);
let darkLightModel = beautify(JSON.stringify(darkLightNet.toJSON()));
fs.writeFileSync('./model/darkLight.json', darkLightModel);




// -------------------------------
// NAME COLOR NETWORK
// -------------------------------
let colorNameNet = new brain.NeuralNetwork();
let colorNameData = require('../data/colorName');

// convert to train data
colorNameData = Object.keys(colorNameData).map((hex) => {
	let output = {};

	// parse colors from key value
	let colors = colorNameData[hex].split('/');
	colors.forEach((c) => {
		// ! significes a negative match
		// !color returns 0
		// abc used to convert -1 to 1
		output[c.replace(/^\!/,'')] = Math.abs(c.indexOf('!'));
	});

	return {
		input: hexToRgb(hex),
		output: output
	}
});

colorNameNet.train(colorNameData);
let colorNameModel = beautify(JSON.stringify(colorNameNet.toJSON()));
fs.writeFileSync('./model/colorName.json', colorNameModel);





