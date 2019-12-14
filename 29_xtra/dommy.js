//Team SciTal - Eric Lam & David Xideng
//SoftDev1 pd1
//K29 -- Witch Season
//2019-12-14

var changeHeading = function(e) {
    var h = document.getElementById("h");
    h.innerHTML = e;
    //console.log(e);
};


var removeItem = function(e) {
    e.remove();
};


const lis = document.getElementsByTagName("li");

for (let i = 0; i < lis.length; i++) {
    let item = lis[i];
    item.addEventListener("mouseover", () => {
        changeHeading(item.innerHTML);
        //console.log(i);
    });
    //console.log(lis[i]);
    item.addEventListener("mouseout", () => {changeHeading("Hello World")});
    item.addEventListener("click", () => {removeItem (item)});
};

var addItem = function(e) {
    var list = document.getElementsByTagName("ol")[0];
    var item = document.createElement("li");
    item.innerHTML = "WORD";
    item.addEventListener('mouseover', () => {changeHeading('WORD')});
    item.addEventListener("mouseout", () => {changeHeading("Hello World")});
    item.addEventListener("click", () => {removeItem (item)});
    //console.log(item);
    list.appendChild(item);
};

var button = document.getElementById("b")
button.addEventListener('click', addItem)

var fib = function(n) {
    if (n < 2) {
        return 1;
    }
    else {
        return fib(n-1)+fib(n-2);
    }
};

var addFib = function (e) {
    var list = document.getElementsByTagName("ol")[1];
    var n = list.getElementsByTagName('li').length;
    var li = document.createElement('li');
    li.innerHTML = fib(n);
    list.appendChild(li);
};

var fb = document.getElementById("fb");
fb.addEventListener("click", addFib);