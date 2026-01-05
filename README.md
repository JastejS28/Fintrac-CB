# 💰 FinTrac - Personal Finance Tracker

A modern, full-stack personal finance management application built with the MERN stack, financial insights, interactive 3D visualizations, and comprehensive expense tracking.

## 📋 Table of Contents

- [Features](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [Tech Stack](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [Project Structure](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [Prerequisites](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [Installation](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [Environment Variables](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [Running the Application](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [API Documentation](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [Data Visualization](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [Contributing](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)
- [License](https://www.notion.so/Internship-Apply-27a5d804654080f48bdaea834678b35f?pvs=21)

## ✨ Features

### Core Functionality

- **Transaction Management**
    - Add, view, and track income & expenses
    - Categorize transactions with custom categories
    - Date-based transaction filtering
    - CSV export for financial reports
- **Budget Planning**
    - Set monthly spending limits per category
    - Real-time budget tracking
    - Visual progress indicators
    - Budget vs actual spending analysis
    - Over-budget warnings
- **Savings Goals**
    - Create multiple savings goals
    - Track progress towards targets
    - Add funds incrementally
    - Completion tracking and achievements
    - Goal archiving
- **Financial Reporting**
    - Monthly income/expense summary
    - Category-wise spending breakdown
    - Interactive 3D pie charts
    - CSV export functionality
    - Date range filtering
- **Interactive Visualizations**
    - 3D doughnut charts using Three.js
    - Animated hover effects with React Spring
    - Real-time data updates
    - Color-coded spending categories
- **User Experience**
    - Modern glassmorphism UI design
    - Dark theme with gradient accents
    - Responsive mobile-first design
    - Smooth animations and transitions
    - Money rain animation on welcome page

## 🛠 Tech Stack

### Frontend

- **React 19.1.0** - UI library
- **React Router DOM 7.8.1** - Client-side routing
- **Redux Toolkit 2.8.2** - State management
- **Axios 1.11.0** - HTTP client
- **Three.js 0.179.1** - 3D graphics
- **@react-three/fiber 9.3.0** - React renderer for Three.js
- **@react-three/drei 10.7.3** - Three.js helpers
- **React Spring 10.0.1** - Animation library
- **Matter.js 0.20.0** - Physics engine
- **Lottie React 2.4.1** - Animation player
- **React Markdown 10.1.0** - Markdown renderer

### Backend

- **Node.js** - Runtime environment
- **Express 5.1.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8.17.0** - ODM for MongoDB

### Authentication & Security

- **JWT (jsonwebtoken 9.0.2)** - Token-based authentication
- **bcryptjs 3.0.2** - Password hashing
- **Cookie Parser 1.4.7** - Cookie management

## 📁 Project Structure

```
fintrac/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── budget.controller.js
│   │   │   ├── goal.controller.js
│   │   │   ├── report.controller.js
│   │   │   ├── transaction.controller.js
│   │   │   └── user.controller.js
│   │   ├── middlewares/
│   │   │   └── auth.middleware.js
│   │   ├── models/
│   │   │   ├── budget.model.js
│   │   │   ├── goal.model.js
│   │   │   ├── transaction.model.js
│   │   │   └── user.model.js
│   │   ├── routes/
│   │   │   ├── budget.routes.js
│   │   │   ├── goal.routes.js
│   │   │   ├── report.routes.js
│   │   │   ├── transaction.routes.js
│   │   │   └── user.routes.js
│   │   ├── utils/
│   │   │   ├── ErrorHandler.js
│   │   │   └── ErrorWrapper.js
│   │   └── index.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   │   └── money.png
│   │   ├── components/
│   │   │   ├── BudgetForm.jsx
│   │   │   ├── BudgetList.jsx
│   │   │   ├── GoalForm.jsx
│   │   │   ├── GoalList.jsx
│   │   │   ├── MoneyRain.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── SpendingPieChart.jsx
│   │   │   └── TransactionForm.jsx
│   │   ├── pages/
│   │   │   ├── BudgetsPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── GoalsPage.jsx
│   │   │   ├── HomePage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── TransactionsPage.jsx
│   │   │   ├── WelcomePage.jsx
│   │   │   └── WelcomePage.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   ├── authActions.js
│   │   │   ├── authReducer.js
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── .env
└── README.md

```

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn** package manager

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <https://github.com/yourusername/fintrac.git>
cd fintrac

```

### 2. Backend Setup

```bash
cd backend
npm install

```

### 3. Frontend Setup

```bash
cd frontend
npm install

```

## 🔧 Environment Variables

### Backend (.env)

Create a `.env` file in the `backend` directory:

```
# Server Configuration
PORT=4000

# Database Configuration
DB_PATH=mongodb://127.0.0.1:27017
DB_NAME=finance_CB

# CORS Configuration
CORS_ORIGINS=http://localhost:5173

# JWT Secret
JWT_SECRET=your_jwt_secret_key_here_make_it_long_and_secure

```

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```
# API Base URL (optional, defaults to localhost:4000)
VITE_API_URL=http://localhost:4000/api/v1

```

## 🏃‍♂️ Running the Application

### Start MongoDB

```bash
# If using local MongoDB
mongod

# Or if using MongoDB service (Linux)
sudo systemctl start mongod

# Or if using MongoDB service (macOS)
brew services start mongodb-community

```

### Start Backend Server

```bash
cd backend
npm start

```

The backend server will start on `http://localhost:4000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev

```

The frontend will start on `http://localhost:5173`

## 📚 API Documentation

### Base URL

```
<http://localhost:4000/api/v1>

```

### Authentication Endpoints

### POST /user/register

Register a new user

```jsx
Request Body:
{
  username: string,
  email: string,
  password: string (min 6 characters)
}

Response:
{
  success: true,
  message: "User registered successfully",
  token: string,
  user: {
    id: string,
    username: string,
    email: string
  }
}

```

### POST /user/login

Login user

```jsx
Request Body:
{
  email: string,
  password: string
}

Response:
{
  success: true,
  message: "User LoggedIn Successfully",
  token: string,
  user: {
    id: string,
    username: string,
    email: string
  }
}

```

### GET /user/profile

Get user profile (Protected)

```jsx
Headers:
Authorization: Bearer {token}

Response:
{
  success: true,
  user: {
    _id: string,
    username: string,
    email: string,
    createdAt: date
  }
}

```

### Transaction Endpoints

All transaction endpoints require authentication via Bearer token.

### POST /transaction

Add new transaction

```jsx
Headers:
Authorization: Bearer {token}

Request Body:
{
  type: "income" | "expense",
  category: string,
  amount: number,
  date: date,
  description: string
}

Response:
{
  success: true,
  message: "Transaction created successfully",
  data: Transaction
}

```

### GET /transaction

Get all user transactions

```jsx
Headers:
Authorization: Bearer {token}

Response:
{
  success: true,
  data: [Transaction]
}

```

### PUT /transaction/:id

Update transaction

```jsx
Headers:
Authorization: Bearer {token}

Request Body:
{
  type?: "income" | "expense",
  category?: string,
  amount?: number,
  date?: date,
  description?: string
}

Response:
{
  success: true,
  message: "Transaction updated successfully",
  data: Transaction
}

```

### DELETE /transaction/:id

Delete transaction

```jsx
Headers:
Authorization: Bearer {token}

Response:
{
  success: true,
  message: "Transaction deleted successfully"
}

```

### Budget Endpoints

### POST /budgets

Set or update budget

```jsx
Headers:
Authorization: Bearer {token}

Request Body:
{
  category: string,
  limit: number
}

Response:
{
  success: true,
  message: "Budget set/updated successfully",
  data: Budget
}

```

### GET /budgets

Get all user budgets

```jsx
Headers:
Authorization: Bearer {token}

Response:
{
  success: true,
  data: [Budget]
}

```

### Goal Endpoints

### POST /goal/addGoal

Create savings goal

```jsx
Headers:
Authorization: Bearer {token}

Request Body:
{
  name: string,
  targetAmount: number,
  currentAmount?: number (default: 0),
  targetDate?: date
}

Response:
{
  success: true,
  data: Goal
}

```

### GET /goal/getGoals

Get all user goals

```jsx
Headers:
Authorization: Bearer {token}

Response:
{
  success: true,
  data: [Goal]
}

```

### PUT /goal/updateGoal/:id

Update goal progress

```jsx
Headers:
Authorization: Bearer {token}

Request Body:
{
  currentAmount?: number,
  name?: string,
  targetAmount?: number,
  targetDate?: date
}

Response:
{
  success: true,
  data: Goal
}

```

### DELETE /goal/deleteGoal/:id

Delete goal

```jsx
Headers:
Authorization: Bearer {token}

Response:
{
  success: true,
  message: "Goal deleted successfully"
}

```

### Report Endpoints

### GET /report/monthly-summary

Get current month financial summary

```jsx
Headers:
Authorization: Bearer {token}

Response:
{
  success: true,
  data: {
    income: number,
    expense: number,
    savings: number
  }
}

```

### GET /report/category-breakdown

Get expense breakdown by category

```jsx
Headers:
Authorization: Bearer {token}

Query Parameters (optional):
- startDate: date (default: current month start)
- endDate: date (default: next month start)

Response:
{
  success: true,
  data: [
    {
      _id: "category_name",
      totalAmount: number
    }
  ]
}

```

### POST /report/export

Export transactions as CSV

```jsx
Headers:
Authorization: Bearer {token}

Response:
CSV file download with columns:
- Date
- Type
- Category
- Amount
- Description

```

## 📊 Data Visualization

### 3D Spending Chart

The application features an interactive 3D doughnut chart built with:

- **Three.js**: For 3D rendering
- **React Three Fiber**: React renderer for Three.js
- **React Spring**: Smooth animations
- **Drei**: Three.js helpers

Features:

- Interactive hover effects
- Real-time data updates
- Color-coded categories
- Tooltips with amounts
- Orbital controls for rotation

### Money Rain Animation

A physics-based animation on the welcome page using:

- **Matter.js**: 2D physics engine
- Falling money bills with realistic physics
- Random rotation and positioning
- Optimized performance

## 🎨 UI/UX Features

### Design System

- **Color Palette**: Purple/pink gradients with dark theme
- **Typography**: Inter font family
- **Spacing**: Consistent spacing scale
- **Components**: Reusable card-based layouts

### Animations

- Smooth page transitions
- Hover effects on interactive elements
- Loading states with animations
- Progress bars with gradient fills

### Responsive Design

- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px, 1200px
- Touch-friendly interfaces
- Optimized for all screen sizes

## 🔐 Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Protected Routes**: Middleware verification
- **HTTP-Only Cookies**: Optional cookie storage
- **Input Validation**: Server-side validation
- **CORS Configuration**: Restricted origins
- **Error Handling**: Secure error messages

## 📱 Features in Detail

### Dashboard

- Quick overview of financial health
- Monthly income, expense, and savings summary
- Recent transactions list
- Quick navigation to all features
- Data export functionality

### Transactions Page

- Add income and expenses
- Transaction filtering (all/income/expense)
- Sorting options (date/amount/category)
- Full transaction history
- Edit and delete capabilities
- CSV export

### Budgets Page

- Set category-wise budgets
- Visual progress bars
- Over-budget warnings
- Total budget overview
- Real-time spending tracking
- Budget utilization percentage

### Goals Page

- Create savings goals
- Track progress with visual indicators
- Add money incrementally
- Goal completion tracking
- Achievement celebrations
- Goal archiving

## 🚀 Performance Optimizations

- **React.memo**: Prevents unnecessary re-renders
- **useCallback**: Memoizes callback functions
- **Lazy Loading**: Code splitting for routes
- **Debouncing**: Input field optimizations
- **Pagination**: Large data set handling
- **Caching**: API response caching

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test

```

## 📈 Future Enhancements

- [ ]  Multi-currency support
- [ ]  Recurring transactions
- [ ]  Bank account integration
- [ ]  Bill reminders
- [ ]  Investment tracking
- [ ]  Tax calculation
- [ ]  Family account sharing
- [ ]  Mobile app (React Native)
- [ ]  Email notifications
- [ ]  Advanced AI insights

## 📝 License

This project is licensed under the ISC License.
