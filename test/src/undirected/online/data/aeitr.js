import test from 'ava';

import * as gn from '../../../../../src' ;

var check = function(label, n, edges){

test( `aeitr ${label}`, t => {

		var DGraph = gn.dense_graph_t();
		var SGraph = gn.sparse_graph_t();
		var index = gn.index_t();
		var copy = gn.copy_t();



		var G = new index(new SGraph());
		var H = new DGraph();

		var i = n, e, seq;

		var v = new Array(i);


		while(i--) v[n-i-1] = G.vadd();

		for(var j = 0; j < edges.length; ++j){
			e = edges[j];
			G.eadd(v[e[0]], v[e[1]], e[2]);
		}

		copy(G, H);



		var push_actual = function(){
			seq[0].push(Array.prototype.slice.call(arguments));
			return true;
		};

		var push_expected = function(){
			seq[1].push(Array.prototype.slice.call(arguments));
		};

		e = undefined;

		seq = [[],[]];

		while (e !== G.aeend()) {
			e = G.aeitr(push_actual, e);
		}

		G.aeitr(push_expected);


		t.deepEqual(seq[0], seq[1], 'sparse aeitr consistent');


		e = undefined;

		seq = [[],[]];

		while (e !== H.aeend()) {
			e = H.aeitr(push_actual, e);
		}

		H.aeitr(push_expected);


		t.deepEqual(seq[0], seq[1], 'dense aeitr consistent');


	});

};


var I = [
[
	'1',
	10,
	[
		[0, 1, 1],
		[3, 1, 2],
		[5, 4, 3],
		[3, 4, 4],
		[6, 1, 5],
		[2, 3, 1],
		[9, 2, 6],
		[4, 7, 6]
	]
],

[
	'http://stackoverflow.com/questions/14159424/dijkstras-algorithm-why-is-it-needed-to-find-minimum-distance-element-in-the-q#1',
	4,
	[
		[0, 1, 6],
		[1, 2, 7],
		[2, 3, 2],
		[0, 3, 7]
	]
],

[
	'http://stackoverflow.com/questions/14159424/dijkstras-algorithm-why-is-it-needed-to-find-minimum-distance-element-in-the-q#2',
	9,
	[
		[1, 5, 6],
		[5, 3, 2],
		[1, 2, 7],
		[2, 3, 2],
		[1, 4, 7],
		[4, 3, 1],
		[1, 7, 3],
		[7, 8, 2],
		[8, 3, 2]
	]
]



];


for(var i = 0; i < I.length; ++i){
	check.apply(undefined, I[i]);
}
