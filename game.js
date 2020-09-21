var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var score_text = document.getElementById("score");
var score = 0;

var level_text = document.getElementById("level");
var level = 0;

var lines_completed = 0;

var next_brick_text = document.getElementById("next_brick");

var audio_clear = new Audio('clear.wav');
var audio_success = new Audio('success.wav');
var audio_fall = new Audio('fall.wav');
var audio_gameover = new Audio('gameover.wav');

let sprite = document.getElementById("bricks_sprite");
// Define the size of individual sprite frame
let frameWidth = 84;
let frameHeight = 84;

var size = 40;

// bricks types
//const brickTypes = [".", "I", "o", "L", "T", "rL", "S", "rS"];
// implemented bricks 
const brickTypes = [".", "I", "L", "o", "T"];

// initial brick spawn parameters
/*var x = canvas.width/2;
var y = 0;
var color = Math.floor(Math.random() * Math.floor(7));
var brick_type = ".";
var brick_orientation = 1;*/
var x;
var y;
var color;
var brick_type;
var brick_orientation;

// next bricks parameters
var next_color;
var next_brick_type;
var next_brick_orientation;

// movement
var dx = size;
var dy = size;

// keyboard booleans
var rightPressed = false;
var leftPressed = false;
var downPressed = false;
var upPressed = false;

var rightReleased = true;
var leftReleased = true;
var downReleased = true;
var upReleased = true;

var collision_detected = false;

// bricks array & counter
var bricks = [];
/*for(var i=0; i<99; i++) 
{
    bricks[i] = { x: 0, y: 0, color: ""};
}*/
var brick_count = 0;

// spawn first brick
var firstBrick = true;


gameInit();

// init game parameters
function gameInit()
{
	score = 0;
	score_text.innerHTML = score;
	level = 0;
	level_text.innerHTML = level;
	brick_count = 0;
	firstBrick = true;

	brickInit();
}

