var trex,trex_img;
var bordas;
var chao, chao_img,chao_invisible
var nuvem, nuvem_img;
var cacto;
var score = 0
var gpcacto
var gpnuvem
var JOGAR=1
var PERDER=2
var mododejogo = JOGAR
var trexcollided
var GameOver
var Restart
var GameOverImage
var RestartImage
var SoundJump
var SoundDie
var SoundCheckPoint
var abaixar1




function preload(){
  //pre carrega os arquivos do jogo

  trex_img = loadAnimation("trex3.png","trex4.png");
  chao_img = loadImage("ground2.png");
  nuvem_img = loadImage("cloud.png");
  cacto_1 = loadImage("obstacle1.png")
  cacto_2 = loadImage("obstacle2.png")
  cacto_3 = loadImage("obstacle3.png")
  cacto_4 = loadImage("obstacle4.png")
  cacto_5 = loadImage("obstacle5.png")
  cacto_6 = loadImage("obstacle6.png")
  trexcollided = loadImage("trex_collided.png")
  GameOverImage = loadImage("gameOver.png")
  RestartImage = loadImage("restart.png")
  SoundJump = loadSound("jump.mp3")
  SoundDie = loadSound("die.mp3")
  SoundCheckPoint = loadSound("checkPoint.mp3")
 abaixar1= loadAnimation("trex_low1.png", "trex_low2.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);

  

 // var aleatorio = Math.round(random(1,10))
//console.log(aleatorio)


  trex = createSprite(50,height-100,20,20);
  trex.addAnimation("running",trex_img);
  trex.scale = 0.5;
  trex.addImage("collided", trexcollided);
  trex.addAnimation("abaixar1",abaixar1);

  bordas = createEdgeSprites();

  chao = createSprite(width/2,height-10,600,20);
  chao.addImage("chao.run", chao_img);
  chao.x = chao.width/ 2;

  chao_invisible = createSprite(width/2,height,width,20);

  chao_invisible.visible= false

  gpcacto = new Group()
  gpnuvem = new Group()

  trex.debug= false
  trex.setCollider("circle", 0, 0, 30);

  GameOver = createSprite(width/2,height/2)
  GameOver.addImage("GameOver",GameOverImage);
 
  Restart = createSprite(width/2,height/2 +50)
  Restart.addImage("Restart",RestartImage);

  Restart.visible = false
  GameOver.visible = false 

}

function draw(){
  background('white');

 


  


 

 

 
  
 text("PONTOS "+ score, width/2 +200, 50 )
 


 if(mododejogo ===JOGAR){
 if (score%100 === 0 && score > 0){
 SoundCheckPoint.play()  
 }

  if((touches.length>0)&& trex.y > height-34){
    trex.velocityY = -15;
   SoundJump.play()
   touches=[]

  }

  if(chao.x < 0){
    chao.x = chao.width/ 2; 
  }

  trex.velocityY = trex.velocityY + 1;

  chao.velocityX = -(5 + score/100) 

  trex.collide(chao_invisible);

  criarnuvem()

  criarcacto()

  score=score + Math.round(frameRate()/60);

 if(keyDown("down")){ 
 trex.changeAnimation("abaixar1")

 }
 else{
  trex.changeAnimation("running");
 }


 if(trex.isTouching(gpcacto)){
 mododejogo = PERDER
 SoundDie.play()
 //trex.velocityY= -15
//SoundJump.play()
  }
 
 }
 else if(mododejogo === PERDER){
 chao.velocityX = 0
 gpcacto.setVelocityXEach(0)
 gpnuvem.setVelocityXEach(0)
 trex.velocityY = 0
 gpnuvem.setLifetimeEach(-1)
 gpcacto.setLifetimeEach(-1)
 trex.changeAnimation("collided");
 Restart.visible = true
 GameOver.visible = true 
 
 if(touches.length>0){
 reset();
 touches=[]
 }
 
 } 

 
  


  drawSprites();
}


function criarnuvem(){
if(frameCount%60 === 0){
  nuvem = createSprite(width+20,100,20,20);
 nuvem.velocityX= -3
 nuvem.addImage(nuvem_img);
 nuvem.scale = 0.8
 nuvem.y = Math.round(random(height-180,height-100))
nuvem.depth = trex.depth
trex.depth = trex.depth + 1
nuvem.lifetime= width+40
gpnuvem.add(nuvem);

}
}


function criarcacto(){
if(frameCount%80 === 0){
cacto = createSprite(width+20,height-20,20,20);
cacto.velocityX= -(5 + score/100)
var cacto_img = Math.round(random(1,6));
switch(cacto_img){
case 1: cacto.addImage(cacto_1);
break;
case 2: cacto.addImage(cacto_2);
break;
case 3: cacto.addImage(cacto_3);
break;
case 4: cacto.addImage(cacto_4);
break;
case 5: cacto.addImage(cacto_5);
break;
case 6: cacto.addImage(cacto_6);
break;
}
cacto.scale= 0.5
cacto.lifetime= width+40
gpcacto.add(cacto);
}
}

function reset(){
mododejogo = JOGAR
gpcacto.destroyEach();
gpnuvem.destroyEach();
score = 0;
Restart.visible = false
GameOver.visible = false
trex.changeAnimation("running")
}





