// Loading background image
function LoadingImage() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = "assets/bg.png";
}


// Real background object
function BackgroundObject(image) {
    this.image = image;
    this.speed = 1;
    this.x = 0;
    this.y = 0;
    this.draw = function() {
        context.clearRect(0, 0, canvas_bg.width, canvas_bg.height);
        context.drawImage(this.image.backgroundImage, this.x, this.y, canvas_bg.width, canvas_bg.height);
        context.drawImage(this.image.backgroundImage, canvas_bg.width+this.x, this.y, canvas_bg.width, canvas_bg.height);
        this.x -= this.speed;
        if (this.x <= -canvas_bg.width) this.x = 0;
    }
}

// get canvas and set width and height
var canvas_bg = document.getElementById('canvas-bg');
canvas_bg.width = 910;
canvas_bg.height = 422;

// get context of the canvas
var context = canvas_bg.getContext('2d');
var bgImage = new LoadingImage();
var bgObject = new BackgroundObject(bgImage);


// start the loop
function start() {
    bgObject.draw();
}
setInterval(start, 10);
