let colors=['DarkTurquoise', 'Lightpink', 'gold','lightgreen','tomato', 'bisque', 'coral', 'lavender'];
let index;
let left=0, right=0;

//Setting up the canvas, and size/placement of text
function setup() {
  var myCanvas=createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  textSize(30);
}

function draw() {
  //Draws background, separating line, and index that loop through the colors
  background(255);
  stroke(0);
  strokeWeight(1);
  line(windowWidth/2, 100, windowWidth/2, windowHeight);
  index=0;
  noStroke();
  
  //Looping through all touches detected, from 1 to 11 for an ipad
  //touches is an array that includes the (x,y) coordinates of the point touched and an id
  for (var i = 0; i < touches.length; i++) {
    stroke(0);
    strokeWeight(1);
    
    //set to 0 when no finger touch the screen
    if(touches.length === 0){
      left=0;
      right=0;
    }
    
    //if fingers are placed on the left side
    if(touches[i].x < windowWidth/2){
      
      //create the colored circle at the touched position
      fill(colors[index]);
      ellipse(touches[i].x, touches[i].y, 100, 100);
      left=index+1;//keeping track of how many fingers are touching the left side 
      index++;//+1 to index to get a different color
      
      //draws the 'text' of the multiplication
      fill(255);
      noStroke();
      rect(0,0,windowWidth/2, 50);
      fill(0);
      text(left, windowWidth/2 - 50, 50);
    }

    //if fingers are placed on the right side
    if(touches[i].x > windowWidth/2){
      index=0;
      right = touches.length - left;//how many fingers are placed on the right side
      
      //for each finger on the right
      for(let r=0; r<right; r++){
        
        //draw a black circle at the position of the finger
        stroke(0);
        noFill();
        strokeWeight(1);
        ellipse(touches[i].x, touches[i].y, 200, 200);
        
        //change the coordinates to where the finger is
        push();
        translate(touches[i].x, touches[i].y);
        
        //for each finger on the left, draw a circle in the right "bubble" and rotate
        for(let j=0; j<left; j++){
          fill(colors[index]);
          rotate(PI/4);
          ellipse(50, 50, 50, 50);
          index++;
        }
        pop();//'reset' the coordinates to (0,0)
        index=0;
      }
      
      //draws the rest of the 'text' of the multiplication
      fill(255);
      noStroke();
      rect(windowWidth/2-10,0,windowWidth, 50);
      fill(0);
      text("x", windowWidth/2, 50);
      text(right + "  = ", windowWidth/2 + 50, 50);
      text(right*left, windowWidth/2, 90);
    }
    
  }
}

//Disabling mousePressed and other gestures
function mousePressed() {
  return false;
}

document.addEventListener('gesturestart', function(e) {
  e.preventDefault();
});
