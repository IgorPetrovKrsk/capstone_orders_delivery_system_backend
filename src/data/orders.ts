export enum OrderStatus {
    Pending = 'Pending',
    Assigned = 'Assigned',
    Delivered = 'Delivered',
    Returned = 'Returned'
}

export interface Order {
    id: string
    origin: string //pick up location
    destination: string //delivery location
    weight: number //weight of the single order
    status: OrderStatus
    truckId: number | null //order can be without truck
}

//testing data
const orders: Order[] = [
    {
        id: "o1",
        origin: "Denver, CO",
        destination: "Salt Lake City, UT",
        weight: 3000,
        status: OrderStatus.Pending,
        truckId: null
    },
    {
        id: "o2",
        origin: "Phoenix, AZ",
        destination: "Los Angeles, CA",
        weight: 4500,
        status: OrderStatus.Assigned,
        truckId: 2,
    },
    {
        id: "o3",
        origin: "Chicago, IL",
        destination: "Detroit, MI",
        weight: 5000,
        status: OrderStatus.Pending,
        truckId: null
    },
    {
        id: "o4",
        origin: "Miami, FL",
        destination: "Atlanta, GA",
        weight: 3800,
        status: OrderStatus.Delivered,
        truckId: 9,
    },
    {
        id: "o5",
        origin: "Dallas, TX",
        destination: "Houston, TX",
        weight: 2000,
        status: OrderStatus.Assigned,
        truckId: 6,
    },
    {
        id: "o6",
        origin: "Seattle, WA",
        destination: "Portland, OR",
        weight: 3300,
        status: OrderStatus.Pending,
        truckId: null
    },
    {
        id: "o7",
        origin: "Boston, MA",
        destination: "New York, NY",
        weight: 2700,
        status: OrderStatus.Returned,
        truckId: 4,
    },
    {
        id: "o8",
        origin: "Las Vegas, NV",
        destination: "Reno, NV",
        weight: 1500,
        status: OrderStatus.Pending,
        truckId: null
    },
    {
        id: "o9",
        origin: "Minneapolis, MN",
        destination: "St. Louis, MO",
        weight: 4100,
        status: OrderStatus.Assigned,
        truckId: 7,
    },
    {
        id: "o10",
        origin: "San Francisco, CA",
        destination: "San Diego, CA",
        weight: 4700,
        status: OrderStatus.Pending,
        truckId: null
    },
];

export default orders