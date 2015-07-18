
const Selected = function ( G , attr ) {

	this.G = G ;
	this.attr = attr ;

} ;


Selected.prototype.vadd = function ( label ) {

	return this.G.vadd( label ).get( this.attr ) ;

} ;

Selected.prototype.eadd = function( u , v , w ) {

	return this.G.eadd( u , v , w ).get( this.attr ) ;

} ;

Selected.prototype.vdel = function ( v ) {

	this.G.vdel( v ) ;

} ;

Selected.prototype.edel = function ( e ) {

	this.G.edel( e ) ;

} ;

exports.Selected = Selected ;
