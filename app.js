document.getElementById('jeden').addEventListener('click', jedenNumer);
document.getElementById('dwa').addEventListener('click', dwaNumer);
document.getElementById('trzy').addEventListener('click', trzyNumer);

const harpunBody = document.body;
const harpun = document.querySelector('.container');
const title = document.querySelector('.title');

function jedenNumer(e) {
    var m = [];
    var mag =[];

    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson', false);
    
    xhr.onload = function() {
        const response = JSON.parse(this.responseText);
    
        response.features.forEach(i => {
            let x = i.geometry.coordinates[0];
            let y = i.geometry.coordinates[1];
            let z = i.geometry.coordinates[2];

            m.push([x, y, z]);
            mag.push(i.properties.mag);
        });

        return m;
    };
    
    xhr.send();

    let h = document.createElement('h3');
    h.innerText = "All earthquakes (last hour)";
    harpunBody.appendChild(h);

    let o = document.createElement('div');
    o.id = "mapdiv";
    o.style = "height: 500px; width: 100%;";
    harpunBody.appendChild(o);

    let p = document.createElement('div');
    p.className = "piec";
    p.id = "app";
    p.innerHTML = `
    <ul>
        <li v-for="i in info">Place: <b>{{ i.properties.place }}</b><br>Magnitude: <b>{{ i.properties.mag }} Richter scale</b></li>
    </ul>
    <button class="legend">View legend</button>
    `;
    harpunBody.appendChild(p);

    view();

    document.querySelector('.legend').addEventListener('click', legenda);
    

    let b = document.createElement('button');
    b.className = "siedem btn btn-lg btn-primary btn-block";
    b.textContent = "Refresh";
    harpunBody.appendChild(b);
    document.querySelector('.siedem').addEventListener('click', odswiezanie);


    harpunBody.removeChild(harpun);
    harpunBody.removeChild(title);

    
    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());
    
    epsg4326 =  new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
    projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)
    
    var lonLat = new OpenLayers.LonLat( 50.0 ,100.0 ).transform(epsg4326, projectTo);
          
    var zoom=2;
    map.setCenter (lonLat, zoom);
    
    var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
    
    //Loop through the markers array
    for (var i=0; i<m.length; i++) {
      
       var lon = m[i][0];
       var lat = m[i][1];
       var rad = m[i][2]
       var magnitude = Math.min(Math.max(mag[i] *5, 15), 35) ;

        var feature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point( lon, lat ).transform(epsg4326, projectTo),
                {description: "marker number " + i} ,
                {externalGraphic: 'img/marker.png', graphicHeight: magnitude, graphicWidth: magnitude, graphicXOffset:-12, graphicYOffset:-25  }
            );             
        vectorLayer.addFeatures(feature);
    }                        
    
    map.addLayer(vectorLayer);
}

function dwaNumer(e) {
    var m = [];
    var mag = [];

    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson', false);
    
    xhr.onload = function() {
        const response = JSON.parse(this.responseText);
       
        response.features.forEach(i => {
            let x = i.geometry.coordinates[0];
            let y = i.geometry.coordinates[1];
    
            m.push([x, y]);

            mag.push(i.properties.mag);
        });

        return m;
    };
    
    xhr.send();

    let h = document.createElement('h3');
    h.innerText = "Significant earthquakes (last 7 days)";
    harpunBody.appendChild(h);

    let o = document.createElement('div');
    o.id = "mapdiv";
    o.style = "height: 500px; width: 100%;";
    harpunBody.appendChild(o);

    let p = document.createElement('div');
    p.className = "piec";
    p.id = "app";
    p.innerHTML = `
    <ul>
        <li v-for="i in info1">Place: <b>{{ i.properties.place }}</b><br>Magnitude: <b>{{ i.properties.mag }} Richter scale</b></li>
    </ul>
    <button class="legend">View legend</button>
    `;
    harpunBody.appendChild(p);

    view1();

    document.querySelector('.legend').addEventListener('click', legenda);
    

    let b = document.createElement('button');
    b.className = "siedem";
    b.textContent = "Refresh";
    harpunBody.appendChild(b);
    document.querySelector('.siedem').addEventListener('click', odswiezanie);


    harpunBody.removeChild(harpun);
    harpunBody.removeChild(title);

    
    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());
    
    epsg4326 =  new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
    projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)
    
    var lonLat = new OpenLayers.LonLat( 50.0 ,100.0 ).transform(epsg4326, projectTo);
          
    var zoom=2;
    map.setCenter (lonLat, zoom);
    
    var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
    
    //Loop through the markers array
    for (var i=0; i<m.length; i++) {
      
       var lon = m[i][0];
       var lat = m[i][1];
       var magnitude = Math.min(Math.max(mag[i] *5, 15), 35) ;

        var feature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point( lon, lat ).transform(epsg4326, projectTo),
                {description: "marker number " + i} ,
                {externalGraphic: 'img/marker.png', graphicHeight: magnitude, graphicWidth: magnitude, graphicXOffset:-12, graphicYOffset:-25  }
            );             
        vectorLayer.addFeatures(feature);
    }                        
    
    map.addLayer(vectorLayer);
}

