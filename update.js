var count = 0;

var mousedown;
var mouseup;
var mousemove;
var mousepos = {x:0, y:0}
var nearestPos = {x:0, y:0}
var lineStartPos = {x:0, y:0}
var releasePos = {x:0, y:0}
var lineStarted = false;

var lineCount = 0;

var lines = []
var action = "";
var draggables = [];
var getClassOf = Function.prototype.call.bind(Object.prototype.toString);

var draggable;
var dragging = false;
var dragOffset = {x:0, y:0}

var liveWires = []

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
	
	if (button == 1){
		draggable = getDraggable(draggables, mousepos.x, mousepos.y)
		if (draggable != null){
			dragging = true;
			dragOffset.x = mousepos.x - draggable.x
			dragOffset.y = mousepos.y - draggable.y
		}
		else {
			var moveLines = []
			for (var i=0; i<lines.length; i++){
				if (lines[i].mouseover){
					moveLines.push(lines[i]);
				}
			}
			if (moveLines.length == 0){
				lineStarted = true;
			}
		}	
	}
}

function mouseUp(event, button){
	mousepos = getMousePos(event)
	releasePos = getNearestSquare(mousepos)

	if (button == mousedown){
		mousedown = 0;
	}
	
	if (button == 1) {
		if (lineStarted && (lineStartPos.x != releasePos.x ||
			lineStartPos.y != releasePos.y)){
			lineStarted = false;
			createLine(lineStartPos.x, lineStartPos.y, releasePos.x, releasePos.y)
		}
		if (dragging){
			dragging = false;
			var p = getNearestSquare({x: draggable.x, y: draggable.y})
			draggable.x = p.x
			draggable.y = p.y
		}
	}
	
	if (button == 2){
		var del = false
		for (var i=lines.length-1; i>=0; i--){
			if (lines[i].mouseover){
				del = true;
				lines.splice(i, 1);
			}
		}
		if (del){
			organizeLines(lines)
		}
		draggable = getDraggable(draggables, mousepos.x, mousepos.y)
		if (draggable != null){
			draggable.live = !draggable.live;
		}
		
	}
	
	lineStarted = false;
	
}

function mouseMove(event){
	mousemove = true;
	mousepos = getMousePos(event)
	nearestPos = getNearestSquare(mousepos)
	for (var i=0; i<lines.length; i++){
		lines[i].checkMouseOver(mousepos.x, mousepos.y)
		var x = lines[i]
		// checks if its the last line, and if not, pushes it to the last
		// so that the red dots are visible above other lines
		if (lines[i].mouseover){
			if (i != (lines.length-1)){
				lines.splice(i, 1);
				lines.push(x);
			}
		}
	}

	if (dragging){
		draggable.x = mousepos.x - dragOffset.x
		draggable.y = mousepos.y - dragOffset.y
	}
}


var i1 = new input(110, 110);
draggables.push(i1);