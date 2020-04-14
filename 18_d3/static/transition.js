let rend_btn = document.getElementById('render');
let trans_btn = document.getElementById('transition');

let json_url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json';
let width = 1000;
let height = 500;
let date = new Date('2020-01-22');
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

let color = d3.scaleSequential()
                .domain([0,0.002])
                .interpolator(d3.interpolateRgbBasis(['#cccccd','red','black']))
                .unknown('#ccc');
let fill = function(e_data) {
    return color(data_full[get_date()][e_data.properties.name]);
}

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
            .attr('fill', d => fill(d))
            .classed('has_data', d => fill(d) == 'rgb(204, 204, 205)')
    });

    d3.select('svg').append('text')
                    .attr('x', '50%')
                    .attr('y', height-5)
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
            .attr('fill', d => fill(d));
        if (elapsed > 150 * 81) t.stop();
    }, 150);
};

d3.select('#map').append('svg').attr('viewBox', [0, 0, width, height]);

trans_btn.style.pointerEvents = 'none';

rend_btn.addEventListener('click', render);
trans_btn.addEventListener('click', advance);