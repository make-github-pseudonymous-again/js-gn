
/**
 * Fuse multiple graph data structure allowing to
 * repeat the same write operations on all of them.
 * Adds a pt member to all edges and vertices of each
 * graph allowing direct reference of twin edges and
 * vertices in other fused graphs.
 */


const fuse = function ( map , graphs ) {

	return new Fused( map , graphs ) ;

} ;


const Fused = function ( map , graphs ) {

	this.map = map ;
	this.graphs = graphs ;

} ;

Fused.prototype.vadd = function ( h ) {

	const vertices = [ for ( g of this.graphs ) g.vadd( h ) ] ;

	for( let v of vertices ) this.map.set( v , vertices ) ;

	this.map.set( vertices , vertices ) ;

	return vertices ;

} ;

Fused.prototype.eadd = function(u, v, w){
	var i = 0, len = this.graphs.length;
	var pt = new Array(len);
	for(; i < len; ++i){
		pt[i] = this.graphs[i].eadd(u.pt[i], v.pt[i], w);
		pt[i].pt = pt;
	}

	pt.pt = pt;

	return pt;
};


Fused.prototype.vdel = function(v){
	var i = 0, len = this.graphs.length;
	for(; i < len; ++i){
		this.graphs[i].vdel(v.pt[i]);
	}
};

Fused.prototype.edel = function(e){
	var i = 0, len = this.graphs.length;
	for(; i < len; ++i){
		this.graphs[i].edel(e.pt[i]);
	}
};


exports.fuse_t = fuse_t;
