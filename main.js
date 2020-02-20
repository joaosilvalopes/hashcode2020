const stdin = require('fs')
	.readFileSync(0)
	.toString()
	.split(/\s+/)
	[Symbol.iterator]();

let n = stdin.next().value;

while (n--) {}

console.log(n);
