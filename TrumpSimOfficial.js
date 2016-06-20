var canvas;
var ctx;
var score;
var targetCount = 0;
var highScore = 0;
var player;
var airborn;
var jumpTimer = 0;

var China = new Audio('NewC.mp3');
var audio = new Audio('MAAGA.mp3');
var cackle = new Audio('HCL.mp3');

//var color = 'white';
//var colors = ['white', 'red', 'blue', 'yellow'];

var inputs = {
    left: false,
    up: false,
    right: false,
    down: false
};

var spritesheet = new Image();
var sprites = {
	trump: new sprite(0, 0, 30, 38),
	brick: new sprite(30, 0, 80, 80)
};

var facingRight = true;
var level;
var currentLevel = 0;
var election = 'Error';
var elecitonx = 0;
var electionPoint = 1;
var platforms = [];
var startingBlocks = [];
var target;
var timestamp = Date.now();
var tries = 3;
var tryColor = 'green';
var timer = 10;

var ACCEL = 100;
var MAX_VELOCITY = 100;
var MIN_VELOCITY = .5;
var JUMP_VELOCITY = 300;
var JUMP_TIME = .2;
var FRICTION_FACTOR = 3;
var DROP_FACTOR = 3;
var GRAVITY = 400;
var MAX_DELTA = .03;
var EDGE_CREEP = 50;
var LETHAL_VELOCITY = 100;
var SCORE_DIGITS = 8;
var LEVEL_CHANGE = 1;

var deathtoamerica = false;
var americaisgreatagain = false;


function init() {
	spritesheet.src = 'newspritesheet.png';
	
    canvas = document.getElementById('canvas');
    canvas.width = 1000;
    canvas.height = 600;
	document.getElementById('canvas').style.backgroundImage="url('whitehouse.jpeg')";
    ctx = canvas.getContext('2d');
	
		level = new level();
		loadLevel(level.next());
/*	
		platforms.push(new entity(200, 450, 50, 50));
		platforms.push(new entity(300, 300, 50, 50));
		platforms.push(new entity(460, 150, 50, 50));
		platforms.push(new entity(600, 250, 50, 50));
		platforms.push(new entity(780, 350, 50, 50));
		platforms.push(new entity(460, 390, 50, 50));
		platforms.push(new entity(650, 520, 50, 50));
*/	
		
		startingBlocks.push(new entity(0, 300, 50, 50));

		target = new entity(0, 0, 40, 1)
		moveTarget();
	
		player = new entity(0, 0, 30, 38);
		reset();

		document.addEventListener('keydown', keyDown, false);
		document.addEventListener('keyup', keyUp, false);
//		document.addEventListener('mousedown', mouseDown, false);

		gameLoop();
}

function gameLoop() {
    updatePosition();
	handleCollision();
    updateCanvas();
    window.requestAnimationFrame(gameLoop);
}

function reset(soft) {
	if(!soft) {
		score = 0;
		targetCount = 0;
	}
	player.vx = 0;
	player.vy = 0;
	player.setLeft(0);
	player.setBottom(300);
}

function loadLevel(list) {
	platforms = [];
	var platform;
	for(currentLevel=0; currentLevel<list.length; currentLevel++) {
		platform = list[currentLevel];
		platforms.push(new entity(platform[0], platform[1], platform[2], platform[3]))
	};
}

function moveTarget(exception) {
	score += 5;
	if(score > highScore) highScore = score;
	
	targetCount++;
	if(targetCount > LEVEL_CHANGE) {
		electionPoint++;
		loadLevel(level.next());
		targetCount = 0;
		reset(true);
	}
	
	if(!exception) {
		while(true) {
			var platform = pick(platforms);
	
			target.setMidX(platform.getMidX());
			target.setMidY(platform.getTop() - platform.halfHeight);
		
			var success = true;
			for(var p=0; p<platforms.length; p++) {
				platform = platforms[p];
				if(collideRect(target, platform)) {
					success = false;
					break;
				}
			}
		
			if(success) break;
		}
	} else if(exception == true) {
		while(true) {
			var platform = specialpick(platforms);
	
			target.setMidX(platform.getMidX());
			target.setMidY(platform.getTop() - platform.halfHeight);
		
			var success = true;
			for(var p=0; p<platforms.length; p++) {
				platform = platforms[p];
				if(collideRect(target, platform)) {
					success = false;
					break;
				}
			}
		
			if(success) break;
		}
	}
}

