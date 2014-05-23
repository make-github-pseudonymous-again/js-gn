

var check = function(label, n, x, E, _E){

	if (_E === undefined) _E = [];

	test('eventour #' + label, function(assert){

		var Graph = gn.sparse_graph_t();

		var amat = gn.amat_t();
		var eventour = gn.eventour_t();

		var g = new Graph();
		var i = n, j, e;

		var v = new Array(i);

		var free = gn.sqmat(2, n, 0);


		while(i--) v[n-i-1] = g.vadd(n-i-1);

		for(j = 0; j < E.length; ++j){
			e = E[j];
			g.eadd(v[e[0]], v[e[1]], e[2]);
			++free[e[0]][e[1]];
			++free[e[1]][e[0]];
		}



		for(j = 0; j < _E.length; ++j){
			e = _E[j];
			g.eadd(v[e[0]], v[e[1]], e[2]);
		}


		var d = gn.sqmat(2, n, Infinity);
		amat(g, n, d);

		var done = gn.sqmat(1, n, false);
		var tour = [];

		eventour(g, v, x, free, done, tour);

		deepEqual(tour.length, E.length, 'check length');
		deepEqual(free, gn.sqmat(2, n, 0), 'check free');


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
	0,
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
	8,
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
	8,
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
	0,
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
	0,
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
	'disconected 2 + 0-1 * 4 + 0-8 * 2',
	11,
	0,
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
		[0, 1, 7],
	],
	[
		[9, 10, 7],
		[10, 9, 8]
	]
],



];


for(var i = 0; i < I.length; ++i){
	check.apply(undefined, I[i]);
}