
var one, algo, functools;

algo = require( "aureooms-js-algo" );
functools = require( "aureooms-js-functools" );

one = function ( label, n, s, edges, prev, dist ) {

	test( "dijkstra #" + label, function () {

		var Graph, PriorityQueue;
		var g, i, v, e, j, p, d, used, ref, left, predicate;

		PriorityQueue = algo.__BinomialHeap__( algo.BinomialTreeWithParent );

		Graph = gn.dense_graph_t();

		g = new Graph();
		i = n;

		v = new Array(i);

		while ( i-- ) {
			v[n-i-1] = g.vadd();
		}

		for ( j = 0 ; j < edges.length ; ++j ){
			e = edges[j];
			g.eadd( v[e[0]], v[e[1]], e[2] );
		}

		p = gn.sqmat( 1, n, v[s][0] );
		d = gn.sqmat( 1, n, Infinity );
		used = gn.sqmat( 1, n, false );
		ref = gn.sqmat( 1, n, null );

		predicate = function ( u, v ) {
			return d[u[0]] - d[v[0]];
		};

		left = new PriorityQueue( predicate );

		gn.dijkstra( g, n, v[s], p, d, used, ref, left );

		deepEqual( p, prev, "prev" );
		deepEqual( d, dist, "dist" );

	});

};


[

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
	[10, 9, 6, 7, 11, 14, 14, 17, Infinity, 0]
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
	[0, 6, 9, 7]
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
	[Infinity, 7, 0, 2, 3, 4, Infinity, 6, 4]
]



].forEach( functools.partial( functools.star, null, [one] ) );
