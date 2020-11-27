var yellost, yellost_neutral, yellost_right, yellost_left, yellostState;

var bieth, bieth_left, bieth_right, bieth_left_walk1, bieth_left_walk2, bieth_right_walk1, bieth_right_walk2, bieth_walkingLeft, bieth_walkingRight;

var BG1;

var invisibleGround;

var platform, platform_image;

var fire, fire_image, fire_left, fire_right, yellowFire, yellowFire_image, yellowFire_left, yellowFire_right;

var attackGroup;
var yellowAttackGroup;

var biethState;
var playerState;

var biethRange = 1200;

var biethActivate = "no";

var sword, sword_leftImage, sword_rightImage, swordState;
var yellostSwordAchieved;

var yellostHP, biethHP;

function preload()
{
	yellost_neutral = loadImage("Yellost Standing Still.png");
	yellost_right = loadImage("Yellost Moving Right.png");
	yellost_left = loadImage("Yellost Moving Left.png");

	BG1 = loadImage("Background For Level 1.png");

	platform_image = loadImage("Platform For Level 1.png");

	bieth_left = loadImage("Bieth Looking Left.png");
	bieth_right = loadImage("Bieth Looking Right.png");

	fire_image = loadImage("Fire.png");

	fire_left = loadImage("Fire Moving Left.png");

	fire_right = loadImage("Fire Moving Right.png");

	yellowFire_image = loadImage("Yellow Fire.png");

	yellowFire_left = loadImage("Yellow Fire Moving Left.png");

	yellowFire_right = loadImage("Yellow Fire Moving Right.png");

	bieth_left_walk1 = loadImage("Bieth Walking left 1.png");
	bieth_left_walk2 = loadImage("Bieth Walking left 2.png");

	bieth_right_walk1 = loadImage("Bieth Walking Right 1.png");
	bieth_right_walk2 = loadImage("Bieth Walking Right 2.png");

	/*bieth_walkingLeft = loadAnimation("Bieth Walking left 1.png", "Bieth Walking left 2.png");
	bieth_walkingRight = loadAnimation("Bieth Walking Right 1.png", "Bieth Walking Right 2.png");*/

	sword_leftImage = loadImage("Sword Facing Left.png");
	sword_rightImage = loadImage("Sword Facing Right.png");
};

function setup() {
	createCanvas(windowWidth, windowHeight);

	//Create the Bodies Here.

	invisibleGround = createSprite(width/2, height - height/4, width *2, 100);

	platform = createSprite(width/2, 2700, 2500, 100);
	//platform.addImage(platform_image);
	//platform.scale = 0.5;

	invisibleGround.debug = true;

	bieth = createSprite(width/2, invisibleGround.y - 101, 200, 200);
	bieth.addImage(bieth_left);
	biethState = "facingLeft";
//	bieth.scale = 3;

//	bieth.setCollider("rectangle", -15, 0, 360, 360);
	bieth.debug = true;
	biethHP = 10;

	yellost = createSprite(200, invisibleGround.y - 26, 50, 50);
	yellost.addImage(yellost_neutral);
//	yellost.scale = 0.8;
	yellost.debug = true;
	yellostHP = 3;

	attackGroup = new Group();
	yellowAttackGroup = new Group();

	sword = createSprite(width/2, 300, 30, 30);
	swordState = "facingLeft";
	yellostSwordAchieved = "yes";

	sword.debug = true;
}


function draw() {
  rectMode(CENTER);
  background(BG1, width/2, height/2, width, height);

  addControls();

  yellost.velocityY = yellost.velocityY + 20;
  
  yellost.collide(invisibleGround);
  bieth.collide(invisibleGround);

  yellost.bounce(bieth);

  sword.y = yellost.y;

  updateSwordImage();

  sword.scale = 0.35;

  strikeSword();

  bieth_attack();

  if(yellost.x > bieth.x + 200){

	biethActivate = "yes";
  }

  bieth_follow();

  updateHP();

  camera.position.x = yellost.x;
  invisibleGround.x = yellost.x;

  drawSprites();
}

