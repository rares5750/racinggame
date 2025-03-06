let playerCar;
let walls;
let map;
let backwards = false;

const maxSpeed = 5;

function setup() {
	new Canvas(750, 750);
	displayMode('centered');

	playerCar = new Sprite(width/2, 70, 10, 15, "d");
	angleMode("degrees");
	playerCar.rotation = 90;
	playerCar.rotationLock = true;
	playerCar.direction = playerCar.rotation/90 + 180;

	walls = new Group();
	walls.tile = "=";
	walls.w = width/35;
	walls.h = height/35;
	walls.color = "gray";
	walls.collider = "s";
	walls.strokeWeight = 0;


	map = new Tiles(
		["......==================...........",
		"....===................===.........",
		"...==....................===.......",
		"..==.......................===.....",
		".==..........................==....",
		".=.......==========............=...",
		".=......==........====..........=..",
		"==......=............===........==.",
		"=.......=..............===.......=.",
		"=.......=................==......==",
		"=.......=.................==......=",
		"==......==.................==.....=",
		".==......===................==....=",
		"..=........==................=....=",
		"..==........==...............=....=",
		"....=.......==...............=....=",
		"....==.......=...............==...=",
		".....=......==................=...=",
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
		".=.....===.=====.......==.==......=",
		".=.......====..==.......==.========",
		".=..........=====........=.........",
		".==......................=.........",
		"..=.....................==.........",
		"..==========......=======..........",
		"...........========................"],
		0,
		0,
		walls.w,
		walls.h
	);
}

function draw() {
	background('skyblue');

	if(kb.pressing("w")){
		if(backwards == true && playerCar.speed >= 0){
			playerCar.speed -= 0.05;
			if(playerCar.speed <= 0.05){
				backwards = false;
				playerCar.direction = playerCar.rotation/90 + 180;
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
	if(kb.pressing("s")){
		if(backwards == false && playerCar.speed >= 0){
			playerCar.speed -= 0.05;
			if(playerCar.speed <= 0.05){
				backwards = true;
				playerCar.direction = playerCar.rotation/90;
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
	// combine above movement functions together

	if(kb.pressing("d")){
		playerCar.direction += 5 / (playerCar.speed + 1);
		playerCar.rotation += 5 / (playerCar.speed + 1);
	}
	if(kb.pressing("a")){
		playerCar.direction -= 5 / (playerCar.speed + 1);
		playerCar.rotation -= 5 / (playerCar.speed + 1);
	}
}
