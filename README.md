# 🚛 Transport Management System backend

[FrondEnd GitHub](https://github.com/IgorPetrovKrsk/capstone_orders_delivery_system_frontend)

[Deployment link](https://transport-management-system-cca4.onrender.com)

# 📦 Transport Management System – Data Model

## 📐 Data Model Overview

This system involves **4 main entities**:

- **Users** — Users of the Transport Management System, divided into 3 roles: **Admin**, **Dispatcher**, and **Driver**  
- **Trucks** — Main attributes of trucks and message receivers; each truck is assigned to a driver  
- **Orders** — Delivery tasks linked to trucks  
- **Messages** — Messages linked to trucks and optionally to orders (currently not used)  

---

## 🗄️ Table Schemas

### 🧑 User

| Field      | Type     | Description                                  |
|------------|----------|----------------------------------------------|
| `_id`      | ObjectId | Unique user ID                               |
| `username` | string   | Username of the user                         |
| `role`     | string   | `'dispatcher'`, `'admin'`, `'driver'`, etc.  |
| `isActive` | boolean  | Flag indicating if the user is active        |
| `truck`    | truckId  | ID of the assigned truck                     |
| `password` | string   | Encoded user password                        |
| `imgUrl`   | string   | URL to user photo stored in AWS S3 bucket    |

---

### 🚚 Truck

| Field          | Type     | Description                                         |
|----------------|----------|-----------------------------------------------------|
| `_id`          | ObjectId | Unique truck ID                                     |
| `licensePlate` | string   | Truck's license plate number                        |
| `capacity`     | number   | Maximum cargo capacity                              |
| `status`       | string   | `'available'`, `'en route'`, `'idle'`, `'repairs'` |
| `imgUrl`       | string   | URL to truck photo stored in AWS S3 bucket         |

---

### 📦 Order

| Field                            | Type     | Description                                                               |
|----------------------------------|----------|---------------------------------------------------------------------------|
| `_id`                            | ObjectId | Unique order ID                                                           |
| `origin`                         | string   | Name or address of the origin location                                    |
| `originCoordinates`              | object   | GPS coordinates of the origin                                             |
| `originCoordinates.latitude`     | number   | Latitude of the origin location                                           |
| `originCoordinates.longitude`    | number   | Longitude of the origin location                                          |
| `destination`                    | string   | Name or address of the delivery destination                               |
| `destinationCoordinates`         | object   | GPS coordinates of the destination                                        |
| `destinationCoordinates.latitude`| number   | Latitude of the destination location                                      |
| `destinationCoordinates.longitude`| number  | Longitude of the destination location                                     |
| `status`                         | string   | `'pending'`, `'assigned'`, `'delivered'`, `'returned'`                    |
| `weight`                         | number   | Weight of the cargo (0–10,000 kg)                                         |
| `truck`                          | ObjectId | Reference to the assigned truck (`Truck` collection)                      |

---

### 💬 Message

| Field      | Type             | Description                                |
|------------|------------------|--------------------------------------------|
| `_id`      | ObjectId         | Unique message ID                          |
| `status`   | enum             | `'Pending'` \| `'Delivered'` \| `'Read'`   |
| `orderId`  | string (optional)| Related order ID, if applicable            |
| `content`  | string           | Text content of the message                |
| `senderId` | number (optional)| User ID of the sender (e.g., dispatcher)   |

---

