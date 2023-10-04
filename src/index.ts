import L from "leaflet";
import * as geojson from "geojson";
import './styles/index.styl';

// 参考: https://mukai-lab.info/pages/tech/leaflet/leaflet/

// 緯度・経度と倍率の指定
const mymap = L.map("mymap").setView([35.69434, 139.69571], 19);

// 地図タイルとクレジット表示
L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
  }
).addTo(mymap);

const customIcon = L.divIcon({
  html: `
<svg
  width="24"
  height="40"
  viewBox="0 0 100 100"
  version="1.1"
  preserveAspectRatio="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="M0 0 L50 100 L100 0 Z" fill="#7A8BE7"></path>
</svg>`,
  className: "",
  iconSize: [24, 40],
  iconAnchor: [12, 40],
});

const data: geojson.FeatureCollection = {
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
L.geoJSON(data, {
  pointToLayer: function(feature, latlng) {
    return L.marker(latlng, {icon: customIcon});
  },
  onEachFeature: (feature, layer) => {
    layer.bindPopup("<div style='width:150px'>" + feature.properties.name + "</div>");
  },
}).addTo(mymap);

// イベント処理
var popup = L.popup();
mymap.on("click", e => {
  popup.setLatLng(e.latlng).setContent(
    "<p>緯度:" + e.latlng.lat + " 経度:" + e.latlng.lng + "</p>"
  ).openOn(mymap);
});

L.marker([35.6927748, 139.6939962], {icon:customIcon}).addTo(mymap).on('click', e => {
  popup
    .setLatLng(e.latlng)
    .setContent("テキサス 野村ビル店" + e.latlng.toString())
    .openOn(mymap);
});
