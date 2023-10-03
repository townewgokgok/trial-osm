import L from "leaflet";
import * as geojson from "geojson";
import './styles/index.styl';

// 参考: https://mukai-lab.info/pages/tech/leaflet/leaflet/

// 緯度・経度と倍率の指定
const mymap = L.map("mymap").setView([35.69434, 139.69571], 19);

L.Icon.Default.imagePath = "images/";

// 地図タイルとクレジット表示
L.tileLayer(
  "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution: "&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
  }
).addTo(mymap);

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
      }
    }
  ]
};

// GeoJSONの読込
L.geoJSON(data, {
  onEachFeature: (feature, layer) => {
    layer.bindPopup("<div style='width:150px'>" + feature.properties.name + "</div>");
  }
}).addTo(mymap);

// イベント処理
var popup = L.popup();
mymap.on("click", e => {
  popup.setLatLng(e.latlng).setContent(
    "<p>緯度:" + e.latlng.lat + " 経度:" + e.latlng.lng + "</p>"
  ).openOn(mymap);
});
