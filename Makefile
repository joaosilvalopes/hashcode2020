in = $p

cpp:
	g++ -std=c++11 -O2 -Wall $p.cpp -o $p.out
	./$p.out < $(in).txt

js:
	node $p.js < $(in).txt
