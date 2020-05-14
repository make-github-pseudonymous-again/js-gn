

/**
 * @param {graph} g the graph
 * @param {int} order number of vertices in the graph
 *
 * @param {vertex} source the source vertex from where to start the search
 *
 * @param {array} prev a list of predecessor
 *                     initialized to id(source)
 * @param {array} dist a list of distance for the source to each vertex
 *                     initialized to Infinity
 *
 * @param {bool[]} used an array to keep track of visited vertices
 *                      initialized to false
 * @param {array} ref an array used to reference nodes from the priority queue
 *                    initialized to null
 * @param {PriorityQueue} left a priority queue used to order neighbours
 *                             according to their distance to the source
 *
 */

export function dijkstra ( g, order, source, prev, dist, used, ref, left ) {

	var current;

	dist[source[0]] = 0;
	ref[source[0]] = left.push( source );

	while ( left.length ) {

		current = left.pop();
		used[current[0]] = true;

		g.eitr( current, function ( _, other, weight ) {

			var distance, improved;

			if ( ! used[other[0]] ) {

				distance = dist[current[0]] + weight;

				improved = distance < dist[other[0]];

				if ( improved ) {
					dist[other[0]] = distance;
					prev[other[0]] = current[0];
				}

				if ( ref[other[0]] === null ) {
					ref[other[0]] = left.push( other );
				}
				else if ( improved ) {
					left.decreasekey( ref[other[0]], other );
				}

			}
		});
	}

}


