# RakshaNet Backend

Express.js REST API server for RakshaNet disaster management platform.

## Features

- JWT authentication with HTTP-only cookies
- Role-based access control (RBAC)
- MongoDB with Mongoose ODM
- RESTful API architecture
- Integration with AI microservice
- Geospatial queries for location-based features

## Setup

```bash
npm install
```

## Environment Variables

Create `.env` file (see `.env.example`):

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/rakshanet
JWT_SECRET=your-secret-key
CLIENT_ORIGIN=http://localhost:5173
AI_SERVICE_URL=http://localhost:8000
NODE_ENV=development
```

## Run

```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

## API Routes

### Auth Routes (`/api/auth`)
- `POST /signup` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user profile
- `POST /logout` - Logout user

### Incident Routes (`/api/incidents`)
- `POST /` - Create incident (citizen, authority, ngo)
- `GET /` - List all incidents (authenticated)
- `GET /:id` - Get incident by ID
- `PATCH /:id/status` - Update status (rescue, authority, admin)

### Alert Routes (`/api/alerts`)
- `POST /` - Create alert (authority, admin)
- `GET /` - List alerts (authenticated)

### Resource Routes (`/api/resources`)
- `POST /` - Create resource (authority, ngo, admin)
- `GET /` - List resources (authenticated)

### AI Routes (`/api/ai`)
- `POST /predict-risk` - Predict disaster risk (authority, admin)
- `POST /analyze-image` - Analyze damage image (authority, rescue, admin)

### Admin Routes (`/api/admin`)
- `GET /users` - List all users (admin only)
- `PATCH /users/:id/role` - Update user role (admin only)
- `GET /incidents` - List incidents for moderation (admin only)

## Database Models

### User
- name, email, password (hashed)
- role: citizen | rescue | authority | ngo | admin
- location: GeoJSON Point

### Incident
- title, description, images[]
- severity: low | medium | high | critical
- status: reported | assigned | in_progress | resolved | closed
- reportedBy, assignedTo (User refs)
- location: GeoJSON Point with address

### Alert
- message, severity
- createdBy (User ref)
- targetArea: GeoJSON Point/Polygon

### Resource
- type, quantity, available
- location: GeoJSON Point with name
- managedBy (User ref)

## Middleware

### authenticate
Verifies JWT token from HTTP-only cookie and attaches user to request.

### authorize(...roles)
Checks if authenticated user has one of the specified roles.

## Error Handling

All routes return consistent error responses:

```json
{
  "message": "Error description"
}
```

Status codes:
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 403: Forbidden
- 404: Not found
- 500: Server error
- 502: AI service unavailable
