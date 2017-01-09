function Bird() {
  this.death = false;

  this.x = 50;
  this.y = 50;

  this.jump = function () {
    this.x += 10;
    this.y += 10;
    console.log(this.x + ' ' + this.y);
  }
}



// var canvas = document.getElementById("canvas");
// var ctx = canvas.getContext("2d");
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(0, 0, 80, 80);
