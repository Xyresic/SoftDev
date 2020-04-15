let rend_btn = document.getElementById('render');
let trans_btn = document.getElementById('transition');

let json_url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json';
let width = 1000;
let height = 500;
let date;
let timer;

let get_date = () => {
    return date.toISOString().slice(0,10);
};
let get_date_formatted = () => {
    return date.toLocaleString('default', {month:'long', day:'numeric', year:"numeric"});
}

let proj = d3.geoEqualEarth()
            .scale(width/2/Math.PI)
            .center([0,0])
            .translate([width/2, height/2]);
let path = d3.geoPath(proj);

let data_full = d3.json('/data').then(d => data_full = d);
let map_data = d3.json(json_url)
let get_percent = (d) => {
    let data_dated = data_full[get_date()];
    if (data_dated.hasOwnProperty(d.properties.name)) {
        return data_dated[d.properties.name][0];
    }
    else return undefined;
};
let get_cases = (d) => {
    let data_dated = data_full[get_date()];
    if (data_dated.hasOwnProperty(d.properties.name)) {
        return data_dated[d.properties.name][1].toLocaleString();
    }
    else return 0;
};

let color = d3.scaleSequential()
                .domain([0,0.002])
                .interpolator(d3.interpolateRgbBasis(['#cccccd','red','black']))
                .unknown('#ccc');

let format_tooltip = (d) => {
    return '<b>' + d.properties.name + '</b><br>Cases: ' + get_cases(d)
};

let display_tooltip = function(d) {
    $('#tooltip').css({top:d3.event.pageY, left:d3.event.pageX});
    d3.select('.tooltip').style('pointer-events','none');
    d3.select('#tooltip').attr('data-original-title', format_tooltip(d));
    $('[data-toggle="tooltip"]').tooltip('show');
};

let hide_tooltip = function(d) {
    $('[data-toggle="tooltip"]').tooltip('hide');
};

let render = () => {
    if (timer != null) timer.stop();
    rend_btn.innerText = 'Reset';
    date = new Date('2020-01-22');
    d3.selectAll('svg *').remove();
    trans_btn.removeAttribute('disabled');
    trans_btn.style.pointerEvents = null;

    map_data.then(d => {
        let countries = topojson.feature(d, d.objects.countries);
        d3.select('svg').append('g').selectAll('path')
            .data(countries.features)
            .join('path')
                .attr('d', path)
                .attr('fill', d => color(get_percent(d)))
                .classed('has_data', d => color(get_percent(d)) == 'rgb(204, 204, 205)')
                .on('mousemove', display_tooltip)
                .on('mouseleave', hide_tooltip);
    });

    d3.select('svg').append('text')
                    .attr('x', '50%')
                    .attr('y', height-8)
                    .attr('text-anchor','middle')
                    .text(get_date_formatted())
                    .style('font', 'bold 30px sans-serif');
};

let advance = () => {
    trans_btn.setAttribute('disabled','');
    trans_btn.style.pointerEvents = 'none';

    timer = d3.interval((elapsed) => {
        date.setDate(date.getDate() + 1);
        d3.select('text').text(get_date_formatted());

        d3.selectAll('.has_data').transition()
            .duration(100)
            .attr('fill', d => color(get_percent(d)));
        if (elapsed > 150 * 81) timer.stop();
    }, 150);
};

//let load_DOM = () => {
//    document.addEventListener('DOMContentLoaded', render, false);
//};

d3.select('#map').append('svg').attr('viewBox', [0, 0, width, height])
                                .style('max-height','85vh');
trans_btn.style.pointerEvents = 'none';

rend_btn.addEventListener('click', render);
trans_btn.addEventListener('click', advance);