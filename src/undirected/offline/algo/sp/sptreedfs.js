

export function sptreedfs_t(){

	var dfs = function(g, next, dist, s, t){

		g.eitr([s], function(_, u, w){
			u = u[0];
			
			if(dist[u][t] === w + dist[s][t] && next[u][t] === -1){
				next[u][t] = s;
				dfs(g, next, dist, u, t);
			}
		});

	};

	var sptreedfs = function(g, order, next, dist){

		for(var i = 0; i < order; ++i){
			dist[i][i] = 0;
			dfs(g, next, dist, i, i);
		}

	};

	return sptreedfs;

}

