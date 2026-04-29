# 🎓 LIVE-ATTEND (High-Fidelity)

A next-generation, high-fidelity spatial attendance system. This project modernizes the traditional roll-call process by combining real-time dynamic QR code scanning with precise GPS-based geolocation verification, entirely wrapped in a premium, 3D-accelerated user interface.

## 🚀 Tech Stack

### Frontend (Client-Side)
* **Next.js 16** (App Router) & **React 19**
* **Tailwind CSS** for responsive, glass-morphism styling
* **Framer Motion** for cinematic animations and transitions
* **Spline 3D** (Isolated via shadow-DOM/iframe to bypass Next.js hydration issues)
* **jsPDF & autoTable** for on-the-fly PDF report generation

### Backend (Server-Side)
* **Node.js & Express.js** (REST API)
* **Prisma ORM** for type-safe database interactions
* **MongoDB** (NoSQL Database)
* **JSON Web Tokens (JWT)** for stateless, secure role-based authentication

## ✨ Key Features

### 👨‍🏫 For Professors (Command Center)
* **3D Auth Portal**: Secure, dark-academic themed login.
* **Dynamic QR Beacon**: Generates a self-refreshing (every 5 seconds) QR code that strictly expires to prevent students from sharing photos of the code to their friends.
* **Geolocation Pinning**: Automatically locks the attendance session to the Professor's current GPS coordinates.
* **Live Dashboard**: Watch the student count tick up in real-time as they scan in.
* **1-Click Export**: Export the finalized attendance sheet as an Excel CSV or a formatted PDF Report.

### 👨‍🎓 For Students (Terminal)
* **Secure Login**: Access the portal using individual credentials.
* **Optical Scanner**: Built-in camera integration to scan the Professor's QR beacon.
* **Spatial Verification**: The system checks the student's device GPS coordinates against the active session. If the student is outside the defined radius (e.g., 50 meters), attendance is denied.
* **Historical Logs**: View a complete history of past verified classes.

## 🛠️ Local Development

### 1. Backend Setup
```bash
cd backend
npm install
# Ensure your .env has DATABASE_URL (MongoDB) and JWT_SECRET
npm run dev
```

### 2. Frontend Setup
```bash
# Open a new terminal in the project root
npm install
npm run dev
```
Navigate to `http://localhost:3000` to view the gateway.
