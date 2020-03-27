//Team B-Button Warriors - Eric Lam & Junhee Lee
//SoftDev pd1
//K12 -- Connect the Dots
//2020-03-27

//initialization
const pic = document.getElementById("vimage");
const button = document.getElementById("clear");
const DOT_RADIUS = 5;
var mouse = [-1, -1];

/* var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
c.setAttribute("cx", 0);
c.setAttribute("cy", 0);
c.setAttribute("r", 100);
c.setAttribute("fill", "red");
c.setAttribute("stroke", "black");
pic.appendChild(c); */

const draw = function(e) {
	let x = e.offsetX;
	let y = e.offsetY;
	let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
	dot.setAttribute("cx", x);
	dot.setAttribute("cy", y);
	dot.setAttribute("r", DOT_RADIUS);
	dot.setAttribute("fill", "black");
	pic.appendChild(dot);
	if (Math.min(mouse[0], mouse[1]) >= 0) {
		let line = document.createElementNS('http://www.w3.org/2000/svg','line');
		line.setAttribute('x1', mouse[0]);
		line.setAttribute('x2', x);
		line.setAttribute('y1', mouse[1]);
		line.setAttribute('y2', y);
		line.setAttribute('stroke', 'black');
		pic.appendChild(line);
	};
	mouse[0] = x;
	mouse[1] = y;
};

const clear = function(e) {
	mouse = [-1, -1];
	pic.innerHTML = '';
};

pic.addEventListener("mousedown", draw);
button.addEventListener("click", clear);