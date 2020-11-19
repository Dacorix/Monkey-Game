var monkey , monkey_running;
var banana ,bananaImage, obstacleImage;
var FoodGroup, obstacleGroup, bananaGroup;

var ground;


var play = 1;
var end = 0;
var gameState = play;

var survivalTime = 0;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_still = loadImage("sprite_6.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 400)

  monkey = createSprite(80, 320, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.08;
  monkey.debug = true;
  
  
  ground = createSprite(600, 350, 1400, 10);
  ground.velocityX = -5;
  ground.x = ground.width /2;
  //ground.debug = true
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  
  
}


function draw() {
  
background("green");
  

  
  
  if (gameState === play){
    
       
  stroke("white");
  textSize(20);
  fill("white");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time : " + survivalTime, 200, 50)
    
    
    if (ground.x < 0){
    ground.x = ground.width/2;
    }
    
    if (keyDown("SPACE")){
    monkey.velocityY = -12;
  }
    
   monkey.velocityY = monkey.velocityY + 0.6;
  
    
    if (obstacleGroup.isTouching(monkey)){
      gameState = end;
    }
 
  }
  
  
  if (gameState === end){
   

    ground.velocityX = 0;
    monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1);
  
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    
    bananaGroup.visibleEach = false;
    //survivalTime.visible = false;
    
    bananaGroup.destroyEach();
    
    stroke("black");
    textSize(30);
    fill("red");
    text("GAME OVER",  200, 200);
    
    
  }
  
   monkey.collide(ground);
  
  food();
  Obstacles();
  
  drawSprites();
}


function food() {
  
  if (frameCount % 80 === 0) {
    
    banana = createSprite(650, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.08;
    
    banana.y = Math.round(random(180, 250));
    banana.velocityX = -5;
    banana.lifetime = 200;
    bananaGroup.add(banana);
  }
  
}


function Obstacles() {
  
  if(frameCount%300 === 0){
    
    var obstacle = createSprite(600, 315, 0, 20);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.18;
    
    obstacle.velocityX = -5;
    obstacle.lifetime = 150;
    
    obstacle.addImage(obstacleImage);
    obstacleGroup.add(obstacle);
    
    //obstacle.debug = true;
  }
  
}