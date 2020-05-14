//ajoute arretes de poids min et retire cycle 



export function simplegraph_t(){

	var simplegraph = function(g, order, dist, h){
		var V = [], i, j; // link between g and h

		g.vitr(function(v){

			i = v[0]; // indice of v in dist
			V[i] = h.vadd(v);
				
			g.eitr(v, function(_, u, w){

				j = u[0];

				if(i >= j) return;

				if (w < dist[i][j] ){
					dist[i][j] = w;
				}
			});
		});
				

		for (i = 0; i < order; ++i){
			for (j = i + 1; j < order; ++j){
				if ( dist[i][j] < Infinity ){
					h.eadd( V[i], V[j], dist[i][j] );
				}
			}
		}

		return V;
	};

	return simplegraph;

}

