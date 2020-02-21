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
		lib.scoreSum += books[i];
	}

	lib.books = lib.books.sort((a, b) => books[b] - books[a]);

	const days = lib.books.length / lib.booksPerDay;

	lib.score = lib.scoreSum / (lib.signup + days);

	libs.push(lib);
}

libs.sort((l1, l2) => l2.score - l1.score);

/*
const seen = new Set();
let currentDay = 0;
const scannedLibs = [];

for (const lib of libs) {
	currentDay += lib.signup;
	const scanningDays = nDays - currentDay;
	const scanningBooks = scanningDays * lib.booksPerDay;

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

	if (lib.scannedBooks.length > 0) {
		currentDay -= lib.signup;
		scannedLibs.push(lib);
	}
}*/

let currentDay = 0;
const scannedLibs = [];

let l = libs.length;

while (l--) {
	const lib = libs.shift();

	if (lib.books.length === 0) {
		break;
	}

	currentDay += lib.signup;
	const scanningDays = nDays - currentDay;
	const scanningBooks = scanningDays * lib.booksPerDay;
	const seen = new Set(lib.books.slice(0, scanningBooks));

	for (let i = 0; i < libs.length; i++) {
		libs[i].books = libs[i].books.filter(bookI => !seen.has(bookI));
		libs[i].scoreSum = libs[i].books.reduce(
			(acc, bookI) => acc + books[bookI],
			0
		);

		const days = libs[i].books.length / libs[i].booksPerDay;

		libs[i].score = libs[i].scoreSum / (libs[i].signup + days);
	}

	libs.sort((l1, l2) => l2.score - l1.score);

	scannedLibs.push(lib);
}

let s = scannedLibs.length + '\n';

for (const lib of scannedLibs) {
	s += lib.i + ' ' + lib.books.length + '\n';
	s += lib.books.join(' ') + '\n';
}

console.log(s);
