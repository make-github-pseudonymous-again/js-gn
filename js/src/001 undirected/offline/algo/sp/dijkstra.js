

var dijkstra_t = function(priority_queue_t){

	var dijkstra = function(g, order, s, prev, dist, used, busy){

		var pred = function(a, b){ return dist[a[0]] < dist[b[0]]; };
		var priority_queue = priority_queue_t(pred);
		var left = new priority_queue();

		used[s[0]] = true;
		busy[s[0]] = true;

		g.eitr(s, function(_, u, w){
			dist[u[0]] = w;
			busy[u[0]] = true;
			left.push(u);
		});

		while(left.length){

			var m = left.pop();
			used[m[0]] = true;
				
			g.eitr(m, function(_, u, w){
				var y = u;
				
				if(!used[y[0]]){

					var v = dist[m[0]] + w;

					if(v < dist[y[0]]){
						dist[y[0]] = v;
						prev[y[0]] = m[0];
					}
					// /!\ FLAWED : if updated element y already in the queue
					// the priority queue doesn't guarantee that the predicate will hold
					// true --> should use a pq allowing updating operations.
					if(!busy[y[0]]){
						left.push(y);
						busy[y[0]] = true;
					}

				}
			});
		}

	};

	return dijkstra;

};


exports.dijkstra_t = dijkstra_t;
