var monkey , monkey_running;
var bananaImage,  obstacleImage;
var bananaGroup,obstacleGroup;
var ground;
var score;
var survivaltime=0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstalceImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(600, 400);

  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
background(255);
  
   if (gamestate === PLAY) {
      if(ground.x<0){
    ground.x = ground.width/2;
  }
  
  if(keyDown("space")&& monkey .y >200){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 1 ;
  
  monkey.collide(ground);
   
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("score: "+ score,500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime =Math.ceil(frameCount/frameRate())
  text ("survival time : "+ survivaltime ,100,50);
  
    if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
    }
  food();
  obstacles();
if(monkey.isTouching(obstacleGroup)){
 gamestate = END ;
}
   }  else if (gamestate === END){
     
     bananaGroup.setVelocityXEach(0);
     obstacleGroup.setVelocityXEach(0);
     monkey.velocityX = 0;
     monkey.velocityY = 0;
ground.velocityX = 0;
     ground.velocityY = 0;
      bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);    

     
   }
  drawSprites();
}
function food(){
  if (frameCount % 80 ===0){
    var banana = createSprite(600,200,10,10);
     banana.y = Math.round(random(150,300));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -2
    banana.lifetime = 600;
    bananaGroup.add(banana);
  }
}
function obstacles(){
  if (frameCount % 300 === 0){
   var obstacle = createSprite(600,330,10,10);
   obstacle.velocityX = -6 ;
    obstacle.addImage( obstalceImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   obstacleGroup.add(obstacle);
 }
}