let child = require('child_process');
require('colors');


let passing = false;
let i = 0;
while (!passing) {
	i++;
  	try {
  		console.log(`Train Attempt ${i}`.underline);
		child.execSync('npm run train', {stdio: [0, 1, 2]});
		passing = true;
	} catch(err) {}
}