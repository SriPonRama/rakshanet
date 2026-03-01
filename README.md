# RakshaNet – Smart Disaster Response Platform

A production-grade, full-stack disaster management system connecting citizens, rescue teams, authorities, NGOs, and administrators for real-time incident reporting, resource allocation, and AI-powered risk assessment.

## 🎯 Project Overview

RakshaNet is an enterprise-level emergency coordination platform featuring:
- **5 Role-Based Portals**: Citizen, Rescue Team, Authority, NGO, and Super Admin
- **Real-Time Incident Mapping**: Leaflet-based maps with severity heatmaps
- **AI-Powered Risk Assessment**: Flask microservice for disaster prediction and damage analysis
- **Secure Authentication**: JWT with HTTP-only cookies and role-based access control
- **Professional UI**: Clean government-style interface with Tailwind CSS

## 🛠 Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Leaflet.js** + react-leaflet for maps
- **react-leaflet-heatmap-layer-v3** for heatmaps
- **Framer Motion** for animations
- **Heroicons** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose ODM
- **JWT** authentication
- **bcryptjs** for password hashing
- **Role-based access control** middleware

### AI Microservice
- **Python Flask**
- **Flask-CORS**
- Risk prediction endpoint
- Image damage analysis endpoint

## 📁 Project Structure

```
Hack2Skills/
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   │   ├── dashboards/
│   │   │   ├── landing/
│   │   │   ├── layout/
│   │   │   └── routing/
│   │   ├── pages/         # Page components
│   │   │   ├── auth/      # Login, Signup, Forgot Password
│   │   │   ├── portal/    # 5 Dashboard pages
│   │   │   └── LandingPage.jsx
│   │   ├── services/      # API service layer
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Constants and utilities
│   └── package.json
│
├── backend/               # Express backend
│   ├── src/
│   │   └── server.js     # Main server file
│   ├── config/           # Environment configuration
│   ├── controllers/      # Route controllers
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   └── package.json
│
└── ai-service/           # Flask AI microservice
    ├── app.py           # Flask application
    └── requirements.txt
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (running locally or connection URI)
- **Python 3.8+** (for AI service)
- **npm** or **yarn**

### 1. Clone and Setup

```bash
cd "c:\Users\dhuvarakesan\OneDrive\Desktop\Sri Pon Rama\projects\Hack2Skills"
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Environment is already configured in .env
# Start the server
npm run dev
```

Backend will run on **http://localhost:5000**

### 3. Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Frontend will run on **http://localhost:5173**

### 4. AI Microservice Setup

Open a new terminal:

```bash
cd ai-service

# Create virtual environment (optional but recommended)
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start Flask server
python app.py
```

AI service will run on **http://localhost:8000**

### 5. MongoDB Setup

Make sure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas connection string in backend/.env
```

## 🎨 Design System

### Color Palette
- **Primary**: `#0A1F44` (Deep Navy)
- **Emergency**: `#D32F2F` (Alert Red)
- **Warning**: `#FBC02D` (Risk Yellow)
- **Success**: `#2E7D32` (Green)
- **Background**: `#F4F6F9` (Light Grey)

### Typography
- **Font**: Inter (Google Fonts)
- Professional, clean government-style interface

## 🔐 User Roles & Access

### 1. Citizen Portal (`/portal/citizen`)
- SOS emergency button
- Report disasters with location and severity
- View nearby shelters on map
- Track personal reports
- View active alerts

### 2. Rescue Team Portal (`/portal/rescue`)
- View assigned incidents
- Navigate to victim locations
- Update incident status (assigned → in_progress → resolved)
- Contact victims through control room

### 3. Authority Portal (`/portal/authority`)
- Real-time analytics dashboard
- Incident heatmap with severity visualization
- Broadcast geo-targeted alerts
- AI risk prediction panel
- Resource allocation overview

### 4. NGO Portal (`/portal/ngo`)
- View help requests
- Manage emergency shelters
- Add shelter capacity and location
- Coordinate with authorities

### 5. Super Admin Portal (`/portal/admin`)
- User management
- Role assignment and control
- Incident moderation
- System logs overview

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Incidents
- `POST /api/incidents` - Create incident
- `GET /api/incidents` - List all incidents
- `GET /api/incidents/:id` - Get incident by ID
- `PATCH /api/incidents/:id/status` - Update incident status

### Alerts
- `POST /api/alerts` - Create alert (authority/admin only)
- `GET /api/alerts` - List all alerts

