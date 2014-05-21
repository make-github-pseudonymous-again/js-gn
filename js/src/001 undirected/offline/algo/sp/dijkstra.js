

var dijkstra_t = function(priority_queue_t){

	var dijkstra = function(g, order, s, prev, dist, used, busy){

		var pred = function(a, b){ return dist[a[0]] < dist[b[0]]; };
		var priority_queue = priority_queue_t(pred);
		var left = new priority_queue();

		used[s[0]] = true;
		busy[s[0]] = true;

		g.eitr(s, function(e){
			dist[e[0][0]] = e[1];
			busy[e[0][0]] = true;
			left.push(e[0]);
		});

		while(left.length){

			var m = left.pop();
			used[m[0]] = true;
				
			g.eitr(m, function(e){
				var y = e[0];
				
				if(!used[y[0]]){

					var v = dist[m[0]] + e[1];

					if(v < dist[y[0]]){
						dist[y[0]] = v;
						prev[y[0]] = m[0];
					}

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