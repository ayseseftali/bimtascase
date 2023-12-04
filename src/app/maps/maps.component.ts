import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as L from 'leaflet';
import { MarkerClusterGroup } from "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import 'leaflet/dist/leaflet.css';
import { Element } from '../table-list/interfaces/table-list.model';
import { DetailElement } from '../table-list/interfaces/table-list-detail.model';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
  markerClusterData = [];
  detailData;

  constructor(private http: HttpClient) {
    this.fetchData();
  }

  fetchData() {
    this.http.get('https://api.ibb.gov.tr/ispark/Park')
      .subscribe((response: Element[]) => {
        this.createMarker(response);
      });
  }

  map;
  lastLayer;
  @Input() markers;
  @Output() LMarkerclicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() setPositon: EventEmitter<any> = new EventEmitter<any>();

  //   Options = {
  //     layers: [
  //       L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
  //     ],
  //     zoom: 7,
  //     center: L.latLng(29.6060218, 52.5378041)
  //   };

  ngOnInit() {
    this.map = L.map('map').setView([41.015137, 28.979530], 9);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    
  }

  private createMarker(elements:any) {
    const markerIcon =
      L.icon({
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
        // specify the path here
        iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
      })

    const markerCluster = new MarkerClusterGroup();
    for (let i = 0; i < elements.length; i++) {
      const lat = elements[i].lat as number;
      const lng = elements[i].lng as number;
      const marker = L.marker(new L.LatLng(lat, lng), { icon: markerIcon });
      this.http.get('https://api.ibb.gov.tr/ispark/ParkDetay?id=' + elements[i].parkID.toString())
      .subscribe((detailData: DetailElement) => {
        this.detailData = detailData[0];
        marker.bindPopup("<label>Park Adı:" + this.detailData.parkName + "</label><br>" +
      "<label>Kapasite:" + this.detailData.capacity + "</label><br>" +
      "<label>Park Tipi:" + this.detailData.parkType + "</label><br>" +
      "<label>Boş Kapasite:" + this.detailData.emptyCapacity + "</label><br>" +
      "<label>Çalışma Saati:" + this.detailData.workHours+ "</label><br>" +
      "<label>Tariff:" + this.detailData.tariff+ "</label><br>" +
      "<label>FreeTime:" + this.detailData.freeTime+ "</label><br>" +
      "<label>Adres:" + this.detailData.address+ "</label><br>" +
      "<label>İlçe:" + this.detailData.district+ "</label><br>" +
      "<label>Park Id:" + this.detailData.parkID+ "</label>");
      }); 
     
      markerCluster.addLayer(marker);
    }
    this.map.addLayer(markerCluster);
  }

  onMapReady(map: L.Map) {
    setTimeout(() => {
      this.map = map;
      map.invalidateSize();
      this.addMarker();
    }, 0);
    map.on('click', (e) => { this.onMapClick(e) });
  }
  onMapClick(e: any) {
    throw new Error('Method not implemented.');
  }
  addMarker() {
    this.markers.forEach((mapMarker) => {
      let m = L.marker([mapMarker.lat, mapMarker.lng], {
        draggable: true,
        icon: new L.DivIcon({
          className: 'my-div-icon',
          html: '<img class="my-div-image" src="' + mapMarker.icon + '" />' +
            '<label class="MarkerLabel">' + mapMarker.label + '</label>'
        })
      }).addTo(this.map).bindPopup("<b>" + mapMarker.info + "</b><br>" + mapMarker.label).on('click', this.markerClick, this).on('dragend', this.markerDragend, this);
    });
  }
  markerClick(e) {
    this.LMarkerclicked.emit(e.latlng);
  }
  markerDragend(e) {
    this.LMarkerclicked.emit(e.target._latlng);
  }

}

