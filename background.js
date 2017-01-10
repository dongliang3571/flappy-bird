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
    };
}

function BirdObject(image, birdSize, canvas_fg) {
    this.alive = true;
    this.start = false;
    this.acceleration = 9.8;    // Acceleration for earth is 9.8 m/t^2
    this.vi = -5;   // initial speed
    this.vf = 0;    // final speed
    this.x = 30;    // inital x position
    this.y = canvas_fg.height/2;    // initial y position
    this.push_speed = -7;   // speed when click is triggered
    this.defaultDraw = function() {
        if (!this.alive) {
            console.log("game over");
            // TODO: dispatch eventListener
        }
        context_fg.clearRect(0, 0, canvas_fg.width, canvas_fg.height);
        context_fg.drawImage(image.birdImage, this.x, this.y, birdSize, birdSize);
        this.vf = this.acceleration*1.0/60 + this.vi;   // forumula: vf = at+vi
        this.vi = this.vf;
        this.y += this.vf;
        if (this.y >= canvas_fg.height/2 && !this.start) {
            this.vi = this.push_speed;
        } else {
            if (KEY_STATUS.space) {
                this.vi = this.push_speed;
                this.start = true;
                KEY_STATUS.space = false;
            }

            if (this.y >= canvas_fg.height-birdSize) {
                this.alive = false;
            }
        }
    };
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
var birdObject = new BirdObject(images, 80, canvas_fg);

// initialization the game
function addListeners() {
    document.addEventListener("keydown", function(e) {
        var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
        console.log(keyCode);
        if (KEY_CODES[keyCode]) {
            e.preventDefault();
            KEY_STATUS[KEY_CODES[keyCode]] = true;
        }
    });
}

var KEY_CODES = {
  32: 'space'
}

var KEY_STATUS = {};
for (code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
}

// start the loop
function start() {
    bgObject.draw();
    birdObject.defaultDraw();
    // birdObject.draw();
    window.requestAnimationFrame(start);
}

addListeners();
start();
