# 📘 **README.md — Task Manager App**

```md
# 📝 Task Manager App

A modern and beautifully designed task management application built with **React**, **Tailwind CSS**, **Context API**, and **Hello-Pangea DnD** for drag-and-drop.  

Manage your tasks effortlessly with a premium UI, smooth animations, smart validations, and persistent storage.


## 🚀 Live Demo

👉 **Live URL:**  
https://limetray-gold.vercel.app

👉 **GitHub Repository:**  
https://github.com/Ashutosh5333/Limetray


## 🧩 Features

### ✅ Core Features
- Add new tasks  
- Edit tasks  
- Delete tasks  
- Status toggle (Pending ↔ Completed)  
- LocalStorage persistence  
- Form validation  
- Prevent duplicate task titles  

### 🎯 Advanced Features
- Drag & drop for:
  - Reordering tasks in **All**
  - Moving tasks between **Pending ↔ Completed**
- Mobile-friendly responsive UI  
- Animated buttons, cards, modals  
- Gradient theme with modern styling  
- Success & error toast notifications  
- Context-based global state (no Redux)  
- Custom UI components with clean design  


## 🧱 Tech Stack

| Technology | Purpose |
|-----------|---------|
| **React (Vite)** | Frontend framework |
| **Tailwind CSS** | Styling |
| **Context API** | State management |
| **Hello-Pangea DnD** | Drag & Drop |
| **Lucide Icons** | Icons |
| **LocalStorage** | Persistence |
| **Custom UI Components** | Reusable consistent design |



## 📁 Project Structure

```

src/
├─ components/
│   ├─ TaskItem.jsx
│   ├─ TaskBoard.jsx
│   ├─ Button.jsx
│   ├─ Toast.jsx
│   └─ ui/
│       ├─ Card.jsx
│       ├─ TextInput.jsx
│       ├─ TextArea.jsx
│       ├─ StatusSelector.jsx
│
├─ pages/
│   └─ TaskForm.jsx
│
├─ context/
│   └─ TaskProvider.jsx
│
├─ hooks/
│   └─ useLocalStorage.js
│
├─ App.jsx
└─ main.jsx

````

---

## 📦 Installation

### 1. Clone the repo

```sh
git clone https://github.com/Ashutosh5333/Limetray
cd Limetray
````

### 2. Install dependencies

```sh
npm install
```

### 3. Run the development server

```sh
npm run dev
```

### 4. Build for production

```sh
npm run build
```

---

## 🛠 How It Works

### 🔹 TaskProvider (Context API)

A global state system that manages:

* Adding tasks
* Editing tasks
* Deleting tasks
* Reordering tasks
* Maintaining LocalStorage sync

### 🔹 Drag & Drop (Hello-Pangea DnD)

A robust drag-and-drop system supporting:

* Reordering within a column
* Moving across columns
* Smooth transitions and animations

### 🔹 Form Validation + Duplicate Check

* Prevent duplicate titles (Create + Edit)
* Red/green toast notifications

## 👨‍💻 Author

**Ashutosh Lakshakar**
Software Engineer
Bangalore, India