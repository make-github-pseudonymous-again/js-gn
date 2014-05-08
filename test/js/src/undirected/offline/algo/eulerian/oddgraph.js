

var check = function(label, n, E){

	test('oddgraph #' + label, function(assert){

		var Graph = gn.dense_graph_t();

		var amat = gn.amat_t();

		var floyd = gn.floyd_t();

		var oddgraph = gn.oddgraph_t();

		var g = new Graph(), h = new Graph();
		var i = n;

		var v = new Array(i);

		var degree = gn.sqmat(1, i, 0);

		while(i--) v[n-i-1] = g.vadd();

		for(var j = 0; j < E.length; ++j){
			var e = E[j];
			g.eadd(v[e[0]], v[e[1]], e[2]);
			++degree[e[0]];
			++degree[e[1]];
		}

		i = n;
		var einside = new Array(i);
		var ainside = new Array(i);
		while(i--){
			einside[i] = degree[i] % 2;
			ainside[i] = 0;
		}


		var d = gn.sqmat(2, n, Infinity);
		amat(g, n, d);
		floyd(n, d);


		oddgraph(g, d, h);

		h.vitr(function(v){
			ok(degree[v[1][0]] % 2, v[1][0] + ' odd');
			ainside[v[1][0]] = 1;
			if(degree[v[1][0]] % 2){
				h.eitr(v, function(e){
					deepEqual(e[1], d[v[1][0]][e[0][1][0]], 'd['+v[1][0]+']['+e[0][1][0]+'] check');
				});
			}
		});

		deepEqual(ainside, einside, 'count all check')

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