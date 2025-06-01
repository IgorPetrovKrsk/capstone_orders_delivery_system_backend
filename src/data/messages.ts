export enum MessageStatus {
    Pending = 'Pending',
    Delivered = 'Delivered',
    Read = 'READ'
}

export interface Message {
    id: number
    status: MessageStatus
    truckId: number //reciever of message
    orderId?: string;
    content: string;
}

//testing data
const messages: Message[] = [
    {
      id: 1,
      status: MessageStatus.Pending,
      truckId: 1,
      orderId: 'ORD-1001',
      content: 'Pickup scheduled at 10:00 AM.'
    },
    {
      id: 2,
      status: MessageStatus.Delivered,
      truckId: 2,
      orderId: 'ORD-1002',
      content: 'Route updated due to traffic.'
    },
    {
      id: 3,
      status: MessageStatus.Read,
      truckId: 3,
      content: 'Proceed to warehouse 4 for next pickup.'
    },
    {
      id: 4,
      status: MessageStatus.Pending,
      truckId: 4,
      content: 'Reminder: Deliver before 5 PM.'
    },
    {
      id: 5,
      status: MessageStatus.Read,
      truckId: 1,
      orderId: 'ORD-1003',
      content: 'Delivery completed. Good job!'
    },
    {
      id: 6,
      status: MessageStatus.Delivered,
      truckId: 5,
      content: 'Urgent: Check engine light reported.'
    },
    {
      id: 7,
      status: MessageStatus.Pending,
      truckId: 6,
      content: 'New order assigned. Check your dashboard.'
    },
    {
      id: 8,
      status: MessageStatus.Read,
      truckId: 2,
      orderId: 'ORD-1004',
      content: 'Please confirm fuel level before departure.'
    },
    {
      id: 9,
      status: MessageStatus.Delivered,
      truckId: 7,
      content: 'System maintenance scheduled for tonight.'
    },
    {
      id: 10,
      status: MessageStatus.Pending,
      truckId: 8,
      orderId: 'ORD-1005',
      content: 'Document upload required for customs clearance.'
    }
  ];

  export default messages