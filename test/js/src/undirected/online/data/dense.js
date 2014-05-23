

test('dense', function(assert){
	var Graph = gn.dense_graph_t();

	var g = new Graph();

	var v = [];
	var e = [];

	var n = 11;

	for(var i = 0; i < n; ++i){
		v[i] = g.vadd();
	}

	e[1] = [];
	e[1][0] = g.eadd(v[1], v[9], 18);
	e[0] = [];
	e[0][0] = g.eadd(v[0], v[10], 7);
	e[0][1] = g.eadd(v[0], v[5], 2);
	e[0][2] = g.eadd(v[0], v[3], 5);
	e[0][3] = g.eadd(v[0], v[1], 456);
	e[0][4] = g.eadd(v[0], v[0], 5);
	e[1][1] = [e[0][3][1], e[0][3][0]];
	e[4] = [];
	e[4][0] = g.eadd(v[4], v[7], 5);

	var k = 0;
	g.vitr(function(j){
		deepEqual(j, v[k], 'vitr ' + k);
		++k;
	});
	deepEqual(k, v.length, 'check vertex count before del');


	var r = [0, 1, 4];
	for(var l = 0; l < r.length; ++l){
		var m = r[l];
		k = e[m].length;
		g.eitr(v[m], function(x){
			deepEqual(x, e[m][--k][0], 'eitr ' + m + ' ' + k);
		});
	};

	g.edel(e[1].splice(0, 1)[0]);

	g.edel(e[0].splice(2, 1)[0]);

	g.edel(e[4].splice(0, 1)[0]);


	for(var l = 0; l < r.length; ++l){
		var m = r[l];
		k = e[m].length;
		g.eitr(v[m], function(x){
			deepEqual(x, e[m][--k][0], 'eitr ' + m + ' ' + k);
		});
	};

	g.vdel(v.splice(3, 1)[0]);

	k = 0;
	g.vitr(function(j){
		deepEqual(j, v[k], 'vitr ' + k);
		++k;
	});


	k = -1;
	g.vitr(function(j){deepEqual(0, ++k, 'vitr stop'); return true;});


	k = -1;
	g.eitr(v[0], function(x){
		deepEqual(0, ++k, 'eitr stop');
		return true;
	});

	e[0].splice(2, 1);

	for(var l = 0; l < r.length; ++l){
		var m = r[l];
		while(e[m].length){
			g.edel(e[m].splice(0, 1)[0]);
		}
	};

	g.vitr(function(i){
		g.eitr(i, function(e){
			ok(false, 'eitr never go here');
		});
	});

	while(v.length){
		g.vdel(v.splice(0, 1)[0]);
	}

	g.vitr(function(i){
		ok(false, 'vitr never go here');
	});

});