var canvas = document.getElementById('slate');
var context = canvas.getContext('2d');
var toggleButton = document.getElementById('toggle');
var clearButton = document.getElementById('clear');
var color = document.getElementById('colorSelector');

var state = true;

var toggle = () => {
    state = !state;
};

var clear = () => {
    context.clearRect(0,0,400,400);
};

var draw = (event) => {
    x = event.clientX;
    y = event.clientY;
    context.fillStyle = color.value;
    if (state) {
        context.fillRect(x-50,y-50,100,100);
    } else {
        context.beginPath();
        context.arc(x,y,50,0,2*Math.PI);
        context.closePath();
        context.fill();
    }
};

toggleButton.addEventListener('click',toggle);
clearButton.addEventListener('click',clear);
canvas.addEventListener('click', (event) => {draw(event);});