

var check = function(label, n, E){

	test('eventour #' + label, function(assert){

		var Graph = gn.sparse_graph_t();

		var amat = gn.amat_t();
		var eventour = gn.eventour_t();

		var g = new Graph();
		var i = n;

		var v = new Array(i);

		var free = gn.sqmat(2, n, 0);


		while(i--) v[n-i-1] = g.vadd(n-i-1);

		for(var j = 0; j < E.length; ++j){
			var e = E[j];
			g.eadd(v[e[0]], v[e[1]], e[2]);
			++free[e[0]][e[1]];
			++free[e[1]][e[0]];
		}


		var d = gn.sqmat(2, n, Infinity);
		amat(g, n, d);

		var tour = [];

		eventour(g, v, E.length, free, tour);

		deepEqual(tour.length, E.length, 'check length');


		i = tour.length;
		if(i){
			tour.push(tour[0]);
			while(i--) ok(d[tour[i]][tour[i+1]] < Infinity, 'check path component ' + i);
		}


		

	});

};


var I = [

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
],

[
	'2 + 0-1 * 2 + 0-8 * 2',
	9,
	[
		[0, 1, 6],
		[0, 1, 7],
		[0, 8, 2],
		[0, 8, 4],
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
],

[
	'2 + 0-1 * 2',
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
		[8, 3, 2],
		[0, 1, 6],
		[0, 1, 7]
	]
],

[
	'2 + 0-1 * 4 + 0-8 * 2',
	9,
	[
		[0, 1, 6],
		[0, 1, 7],
		[1, 5, 6],
		[5, 3, 2],
		[0, 8, 2],
		[1, 2, 7],
		[2, 3, 2],
		[1, 4, 7],
		[4, 3, 1],
		[1, 7, 3],
		[7, 8, 2],
		[8, 3, 2],
		[0, 1, 6],
		[0, 8, 4],
		[0, 1, 7]
	]
],

[
	'empty',
	0,
	[]
]



];


for(var i = 0; i < I.length; ++i){
	check.apply(undefined, I[i]);
}