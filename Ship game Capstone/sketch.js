var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg, shipimg, helicopterimg, bombimg, restartimg;
var water, ship, helicopter, bomb;
var helicopterGroup, bombGroup;
var score = 0;

localStorage["HighScore"] = 0;

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
  shipimg.frameDelay=15;
  //creating ship
  ship=createSprite(200,300,50,50);
  ship.addImage("ship",shipimg);
  ship.scale=0.4;
 
  
  //creating helicopter group
  helicopterGroup=new Group();

  //creating bomb group
  bombGroup=new Group();
  //creating restart button
  restart=createSprite(400,200,200,250);
  restart.addImage("restart",restartimg);
  restart.scale=0.2;

  score=0;
    

  //ship.debug = "true";
ship.setCollider("rectangle",0,0,400,400);
}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);
  
  //gameState play
  if(gameState === PLAY){
    restart.visible = false;
    //increase score
    score = score + Math.round(frameCount/300);
    water.setVelocity(-2,0);

    if(keyDown("left") && ship.position.x  > 60){
      ship.position.x  -= 5;
    }
    if(keyDown("right") && ship.position.x  < 740){
      ship.position.x +=  5;
    }

    
    //Call user defined function
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
     water.setVelocity(0,0);
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
 if(frameCount%150 === 0){
   bomb=createSprite(random(200,600),90,20,20);
   bomb.addImage("bomb falling",bombimg);
   bomb.setVelocity(0,5);
   bomb.scale=0.1;
   bomb.lifetime=60;
   bombGroup.add(bomb);
 }
 //use Math.random
}

function reset(){
  gameState = PLAY;
  restart.visible = false;

  if(localStorage["Highscore"]<score){
    localStorage["Highscore"] = score;
  }
  console.log("HIGH SCORE IS: " + localStorage["Highscore"]);
  score = 0;
}









