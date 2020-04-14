let rend_btn = document.getElementById('render');
let trans_btn = document.getElementById('transition');

let json_url = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json';
let width = 1000;
let height = 500;
let date = new Date('2020-01-22');

let proj = d3.geoEqualEarth()
            .scale(width/2/Math.PI)
            .center([0,0])
            .translate([width/2, height/2]);
let path = d3.geoPath(proj);

let map = d3.select('#map').append('svg')
            .attr('viewBox', [0, 0, width, height]);
let group = map.append('g')
                .selectAll('path');

let data_full = d3.json('/data').then(d => {data_full = d});

let color = d3.scaleSequential()
                .domain([0,600000])
                .interpolator(d3.interpolateRgbBasis(['#ccc','red','black']))
                .unknown('#ccc');

let render = () => {
    d3.json(json_url).then(data => {
        let countries = topojson.feature(data, data.objects.countries)
        group.data(countries.features)
            .join('path')
                .attr('d', path)
                .attr('fill', d => color(data_full[date][d.properties.name]));
    });
};

let advance = () => {

};

rend_btn.addEventListener('click', render);
trans_btn.addEventListener('click', advance);




