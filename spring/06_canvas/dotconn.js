//Eric Lam and Amanda Zheng (Team Lambda)
//SoftDev1 pd1
//K#06 -- Canvas
//2020-02-11

var c = document.getElementById("playground");
var ctx = c.getContext("2d");
var lastx;
var lasty;
var clear = function(){
    ctx.clearRect(0, 0, c.width, c.height);
    //console.log("clear");
}


c.addEventListener('mousedown', e => {
    var x = e.offsetX;
    var y = e.offsetY;
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    if(lastx!=null){
        ctx.beginPath();
        ctx.moveTo(lastx,lasty);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.closePath();
        ctx.stroke();
    }
    lastx=e.offsetX;
    lasty=e.offsetY;
});

var clearbtn = document.getElementById("clear");
clearbtn.addEventListener('click', clear);