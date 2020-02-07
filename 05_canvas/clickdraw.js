//Eric Lam and Amanda Zheng (Team Lambda)
//SoftDev1 pd1
//K#05 -- Canvas
//2020-02-06

//We did not use e.preventDefault(); however e.preventDefault basically cancels some event
//Say if you had a link and you put e.preventDefault(); then the event would prevent the link from taking you to the page as a normal link would
//the preventDefault disables the action done by the event
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

canvas.addEventListener('mousedown', e => {
  context.fillStyle = color.value;
  var x = e.offsetX;
  //offsetX gives the x-coordinate of the mouse pointer relative to the target element
  var y = e.offsetY;
  //offsetX gives the y-coordinate of the mouse pointer relative to the target element
  if (state){
    context.fillRect(x, y, width, height);
  }
  else {
    context.beginPath();
    //ctx.beginPath() tells the canvas to begin a path or resets current path (think of it as putting your pencil down on paper)
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.closePath();
    //context.closePath() tells the canvas to close the path
    // this is important because if we don't close it and we try to fill path, it tries to fill every path that you didn't close
    context.fill();
  }
});

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