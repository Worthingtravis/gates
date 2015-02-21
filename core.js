var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
canvas.oncontextmenu = function(){
	return false;
}

var gameState = initializeGameState()

function initializeGameState(){
	var gs = {}
	gs.level = 0
	gs.entities = []


	gs.entities[0] = [
		new levelButton(145, 105, 1, 1, 0, 1, 0, "levelName"),
		new levelButton(225, 105, 2, 1, 0, 1, 0, "levelName"),
		new levelButton(305, 105, 3, 1, 0, 1, 0, "levelName"),
		new levelButton(385, 105, 4, 1, 0, 1, 0, "levelName"),
		new levelButton(465, 105, 5, 1, 0, 1, 0, "levelName"),
		]

	b = new menuButton(3, 3)
	gs.entities[1] = [b]
	return gs
}


function mouseDown(event){
	var rect = canvas.getBoundingClientRect();
	x = event.clientX - rect.left
	y = event.clientY - rect.top
	if(event.button == 0){
		for(var i=0; 
			i<gameState.entities[gameState.level].length;
			i++){
			gameState.entities[gameState.level][i].handleMouseDown(x, y, 0)
		}
	}
	else if(event.button == 2){
		for(var i=0; 
			i<gameState.entities[gameState.level].length;
			i++){
			gameState.entities[gameState.level][i].handleMouseDown(x, y, 2)
		}
	}
}

function mouseUp(event){
	var rect = canvas.getBoundingClientRect();
	x = event.clientX - rect.left
	y = event.clientY - rect.top
	if(event.button == 0){
		for(var i=0; 
			i<gameState.entities[gameState.level].length;
			i++){
			gameState.entities[gameState.level][i].handleMouseUp(x, y, 0)
		}
	}
	else if(event.button == 2){
		for(var i=0; 
			i<gameState.entities[gameState.level].length;
			i++){
			gameState.entities[gameState.level][i].handleMouseUp(x, y, 2)
		}
	}
}

function mouseMove(event){
	var rect = canvas.getBoundingClientRect();
	x = event.clientX - rect.left
	y = event.clientY - rect.top
	for(var i=0; 
		i<gameState.entities[gameState.level].length;
		i++){
		gameState.entities[gameState.level][i].handleMouseMove(x, y)
	}
}

function mouseIsOverBox(mx, my, ox, oy, ow, oh){
	//takes mouse x, y, and object x, y, width, and height
	return ((mx >= ox) && (mx <= ox+ow) && (my >= oy) && (my <= oy+oh))
}



function testEntity(x, y, width, height){
	this.x = x
	this.y = y
	this.width = width
	this.height = height
	this.color = '#FF0000'

	this.draw = function(){
		ctx.beginPath()
		ctx.rect(x, y, width, height)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	this.handleMouseDown = function(mx, my, mb){
		if (mouseIsOverBox(mx, my, this.x, this.y, this.width, this.height)){
			this.color = '#00FF00'
		}
	}
	this.handleMouseUp = function(mx, my, mb){
		if (mouseIsOverBox(mx, my, this.x, this.y, this.width, this.height)){
			this.color = '#FF0000'
		}
	}
	this.handleMouseMove = function(mx, my, mb){
		if (mouseIsOverBox(mx, my, this.x, this.y, this.width, this.height)){
			this.color = '#0000FF'
		}
	}
}


canvas.addEventListener('mousedown', mouseDown)
canvas.addEventListener('mouseup', mouseUp)
canvas.addEventListener('mousemove', mouseMove)

function gameLoop() {
	window.requestAnimationFrame(gameLoop);
	updateAndRender(ctx)
}
gameLoop();


