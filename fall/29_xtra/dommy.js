//Team SciTal - Eric Lam & David Xiedeng
//SoftDev1 pd1
//K29 -- Witch Season
//2019-12-14

var changeHeading = function (e) {
    var h = document.getElementById("h");
    h.innerHTML = e;
    //console.log(e);
};


var removeItem = function (e) {
    //console.log(e.getAttribute == "fib");
    if (e.getAttribute("type") == "fib") {
        deFib = fiblis.pop()
        console.log(deFib);
        deFib.remove();
    } else {
        e.remove();
        items--;
    }
};


const lis = document.getElementsByTagName("li");

var makeDeletable = (item) => {
    item.addEventListener("mouseover", () => {
        changeHeading(item.innerHTML);
    });
    item.addEventListener("mouseout", () => {
        changeHeading("Hello World")
    });
    item.addEventListener("click", () => {
        removeItem(item)
    });
}

for (let i = 0; i < lis.length; i++) {
    let item = lis[i];
    makeDeletable(item);
    items++;
}
;

var items = 8;

var addItem = function (e) {
    list = document.getElementsByTagName("ol")[0];
    item = document.createElement("li");
    item.innerHTML = "item " + items;
    items++;
    makeDeletable(item);
    list.appendChild(item);
};

var button = document.getElementById("b")
button.addEventListener('click', addItem)

var fiblis = [];

var fib = function (n) {
    if (n < 2) {
        return 1;
    } else {
        let n1 = parseInt(fiblis[n - 1].innerHTML);
        let n2 = parseInt(fiblis[n - 2].innerHTML);
        return n1 + n2;
    }
};


var addFib = function (e) {
    let list = document.getElementsByTagName("ol")[1];
    let currentFib = fib(fiblis.length);
    //console.log(currentFib);
    let item = document.createElement("li");
    item.setAttribute("type", "fib");
    item.innerHTML = currentFib;
    makeDeletable(item);
    list.appendChild(item);
    fiblis.push(item);
    //console.log(fiblis);
}

var fb = document.getElementById("fb");
fb.addEventListener("click", addFib);