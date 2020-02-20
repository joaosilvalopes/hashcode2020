in = $p
out = $(in)

LETTERS = a b c d e f

cpp:
	g++ -std=c++11 -O2 -Wall $p.cpp -o $p.out
	./$p.out < $(in).txt

js:
	node $p.js < $(in).txt | tee ./$(out).out.txt

alljs:
	$(foreach var,$(LETTERS),make js p=main in=$(var);)
