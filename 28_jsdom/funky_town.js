//Team Froopyland - Elizabeth Doss & Eric Lam
//SoftDev1 pd1
//K28 --
//2019-12-10

var helloworld = function() {
    return("hello world");
};

var fact = function(n) {
    if (n < 2){
        return 1;
    }
    return n * (fact(n - 1));
};

var fibonacci = function(n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return fibonacci(n-1) + fibonacci(n-2)
};

var gcd = function(x,y){
    r = x % y;
    while (r != 0){
        x = y;
        y = r;
        r = x % y;
    }
    return y;
};

var students = ["Alice","Bob","Charlie","Devin","Elsa", "Fred", "George"];

var randomStudent = function(){
    i = Math.floor(Math.random() * students.length)
    return students[i];
};

var factButton = () => {
    n = factBut.getAttribute('val');
    h = document.getElementById('faDisplay');
    h.innerHTML = fact(n);
};

var fibButton = () => {
    n = fibBut.getAttribute('val');
    h = document.getElementById('fiDisplay');
    h.innerHTML = fibonacci(n);
};

var gcdButton = () => {
    input = gcdBut.getAttribute('val');
    input = input.split(',');
    a = input[0];
    b = input[1];
    h = document.getElementById('gcdDisplay');
    h.innerHTML = gcd(a,b);
};

var stuButton = () => {
    h = document.getElementById('stuDisplay');
    h.innerHTML = randomStudent();
};

//HTML
var factBut = document.getElementById('fa');
factBut.addEventListener('click', factButton);

var fibBut = document.getElementById('fi');
fibBut.addEventListener('click', fibButton);

var gcdBut = document.getElementById('gcd');
gcdBut.addEventListener('click', gcdButton);

var stuBut = document.getElementById('stu');
stuBut.addEventListener('click',stuButton);