// spawn new brick
function brickInit()
{
	if(!firstBrick)
	{
		audio_fall.play();
		score+=10;
		score_text.innerHTML = score;

		// store brick parameters
		// convert all shapes to single bricks for easier collision detection
		switch(brick_type)
		{
			case ".": // OK !
				// if brick is a dot, no conversion needed
				bricks[brick_count] = { x: x, y: y, color: color, brick_type: brick_type};
				brick_count++;

				console.log("saved brick .");
				break;
			case "I": // OK !
				switch(brick_orientation)
				{
					case 1:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// top brick
						bricks[brick_count] = { x: x, y: y-size, color: color, brick_type: "."};
						brick_count++;

						//bottom brick
						bricks[brick_count] = { x: x, y: y+size, color: color, brick_type: "."};
						brick_count++;

						// bottom bottom brick
						bricks[brick_count] = { x: x, y: y+size+size, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick I 1");
					break;
					case 2:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// left left brick
						bricks[brick_count] = { x: x-size-size, y: y, color: color, brick_type: "."};
						brick_count++;

						// left brick
						bricks[brick_count] = { x: x-size, y: y, color: color, brick_type: "."};
						brick_count++;

						// right brick
						bricks[brick_count] = { x: x+size, y: y, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick I 2");
					break;
					case 3:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// top top brick
						bricks[brick_count] = { x: x, y: y-size-size, color: color, brick_type: "."};
						brick_count++;

						// top brick
						bricks[brick_count] = { x: x, y: y-size, color: color, brick_type: "."};
						brick_count++;

						//bottom brick
						bricks[brick_count] = { x: x, y: y+size, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick I 3");
					break;
					case 4:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// left brick
						bricks[brick_count] = { x: x-size, y: y, color: color, brick_type: "."};
						brick_count++;

						// right brick
						bricks[brick_count] = { x: x+size, y: y, color: color, brick_type: "."};
						brick_count++;

						// right right brick
						bricks[brick_count] = { x: x+size+size, y: y, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick I 4");
					break;
				}
				break;
			case "o": // OK !
				// top left
				bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
				brick_count++;

				// bottom left
				bricks[brick_count] = { x: x, y: y+size, color: color, brick_type: "."};
				brick_count++;

				// top right
				bricks[brick_count] = { x: x+size, y: y, color: color, brick_type: "."};
				brick_count++;

				// bottom right
				bricks[brick_count] = { x: x+size, y: y+size, color: color, brick_type: "."};
				brick_count++;

				console.log("saved brick o");
				break;
			case "L": // OK !
				switch(brick_orientation)
				{
					case 1:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// left brick
						bricks[brick_count] = { x: x-size, y: y, color: color, brick_type: "."};
						brick_count++;

						// right brick
						bricks[brick_count] = { x: x+size, y: y, color: color, brick_type: "."};
						brick_count++;

						//bottom right brick
						bricks[brick_count] = { x: x+size, y: y+size, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick L 1");
						break;
					case 2:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// bottom left brick
						bricks[brick_count] = { x: x-size, y: y+size, color: color, brick_type: "."};
						brick_count++;

						// top brick
						bricks[brick_count] = { x: x, y: y-size, color: color, brick_type: "."};
						brick_count++;

						//bottom brick
						bricks[brick_count] = { x: x, y: y+size, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick L 2");
					break;
					case 3:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// left brick
						bricks[brick_count] = { x: x-size, y: y, color: color, brick_type: "."};
						brick_count++;

						// right brick
						bricks[brick_count] = { x: x+size, y: y, color: color, brick_type: "."};
						brick_count++;

						//top left brick
						bricks[brick_count] = { x: x-size, y: y-size, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick L 3");
						break;
					case 4:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// top right brick
						bricks[brick_count] = { x: x+size, y: y-size, color: color, brick_type: "."};
						brick_count++;

						// top brick
						bricks[brick_count] = { x: x, y: y-size, color: color, brick_type: "."};
						brick_count++;

						//bottom brick
						bricks[brick_count] = { x: x, y: y+size, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick L 4");
						break;
				}
				break;
			case "T": // OK !
				switch(brick_orientation)
				{
					case 1:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// top brick
						bricks[brick_count] = { x: x, y: y-size, color: color, brick_type: "."};
						brick_count++;

						// right brick
						bricks[brick_count] = { x: x+size, y: y, color: color, brick_type: "."};
						brick_count++;

						// bottom brick
						bricks[brick_count] = { x: x, y: y+size, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick T 1");
						break;
					case 2:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// right brick
						bricks[brick_count] = { x: x+size, y: y, color: color, brick_type: "."};
						brick_count++;

						// left brick
						bricks[brick_count] = { x: x-size, y: y, color: color, brick_type: "."};
						brick_count++;

						// bottom brick
						bricks[brick_count] = { x: x, y: y+size, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick T 2");
					break;
					case 3:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// top brick
						bricks[brick_count] = { x: x, y: y-size, color: color, brick_type: "."};
						brick_count++;

						// bottom brick
						bricks[brick_count] = { x: x, y: y+size, color: color, brick_type: "."};
						brick_count++;

						// left brick
						bricks[brick_count] = { x: x-size, y: y, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick T 3");
						break;
					case 4:
						// central dot
						bricks[brick_count] = { x: x, y: y, color: color, brick_type: "."};
						brick_count++;

						// right brick
						bricks[brick_count] = { x: x+size, y: y, color: color, brick_type: "."};
						brick_count++;

						// left brick
						bricks[brick_count] = { x: x-size, y: y, color: color, brick_type: "."};
						brick_count++;

						// top brick
						bricks[brick_count] = { x: x, y: y-size, color: color, brick_type: "."};
						brick_count++;

						console.log("saved brick T 4");
						break;
				}
				break;
			case "rL": // TODO
				switch(brick_orientation)
				{
					case 1:
					break;
					case 2:
					break;
					case 3:
					break;
					case 4:
					break;
				}
				break;
			case "S": // TODO
				switch(brick_orientation)
				{
					case 1:
					break;
					case 2:
					break;
					case 3:
					break;
					case 4:
					break;
				}
				break;
			case "rS": // TODO
				switch(brick_orientation)
				{
					case 1:
					break;
					case 2:
					break;
					case 3:
					break;
					case 4:
					break;
				}
				break;
		}
		
		// line completion check
		detectLineCompletion();

		// set new brick parameters
		x = canvas.width/2;
		y = -size;
		
		// pickup previously generated shape
		brick_type = next_brick_type;
		// choose next brick shape randomly
		next_brick_type = getRandomBrick();	

		// pickup previously generated orientation
		brick_orientation = next_brick_orientation;
		// choose next orientation randomly
		next_brick_orientation = Math.floor(Math.random() * Math.floor(4))+1;
		// TODO : check if Tetris randomize brick orientation
		// if not set default
		//brick_orientation = 1;

		// pickup previously generated color
		color = next_color;
		// choose next color randomly
		next_color = Math.floor(Math.random() * Math.floor(7));
		
		// check if brick has reached top
		for(var i=0; i<brick_count; i++)
		{
			if(y+dy>=bricks[i].y && x==bricks[i].x)
			{
				audio_gameover.play();
				alert("GAME OVER !");
	
				gameInit();
			}
		}
		
		// useless ?
		//collision_detected = false;

		// needed to prevent always full falling speed glitch after game over
		downPressed = false;
	}
	else
	{
		// set new brick parameters
		x = canvas.width/2;
		y = -size;
		
		// pickup random shape for first brick
		brick_type = getRandomBrick();
		// choose next brick shape randomly
		next_brick_type = getRandomBrick();	

		// pickup random orientation for first brick
		brick_orientation = Math.floor(Math.random() * Math.floor(4))+1;
		// choose next orientation randomly
		next_brick_orientation = Math.floor(Math.random() * Math.floor(4))+1;
		// TODO : check if Tetris randomize brick orientation
		// if not set default
		//brick_orientation = 1;

		// pickup random color for first brick
		color = Math.floor(Math.random() * Math.floor(7));
		// choose next color randomly
		next_color = Math.floor(Math.random() * Math.floor(7));

		firstBrick = false;
		downPressed = false;
	}

	// display next brick
	next_brick_text.innerHTML = next_brick_type;
}

// move or rotate current brick
function move() 
{
	if(rightPressed && rightReleased) 
	{
		rightReleased = false;
		moveBrick("right");
    	rightPressed = false;
	}
	else if(leftPressed && leftReleased) 
	{
		leftReleased = false;
		moveBrick("left");
	    leftPressed = false;
	}
	else if(downPressed)
	{
		moveBrick("down");
	}
	else if(upPressed && upReleased) 
	{
		upReleased = false;
		rotateBrick();	    
	    upPressed = false;
	}
}

function fall()
{
	moveBrick("down");
}

function draw() 
{
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawBrick(x, y, color, brick_type, brick_orientation);

	if(brick_count > 0)
	{
		for(var i=0; i<brick_count; i++)
		{
			drawBrick(bricks[i].x, bricks[i].y, bricks[i].color, bricks[i].brick_type, bricks[i].brick_orientation);
		}
	}
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var fallId = setInterval(fall, 600-(level*10*2));
var drawId = setInterval(draw, 10);
var moveId = setInterval(move, 50);

// rotate current brick (if there's no collision with walls or other bricks)
function rotateBrick()
{
	// init collision boolean
	collision_detected = false;

	// if brick count > 0, detect collisions with other bricks
	if(brick_count > 0)
	{
		for(var i=0; i<brick_count; i++)
		{
			switch(brick_type)
			{
				case ".": // OK !
					// no rotation - skip
					break;
				case "I": // OK !
					switch(brick_orientation)
					{
						case 1: // next 2
							// main brick
							if(x==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// left left brick
							if(x-size-size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// left brick
							if(x-size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// right brick
							if(x+size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
						break;
						case 2:
							// main brick
							if(x==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// top top brick
							if(x==bricks[i].x && y-size-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// top brick
							if(x==bricks[i].x && y-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// bottom brick
							if(x==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}							
						break;
						case 3:
							// main brick
							if(x==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// left brick
							if(x-size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// right brick
							if(x+size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// right right brick
							if(x+size+size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
						break;
						case 4:
							// main brick
							if(x==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// top brick
							if(x==bricks[i].x && y-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// bottom brick
							if(x==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// bottom bottom brick
							if(x==bricks[i].x && y+size+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
						break;
					}
					break;
				case "o": // OK !
					// no rotation - skip
					break;
				case "L": // OK !
					switch(brick_orientation)
					{
						case 1: // next orientation is 2
							// top brick
							if(x==bricks[i].x && y-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// bottom brick
							if(x==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// bottom left brick
							if(x-size==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							break;
						case 2: // next is 3
							// right brick
							if(x+size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// top left brick
							if(x-size==bricks[i].x && y-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// left brick
							if(x-size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							break;
						case 3: // next is 4
							// top brick
							if(x==bricks[i].x && y-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// top right brick
							if(x+size==bricks[i].x && y-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// bottom brick
							if(x==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							break;
						case 4: // next is 1
							// left brick
							if(x-size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// right brick
							if(x+size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// bottom right brick
							if(x+size==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							break;
					}
					break;
				case "T": // OK !
					switch(brick_orientation)
					{
						case 1: // next orientation is 2
							// bottom brick
							if(x==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// left brick
							if(x-size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// right brick
							if(x+size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							break;
						case 2: // next is 3
							// top brick
							if(x==bricks[i].x && y-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// bottom brick
							if(x==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// left brick
							if(x-size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							break;
						case 3: // next is 4
							// top brick
							if(x==bricks[i].x && y-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// left brick
							if(x-size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// right brick
							if(x+size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							break;
						case 4: // next is 1
							// right brick
							if(x+size==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// top brick
							if(x==bricks[i].x && y-size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							// bottom brick
							if(x==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing rotation.");
							}
							break;
					}
					break;
				case "rL": // TODO
					switch(brick_orientation)
					{
						case 1:
						break;
						case 2:
						break;
						case 3:
						break;
						case 4:
						break;
					}
					break;
				case "S": // TODO
					switch(brick_orientation)
					{
						case 1:
						break;
						case 2:
						break;
						case 3:
						break;
						case 4:
						break;
					}
					break;
				case "rS": // TODO
					switch(brick_orientation)
					{
						case 1:
						break;
						case 2:
						break;
						case 3:
						break;
						case 4:
						break;
					}
					break;
			}	
		}
	}

	// detect collisions with walls
	switch(brick_type)
	{
		case ".": // OK !
			// no rotation - skip
			break;
		case "I": // OK !
			switch(brick_orientation)
			{
				case 1:
					// right brick with right wall
					if(x+size+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// left left brick with left wall
					if(x-size-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
				break;
				case 2:
				break;
				case 3:
					// right right brick with right wall
					if(x+size+size+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// left brick with left wall
					if(x-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
				break;
				case 4:
					
				break;
			}
			break;
		case "o": // OK !
			// no rotation - skip
			break;
		case "L": // OK !
			switch(brick_orientation)
			{
				case 1: // next orientation is 2
					// central brick with right wall
					if(x+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// bottom left brick with left wall
					if(x-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					break;
				case 2: // next is 3
					// right brick with right wall
					if(x+size+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// left brick with left wall
					if(x-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					break;
				case 3: // next is 4
					// top right brick with right wall
					if(x+size+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// central brick with left wall
					if(x-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					break;
				case 4: // next is 1
					// right brick with right wall
					if(x+size+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// central brick with left wall
					if(x-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					break;
			}
			break;
		case "T": // OK !
			switch(brick_orientation)
			{
				case 1: // next orientation is 2
					// right brick with right wall
					if(x+size+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// left brick with left wall
					if(x-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					break;
				case 2: // next is 3
					// central brick with right wall
					if(x+size+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// left brick with left wall
					if(x-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					break;
				case 3: // next is 4
					// right brick with right wall
					if(x+size+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// left brick with left wall
					if(x-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					break;
				case 4: // next is 1
					// right brick with right wall
					if(x+size+size > canvas.width)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					// central brick with left wall
					if(x-size < 0)
					{
						collision_detected = true;
						console.log("Collision detected preventing rotation.");
					}
					break;
			}
			break;
		case "rL": // TODO
			switch(brick_orientation)
			{
				case 1:
				break;
				case 2:
				break;
				case 3:
				break;
				case 4:
				break;
			}
			break;
		case "S": // TODO
			switch(brick_orientation)
			{
				case 1:
				break;
				case 2:
				break;
				case 3:
				break;
				case 4:
				break;
			}
			break;
		case "rS": // TODO
			switch(brick_orientation)
			{
				case 1:
				break;
				case 2:
				break;
				case 3:
				break;
				case 4:
				break;
			}
			break;
	}

	// if a collision wasn't detected, rotate brick
	if(!collision_detected)
	{
		if (brick_orientation < 4)
	        brick_orientation++;
	    else
	    	brick_orientation = 1;
	}
}

// move current brick (if there's no collision with walls or other bricks)
function moveBrick(direction)
{
	// init collision boolean
	collision_detected = false;

	switch(direction)
	{
		case "left":
			// if brick count > 0, detect collisions with other bricks
			if(brick_count > 0)
			{
				for(var i=0; i<brick_count; i++)
				{
					switch(brick_type)
					{
						case ".": // OK !
							if(x-dx==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing left movement.");
							}
							break;
						case "I": // OK !
							switch(brick_orientation)
							{
								case 1:
									// top
									if(x-dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// center
									if(x-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// bottom
									if(x-dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// bottom bottom
									if(x-dx==bricks[i].x && y+size+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
								break;
								case 2:
									if(x-size-size-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
								break;
								case 3:
									// top top
									if(x-dx==bricks[i].x && y-size-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// top
									if(x-dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// center
									if(x-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// bottom
									if(x-dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
								break;
								case 4:
									if(x-size-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
								break;
							}
							break;
						case "o": // OK !
							// top left brick
							if(x-dx==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing left movement.");
							}
							// bottom left brick
							if(x-dx==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing left movement.");
							}
							break;
						case "L": // OK !
							switch(brick_orientation)
							{
								case 1:
									// left brick
									if(x-size-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// bottom right brick
									if(x+size-dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									break;
								case 2:
									// central brick
									if(x-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// top brick
									if(x-dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// bottom left brick
									if(x-size-dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									break;
								case 3:
									// left brick
									if(x-size-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// top left brick
									if(x-size-dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									break;
								case 4:
									// central brick
									if(x-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// top brick
									if(x-dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// bottom brick
									if(x-dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									break;
							}
							break;
						case "T": // OK !
							switch(brick_orientation)
							{
								case 1:
									// central brick
									if(x-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// top brick
									if(x-dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// bottom brick
									if(x-dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									break;
								case 2:
									// left brick
									if(x-size-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// bottom brick
									if(x-dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									break;
								case 3:
									// top brick
									if(x-dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// left brick
									if(x-size-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// bottom brick
									if(x-dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									break;
								case 4:
									// top brick
									if(x-dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									// left brick
									if(x-size-dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing left movement.");
									}
									break;
							}
							break;
						case "rL": // TODO
							switch(brick_orientation)
							{
								case 1:
								break;
								case 2:
								break;
								case 3:
								break;
								case 4:
								break;
							}
							break;
						case "S": // TODO
							switch(brick_orientation)
							{
								case 1:
								break;
								case 2:
								break;
								case 3:
								break;
								case 4:
								break;
							}
							break;
						case "rS": // TODO
							switch(brick_orientation)
							{
								case 1:
								break;
								case 2:
								break;
								case 3:
								break;
								case 4:
								break;
							}
							break;
					}
				}
			}

			// detect walls collision according to shape
		    switch(brick_type)
			{
				case ".": // OK !
					if (x-dx < 0)
				    {
				        collision_detected = true;
				        console.log("Collision detected preventing left movement.");
				    }
					break;
				case "I": // OK !
					switch(brick_orientation)
					{
						case 1:
							if (x-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }
						break;
						case 2:
							if (x-size-size-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }
						break;
						case 3:
							if (x-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }
						break;
						case 4:
							if (x-size-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }
						break;
					}
					break;
				case "o": // OK !
					if (x-dx < 0)
				    {
				        collision_detected = true;
				        console.log("Collision detected preventing left movement.");
				    }
					break;
				case "L": // OK !
					switch(brick_orientation)
					{
						case 1:
							if (x-size-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }							
							break;
						case 2:
							if (x-size-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }							
							break;
						case 3:
							if (x-size-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }
							break;
						case 4:
							if (x-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }
							break;
					}
					break;
				case "T": // OK !
					switch(brick_orientation)
					{
						case 1:
							if (x-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }							
							break;
						case 2:
							if (x-size-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }							
							break;
						case 3:
							if (x-size-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }
							break;
						case 4:
							if (x-size-dx < 0)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing left movement.");
						    }
							break;
					}
					break;
				case "rL": // TODO
					switch(brick_orientation)
					{
						case 1:
						break;
						case 2:
						break;
						case 3:
						break;
						case 4:
						break;
					}
					break;
				case "S": // TODO
					switch(brick_orientation)
					{
						case 1:
						break;
						case 2:
						break;
						case 3:
						break;
						case 4:
						break;
					}
					break;
				case "rS": // TODO
					switch(brick_orientation)
					{
						case 1:
						break;
						case 2:
						break;
						case 3:
						break;
						case 4:
						break;
					}
					break;
			}
			
			// if a collision wasn't detected, move
			if(!collision_detected)
				x -= dx;
			break;
		case "right":
			// if brick count > 0, detect collisions with other bricks
			if(brick_count > 0)
			{
				for(var i=0; i<brick_count; i++)
				{
					switch(brick_type)
					{
						case ".": // OK !
							if(x+dx==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing right movement.");
							}
							break;
						case "I": // OK !
							switch(brick_orientation)
							{
								case 1:
									// top
									if(x+dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// center
									if(x+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// bottom
									if(x+dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// bottom bottom
									if(x+dx==bricks[i].x && y+size+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
								break;
								case 2:
									if(x+size+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
								break;
								case 3:
									// top top
									if(x+dx==bricks[i].x && y-size-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// top
									if(x+dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// center
									if(x+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// bottom
									if(x+dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
								break;
								case 4:
									if(x+size+size+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
								break;
							}
							break;
						case "o": // OK !
							// top right
							if(x+size+dx==bricks[i].x && y==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing right movement.");
							}
							// bottom right
							if(x+size+dx==bricks[i].x && y+size==bricks[i].y)
							{
								collision_detected = true;
								console.log("Collision detected preventing right movement.");
							}
							break;
						case "L": // OK !
							switch(brick_orientation)
							{
								case 1:
									// right brick
									if(x+size+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// bottom right brick
									if(x+size+dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
								case 2:
									// central brick
									if(x+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// top brick
									if(x+dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// bottom brick
									if(x+dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
								case 3:
									// right brick
									if(x+size+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// top left brick
									if(x-size+dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
								case 4:
									// central brick
									if(x+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// top right brick
									if(x+size+dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// bottom brick
									if(x+dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
							}
							break;
						case "T": // OK !
							switch(brick_orientation)
							{
								case 1:
									// right brick
									if(x+size+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// bottom brick
									if(x+dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
									// top brick
									if(x+dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
								case 2:
									// right brick
									if(x+size+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// bottom brick
									if(x+dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
								case 3:
									// center brick
									if(x+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// bottom brick
									if(x+dx==bricks[i].x && y+size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
									// top brick
									if(x+dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
								case 4:
									// right brick
									if(x+size+dx==bricks[i].x && y==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									// top brick
									if(x+dx==bricks[i].x && y-size==bricks[i].y)
									{
										collision_detected = true;
										console.log("Collision detected preventing right movement.");
									}
									break;
							}
							break;
						case "rL": // TODO
							switch(brick_orientation)
							{
								case 1:
								break;
								case 2:
								break;
								case 3:
								break;
								case 4:
								break;
							}
							break;
						case "S": // TODO
							switch(brick_orientation)
							{
								case 1:
								break;
								case 2:
								break;
								case 3:
								break;
								case 4:
								break;
							}
							break;
						case "rS": // TODO
							switch(brick_orientation)
							{
								case 1:
								break;
								case 2:
								break;
								case 3:
								break;
								case 4:
								break;
							}
							break;
					}	
				}
			}

			// detect walls collision according to shape
		    switch(brick_type)
			{
				case ".": // OK !
					if (x+size+dx > canvas.width)
				    {
				        collision_detected = true;
				        console.log("Collision detected preventing right movement.");
				    }
					break;
				case "I": // OK !
					switch(brick_orientation)
					{
						case 1:
							if (x+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }
						break;
						case 2:
							if (x+size+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }
						break;
						case 3:
							if (x+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }
						break;
						case 4:
							if (x+size+size+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }
						break;
					}
					break;
				case "o": // OK !
					if (x+size+size+dx > canvas.width)
				    {
				        collision_detected = true;
				        console.log("Collision detected preventing right movement.");
				    }
					break;
				case "L": // OK !
					switch(brick_orientation)
					{
						case 1:
							if (x+size+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }							
							break;
						case 2:
							if (x+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }							
							break;
						case 3:
							if (x+size+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }
							break;
						case 4:
							if (x+size+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }
							break;
					}
					break;
				case "T": // OK !
					switch(brick_orientation)
					{
						case 1:
							if (x+size+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }							
							break;
						case 2:
							if (x+size+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }							
							break;
						case 3:
							if (x+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }
							break;
						case 4:
							if (x+size+size+dx > canvas.width)
						    {
						        collision_detected = true;
						        console.log("Collision detected preventing right movement.");
						    }
							break;
					}
					break;
				case "rL": // TODO
					switch(brick_orientation)
					{
						case 1:
						break;
						case 2:
						break;
						case 3:
						break;
						case 4:
						break;
					}
					break;
				case "S": // TODO
					switch(brick_orientation)
					{
						case 1:
						break;
						case 2:
						break;
						case 3:
						break;
						case 4:
						break;
					}
					break;
				case "rS": // TODO
					switch(brick_orientation)
					{
						case 1:
						break;
						case 2:
						break;
						case 3:
						break;
						case 4:
						break;
					}
					break;
			}

	    	// if a collision wasn't detected, move
	    	if(!collision_detected)
				x += dx;

			break;
		case "down":
			// if bottom collision detected, spawn new brick
			detectBottom();
			// else detect collisions between bricks & move :
			if(brick_count > 0)
			{
				for(var i=0; i<brick_count; i++)
				{
					switch(brick_type)
					{
						case ".": // OK !
							if(y+dy==bricks[i].y && x==bricks[i].x)
							{
				  				collision_detected = true;
				  				console.log("Collision detected preventing bottom movement.");
							}
							break;
						case "I": // OK !
							switch(brick_orientation)
							{
								case 1:
									if(y+size+size+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
								break;
								case 2:
									//center brick
									if(y+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//left brick
									if(y+dy==bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//left left brick
									if(y+dy==bricks[i].y && x-size-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									// right brick
									if(y+dy==bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
								break;
								case 3:
									if(y+size+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
								break;
								case 4:
									//center brick
									if(y+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//left brick
									if(y+dy==bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									// right brick
									if(y+dy==bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//right right brick
									if(y+dy==bricks[i].y && x+size+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
								break;
							}
							break;
						case "o": // OK !
							// bottom left 
							if(y+size+dy==bricks[i].y && x==bricks[i].x)
							{
				  				collision_detected = true;
				  				console.log("Collision detected preventing bottom movement.");
							}
							// bottom right 
							if(y+size+dy==bricks[i].y && x+size==bricks[i].x)
							{
				  				collision_detected = true;
				  				console.log("Collision detected preventing bottom movement.");
							}
							break;
						case "L": // OK !
							switch(brick_orientation)
							{
								case 1:
									//center brick
									if(y+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//left brick
									if(y+dy==bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//right brick
									if(y+dy==bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom right brick
									if(y+size+dy==bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
								case 2:
									//center brick
									if(y+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom brick
									if(y+size+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom left brick
									if(y+size+dy==bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//top brick - useless
									if(y-size+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
								case 3:
									//center brick
									if(y+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//left brick
									if(y+dy==bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//right brick
									if(y+dy==bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//top left brick
									if(y-size+dy==bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
								case 4:
									//center brick
									if(y+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom brick
									if(y+size+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//top right brick
									if(y-size+dy==bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//top brick - useless
									if(y-size+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
							}
							break;
						case "T": // OK !
							switch(brick_orientation)
							{
								case 1:
									//right brick
									if(y+dy==bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom brick
									if(y+size+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
								case 2:
									//bottom brick
									if(y+size+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//left brick
									if(y+dy==bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//right brick
									if(y+dy==bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
								case 3:
									//left brick
									if(y+dy==bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom brick
									if(y+size+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
								case 4:
									//center brick
									if(y+dy==bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//left brick
									if(y+dy==bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//right brick
									if(y+dy==bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
							}
							break;
						case "rL": // TODO
							switch(brick_orientation)
							{
								case 1:
								break;
								case 2:
								break;
								case 3:
								break;
								case 4:
								break;
							}
							break;
						case "S": // TODO
							switch(brick_orientation)
							{
								case 1:
								break;
								case 2:
								break;
								case 3:
								break;
								case 4:
								break;
							}
							break;
						case "rS": // TODO
							switch(brick_orientation)
							{
								case 1:
								break;
								case 2:
								break;
								case 3:
								break;
								case 4:
								break;
							}
							break;
					}	
				}
				// if a collision wasn't detected, move
				if(!collision_detected)
					y += dy;
				else // otherwise, don't move and spawn new brick
					brickInit();
			}
			else
				y += dy;
			break;
		default:
			console.log("/!\ Wrong direction given when detecting collisions");
	}
}

function detectLineCompletion()
{
	// compute number of blocks in line
	var nb_bricks_in_line = canvas.width/size;
	var nb_bricks_height = canvas.height/size;

	var lines_completed_array = [];

	// for every line
	for(var k=0; k<nb_bricks_height; k++)
	{
		var column = [];
		// for each column
		for(var j=0; j<nb_bricks_in_line; j++)
		{
			// assume brick isn't present
			column[j] = false;
		}

		// for each column
		for(var j=0; j<nb_bricks_in_line; j++)
		{
			// check if a brick is present
			for(var i=0; i<brick_count; i++)
			{
				if(bricks[i].y===k*size && bricks[i].x===j*size)
				{
					//console.log("a brick is present is pos "+j);
					column[j] = true;
				}
			}
		}

		// assume line is completed
		var line_completed = true;
		for(var j=0; j<nb_bricks_in_line; j++)
		{
			if(column[j]===false)
			{
				line_completed = false;
			}
		}

		if(line_completed)
		{
			lines_completed_array.push(k);
			lines_completed++;
			if(lines_completed==10)
			{
				audio_success.play();

				changeFallSpeed();

				level++;
				level_text.innerHTML = level;
				lines_completed = 0;
			}
		}
	}

	if(lines_completed_array.length>0)
	{
		audio_clear.play();
	}

	switch(lines_completed_array.length)
	{
		case 1:
			score+=40*(level+1);
			score_text.innerHTML = score;
			break;
		case 2:
			score+=100*(level+1);
			score_text.innerHTML = score;
			break;
		case 3:
			score+=300*(level+1);
			score_text.innerHTML = score;
			break;
		case 4:
			score+=1200*(level+1);
			score_text.innerHTML = score;
			break;
	}

	for(k=0;k<lines_completed_array.length;k++)
	{
		console.log("line "+lines_completed_array[k]+" is complete !");

		// clear line
		var i = bricks.length;
		while (i--) 
		{
		    if (bricks[i].y===lines_completed_array[k]*size) 
		    { 
		        bricks.splice(i, 1);
				brick_count--;
		    } 
		}

		// shift remaining bricks
		for(var i=0; i<brick_count; i++)
		{
			// for bricks above
			if (bricks[i].y<lines_completed_array[k]*size)
			{
				bricks[i].y+=size;
			}	
		}
	}	
}

// detect if brick has reached bottom
function detectBottom()
{
	switch(brick_type)
	{
		case ".": // OK !
			if(y+dy>canvas.height-size)
				brickInit();
			break;
		case "I": // OK !
			switch(brick_orientation)
			{
				case 1:
					if(y+size+size+dy>canvas.height-size)
						brickInit();
					break;
				case 2:
					if(y+dy>canvas.height-size)
						brickInit();
					break;
				case 3:
					if(y+size+dy>canvas.height-size)
						brickInit();
					break;
				case 4:
					if(y+dy>canvas.height-size)
						brickInit();
					break;
			}
			break;
		case "o": // OK !
			if(y+size+dy>canvas.height-size)
				brickInit();
			break;
		case "L": // OK !
			switch(brick_orientation)
			{
				case 1:
					if(y+size+dy>canvas.height-size)
						brickInit();
					break;
				case 2:
					if(y+size+dy>canvas.height-size)
						brickInit();
					break;
				case 3:
					if(y+dy>canvas.height-size)
						brickInit();
					break;
				case 4:
					if(y+size+dy>canvas.height-size)
						brickInit();
					break;
			}
			break;
		case "T": // OK !
			switch(brick_orientation)
			{
				case 1:
					if(y+size+dy>canvas.height-size)
						brickInit();
					break;
				case 2:
					if(y+size+dy>canvas.height-size)
						brickInit();
					break;
				case 3:
					if(y+size+dy>canvas.height-size)
						brickInit();
					break;
				case 4:
					if(y+dy>canvas.height-size)
						brickInit();
					break;
			}
			break;
		case "rL": // TODO
			switch(brick_orientation)
			{
				case 1:
				break;
				case 2:
				break;
				case 3:
				break;
				case 4:
				break;
			}
			break;
		case "S": // TODO
			switch(brick_orientation)
			{
				case 1:
				break;
				case 2:
				break;
				case 3:
				break;
				case 4:
				break;
			}
			break;
		case "rS": // TODO
			switch(brick_orientation)
			{
				case 1:
				break;
				case 2:
				break;
				case 3:
				break;
				case 4:
				break;
			}
			break;
	}
}

function getRandomBrick()
{
	// choose random shape
	const random = Math.floor(Math.random() * brickTypes.length);
	return brickTypes[random];
}

function getRandomInt(max) 
{
  return Math.floor(Math.random() * Math.floor(max));
}

function drawBrick(x, y, color, brick_type, brick_orientation)
{
	switch(brick_type)
	{
		case ".": // OK !
			ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
			break;
		case "I": // OK !
			switch(brick_orientation)
			{
				case 1:
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y-size, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y+size, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y+size+size, size, size);
					break;
				case 2:
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size-size, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size, y, size, size);
					break;
				case 3:
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y-size, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y+size, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y-size-size, size, size);
					break;
				case 4:
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size+size, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size, y, size, size);
					break;
			}
			break;
		case "o": // OK !
			ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
			ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y, size, size);
			ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y+size, size, size);
			ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y+size, size, size);
			break;
		case "L": // OK !
			switch(brick_orientation)
			{
				case 1:
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y+size, size, size);
					break;
				case 2:
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y-size, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y+size, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size, y+size, size, size);
					break;
				case 3:
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size, y-size, size, size);
					break;
				case 4:
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y-size, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y+size, size, size);
					ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y-size, size, size);
					break;
			}
			break;
		case "T": // OK ! 
			switch(brick_orientation)
			{
				case 1:
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y-size, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y+size, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y, size, size);
				break;
				case 2:
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size, y, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y+size, size, size);
				break;
				case 3:
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size, y, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y-size, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y+size, size, size);
				break;
				case 4:
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x, y-size, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x+size, y, size, size);
				ctx.drawImage(sprite, color*frameWidth, 0, frameWidth, frameHeight, x-size, y, size, size);
				break;
			}
			break;
		case "rL": // TODO
			switch(brick_orientation)
			{
				case 1:
				break;
				case 2:
				break;
				case 3:
				break;
				case 4:
				break;
			}
			break;
		case "S": // TODO
			switch(brick_orientation)
			{
				case 1:
				break;
				case 2:
				break;
				case 3:
				break;
				case 4:
				break;
			}
			break;
		case "rS": // TODO
			switch(brick_orientation)
			{
				case 1:
				break;
				case 2:
				break;
				case 3:
				break;
				case 4:
				break;
			}
			break;
	}
}

function changeFallSpeed()
{
	clearInterval(fallId);
	var fallId = setInterval(fall, 600-(level*10));
}

function keyDownHandler(e) 
{
    if(e.key == "Right" || e.key == "ArrowRight") 
    {   	
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft")
    {	
        leftPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown")
    {
    	downPressed = true;
    }
    else if(e.key == "Up" || e.key == "ArrowUp")
    {	
        upPressed = true;
    }
}

function keyUpHandler(e) 
{
    if(e.key == "Right" || e.key == "ArrowRight")
        rightReleased = true;
    else if(e.key == "Left" || e.key == "ArrowLeft")
        leftReleased = true;
    else if(e.key == "Down" || e.key == "ArrowDown")
        downPressed = false;
    else if(e.key == "Up" || e.key == "ArrowUp")
        upReleased = true;
}
