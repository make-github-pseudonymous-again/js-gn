
const predecessors = function ( G , pred ) {

	for ( let u of G.vertices( ) ) pred[u] = 0 ;
	for ( let [ _ , v ] of G.edges( ) ) ++pred[v] ;

} ;

exports.predecessors = predecessors ;
