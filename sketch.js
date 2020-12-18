var runner,runnerImg ;
var obstacles,obstaclesGroup,obstaclesImage ;
var ground,groundimage,invisibleGround;
var score,scoreVal,witeScore;
var END=0;
var PLAY=1;
var gameState=PLAY;

function preload()
{
    groundImage = loadImage("images/ground2.png");
    obstaclesImage = loadImage("images/stone.png");
    

}

function setup() {

    createCanvas(800,700);
    database = firebase.database();

    runner = createSprite(100,590,40,40);
    runner.shapeColor="red";
  

    ground = createSprite(400,680,800,10);
    ground.addImage(groundImage);
    ground.x = ground.width /2;
    ground.velocityX = -4;

    invisibleGround = createSprite(400,685,800,10);
    invisibleGround.visible = false;

    score=database.ref('Score');
    score.on("value",function(data){

    scoreVal=data.val();

    })

    

    obstaclesGroup = new Group();

  
  
}


function draw() { 

    background("black");

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("UP_ARROW")) {
      runner.velocityY = -10;
      writeScore(scoreVal);
    
    }

  runner.velocityY =runner.velocityY + 0.8;
  runner.collide(invisibleGround);

    
    spawnObstacles();

    if(obstaclesGroup.isTouching(runner)){
      gameState = END;
      obstaclesGroup.setVelocityXEach(0);
      ground.velocityX=0;
        runner.velocityY=0;
      obstaclesGroup.setLifetimeEach(-1);
      reset();
      
    }

    textSize(20)
    fill("lime");
    text("Score:"+scoreVal,10,50);

    textSize(20)
    fill("yellow");
    text("Press space to restart",295,150);

    textSize(20)
    fill("cyan");
    text("Press UP_ARROW  to jump!",270,100);


  drawSprites();
 

}

function spawnObstacles(){

    if(frameCount%100===0){
          var obstacles=createSprite(800,660,10,10);
          obstacles.addImage(obstaclesImage);
          obstacles.scale=0.15;
          obstacles.velocityX=-4;
          obstacles.lifetime=200;
          obstaclesGroup.add(obstacles);
      }
  }

function writeScore(x){

    x = x +1;
    database.ref('/'). update ({

      Score:x

    })
}

function reset(){

    if(keyDown("space")){
      gameState = PLAY;
      obstaclesGroup.destroyEach();
      ground.velocityX = -4;
      scoreVal = 0;

  }
}