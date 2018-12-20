let brain = require("brain.js");
let hexToRgb = require('./hexToRgb');
let colors = require('colors');


let exit = 0;
// -------------------------------
// NAME COLOR NETWORK
// -------------------------------
let colorNameNet = new brain.NeuralNetwork();
let colorNameModel = require('../model/colorName.json');
colorNameNet.fromJSON(colorNameModel);

let testData = require('../data/colorNameTest.json');

Object.keys(testData).forEach((hex) => {

	let rgb = hexToRgb(hex);
	let match = colorNameNet.run(rgb);

	// sort results
	match = Object.keys(match).sort((a, b) => {
		return match[a] > match[b] ? -1 : 1;
	})[0];

	// assert
	if(match === testData[hex]){
		console.log(`${hex} == ${testData[hex]}`.green);
	} else{
		exit = 1;
		console.log(`${hex} == ${testData[hex]}`.red);
	}
});
console.log('');
process.exit(exit)