

test('sparse', function(assert){
	var Graph = gn.sparse_graph_t();

	var g = new Graph();

	var v = [];

	var n = 11;

	for(var i = 0; i < n; ++i){
		v[i] = g.add_vertex();
	}

	g.add_edge(v[0], v[10], 7);
	g.add_edge(v[0], v[5], 2);
	g.add_edge(v[0], v[3], 5);
	g.add_edge(v[0], v[1], 456);
	g.add_edge(v[1], v[9], 18);
	g.add_edge(v[4], v[7], 5);

	g.viter(console.log);
	g.eiter(v[0], console.log);

	expect(0);
});