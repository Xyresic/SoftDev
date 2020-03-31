//Eric Lam
//SoftDev pd1
//K13 -- Ask Circles [Change || Die] While Moving
//2020-03-31

//initialization
const pic = document.getElementById("vimage");
const button = document.getElementById("clear");
const move_but = document.getElementById('move');
const xtra_but = document.getElementById('xtra');
const stop_but = document.getElementById('stop');
const bbox = pic.getBoundingClientRect();
const DOT_RADIUS = 25;
const DOT_COLOR_0 = "black";
const DOT_COLOR_1 = "red";
let anim_id;
let extra = false;

const draw = function(e) {
    if (e.target == pic) {
        let x = e.offsetX;
        let y = e.offsetY;
        let dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        dot.setAttribute("cx", x);
        dot.setAttribute("cy", y);
        dot.setAttribute("r", DOT_RADIUS);
        dot.setAttribute("fill", DOT_COLOR_0);
        dot.setAttribute('dx', 5*Math.random()-5*Math.random());
        dot.setAttribute('dy', 5*Math.random()-5*Math.random());
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

const move = function() {
    window.cancelAnimationFrame(anim_id);
    for (circ of document.getElementsByTagName('circle')) {
        let dx = parseFloat(circ.getAttribute('dx'));
        let dy = parseFloat(circ.getAttribute('dy'));
        let cx = parseFloat(circ.getAttribute('cx'));
        let cy = parseFloat(circ.getAttribute('cy'));
        if (cx+dx>bbox.right-DOT_RADIUS || cx+dx<bbox.left) {
            if (extra) {
                circ.setAttribute('fill', '#'+Math.floor(Math.random()*16777215).toString(16))
            }
            dx *= -1;
            circ.setAttribute('dx', dx);
        }
        if (cy+dy>bbox.bottom-DOT_RADIUS || cy+dy<bbox.top) {
            if (extra){
                circ.setAttribute('fill', '#'+Math.floor(Math.random()*16777215).toString(16))
            }
            dy *= -1;
            circ.setAttribute('dy', dy);
        }
        circ.setAttribute('cx', cx+dx);
        circ.setAttribute('cy', cy+dy);
    }
    anim_id = window.requestAnimationFrame(move);
};

const xtra = function() {
    extra = true;
};

const clear = function() {
	pic.innerHTML = '';
};

const stop = function() {
    window.cancelAnimationFrame(anim_id);
};

pic.addEventListener("mousedown", draw);
button.addEventListener("click", clear);
move_but.addEventListener('click', move);
xtra_but.addEventListener('click', xtra);
stop_but.addEventListener('click', stop);
