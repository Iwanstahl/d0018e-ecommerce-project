# E-Commerce Project - D0018E

A three-tier e-commerce application specializing in musical instruments. This project demonstrates a robust integration between a **React** frontend, a **FastAPI** backend, and a **MySQL** relational database.

* **Institution:** Luleå University of Technology (LTU)
* **Course:** D0018E 
* **Project:** E-Commerce Platform
* **Academic Year:** 2026

---

## Technical Architecture

The system is divided into three distinct layers to ensure scalability and separation of concerns:

1.  **Frontend:** Built with **React** and **Tailwind CSS**. It functions as a Single Page Application (SPA) using a centralized **Service Layer** to handle all API communications.
2.  **Backend:** A RESTful API powered by **FastAPI**. It handles business logic, password hashing, and coordinates with the database.
3.  **Database:** A **MySQL** database ensuring data integrity through relational keys and ACID-compliant transactions.

---

## How to Run (locally)

1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

2. Frontend Setup
```bash
cd frontend
npm install    
npm run dev
```

### Frontend
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

### Database & Deployment
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Uvicorn](https://img.shields.io/badge/uvicorn-499848?style=for-the-badge&logo=gunicorn&logoColor=white)