function trzyNumer(e) {
    var m = [];
    var mag = [];

    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson', false);
    
    xhr.onload = function() {
        const response = JSON.parse(this.responseText);

        response.features.forEach(i => {
            let x = i.geometry.coordinates[0];
            let y = i.geometry.coordinates[1];

            m.push([x, y]);
            mag.push(i.properties.mag);
        });

        return m;
    };
    
    xhr.send();

    let h = document.createElement('h3');
    h.innerText = "Significant earthquakes (past month)";
    harpunBody.appendChild(h);

    let o = document.createElement('div');
    o.id = "mapdiv";
    o.style = "height: 500px; width: 100%;";
    harpunBody.appendChild(o);

    let p = document.createElement('div');
    p.className = "piec";
    p.id = "app";
    p.innerHTML = `
    <ul>
        <li v-for="i in info2">Place: <b>{{ i.properties.place }}</b><br>Magnitude: <b>{{ i.properties.mag }} Richter scale</b></li>
    </ul>
    <button class="legend">View legend</button>
    `;
    harpunBody.appendChild(p);

    view2();

    document.querySelector('.legend').addEventListener('click', legenda);
    

    let b = document.createElement('button');
    b.className = "siedem";
    b.textContent = "Refresh";
    harpunBody.appendChild(b);
    document.querySelector('.siedem').addEventListener('click', odswiezanie);


    harpunBody.removeChild(harpun);
    harpunBody.removeChild(title);

    
    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());
    
    epsg4326 =  new OpenLayers.Projection("EPSG:4326"); //WGS 1984 projection
    projectTo = map.getProjectionObject(); //The map projection (Spherical Mercator)
    
    var lonLat = new OpenLayers.LonLat( 50.0 ,100.0 ).transform(epsg4326, projectTo);
          
    var zoom=2;
    map.setCenter (lonLat, zoom);
    
    var vectorLayer = new OpenLayers.Layer.Vector("Overlay");
    
    //Loop through the markers array
    for (var i=0; i<m.length; i++) {
      
       var lon = m[i][0];
       var lat = m[i][1];
       var magnitude = Math.min(Math.max(mag[i] *5, 15), 35) ;

        var feature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point( lon, lat ).transform(epsg4326, projectTo),
                {description: "marker number " + i} ,
                {externalGraphic: 'img/marker.png', graphicHeight: magnitude, graphicWidth: magnitude, graphicXOffset:-12, graphicYOffset:-25  }
            );             
        vectorLayer.addFeatures(feature);
    }                        
    
    map.addLayer(vectorLayer);
}

function odswiezanie() {
    location.reload();
}

function view() {
    new Vue({
        el: '#app',
        data () {
            return {
                info: null
            }
        },
        mounted () {
            axios
                .get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson')
                .then(response => ( this.info = response.data.features ))
        }
    })
}

function view1() {
    new Vue({
        el: '#app',
        data () {
            return {
                info1: null
            }
        },
        mounted () {
            axios
                .get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson')
                .then(response => ( this.info1 = response.data.features ))
        }
    })
}

function view2() {
    new Vue({
        el: '#app',
        data () {
            return {
                info2: null
            }
        },
        mounted () {
            axios
                .get('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson')
                .then(response => ( this.info2 = response.data.features ))
        }
    })
}

function legenda() {
    let t = document.createElement('table');
    t.id = "legendTable";
    t.innerHTML = `
        <tr>
            <th>Magnitude</th>
            <th>Efects</th>
        </tr>
        <tr v-for="item in items">
            <td> {{ item.magnitude }}  </td>
            <td> {{ item.efect }} </td>
        </tr>
    `;
    document.querySelector('.piec').appendChild(t);

    var legendTable = new Vue({
        el: '#legendTable',
        data: {
          items: [
            { magnitude: '1.0 - 1.9', efect: 'Microearthquakes, not felt, or felt rarely. Recorded by seismographs.'  },
            { magnitude: '2.0 - 2.9', efect: 'Felt slightly by some people. No damage to buildings.' },
            { magnitude: '3.0 - 3.9', efect: 'Often felt by people, but very rarely causes damage. Shaking of indoor objects can be noticeable.' },
            { magnitude: '4.0 - 4.9', efect: 'Noticeable shaking of indoor objects and rattling noises. Felt by most people in the affected area. Slightly felt outside. Generally causes zero to minimal damage. Moderate to significant damage very unlikely. Some objects may fall off shelves or be knocked over.' },
            { magnitude: '5.0 - 5.9', efect: 'Can cause damage of varying severity to poorly constructed buildings. Zero to slight damage to all other buildings. Felt by everyone.' },
            { magnitude: '6.0 - 6.9', efect: 'Damage to a moderate number of well-built structures in populated areas. Earthquake-resistant structures survive with slight to moderate damage. Poorly designed structures receive moderate to severe damage. Felt in wider areas; up to hundreds of miles/kilometers from the epicenter. Strong to violent shaking in epicentral area.' },
            { magnitude: '7.0 - 7.9', efect: 'Causes damage to most buildings, some to partially or completely collapse or receive severe damage. Well-designed structures are likely to receive damage. Felt across great distances with major damage mostly limited to 250 km from epicenter.' },
            { magnitude: '8.0 - 8.9', efect: 'Major damage to buildings, structures likely to be destroyed. Will cause moderate to heavy damage to sturdy or earthquake-resistant buildings. Damaging in large areas. Felt in extremely large regions.' },
            { magnitude: '9.0 and more', efect: 'At or near total destruction – severe damage or collapse to all buildings. Heavy damage and shaking extends to distant locations. Permanent changes in ground topography.' }
          ]
        }
      })
}