### Resources
- `POST /api/resources` - Create resource (authority/ngo/admin)
- `GET /api/resources` - List all resources

### AI Services
- `POST /api/ai/predict-risk` - Predict disaster risk
- `POST /api/ai/analyze-image` - Analyze damage from image

### Admin
- `GET /api/admin/users` - List all users (admin only)
- `PATCH /api/admin/users/:id/role` - Update user role (admin only)
- `GET /api/admin/incidents` - List incidents for moderation (admin only)

## 🗺 Map Features

### Leaflet Integration
- **Base Layer**: OpenStreetMap tiles
- **Marker Clustering**: Groups nearby incidents
- **Heatmap Layer**: Severity-based visualization
  - Green: Low severity
  - Yellow: Medium severity
  - Red: High/Critical severity

### Dynamic Updates
- Heatmap updates based on real-time incident data
- Severity weighting for accurate risk visualization
- Responsive map controls for all screen sizes

## 🧠 AI Microservice

### Risk Prediction (`/predict-risk`)
**Input:**
```json
{
  "incidentType": "flood",
  "location": { "lat": 13.08, "lng": 80.27 },
  "severityIndicators": {
    "populationDensity": 7,
    "infrastructureScore": 5,
    "weatherSeverity": 8
  }
}
```

**Output:**
```json
{
  "riskScore": 72.5,
  "riskLevel": "high",
  "recommendedActions": [
    "Verify field reports and sensor data",
    "Pre-position rescue teams and medical units",
    "Notify local authorities and NGOs"
  ]
}
```

### Damage Analysis (`/analyze-damage`)
**Input:**
```json
{
  "imageBase64": "base64_encoded_image_string"
}
```

**Output:**
```json
{
  "damageSeverity": "moderate",
  "confidence": 0.75,
  "notes": "Heuristic placeholder model. Replace with real CNN in production."
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth with HTTP-only cookies
- **Password Hashing**: bcryptjs with salt rounds
- **Role-Based Access Control**: Middleware-enforced permissions
- **CORS Protection**: Configured for specific origins
- **Input Validation**: Server-side validation for all endpoints

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **Breakpoints**: sm, md, lg, xl (Tailwind defaults)
- **Touch-Friendly**: Large tap targets for mobile
- **Collapsible Navigation**: Mobile drawer menu
- **Adaptive Layouts**: Grid systems adjust per viewport

## 🎭 Animation & UX

- **Framer Motion**: Scroll-triggered fade-in-up animations
- **Smooth Transitions**: Hover states and page transitions
- **Loading States**: Skeleton screens and spinners
- **Error Handling**: User-friendly error messages
- **Optimistic Updates**: Immediate UI feedback

## 🧪 Testing Credentials

Create test users with different roles:

```bash
# Use the signup page or create via MongoDB directly
# Example roles: citizen, rescue, authority, ngo, admin
```

## 📦 Production Deployment

### Environment Variables (Production)

**Backend (.env):**
```env
PORT=5000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/rakshanet
JWT_SECRET=your-production-secret-key-min-32-chars
CLIENT_ORIGIN=https://your-frontend-domain.com
AI_SERVICE_URL=https://your-ai-service-domain.com
NODE_ENV=production
```

**Frontend (.env):**
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### Build Commands

**Frontend:**
```bash
cd frontend
npm run build
# Deploy 'dist' folder to Vercel, Netlify, or AWS S3
```

**Backend:**
```bash
cd backend
npm start
# Deploy to Heroku, AWS EC2, or DigitalOcean
```

**AI Service:**
```bash
cd ai-service
# Use gunicorn for production
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:8000 app:app
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `backend/.env`
- Verify network access if using MongoDB Atlas

### CORS Errors
- Verify `CLIENT_ORIGIN` in backend `.env` matches frontend URL
- Check browser console for specific CORS error details

### AI Service Not Responding
- Ensure Flask server is running on port 8000
- Check `AI_SERVICE_URL` in backend `.env`
- Verify Python dependencies are installed

### Map Not Loading
- Check browser console for Leaflet errors
- Ensure `leaflet.css` is imported
- Verify internet connection for tile loading

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Leaflet.js](https://leafletjs.com)
- [Express.js](https://expressjs.com)
- [MongoDB](https://www.mongodb.com/docs)
- [Flask](https://flask.palletsprojects.com)

## 👥 Contributors

Built for Hack2Skills - Smart Disaster Response Platform Challenge

## 📄 License

This project is built for educational and demonstration purposes.

---

**RakshaNet** - Coordinated disaster response, powered by technology.
