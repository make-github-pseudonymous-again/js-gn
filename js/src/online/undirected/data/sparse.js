
var sparse_graph_t = function(){

	var graph = function(){

		this.pt = [null, null];

	};

	graph.prototype.vadd = function(){

		this.pt[1] = [this.pt, this.pt[1], [-1, -1, null, null]];

		if(this.pt[1][1] !== null) this.pt[1][1][0] = this.pt[1];

		return this.pt[1];
	};

	graph.prototype.vdel = function(i){

		i[0][1] = i[1];

		if(i[1] !== null) i[1][0] = i[0];

	};

	graph.prototype.eadd = function(i, j, w){

		i[2][3] = [j, w, i[2], i[2][3]];
		if(i[2][3][3] !== null) i[2][3][3][2] = i[2][3];

		if(j !== i){
			j[2][3] = [i, w, j[2], j[2][3]];
			if(j[2][3][3] !== null) j[2][3][3][2] = j[2][3];
		}

		return [i[2][3], j[2][3]];

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

		var i = this.pt[1];

		while(i !== null){

			if(fn(i)) break;

			i = i[1];
		}

	};

	graph.prototype.eitr = function(i, fn){

		var e = i[2][3];

		while(e !== null){

			if(fn(e)) break;

			e = e[3];
		}

	};



	return graph;

};

exports.sparse_graph_t = sparse_graph_t;