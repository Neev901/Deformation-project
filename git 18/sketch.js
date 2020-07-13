//Global Variables
var monkey, bananaGroup, obstacleGroup, bg, ground, score;

var banana_image, obstacle_image, background_image, monkey_animation, ground_image;

var player_lives, gameState, game_over, game_over_image;

function preload() {

  monkey_animation = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  background_image = loadImage("jungle.jpg");
  banana_image = loadImage("Banana.png");
  obstacle_image = loadImage("stone.png");
  ground_image = loadImage("ground.jpg");
  game_over_image = loadImage("Game Over.jpg")

}


function setup() {
  createCanvas(600, 300);

  player_lives = 2;
  gameState = "play";

  bg = createSprite(300, 150);
  bg.addImage("bg", background_image);
  bg.scale = 0.8;

  monkey = createSprite(40, 250);
  monkey.addAnimation("monkey_ani", monkey_animation);
  monkey.scale = 0.1;

  ground = createSprite(100, 315);
  ground.addImage("ground_img", ground_image);
  ground.scale = 0.1;
  ground.visible = false;

  obstacleGroup = new Group();
  bananaGroup = new Group();

  game_over = createSprite(300, 150);
  game_over.addImage("gameOver_img", game_over_image);
  game_over.scale = 2.25;
  game_over.visible = false;

  score = 0;
}


function draw() {
  background(255);

  if (gameState === "play") {
    bg.velocityX = -3;
    if (bg.x < 200) {
      bg.x = 300;
    }

    monkey.x = 40;

    if (keyDown("space") && monkey.y >= 210) {
      monkey.velocityY = -15;

    }
    monkey.velocityY = monkey.velocityY + 1;

    monkey.collide(ground);

    if (monkey.collide(obstacleGroup)) {
      obstacleGroup.destroyEach();
      player_lives = player_lives - 1;
      monkey.velocityX = 0;
      score = 0;
      monkey.scale = 0.1;
    }


    switch (score) {
      case 10:
        monkey.scale = 0.12;
        break;
      case 20:
        monkey.scale = 0.14;
        break;
      case 30:
        monkey.scale = 0.16;
        break;
      case 40:
        monkey.scale = 0.18;
        break;
      case 50:
        monkey.scale = 0.2;
        break;
      case 60:
        monkey.scale = 0.22;
        break;
      case 70:
        monkey.scale = 0.24;
        break;
      case 80:
        monkey.scale = 0.26;
        break;
      case 90:
        monkey.scale = 0.28;
        break;
      case 100:
        monkey.scale = 0.30;
        break;
      default:
        break;
    }

    if (monkey.collide(bananaGroup)) {
      bananaGroup.destroyEach();
      score = score + 2;
      monkey.velocityX = 0;
    }

    spawnbananas();
    spawnObstacles();

    if (player_lives === 0) {
      gameState = "end";
    }
  }
  if (gameState === "end") {
    monkey.visible = false;
    bg.visible = false;
    game_over.visible = true;
  }
  drawSprites();
  score_display();
}

function spawnbananas() {
  if (frameCount % 90 === 0) {
    var banana = createSprite(600, random(100, 200));
    banana.addImage("banana_img", banana_image);
    banana.scale = 0.05;
    banana.velocityX = -6;
    banana.lifetime = 100;
    bananaGroup.add(banana)
  }

}


function spawnObstacles() {
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(600, 230);
    obstacle.addImage("obs_img", obstacle_image);
    obstacle.scale = 0.1;
    obstacle.velocityX = -7;
    obstacle.lifetime = 85;
    obstacleGroup.add(obstacle);
  }

}

function score_display() {
  fill("red")
  textSize(20);
  text("score : " + score, 450, 50);
}