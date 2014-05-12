//ajoute arretes de poids min et retire cycle 



var simplegraph_t = function(){

	var simplegraph = function(g, order, dist, h){
		var V = [], i, j; // link between g and h

		g.vitr(function(v){

			i = v[0]; // indice of v in dist
			V[i] = h.vadd(v);
				
			g.eitr(v, function(e){

				var u = e[0]; // dest
				var w = e[1]; // weigth
				j = u[0];

				if(i >= j) return;

				if (w < dist[i][j][1] ){
					dist[i][j] = e;
				}
			});
		});
				

		for (i = 0; i < order; ++i){
			for (j = i + 1; j < order; ++j){
				if ( dist[i][j][1] < Infinity ){
					h.eadd( V[i], V[j], dist[i][j][1] );
				}
			}
		}

		return V;
	};

	return simplegraph;

};

exports.simplegraph_t = simplegraph_t;