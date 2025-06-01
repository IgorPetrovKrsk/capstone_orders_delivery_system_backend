export enum TruckStatus {
    Available = 'Available',
    EnRoute = 'En Route',
    Idle = 'Idle',
    Repairs = 'Repairs'
}

export interface Truck {
    id: number
    driverName: string | null //truck can be without driver
    licensePlate: string
    status: TruckStatus
    capacity:number 
}

//object to store key because after compilation Truck interface does'n exist
export const truckTemplate: Truck = 
  {
    id: -1,
    driverName: "template",
    licensePlate: "template",
    status: TruckStatus.Available,
    capacity: -1,
  };


//test data
let trucks: Truck[] = [
    {
      id: 1,
      driverName: "Alice Johnson",
      licensePlate: "ABC-1234",
      status: TruckStatus.Available,
      capacity: 10000,
    },
    {
      id: 2,
      driverName: "Bob Smith",
      licensePlate: "XYZ-5678",
      status: TruckStatus.EnRoute,
      capacity: 8000,
    },
    {
      id: 3,
      driverName: "Carlos Martinez",
      licensePlate: "LMN-2345",
      status: TruckStatus.Idle,
      capacity: 12000,
    },
    {
      id: 4,
      driverName: "Diana Ross",
      licensePlate: "JKL-9876",
      status: TruckStatus.Repairs,
      capacity: 9500,
    },
    {
      id: 5,
      driverName: "Evan Wright",
      licensePlate: "GHI-4321",
      status: TruckStatus.Available,
      capacity: 11000,
    },
    {
      id: 6,
      driverName: "Fatima Ali",
      licensePlate: "DEF-7890",
      status: TruckStatus.Repairs,
      capacity: 7000,
    },
    {
      id: 7,
      driverName: "George Lee",
      licensePlate: "QWE-1111",
      status: TruckStatus.Idle,
      capacity: 10500,
    },
    {
      id: 8,
      driverName: "Hannah Kim",
      licensePlate: "RTY-2222",
      status: TruckStatus.Available,
      capacity: 9000,
    },
    {
      id: 9,
      driverName: "Isaac Brown",
      licensePlate: "UIO-3333",
      status: TruckStatus.EnRoute,
      capacity: 8500,
    },
    {
      id: 10,
      driverName: "Julia Nguyen",
      licensePlate: "PAS-4444",
      status: TruckStatus.Available,
      capacity: 10000,
    },
  ];
  
  export default trucks