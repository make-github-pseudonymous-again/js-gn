
var dense_graph_t = function(){

	var graph = function(){

		this.pt = [];
		this.ad = [];

	};

	graph.prototype.vadd = function(h){

		var len = this.pt.length;
		var ref = [len, h];

		this.ad.push(ref);

		var j = len;
		while(j--) this.pt[j].push([null, -1]);

		this.pt.push(new Array(len + 1));

		j = len + 1;
		while(j--) this.pt[len][j] = [null, -1];

		return ref;
	};

	graph.prototype.vdel = function(v){
		var i = v[0];

		this.ad.splice(i, 1);
		this.pt.splice(i, 1);

		var len = this.pt.length;

		var j = len;
		while(j--) this.pt[j].splice(i, 1);

		for(; i < len; ++i) --this.ad[i][0];

	};

	graph.prototype.eadd = function(u, v, w){
		var i = u[0], j = v[0];

		this.pt[i][j][0] = v;
		this.pt[i][j][1] = w;
		this.pt[j][i][0] = u;
		this.pt[j][i][1] = w;

		return [this.pt[i][j], this.pt[j][i]];

	};

	graph.prototype.edel = function(e){

		var i = e[0][0][0], j = e[1][0][0];

		this.pt[i][j][0] = null;
		this.pt[j][i][0] = null;

	};

	graph.prototype.vitr = function(fn){

		for(var i = 0, len = this.ad.length; i < len; ++i){
			
			if(fn(this.ad[i])) break;

		}

	};

	graph.prototype.eitr = function(v, fn){
		var i = v[0];

		for(var j = 0, len = this.pt[i].length; j < len; ++j){

			if(this.pt[i][j][0] === null) continue;

			if(fn(this.pt[i][j])) break;

		}

	};



	return graph;

};

exports.dense_graph_t = dense_graph_t;