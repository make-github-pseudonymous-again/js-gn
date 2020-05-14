import test from 'ava';

import * as gn from '../../../../../../src' ;

function macro (t, label, n, edges){

	var DGraph = gn.dense_graph_t();
	var SGraph = gn.sparse_graph_t();
	var index = gn.index_t();
	var amat = gn.amat_t();
	var copy = gn.copy_t();


	var G = new index(new SGraph());
	var H = new DGraph();

	var i = n;

	var v = new Array(i);


	while(i--) v[n-i-1] = G.vadd();

	for(var j = 0; j < edges.length; ++j){
		var e = edges[j];
		G.eadd(v[e[0]], v[e[1]], e[2]);
	}

	copy(G, H);


	var dist_G = gn.sqmat(2, n);
	var dist_H = gn.sqmat(2, n);

	amat(G, n, dist_G);
	amat(H, n, dist_H);

	t.deepEqual(dist_G, dist_H, 'H === copy(G)');





	G = new DGraph();
	H = new index(new SGraph());

	i = n;

	while(i--) v[n-i-1] = G.vadd();

	for(var j = 0; j < edges.length; ++j){
		var e = edges[j];
		G.eadd(v[e[0]], v[e[1]], e[2]);
	}

	copy(G, H);


	dist_G = gn.sqmat(2, n);
	dist_H = gn.sqmat(2, n);

	amat(G, n, dist_G);
	amat(H, n, dist_H);

	t.deepEqual(dist_G, dist_H, 'H === copy(G)');

}

macro.title = (_, label, n, edges) => `copy <${label}>` ;


const I = [
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


for (const i of I) test(macro, ...i) ;
