//
//
///**
// *
// * Maximal weighted matching algorithm in O(n^4) (Edmonds 1965b)
// *
// * 
// * Adapted from the original french version of
// *
// * 
// * @book{opac-b1091171,
// *    title = "Graphs and algorithms",
// *    author = "Gondran, Michel and Minoux, Michel",
// *    series = "Wiley-Interscience series in discrete mathematics",
// *    publisher = "Wiley",
// *    address = "Chichester, West Sussex, New York",
// *    url = "http://opac.inria.fr/record=b1091171",
// *    isbn = "0-471-10374-8",
// *    note = "Traduction de : Graphes et algorithmes",
// *    year = 1984
// * }
// *
// * (see Chapter 7 Section 4)
// * {page 258 1979 French edition}
// */
//
//var wblossom_n4_t = function(){
//
//	var wblossom_n4 = function(g, n, maxweight){
//		var i, j, k, r;
//
//
//		/**
//		 * init empty matching
//		 * (m[i] == -1 => v_i not matched)
//		 * 
//		 * O(n)
//		 */
//		i = n;
//		var m = new Array(i);
//		while(i--) m[i] = -1;
//
//
//
//	// (a) init dual variables for vertices
//
//		/**
//		 * We assign p[i] = maxWeight / 2,
//		 * this way w(u*) = p(i) + p(j),
//		 * for all u* s.t. w(u*) = maxweight
//		 * 
//		 * O(n)
//		 */
//		i = n;
//		var p = new Array(i);
//		while(i--) p[i] = maxWeight / 2;
//
//
//
//		while(true){
//
//	// (b)
//			/**
//			 * r not matched and p[r] > 0
//			 * => m not weight maximal
//			 * 
//			 * O(n)
//			 */
//			r = n;
//			while(r-- && (m[r] >= 0 || p[r] === 0));
//
//			if(r < 0) break;
//
//	// (c)
//
//
//
//
//
//
//		}
//
//	};
//
//};
//
//exports.wblossom_n4_t = wblossom_n4_t;