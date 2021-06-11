
var PLAY = 1;
var END = 0;
var gameState = PLAY;


var tank,tankImg;
var bg,bgImg;
var ground,groundImg,gameState;
var welcome,welcomeImg;
var play,playImg;
var play1,play1Img;
var instruction,instructionImg;
var bullet,bulletImg;
var obstacle1,obstacle1Img;
var air1,air1Img;
var obstacle3,obstacle3Img;

var health=10;
var points=0;

function preload(){
  
  bgImg = loadImage("game.bg.png");
  tankImg = loadAnimation("tank1.png","tank2.png","tank3.png","tank4.png","tank5.png")
  groundImg = loadImage("ground.png");
  welcomeImg = loadImage("welcom.jpeg");
  playImg = loadImage("play1.png");
  instructionImg = loadImage("intruction.jpeg");
  play1Img = loadImage("play.png");
  bulletImg = loadImage("bullet.png");
  obstacle1Img = loadAnimation("obstacle1.png","obstacle2.png");
  air1Img = loadImage("air1.png");
  obstacle3Img = loadImage("obstcle 3.png");
  
}
function setup(){
  createCanvas(600,500);
  
  tank = createSprite(100,400);
  tank.addAnimation("tank_Img",tankImg)
  tank.scale = 0.8

  ground = createSprite(300,320);
  ground.addImage(groundImg)
  ground.scale=1
  ground.velocityX = -3
  welcome  = createSprite(270,300);
  welcome.addImage(welcomeImg);
  welcome.scale = 0.5
  play = createSprite(350,300);
  play.addImage(playImg);
  play.scale = 0.5
  instruction = createSprite(300,250);
  instruction.addImage(instructionImg);
  instruction.scale = 0.8
  play1 = createSprite(300,450);
  play1.addImage(play1Img);


  bulletGrp = new Group();
  obstacleGrp = new Group();
  obstacle1Grp = new Group();
  
}
function draw(){
  
  
  
  
  if(health === 0){
gameState = 1;
    points = 0
    health =10
  }
  

  
  if(keyDown("space")){
bullet();
  }
 

 
  if(ground.x<150){
ground.x = 200
  }
  
  if(mousePressedOver(play)){
gameState = 2
  }
  
  if(bulletGrp.isTouching(obstacleGrp)){
obstacleGrp.destroyEach();
    points=points+1
  }
  if(bulletGrp.isTouching(obstacle1Grp)){
    obstacle1Grp.destroyEach();
    points = points+1
  }
  if(obstacleGrp.collide(tank)){
    health = health-1;
  }
  if(obstacle1Grp.collide(tank)){
    health=health-1;
  }
  

  if(gameState === 1){
background(0)
    welcome.visible = true;
    play.visible =true;
    instruction.visible = false;
    play1.visible = false;
    ground.visible = false;
    bulletGrp.visibleEach=false;
    obstacleGrp.visibleEach = false;
    obstacle1Grp.visibleEach = false;

  }
  
  
  
  if(gameState === 2){
    welcome.visible = false;
    play.visible = false;
    instruction.visible = true;
    ground.visible= false;
    play1.visible = true;
      bulletGrp.visibleEach=false;
background(0)
  }
  
  
  
  if(gameState === 3){
background(bgImg);
    ground.visible =true;
    instruction.visible = false;
    play1.visible = false;
      bulletGrp.visibleEach=true;
    
      fill("white")
  textSize(25)
  stroke("black")
  strokeWeight(5)

  text(" Health : "+health,30,60)
      text(" POINTS : "+points ,30,100)
    
    
         fill("yellow")
  textSize(50)
  stroke("red")
  strokeWeight(7)
  text(" SPACE WAR-4 " ,150,80)

    obstacle();
    obstacle1();
  }
  
  
  
  if(mousePressedOver(play1)){
gameState = 3;
    
  }
  
  drawSprites();
  
  
 
}
function bullet(){
   if(frameCount % 10 === 0){
    p2bullet = createSprite(tank.x+50,tank.y)
    p2bullet.addImage(bulletImg)
    p2bullet.scale=0.5
    p2bullet.velocityX=10
    p2bullet.lifetime=300
bulletGrp.add(p2bullet);

   }

}
function obstacle(){
  if(frameCount % 200 === 0){
  enemy = createSprite(900,380);
  enemy.addAnimation("obstacles",obstacle1Img);
  enemy.velocityX=-5
  enemy.lifetime=150 
  obstacleGrp.add(enemy);
  }
}
function obstacle1(){
  if(frameCount % 300 === 0){
  enemy1 = createSprite(900,420);
  enemy1.addImage(obstacle3Img);
    enemy1.scale = 0.5
  enemy1.velocityX=-5
  enemy1.lifetime=150 
  obstacle1Grp.add(enemy1);
  }
}