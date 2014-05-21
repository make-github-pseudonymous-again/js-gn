

var oddgraph_t = function(){

	var oddgraph = function(g, dist, h){

		var odd = [];

		g.vitr(function(v){
			var i = 0;
			g.eitr(v, function(e){
				i += (e[0] !== v);
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

};

exports.oddgraph_t = oddgraph_t;