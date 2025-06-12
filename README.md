# 🚛 Transport Management System backend

[FrondEnd GitHub](https://github.com/IgorPetrovKrsk/capstone_orders_delivery_system_frontend)

[Deployment link](https://transport-management-system-cca4.onrender.com)

## 📘 Overview

This is the backend service for the Transport Management System. It handles user authentication, order management, truck assignments, and real-time messaging via WebSockets.

---

## 🚀 Features

- User roles: Admin, Dispatcher, Driver
- CRUD operations for Orders and Trucks
- Authentication with JWT
- WebSocket messaging for real-time driver-dispatcher communication
- MongoDB integration using Mongoose

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- WebSocket
- TypeScript
- AWS S3 Bucket

---

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

##📫 API Endpoints
Base URL: /api/v1/

🚚 Trucks
| Method | Endpoint            | Auth Required | Roles Allowed     | Description          |
| ------ | ------------------- | ------------- | ----------------- | -------------------- |
| GET    | `/trucks`           | ✅             | All Authenticated | Get all trucks       |
| GET    | `/trucks/available` | ✅             | Dispatcher only   | Get available trucks |
| POST   | `/trucks`           | ✅             | Dispatcher only   | Create a new truck   |
| PUT    | `/trucks/:truckId`  | ✅             | Dispatcher only   | Update a truck by ID |
| DELETE | `/trucks/:truckId`  | ✅             | Dispatcher only   | Delete a truck by ID |

📦 Orders
| Method | Endpoint                            | Auth Required | Roles Allowed     | Description                             |
| ------ | ----------------------------------- | ------------- | ----------------- | --------------------------------------- |
| GET    | `/orders`                           | ✅             | Dispatcher only   | Get all orders                          |
| GET    | `/orders/undeliveredOrdersByUserId` | ✅             | All Authenticated | Get undelivered orders for current user |
| GET    | `/orders/pendingassignedorders`     | ✅             | Dispatcher only   | Get all pending and assigned orders     |
| POST   | `/orders`                           | ✅             | Dispatcher only   | Create a new order                      |
| PUT    | `/orders/return/:orderId`           | ✅             | All Authenticated | Mark order as returned                  |
| PUT    | `/orders/deliver/:orderId`          | ✅             | All Authenticated | Mark order as delivered                 |
| PUT    | `/orders/:orderId`                  | ✅             | Dispatcher only   | Update an order by ID                   |
| DELETE | `/orders/:orderId`                  | ✅             | Dispatcher only   | Delete an order by ID                   |

👤 Users
| Method | Endpoint         | Auth Required | Roles Allowed     | Description                  |
| ------ | ---------------- | ------------- | ----------------- | ---------------------------- |
| POST   | `/users/login`   | ❌             | Public            | User login, returns token    |
| POST   | `/users`         | ✅             | Admin only        | Create a new user            |
| GET    | `/users`         | ✅             | Admin only        | Get all users                |
| GET    | `/users/user`    | ✅             | All Authenticated | Get currently logged-in user |
| PUT    | `/users/:userId` | ✅             | Admin only        | Update a user by ID          |
| DELETE | `/users/:userId` | ✅             | Admin only        | Delete a user by ID          |

☁️ AWS S3 Upload URL
| Method | Endpoint  | Auth Required | Roles Allowed     | Description                             |
| ------ | --------- | ------------- | ----------------- | --------------------------------------- |
| GET    | `/s3-url` | ✅             | All Authenticated | Get a pre-signed S3 URL to upload image |

---

## 🌐 WebSocket Events

- `connect`: Establish socket connection
- `message`: Send/receive messages to/from trucks
- `order:update`: Notify clients about order updates
  
---

## 🛠 Environment Variables

| Name         | Description                  |
|--------------|------------------------------|
| `PORT`       | Port number the server runs on |
| `MONGODB_URI`| MongoDB connection string     |
| `JWT_SECRET` | Secret key for token signing  |

--- 
## 📄 License

MIT License © 2025 Igor Petrov

---


