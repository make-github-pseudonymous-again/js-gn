import test from 'ava';

import { BinomialHeap , BinomialTreeWithParent } from "@aureooms/js-binomial-heap" ;
import functools from "@aureooms/js-functools" ;

import * as gn from '../../../../../../src' ;

function one ( label, n, edges ) {

test( "floyd #" + label, t => {

		var prev, dist, used, ref, left, predicate;

		var d, g, i, v, e, j;

		var amat, floyd;

		const PriorityQueue = BinomialHeap( BinomialTreeWithParent );

		const Graph = gn.dense_graph_t();

		amat = gn.amat_t();

		floyd = gn.floyd_t();

		g = new Graph();
		i = n;

		v = new Array( i );

		while ( i-- ) {
			v[n-i-1] = g.vadd();
		}

		for ( j = 0 ; j < edges.length ; ++j ) {
			e = edges[j];
			g.eadd( v[e[0]], v[e[1]], e[2] );
		}

		dist = new Array( n );
		i = n;

		while ( i-- ) {

			prev = gn.sqmat( 1, n, v[i][0] );
			dist[i] = gn.sqmat( 1, n, Infinity );
			used = gn.sqmat( 1, n, false );
			ref = gn.sqmat( 1, n, null );

			predicate = function ( u, v ) {
				return dist[i][u[0]] - dist[i][v[0]];
			};

			left = new PriorityQueue( predicate );

			gn.dijkstra( g, n, v[i], prev, dist[i], used, ref, left );

			// here we reset dist[i][i] to the
			// shortest go and return for i to an
			// other vertex

			dist[i][i] = Infinity;

			g.eitr( [i], function ( _1, _2, w ) {
				dist[i][i] = Math.min( dist[i][i], w * 2 );
			});

		}

		d = gn.sqmat( 2, n, Infinity );
		amat( g, n, d );
		floyd( n, d );

		t.deepEqual( d, dist, "dist" );

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
