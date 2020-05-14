import test from 'ava';

import * as gn from '../../../../../src' ;

test( 'fuse', t => {

	var DGraph = gn.dense_graph_t();
	var SGraph = gn.sparse_graph_t();
	var fuse = gn.fuse_t();
	var index = gn.index_t();
	var amat = gn.amat_t();


	var G = new index(new SGraph());
	var H = new DGraph();
	var F = new fuse(G, H);


	var i, j, n = 15, v = [], e = [];

	for(i = 0; i < n; ++i){
		v.push(F.vadd());
	}

	for(i = 0; i < n; ++i){
		for(j = i + 1; j < n; ++j){
			e.push(F.eadd(v[i], v[j], Math.random()));
		}
	}


	var dist_G = gn.sqmat(2, n);
	var dist_H = gn.sqmat(2, n);

	amat(G, n, dist_G);
	amat(H, n, dist_H);

	t.deepEqual(dist_G, dist_H, 'test equality of fused components');


	var m = Math.floor(n/3);

	for(i = 0; i < m * n; ++i) F.edel(e[i]);

	dist_G = gn.sqmat(2, n);
	dist_H = gn.sqmat(2, n);

	amat(G, n, dist_G);
	amat(H, n, dist_H);

	t.deepEqual(dist_G, dist_H, 'test equality after edge delete');

	for(i = m; i < n; ++i) F.vdel(v[i]);

	dist_G = gn.sqmat(2, m);
	dist_H = gn.sqmat(2, m);

	amat(G, m, dist_G);
	amat(H, m, dist_H);

	t.deepEqual(dist_G, dist_H, 'test equality after vertices delete');









});
