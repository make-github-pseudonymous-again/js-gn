

export function amat_t(){

	var amat = function(g, order, dist){

		g.vitr(function(v){
			g.eitr(v, function(_, u, w){
				dist[v[0]][u[0]] = w;
			});
		});
		
	};

	return amat;

}

