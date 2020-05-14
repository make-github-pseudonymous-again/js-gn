import test from 'ava';

var check = function(key, alg, callback){
	test(key, function(assert){
		callback(alg, assert);
	});
};


var tests = {

	test10_empty : function(alg){
		// empty input graph
		t.deepEqual(alg([]), []);
	},
	test11_singleedge : function(alg){
		// single edge
		t.deepEqual(alg([ [0,1,1] ]), [1, 0]);
	},

	test12 : function(alg){
		t.deepEqual(alg([ [1,2,10], [2,3,11] ]), [ -1, -1, 3, 2 ]);
	},

	test13 : function(alg){
		t.deepEqual(alg([ [1,2,5], [2,3,11], [3,4,5] ]), [ -1, -1, 3, 2, -1 ]);
	},

	test14_maxcard : function(alg){
		// maximum cardinality
		t.deepEqual(alg([ [1,2,5], [2,3,11], [3,4,5] ], true), [ -1, 2, 1, 4, 3 ]);
	},

	test15_float : function(alg){
		// floating point weigths
		t.deepEqual(alg([ [1,2,Math.PI], [2,3,Math.E], [1,3,3.0], [1,4,Math.sqrt(2.0)] ]), [ -1, 4, 3, 2, 1 ]);
	},

	test16_negative : function(alg){
		// negative weights
		t.deepEqual(alg([ [1,2,2], [1,3,-2], [2,3,1], [2,4,-1], [3,4,-6] ], false), [ -1, 2, 1, -1, -1 ]);
		t.deepEqual(alg([ [1,2,2], [1,3,-2], [2,3,1], [2,4,-1], [3,4,-6] ], true), [ -1, 3, 4, 1, 2 ]);
	},

	test20_sblossom : function(alg){
		// create S-blossom and use it for augmentation
		t.deepEqual(alg([ [1,2,8], [1,3,9], [2,3,10], [3,4,7] ]), [ -1, 2, 1, 4, 3 ]);
		t.deepEqual(alg([ [1,2,8], [1,3,9], [2,3,10], [3,4,7], [1,6,5], [4,5,6] ]), [ -1, 6, 3, 2, 5, 4, 1 ]);
	},

	test21_tblossom : function(alg){
		// create S-blossom, relabel as T-blossom, use for augmentation
		t.deepEqual(alg([ [1,2,9], [1,3,8], [2,3,10], [1,4,5], [4,5,4], [1,6,3] ]), [ -1, 6, 3, 2, 5, 4, 1 ]);
		t.deepEqual(alg([ [1,2,9], [1,3,8], [2,3,10], [1,4,5], [4,5,3], [1,6,4] ]), [ -1, 6, 3, 2, 5, 4, 1 ]);
		t.deepEqual(alg([ [1,2,9], [1,3,8], [2,3,10], [1,4,5], [4,5,3], [3,6,4] ]), [ -1, 2, 1, 6, 5, 4, 3 ]);
	},

	test22_s_nest : function(alg){
		// create nested S-blossom, use for augmentation
		t.deepEqual(alg([ [1,2,9], [1,3,9], [2,3,10], [2,4,8], [3,5,8], [4,5,10], [5,6,6] ]), [ -1, 3, 4, 1, 2, 6, 5 ]);
	},

	test23_s_relabel_nest : function(alg){
		// create S-blossom, relabel as S, include in nested S-blossom
		t.deepEqual(alg([ [1,2,10], [1,7,10], [2,3,12], [3,4,20], [3,5,20], [4,5,25], [5,6,10], [6,7,10], [7,8,8] ]), [ -1, 2, 1, 4, 3, 6, 5, 8, 7 ]);
	},

	test24_s_nest_expand : function(alg){
		// create nested S-blossom, augment, expand recursively
		t.deepEqual(alg([ [1,2,8], [1,3,8], [2,3,10], [2,4,12], [3,5,12], [4,5,14], [4,6,12], [5,7,12], [6,7,14], [7,8,12] ]), [ -1, 2, 1, 5, 6, 3, 4, 8, 7 ]);
	},

	test25_s_t_expand : function(alg){
		// create S-blossom, relabel as T, expand
		t.deepEqual(alg([ [1,2,23], [1,5,22], [1,6,15], [2,3,25], [3,4,22], [4,5,25], [4,8,14], [5,7,13] ]), [ -1, 6, 3, 2, 8, 7, 1, 5, 4 ]);
	},

	test26_s_nest_t_expand : function(alg){
		// create nested S-blossom, relabel as T, expand
		t.deepEqual(alg([ [1,2,19], [1,3,20], [1,8,8], [2,3,25], [2,4,18], [3,5,18], [4,5,13], [4,7,7], [5,6,7] ]), [ -1, 8, 3, 2, 7, 6, 5, 4, 1 ]);
	},

	test30_tnasty_expand : function(alg){
		// create blossom, relabel as T in more than one way, expand, augment
		t.deepEqual(alg([ [1,2,45], [1,5,45], [2,3,50], [3,4,45], [4,5,50], [1,6,30], [3,9,35], [4,8,35], [5,7,26], [9,10,5] ]), [ -1, 6, 3, 2, 8, 7, 1, 5, 4, 10, 9 ]);
	},

	test31_tnasty2_expand : function(alg){
		// again but slightly different
		t.deepEqual(alg([ [1,2,45], [1,5,45], [2,3,50], [3,4,45], [4,5,50], [1,6,30], [3,9,35], [4,8,26], [5,7,40], [9,10,5] ]), [ -1, 6, 3, 2, 8, 7, 1, 5, 4, 10, 9 ]);
	},

	test32_t_expand_leastslack : function(alg){
		// create blossom, relabel as T, expand such that a new least-slack S-to-free edge is produced, augment
		t.deepEqual(alg([ [1,2,45], [1,5,45], [2,3,50], [3,4,45], [4,5,50], [1,6,30], [3,9,35], [4,8,28], [5,7,26], [9,10,5] ]), [ -1, 6, 3, 2, 8, 7, 1, 5, 4, 10, 9 ]);
	},

	test33_nest_tnasty_expand : function(alg){
		// create nested blossom, relabel as T in more than one way, expand outer blossom such that inner blossom ends up on an augmenting path
		t.deepEqual(alg([ [1,2,45], [1,7,45], [2,3,50], [3,4,45], [4,5,95], [4,6,94], [5,6,94], [6,7,50], [1,8,30], [3,11,35], [5,9,36], [7,10,26], [11,12,5] ]), [ -1, 8, 3, 2, 6, 9, 4, 10, 1, 5, 7, 12, 11 ]);
	},

	test34_nest_relabel_expand : function(alg){
		// create nested S-blossom, relabel as S, expand recursively
		t.deepEqual(alg([ [1,2,40], [1,3,40], [2,3,60], [2,4,55], [3,5,55], [4,5,50], [1,8,15], [5,7,30], [7,6,10], [8,10,10], [4,9,30] ]), [ -1, 2, 1, 5, 9, 3, 7, 6, 10, 4, 8 ]);
	}
};

var alg = [
	gn.wblossom_n3_t(true, true, true),
	gn.wblossom_n3_t(false, false, false),
	gn.wblossom_n3_t()
];


for(var i = 0; i < alg.length; ++i){
	for(var key in tests)
		check(key, alg[i], tests[key]);
}
