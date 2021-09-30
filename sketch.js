var trex, trex_correndo, trex_colidiu;
var solo, soloinvisivel, imagemdosolo;
var nuvem, nuvemImg;
var obs1, obs2, obs3, obs4, obs5, obs6;
var obs1Img, obs2Img, obs3Img, obs4Img, obs5Img, obs6Img;
var GameOver, GameOverImg;
var restart, restartImg;
var somMorte, somPulo, somCheckP, musiquinha_do_zelda;


var pontuacao=0;


var JOGAR= 1;
var ENCERRAR = 0;
var estadoJogo= JOGAR;


function preload(){
  trex_correndo = loadAnimation("trex1.png","trex2.png","trex3.png");
 
  
  imagemdosolo = loadImage("ground2.png");
  
  nuvemImg=loadImage("nuvemBonita.png"); 
  
  obs1Img=loadImage("obstacle1.png");
  obs2Img=loadImage("obstacle2.png");
  obs3Img=loadImage("obstacle3.png");
  obs4Img=loadImage("obstacle4.png");
  obs5Img=loadImage("obstacle5.png");
  obs6Img=loadImage("obstacle6.png");
  
  trex_colidiu=loadAnimation("trex_colide.png");
  
  GameOverImg=loadImage("gameOver.png");
  
  restartImg=loadImage("restart.png");
  
  
  somMorte = loadSound("die.mp3");
  somPulo = loadSound("jump.mp3");
  musiquinha_do_zelda = loadSound("sommaneiro.mp3");
  
  
}

function setup() {

  createCanvas(600,200)
  
 
  
  //criar um sprite do trex
  trex = createSprite(50,190,20,50);
  trex.addAnimation("running", trex_correndo);
  trex.addAnimation("colide",trex_colidiu);
  trex.scale = 0.5;
  
  //criar um sprite do solo
  solo = createSprite(200,180,400,20);
  solo.addImage("ground",imagemdosolo);
  solo.velocityX = -(5+pontuacao/1000);
  solo.x = solo.width /2;

  
  //criando solo invisível
  soloinvisivel = createSprite(200,190,400,10);
  soloinvisivel.visible = false;
  
  GameOver=createSprite(300,100,10,10);
  GameOver.addImage(GameOverImg);
  GameOver.scale=0.6;
  
  restart=createSprite(300,125,10,10);
  restart.addImage(restartImg);
  restart.scale=0.3;
  
  grupodenuvens= new Group();
  grupodeobstaculos= new Group();
    
    
  //gerar números aleatórios
  var rand =  Math.round(random(1,100))
  console.log(rand)
  
  console.log("estado de jogo é "+ estadoJogo);

}

function draw() {
  //definir cor de fundo
  background("white");
  
  
  text("pontuação: "+pontuacao,500,50);
  
  if(estadoJogo===JOGAR){
    
  
  gerarNuvens();
  gerarObstaculos();
  restart.visible=false;
  GameOver.visible=false;
  
  
  
  if(keyDown("space")&& trex.isTouching(solo)) {
    trex.velocityY = -13;
    somPulo.play();
    
  }
    
  if(grupodeobstaculos.isTouching(trex)){
    
    estadoJogo=ENCERRAR
    somMorte.play();
    
  
  }
    
  }
  else if(estadoJogo===ENCERRAR){
    
    solo.velocityX=0;
    grupodeobstaculos.setLifetimeEach(-100);
    grupodenuvens.setLifetimeEach(-100);
    
    grupodeobstaculos.setVelocityXEach(0);
    grupodenuvens.setVelocityXEach(0);
    trex.changeAnimation("colide",trex_colidiu);
    
    restart.visible=true;
    GameOver.visible=true;
    
  }
  
  if(mousePressedOver(restart)){
    
    reinicio();
  
    
  }
  
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (solo.x < 0){
    solo.x = solo.width/2;
  }
  
  pontuacao=pontuacao+Math.round(frameRate()/40);
  
  trex.setCollider("circle",0,0,40);
  trex.debug = false;  
  
  trex.collide(soloinvisivel);
  
  drawSprites();
}

function reinicio(){
  
  estadoJogo=JOGAR;
  grupodenuvens.destroyEach();
  grupodeobstaculos.destroyEach();
  trex.changeAnimation("running",trex_correndo);
  pontuacao=0;
  solo.velocityX = -(5+pontuacao/1000);
  solo.x = solo.width /2;
 
  
  
} 

//função para gerar as nuvens
function gerarNuvens() {
 if(frameCount%60===0){
   
  nuvem=createSprite(600,50,10,20);
  nuvem.y=Math.round(random(0,100));
  nuvem.velocityX=-4;
  nuvem.addImage(nuvemImg);
  trex.depth=trex.depth;
  nuvem.depth=trex.depth-1;
  nuvem.lifetime=200;
  grupodenuvens.add(nuvem);
   
 
 }
  
}
function gerarObstaculos(){

 if(frameCount%100===0){ 
   
  obs1=createSprite(600,160,10,20);
  obs1.velocityX=-(4+pontuacao/1000);
   
  var rand =  Math.round(random(1,6));
  switch(rand){
      
    case 1: obs1.addImage(obs1Img);
     break;
    
    case 2: obs1.addImage(obs2Img);
     break;
     
    case 3: obs1.addImage(obs3Img);
     break;
     
    case 4: obs1.addImage(obs4Img);
     break;
     
    case 5: obs1.addImage(obs5Img);
     break;
     
    case 6: obs1.addImage(obs6Img);
     break;
     
     default: break;
  }
   
   obs1.scale=0.5;
   grupodeobstaculos.add(obs1);
   
 }



}

                                
