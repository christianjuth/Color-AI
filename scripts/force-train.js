let child = require('child_process');
require('colors');


let passing = false;
let i = 0;
while (!passing) {
  	try {
		child.execSync('npm run train', {stdio: [0, 1, 2]});
		console.log(`Train Attempt ${i++}`);
		passing = true;
	} catch(err) {}
}