var PLAY = 1;
var END = 0 ;
var gameState = PLAY;

var ghost, tower, door, climber;
var ghostImage, towerImage, doorImage, climberImage;
var doorGroup, climberGroup, blockGroup;



function preload(){
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");  
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png"); 
  
  
  
  
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300,600,600);
  tower.addImage("tower", towerImage);
  tower.velocityY = 5;
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3;
  
  climberGroup = new Group();
  blockGroup = new Group();
  doorGroup = new Group();
  
}

function draw(){
  background("black");
  
  if(gameState===PLAY){
    if(tower.y > 600){
      tower.y = 300;
    }
      
    if(keyDown("space")){
      ghost.velocityY = -3;
            
    }
    
    ghost.velocityY = ghost.velocityY + 1;
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x -2;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 2;
      
    }
    
    if(ghost.y>600 || blockGroup.isTouching(ghost)){
      gameState = END;
      ghost.destroy();
    }
 spawnDoors(); 
    
  drawSprites();     
}
   
  
  else if(gameState=== END){
    fill("yellow");
    textSize(30);
    text("Game Over", 200, 300);  
         
    }

  
  
  
  
}

function spawnDoors(){
  if(frameCount % 200 === 0){
     door = createSprite(30,0,10,10);
    door.x = Math.round(random(100,500));
    door.addImage("door",doorImage);
    door.velocityY = 5;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    climber = createSprite(30,50,10,10);
    climber.x = door.x;
    climber.width = door.width;
    climber.addImage("climber",climberImage);
    climber.velocityY = 5;
    
    block = createSprite(30,65,10,10);
    block.x = climber.x;
    block.width = climber.width;
    block.velocityY = 5;
    block.debug = true;
    
    doorGroup.add(door);
    climberGroup.add(climber);
   blockGroup.add(block);
    
  }
}











