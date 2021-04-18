
var monkey , monkey_running, monkey_cry;
var bgn, backgroundImg, invGround, topEdge, ground, groundImg;
var banana ,bananaImage, bananaGroup, obstacle, obstacleImage, obstacleGropu;
var FoodGroup, obstacleGroup;
var randFC, randFC2, randX, randY;
var score = 1;
var hunger = 1;

const END = 0;
const PLAY = 1;
const WIN = 2;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkey_cry = loadAnimation("monkeycry.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
  backgroundImg = loadImage("background.jpg");
  groundImg = loadImage("ground.png");
  
}



function setup() {
  createCanvas(550, 400);
  
//   Creating Background
  bgn = createSprite(275, 200, 50, 50);
  bgn.addImage("background", backgroundImg);
  bgn.scale = 0.1;
  
// Creating Ground
  ground = createSprite(275, 385, 550, 10);
  ground.addImage("Ground", groundImg);
  ground.scale = 0.12;
  ground.velocityX = -5;
  
  
//   Creating Monkey
  monkey = createSprite(70, 320, 30, 70);
  monkey.addAnimation("Walking", monkey_running);
  monkey.addAnimation("crying", monkey_cry);
  monkey.scale = 0.15;
  

  
  // Creating invisible Ground
  invGround = createSprite(275, 370, 550, 10);
  invGround.visible = false;
  
   topEdge = createSprite(275, 10, 550, 10);
  topEdge.visible = false;

//   Creating random value for FrameCount
  randFC = Math.round(random(70, 85));
//    ^ FC for frame count :)
   
//   Creating random value for FrameCount for banana
  randFC2 = Math.round(random(70, 85));
//    ^ FC for frame count :)

  
//   Creating Group for banama and obstacle
  bananaGroup = new Group();
  obstacleGroup = new Group();
}


function draw() {
  background(150)
  // console.log(frameRate())
  
//   Defining Play State
  if(gameState==PLAY){
  
//   Making Monkey to jump
  if(keyDown("space") && monkey.y >= 70){
    monkey.velocityY = -10;
  }
      

  
  
//   Creating infint ground
  if (ground.x < 0){
      ground.x = 500;
    }
    
//   Spwaning obstacles
  if(frameCount%randFC==0)
    {
      spwanObstacle();
    }
    
    //   Spwaning BaNaNas
  if(frameCount%randFC2==0)
    {
      spwanBanana();
    }
    
    
    //   Destroying Food
  if(monkey.isTouching(bananaGroup))
    {
      bananaGroup.destroyEach();
      hunger= hunger+1;
    }
  
//   Destroying monkey
  if(monkey.isTouching(obstacleGroup))
    {
      
      gameState=END;
      monkey.scale = 0.25;
      
    }
    
    
    
    score = Math.round(frameCount/3);
}
   
  
  monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invGround);
  monkey.collide(topEdge);
  
  
//   Setting RESTART
if(gameState==END && keyDown("r"))
  {
    reset();
    monkey.scale = 0.15;
    
  }
  
  
  
//   Defining END state
  if(gameState==END){
    
    ground.velocityX = 0;
    // obstacle.velocityX = 0;
    banana.velocityX = 0;
    
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
    monkey.changeAnimation("crying", monkey_cry);
  }
  
  
//   Making game more hard
  if(frameCount%40==0){

  if (hunger%5==0){
    ground.velocityX=ground.velocityX-1;
    bananaGroup.setVelocityXEach=bananaGroup.setVelocityXEach-1;
    hunger=0;
  }
  // ^ i am trying something new plz chech its all ok
}
  
//   Creating game win
  if (score==1000){
    gameState=WIN
  }
  
//   Declaring Win State
  if(gameState==WIN){
    
      ground.velocityX = 0;
      // obstacle.velocityX = 0;
      bananaGroup.setVelocityXEach(0);

      obstacleGroup.setLifetimeEach(-1);
      bananaGroup.setLifetimeEach(-1);
    
    
  }
  
  drawSprites();
  
  //   Displaying sirvival time
  fill("black");
  stroke("gray");
  textSize(20);
  text("Survival Time: " + score, 200, 50);
  
  //   Displaying sirvival time
  if(gameState==END){
    
  fill("black");
  stroke("gray");
  textSize(20);
  text("Game Over :(  Press 'R' to restart", 140, 190);
    
  }
  
//   Game win
  if(gameState==WIN){
    
  fill("yellow");
  stroke("black");
  textSize(50);
  
    text("You Win !!!", 150, 200);
  }
  
//   Creating Hunger
  textSize(15);
  text("Hunger: " + hunger, 450, 50)
  
}


function spwanObstacle()
{
  
  //   Creating random value for X
  randX = Math.round(random(480, 510));
  
  //   Creating obstacle
  obstacle = createSprite(randX, 340, 20, 40);
  obstacle.addImage("Stone", obstaceImage);
  obstacle.scale = 0.11;
  if(gameState==PLAY){
  obstacle.velocityX = ground.velocityX;
  }
  obstacle.lifetime = 100;
  
  obstacleGroup.add(obstacle);
  console.log(randX);
}


function spwanBanana()
{
  
    //   Creating random value for X
  randY = Math.round(random(80, 200));
  
  //   Creating BaNaNa
  banana = createSprite(500, randY, 20, 50);
  banana.addImage("Food", bananaImage);
  banana.scale = 0.12;
  banana.velocityX = -6;
  banana.lifetime = 80;
  
  bananaGroup.add(banana);
}


function reset()
{
    gameState=PLAY;
    score=0;
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.velocityX = -5;
    monkey.x = 70;
    frameCount=0;
    
    monkey.changeAnimation("Walking", monkey_running);
}






// THANK YOU :)