function updatePosition() {
var now = Date.now();
var delta = (now - timestamp) / 1000;
timestamp = now;
if(delta >MAX_DELTA) delta = MAX_DELTA;
timestamp = now;
    if(inputs.left) {
		facingRight = false;
		if(!airborn && player.vx > 0) {
			player.vx -= delta * player.vx * FRICTION_FACTOR;
		}
        player.vx -= delta * ACCEL;
    } else if(inputs.right) {
		facingRight = true;
		if(!airborn && player.vx < 0){
			player.vx -= delta * player.vx * FRICTION_FACTOR;
		}
        player.vx += delta * ACCEL;
    } else if(!airborn) {
		player.vx -= delta * player.vx * FRICTION_FACTOR;
	}

    if(inputs.up) {
		if(!airborn) {
			jumpTimer = JUMP_TIME;
			player.vy = -JUMP_VELOCITY;
		}
		
		if(jumpTimer > 0) {
			jumpTimer -= delta;
		} else {
			player.vy += delta * GRAVITY;
		}
    } else {
		if(jumpTimer) jumpTimer = 0;
		if(player.vy < 0) player.vy -= delta * player.vy * DROP_FACTOR;
		player.vy += delta * GRAVITY;
	}
	
	if(player.vx > MAX_VELOCITY) {
		player.vx = MAX_VELOCITY;
	} else if(player.vx < -MAX_VELOCITY) {
		player.vx = -MAX_VELOCITY;
	} else if(Math.abs(player.vx) < MIN_VELOCITY) {
		player.vx = 0;
	}
	
/*	if(player.yx > MAX_VELOCITY) {
		player.yx = MAX_VELOCITY;
	} else if(player.yx < -MAX_VELOCITY) {
		player.yx = -MAX_VELOCITY;
	} else if(Math.abs(player.vy) < MIN_VELOCITY) {
		player.vy = 0;
	}
*/
	player.x += delta * player.vx;
	player.y += delta * player.vy;
	
	if(timer > 0 && americaisgreatagain == true) {
		timer -= delta
		if(timer < 0) {
			timer = 0;
			location.reload();
		}
	}
	
	if(timer > 0 && deathtoamerica == true) {
		timer -= delta
		if(timer < 0) {
			timer = 0;
			location.reload();
		}
	}
}

function handleCollision() {
	airborn = true;
	
	var platform, dx, dy;
	for(var p=0; p<platforms.length; p++) {
		platform = platforms[p];
		if(collideRect(player, platform)) {
			dx = (platform.getMidX() - player.getMidX()) / platform.width;
			dy = (platform.getMidY() - player.getMidY()) / platform.height;
			
			//horizontal
			if(Math.abs(dx) > Math.abs(dy)) {
				if(dx < 0) {
					if(player.vx < 0) player.vx = 0;
						player.setLeft(platform.getRight());
				} else {
					player.setRight(platform.getLeft());
				}
				
			//vertical
			} else {
				player.vy = 0;
				
				if(dy < 0) {
					if(player.vy < 0) player.vy = 0;
					player.setTop(platform.getBottom());
				} else {	
					if(player.vy > LETHAL_VELOCITY) {
						audio.play();
						reset();
					} else {	
						if(player.vy < 0) player.vy = 0;
						player.setBottom(platform.getTop());
						if(Math.abs(player.vx) < EDGE_CREEP) {
							var x = player.getMidX();
							if(x < platform.getLeft() && !inputs.right) {
								player.vx = -EDGE_CREEP;
							} else if(x > platform.getRight() && !inputs.left) {
								player.vx = EDGE_CREEP;
							}
						}
						airborn = false;
					}
				}
			}
		}
	}
	
	var startingBlock, sBx, sBy;
	for(var p=0; p<startingBlocks.length; p++) {
		startingBlock = startingBlocks[p];
		if(collideRect(player, startingBlock)) {
			sBx = (startingBlock.getMidX() - player.getMidX()) / startingBlock.width;
			sBy = (startingBlock.getMidY() - player.getMidY()) / startingBlock.height;
			
			//horizontal
			if(Math.abs(sBx) > Math.abs(sBy)) {
				if(sBx < 0) {
					if(player.vx < 0) player.vx = 0;
						player.setLeft(startingBlock.getRight());
				} else {
					player.setRight(startingBlock.getLeft());
				}
				
			//vertical
			} else {
				player.vy = 0;
				
				if(sBy < 0) {
					if(player.vy < 0) player.vy = 0;
					player.setTop(startingBlock.getBottom());
				} else {	
					if(player.vy > LETHAL_VELOCITY) {
						audio.play();
						reset();
					} else {	
						if(player.vy < 0) player.vy = 0;
						player.setBottom(startingBlock.getTop());
						if(Math.abs(player.vx) < EDGE_CREEP) {
							var x = player.getMidX();
							if(x < startingBlock.getLeft() && !inputs.right) {
								player.vx = -EDGE_CREEP;
							} else if(x > startingBlock.getRight() && !inputs.left) {
								player.vx = EDGE_CREEP;
						}
					}
					airborn = false;
				}
			}
		}
	}
}


	if(collideRect(player, target)) {
		moveTarget(true);
		China.play();
	}
	
	if(player.getLeft() < 0) {
        player.setLeft(0);
		player.vx = 0;
//        color = pick(colors);
    } else if(player.getRight() > canvas.width) {
        player.setRight(canvas.width);
		player.vx = 0;
 //       color = pick(colors);
    }

    if(player.getTop() < 0) {
        player.setTop(0);
		player.vy = 0;
 //       color = pick(colors);
    } else if(player.getBottom() > canvas.height) {
		if(player.vy > LETHAL_VELOCITY) {
			reset(true);
			tries -= 1;
			if(tries == 0) {
				cackle.play();
			} else {
				audio.play();
			}
		} else {	
        player.setBottom(canvas.height);
		player.vy = 0;
 //       color = pick(colors);
		airborn = false;
		}
    }
}

function updateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

	//score stuff
	
	if(electionPoint === 1) {
		election = 'Republican Primary';
		electionx = 402;
		stageNum = electionPoint;
	} else if(electionPoint === 2) {
		election = 'Republican Primary';
		electionx = 402;
		stageNum = electionPoint;
	} else if(electionPoint === 3) {
		election = 'Republican Primary';
		electionx = 402;
		stageNum = electionPoint;
	} else if(electionPoint === 4) {
		election = 'General Election';
		electionx = 417;
		stageNum = electionPoint - 3;
	} else if(electionPoint === 5) {
		election = 'General Election';
		electionx = 417;
		stageNum = electionPoint - 3;
	} else if(electionPoint === 6) {
		election = 'General Election';
		electionx = 417;
		stageNum = electionPoint - 3;
	} else if(electionPoint === 7) {
		election = 'The Presidency';
		electionx = 420;
		stageNum = electionPoint - 6;
	} else if(electionPoint === 8) {
		election = 'The Presidency';
		electionx = 420;
		stageNum = electionPoint - 6;
	} else if(electionPoint === 9) {
		election = 'The Presidency';
		electionx = 420;
		stageNum = electionPoint - 6;
	} else if(electionPoint >= 10) {
		americaisgreatagain = true;
		function codeGreen() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			loadcodeGreenUI();
			document.getElementById('canvas').style.backgroundImage="url('download.jpg')";
		}
		codeGreen();
		audio.play();
	} else {
		election = 'And Error Occured In The updateCanvas Function';
	}
	
	
	if(tries === 3) {
		tryColor = 'green';
	} else if(tries === 2) {
		tryColor = 'yellow';
	} else if(tries === 1){
		tryColor = 'red';
	} else if(tries <= 0) {
		deathtoamerica = true;
//		if(deathtoamerica == true) console.log('true');
		function codeRed() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			loadcodeRedUI();
			document.getElementById('canvas').style.backgroundImage="url('OO.jpg')";
		}
		codeRed();
	}

if(deathtoamerica == false && americaisgreatagain == false) {
	loadLevelUI();
	
	var sprite;
	if(airborn) {
		if(facingRight) {
			sprite = sprites.trump;
		} else {
			sprite = sprites.trump;
		}
	} else {
		if(facingRight) {
			sprite = sprites.trump;
		} else {
			sprite = sprites.trump;
		}
	}
	
	drawSprite(sprite, player);

	var platform;
	for(var p=0; p<platforms.length; p++){
		platform = platforms[p];
		drawSprite(sprites.brick, platform);
	}
	
	var startingBlock;
	for(var p=0; p<startingBlocks.length; p++){
		startingBlock = startingBlocks[p];
		drawSprite(sprites.brick, startingBlock);
	}
	
	ctx.font = 'bold 9px Serif';
	ctx.fillStyle = 'white';
//	ctx.fillRect(target.x, target.y, target.width, target.height);
	ctx.fillText('Vote', target.x + 10, target.y + 22);
	
	} else if(americaisgreatagain == true) {
		codeGreen();
	} else {
		codeRed();
	}
}

function drawSprite(s, e) {
	ctx.drawImage(spritesheet, s.x, s.y, s.width, s.height, e.x, e.y, e.width, e.height);
}

function keyDown(e) {
    e.preventDefault();
    switch(e.keyCode) {
        case 65: //left
            inputs.left = true;
            break;
        case 32: //up
            inputs.up = true;
            break;
        case 68: //right
            inputs.right = true;
            break;
        case 83: //down
            inputs.down = true;
            break;
		case 37: //left
            inputs.left = true;
            break;
        case 38: //up
            inputs.up = true;
            break;
        case 39: //right
            inputs.right = true;
            break;
		case 87: //up
            inputs.up = true;
			break;
    }
}

function keyUp(e) {
    e.preventDefault();
    switch(e.keyCode) {
        case 65: //left
            inputs.left = false;
            break;
        case 32: //up
            inputs.up = false;
            break;
        case 68: //right
            inputs.right = false;
            break;
        case 83: //down
            inputs.down = false;
            break;
		case 37: //left
            inputs.left = false;
            break;
        case 38: //up
            inputs.up = false;
            break;
        case 39: //right
            inputs.right = false;
            break;
		case 87: //up
            inputs.up = false;
			break;
	}
}
/*
function mouseDown(e) {
	var x = e.pageX - canvas.offsetLeft;
	var y = e.pageY - canvas.offsetTop;
	
	target.setMidX(x);
	target.setMidY(y);
}
*/
function collideRect(a, b) {
	if(a.getLeft() > b.getRight()) return false;
	
	if(a.getTop() > b.getBottom()) return false;
	
	if(a.getRight() < b.getLeft()) return false;
	
	if(a.getBottom() < b.getTop()) return false;
	
	return true;
}