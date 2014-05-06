
var check = function(label, n, s, edges, prev, dist){

test('dijkstra #' + label, function(assert){

	var Graph = gn.dense_graph_t();
	var dijkstra = gn.dijkstra_t();

	var g = new Graph();
	var i = n;

	var v = new Array(i);

	while(i--) v[n-i-1] = g.vadd();

	for(var j = 0; j < edges.length; ++j){
		var e = edges[j];
		g.eadd(v[e[0]], v[e[1]], e[2]);		
	}

	var sp = dijkstra(g, n, v[s]);

	deepEqual(prev, sp[0], 'prev');
	deepEqual(dist, sp[1], 'dist');

});

};


var I = [
[
	'1',
	10,
	9,
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
	[1, 3, 9, 2, 3, 4, 1, 4, 9, 9],
	[10, 9, 6, 7, 11, 14, 14, 17, Infinity, Infinity]
],

[
	'http://stackoverflow.com/questions/14159424/dijkstras-algorithm-why-is-it-needed-to-find-minimum-distance-element-in-the-q#1',
	4,
	0,
	[
		[0, 1, 6],
		[1, 2, 7],
		[2, 3, 2],
		[0, 3, 7]
	],
	[0, 0, 3, 0],
	[Infinity, 6, 9, 7]
],

[
	'http://stackoverflow.com/questions/14159424/dijkstras-algorithm-why-is-it-needed-to-find-minimum-distance-element-in-the-q#2',
	9,
	2,
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
	[2, 2, 2, 2, 3, 3, 2, 8, 3],
	[Infinity, 7, Infinity, 2, 3, 4, Infinity, 6, 4]
]



]


for(var i = 0; i < I.length; ++i){
	check.apply(undefined, I[i]);
}