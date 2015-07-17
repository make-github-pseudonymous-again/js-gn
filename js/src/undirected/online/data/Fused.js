
const Fused = function ( map , graphs ) {

	this.map = map ;
	this.graphs = graphs ;

} ;

Fused.prototype.vadd = function ( u ) {

	const vertices = [ for ( g of this.graphs ) [ g , g.vadd( u ) ] ] ;

	const map = new WeakMap( vertices ) ;

	for ( let [ g , v ] of vertices ) this.map.set( v , map ) ;

	this.map.set( map , map ) ;

	return map ;

} ;

Fused.prototype.eadd = function ( u , v , w ) {

	const _u = this.map.get( u ) , _v = this.map.get( v ) ;

	const edges = [ for ( g of this.graphs ) [ g , g.eadd( _u.get( g ) , _v.get( g ) , w ) ] ] ;

	const map = new WeakMap( edges ) ;

	for ( let [ g , e ] of edges ) this.map.set( e , map ) ;

	this.map.set( map , map ) ;

	return map ;

} ;


Fused.prototype.vdel = function ( v ) {

	const _v = this.map.get( v ) ;

	for ( let g of this.graphs ) g.vdel( _v.get( g ) ) ;

} ;


Fused.prototype.edel = function ( e ) {

	const _e = this.map.get( e ) ;

	for ( let g of this.graphs ) g.edel( _e.get( g ) ) ;

} ;


exports.Fused = Fused ;
