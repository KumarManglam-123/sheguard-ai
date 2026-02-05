# 🛡️ SheGuard AI — Women Safety Web App

SheGuard AI is a **real-time women safety web application** that provides an emergency SOS system, location-based alerts, and AI-powered assistance to enhance personal security.

🔗 **Live Demo:** [https://sheguard-ai.vercel.app](https://sheguard-ai.vercel.app)
🔗 **Backend API:** [https://sheguard-ai-yk3b.onrender.com](https://sheguard-ai-yk3b.onrender.com)

---

## 🚀 Features

* 🔴 **One-click SOS trigger** with emergency alert
* 📍 **Live location capture** for safety monitoring
* 🔊 **Panic siren sound activation**
* 🌐 **Fully deployed system**

  * Frontend → Vercel
  * Backend → Render
  * Database → MongoDB Atlas
* 🤖 **AI-ready architecture** for future safety assistant integration

---

## 🏗️ Tech Stack

**Frontend**

* React.js (Vite)
* HTML, CSS, JavaScript

**Backend**

* FastAPI (Python)
* REST API integration

**Database**

* MongoDB Atlas

**Deployment**

* Vercel (Frontend)
* Render (Backend)

---

## 📂 Project Structure

```
sheguard-ai/
│
├── frontend/      # React frontend
├── backend/       # FastAPI backend
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend (.env)

```
VITE_API_BASE_URL=https://sheguard-ai-yk3b.onrender.com
```

### Backend (.env)

```
MONGO_URI=your_mongodb_connection_string
```

---

## ▶️ Run Locally

### 1️⃣ Clone repo

```
git clone https://github.com/KumarManglam-123/sheguard-ai.git
cd sheguard-ai
```

### 2️⃣ Start backend

```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 3️⃣ Start frontend

```
cd frontend
npm install
npm run dev
```

---

## 🎯 Future Improvements

* 📱 SMS alerts using Twilio
* 🗺️ Real-time location sharing to guardians
* 🎤 Voice-enabled AI safety assistant
* 📊 Safety analytics dashboard

---

## 👨‍💻 Author

**Kumar Manglam**
Final-year Engineering Student
Passionate about **AI, Full-Stack Development, and Real-World Safety Solutions**

---

## ⭐ Support

If you like this project, **give it a star ⭐ on GitHub** — it helps a lot!
