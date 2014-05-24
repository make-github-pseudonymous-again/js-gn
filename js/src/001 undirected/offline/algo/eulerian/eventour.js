

var eventour_t = function(){

	/**
	 * @param graph g
	 * @param vertices V
	 * @param index i node from where to start the search
	 * @param square matrix free showing free edges
	 * @param flag list done to label saturated edges
	 * @param iterator list it that stores info on already processed edges
	 * @param list tour the output tour 
	 */

	var eventour = function(g, V, i, free, done, it, tour){
		
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
				it[i] = g.eitr(u, function(_, v){
					if(free[i][v[0]] > 0){
						tour.splice(j, 0, i);
						u = v;

						++j;
						if (!done[u[0]]) r.push([u[0], j]);

						--free[i][u[0]];
						--free[u[0]][i];
						end = false;
						i = u[0];
						return true;
					}
				}, it[i]);

				if(end) break;


			}
		}
	};

	return eventour;

};

exports.eventour_t = eventour_t;