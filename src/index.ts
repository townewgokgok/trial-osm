import L from "leaflet";
import * as ExtraMarkers from 'leaflet-extra-markers';
require('leaflet-extra-markers');
import * as Fullscreen from 'leaflet.fullscreen';
require('leaflet.fullscreen/Control.FullScreen.js');
require('leaflet-search');
import * as geojson from "geojson";
import './styles/index.styl';

// declare namespace L {
//     namespace Control {
//         export class Search {
//             constructor(options?: any);
//         }
//     }
// }

// 参考: https://mukai-lab.info/pages/tech/leaflet/leaflet/

// 緯度・経度と倍率の指定
const mymap = new L.Map('mymap', {
  fullscreenControl: true,
  fullscreenControlOptions: {
    position: 'topleft'
  },
}).setView([35.69434, 139.69571], 5);

// 地図タイルとクレジット表示
L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 18,
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
  }
).addTo(mymap);

// const customIcon = L.divIcon({
//   html: `<svg xmlns="http://www.w3.org/2000/svg" height="${iconSize}px" viewBox="0 0 384 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z"/></svg>`,
//   className: "",
//   iconSize: [iconSize * 0.75, iconSize],
//   iconAnchor: [iconSize * 0.75 / 2, iconSize],
// });

const customIcon = L.ExtraMarkers.icon({
  shape: 'circle',
  markerColor: 'cyan',
  prefix: 'fas',
  icon: 'fa-building',
  iconColor: '#fff',
  iconRotate: 0,
  extraClasses: '',
  number: '',
  svg: true,
});

/*

const geoData: geojson.FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [139.69571, 35.69434]
      },
      properties: {
        name: "さくらインターネット 東京支社",
        amenity: "Office",
      }
    }
  ]
};

// GeoJSONの読込
L.geoJSON(geoData, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, { icon: customIcon });
  },
  onEachFeature: (feature, layer) => {
    layer.bindPopup("<div style='width:150px'>" + feature.properties.name + "</div>");
  },
}).addTo(mymap);

// イベント処理
const popup = L.popup();
mymap.on("click", e => {
  // popup.setLatLng(e.latlng).setContent(
  //   "<p>緯度:" + e.latlng.lat + " 経度:" + e.latlng.lng + "</p>"
  // ).openOn(mymap);
});

L.marker([35.6927524, 139.6950475], { icon: customIcon }).addTo(mymap).on('click', e => {
  popup
    .setLatLng(e.latlng)
    .setContent("テキサス 野村ビル店")
    .openOn(mymap);
});

*/

const searchLayer = new L.LayerGroup();
mymap.addLayer(searchLayer);

const data = [
  {loc:[35.694317, 139.695866], title:"さくらインターネット東京支社", description:"〒160-0023 東京都新宿区西新宿７丁目２０−１ 住友不動産西新宿ビル 32F"},
  {loc:[34.7005117, 135.4982745], title:"さくらインターネット本社", description:"〒530-0001 大阪府大阪市北区梅田１丁目１２−１２ 東京建物梅田ビル 11階"},
  {loc:[33.5885441, 130.3894127], title:"さくらインターネット福岡オフィス", description:"〒810-0042 福岡県福岡市中央区赤坂１丁目１２−１５ 読売福岡ビル 7F"},
  {loc:[26.2170071, 127.6768332], title:"SAKURA innobase Okinawa", description:"〒900-0032 沖縄県那覇市松山１丁目２ 長谷工那覇ビル 1階"},
];
for (let d of data) {
  let marker = new L.Marker(new L.LatLng(d.loc[0], d.loc[1]), {title: d.title, icon:customIcon} );
  marker.bindPopup('title: '+ d.title);
  searchLayer.addLayer(marker);
}

// @ts-ignore
const controlSearch = new L.Control.Search({
  position: 'topright',
  layer: searchLayer,
  initial: false,
  zoom: 15,
  marker: false,
  autoResize: true,
});
mymap.addControl(controlSearch);
