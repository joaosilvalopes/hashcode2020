const stdin = require('fs')
	.readFileSync(0)
	.toString()
	.split(/\s+/)
	[Symbol.iterator]();

let nBooks = stdin.next().value;
let nLibs = stdin.next().value;
const nDays = stdin.next().value;

const books = [];

while (nBooks--) {
	books.push(+stdin.next().value);
}

let libs = [];

while (nLibs--) {
	let nBooks = stdin.next().value;
	const lib = {
		signup: stdin.next().value,
		booksPerDay: stdin.next().value,
		books: [],
		scoreSum: 0,
		i: libs.length
	};

	while (nBooks--) {
		const i = stdin.next().value;

		lib.books.push(i);
		lib.scoreSum += +books[i];
	}

	lib.books = lib.books.sort((a, b) => books[b] - books[a]);

	lib.score = lib.scoreSum / lib.signup;

	libs.push(lib);
}

libs = libs.sort((l1, l2) => l2.score - l1.score);

let s = libs.length + '\n';

for (const lib of libs) {
	s += lib.i + ' ' + lib.books.length + '\n';
	s += lib.books.join(' ') + '\n';
}

console.log(s);
