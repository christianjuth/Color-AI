const darkLight = new brain.NeuralNetwork();
darkLight.train([
	{input: [1, 1, 1], output: [0]},
	{input: [0, 1, 1], output: [0]},
	{input: [0, 0.7, 1], output: [1]},
	{input: [0.45, 0.45, 0.45], output: [1]},
	{input: [1, 0.9, 0.2], output: [0]},
	{input: [0, 0, 0], output: [1]}
]);



// brain
const network = new brain.NeuralNetwork();

// let json = {}
// network.fromJSON(json);

let data = {
	// white
	'ffffff': 'white',
	'f8ffee': 'white',
	'edfff5': 'white',
	'fff5fa': 'white',
	'ebebeb': 'white',

	// black
	'000000': 'black/!green',
	'030303': 'black',

	// gray
	'424242': 'gray/!black/!blue',
	'5e5e5e': '!blue',
	'919191': 'gray',
	'8e8d8f': 'gray/!white/!purple',
	'c1c0c2': 'gray/!white/!purple',
	'a9a9a9': '!purple',

	// RED
	'ff0000': 'red',
	'c80000': 'red',

	// orange
	'ffac00': 'orange',
	'feaa59': 'orange',
	'ff8300': 'orange',

	// tan
	'f2b998': 'tan',
	'f9bb7f': 'tan',

	// brown
	'975401': 'brown',
	'5f3907': 'brown',
	'893900': 'brown',
	'2f0003': 'brown',
	'68291f': 'brown',
	'750000': 'brown',
	'683830': 'brown',

	// yellow
	'eeff04': 'yellow',
	'ffcc66': 'yellow',
	'f2f99d': 'yellow',

	// GREEN
	'11ff00': 'green',
	'60ff74': 'green',
	'3a4909': 'green',
	'0e2e0f': 'green',
	'039045': 'green',
	'8cff9e': 'green',
	'848d5a': 'green',

	// light blue
	'00ffea': 'blue',
	'73fdff': 'blue',
	'94f7f8': 'blue',

	// BLUE
	'0024be': 'blue',
	'004084': 'blue',
	'0d2b40': 'blue',
	'2409ff': 'blue',
	'0600d3': 'blue',

	// purple
	'737bff': 'purple',
	'db40ff': 'purple/!gray/!pink',
	'460e32': 'purple/!gray/!blue',
	'4a0036': 'purple',
	'b3c0ff': 'purple',
	'd096ff': 'purple',
	'b14cfe': 'purple',

	// pink
	'ff8ff1': 'pink',
	'ffb4c3': 'pink',
	'd07876': 'pink',
	'ff00b3': 'pink',
	'ff7e79': 'pink'
}

// helper
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16)/255,
        parseInt(result[2], 16)/255,
        parseInt(result[3], 16)/255
    ] : null;
}

// convert to train data
let trainData = Object.keys(data).map((key) => {
	let output = {};

	// parse colors from key value
	let colors = data[key].split('/');
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

network.train(trainData);




$(document).ready(() => {

	// foward click
	$("p").click(() => {
		$("input").click();
	});

	// on select color
	$("input").change(function() {
		let value = $(this).val();

		$("body").css({background: value});
		$("#value").text(value);
		value = hexToRgb(value);

		let isLight = darkLight.run(value);
		if(isLight > 0.5){
			$("p").css({color: '#fff'});
		} else{
			$("p").css({color: '#000'});
		}


		let out = network.run(value);
		console.log(out);
		colors = Object.keys(out).sort((a, b) => out[a] > out[b] ? -1 : 1);
		$("#color").text(colors[0]);

		// // close matches return two colors
		// if(out[colors[0]] - out[colors[1]] < 0.1){
		// 	$("#color").text(colors[0]+'/'+colors[1]);
		// } 
	});
});