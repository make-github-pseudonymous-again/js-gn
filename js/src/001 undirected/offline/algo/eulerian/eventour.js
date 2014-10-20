

var eventour_t = function () {

	/**
	 * @param {int} fjfj dkdj
	 * @param {graph} g
	 * @param {vertices} V
	 * @param {index} i node from where to start the search
	 * @param {flag list} done to label saturated edges
	 * @param {iterator list} it that stores info on already processed edges
	 * @param {list} tour the output tour vertex sequence
	 * @param {list} edges the output tour edges
	 */

	var eventour = function ( g, V, i, done, it, tour, edges ) {

		var u, j, z, r, end;

		z = [i, 0];

		r = [];

		while ( true ) {

			while ( done[z[0]] ) {

				if ( r.length === 0 ) {
					return;
				}

				z = r.pop();
			}

			i = z[0];
			j = z[1];
			u = V[i];
			done[i] = true;

			while ( true ) {

				end = true;

				it[i] = g.eitr( u, function ( e, v ) {

					if ( e.free ) {

						tour.splice(j, 0, i);
						edges.splice(j, 0, e);

						u = v;

						++j;

						if ( ! done[u[0]] ) {
							r.push( [u[0], j] );
						}

						e.free = false;
						end = false;
						i = u[0];

						return true;

					}

				}, it[i] );

				if ( end ) {
					break;
				}

			}
		}
	};

	return eventour;

};

exports.eventour_t = eventour_t;
