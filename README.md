# FreelanceHub — Smart Freelancing Platform

Full-stack MERN project with your original frontend (index.html, styles.css, app.js)
connected to a complete Express + MongoDB backend.

## Folder Structure

```
freelancehub/
├── frontend/               Your original frontend (no changes)
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── backend/                Full Node.js + Express backend
│   ├── server.js           Entry point — start here
│   ├── .env.example        Copy to .env and fill in values
│   ├── package.json
│   ├── config/
│   │   └── db.js           MongoDB connection
│   ├── models/             12 Mongoose models
│   │   ├── User.js
│   │   ├── FreelancerProfile.js
│   │   ├── EmployerProfile.js
│   │   ├── Project.js
│   │   ├── Gig.js
│   │   ├── Application.js
│   │   ├── Contract.js
│   │   ├── Payment.js
│   │   ├── Message.js
│   │   ├── Review.js
│   │   ├── Notification.js
│   │   └── Dispute.js
│   ├── controllers/        Business logic (12 files)
│   ├── routes/             REST API routes (12 files)
│   ├── middleware/
│   │   ├── auth.js         JWT authentication
│   │   └── error.js        Error handler
│   ├── services/
│   │   └── matching.js     AI job matching algorithm
│   └── utils/
│       ├── email.js        Nodemailer email helpers
│       └── notifications.js Real-time notifications
└── package.json

```

## API Endpoints

| Route               | Description              |
|---------------------|--------------------------|
| POST /api/auth/register      | Register user     |
| POST /api/auth/login         | Login             |
| GET  /api/auth/me            | Get current user  |
| GET  /api/projects           | Browse jobs       |
| POST /api/projects           | Post a job        |
| GET  /api/gigs               | Browse gigs       |
| POST /api/gigs               | Create a gig      |
| POST /api/applications/project/:id | Apply to job |
| GET  /api/contracts          | My contracts      |
| POST /api/payments/escrow/create | Create escrow |
| GET  /api/messages/conversations | My chats    |
| POST /api/messages           | Send message      |
| GET  /api/notifications      | My notifications  |
| POST /api/ai/chat            | Claude AI chat    |
| POST /api/ai/proposal        | Generate proposal |

## Setup (2 steps)

### Step 1 — Install dependencies
Open terminal in the freelancehub folder and run:
  cd backend
  npm install

### Step 2 — Connect to MongoDB
  cp .env.example .env
  
Open .env and set:
  MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/freelancehub
  JWT_SECRET=any_long_random_string

### Step 3 — Run
  npm run dev

Open http://localhost:5000 in your browser.
The frontend is served automatically from the frontend/ folder.

## Optional .env values
  ANTHROPIC_API_KEY    Enable Claude AI assistant
  RAZORPAY_KEY_ID      Enable real payments
  RAZORPAY_KEY_SECRET  Enable real payments
  SMTP_EMAIL           Enable email notifications
  SMTP_PASSWORD        Enable email notifications
