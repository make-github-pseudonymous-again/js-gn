import test from 'ava';

import * as gn from '../../../../../../src' ;

var check = function(label, n, E, m){

	test('dup #' + label, t => {

		var DGraph = gn.dense_graph_t();
		var SGraph = gn.sparse_graph_t();

		var amat = gn.amat_t();

		var floyd = gn.floyd_t();
		var sptreedfs = gn.sptreedfs_t();

		var g = new DGraph();
		var i = n;

		var v = new Array(i);

		while(i--) v[n-i-1] = g.vadd();

		for(var j = 0; j < E.length; ++j){
			var e = E[j];
			g.eadd(v[e[0]], v[e[1]], e[2]);
		}


		var d = gn.sqmat(2, n, Infinity);
		amat(g, n, d);
		floyd(n, d);


		var s = gn.sqmat(2, n, -1);
		sptreedfs(g, n, s, d);


		var h = new SGraph();
		var V = new Array(n);
		gn.d2s(g, h, V);

		var dup = gn.dup_t();

		dup(h, V, m, s, d, []);

		var count = [gn.sqmat(2, n, 0), gn.sqmat(2, n, 0)];

		g.vitr(function(u){
			g.eitr(u, function(_, v){
				++count[0][u[0]][v[0]];
			});
		});

		i = m.length;
		while(i--){
			const u = m[i][0], w = m[i][1];
			while(u !== w){
				const t = s[u][w];
				++count[0][u][t];
				++count[0][t][u];
				u = t;
			}
		}

		h.vitr(function(u){
			h.eitr(u, function(_, v){
				++count[1][u[0]][v[0]];
			});
		});

		t.deepEqual(count[1], count[0], 'check edge count');


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
	],
	[[0, 9], [5, 7], [4, 2]]
],

[
	'http://stackoverflow.com/questions/14159424/dijkstras-algorithm-why-is-it-needed-to-find-minimum-distance-element-in-the-q#1',
	4,
	[
		[0, 1, 6],
		[1, 2, 7],
		[2, 3, 2],
		[0, 3, 7]
	],
	[[0, 1], [1, 0]]
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
	],
	[[2, 1], [2, 7], [1, 2], [3, 2], [5, 2]]
]



];


for(var i = 0; i < I.length; ++i){
	check.apply(undefined, I[i]);
}
