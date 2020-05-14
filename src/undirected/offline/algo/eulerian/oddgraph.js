

export function oddgraph_t(){

	var oddgraph = function(g, dist, h){

		var odd = [];

		g.vitr(function(v){
			var i = 0;
			g.eitr(v, function(_, u){
				i += (u !== v);
			});

			if(i % 2 === 1){
				var u = h.vadd(v);
				var j = odd.length;
				while(j--) h.eadd(u, odd[j], dist[v[0]][odd[j][1][0]]);
				odd.push(u);
			}
		});

	};

	return oddgraph;

}

