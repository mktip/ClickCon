function removeAtIndex(arr, index){
	var clipped = [];
	for (var r = 0; r < arr.length; r++){
		if(r != index){
			clipped.push(arr[r]);
		}
	}
	return clipped;
}