

var copy_t = function(){

	var copy = function(g, h){


		g.vitr(function(v){
			v.copy = h.vadd(v);
		});

		g.aeitr(function(_, u, v, w){
			h.eadd(u.copy, v.copy, w);
		});

	};

	return copy;

};

exports.copy_t = copy_t;