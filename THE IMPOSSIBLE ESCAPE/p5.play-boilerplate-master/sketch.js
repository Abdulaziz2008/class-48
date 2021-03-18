
var jungle,jungleimage
var moglirunning,mogli
var invisibleground
var gameState="home"
var score=0

function preload() {
jungleimage=loadImage("jungle.jpg")
moglirunning=loadAnimation("mogli2.png","moglii.png")
appleimage=loadImage("apple.png")
bananaimage=loadImage("banana.png")
cactusimage=loadImage("cactus.png")
gemsimage=loadImage("gems.png")
rockimage=loadImage("rock.png")
snakeimage=loadImage("snake.png")
mangoimage=loadImage("mango.png")
gameOverimage=loadImage("gameOver.png")
playbuttonimage=loadImage("play button.png")
fruitsound=loadSound("fruitsound.wav")
gamemusic=loadSound("gamemusic.wav")
gameoversound=loadSound("gameover sound.wav")
playsound=loadSound("playsound.wav")
}

function setup() {
  createCanvas(1200,600);
 jungle= createSprite(-60, 200, 50, 50);
  jungle.addImage(jungleimage)
  jungle.velocityX=-(4+score/100)
  mogli= createSprite(90,460)
  mogli.addAnimation("running",moglirunning)
  mogli.scale=0.6
  invisibleground=createSprite(-60,600,600,1)
  obstaclesGroup=new Group ();
  fruitsGroup=new Group();
  playbutton=createSprite(600,300)
  gamemusic.loop();
}

function draw() {
  background(255,255,255); 
  if(gameState==="home"){
//gamemusic.pause();
playbutton.addImage(playbuttonimage)
if(mousePressedOver(playbutton)){
  gameState="play"
  playbutton.visible=false
  playsound.play();
}
if (jungle.x<0){
  jungle.x=1200
 }
  }
  if(gameState==="play") {
   if (jungle.x<0){
  jungle.x=1200
  
 }
 playbutton.visible=false
 if(keyDown("UP_ARROW")){
 mogli.velocityY=-17
}
mogli.velocityY=mogli.velocityY+1.0
spawnFruits();
spawnObstacles();

for(var i=0;i<fruitsGroup.length;i++){
if(fruitsGroup.get(i).isTouching(mogli)){
score=score+100
fruitsGroup.get(i).destroy();
fruitsound.play();
}
}
if(obstaclesGroup.isTouching(mogli)){
gameState="end"
gameoversound.play();
gamemusic.pause();
}
}
//END STATES
 if(gameState==="end"){

fruitsGroup.destroyEach();
mogli.destroy();
jungle.velocityX=0;
obstaclesGroup.setVelocityXEach(0);
gameOver=createSprite(600,300)
gameOver.addImage(gameOverimage);
 }


  
  mogli.collide(invisibleground)
  drawSprites();
  fill ("yellow")
  textSize(25)
  textFont("Georgia")
  text("SCORE = " +score,1000,50)
}
function spawnObstacles(){
if(frameCount %150===0){
obstacle=createSprite(1200,500)
obstacle.scale=0.4

obstacle.setCollider("rectangle",0,0,350,350)
obstacle.velocityX=-(4+score/100)
var rand = Math.round(random(1,3))
switch(rand){
  case 1:obstacle.addImage(cactusimage)
  break
  case 2:obstacle.addImage(snakeimage)
  break
  case 3:obstacle.addImage(rockimage)
  break
}
obstaclesGroup.add(obstacle)
}

}
function spawnFruits(){
if(frameCount %250===0){
fruit=createSprite(1200,100)
fruit.scale=0.5
fruit.velocityX=-(5+score/100)
fruit.y=Math.round(random(100,300))
var rand =Math.round(random(1,3))
switch(rand){
case 1:fruit.addImage(bananaimage)
break
case 2:fruit.addImage(appleimage)
break
case 3:fruit.addImage(mangoimage)
}
fruitsGroup.add(fruit)

}




}
