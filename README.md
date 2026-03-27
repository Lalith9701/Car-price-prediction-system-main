# HUB Cars 🚙 - Smart Car Marketplace

An enterprise-grade, full-stack web application designed for browsing, buying, and selling new and used cars. HUB Cars combines a sleek, premium user interface with a powerful Machine Learning price prediction engine to deliver a seamless automotive marketplace experience.

---

## ✨ Key Features

*   **Intelligent ML Price Prediction**: Sell your car with confidence. Our Python-based ML engine instantly calculates fair, good, excellent, and dealership prices based on make, model, year, kilometers driven, and condition.
*   **Smart Auto-Expiring Listings**: When selling a used car, sellers can choose a precise listing duration (10 days or 20 days). Expired listings are automatically hidden to keep the marketplace fresh.
*   **Dynamic Showroom Locator**: Browse new cars and instantly locate authorised showrooms nearby with a single click, thanks to our intelligent Google Maps integration.
*   **Secure Authentication via JWT & bcrypt**: Fully protected and secure user registration and login flows. All users must be authenticated to access the marketplace.
*   **Premium Visual Aesthetic**: A fully modernized, responsive React frontend sporting a professional dark corporate design system.
*   **Robust File Uploads**: Integrated image uploads using Multer.

---

## 🛠️ Technology Stack

*   **Frontend Context**: React.js, Vite, React Router DOM, CSS3
*   **Backend API**: Node.js, Express.js, Multer (Local File System Storage), JWT, bcrypt
*   **Machine Learning Microservice**: Python 3, Flask, Scikit-learn, Pandas

---

## 📁 System Architecture

```text
Car-price-prediction-system-main/
├── backend/           # Node.js API (server.js, JSON datastores, auth routes)
├── frontend/          # React.js UI (App.jsx, Vite configs, components)
└── ml-service/        # Python Flask App (app.py, predict endpoints, scikit models)
```

---

## 🚀 Quick Start Guide

### Prerequisites
*   Node.js (v18+)
*   Python (3.8+)
*   Git

To run the complete system locally, you will need to open **3 separate terminal windows**.

### 1. Start the Machine Learning Engine (Terminal 1)
Serves the price prediction capabilities via Flask.
```bash
cd ml-service
python -m venv venv
# On Windows use: .\venv\Scripts\activate
# On Mac/Linux use: source venv/bin/activate
pip install flask pandas scikit-learn flask-cors numpy joblib
python app.py
```
> The ML engine will start running on **http://localhost:8000**

### 2. Start the Backend API Server (Terminal 2)
Serves user authentication, data management, and file uploads.
```bash
cd backend
npm install
npm start
```
> The API server will start running on **http://localhost:5050**

### 3. Start the Frontend Application (Terminal 3)
Serves the primary highly-responsive React UI.
```bash
cd frontend
npm install
npm run dev
```
> The UI will become accessible at **http://localhost:5173**

---

## 🔒 Environment Variables

No heavy database configuration is strictly required for local environments (the lightweight backend utilizes local JSON datastores for portability), but you can optionally configure paths.

If needed, create a `.env` in the `backend/`:
```env
JWT_SECRET=super_secret_jwt_key_hubcars
ML_ENDPOINT=http://localhost:8000/predict
PORT=5050
```

---

## 🤝 Contribution Guidelines
1. Fork the repository.
2. Create a targeted feature branch (`git checkout -b feature/ui-updates`).
3. Commit your changes (`git commit -m 'Added dynamic showroom locator'`).
4. Push to the branch and open a Pull Request.

---

### **License**
This project is licensed under the MIT License. 
⭐ **Star this repository if you find it helpful!**
