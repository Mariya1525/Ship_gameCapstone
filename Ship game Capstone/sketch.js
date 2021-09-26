var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;

localStorage["HighScore"]=0;

function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  shipimg = loadImage("ship.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  restartimg=loadImage("gameOver.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water = createSprite(200,350,600,600);
  water.addImage("water ground",waterbg);
  
  //creating ship
  ship=createSprite(200,300,50,50);
  ship.addImage("ship",shipimg);
  ship.scale=0.4;
 
  
  //creating helicopter group
  helicopterGroup=new Group();

  //creating bomb group
  bombGroup=new Group();

    

  //ship.debug = "true";
ship.setCollider("rectangle",0,300,400,25)
}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);

  
    
  //gameState play
  if(gameState === PLAY){
    //increase score
    score = score + Math.round(frameCount/300);

    
    //Call user defined function
    createBomb();
    spawnHelicopter();
    spawnBomb();
    if(bombGroup.isTouching(ship)){
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
    ship.addImage("ship",restartimg)
   //water velocity becomes zero

   //destroy Helicopter group
   helicopterGroup.destroyEach();
   //destroy bomb group
   bombGroup.destroyEach();
  
    
  }
  
 
 //for infinite background 
 if(water.position.x < 300){
    water.position.x = 400;
    }
    
  
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(800,80,200,50);
    helicopter.addImage("helicopter",helicopterimg);
    helicopter.setVelocity(-5,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  }
}

function spawnBomb(){
 // create bombs at random position
 if(frameCount%500 === 0){
   var bomb=createSprite(Math.round(random(50,350),40,10,10));
   bomb.addImage(bombimg);
   bomb.scale=0.3;
   bomb.velocityX(-3,2);
   bombGroup.add(bomb);
 }
 //use Math.random
}







