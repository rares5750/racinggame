let playerCar;
let gt1c, gt2c, gt3c, lapIncremented = false; //gone through (no.) checkpoint
let lap = 1;
let walls, checkpoints;
let map;
let backwards = false;

//timing variables

let millisecond = 0;
let second = 0;
let minute = 0;

let previousLap;

let bestLapMin;
let bestLapSec;
let bestLapMs;
let bestLap;

const maxSpeed = 5;

function setup() {
	new Canvas(750, 750);
	displayMode('centered');

	walls = new Group();
	walls.tile = "=";
	walls.w = width/35;
	walls.h = height/35;
	walls.color = "white";
	walls.collider = "s";
	walls.strokeWeight = 0;

	checkpoints = new Group();
	checkpoints.w = walls.w;
	checkpoints.h = walls.h;
	checkpoints.collider = "n";
	checkpoints.color = "yellow";
	checkpoints.opacity = 0.5;

	check1 = new checkpoints.Group();
	check1.tile = "c";

	check2 = new checkpoints.Group();
	check2.tile = "d";

	check3 = new checkpoints.Group();
	check3.tile = "e";

	startFinish = new checkpoints.Group();
	startFinish.color = "white";
	startFinish.tile = "f";


	map = new Tiles(
		["......==================...........",
		"....===.......f........===.........",
		"...==.........f..........===.......",
		"..==..........f............===.....",
		".==...........f..............==....",
		".=.......==========............=...",
		".=......==........====..........=..",
		"==......=............===........==.",
		"=ccccccc=..............===.......=.",
		"=.......=................==......==",
		"=.......=.................==......=",
		"==......==.................==.....=",
		".==......===................==....=",
		"..=........==................=....=",
		"..==........==...............=....=",
		"....=.......==...............=....=",
		"....==.......=...............==...=",
		".....=......==................=eee=",
		".....=......=......=====.....==...=",
		"....==......=...====...====..=....=",
		"....=......==..==.........==.==...=",
		"..===......=====..........==..=...=",
		".==.......==................=.=...=",
		".=.......==.........====.....==...=",
		".=.......==........==..==.....=...=",
		".=......===........=....==........=",
		".=.....==.=........====..==.......=",
		".=.....=..==..........==..=.......=",
		".=.....===.=====ddddddd==.==......=",
		".=.......========.......==.========",
		".=.......................=.........",
		".==......................=.........",
		"..=.....................==.........",
		"..==========......=======..........",
		"...........========................"],
		0,
		0,
		walls.w - 0.5,
		walls.h - 0.5
	);

	playerCar = new Sprite(width/2, 70, 15, 10, "d");
	playerCar.color = "blue";
	angleMode("degrees");
	playerCar.rotation = -180;
	playerCar.rotationLock = true;
	playerCar.direction = playerCar.rotation;

	setInterval(incrementTime, 1);
}

function draw() {
	background('black');

	if(backwards){
		playerCar.direction = playerCar.rotation + 180;
	}
	else{
		playerCar.direction = playerCar.rotation;
	}

	for(let checkpoint1 of check1){
		if(playerCar.overlaps(checkpoint1)){
			gt1c = true;
		}
	}
	if(gt1c && !gt2c){
		for(let checkpoint2 of check2){
			if(playerCar.overlaps(checkpoint2)){
				gt2c = true;
			}
		}
	}
	if(gt1c && gt2c){
		for(let checkpoint3 of check3){
			if(playerCar.overlaps(checkpoint3)){
				gt3c = true;
			}
		}
	}

	if(gt1c && gt2c && gt3c){
		for(let sqr of startFinish){
			if(playerCar.overlaps(sqr)){
				if(!lapIncremented){
					lap++;
					lapIncremented = true;
					calculateBestLap();
					previousLap = minute + ":" + second + "." + millisecond;
					minute = 0;
					second = 0;
					millisecond = 0;
				}
				gt1c, gt2c, gt3c = false;
			}
		}
		lapIncremented = false;
	}

	if(kb.pressing("w")){
		if(backwards == true && playerCar.speed >= 0){
			playerCar.speed -= 0.05;
			if(playerCar.speed <= 0.05){
				backwards = false;
			}
		}
		if(!backwards){
			if(playerCar.speed + 0.05 < maxSpeed){
				playerCar.speed += 0.05;
			}
			else{
				playerCar.speed = maxSpeed;
			}
		}
	}
	else if(!kb.pressing("s")){
		playerCar.speed -=0.01
	}
	if(kb.pressing("s")){
		if(backwards == false && playerCar.speed >= 0){
			playerCar.speed -= 0.05;
			if(playerCar.speed <= 0.05){
				backwards = true;
			}
		}
		if(backwards){
			if(playerCar.speed + 0.05 < maxSpeed){
				playerCar.speed += 0.05;
			}
			else{
				playerCar.speed = maxSpeed;
			}
		}
	}
	else if(!kb.pressing("w")){
		playerCar.speed -= 0.01;
	}
	// combine above movement functions together

	if(kb.pressing("d")){
		playerCar.direction += 8.5 / ((playerCar.speed + 2)/2);
		playerCar.rotation += 8.5 / ((playerCar.speed + 2)/2);
	}
	if(kb.pressing("a")){
		playerCar.direction -= 8.5 / ((playerCar.speed + 2)/2);
		playerCar.rotation -= 8.5 / ((playerCar.speed + 2)/2);
	}
	fill(255);
	textAlign(LEFT);
	textSize(20);
	text("Lap: " + lap, width/2 - 50, height/2 - 150)
	text("Current Lap: " + minute + ":" + second + "." + millisecond, width/2-50, height/2-125);
	if(previousLap){
		text("Previous Lap: " + previousLap, width/2 - 50, height/2 - 100);
	}
	if(bestLap){
		text("Best Lap: " + bestLap, width/2 - 50, height/2 - 75);
	}
}

function incrementTime(){
	millisecond += 4;
	if(millisecond >= 1000){
		millisecond = 0;
		second++;
		if(second >= 60){
			second = 0;
			minute++;
		}
	}
}

function setBest(){
	bestLapMin = minute;
	bestLapSec = second;
	bestLapMs = millisecond;
	bestLap = minute + ":" + second + "." + millisecond;
}

function calculateBestLap(){
	if(!bestLap){
		setBest();
	}
	else{
		if(minute < bestLapMin){
			setBest();
		}
		else if(minute == bestLapMin){
			if(second < bestLapSec){
				setBest();
			}
			else if(second == bestLapSec){
				if(millisecond < bestLapMs){
					setBest();
				}
			}
		}
	}
}
