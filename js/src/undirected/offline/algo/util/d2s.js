

var d2s = function(g, h){

	var V = [];

	g.vitr(function(v){
		V[v[0]] = h.vadd();
	});

	g.vitr(function(u){
		g.eitr(function(e){
			var v = e[0], w = e[1];
			if(u[0] <= v[0]) h.eadd(V[u[0]], V[v[0]], w);
		});
	});

};