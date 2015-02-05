var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;
canvas.oncontextmenu = function(e){
	return false;
}

var game = {};
var gameState = 0 //tells you if your on main menu or one of the levels
var levelsUnlocked = [1, 1, 1, 0, 0, 0, 0, 0, 0, 0]

var now, 
	dt = 0,
	last = timestamp(),
	step = 1/60;


function timestamp(){
	if (window.performance && window.performance.now){
		return window.performance.now()
	}
	else {
		return (new Date).getTime();
	}
}

function frame() {
	now = timestamp();
	dt = dt + Math.min(1, (now-last)/1000); //duration capped at 1.0 seconds

	//update()
	
	draw(dt);
	last = now;
	requestAnimationFrame(frame);
}

canvas.addEventListener('mousedown', function(e) { 
	return update(e, 'mousedown');  }, false);

canvas.addEventListener('mouseup',   function(e) { 
	return update(e, 'mouseup'); }, false);

canvas.addEventListener('mousemove',   function(e) { 
	return update(e, 'mousemove'); }, false);

requestAnimationFrame(frame);


