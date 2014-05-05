
var sparse_graph_t = function(){

	var graph = function(){

		this.pt = null;

	};

	graph.prototype.add_vertex = function(){

		this.pt = [null, this.pt, null];

		return this.pt;
	};

	graph.prototype.rm_vertex = function(i){

		if(i[0] !== null) i[0][1] = i[1];
		if(i[1] !== null) i[1][0] = i[0];

	};

	graph.prototype.add_edge = function(i, j, w){

		i[2] = [j, w, null, i[2]];
		j[2] = [i, w, null, j[2]];

		return [i[2], j[2]];

	};

	graph.prototype.rm_edge = function(i, j){

		if(i[2] !== null) i[2][3] = i[3];
		if(i[3] !== null) i[3][2] = i[2];

		if(j[2] !== null) j[2][3] = j[3];
		if(j[3] !== null) j[3][2] = j[2];

	};


	graph.prototype.viter = function(fn){

		var i = this.pt;

		while(i !== null){

			if(fn(i)) break;

			i = i[1];
		}

	};

	graph.prototype.eiter = function(i, fn){

		var e = i[2];

		while(e !== null){

			if(fn(e)) break;

			e = e[3];
		}

	};



	return graph;

};

exports.sparse_graph_t = sparse_graph_t;