# 🎓 Akademi – Scholarship Management System

**Akademi** is a full-featured, web-based scholarship management platform designed to streamline the end-to-end process of scholarship applications, reviews, approvals, and future payment handling. Built with modern technologies and a user-centric approach, Akademi empowers educational institutions and organizations to manage scholarships efficiently and securely.

🔗 **Live Demo:** [https://akademi-uni.web.app](https://akademi-uni.web.app)

---

## 🚀 Features

- ✅ **Secure User Authentication**  
  Powered by Firebase Authentication for reliable sign-up and login.

- 🔐 **Role-Based Access Control**  
  Distinct dashboards for:
  - **Applicants**: Submit and track applications.
  - **Moderators (Reviewers)**: Evaluate and comment on submissions.
  - **Admins**: Manage scholarships, users, and system settings.

- 📝 **Scholarship Application Portal**  
  Intuitive forms with real-time validation and multi-step submission support.

- 📎 **Document Upload**  
  Secure file uploads via **imgbb API integration** for storing supporting documents (e.g., transcripts, ID proofs).

- 🕒 **Real-Time Application Tracking**  
  Applicants can monitor their application status (Pending, Under Review, Approved, Rejected).

- 📊 **Admin Dashboard**  
  Comprehensive tools for managing scholarships, users, applications, and review workflows.

- 💳 **Payment Integration (Future-Ready)**  
  Stripe integration for processing application fees or scholarship disbursements.

---

## 🛠️ Tech Stack

### Frontend
| Technology       | Purpose |
|------------------|--------|
| React.js         | Component-based UI development |
| Vite             | Fast development server & build tool |
| Tailwind CSS     | Utility-first styling framework |
| DaisyUI          | Pre-built responsive UI components |
| React Router DOM | Client-side routing |
| React Toastify   | User notifications and alerts |

### Backend
| Technology       | Purpose |
|------------------|--------|
| Node.js          | JavaScript runtime |
| Express.js       | Web server framework |
| MongoDB          | NoSQL database for flexible data storage |
| Firebase Auth    | Secure authentication & user management |
| Stripe           | Payment processing (via Payment Intents API) |
| imgbb            | Image/document hosting for uploads |

### Hosting & Deployment
| Service       | Role |
|-------------|------|
| **Firebase** | Frontend hosting + Authentication |
| **Vercel**   | Backend API deployment |
| **MongoDB Atlas** | Cloud database |

---

## 🔐 Authentication & Roles

Akademi uses **Firebase Authentication** for secure login and session management with role-based access control:

| Role      | Email                | Password         | Permissions |
|---------|----------------------|------------------|------------|
| Admin   | `admin@mail.com`     | `Admin123`       | Full access: manage scholarships, users, reviews, and system settings |
| Moderator | `moderator@mail.com` | `Moderator123`   | Review applications, submit feedback, view assigned scholarships |
| User    | Self-registered      | User-defined     | Apply for scholarships, upload documents, track status |

> 🔒 Never use these credentials in production. For demo purposes only.

---

## 🏗️ Backend Overview

This backend service powers the entire Akademi ecosystem, providing RESTful APIs for:

### 🔹 User Management
- Create, read, update, and delete user profiles
- Enforce role-based permissions

### 🔹 Scholarship Management
- Add, edit, list, and archive scholarships
- Filter scholarships (e.g., by lowest application fee, deadline, eligibility)

### 🔹 Review Management
- Assign reviewers to applications
- Submit and update reviews
- Track evaluation progress

### 🔹 Payment Processing
- Generate **Stripe Payment Intents** for application fees
- Handle successful and failed payments
- Webhook-ready for future enhancements

### 🔹 Middleware
- **CORS**: Enabled for secure cross-origin requests
- **Authentication**:
  - `verifyAuthorization`: Ensures valid user session
  - `verifyAdmin`: Restricts routes to admin users only

---

## 📁 Project Structure (Backend)

```
backend/
├── .env               # Environment variables
├── index.js           # Server entry point
├── package.json       # Dependencies and scripts
├── vercel.json        # Vercel deployment configuration
├── node_modules/      # Installed packages
└── README.md          # This file
```

---

## ⚙️ Deployment Guide

### 1. **Set Up Database**
- Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for cloud-hosted database.
- Update your `.env` file:
  ```env
  MONGODB_URI=your_mongodb_atlas_connection_string
  JWT_SECRET=your_jwt_secret_key
  STRIPE_SECRET_KEY=your_stripe_secret
  IMGBB_API_KEY=your_imgbb_api_key
  FIREBASE_PROJECT_ID=your_firebase_project_id
  ```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Run Locally**
```bash
npm start
# or
node index.js
```
Backend runs on `http://localhost:3000` (or as configured).

### 4. **Deploy to Vercel**
- Push code to a Git repository.
- Connect to [Vercel](https://vercel.com), import project.
- Set environment variables in Vercel dashboard.
- Automatically deploys on push to main branch.

> ✅ Ensure `vercel.json` is configured for proper API routing.

---

## Environment
- server/.env
  - JWT_SECRET=change_me
  - CLIENT_URL=https://your-live-client.example.com
- client/.env
  - VITE_API_URL=https://your-live-server.example.com
  - VITE_IMGBB_KEY=YOUR_IMGBB_KEY

## Useful commands
- Start server (dev): cd server && npx nodemon index.js
- Start client: cd client && npm run dev

## Features checklist
- JWT auth (server /auth/jwt)
- Scholarships: search, sort, pagination
- Applications manage endpoint (moderator/admin)
- Client: axiosSecure, TanStack Query, PrivateRoute, theme toggle, imgbb upload

---

## 🧪 Future Enhancements

- [ ] Email notifications (via Nodemailer or SendGrid)
- [ ] Export applications to PDF/CSV
- [ ] Multi-language support
- [ ] AI-based eligibility screening
- [ ] Calendar integration for deadlines
- [ ] Two-factor authentication (2FA)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository
2. Create a new feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

Ensure code adheres to linting and formatting standards.

---

## 📄 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

For inquiries, feedback, or collaboration opportunities:

📧 **Email**: contact@akademi-uni.web.app  
🌐 **Website**: [https://akademi-uni.web.app](https://akademi-uni.web.app)

---

> **Empowering Education Through Technology**  
> *Akademi – Simplifying Scholarships, One Application at a Time.*

---

# Scholarship Management System

A comprehensive platform for managing scholarships with multiple user roles and features.

## 🎯 Features

- Multi-role authentication (User, Moderator, Admin)
- Scholarship search and application
- Dashboard for each user role
- Real-time notifications
- Application tracking
- Analytics and reporting

## 📁 File Structure

```
scholarship-management-system/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── Admin/
│   │   │   ├── Moderator/
│   │   │   └── User/
│   │   ├── Shared/
│   │   └── Authentication/
│   ├── hooks/
│   ├── utils/
│   ├── providers/
│   ├── routes/
│   └── pages/
├── server/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── controllers/
└── public/
```

## 🚀 Tech Stack

- Frontend: React, TailwindCSS, TanStack Query
- Backend: Node.js, Express
- Database: MongoDB
- Authentication: Firebase, JWT
- State Management: Context API
- UI Components: DaisyUI

## ⚙️ Environment Variables

```env
REACT_APP_API_URL=
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=

# Server Environment Variables
MONGODB_URI=
JWT_SECRET=
CORS_ORIGIN=
```

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/scholarship-management-system.git
```

2. Install dependencies:
```bash
cd scholarship-management-system
npm install
cd server
npm install
```

3. Set up environment variables:
- Create `.env` file in root directory
- Create `.env` file in server directory
- Add necessary environment variables

4. Run the application:
```bash
# Start frontend (root directory)
npm run dev

# Start backend (server directory)
npm run dev
```

## 🔐 API Routes

### Public Routes
- `GET /api/scholarships` - Get all scholarships
- `GET /api/scholarships/:id` - Get scholarship details
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Protected Routes
- `POST /api/applications` - Submit application
- `GET /api/applications/user` - Get user applications
- `GET /api/moderator/scholarships` - Get scholarships (Moderator)
- `POST /api/moderator/scholarships` - Add scholarship (Moderator)
- `GET /api/admin/users` - Get all users (Admin)

## 👥 User Roles

1. **User**
   - Search scholarships
   - Apply for scholarships
   - Track applications
   - Update profile

2. **Moderator**
   - Manage scholarships
   - Review applications
   - Add new scholarships
   - Generate reports

3. **Admin**
   - User management
   - Role management
   - System analytics
   - Global settings

## 🔒 Security Features

- JWT Authentication
- Protected Routes
- Role-based Access Control
- Input Validation
- XSS Protection
- CORS Configuration

## 🎨 UI Components

- Responsive Navigation
- Dynamic Forms
- Interactive Dashboards
- Toast Notifications
- Loading Skeletons
- Modal Dialogs
- Data Tables

## 📈 Performance Optimizations

- Code Splitting
- Image Optimization
- Lazy Loading
- Caching Strategies
- API Rate Limiting
- Database Indexing

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE.md file for details.


