

export function copy_t(){

	var copy = function(g, h){


		g.vitr(function(v){
			v.copy = h.vadd(v);
		});

		g.aeitr(function(_, u, v, w){
			h.eadd(u.copy, v.copy, w);
		});

	};

	return copy;

}

