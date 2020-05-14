import test from 'ava';


import binomialheap from "@aureooms/js-binomial-heap" ;
import functools from "@aureooms/js-functools" ;

function one ( label, n, edges ) {

test( "sptreedfs #" + label, t => {

		var g, i, v, e, j, prev, dist, used, ref, left, predicate;

		var next, successors, d;

		var Graph, PriorityQueue, amat, floyd, sptreedfs;

		PriorityQueue = binomialheap.BinomialHeap( binomialheap.BinomialTreeWithParent );

		Graph = gn.dense_graph_t();

		amat = gn.amat_t();

		floyd = gn.floyd_t();
		sptreedfs = gn.sptreedfs_t();

		g = new Graph();
		i = n;

		v = new Array( i );

		while ( i-- ) {
			v[n-i-1] = g.vadd();
		}

		for ( j = 0 ; j < edges.length ; ++j ){
			e = edges[j];
			g.eadd( v[e[0]], v[e[1]], e[2] );
		}

		next = new Array( n );

		i = n;
		while ( i-- ) {
			next[i] = new Array( n );
		}

		i = n;
		while ( i-- ) {
			prev = gn.sqmat( 1, n, v[i][0] );
			dist = gn.sqmat( 1, n, Infinity );
			used = gn.sqmat( 1, n, false );
			ref = gn.sqmat( 1, n, null );

			predicate = function ( u, v ) {
				return dist[u[0]] - dist[v[0]];
			};

			left = new PriorityQueue( predicate );

			gn.dijkstra( g, n, v[i], prev, dist, used, ref, left );

			// here we set next[j][i] to -1 or prev[j] depending
			// on dist[j]

			j = n;
			while ( j-- ) {
				next[j][i] = dist[j] === Infinity ? -1 : prev[j];
			}

			next[i][i] = -1;
		}

		d = gn.sqmat( 2, n, Infinity );
		amat( g, n, d );
		floyd( n, d );

		successors = gn.sqmat( 2, n, -1 );
		sptreedfs( g, n, successors, d );


		t.deepEqual( successors, next, "next" );

	});

};


[

[
	"1",
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
	"http://stackoverflow.com/questions/14159424/dijkstras-algorithm-why-is-it-needed-to-find-minimum-distance-element-in-the-q#1",
	4,
	[
		[0, 1, 6],
		[1, 2, 7],
		[2, 3, 2],
		[0, 3, 7]
	]
],

[
	"http://stackoverflow.com/questions/14159424/dijkstras-algorithm-why-is-it-needed-to-find-minimum-distance-element-in-the-q#2",
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



].forEach( functools.partial( functools.star, [one] ) );
