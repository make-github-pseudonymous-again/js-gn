
var dense_graph_t = function(){

	var graph = function(){

		this.pt = [];

	};

	graph.prototype.add_vertex = function(){

		var j = this.pt.length;
		while(j--) this.pt[j].push(undefined);

		this.pt.push(new Array(this.pt.length + 1));

		return this.pt.length - 1;
	};

	graph.prototype.rm_vertex = function(i){

		var j = this.pt.length;
		while(j--) this.pt[j].splice(i, 1);

	};

	graph.prototype.add_edge = function(i, j, w){

		this.pt[i][j] = w;
		this.pt[j][i] = w;

		return [i, j];

	};

	graph.prototype.rm_edge = function(i, j){

		this.pt[i][j] = undefined;
		this.pt[j][i] = undefined;

	};

	graph.prototype.viter = function(fn){

		for(var i = 0, len = this.pt.length; i < len; ++i){
			
			if(fn(i)) break;

		}

	};

	graph.prototype.eiter = function(i, fn){

		for(var j = 0, len = this.pt[i].length; j < len; ++j){

			if(this.pt[i][j] === undefined) continue;

			if(fn([j, this.pt[i][j]])) break;

		}

	};



	return graph;

};

exports.dense_graph_t = dense_graph_t;