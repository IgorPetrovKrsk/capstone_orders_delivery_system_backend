export const trucksSeed = [
  { licensePlate: 'ABC123', capacity: 8000, status: 'available' },
  { licensePlate: 'XYZ789', capacity: 10000, status: 'en route' },
  { licensePlate: 'LMN456', capacity: 5000, status: 'repairs' },
  { licensePlate: 'PQR321', capacity: 10000, status: 'idle' },
  { licensePlate: 'STU654', capacity: 2000, status: 'available' },
  { licensePlate: 'JKL987', capacity: 6000, status: 'en route' },
  { licensePlate: 'DEF432', capacity: 7000, status: 'repairs' },
  { licensePlate: 'GHI876', capacity: 10000, status: 'idle' },
  { licensePlate: 'VWX210', capacity: 4000, status: 'available' },
  { licensePlate: 'OPQ543', capacity: 1000, status: 'en route' }
];

export const messagesSeed = [
  { truck: null, order: null, status: "pending", content: "Truck assignment is pending for this order.", date: new Date("2025-06-02T08:30:00Z") },
  { truck: null, order: null, status: "delivered", content: "Order has been successfully delivered.", date: new Date("2025-06-01T14:00:00Z") },
  { truck: null, order: null, status: "eead", content: "Confirmation received. Status updated.", date: new Date("2025-06-02T10:15:00Z") },
  { truck: null, order: null, status: "pending", content: "Awaiting truck assignment for delivery.", date: new Date("2025-06-02T09:45:00Z") },
  { truck: null, order: null, status: "delivered", content: "Delivery completed successfully.", date: new Date("2025-06-01T16:30:00Z") },
  { truck: null, order: null, status: "pending", content: "New message received regarding order dispatch.", date: new Date("2025-06-02T11:00:00Z") },
  { truck: null, order: null, status: "read", content: "Driver confirmed package pickup.", date: new Date("2025-06-02T11:45:00Z") },
  { truck: null, order: null, status: "delivered", content: "Package delivered successfully.", date: new Date("2025-06-01T18:00:00Z") },
  { truck: null, order: null, status: "pending", content: "Route planning in progress.", date: new Date("2025-06-02T12:30:00Z") },
  { truck: null, order: null, status: "read", content: "Dispatch update received.", date: new Date("2025-06-02T13:15:00Z") },
];

export const ordersSeed = [
  { origin: "Union Station", originCoordinates: { longitude: -104.9995, latitude: 39.7541 }, destination: "Denver International Airport", destinationCoordinates: { longitude: -104.6737, latitude: 39.8561 }, status: "pending", weight: 5000, truck: null },
  { origin: "Capitol Hill", originCoordinates: { longitude: -104.9847, latitude: 39.7392 }, destination: "Cherry Creek Shopping Center", destinationCoordinates: { longitude: -104.9499, latitude: 39.7115 }, status: "assigned", weight: 7500, truck: null },
  { origin: "Washington Park", originCoordinates: { longitude: -104.9644, latitude: 39.7035 }, destination: "Denver Tech Center", destinationCoordinates: { longitude: -104.8987, latitude: 39.6237 }, status: "delivered", weight: 3000, truck: null },
  { origin: "LoDo (Lower Downtown)", originCoordinates: { longitude: -104.9935, latitude: 39.7528 }, destination: "City Park", destinationCoordinates: { longitude: -104.955, latitude: 39.7483 }, status: "returned", weight: 9500, truck: null },
  { origin: "South Broadway", originCoordinates: { longitude: -104.9877, latitude: 39.6905 }, destination: "University of Denver", destinationCoordinates: { longitude: -104.9663, latitude: 39.6767 }, status: "assigned", weight: 6000, truck: null },
  { origin: "Five Points", originCoordinates: { longitude: -104.9785, latitude: 39.7575 }, destination: "Sloan's Lake Park", destinationCoordinates: { longitude: -105.0488, latitude: 39.7569 }, status: "pending", weight: 8000, truck: null },
  { origin: "RiNo (River North Art District)", originCoordinates: { longitude: -104.971, latitude: 39.7685 }, destination: "Highlands", destinationCoordinates: { longitude: -105.0085, latitude: 39.7597 }, status: "delivered", weight: 1000, truck: null },
  { origin: "Auraria Campus", originCoordinates: { longitude: -105.0027, latitude: 39.7447 }, destination: "Stapleton", destinationCoordinates: { longitude: -104.883, latitude: 39.7833 }, status: "returned", weight: 4000, truck: null },
  { origin: "Golden Triangle", originCoordinates: { longitude: -104.9885, latitude: 39.7362 }, destination: "Uptown Denver", destinationCoordinates: { longitude: -104.978, latitude: 39.7421 }, status: "pending", weight: 7000, truck: null },
  { origin: "East Colfax", originCoordinates: { longitude: -104.9275, latitude: 39.7404 }, destination: "Lowry Field", destinationCoordinates: { longitude: -104.8914, latitude: 39.7167 }, status: "assigned", weight: 500, truck: null }
];

export const usersSeed = [
  { username: "admin", role: "admin", isActive: true, password:'$2b$10$uC/lgj03Zyaa/bWdgHk.Ju2Wi3JIRyDvIWwi77r3RK/V6ECw9GFWK'},
  { username: "dispatcher", role: "dispatcher", isActive: true, password:'$2b$10$NAobnL/V45tPg72yxWBM/.MP5GiFFAhIs4pHT4b/RfTqaSw6gPF9K'},  
  { username: "admin1", role: "admin", isActive: true },
  { username: "dispatcher1", role: "dispatcher", isActive: true },
  { username: "driver1", role: "driver", isActive: true },
  { username: "driver2", role: "driver", isActive: false },
  { username: "driver3", role: "driver", isActive: true },
  { username: "dispatcher2", role: "dispatcher" },
  { username: "admin2", role: "admin", isActive: true },
  { username: "driver4", role: "driver", isActive: true },
  { username: "driver5", role: "driver", isActive: false },
  { username: "dispatcher3", role: "dispatcher", isActive: true }
];