
/**
 * Fuse multiple graph data structure allowing to
 * repeat the same write operations on all of them.
 * Uses WeakMap objects to allow
 * direct reference of twin edges and
 * vertices in other fused graphs.
 *
 * @param {Array} graphs an immutable array of graphs
 */

const fuse = ( graphs ) => new Fused( new WeakMap( ) , graphs ) ;

exports.fuse = fuse ;
