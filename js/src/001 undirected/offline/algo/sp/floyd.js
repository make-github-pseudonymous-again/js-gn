

var floyd_t = function(){

	var floyd = function(order, dist){
		var i, j, k;

		for(k = 0; k < order; ++k){
			for(i = 0; i < order; ++i){
				for(j = 0; j < order; ++j){
					if(dist[i][k] + dist[k][j] < dist[i][j])
						dist[i][j] = dist[i][k] + dist[k][j];
				}
			}
		}
	};

	return floyd;

};

exports.floyd_t = floyd_t;