# E-Commerce Project - D0018E

A three-tier e-commerce application specializing in musical instruments. This project demonstrates a robust integration between a **React** frontend, a **FastAPI** backend, and a **MySQL** relational database.

---

## Technical Architecture

The system is divided into three distinct layers to ensure scalability and separation of concerns:

1.  **Frontend:** Built with **React** and **Tailwind CSS**. It functions as a Single Page Application (SPA) using a centralized **Service Layer** to handle all API communications.
2.  **Backend:** A RESTful API powered by **FastAPI**. It handles business logic, password hashing, and coordinates with the database.
3.  **Database:** A **MySQL** database ensuring data integrity through relational keys and ACID-compliant transactions.

---

## How to Run (locally)

1. ** Backend Setup **
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

2. ** Frontend Setup **
``` bash
cd frontend
npm install
npm run dev
```
