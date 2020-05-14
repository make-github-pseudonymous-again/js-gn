

export function sqmat(d, n, v){

	var i = n;
	var m = new Array(i);

	if(d === 1) while(i--) m[i] = v;
	else        while(i--) m[i] = sqmat(d-1, n, v);

	return m;

}


