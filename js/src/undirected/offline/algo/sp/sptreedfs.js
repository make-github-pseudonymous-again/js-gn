

var sptreedfs_t = function(){

	var dfs = function(g, next, dist, s, t){

		g.eitr([s], function(e){
			var u = e[0][0];
			var w = e[1];

			if(dist[u][t] === w + dist[s][t] && next[u][t] === -1){
				next[u][t] = s;
				dfs(g, next, dist, u, t);
			}
		});

	};

	var sptreedfs = function(g, order, next, dist){

		for(i = 0; i < order; ++i){
			dist[i][i] = 0;
			dfs(g, next, dist, i, i);
		}

	};

	return sptreedfs;

};

exports.sptreedfs_t = sptreedfs_t;