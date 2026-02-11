# QuizME - Online Quiz Application

A full-featured online quiz application built with React.js, Material UI, and Bootstrap.

## Features

- Student login and registration
- Voucher-based exam access
- Quiz taking with navigation (Previous/Next)
- Submit confirmation dialog
- Result display with score and pass/fail status
- Admin panel with dashboard
- Voucher management (CRUD)
- Exam and question management (CRUD)
- Result viewing and filtering

## Tech Stack

- React.js
- Material UI (MUI)
- Bootstrap 5
- React Router
- JSON-based mock database (localStorage)

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

```sh
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
npm run dev
```

The app will start on `http://localhost:8080`.

## Default Credentials

### Student
- Email: student@test.com
- Password: student123

### Admin
- Email: admin@test.com
- Password: admin123

## Folder Structure

```
src/
  components/
    Login/
    Register/
    StudentDashboard/
    Quiz/
    Result/
    Admin/
      AdminLogin/
      AdminDashboard/
      VoucherManager/
      QuestionManager/
      ResultManager/
  services/
    api.js
  data/
    users.json
    vouchers.json
    exams.json
    questions.json
    results.json
  App.jsx
  main.jsx
```

## License

This project is for educational purposes.
