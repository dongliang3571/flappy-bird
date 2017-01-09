function Bird(width, height) {
  // initialize bird position
  this.x = 0;
  this.y = height / 2;

  this.death = false;
  this.velocity = 0;
  this.gravity = -0.0001;
  this.up = 10;

  this.checkDeath = function() {
    if (this.y <= 0) {
      this.death = true;
      console.log('DEAD');
    }
    return this.death;
  };

  this.update = function () {
    this.velocity += this.gravity;
    bird.y += bird.velocity;
    console.log(this.y);
  };

  this.jump = function () {
    this.velocity += this.up;
    console.log(this.velocity);
  };
};



var bird = new Bird(200, 400);
document.addEventListener("click", function(){
  bird.jump();
});
while(!bird.checkDeath()) {
  bird.update()
};
