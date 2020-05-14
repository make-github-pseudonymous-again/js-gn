


export function dup_t(){

	var dup = function(g, V, m, next, dist, e){

		var i = m.length;
		var n = 0;

		while(i--){
			var u = m[i][0];
			var v = m[i][1];

			while(u !== v){
				var t = next[u][v];
				e.push(g.eadd(V[u], V[t], dist[u][t]));
				u = t;
				++n;
			}
		}

		return n;


	};

	return dup;

}


