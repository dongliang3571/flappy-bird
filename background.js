// Loading background image
function LoadingImages() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = "assets/bg.png";
    this.birdImage = new Image();
    this.birdImage.src = "assets/bird.png";
}


// Real background object
function BackgroundObject(image) {
    this.image = image;
    this.speed = 1;
    this.x = 0;
    this.y = 0;
    this.draw = function() {
        context_bg.clearRect(0, 0, canvas_bg.width, canvas_bg.height);
        context_bg.drawImage(this.image.backgroundImage, this.x, this.y, canvas_bg.width, canvas_bg.height);
        context_bg.drawImage(this.image.backgroundImage, canvas_bg.width+this.x, this.y, canvas_bg.width, canvas_bg.height);
        this.x -= this.speed;
        if (this.x <= -canvas_bg.width) this.x = 0;
    }
}

function BirdObject(image, birdSize) {
    this.acceleration = 9.8;    // Acceleration for earth is 9.8 m/t^2
    this.vi = -5;   // initial speed
    this.vf = 0;    // final speed
    this.x = 30;
    this.y = canvas_fg.height/2;
    this.push_speed = -5;
    this.draw = function() {
        context_fg.clearRect(0, 0, canvas_fg.width, canvas_fg.height);
        context_fg.drawImage(image.birdImage, this.x, this.y, birdSize, birdSize);
        context_fg.drawImage(image.birdImage, canvas_fg.width+this.x, this.y, birdSize, birdSize);
        this.x -= this.speed;
        if (this.x <= -canvas_fg.width) this.x = 0;
    }
    this.defaultDraw = function() {
        context_fg.clearRect(0, 0, canvas_fg.width, canvas_fg.height);
        context_fg.drawImage(image.birdImage, this.x, this.y, birdSize, birdSize);
        this.vf = this.acceleration*1.0/60 + this.vi;
        this.vi = this.vf;
        this.y += this.vf;
        if (this.y >= canvas_fg.height/2) {
            this.vi = this.push_speed;
        }
    }
}


// get canvas and set width and height
var canvas_bg = document.getElementById('canvas-bg');
var canvas_fg = document.getElementById('canvas-fg');
canvas_bg.width = 910;
canvas_bg.height = 422;
canvas_fg.width = 910;
canvas_fg.height = 422;

// get context of the canvas
var context_bg = canvas_bg.getContext('2d');
var context_fg = canvas_fg.getContext('2d');
var images = new LoadingImages();
var bgObject = new BackgroundObject(images);
var birdObject = new BirdObject(images, 80);


// start the loop
function start() {
    bgObject.draw();
    birdObject.defaultDraw();
    window.requestAnimationFrame(start);
}

start();
// var fps = 60;
// setInterval(start, 1000/fps);
