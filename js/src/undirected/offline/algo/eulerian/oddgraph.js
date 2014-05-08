

var oddgraph = function(g, dist, h){

	var odd = [];

	g.vitr(function(v){
		var i = 0;
		g.eitr(v, function(e){
			i += (e[0] !== v);
		});

		if(i % 2 === 1){
			var u = h.vadd();
			var j = odd.length;
			while(j--) h.eadd(u, odd[j], dist[u[0]][odd[j][0]]);
			odd.push(u);
		}
	});




};