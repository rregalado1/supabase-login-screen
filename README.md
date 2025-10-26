# 🔐 Supabase Login Screen

A modern and responsive **Login Screen** built with **React** and **Supabase Authentication**.

This project allows users to **sign in, reset their password**, and securely manage sessions using Supabase as the backend.

---

## 🚀 Features

- 🔑 User login with email and password  
- 🔁 Password recovery flow  
- 🧠 Supabase authentication integration  
- 📱 Responsive and minimalist design  
- ⚡ Fast setup and local development  

---

## 🧰 Tech Stack

- **React** (Create React App)  
- **Supabase** (Authentication API)  
- **JavaScript / JSX**  
- **CSS** for styling  

---

## ⚙️ Setup

Clone the repository:

```bash
git clone https://github.com/rregalado1/supabase-login-screen.git
cd supabase-login-screen
npm install
Create a .env file in the root directory and add your Supabase credentials:

env
Copiar código
REACT_APP_SUPABASE_URL=your-supabase-url
REACT_APP_SUPABASE_ANON_KEY=your-anon-key
Start the app in development mode:

bash
Copiar código
npm start
Open http://localhost:3000 to view it in your browser.

🖼️ Preview
(Add a screenshot or GIF of your login screen here)
Example:

markdown
Copiar código
![App Screenshot](./preview.png)
📁 Project Structure
pgsql
Copiar código
supabase-login-screen/
├── src/
│   ├── components/
│   ├── supabaseClient.js
│   ├── App.js
│   ├── index.js
│   └── ResetPassword.js
├── public/
│   ├── index.html
│   └── favicon.ico
├── .gitignore
├── package.json
└── README.md
🧠 Learnings
This project helped me practice:

Setting up authentication flows with Supabase

Managing environment variables in React

Using React Hooks for state and form handling
