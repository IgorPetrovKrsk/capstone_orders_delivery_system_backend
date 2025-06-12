# 🚛 Orders delivery backend

[FrondEnd GitHub](https://github.com/IgorPetrovKrsk/capstone_orders_delivery_system_frontend)

[Deployment link](https://transport-management-system-cca4.onrender.com)
---

## 📐 Data Model Overview

This system involves 4 main entities:

- **Users** — dispatchers or system users who send messages
- **Trucks** — receivers of messages, each assigned to a driver
- **Orders** — delivery tasks linked to trucks
- **Messages** — instructions or alerts linked to trucks and optionally orders

---

## 🗄️ Table Schemas

### 🧑 User

| Field   | Type     | Description                         |
|---------|----------|-------------------------------------|
| `id`    | number   | Unique user ID                      |
| `name`  | string   | Full name of the user               |
| `role`  | string   | 'dispatcher', 'admin', 'driver', etc.|

### 🚚 Truck

| Field          | Type     | Description                      |
|----------------|----------|----------------------------------|
| `id`           | number   | Unique truck ID                  |
| `licensePlate` | string   | License number                   |
| `model`        | string   | Truck model or type              |
| `userId`       | number   | Assigned driver (User ID)        |

### 📦 Order

| Field         | Type     | Description                     |
|---------------|----------|---------------------------------|
| `id`          | string   | Unique order ID                 |
| `description` | string   | Description of goods or delivery|
| `status`      | string   | e.g., 'pending', 'delivered'    |
| `truckId`     | number   | Truck assigned to this order    |

### 💬 Message

| Field      | Type             | Description                                |
|------------|------------------|--------------------------------------------|
| `id`       | number           | Unique message ID                          |
| `status`   | enum             | `Pending` \| `Delivered` \| `Read`         |
| `truckId`  | number           | Truck receiving the message                |
| `orderId`  | string (optional)| Related order ID, if applicable            |
| `content`  | string           | Text of the message                        |
| `senderId` | number (optional)| User ID of sender (e.g., dispatcher)       |

---

🚧 TODO
 Implement database schema and seed data

 Add RESTful API endpoints

 Add user authentication 

 Add message delivery logic (WebSockets)

 Frontend dashboard for dispatchers (optional)
