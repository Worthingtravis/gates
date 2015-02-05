//create a line with the given inputs
function createLine(x1, y1, x2, y2){
	var l = [x1, y1, x2, y2]
	l.mouseover = false;
	l.powered = false;
	l.coords = [x1, y1, x2, y2];
	l.checkMouseOver = mouseIsOver;
	lines.push(l)
	organizeLines(lines)
}

//sets the ids of connected lines to be the same
function consolidateLines(l){
	var c = 0
	for (var i=0; i<l.length-1; i++){
		for (var j=i+1; j<l.length; j++){
			if (linesAreConnected(l[i], l[j])) {
				if (l[j].id == l[i].id){

				}
				else if (l[j].id < l[i].id) {
					l[i].id = l[j].id;
					c += 1;
				}
				else {
					l[j].id = l[i].id;
					c += 1;
				}
			}
		}
	}
	for (var k=0; k<=c; k++){
		consolidateLines(l)
	}
}

//makes the id of every line different
function resetLines(l){
	for (var i=0; i<l.length; i++){
		l[i].id = i;
	}
}

//redoes computations for line ids
function organizeLines(l){
	resetLines(l)
	consolidateLines(l)
}


//takes two lines and tells you if they are connected
function linesAreConnected(l1, l2){
	var ax1 = l1[0];
	var ay1 = l1[1];
	var ax2 = l1[2];
	var ay2 = l1[3];

	var bx1 = l2[0];
	var by1 = l2[1];
	var bx2 = l2[2];
	var by2 = l2[3];

	if (ax1 == bx1 && ay1 == by1){
		return true;
	}
	else if (ax2 == bx1 && ay2 == by1){
		return true;
	}
	else if (ax1 == bx2 && ay1 == by2){
		return true;
	}
	else if (ax2 == bx2 && ay2 == by2){
		return true;
	}
	else {
		return false;
	}
}


//takes two lines and tells you if they are identical
function linesAreIdentical(l1, l2){
	var ax1 = l1[0];
	var ay1 = l1[1];
	var ax2 = l1[2];
	var ay2 = l1[3];

	var bx1 = l2[0];
	var by1 = l2[1];
	var bx2 = l2[2];
	var by2 = l2[3];

	if (ax1 == bx1 && ay1 == by1){
		if (ax2 == bx2 && ay2 == by2){
			return true;
		}
		else {
			return false;
		}
	}
	else if (ax1 == bx2 && ay1 == by2){
		if (ax2 == bx1 && ay2 == by1){
			return true;
		}
		else {
			return false;
		}
	}
	else {
		return false;
	}
}


function debug(){
	document.getElementById('debug').innerHTML = "";
	for (var i=0; i<lines.length; i++){
		var text = "<li> ["+lines[i][0]/10+", "+
			lines[i][1]/10+", "+
			lines[i][2]/10+", "+
			lines[i][3]/10+"]: id = "+
			lines[i].id+" </li>";
		document.getElementById('debug').innerHTML +=text
	}
}


//note this is actually a method connected to a line object, not a standalone function
//tells you if the mouse is over that line or not
function mouseIsOver(mx, my){
	var x1 = this.coords[0];
	var y1 = this.coords[1];
	var x2 = this.coords[2];
	var y2 = this.coords[3];

	var m = (y2-y1)/(x2-x1)
	if (Math.abs(m) > 1){
		//solve for x as as function of y
		if (y2 < y1){
			var x1 = this.coords[2];
			var y1 = this.coords[3];
			var x2 = this.coords[0];
			var y2 = this.coords[1];
		}
		if ((my < y2+3) && (my > y1-3)){
			m = (x2-x1)/(y2-y1)
			var x = ((my-y1)*m) + x1
			if ((mx > x-3) && (mx < x+3)){
				this.mouseover = true;
			}
			else {
				this.mouseover = false;
			}
		}
		else {
			this.mouseover = false;
		}
	}
	else {
		//solve for y as a function of x
		if (x2 < x1){
			var x1 = this.coords[2];
			var y1 = this.coords[3];
			var x2 = this.coords[0];
			var y2 = this.coords[1];
		}
		if ((mx < x2+3) && (mx > x1-3)){
			var b = y2 - (x2*m);
			var y = mx*m + b
			if ((my > y-3) && (my < y+3)){
				this.mouseover = true;
			}
			else {
				this.mouseover = false;
			}
		}
		else {
			this.mouseover = false;
		}
	}
}