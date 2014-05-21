

var d2s = function(g, h, V){

	g.vitr(function(v){
		V[v[0]] = h.vadd(v[0]);
	});

	g.vitr(function(u){
		g.eitr(u, function(e){
			var v = e[0], w = e[1];
			if(u[0] <= v[0]) h.eadd(V[u[0]], V[v[0]], w);
		});
	});

};

exports.d2s = d2s;