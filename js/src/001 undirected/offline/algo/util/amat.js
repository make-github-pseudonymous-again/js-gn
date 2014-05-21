

var amat_t = function(){

	var amat = function(g, order, dist){

		g.vitr(function(v){
			g.eitr(v, function(e){
				dist[v[0]][e[0][0]] = e[1];
			});
		});
		
	};

	return amat;

};

exports.amat_t = amat_t;