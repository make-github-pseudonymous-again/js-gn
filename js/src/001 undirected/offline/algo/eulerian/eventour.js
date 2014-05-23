

var eventour_t = function(){

	/**
	 * @param graph g
	 * @param vertices V
	 * @param index i node from where to start the search
	 * @param square matrix free showing free edges
	 * @param flag list done to label saturated edges
	 * @param list tour the output tour 
	 */

	var eventour = function(g, V, i, free, done, tour){
		
		var u, j, z = [i, 0];

		var r = [];
		
		while(true){

			while (done[z[0]]) {
				if (!r.length) return;
				z = r.pop();
			}

			i = z[0];
			j = z[1];
			u = V[i];
			done[i] = true;

			while(true){
				var end = true;
				g.eitr(u, function(e){
					if(free[u[0]][e[0][0]] > 0){
						tour.splice(j, 0, u[0]);

						++j;
						if (!done[e[0][0]]) r.push([e[0][0], j]);

						--free[u[0]][e[0][0]];
						--free[e[0][0]][u[0]];
						end = false;
						u = e[0];
						return true;
					}
				});

				if(end) break;


			}
		}
	};

	return eventour;

};

exports.eventour_t = eventour_t;