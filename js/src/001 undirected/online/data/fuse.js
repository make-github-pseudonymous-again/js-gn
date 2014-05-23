

var fuse_t = function(){

	var fuse = function(){

		this.obj = Array.prototype.slice.call(arguments);

	};


	fuse.prototype.vadd = function(h){
		var i = 0, len = this.obj.length;
		var pt = new Array(len);
		
		for(; i < len; ++i){
			pt[i] = this.obj[i].vadd(h);
			pt[i].pt = pt;
		}

		pt.pt = pt;

		return pt;
	};

	fuse.prototype.eadd = function(u, v, w){
		var i = 0, len = this.obj.length;
		var pt = new Array(len);
		for(; i < len; ++i){
			pt[i] = this.obj[i].eadd(u.pt[i], v.pt[i], w);
			pt[i].pt = pt;
		}
		
		pt.pt = pt;

		return pt;
	};


	fuse.prototype.vdel = function(v){
		var i = 0, len = this.obj.length;
		for(; i < len; ++i){
			this.obj[i].vdel(v.pt[i]);
		}
	};

	fuse.prototype.edel = function(e){
		var i = 0, len = this.obj.length;
		for(; i < len; ++i){
			this.obj[i].edel(e.pt[i]);
		}
	};

	return fuse;

};

exports.fuse_t = fuse_t;