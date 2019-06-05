import React, { Component } from "react";
import ReactDOM from "react-dom";

import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { ContextMenu } from "primereact/contextmenu";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
//import { DataTable, Column } from "primereact/datatable";

import MyMap from "./map.jsx";

export class ContextMenuDemo extends Component {
  constructor() {
    super();
    this.onHide = this.onHide.bind(this);
    this.save = this.save.bind(this);
    this.state = {
      items: [
        {
          label: "Logement",
          icon: "pi pi-fw pi-home",
          items: [
            {
              label: "Nouveau",
              icon: "pi pi-fw pi-plus",
              command: event => {
                this.setState({ visible: true });
              }
            },
            {
              label: "Delete",
              icon: "pi pi-fw pi-trash"
            },
            {
              separator: true
            },
            {
              label: "Export",
              icon: "pi pi-fw pi-external-link"
            }
          ]
        },
        {
          label: "Editer",
          icon: "pi pi-fw pi-pencil"
        }
      ],
      visible: false,
      long: null,
      lat: null,
      name: "",
      desc: "",
      typeLogement: "",
      addresses: [
        {
          position: [38.626662, -90.261143],
          name: "Urban Chestnut Brewery",
          desc: "4465 Manchester Avenue",
          typeLogement: "Social"
        },
        {
          position: [38.5906282, -90.260091],
          name: "Civil Life Brewing",
          desc: "3714 Holt",
          typeLogement: "Social"
        },
        {
          position: [38.6151866, -90.1973131],
          name: "4 Hands Brewing",
          desc: "1220 S. 8th street",
          typeLogement: "Social"
        },
        {
          position: [38.6329716, -90.2096546],
          name: "The Schlafly Tap Room",
          desc: "2100 Locust St.",
          typeLogement: "Social"
        }
      ],
      zones: [
        {
          pts: [
            [38.58388, -90.26],
            [38.626662, -90.261143],
            [38.6332116, -90.2058],
            [38.6113994, -90.192]
          ],
          desc: ""
        }
      ]
    };
  }

  onHide(event) {
    this.setState({ visible: false });
  }

  save(event) {
    //const prevState = this.state.addresses;
    const newItem = {
      position: [Number(this.state.long), Number(this.state.lat)],
      name: this.state.name,
      desc: this.state.desc,
      typeLogement: this.state.typeLogement
    };
    this.setState(prevState => ({
      addresses: [...prevState.addresses, newItem]
    }));
    this.setState({ long: null });
    this.setState({ lat: null });
    this.setState({ desc: "" });
    this.setState({ name: "" });
    this.setState({ typeLogement: "" });

    this.onHide();
  }

  render() {
    //const mapStyle = { width: "600px", height: "400px", position: "relative" };

    const footer = (
      <div>
        <Button label="Save" icon="pi pi-check" onClick={this.save} />
        <Button
          label="Cancel"
          icon="pi pi-times"
          onClick={this.onHide}
          className="p-button-secondary"
        />
      </div>
    );

    const styleInputText = { marginTop: "1.5em" };
    const mapStyle = { width: "600px", height: "400px", position: "relative" };

    const options = [
      { label: "HLM", value: "HLM" },
      { label: "Prive", value: "Prive" },
      { label: "Social", value: "Social" }
    ];

    return (
      <div>
        <div>
          <div className="content-section implementation">
            <ContextMenu model={this.state.items} ref={el => (this.cm = el)} />
          </div>
          <div style={mapStyle} onContextMenu={e => this.cm.show(e)}>
            <MyMap addresses={this.state.addresses} zones={this.state.zones} />
          </div>
          <div>
            <Dialog
              header="Nouveau Logement"
              visible={this.state.visible}
              width="400px"
              modal={true}
              footer={footer}
              minY={70}
              onHide={this.onHide}
              maximizable={true}
              blockScroll={true}
            >
              <div style={styleInputText}>
                <span className="p-float-label">
                  <InputText
                    id="curr-name"
                    type="text"
                    size="30"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                  <label htmlFor="curr-desc">Nom</label>
                </span>
              </div>
              <div style={styleInputText}>
                <span className="p-float-label">
                  <InputText
                    id="curr-long"
                    type="text"
                    size="29"
                    value={this.state.long}
                    onChange={e => this.setState({ long: e.target.value })}
                  />
                  <label htmlFor="curr-long">Longitude</label>
                </span>
              </div>
              <div style={styleInputText}>
                <span className="p-float-label">
                  <InputText
                    id="curr-lat"
                    type="text"
                    size="29"
                    value={this.state.lat}
                    onChange={e => this.setState({ lat: e.target.value })}
                  />
                  <label htmlFor="curr-lat">Latitude</label>
                </span>
              </div>
              <div style={styleInputText}>
                <span className="p-float-label">
                  <InputText
                    id="curr-desc"
                    type="text"
                    size="29"
                    value={this.state.desc}
                    onChange={e => this.setState({ desc: e.target.value })}
                  />
                  <label htmlFor="curr-desc">Description</label>
                </span>
              </div>
              <div>
                <SelectButton
                  value={this.state.typeLogement}
                  options={options}
                  onChange={e => this.setState({ typeLogement: e.value })}
                />
              </div>
            </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ContextMenuDemo />, document.getElementById("root"));
