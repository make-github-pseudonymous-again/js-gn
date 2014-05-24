

var amat_t = function(){

	var amat = function(g, order, dist){

		g.vitr(function(v){
			g.eitr(v, function(_, u, w){
				dist[v[0]][u[0]] = w;
			});
		});
		
	};

	return amat;

};

exports.amat_t = amat_t;