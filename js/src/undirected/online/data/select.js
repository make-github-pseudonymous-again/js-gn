
/**
 * Use jointly with fused graphs. vadd and eadd methods
 * will return the references from the graph designed
 * by the `attr` parameter.
 *
 */

const select = ( G , attr ) => new Selected( G , attr ) ;

exports.select = select ;
