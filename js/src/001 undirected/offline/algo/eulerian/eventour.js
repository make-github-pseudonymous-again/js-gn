

var eventour_t = function(){

	var eventour = function(g, V, n, free, tour){
		if(n === 0) return;
		
		var u, i = 0, j = 0, t = -1;

		while(t !== i){
			t = i;
			g.eitr(V[i], function(){ --i; return true;});
			++i;
		}
		
		while(true){
			u = V[i];

			while(true){
				var end = true;
				g.eitr(u, function(e){
					if(free[u[0]][e[0][0]] > 0){
						tour.splice(j, 0, u[0]);
						++j;
						--free[u[0]][e[0][0]];
						--free[e[0][0]][u[0]];
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
				if(V[i] === undefined) return;
				j = tour.length;
				while(--j){
					if(tour[j] === V[i][0]) break;
				}
			}
		}
	};

	return eventour;

};

exports.eventour_t = eventour_t;