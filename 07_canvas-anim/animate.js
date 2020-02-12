//Eric Lam and Raymond Lee (Team Raygun)
//SoftDev1 pd1
//K#07 -- Canvas Animation
//2020-02-12

var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var canvas = document.getElementById('playground');
var ctx = canvas.getContext('2d');

var radius = 0;
var expand = true;
var state = false;
var id;

var frame = () => {
    ctx.clearRect(0,0,600,600);
    ctx.beginPath();
    ctx.arc(300,300,radius,0,2*Math.PI);
    ctx.fill();
    ctx.closePath();
    if (expand) {
        radius += 1;
    } else {
        radius -= 1;
    }
    if (radius == 0 || radius == 300) {
        expand = !expand;
    }
    id = window.requestAnimationFrame(frame);
};

var stop = () => {
    state = !state;
    window.cancelAnimationFrame(id);
};

var handler = () => {
    if (!state) {
        frame();
        state = !state;
    }
};

startButton.addEventListener('click',handlerg);
stopButton.addEventListener('click',stop);