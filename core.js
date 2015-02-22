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
		new grid(0, 0, canvas.width, canvas.height),
		new levelButton(145, 105, 1, 1, 0, 1, 0, "levelName"),
		new levelButton(225, 105, 2, 1, 0, 1, 0, "levelName"),
		new levelButton(305, 105, 3, 1, 0, 1, 0, "levelName"),
		new levelButton(385, 105, 4, 1, 0, 1, 0, "levelName"),
		new levelButton(465, 105, 5, 1, 0, 1, 0, "levelName"),
		new lines(),
		]

	b = new menuButton(3, 3)
	gs.entities[1] = [new grid(0, 0, canvas.width, canvas.height), b,
		new lines()]
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

canvas.addEventListener('mousedown', mouseDown)
canvas.addEventListener('mouseup', mouseUp)
canvas.addEventListener('mousemove', mouseMove)

function gameLoop() {
	window.requestAnimationFrame(gameLoop);
	updateAndRender(ctx)
}
gameLoop();


