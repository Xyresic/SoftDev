//Eric Lam and Raymond Lee (Team Raygun)
//SoftDev1 pd1
//K#08 -- Screen Saving
//2020-02-13

var startButton = document.getElementById('start');
var stopButton = document.getElementById('stop');
var saverButton = document.getElementById('dvd');
var canvas = document.getElementById('playground');
var ctx = canvas.getContext('2d');

var radius = 0;
var expand = true;
var circle_id;
var logo_id;
var logo = new Image();
logo.src = 'dvd.png';
var x;
var y;
console.log(x);
var dx;
var dy;

var frame = () => {
    window.cancelAnimationFrame(circle_id);
    window.cancelAnimationFrame(logo_id);
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
    circle_id = window.requestAnimationFrame(frame);
};

var stop = () => {
    window.cancelAnimationFrame(circle_id);
    window.cancelAnimationFrame(logo_id);
};

var spawn = () => {
    x = Math.random() * (600 - logo.width/4);
    y = Math.random() * (600 - logo.height/4);
    dx = 2*Math.random()-2*Math.random();
    dy = 2*Math.random()-2*Math.random();
    bounce();
};

var bounce = () => {
    window.cancelAnimationFrame(circle_id);
    window.cancelAnimationFrame(logo_id);
    ctx.clearRect(0,0,600,600);
    ctx.drawImage(logo,x,y,logo.width/4,logo.height/4);
    if (x+dx>600-logo.width/4 || x+dx<0) {
        dx *= -1;
    }
    if (y+dy>600-logo.height/4 || y+dy<0) {
        dy *= -1;
    }
    x += dx;
    y += dy;
    logo_id = window.requestAnimationFrame(bounce);
};

startButton.addEventListener('click',frame);
stopButton.addEventListener('click',stop);
saverButton.addEventListener('click',spawn);