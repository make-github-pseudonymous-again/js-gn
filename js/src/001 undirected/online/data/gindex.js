var index_t = function(){

	var index = function(G, attr){

		this.G = G;
		this.ad = [];
		this.attr = attr !== undefined ? attr : 0;

	};

	index.prototype.vadd = function(h){
		var i = this.ad.length;
		this.ad.push(this.G.vadd(i));
		return this.ad[i];
	};

	index.prototype.vdel = function(v){

		this.G.vdel(v);
		
		var a = this.attr;
		var i = v[a];
		this.ad.splice(i, 1);
		var len = this.ad.length;
		for(; i < len; ++i) {
			--this.ad[i][a];
		}

	};

	index.prototype.eadd = function(i, j, w){
		return this.G.eadd(i, j, w);
	};

	index.prototype.edel = function(e){
		this.G.edel(e);
	};


	index.prototype.vitr = function(fn){
		return this.G.vitr(fn);
	};

	index.prototype.eitr = function(i, fn){
		return this.G.eitr(i, fn);
	};

	return index;

};

exports.index_t = index_t;