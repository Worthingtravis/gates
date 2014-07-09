var count = 0;

var mousedown,
	mouseup,
	mousemove,
	mousepos;
var lineStartPos = {x:0, y:0}
var releasePos = {x:0, y:0}

var lines = []

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
	if (button == 1 && lineStartPos != releasePos){
		var c = [lineStartPos.x, lineStartPos.y, releasePos.x, releasePos.y]
		lines.push(c)
	}
}

function mouseMove(event){
	mousemove = true;
	mousepos = getMousePos(event)


}

function addLine(x1, y1, x2, y2){
	lines.push([x1, y1, x2, y2])
}