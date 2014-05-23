
// TODO should take a linked list prototype as template parameter
//      in order to simplify the implementation and allow better
//      parametrization as well as clarify the code


// TODO an explicit satelite data storage emplacement should be allocated
//      in the vertices and edges in order to allow a more flexible usage
//      of this code



var sparse_graph_t = function(){

	/**
	 * Object constructor
	 *
	 * 
	 * The main entry points in the graph object are the two dummy nodes [beg] and [end].
	 * Those allow us to write more generic code by handling corner cases implicitly.
	 * They allow the addition of a single vertex to the graph in O(1).
	 * Remark : Indeed the behaviour we want to get is the behaviour of a dll (doubly linked list). 
	 *
	 *
	 * vertices are small arrays where
	 *
	 * [0] = the vertex label lab()
	 * [1] = the vertex predecessor pred()
	 * [2] = the vertex successor succ()
	 * [3] = the edge list pointer e()
	 *
	 * For the set vertices that have not been removed from the graph,
	 * we define the 'youngest' vertex as the most recently added vertex of this set
	 * and we define the 'oldest' vertex as the least recently added vertex of this set
	 * 
	 * Invariants
	 * ==
	 *
	 * Given the graph is not empty:
	 *   > [end][1] = pred of end = the youngest vertex
	 *   > [beg][2] = succ of beg = the oldest vertex
	 * 
	 * Given a vertex v
	 *   > v[1][2] = succ of pred of v = v
	 *   > v[2][1] = pred of succ of v = v
	 */

	var graph = function() {

		this.beg = [null, null, null];
		this.end = [null, this.beg, null];
		this.beg[2] = this.end;

	};

	/**
	 * Prototype method to add a vertex to the graph with label h.
	 * <p>
	 * The graph is extended 
	 * @param h is the label
	 */

	graph.prototype.vadd = function(h){

		// First the vertex is created and appended at the end of the dll.
		// Remember [end][1] was the previous last element
		// which could be [beg] if the graph was empty before the  call.
		// After the assignation,
		//   > [end][1][1] is the previous [end][1]
		//   > [end] and [end][1] are sane
		//   > [end][1][1][2] is still pointing to [end]
		this.end[1] = [h, this.end[1], this.end, [-1, -1, null, null]];

		// update [end][1][1][2] to fix the invariant break
		this.end[1][1][2] = this.end[1];

		// return new vertex
		return this.end[1];
	};

	graph.prototype.vdel = function(i){

		this.eitr(i, function(e) {
			e[2][3] = e[3];
			if(e[3] !== null) e[3][2] = e[2];
			e = e[4];
			if(e === null) return;
			e[2][3] = e[3];
			if(e[3] !== null) e[3][2] = e[2];
		});

		
		i[1][2] = i[2]; // next of pref becomes next
		i[2][1] = i[1]; // prev of next becomes prev

	};

	graph.prototype.eadd = function(i, j, w){

		i[3][3] = [j, w, i[3], i[3][3], null];
		if(i[3][3][3] !== null) i[3][3][3][2] = i[3][3];

		if(j !== i){
			j[3][3] = [i, w, j[3], j[3][3], i[3][3]];
			if(j[3][3][3] !== null) j[3][3][3][2] = j[3][3];

			i[3][3][4] = j[3][3];
		}

		return [i[3][3], j[3][3]];

	};

	graph.prototype.edel = function(e){

		e[0][2][3] = e[0][3];
		if(e[0][3] !== null) e[0][3][2] = e[0][2];


		if(e[1] !== e[0]){
			e[1][2][3] = e[1][3];
			if(e[1][3] !== null) e[1][3][2] = e[1][2];
		}

	};


	graph.prototype.vitr = function(fn){

		var i = this.beg[2];

		while(i !== this.end){

			if(fn.call(this, i)) break;

			i = i[2];
		}

	};

	graph.prototype.eitr = function(i, fn){

		var e = i[3][3];

		while(e !== null){

			if(fn.call(this, e)) break;

			e = e[3];
		}

	};



	return graph;

};

exports.sparse_graph_t = sparse_graph_t;