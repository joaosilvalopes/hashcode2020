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

	lib.score = (lib.scoreSum * lib.booksPerDay) / lib.signup;

	libs.push(lib);
}

libs = libs.sort((l1, l2) => l2.score - l1.score);

const seen = new Set();
let currentDay = 0;
const scannedLibs = [];

for (const lib of libs) {
	currentDay += lib.signup;
	let scanningDays = nDays - currentDay;
	let scanningBooks = scanningDays * lib.booksPerDay;

	lib.scannedBooks = [];

	for (const book of lib.books) {
		if (lib.scannedBooks.length === scanningBooks) {
			break;
		}

		if (!seen.has(book)) {
			lib.scannedBooks.push(book);
			seen.add(book);
		}
	}

	lib.scannedBooks.length > 0 && scannedLibs.push(lib);
}

let s = scannedLibs.length + '\n';

for (const lib of scannedLibs) {
	s += lib.i + ' ' + lib.scannedBooks.length + '\n';
	s += lib.scannedBooks.join(' ') + '\n';
}

console.log(s);
