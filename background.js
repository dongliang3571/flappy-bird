// Loading background image
function LoadingImages() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = "assets/bg.png";
    this.birdImage = new Image();
    this.birdImage.src = "assets/bird.png";
    this.tubeImage = new Image();
    this.tubeImage.src = "assets/tube.png";
    this.bingup = new Image();
    this.bingup.src = "assets/bingup.png";
    this.bingdown = new Image();
    this.bingdown.src = "assets/bingdown.png";
}


// Real background object
function BackgroundObject(image, canvas_bg) {
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

// Bird object
function BirdObject(images, birdSize, canvas_fg) {
    this.image = images.birdImage;
    this.alive = true;
    this.start = false;
    this.acceleration = 9.8;    // Acceleration for earth is 9.8 m/t^2
    this.vi = -5;   // initial speed
    this.vf = 0;    // final speed
    this.x = 30;    // inital x position
    this.y = canvas_fg.height/2;    // initial y position
    this.push_speed = -5;   // speed when click is triggered
    this.draw = function() {
        if (!this.alive) {
            console.log("game over");
            // TODO: dispatch eventListener
        }
        context_fg.clearRect(0, 0, canvas_fg.width, canvas_fg.height);
        context_fg.drawImage(this.image, this.x, this.y, birdSize, birdSize);
        this.vf = this.acceleration*1.0/60 + this.vi;   // forumula: vf = at+vi
        this.vi = this.vf;
        this.y += this.vf;

        // change bird images based on speed direction
        // if (this.vf >= 0) {
        //     this.image = images.bingdown;
        // } else {
        //     this.image = images.bingup;
        // }

        // default jumping up and down when the game first starts, that's `this.start` is false
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

// Tube object
function TubeObject(images, canvas_fg) {
    this.image = images.tubeImage;
    this.speed = 3;
    this.x = 0;
    this.y = canvas_fg.with/2;
    this.tubeWidth = 50;
    this.gapHeight = 100;
    this.upTubePosition = canvas_fg.height/2 + Math.random()*120;
    this.downTubePosition = this.upTubePosition - this.gapHeight;
    this.collisionX = 0;
    this.collisionY = this.upTubePosition;
    this.draw = function() {
        context_fg.fillStyle = 'red';
        context_fg.fillRect(canvas_fg.width+this.x, this.upTubePosition, this.tubeWidth, canvas_fg.height/2);
        context_fg.fillRect(canvas_fg.width+this.x, 0, this.tubeWidth, this.downTubePosition);
        // context_fg.drawImage(this.image, canvas_fg.width+this.x, 200, 300, -300);
        // context_fg.drawImage(this.image, canvas_fg.width+this.x, this.y, canvas_fg.width, canvas_fg.height);
        this.x -= this.speed;
        this.collisionX = canvas_fg.width+this.x;
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
var bgObject = new BackgroundObject(images, canvas_bg);
var birdSize = 80;
var birdObject = new BirdObject(images, birdSize, canvas_fg);
// var tubeObject = new TubeObject(images, canvas_fg);


function Position(x, y) {
    this.x = x;
    this.y = y;
}

var tubeObjects = [];
for (var i = 0; i < 10; i++) {

}

var KEY_CODES = {
    32: 'space'
}

var KEY_STATUS = {
    'space': false
};

// initialization the game
function addListeners() {
    document.addEventListener("keydown", function(e) {
        var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
        if (KEY_CODES[keyCode]) {
            e.preventDefault();
            KEY_STATUS[KEY_CODES[keyCode]] = true;
        }
    });
}

var count = 0;
var tubeSize = 50;
function start() {
    bgObject.draw();
    birdObject.draw();
    count++;
    if (count === 90) {
        tubeObjects.push(new TubeObject(images, canvas_fg));
        count = 0;
    }
    if (tubeObjects[0].collisionX+tubeSize < birdObject.x) {
        tubeObjects.splice(0, 1);
    }
    for (var i in tubeObjects) {
        tubeObjects[i].draw();

        /////////////////////////////////////////////////////////////
        // TODO: collision detection
        if ((tubeObjects[i].collisionX >= birdObject.x &&
            tubeObjects[i].collisionX+tubeSize <= birdObject.x)
            &&
            (tubeObjects[i].collisionY <= birdObject.y+birdSize ||
             tubeObjects[i].collisionY-100 >= birdObject.y)) {
            clearInterval(intervalID);
        }
        /////////////////////////////////////////////////////////////
    }
}

// add event listener
addListeners();

var intervalID = setInterval(start, 1000/60);
