

var dijkstra_t = function(){

	var dijkstra = function(g, order, s){
		var i, j, k, len, m, min;

		i = order;

		var dist = new Array(i);
		var prev = new Array(i);
		var used = new Array(i);
		var busy = new Array(i);

		while(i--){
			dist[i] = Infinity;
			prev[i] = s[0];
			used[i] = false;
			busy[i] = false;
		}

		var left = [];
		used[s[0]] = true;
		busy[s[0]] = true;

		g.eitr(s, function(e){
			dist[e[0][0]] = e[1];
			busy[e[0][0]] = true;
			left.push(e[0]);
		});

		while(left.length){

			m = left[0];
			min = dist[m[0]];
			j = 0;

			for(i = 1, len = left.length; i < len; ++i){
				if(dist[left[i][0]] < min){
					m = left[i];
					min = dist[m[0]];
					j = i;
				}
			}

			left.splice(j, 1);
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

		return [prev, dist];
	};

	return dijkstra;

};


exports.dijkstra_t = dijkstra_t;