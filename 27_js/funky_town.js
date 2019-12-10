//Team Cleric - Eric Lam & Clement Chan
//SoftDev1 pd1
//K27 -- Sequential Progression
//2019-12-10

var fact = (n) => {
    if (n < 2) {
        return 1;
    } else {
        return n * fact(n - 1);
    }
};
var fibonacci = function (n) {
    if (n < 3) {
        return 1;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
};
var jxn = (n) => {
    switch (n) {
        case 1:
            return 1;
        case 2:
            return 2;
        case 'A':
            return 'A'
    }
};
var gcd = (a, b) => {
    while (b) {
        var t = b;
        b = a % b;
        a = t;
    }
    return a
};
var students = ['Eric', 'David','Michael','Clement'];
var randomStudent = () => {
    return students[Math.floor(Math.random() * students.length)];
};
