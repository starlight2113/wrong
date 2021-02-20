//game states
var gameState="PLAY";

//variables
var jungle,jungleImage;
var sheep,sheepImage;
var tiger,tigerImage;
var grass,grassImage;
var invisibleGround;
var lion,lionImage;
var wolf,wolfImage;
var score;

//groups
var EnemyGroup;
var foodGroup;
var FoeGroup;
var foeGroup;

//functions
var enemy;
var Food;


function preload(){
//loads images for jungle sprite and grass sprite and animations to sheep,tiger,wolf and lion
  jungleImage=loadImage("jungle.png");
  sheepImage=loadImage("sheep.gif");
  tigerImage=loadImage("tiger.gif");
  grassImage=loadImage("grass.png");
  wolfImage=loadImage("wolf1.gif");
  lionImage=loadImage("lion.gif");
}


function setup() {
 //creates canvas or game zone
  createCanvas(600,600);
  
  //creates jungle sprite,adds image,increases the size of the jungle image,defines velocity x
  jungle=createSprite(600,200);
  jungle.addImage(jungleImage);
  jungle.scale=5.3;
  jungle.velocityX=-4;
  
  //creatse invisible ground and sets the visibility of the invisible ground to false
  invisibeleGround=createSprite(300,460,600,12);
  invisibeleGround.visible=false;
  
  //creates sheep sprite,adds image,reduces the size of the sheep image
  sheep=createSprite(50,405);
  sheep.addImage(sheepImage);
  sheep.scale=0.2;
  
  //score
  score=0;
  
  //creates foe group, Foe group, food group, Enemy group
  foeGroup=new Group();
  FoeGroup=new Group();
  foodGroup=new Group();
  EnemyGroup=new Group();
}


function draw() {
 //background
  background("lime");
    
  //game state
  if(gameState==="PLAY") {
    
  //scrolls or repeats the jungle image
  if(jungle.x < 0) {
    jungle.x=jungle.width/2;
  }
  
  //when the player presses the space key the sheep jumps with the velocity of 12 and up wards
  if(keyDown("space")) {
    sheep.velocityY=-12;
  }
  
  //adds gravity to bring the sheep back to it's initial place
  sheep.velocityY=sheep.velocityY+0.8;
  
  //sheep collides with the invisible ground
  sheep.collide(invisibeleGround);
  
  //the score increases +2 when the sheep collides with grass
  if(foodGroup.isTouching(sheep)) {
    score=score+2;
  //destroys the food group when sheep collides with the grass 
    foodGroup.destroyEach();
  }
    
  //when the foe group touches to the sheep the x veloicty of the sheep comes to 0
    if(foeGroup.isTouching(sheep)) {
    sheep.velocityX=0;
  }
    
  //when the foe group touches the sheep the sheep destroys and the state of the game will be end
    if(foeGroup.isTouching(sheep)) {
      sheep.destroy();
      gameState="END";
    }
  
  //when the Enemy group touches to sheep the x velocity comes to 0
    if(EnemyGroup.isTouching(sheep)) {
      sheep.velocityX=0;
    }
    
  //when the Enemy group touches the sheep the sheep destorys and the state of the game becomes end
    if(EnemyGroup.isTouching(sheep)) {
      sheep.destroy();
      gameState="END";
    }
    
  //when the Foe group tuches the sheep the x veloicty comes to 0  
    if(FoeGroup.isTouching(sheep)) {
      sheep.veloictyX=0;
    }
    
  //when the Foe group touches the sheep the sheep destroys and the state of the game becomes end  
    if(FoeGroup.isTouching(sheep)) {
      sheep.destroy();
      gameState="END";
    }
    
  //functions
  enemy();
  Food();
  
  //helps the sprites to display in the game zone
 drawSprites();
  }
 
  //when the game state is end the the shade is red, size is 40 and the text is game over
   if(gameState==="END") {
     fill("red");
     textSize(40);
     text("Game Over👎",190,290);
   }
  
   //when the game state is end the emoji is sheep
    if(gameState === "END") {
      text("🐑",155,150);
    }
  
  //when the game state is end the text is ________  
    if(gameState === "END") {
      text("________",200,150);
    }
  
  //when the game state is end the emoji is tiger  
    if(gameState === "END") {
      text("🦁",355,155);
    }
  
  //when the game state is end the emoji is wolf  
    if(gameState === "END") {
      text("🐺",405,160);
    }
  
  //when the game state is end the emoji is tiger  
    if(gameState === "END") {
      textSize(40);
      text("🐅",455,150);
    }
      
  //the text "score" is displayed in the game zone,gives the color for the text and size for the text
  fill("yellow");
  textSize(20);
  text("score="+score,5,30);
}


function enemy() {
  //creates lion sprite,adds image,reduces the size of the lion image,reppeats the lion image,defines velocity x,gives lifetime,adds lion to foe group and repeats the lion image
  if(frameCount % 200 === 0) {
    lion=createSprite(600,410);
    lion.addImage(lionImage);
    lion.scale=0.3; 
    lion.velocityX=-4;
    lion.lifetime=300;
    foeGroup.add(lion);
  }
  
  //creates wolf sprite,adds image,reduces the size of the wolf image,defines velocity,repeats the wolf image,gives lifetime,adds wolf to foe group
  if(frameCount % 400 === 0) {
    wolf=createSprite(600,410);
    wolf.addImage(wolfImage);
    wolf.scale=0.3;
    wolf.velocityX=-6;
    wolf.lifetime=300;
    EnemyGroup.add(wolf);
  }
   
  //creates tiger sprite,adds image,reduces the size of the tiger image,repeats the tiger image,defines velocity x,gives lifetime,adds tiger to foe group
  if(frameCount % 600 === 0) {
    tiger=createSprite(600,400);
    tiger.addImage(tigerImage);
    tiger.scale=0.5;
    tiger.velocityX=-4;
    tiger.lifetime=300;
    FoeGroup.add(tiger);
  }
}

function Food() {
  //creates grass sprite,adds image,reduces the size of the grass image,defines velocity,gives lifetime,repests the image randomly and adds grass to food group
  if(frameCount % 150 === 0) {
  grass=createSprite(600,50);
  grass.addImage(grassImage);
  grass.scale=0.2;
  grass.velocityX=-4;
  grass.lifetime=300;
  grass.y=Math.round(random(120,240));
  foodGroup.add(grass);
  }
}