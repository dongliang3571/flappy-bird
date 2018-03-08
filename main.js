// Loading background image
function LoadingImages() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = "assets/bg.png";
    this.birdImage = new Image();
    this.birdImage.src = "assets/bird.png";
    this.tubeImage = new Image();
    this.tubeImage.src = "assets/tube.png";
    this.tubeDownImage = new Image();
    this.tubeDownImage.src = "assets/tube_down.png";
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
            // TODO: dispatch eventListener
        }
        context_fg.clearRect(0, 0, canvas_fg.width, canvas_fg.height);
        context_fg.drawImage(this.image, this.x, this.y, birdSize, birdSize);
        this.vf = this.acceleration*1.0/60 + this.vi;   // forumula: vf = at+vi
        this.vi = this.vf;
        this.y += this.vf;

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
    this.die = function() {
        context_fg.clearRect(0, 0, canvas_fg.width, canvas_fg.height);
        context_fg.drawImage(this.image, this.x, this.y, birdSize, birdSize);
        this.vf = this.acceleration*1.0/60 + this.vi;   // forumula: vf = at+vi
        this.vi = 5;
        this.y += this.vf;
    }
}

// Tube object
function TubeObject(images, canvas_fg) {
    this.image = [images.tubeImage, images.tubeDownImage];
    this.speed = 3;
    this.x = 0;
    this.y = canvas_fg.with/2;
    this.tubeWidth = 50;
    this.gapHeight = 100;
    this.upTubePosition = canvas_fg.height/2 + Math.random()*120;
    this.downTubePosition = this.upTubePosition - this.gapHeight;
    this.collisionX = 10;
    this.collisionY = this.upTubePosition;
    this.draw = function() {
        context_fg.drawImage(this.image[0], 175, 0, 80, 420, canvas_fg.width+this.x, this.upTubePosition, this.tubeWidth, canvas_fg.height/2);
        context_fg.drawImage(this.image[1], 175, 0, 80, 420, canvas_fg.width+this.x, 0, this.tubeWidth, this.downTubePosition);
        // context_fg.drawImage(this.image, 175, 0, 80, 420, canvas_fg.width+this.x, 0, this.tubeWidth, this.downTubePosition);
        // context_fg.fillStyle = 'red';
        // context_fg.fillRect(canvas_fg.width+this.x, this.upTubePosition, this.tubeWidth, canvas_fg.height/2);
        // context_fg.fillRect(canvas_fg.width+this.x, 0, this.tubeWidth, this.downTubePosition);`
        this.x -= this.speed;
        this.collisionX = canvas_fg.width+this.x;
    };
}

function TextObject(canvas_bg) {
    this.x = 30;
    this.y = 30;
    this.width = 100;
    this.height = 100;
    this.draw = function() {
        context_bg.fillStyle = 'black';
        context_bg.font = '25pt Arial';
        context_bg.fillText(`Score: ${score}`, this.x, this.y);
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
var textObject = new TextObject(canvas_bg);


function Position(x, y) {
    this.x = x;
    this.y = y;
}

var tubeObjects = [];
tubeObjects.push(new TubeObject(images, canvas_fg));

var KEY_CODES = {
    32: 'space',
}

var KEY_STATUS = {
    'space': false,
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

    document.addEventListener("click", function(e) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[32]] = true;
    });

    document.addEventListener("touchstart", function(e) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[32]] = true;
    });
}

var count = 0;
var tubeSize = 50;
var score = 0;
var allowScore = true;
var stopID;
function start() {
    bgObject.draw();
    birdObject.draw();
    count++;
    if (count === 90) {
        tubeObjects.push(new TubeObject(images, canvas_fg));
        count = 0;
    }
    if (tubeObjects[0].collisionX+tubeSize < birdObject.x) {
        if (allowScore) {
            score++;
            allowScore = false;
        }
    }
    if (tubeObjects[0].collisionX+tubeSize+20 < birdObject.x) {
        tubeObjects.splice(0, 1);
        allowScore = true;
    }

    for (var i in tubeObjects) {
        tubeObjects[i].draw();
        if ((tubeObjects[i].collisionX <= birdObject.x+birdSize-23 &&
            tubeObjects[i].collisionX >= birdObject.x &&
            tubeObjects[i].collisionY <= birdObject.y+birdSize-15)
            ||
            (tubeObjects[i].collisionX <= birdObject.x+birdSize-23 &&
            tubeObjects[i].collisionX >= birdObject.x &&
            tubeObjects[i].collisionY-115 >= birdObject.y)) {
            clearInterval(intervalID);
            stopID = setInterval(stop, 1000/60);
        }
    }
    textObject.draw();
}

var intervalID;
var newCount = 0;

function restart_click_event(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        clearInterval(stopID);
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
        restart();
        intervalID = setInterval(start, 1000/60);
    }
}

function restart_touch_event(e) {
    KEY_STATUS[KEY_CODES[32]] = true;
    clearInterval(stopID);
    restart();
    intervalID = setInterval(start, 1000/60);

}

function stop() {
    birdObject.die();
    newCount++;
    context_fg.fillStyle = 'red';
    context_fg.font = '17pt Arial';
    context_fg.fillText("Press Space or touch the screen to restart :)", 30, 60);
    if (birdObject.y > canvas_fg.height) {
        clearInterval(stopID);
    }
    // press Enter key to restart
    document.addEventListener("keydown", restart_click_event);
    document.addEventListener("touchstart", restart_touch_event);
}

function restart() {
    bgObject = new BackgroundObject(images, canvas_bg);
    birdObject = new BirdObject(images, birdSize, canvas_fg);
    textObject = new TextObject(canvas_bg);
    tubeObjects = [];
    tubeObjects.push(new TubeObject(images, canvas_fg));

    // remove the listenser preventing multiple restart at the same time
    document.removeEventListener("keydown", restart_click_event);
    document.removeEventListener("touchstart", restart_touch_event);
}
// add event listener
addListeners();

intervalID = setInterval(start, 1000/60);
