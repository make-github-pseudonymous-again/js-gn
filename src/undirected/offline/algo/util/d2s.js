

export function d2s(g, h, V){

	g.vitr(function(v){
		V[v[0]] = h.vadd(v[0]);
	});

	g.vitr(function(u){
		g.eitr(u, function(_, v, w){
			if(u[0] <= v[0]) h.eadd(V[u[0]], V[v[0]], w);
		});
	});

}

