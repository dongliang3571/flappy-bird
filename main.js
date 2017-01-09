function draw() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    context.fillStyle = 'red';
    console.log(canvas.width);
    console.log(canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
}

draw();
