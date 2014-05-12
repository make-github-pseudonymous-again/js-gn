var check = function(name, order, E){


	test("simplegraph #" + name, function(assert){


		var SGraph = gn.sparse_graph_t();
		var DGraph = gn.dense_graph_t();




		var simplegraph = gn.simplegraph_t();

		var g = new SGraph();
		var h = new DGraph();

		var i = order;

		var V = new Array(i);

		while(i--) V[order-i-1] = g.vadd(order-i-1);

		for(var j = 0; j < E.length; ++j){
			var e = E[j];
			g.eadd(V[e[0]], V[e[1]], e[2]);
		}

		

		var d = gn.sqmat(2, order, [0, Infinity]);
	
		simplegraph(g, order, d, h);


		var edgecounth = gn.sqmat(2, order, 0);
		var edgecountg = gn.sqmat(2, order, 0);

		h.vitr(function(v){

			i = v[1][0];
			h.eitr(v, function(e){
				var u = e[0];
				var j = u[1][0];
				edgecounth[i][j]++;


				
			});
		});


		g.vitr(function(v){

			i = v[0];
			g.eitr(v, function(e){
				var u = e[0];
				var j = u[0];

				if (i !== j) edgecountg[i][j] = 1;

			});
		});


		deepEqual(edgecounth, edgecountg, "check simplegraph");

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
		[3, 4, 4],
		[6, 1, 5],
		[2, 3, 1],
		[9, 2, 6],
		[9, 2, 6],
		[9, 2, 6],
		[2, 9, 6],
		[9, 2, 6],
		[9, 2, 6],
		[9, 2, 5],
		[9, 2, 5],
		[9, 2, 6],
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