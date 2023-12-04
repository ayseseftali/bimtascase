export class DetailElement {
    parkName: string;
    capacity: number;
    parkType: string;
    emptyCapacity: number;
    workHours: string;
    tariff: string;
    freeTime: number;
    address: string;
    district: string;
    parkID: number;

  constructor(element) {
    this.parkName = element.parkName;
    this.capacity = element.capacity;
    this.parkType = element.parkType;
    this.emptyCapacity = element.emptyCapacity;  
    this.workHours = element.workHours;
    this.tariff = element.tariff;
    this.freeTime = element.freeTime;
    this.address = element.address;
    this.district = element.district;
    this.parkID = element.parkID;
  }
}