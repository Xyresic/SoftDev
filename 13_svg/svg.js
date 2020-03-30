//Team B-Button Warriors - Eric Lam & Junhee Lee
//SoftDev pd1
//K13 -- Ask Circles [Change || Die]
//2020-03-30

//initialization
const pic = document.getElementById("vimage");
const button = document.getElementById("clear");
const bbox = pic.getBoundingClientRect();
const DOT_RADIUS = 25;
const DOT_COLOR_0 = "black";
const DOT_COLOR_1 = "red";

const draw = function(e) {
    if (e.target == pic) {
        let x = e.offsetX;
        let y = e.offsetY;
        let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", y);
        dot.setAttribute("r", DOT_RADIUS);
        dot.setAttribute("fill", DOT_COLOR_0);
        dot.addEventListener("mousedown", color);
        pic.appendChild(dot);
    }
};

const color = function() {
	this.removeEventListener("mousedown", color);
	this.setAttribute("fill", DOT_COLOR_1);
	this.addEventListener("mousedown", die);
};

const die = function() {
    this.removeEventListener('mousedown', die);
    this.setAttribute('fill', DOT_COLOR_0);
    let x_range = bbox.width - 2 * DOT_RADIUS;
    let y_range = bbox.height - 2 * DOT_RADIUS;
    let x_offset = bbox.left + DOT_RADIUS;
    let y_offset = bbox.top + DOT_RADIUS;
    this.setAttribute('cx', Math.floor(Math.random() * x_range) + x_offset);
    this.setAttribute('cy', Math.floor(Math.random() * y_range) + y_offset);
    this.addEventListener('mousedown', color);
};

const clear = function() {
	pic.innerHTML = '';
};

pic.addEventListener("mousedown", draw);
button.addEventListener("click", clear);
