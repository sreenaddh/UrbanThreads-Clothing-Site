# 🛍️ UrbanThreads

**UrbanThreads** is a modern e-commerce platform for clothing, built using **React.js** (frontend) and **Express.js** (backend). It provides a seamless shopping experience with user authentication, product listings, a shopping cart, and an order checkout system.

---
## 🌟 Live Website  
🔗 **Visit here**: [Frontend Only](urbanthreadss.vercel.app)

## 🚀 Features

### Frontend (React.js)
- ✅ User Authentication (Sign Up / Sign In)  
- ✅ Product Listing Page  
- ✅ Product Detail Page  
- ✅ Shopping Cart  
- ✅ Checkout Process  
- ✅ Responsive UI  

### Backend (Express.js)
- ✅ Secure User Authentication with JWT  
- ✅ Product and Cart Management (MongoDB)  
- ✅ Order Handling and API Routing  
- ✅ CORS and Middleware Configuration  
- ✅ Encrypted Passwords with bcrypt.js  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- React Slick (for carousels)
- Material UI / CSS

### Backend
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js for Password Hashing
- dotenv for Environment Variables
- CORS

---

## 🏗️ Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/sreenaddh/UrbanThreads-Clothing-Site.git
cd urbanthreads 
```

### 2️⃣ Install Dependencies
📌 Backend
```sh
cd backend
npm install
```

📌 Frontend
```sh
cd frontend
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the backend directory and add:

```ini
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Development Server
🖥️ Run Backend
```sh
cd backend
npm start
```

🌐 Run Frontend
```sh
cd frontend
npm start
```

Your **UrbanThreads** store should now be running locally! 🎉

---

## 📌 API Endpoints

### 🔑 Authentication
* `POST /signup` → User Registration
* `POST /signin` → User Login

### 🛍️ Products
* `GET /api/products` → Get All Products
* `GET /api/products/:productName` → Get a Single Product by Name

### 🛒 Cart Management
* `GET /api/cart` → Fetch Cart Items
* `POST /api/cart` → Add Item to Cart
* `DELETE /api/cart/:id` → Remove Item from Cart

### 📦 Orders
* `POST /api/orders` → Place an Order
