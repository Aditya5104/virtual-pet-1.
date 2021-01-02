var dog,happyDog,dogimage
var database
var foodS,foodStock

function preload()
{
dogimage=loadImage("images/dogImg.png")
happyDog=loadImage("images/dogImg1.png")
}

function setup() {
  database=firebase.database()
  createCanvas(500, 500);
  background(46,139,87)

  dog= createSprite(100,100,30,30)
  dog.addImage(dogimage)
  dog.scale=0.1


  foodStock=database.ref('Food');
  foodStock.on("value",readStock)

}


function draw() {  
  background("green")
  if (keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }
  if (keyWentUp(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogimage);
  }


  drawSprites();
fill("red")
  text("FOOD REMAINING : "+ foodS,170,200)
textSize(13)
text("PRESS UP ARROW KEY TO FEED DRAGO MILK",130,10,300,20)
}
function readStock(data){
 foodS=data.val() 
}
function writeStock(x){
if(x<=0){
  x=0;
}else{
  x=x-1;
}

database.ref('/').update({
 Food:x
})

}



