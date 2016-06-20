function pick(list) {
	var index = Math.floor(Math.random() * list.length);
	return list[index];
}

function specialpick(list) {
	var index = Math.floor(Math.random() * list.length);
	if(list == index) {
		return specialpick(list);
	} else {
		return list[index];
	}
}