var count = 0;

var mousedown,
	mouseup,
	mousemove;
var mousepos = {x:0, y:0}
var nearestPos = {x:0, y:0}
var lineStartPos = {x:0, y:0}
var releasePos = {x:0, y:0}

var lineCount = 0;

var lines = []
var colors = []

var getClassOf = Function.prototype.call.bind(Object.prototype.toString);

function update(event, mouseState){
	if (mouseState == 'mousedown'){
		if (("which" in event && event.which == 1) ||
			("button" in event && event.button==1)){
			mouseDown(event, 1)
		}
		else if (("which" in event && event.which == 3) ||
			("button" in event && event.button==2)){
			mouseDown(event, 2)
		}
	}
	if (mouseState == 'mouseup'){
		if (("which" in event && event.which == 1) ||
			("button" in event && event.button==1)){
			mouseUp(event, 1)
		}
		else if (("which" in event && event.which == 3) ||
			("button" in event && event.button==2)){
			mouseUp(event, 2)
		}
	}
	if (mouseState = 'mousemove'){
		mouseMove(event);
	}
}

function getMousePos(event) {
	if (event == null) {
		return {
		x: 0,
		y: 0
		};
	}
	var rect = canvas.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top
	};
}

function getNearestSquare(mousePos){
	var floorX = Math.floor(mousePos.x/20)*20;
	var floorY = Math.floor(mousePos.y/20)*20;
	if (mousePos.x > floorX){
		posx = 10+floorX;
	}
	if (mousePos.y > floorY){
		posy = 10+floorY;
	}
	return {
		x: posx,
		y: posy
	};
}

function mouseDown(event, button){
	mousedown = button;
	mouseup = 0;
	mousepos = getMousePos(event)
	lineStartPos = getNearestSquare(mousepos)
}

function mouseUp(event, button){
	mousepos = getMousePos(event)
	releasePos = getNearestSquare(mousepos)
	if (button == mousedown){
		mousedown = 0;
	}
	if (button == 1 && lineStartPos.x != releasePos.x ||
		lineStartPos.y != releasePos.y){
		createLine(lineStartPos.x, lineStartPos.y, releasePos.x, releasePos.y)
	}
}

function mouseMove(event){
	mousemove = true;
	mousepos = getMousePos(event)
	nearestPos = getNearestSquare(mousepos)


}

function createLine(x1, y1, x2, y2){
	var l = [x1, y1, x2, y2]
	l.id = lineCount
	lineCount += 1;
	var index = lines.length
	var colorNum = Math.floor(Math.random()*16777215)+1
	colors.push('#'+colorNum.toString(16));
	lines.push(l)

	consolidateLines(lines);
}

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