


var eventour = function(g, n, used, tour){
	if(n === 0) return;
	
	var u, V = [], i = 0, j = 0;
	g.vitr(function(v){ V.push(v); });
	
	while(true){
		u = V[i];

		while(true){
			var end = true;
			g.eitr(u, function(e){
				if(!used[u[0]][e[0][0]]){
					tour.splice(j, 0, e[0]);
					used[u[0]][e[0][0]] = true;
					used[e[0][0]][u[0]] = true;
					u = e[0];
					--n;
					end = false;
					return true;
				}
			});

			if(end) break;

		}

		if(n === 0) return;

		i = 0;
		j = 0;
		while(j === 0){
			++i;
			j = tour.length;
			while(--j){
				if(tour[j] === V[i]) break;
			}
		}
	}
};