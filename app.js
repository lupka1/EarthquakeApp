document.getElementById('jeden').addEventListener('click', jedenNumer);
document.getElementById('dwa').addEventListener('click', dwaNumer);
document.getElementById('trzy').addEventListener('click', trzyNumer);

const harpunBody = document.body;
const harpun = document.querySelector('.container');

function jedenNumer(e) {

}

function dwaNumer(e) {

}

function trzyNumer(e) {

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