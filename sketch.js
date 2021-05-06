var bgImg;
var gameState = "start"
var dora;
var dora_run;
var dora_collided;
var ground;

var obstacleGroup;
var themiceGroup;

var END = 0;
var score = 0;
var gameOver, restart;

function preload(){
  bgImg = loadImage("background.png");
  startImg = loadImage("Loading screen.png")
  playImg = loadImage("play button.png")
  dora_run = loadAnimation("dora.png","dora1.png","dora2.png","dora3.png","dora4.png","dora5.png");
  dora_collided = loadImage("dora jump.png");
  mouseImg = loadImage("mouse.png");
  mouse1 = loadImage("mouse1.png");
  mouse2 = loadImage("mouse2.png");
  mice = loadImage("m1.png");
  mice1 = loadImage("m2.png");
  mice2 = loadImage("m3.png");


  
  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  dorasong = loadSound("Dorasong.mp3");
}

function setup() {
  createCanvas(1200,550);
  bg = createSprite(600,300,2000,10);
  bg.visible = true;
  play = createSprite(260,450);
  play.visible = true;
  ground = createSprite(200,525,10000,20);
  ground.static = true;
  ground.visible  = false;
  dora = createSprite(100,470,120,200);
  dora.addAnimation("run",dora_run);
  dora.addImage(dora_collided);
  dora.visible = false;
  dora.scale = 0.7;
 

gameOver = createSprite(580,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
restart = createSprite(580,350);
restart.addImage(restartImg);
restart.scale = 0.5;
gameOver.visible = false;
restart.visible = false;
obstacleGroup = new Group(); 
themiceGroup = new Group();
}

function draw() {
  
  background('lightblue');  
  fill("red");
  text("Score: "+score,500,50);

  if (gameState === "start"){
   
   bg.addImage (startImg);
   bg.scale = 1;
   play.addImage(playImg);
   play.scale = 0.7;
   obstacleGroup.destroyEach();
   obstacleGroup.visible = false;
   obstacleGroup.lifetime = 0;
   themiceGroup.destroyEach();
   themiceGroup.visible = false;
   themiceGroup.lifetime = 0;
   
   if(mousePressedOver(play)){
    gameState = "play";
}
 }

if (gameState === "play"){
 bg.addImage(bgImg);
 bg.scale = 0.7;
 bg.velocityX = -(15  + 3*score/100);
 play.visible = false;
 dora.visible = true;
 dora.velocityX = 0;
 dora.setCollider("circle",100,0,120);
 //dora.debug = true;
 ground.visible = false;

 //dora.debug = true;

 
 if(keyDown("space")&& dora.y >= 420 ){
    dora.velocityY = -16;
    //dora.changeImage(dora_jump);  
}

    dora.velocityY = dora.velocityY  +1.1;
      if (bg.x < 0){
      bg.x = bg.width/2;
    }
}
    
      
    
spawnMouse();
spawnFastMouse();


if(themiceGroup.isTouching(dora)){
  gameState = END;
}


if(obstacleGroup.isTouching(dora)){
  gameState = END;
}
else if (gameState === END) {

gameOver.visible = true;
restart.visible = true;
obstacleGroup.visible = false;
obstacleGroup.destroyEach();
themiceGroup.visible = false;
themiceGroup.destroyEach();
dora.y = 470;
dora.visible = false;
//dora.changeAnimation(dora_collided);

if(mousePressedOver(restart)){
  reset();
}

}
dora.collide(ground);





  


 drawSprites();


function reset(){
  gameState = "play"
  gameOver.visible = false;
  restart.visible = false;
  
}


  

function spawnMouse() {
  if(frameCount % 93 === 0) {
    var obstacle = createSprite(1300,460,60,50);
    //obstacle.debug = true;
    obstacle.velocityX = -18
    obstacle.scale = 0.1; 
    obstacle.setCollider("circle",0,0,30);
    //obstacle.debug = true;
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(mouse2);
              break;
      case 2: obstacle.addImage(mouseImg);
              break;
      case 3: obstacle.addImage(mouse1);
              break;
     
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  
    dora.depth = obstacle.depth;
  dora.depth = dora.depth+1;
  }



}

function spawnFastMouse() {
  if(frameCount % 90 === 0) {
    var chuha = createSprite(1300,460,60,50);
    //obstacle.debug = true;
    chuha.velocityX = -27;
    chuha.scale = 0.1; 
    chuha.setCollider("circle",10,0,40);
    //chuha.debug = true;
    //obstacle.debug = true;
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: chuha.addImage(mice);
              break;
      case 2: chuha.addImage(mice1);
              break;
      case 3: chuha.addImage(mice2);
              break;
     
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    chuha.scale = 0.5;
    chuha.lifetime = 300;
    //add each obstacle to the group
    themiceGroup.add(chuha);
  
    dora.depth = chuha.depth;
  dora.depth = dora.depth+1;
  }



}
}



 




