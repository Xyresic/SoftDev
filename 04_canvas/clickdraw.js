var canvas = document.getElementById('slate');
var context = canvas.getContext('2d');
var toggleButton = document.getElementById('toggle');
var clearButton = document.getElementById('clear');
var color = document.getElementById('colorSelector');
var stateDisplay = document.getElementById('state');
var container = document.getElementById('sliders');
var heightContainer = document.getElementById('heightContainer');
var widthContainer = document.getElementById('widthContainer');
var radiusContainer = document.getElementById('radiusContainer');
var heightSlider = document.getElementById('heightSlider');
var widthSlider = document.getElementById('widthSlider');
var radiusSlider = document.getElementById('radiusSlider');
var heightDisplay = document.getElementById('heightDisplay');
var widthDisplay = document.getElementById('widthDisplay');
var radiusDisplay = document.getElementById('radiusDisplay');

var state = true;
var height = 100;
var width = 100;
var radius = 50;

var toggle = () => {
    state = !state;
    stateDisplay.innerHTML = state? 'Rectangle':'Circle';
    if (state) {
        radiusContainer.remove();
        container.appendChild(heightContainer);
        container.appendChild(widthContainer);
    } else {
        heightContainer.remove();
        widthContainer.remove();
        container.appendChild(radiusContainer);
    }
};

var clear = () => {
    context.clearRect(0,0,400,400);
};

var draw = (event) => {
    var bounds = canvas.getBoundingClientRect();
    x = event.clientX-bounds.left;
    y = event.clientY-bounds.top;
    context.fillStyle = color.value;
    if (state) {
        context.fillRect(x-50,y-55,width,height);
    } else {
        context.beginPath();
        context.arc(x,y,radius,0,2*Math.PI);
        context.closePath();
        context.fill();
    }
};
toggleButton.addEventListener('click',toggle);
clearButton.addEventListener('click',clear);
canvas.addEventListener('click', (event) => {draw(event);});
heightSlider.oninput = () => {
    height = heightSlider.value;
    heightDisplay.innerHTML = height;
};
widthSlider.oninput = () => {
    width = widthSlider.value;
    widthDisplay.innerHTML = width;
};
radiusSlider.oninput = () => {
    radius = radiusSlider.value;
    radiusDisplay.innerHTML = radius;
};
stateDisplay.innerHTML = state? 'Rectangle':'Circle';
heightDisplay.innerHTML = height;
widthDisplay.innerHTML = width;
radiusDisplay.innerHTML = radius;
radiusContainer.remove();