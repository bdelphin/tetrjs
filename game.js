var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var size = 40;

// bricks types
const brickTypes = [".", "I", "o", "L", "T", "rL", "S", "rS"];

// to choose random shape
//const random = Math.floor(Math.random() * brickTypes.length);
//console.log(random, brickTypes[random]);

// initial brick spawn parameters
var x = canvas.width/2;
var y = 0;
var color = "rgba("+getRandomInt(255)+","+getRandomInt(255)+","+getRandomInt(255)+",1)";
var brick_type = ".";
var brick_orientation = 1;

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
for(var i=0; i<99; i++) 
{
    bricks[i] = { x: 0, y: 0, color: ""};
}
var brick_count = 0;

// spawn new brick
function brickInit()
{
	// store brick parameters
	// convert all shapes to single bricks for easier collision detection
	switch(brick_type)
	{
		case ".": // OK
			// if brick is a dot, no conversion needed
			bricks[brick_count].x = x;
			bricks[brick_count].y = y;
			bricks[brick_count].color = color;
			bricks[brick_count].brick_type = brick_type;
			//bricks[brick_count].brick_orientation = brick_orientation; // useless
			brick_count++;

			console.log("saved brick .");
			break;
		case "I":
			switch(brick_orientation)
			{
				case "1":
				break;
				case "2":
				break;
				case "3":
				break;
				case "4":
				break;
			}
		break;
		case "o":
			switch(brick_orientation)
			{
				case "1":
				break;
				case "2":
				break;
				case "3":
				break;
				case "4":
				break;
			}
		break;
		case "L": // OK
			switch(brick_orientation)
			{
				case 1:
					// central dot
					bricks[brick_count].x = x;
					bricks[brick_count].y = y;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					// left brick
					bricks[brick_count].x = x-size;
					bricks[brick_count].y = y;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					// right brick
					bricks[brick_count].x = x+size;
					bricks[brick_count].y = y;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					//bottom right brick
					bricks[brick_count].x = x+size;
					bricks[brick_count].y = y+size;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					console.log("saved brick L 1");
					break;
				case 2:
					// central dot
					bricks[brick_count].x = x;
					bricks[brick_count].y = y;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					// bottom left brick
					bricks[brick_count].x = x-size;
					bricks[brick_count].y = y+size;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					// top brick
					bricks[brick_count].x = x;
					bricks[brick_count].y = y-size;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					//bottom brick
					bricks[brick_count].x = x;
					bricks[brick_count].y = y+size;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					console.log("saved brick L 2");
				break;
				case 3:
					// central dot
					bricks[brick_count].x = x;
					bricks[brick_count].y = y;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					// left brick
					bricks[brick_count].x = x-size;
					bricks[brick_count].y = y;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					// right brick
					bricks[brick_count].x = x+size;
					bricks[brick_count].y = y;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					//top left brick
					bricks[brick_count].x = x-size;
					bricks[brick_count].y = y-size;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					console.log("saved brick L 3");
					break;
				case 4:
					// central dot
					bricks[brick_count].x = x;
					bricks[brick_count].y = y;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					// top right brick
					bricks[brick_count].x = x+size;
					bricks[brick_count].y = y-size;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					// top brick
					bricks[brick_count].x = x;
					bricks[brick_count].y = y-size;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					//bottom brick
					bricks[brick_count].x = x;
					bricks[brick_count].y = y+size;
					bricks[brick_count].color = color;
					bricks[brick_count].brick_type = ".";
					brick_count++;

					console.log("saved brick L 4");
					break;
			}
		break;
		case "T":
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
		case "rL":
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
		case "S":
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
		case "rS":
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
	

	// set new brick parameters
	x = canvas.width/2;
	y = -size;
	// TODO : randomize brick shape
	brick_type = "L";
	color = "rgba("+getRandomInt(255)+","+getRandomInt(255)+","+getRandomInt(255)+",1)";

	if(brick_count > 0)
	{
		for(var i=0; i<brick_count; i++)
		{
			if(y+dy>=bricks[i].y && x==bricks[i].x)
			{
				alert("GAME OVER !");
				
				brick_count = 0;
			}
		}
	}

	downPressed = false;
	collision_detected = false;
}

// move current brick left or right
function move() 
{
	if(rightPressed && rightReleased) 
	{
		rightReleased = false;

		// collision test
		moveBrick("right");
    	
    	// TODO : replace this with detectWalls() to handle each shape
    	if (x + size > canvas.width)
    	{
        	x = canvas.width - size;
    	}
    	rightPressed = false;
    	collision_detected = false;
	}
	else if(leftPressed && leftReleased) 
	{
		leftReleased = false;

		// collision test
		moveBrick("left");

		// TODO : replace this with detectWalls() to handle each shape
	    if (x < 0)
	    {
	        x = 0;
	    }
	    leftPressed = false;
	    collision_detected = false;
	}
	else if(downPressed)
	{
		detectBottom();

		// if bottom isn't reached :
		moveBrick("down");
	}
	else if(upPressed && upReleased) 
	{
		upReleased = false;

		// TODO : implement rotation collision detection

	    if (brick_orientation < 4)
	    {
	        brick_orientation++;
	    }
	    else
	    {
	    	brick_orientation = 1;
	    }
	    upPressed = false;
	}
}

function fall()
{
	detectBottom();

	// if bottom isn't reached :
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

var fallId = setInterval(fall, 600);
var drawId = setInterval(draw, 10);
var moveId = setInterval(move, 50);

// move current brick (and detect collisions)
function moveBrick(direction)
{
	switch(direction)
	{
		case "left":
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
						case "I": // TODO
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
						case "o": // TODO
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
						case "L":
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
						case "T": // TODO
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
					x -= dx;
			}
			else
				x -= dx;
			break;
		case "right":
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
						case "I": // TODO
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
						case "o": // TODO
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
						case "T": // TODO
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
					x += dx;
			}
			else
				x += dx;
			break;
		case "down":
			if(brick_count > 0)
			{
				for(var i=0; i<brick_count; i++)
				{
					switch(brick_type)
					{
						case ".": // OK
							if(y+dy>=bricks[i].y && x==bricks[i].x)
							{
				  				collision_detected = true;
				  				console.log("Collision detected preventing bottom movement.");
							}
							break;
						case "I": // TODO
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
						case "o": // TODO
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
						case "L": // OK
							switch(brick_orientation)
							{
								case 1:
									//center brick
									if(y+dy>=bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//left brick
									if(y+dy>=bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//right brick
									if(y+dy>=bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom right brick
									if(y+size+dy>=bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
								case 2:
									//center brick
									if(y+dy>=bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom brick
									if(y+size+dy>=bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom left brick
									if(y+size+dy>=bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//top brick - useless
									if(y-size+dy>=bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
								case 3:
									//center brick
									if(y+dy>=bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//left brick
									if(y+dy>=bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//right brick
									if(y+dy>=bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//top left brick
									if(y-size+dy>=bricks[i].y && x-size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
								case 4:
									//center brick
									if(y+dy>=bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//bottom brick
									if(y+size+dy>=bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//top right brick
									if(y-size+dy>=bricks[i].y && x+size==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									//top brick - useless
									if(y-size+dy>=bricks[i].y && x==bricks[i].x)
									{
						  				collision_detected = true;
						  				console.log("Collision detected preventing bottom movement.");
									}
									break;
							}
							break;
						case "T": // TODO
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

// detect if brick has reached bottom
function detectBottom()
{
	switch(brick_type)
	{
		case ".": // OK !
			if(y+dy>canvas.height-size)
				brickInit();
			break;
		case "I": // TODO
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
		case "o": // TODO
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
		case "T": // TODO
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

function getRandomInt(max) 
{
  return Math.floor(Math.random() * Math.floor(max));
}

function drawBrick(x, y, color, brick_type, brick_orientation)
{
	// TODO : replace with a switch/case

	if(brick_type === ".")
	{
		ctx.beginPath();
		ctx.rect(x, y, size, size);
		ctx.strokeStyle = "red";
		ctx.stroke();
		ctx.fillStyle = color;
		ctx.fill();
		ctx.closePath();
	}
	else if(brick_type === "L")
	{
		if(brick_orientation === 1)
		{
			ctx.beginPath();
			ctx.rect(x, y, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x-size, y, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x+size, y, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x+size, y+size, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();
		}
		else if(brick_orientation === 2)
		{
			ctx.beginPath();
			ctx.rect(x, y, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x, y-size, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x, y+size, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x-size, y+size, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();
		}
		else if(brick_orientation === 3)
		{
			ctx.beginPath();
			ctx.rect(x, y, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x-size, y, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x+size, y, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x-size, y-size, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();
		}
		else if(brick_orientation === 4)
		{
			ctx.beginPath();
			ctx.rect(x, y, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x, y-size, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x, y+size, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();

			ctx.beginPath();
			ctx.rect(x+size, y-size, size, size);
			ctx.strokeStyle = "red";
			ctx.stroke();
			ctx.fillStyle = color;
			ctx.fill();
			ctx.closePath();
		}
	}
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
