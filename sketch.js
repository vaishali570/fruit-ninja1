var PLAY=1;
var END=0;
gameState=1;

var sword ,enemy,fruit,fruitGroup,enemyGroup;
var swordImage,monsterImage,fruit1,fruit2,fruit3,fruit4;
var gameOverImage;
var cuttingSound,gameOverSound;


function preload(){
  swordImage=loadImage("sword.png");
  monsterImage=loadImage("alien1.png","alien2.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  gameOverImage=loadImage("gameover.png");
  cuttingSound=loadSound("knifeSwooshSound.mp3");
  gameOverSound=loadSound("gameover.mp3");
}

function setup(){
  createCanvas(600,600);
  
  sword=createSprite(40,200,20,20);
  sword.addImage(swordImage);
  sword.scale=0.7;
  
  fruitGroup=new Group();
  enemyGroup=new Group();
 
  score=0;
}

function draw(){
  background("lightblue")
  
  if (gameState===PLAY){
    fruits();
    enemy();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if (fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      cuttingSound.play();
      score=score+2;
    }
    else
      { 
      if (enemyGroup.isTouching(sword)){
        gameOverSound.play();
        gameState=END;
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
        sword.addImage(gameOverImage)
        sword.x=200;
        sword.y=200;
      }   
      }
  }
  drawSprites();
  text("score"+score,300,30)
}
  
function fruits(){
  
  if (World.frameCount%80===0){
   r=Math.round(random(1,2));
    
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
    //fruit.debug=true
   if (r==1){
     fruit.x=400;
     fruit.velocityX=-(9+(score/4))
   }else{
     if (r==2){
       fruit.x=0;
       fruit.velocityX=-(9+(score/4));
     }
   }  
    
    
    
   r=Math.round(random(1,4)) 
    
    if (r==1){
      
      fruit.addImage(fruit1)
    }
    else
      if (r==2){
        fruit.addImage(fruit2)
      }
    else
      if (r==3){
        fruit.addImage(fruit3)
      }
    else
      if (r==4){
        fruit.addImage(fruit4)
      }
    
    
    fruit.y=Math.round(random(50,340))
    fruit.velocityX=-(7+4*score/4);
    fruit.setLifetime=100;
  
fruitGroup.add(fruit);
  }
}
function enemy(){
  if (World.frameCount%200===0){
    monster=createSprite(400,200,20,20)
    monster.addImage(monsterImage)
    monster.y=Math.round(random(100,300))
    monster.velocityX=-(8+4*(score/10));
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
    
  }
}  
  