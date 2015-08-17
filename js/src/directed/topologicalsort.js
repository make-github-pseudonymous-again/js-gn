
const topologicalsort = function* ( G , pred , queue ) {

	predecessors( G , pred ) ;

	for ( let u of G.vertices( ) ) {

		if ( pred[u] === 0 ) queue.push( u ) ;

	}

	while ( !queue.empty( ) ) {

		let u = queue.pop( ) ;

		yield u ;

		for ( let v of G.neighbours( u ) ) {

			--pred[v] ;

			if ( pred[v] === 0 ) queue.push( v ) ;

		}

	}

} ;

exports.topologicalsort = topologicalsort ;