function addControls(){

	if(keyDown(RIGHT_ARROW)){

		yellost.addImage(yellost_right);
	//	yellost.setCollider("rectangle", 0, 0, yellost.height * 1.8, yellost.height * 1.8);
	//	yellost.scale = 0.3;
		yellost.x = yellost.x + 50;
		yellost.debug = true;
		yellostState = "facingRight";
	} 

	else{

		yellost.addImage(yellost_neutral);
		yellost.scale = 0.8;
	}

	if(keyDown(LEFT_ARROW)){

		yellost.addImage(yellost_left);
	//	yellost.setCollider("rectangle", 0, 0, yellost.height * 1.8, yellost.height * 1.8);
	//	yellost.scale = 0.3;
		yellost.x = yellost.x- 50;
		console.log("inside the left if")
		yellostState = "facingLeft";
	}

	if(keyDown(RIGHT_ARROW) && keyDown("space")){

		yellost.addImage(yellost_right);
	//	yellost.setCollider("rectangle", 0, 0, yellost.height * 1.8, yellost.height * 1.8);
	//	yellost.scale = 0.3;
		yellost.x = yellost.x + 200;
		yellostState = "facingRight";
	}

	if(keyDown(LEFT_ARROW) && keyDown("space")){

		yellost.addImage(yellost_left);
	//	yellost.setCollider("rectangle", 0, 0, yellost.height * 1.8, yellost.height * 1.8);
	//	yellost.scale = 0.3;
		yellost.x = yellost.x - 200;
		yellostState = "facingLeft"
	}

	if(keyWentDown(UP_ARROW)){

		yellost.velocityY = - 240;
	}

}

function bieth_attack(){

	if(frameCount % 60 === 0){

		var rand = Math.round(random(1,2));

		switch(rand){

			case 1: fire = createSprite(-300, bieth.y + 50, 100, 100);
					fire.addImage(fire_image);
					
					if(biethState === "facingLeft"){

						fire.x = bieth.x - 1000;

						fire.addImage(fire_left);
						fire.velocityX = - 35;
						fire.scale = 0.6;
						
					}

					else if(biethState === "facingRight"){

						fire.x = bieth.x + 1000;

						fire.addImage(fire_right);
						fire.velocityX = 35;
						fire.scale = 0.6;
					}

					fire.lifetime = 50;

					attackGroup.add(fire);

			break;

			case 2: yellowFire = createSprite(-300, bieth.y + 50, 100, 100);
					yellowFire.addImage(yellowFire_image);

					yellowFire.debug = "true";

					if(biethState === "facingLeft"){

						yellowFire.x = bieth.x - 1000;

						yellowFire.addImage(yellowFire_left);
						yellowFire.velocityX = - 35;
						yellowFire.scale = 0.6;
					}

					else if(biethState === "facingRight"){

						yellowFire.x = bieth.x + 1000;

						yellowFire.addImage(yellowFire_right);
						yellowFire.velocityX = 35;
						yellost.scale = 0.6;
					}

					yellowFire.lifetime = 50;
			
					yellowAttackGroup.add(yellowFire);
					attackGroup.add(yellowFire);

				break;
			
			default: break;
		}
	}
}

function bieth_follow(){

	if(biethActivate = "yes"){

		if(yellost.x > bieth.x){

			bieth.addImage(bieth_right);
	//		bieth.scale = 1.2;
			bieth.velocityX = 50;
			biethState = "facingRight";

			console.log(bieth.x + 200);
		}

		else if(yellost.x < bieth.x + 200 && yellost.x > bieth.x){

			bieth.addImage(bieth_right);
	//		bieth.scale = 1.2;
		}

		if(yellost.x < bieth.x - 200){

			bieth.addImage(bieth_left);
	//		bieth.scale = 3;
			bieth.velocityX = -50;
			enemyState = "facingLeft";
		}

		else if(yellost.x > bieth.x - 200 && yellost.x > bieth.x){

			bieth.addImage(bieth_left);
	//		bieth.scale = 3;
		}
	}
}

function updateSwordImage(){

	if(yellostState === "facingRight"){

	  sword.x = yellost.x + 300
  
	  sword.addImage(sword_rightImage);
	  swordState = "facingRight";
	}
  
	else if(yellostState === "facingLeft"){

	  sword.x = yellost.x - 300;
  
	  sword.addImage(sword_leftImage);
	  swordState = "facingLeft";
	}
  }

function strikeSword(){

	if(yellowAttackGroup.isTouching(sword) && yellostSwordAchieved === "yes" && keyWentDown("z")){

		yellowAttackGroup.setVelocityXEach = yellowAttackGroup.velocityX * -1;
		console.log("strikeSwordOn");
	}
}

function updateHP(){

	if(attackGroup.isTouching(yellost)){

		yellostHP = yellostHP - 1;
	}
	
	if(yellowAttackGroup.isTouching(bieth)){

		biethHP = biethHP - 1;
	}
}
