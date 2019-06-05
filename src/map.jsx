import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import "./styles.css";
import L from "leaflet";

function chooseIcon(typeLogement) {
  var icon;
  switch (typeLogement) {
    case "Social":
      icon = new L.icon({
        iconUrl: require("./marker-icon-green.png")
      });
      break;
    case "HLM":
      icon = new L.icon({
        iconUrl: require("./marker-icon-violet.png")
      });
      break;
    case "Prive":
      icon = new L.icon({
        iconUrl: require("./marker-icon-blue.png")
      });
      break;
  }
  return icon;
}

const position = [38.6074, -90.2266075];
export default class MyMap extends Component {
  /*constructor() {
    super();
  }*/
  render() {
    const addrs = this.props.addresses;
    //https://github.com/pointhi/leaflet-color-markers

    const listAddr = addrs.map(addr => (
      <Marker position={addr.position} icon={chooseIcon(addr.typeLogement)}>
        <Popup>
          {addr.name}
          <br />
          {addr.desc}
        </Popup>
      </Marker>
    ));

    const zones = this.props.zones;
    const listZones = zones.map(zone => (
      <Polygon color="gold" positions={zone.pts} weight="5" />
    ));

    //const numbers = [1, 2, 3, 4, 5];
    //const listItems = numbers.map(number => <li>{number}</li>);
    return (
      <Map center={position} zoom={12}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {listAddr}
        {listZones}
      </Map>
    );
  }
}
