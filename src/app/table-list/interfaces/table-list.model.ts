export class Element {
    parkID: number;
    parkName: string;
    capacity: number;
    parkType: string;
    emptyCapacity: number;
  

  constructor(element) {
    this.parkID = element.parkID;
    this.parkName = element.parkName;
    this.capacity = element.capacity;
    this.parkType = element.parkType;
    this.emptyCapacity = element.emptyCapacity;  
  }
}