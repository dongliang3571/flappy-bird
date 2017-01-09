// Loading background image
function LoadingImage() {
    this.backgroundImage = new Image();
    this.backgroundImage.src = "assets/bg.png";
}

var bgImage = new LoadingImage();
// var bgImage = new Image();
// bgImage.src = "assets/bg.png";

// Real background object
function BackgroundObject() {
    this.draw = function() {
        var canvas_bg = document.getElementById('canvas-bg');
        var context = canvas_bg.getContext('2d');
        context.clearRect(0, 0, canvas_bg.width, canvas_bg.height);
        context.drawImage(bgImage.backgroundImage, 0, 0, canvas_bg.width, canvas_bg.height);
    }
}

var bgObject = new BackgroundObject();
bgObject.draw();
