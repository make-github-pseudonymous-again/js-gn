
var algo = require('aureooms-js-algo');

var check = function(label, n, edges){

	test('floyd #' + label, function(assert){

		var p, d, u, b;

		var Graph = gn.dense_graph_t();

		var amat = gn.amat_t();

		var floyd = gn.floyd_t();

		var priority_queue_t = function(pred){
			return algo.lazy_binomial_queue_t(pred, algo.opt_t);
		};

		var dijkstra = gn.dijkstra_t(priority_queue_t);

		var g = new Graph();
		var i = n;

		var v = new Array(i);

		while(i--) v[n-i-1] = g.vadd();

		for(var j = 0; j < edges.length; ++j){
			var e = edges[j];
			g.eadd(v[e[0]], v[e[1]], e[2]);
		}

		var dist = new Array(n);
		i = n;
		while(i--){
			p = gn.sqmat(1, n, v[i][0]);
			dist[i] = gn.sqmat(1, n, Infinity);
			u = gn.sqmat(1, n, false);
			b = gn.sqmat(1, n, false);
			dijkstra(g, n, v[i], p, dist[i], u, b);
			dist[i][i] = Infinity;
			g.eitr([i], function(_, _, w){
				dist[i][i] = Math.min(dist[i][i], w*2);
			});
		}


		d = gn.sqmat(2, n, Infinity);
		amat(g, n, d);
		floyd(n, d);

		deepEqual(d, dist, 'dist');

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