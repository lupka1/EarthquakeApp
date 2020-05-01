document.getElementById('jeden').addEventListener('click', jedenNumer);
document.getElementById('dwa').addEventListener('click', dwaNumer);
document.getElementById('trzy').addEventListener('click', trzyNumer);

const harpunBody = document.body;
const harpun = document.querySelector('.container');
const title = document.querySelector('.title');

function jedenNumer(e) {
    var m = [];

    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson', false);
    
    xhr.onload = function() {
        const response = JSON.parse(this.responseText);
        //console.log(response.features);
        response.features.forEach(i => {
            let x = i.geometry.coordinates[0];
            let y = i.geometry.coordinates[1];
            let z = i.geometry.coordinates[2];
            //console.log(x);
            //console.log(y);
            m.push([x, y, z]);
        });
        console.log('Array:', m);
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
        <li v-for="i in info">Place: {{ i.properties.place }}<br>Magnitude: {{ i.properties.mag }} Richter scale</li>
    </ul>
    <p class="legend">View legend</p>
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

        var feature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point( lon, lat ).transform(epsg4326, projectTo),
                {description: "marker number " + i} ,
                {externalGraphic: 'img/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
            );             
        vectorLayer.addFeatures(feature);
    }                        
    
    map.addLayer(vectorLayer);
}

function dwaNumer(e) {
    var m = [];

    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson', false);
    
    xhr.onload = function() {
        const response = JSON.parse(this.responseText);
        //console.log(response.features);
        response.features.forEach(i => {
            let x = i.geometry.coordinates[0];
            let y = i.geometry.coordinates[1];
            console.log(x); //should we remove or comment this? 
            console.log(y); //should we remove or comment this? 
            m.push([x, y]);
        });
        //console.log('Array:', m);
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
       
        var feature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point( lon, lat ).transform(epsg4326, projectTo),
                {description: "marker number " + i} ,
                {externalGraphic: 'img/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
            );             
        vectorLayer.addFeatures(feature);
    }                        
    
    map.addLayer(vectorLayer);
}

function trzyNumer(e) {
    var m = [];

    const xhr = new XMLHttpRequest();
    
    xhr.open('GET', 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson', false);
    
    xhr.onload = function() {
        const response = JSON.parse(this.responseText);
        //console.log(response.features);
        response.features.forEach(i => {
            let x = i.geometry.coordinates[0];
            let y = i.geometry.coordinates[1];
            console.log(x);
            console.log(y);
            m.push([x, y]);
        });
        //console.log('Array:', m);
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
       
        var feature = new OpenLayers.Feature.Vector(
                new OpenLayers.Geometry.Point( lon, lat ).transform(epsg4326, projectTo),
                {description: "marker number " + i} ,
                {externalGraphic: 'img/marker.png', graphicHeight: 25, graphicWidth: 21, graphicXOffset:-12, graphicYOffset:-25  }
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

}

