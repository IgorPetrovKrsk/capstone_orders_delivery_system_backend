export const trucksSeed = [
    { licensePlate: 'ABC123', driver: 'John Doe', capacity: 8000, status: 'Available' },
    { licensePlate: 'XYZ789', driver: 'Jane Smith', capacity: 10000, status: 'En Route' },
    { licensePlate: 'LMN456', driver: 'Alice Johnson', capacity: 5000, status: 'Repairs' },
    { licensePlate: 'PQR321', driver: 'Bob Brown', capacity: 10000, status: 'Idle' },
    { licensePlate: 'STU654', driver: 'Charlie Davis', capacity: 2000, status: 'Available' },
    { licensePlate: 'JKL987', driver: 'Emma Wilson', capacity: 6000, status: 'En Route' },
    { licensePlate: 'DEF432', driver: 'Frank Green', capacity: 7000, status: 'Repairs' },
    { licensePlate: 'GHI876', driver: 'Grace White', capacity: 10000, status: 'Idle' },
    { licensePlate: 'VWX210', driver: 'Hank Black', capacity: 4000, status: 'Available' },
    { licensePlate: 'OPQ543', driver: 'Ivy Hall', capacity: 1000, status: 'En Route' }
  ];

  export const messagesSeed = [
    { truckLicencePlate: 'ABC123', status: 'Pending', orderId: 'ORD001', content: 'Truck is en route to the delivery location.' },
    { truckLicencePlate: 'XYZ789', status: 'Delivered', orderId: 'ORD002', content: 'Order delivered successfully.' },
    { truckLicencePlate: 'LMN456', status: 'Read', orderId: 'ORD003', content: 'Driver confirmed that the truck is idle.' },
    { truckLicencePlate: 'PQR321', status: 'Pending', orderId: 'ORD004', content: 'Truck is awaiting instructions at the depot.' },
    { truckLicencePlate: 'STU654', status: 'Pending', orderId: 'ORD005', content: 'Truck is scheduled for repairs tomorrow.' },
    { truckLicencePlate: 'JKL987', status: 'Delivered', orderId: 'ORD006', content: 'Delivery completed. Driver heading back.' },
    { truckLicencePlate: 'DEF432', status: 'Read', orderId: 'ORD007', content: 'Driver has confirmed receipt of the next job details.' },
    { truckLicencePlate: 'GHI876', status: 'Pending', orderId: 'ORD008', content: 'Preparing for loading at the warehouse.' },
    { truckLicencePlate: 'VWX210', status: 'Delivered', orderId: 'ORD009', content: 'Delivered the cargo successfully in Denver.' },
    { truckLicencePlate: 'OPQ543', status: 'Pending', orderId: 'ORD010', content: 'Driver awaiting departure clearance from dispatch.' }
  ];

  export const ordersSeed = [
    { origin: 'Denver', destination: 'New York', status: 'Pending', weight: 5000, truckLicencePlate: 'ABC123' },
    { origin: 'Los Angeles', destination: 'San Francisco', status: 'Assigned', weight: 3000, truckLicencePlate: 'XYZ789' },
    { origin: 'Chicago', destination: 'Boston', status: 'Delivered', weight: 7000, truckLicencePlate: 'LMN456' },
    { origin: 'Seattle', destination: 'Miami', status: 'Returned', weight: 2000, truckLicencePlate: 'PQR321' },
    { origin: 'Houston', destination: 'Austin', status: 'Pending', weight: 4500, truckLicencePlate: 'STU654' },
    { origin: 'Phoenix', destination: 'Las Vegas', status: 'Assigned', weight: 6000, truckLicencePlate: 'JKL987' },
    { origin: 'Philadelphia', destination: 'Atlanta', status: 'Delivered', weight: 8000, truckLicencePlate: 'DEF432' },
    { origin: 'Dallas', destination: 'Salt Lake City', status: 'Returned', weight: 2500, truckLicencePlate: 'GHI876' },
    { origin: 'San Diego', destination: 'Portland', status: 'Pending', weight: 1000, truckLicencePlate: 'VWX210' },
    { origin: 'Detroit', destination: 'Orlando', status: 'Assigned', weight: 9000, truckLicencePlate: 'OPQ543' }
  ];
  