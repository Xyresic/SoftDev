let rend_btn = document.getElementById('render');
let trans_btn = document.getElementById('transition');

let json_url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json';
let width = 10000;
let height = 5000;
let date = new Date('2020-01-22');

let get_date = () => {
    return date.toISOString().slice(0,10);
};

let proj = d3.geoEqualEarth()
            .scale(width/2/Math.PI)
            .center([0,0])
            .translate([width/2, height/2]);
let path = d3.geoPath(proj);

let group = d3.select('#map').append('svg')
                .attr('viewBox', [0, 0, width, height])
            .append('g')
                .selectAll('path');

let data_full = d3.json('/data').then(d => data_full = d);

let color = d3.scaleSequential()
                .domain([0,0.002])
                .interpolator(d3.interpolateRgbBasis(['#cccccd','red','black']))
                .unknown('#ccc');
let fill = function(e_data) {
    return color(data_full[get_date()][e_data.properties.name]);
}

let render = () => {
    d3.json(json_url).then(data => {
        let countries = topojson.feature(data, data.objects.countries)
        group.data(countries.features)
            .join('path')
                .attr('d', path)
                .attr('fill', d => fill(d))
                .classed('has_data', d => fill(d) == 'rgb(204, 204, 205)');
    });
};

let advance = () => {
    let t = d3.interval((elapsed) => {
        date.setDate(date.getDate() + 1);
        d3.selectAll('.has_data').transition()
            .duration(100)
            .attr('fill', d => fill(d));
        if (elapsed > 150 * 81) t.stop();
    }, 150);
};

rend_btn.addEventListener('click', render);
trans_btn.addEventListener('click', advance);




