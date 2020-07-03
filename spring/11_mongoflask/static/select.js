var selector = document.getElementById('select');
var div = document.getElementById('input');
var text_field = document.getElementById('text');
var s_field = document.getElementById('season');
var e_field = document.getElementById('number');

var last = 'ID';

var update = () => {
    if (selector.value == 'Season & Number') {
        text_field.remove();
        div.appendChild(s_field);
        div.appendChild(e_field);
    } else if (last == 'Season & Number') {
        div.appendChild(text_field);
        s_field.remove();
        e_field.remove();
    }
    last = selector.value;
};

selector.addEventListener('change',update);
s_field.remove();
e_field.remove();