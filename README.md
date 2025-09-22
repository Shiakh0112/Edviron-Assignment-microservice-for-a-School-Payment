# 📚 School Payments & Dashboard Application
# deploye :- https://edviron-assignment-microservice-for-beta.vercel.app/

A **MERN-based School Payment & Dashboard Application** with **secure JWT authentication**, **Payment Gateway Integration**, **Webhook support**, and a **modern React frontend**.  
This project is divided into **two parts**:  

- **Backend (Node.js + Express + MongoDB)** → Running on **http://localhost:5000**  
- **Frontend (React + Vite + TailwindCSS)** → Running on **http://localhost:3000**  

---

## 🚀 Features

### 🔒 Backend (Node.js, Express, MongoDB Atlas)
- ✅ JWT Authentication (Login & Register)  
- ✅ Order Management & Order Status Schemas  
- ✅ Payment Gateway Integration (`/create-payment`)  
- ✅ Webhook API (`/webhook`) → Auto updates transaction status  
- ✅ Transactions API with Aggregation & Pagination  
- ✅ Secure environment variable management using `.env`  
- ✅ Error handling, validation, and logging  

### 💻 Frontend (React + Vite + TailwindCSS)
- ✅ Dashboard with **paginated, searchable, and filterable transactions list**  
- ✅ Transactions by School (dropdown based filtering)  
- ✅ Transaction Status Checker (search by `custom_order_id`)  
- ✅ Sorting, filtering, and persistence via URL parameters  
- ✅ Dark Mode toggle 🌙  
- ✅ Responsive UI styled with **Tailwind CSS**  

---

## 🏗️ Project Structure

```
school-payments-app/
│
├── backend/                 # Backend Service
│   ├── config/              # DB connection
│   ├── controllers/         # Auth, Orders, Transactions, Webhooks
│   ├── models/              # Mongoose Schemas
│   ├── middlewares/         # JWT Auth
│   ├── routes/              # API Routes
│   ├── server.js            # Main entry point
│   └── .env                 # Env variables
│
├── frontend/                # React Frontend
│   ├── src/
│   │   ├── components/      # Navbar, Sidebar, Table, Cards
│   │   ├── pages/           # Dashboard, Transactions, Status
│   │   ├── App.jsx          # Routes
│   │   └── main.jsx         # React Entry
│   └── tailwind.config.js   # Tailwind setup
```

---

## ⚙️ Installation & Setup

### 🔹 1. Clone Repository
```bash
git clone https://github.com/Shiakh0112/Edviron-Assignment-microservice-for-a-School-Payment/tree/main
cd school-payments-app
```

### 🔹 2. Setup Backend
```bash
cd backend
npm install
```

#### Create `.env` file inside `backend/`
```env
PORT=5000
MONGO_URI=your-mongodb-atlas-uri
JWT_SECRET=your-jwt-secret
PG_KEY=edvtest01
PAYMENT_API_KEY=eyJhbGciOiJIUzI1NiIs...
SCHOOL_ID=65b0e6293e9f76a9694d84b4
```

#### Run Backend
```bash
npm run dev
```
Backend runs on 👉 **http://localhost:5000**

---

### 🔹 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on 👉 **http://localhost:3000**

---

## 🔑 API Endpoints (Backend)

### 1. Authentication
- `POST /api/auth/register` → Register user  
- `POST /api/auth/login` → Login & get JWT  

### 2. Payments
- `POST /api/payments/create-payment`  
  → Creates collect request & redirects to gateway  

### 3. Webhook
- `POST /api/webhook`  
  → Updates transaction status in DB  

### 4. Transactions
- `GET /api/transactions`  
  → Fetch all transactions (pagination + sorting)  
- `GET /api/transactions/school/:schoolId`  
  → Fetch by school  
- `GET /api/transaction-status/:custom_order_id`  
  → Check transaction status  

---

## 🖼️ Frontend Pages

1. **Dashboard Overview**  
   - Paginated & searchable table of transactions  
   - Filter by school, status, and date  
   - Sort columns  
   - Dark/Light mode  

2. **Transactions by School**  
   - Dropdown to select school  
   - View all transactions  
