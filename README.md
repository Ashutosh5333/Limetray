# 🎨 Task Manager Frontend (React + Tailwind + Axios)

This is the frontend of the **Task Management Application** built with React, Tailwind CSS, Axios, and reusable UI components.


## 🖥️ **Features**

* User Signup & Login
* JWT-based Authentication
* Light/Dark Theme
* Responsive UI (Mobile → Desktop)
* Add / Edit Tasks
* Admin-only Delete
* Pagination
* Beautiful modern UI (glass effect, chips, icons)
* Form validation & toast notifications
* Optimized performance & instant render UX
* Component-based architecture


## 🧰 **Tech Stack**

* React.js (Vite or CRA)
* React Router
* Tailwind CSS
* react-icons
* Axios
* Custom reusable UI components


## 📁 **Project Structure**

```
frontend/
│── src/
│   ├── api/
│   ├── components/
│   │   ├── task/
│   ├── contexts/
│   ├── pages/
│   ├── hooks/
│   ├── App.jsx
│── public/
│── package.json
│── tailwind.config.js
│── README.md
```



## ⚙️ Installation

### 1️⃣ Install dependencies

```bash
cd frontend
npm install
```

### 2️⃣ Add `.env` file

```
VITE_API_BASE_URL=[https://your-backend-url.com/](https://ciphrixback.onrender.com)api
```

### 3️⃣ Start development server

```bash
npm run dev
```
Open:

```
http://localhost:5173
```

## 🔗 API Integration

All backend calls use Axios instance:

```js
axios.get("/tasks");
axios.post("/auth/signin");
axios.put(`/tasks/${id}`);
```

The Axios base URL is configured in `api/axios.js`.


## 🎨 UI Components Included

* Input (with icons + floating label)
* Button (with loader)
* Toast notification
* Skeleton loader
* TaskTitleInput
* TaskDescriptionInput
* TaskStatusSelector
* TaskFormActions
* Dashboard cards
* Pagination UI

## 📱 Responsive UI

Fully responsive on:

* Mobile
* Tablets
* Desktop

Made with Tailwind’s responsive utilities.


## 🔐 Authentication Flow

1. User logs in → receives JWT
2. Token saved in context
3. Protected routes redirect if unauthenticated
4. Delete button shown **only for admin**



## 🛠️ Build for Production

```bash
npm run build
```

Build output inside:

```
dist/
```

## 🌟 Screens Included

| Page             | Description            |
| ---------------- | ---------------------- |
| **Sign In**      | Login with validation  |
| **Sign Up**      | New user registration  |
| **Dashboard**    | Task list + Pagination |
| **Add Task**     | Form with validation   |
| **Edit Task**    | Auto-fill + Update     |
| **Admin Delete** | Only for admin users   |
