
var sparse_graph_t = function(){

	var graph = function(){

		this.pt = [null, null, null];

	};

	graph.prototype.vadd = function(h){

		this.pt[1] = [h, this.pt, this.pt[2], [-1, -1, null, null]];

		if(this.pt[1][2] !== null) this.pt[1][2][1] = this.pt[1];

		return this.pt[1];
	};

	graph.prototype.vdel = function(i){

		i[1][2] = i[2];

		if(i[2] !== null) i[2][1] = i[1];

	};

	graph.prototype.eadd = function(i, j, w){

		i[3][3] = [j, w, i[3], i[3][3]];
		if(i[3][3][3] !== null) i[3][3][3][2] = i[3][3];

		if(j !== i){
			j[3][3] = [i, w, j[3], j[3][3]];
			if(j[3][3][3] !== null) j[3][3][3][2] = j[3][3];
		}

		return [i[3][3], j[3][3]];

	};

	graph.prototype.edel = function(e){

		e[0][2][3] = e[0][3];
		if(e[0][3] !== null) e[0][3][2] = e[0][2];


		if(e[1] !== e[0]){
			e[1][2][3] = e[1][3];
			if(e[1][3] !== null) e[1][3][2] = e[1][2];
		}

	};


	graph.prototype.vitr = function(fn){

		var i = this.pt[2];

		while(i !== null){

			if(fn(i)) break;

			i = i[2];
		}

	};

	graph.prototype.eitr = function(i, fn){

		var e = i[3][3];

		while(e !== null){

			if(fn(e)) break;

			e = e[3];
		}

	};



	return graph;

};

exports.sparse_graph_t = sparse_graph_t;