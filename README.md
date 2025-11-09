# ♻️ Waste Management System

A **web-based Waste Management System** designed to help administrators efficiently track and manage waste collection activities.  
This system allows the **Admin** to assign waste collection tasks to collectors and monitor the progress of each task in real time.  

---

## 🏗️ Project Overview

The **Waste Management System** provides an online platform for effective waste tracking and management.  
It simplifies the manual process by allowing the **Admin** to manage collectors, assign tasks, and categorize waste types efficiently.  
Meanwhile, collectors can log in, view their assigned tasks, and update task statuses.

---

## 🚀 Key Features

### 👨‍💼 Admin Portal
- Login securely using credentials.
- Add and manage **waste collectors**.
- Categorize waste as **Plastic, Organic, Paper, Metal**, etc.
- Assign collection tasks to collectors.
- Update task status as **Pending** or **Completed**.
- Perform **CRUD operations** – Add, Edit, Delete collector or task details.

### 🚛 Collector Portal
- Login using personal credentials.
- View assigned collection tasks and details.
- Logout securely.

---

## 🧩 Tech Stack

| Category | Technology Used |
|-----------|----------------|
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL |
| **Styling** | CSS |
| **Authentication** | JSON Web Token (JWT) |
| **Server Environment** | Node.js with Express |

---

## 📁 Folder Structure

```
waste-management-system/
│
├── Front-End-Folder/ # Frontend (React)
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ └── App.js
│ └── package.json
│
├── Server-Side/ # Backend (Node.js + Express)
│ ├── Routes/
│ ├── Controllers/
│ ├── Models/
│ ├── config/
│ ├── index.js
│ └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/<your-username>/waste-management-system.git
cd waste-management-system
```

### 2️⃣ Setup Backend
```bash
cd Server-Side
npm install
```

- In Server-Side/Utils/db.js file change the Database details

```bash
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=wastemanagement
JWT_SECRET=your_secret_key
```

- Run the Backend:

```bash
npm start
```


### 3️⃣ Setup Frontend

```bash
cd Client-Side
npm install

```

- Run the Frontend:

```bash
npm run dev
```

- The React app will run at:
```bash
👉 http://localhost:5173
```

- The backend runs at:
```bash
👉 http://localhost:5000
```


## 🧮 Core Functionalities
|Feature | Description|
|--------|------------|
|Login System	| Admin & Collector authentication using JWT|
|Collector Management |	Add, edit, delete collector details|
|Waste Categories |	Plastic, Organic, Paper, Metal|
|Task Assignment	| Admin assigns waste collection tasks|
|Status Update |	Pending / Completed tracking|
|Profile Management | Collectors can view and update their profile|
_

## 💡 Highlights (For Resume / Portfolio)

- Built a full-stack CRUD-based web application using React, Node.js, and MySQL.

- Implemented role-based login system for Admin and Collector using JWT.

- Designed and managed relational data model for waste tracking using MySQL.

- Applied RESTful API architecture with modular backend structure.

- Ensured clean UI and responsive design using React components and CSS.

## 🧠 Future Enhancements

- Add real-time location tracking for collectors.

- Integrate SMS or email notifications for task updates.

- Provide analytics dashboard for waste category statistics.

- Implement file upload for collector identity proofs or receipts.

