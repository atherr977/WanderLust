# 🌍 WanderLust

**WanderLust** is a full-stack travel accommodation platform where users can discover, create, manage, and review property listings from different locations.

The application follows an **MVC (Model–View–Controller)** architecture and uses **Node.js, Express.js, MongoDB, Mongoose, and EJS** to provide a dynamic server-rendered web experience.

---

## ✨ Features

### 🔐 User Authentication

* User registration and login
* Secure session-based authentication
* Logout functionality
* Protected routes for authenticated users
* Authorization for listing and review actions

### 🏠 Property Listings

* Browse all available accommodations
* View detailed information about individual listings
* Create new property listings
* Edit existing listings
* Delete listings
* Owner-based authorization

### ⭐ Review System

* Add reviews to property listings
* Display reviews on listing pages
* Delete reviews
* Review-author authorization
* Server-side review validation

### 🎨 Dynamic Server-Side Rendering

* EJS templating
* Reusable layouts using `ejs-mate`
* Dynamic listing, authentication, review, and error pages
* Responsive frontend using CSS and Bootstrap

### 🛡️ Validation & Error Handling

* Joi-based request validation
* Mongoose schema validation
* Custom `ExpressError` class
* Asynchronous error handling using `wrapAsync`
* Centralized Express error-handling middleware
* Custom error page

### 🗄️ Database

* MongoDB for persistent application data
* Mongoose for schema definition and database interaction
* Separate models for users, listings, and reviews
* MongoDB Atlas support for production deployment

---

## 🛠️ Tech Stack

| Category             | Technologies                     |
| -------------------- | -------------------------------- |
| Runtime              | Node.js                          |
| Backend              | Express.js                       |
| Database             | MongoDB                          |
| ODM                  | Mongoose                         |
| Templating           | EJS                              |
| Layouts              | ejs-mate                         |
| Authentication       | Passport.js / Passport Local     |
| Validation           | Joi                              |
| Sessions             | express-session                  |
| Session Store        | connect-mongo                    |
| Flash Messages       | connect-flash                    |
| Frontend             | HTML, CSS, JavaScript, Bootstrap |
| HTTP Method Override | method-override                  |
| Deployment           | Vercel                           |
| Version Control      | Git & GitHub                     |

---

## 🏗️ Architecture

WanderLust follows an **MVC-inspired architecture**:

```text
                     ┌──────────────────┐
                     │      Client      │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │  Express Routes  │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │    Middleware    │
                     │ Authentication   │
                     │ Authorization    │
                     │ Validation       │
                     └────────┬─────────┘
                              │
                              ▼
                     ┌──────────────────┐
                     │   Controllers /  │
                     │  Route Handlers  │
                     └────────┬─────────┘
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
             ┌─────────────┐     ┌─────────────┐
             │   Mongoose  │     │    EJS      │
             │    Models   │     │    Views    │
             └──────┬──────┘     └─────────────┘
                    │
                    ▼
             ┌─────────────┐
             │   MongoDB   │
             └─────────────┘
```

---

## 📁 Project Structure

```text
WanderLust/
│
├── controllers/
│   └── ...
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   └── js/
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   ├── users/
│   └── error.ejs
│
├── app.js
├── middleware.js
├── schema.js
├── vercel.json
├── package.json
└── README.md
```

---

# 🚀 Local Setup

## 1. Clone the Repository

```bash
git clone https://github.com/atherr977/WanderLust.git
cd WanderLust
```

## 2. Install Dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
ATLASDB=mongodb+srv://<username>:<password>@<cluster-url>/wanderlust
SECRET=your_session_secret
```

> **Important:** Never commit your `.env` file or expose your MongoDB credentials publicly.

Make sure `.env` is included in `.gitignore`:

```text
.env
node_modules/
```

## 4. Start the Application

For development:

```bash
npm start
```

Or, if your project uses Nodemon:

```bash
npm run dev
```

The application will typically be available at:

```text
http://localhost:8080
```

---

# 🗃️ Database Setup

WanderLust uses **MongoDB** as its database.

You can use either:

* A local MongoDB server
* MongoDB Atlas

### MongoDB Atlas

Create a MongoDB Atlas cluster and configure the connection string in `.env`:

```env
ATLASDB=mongodb+srv://<username>:<password>@<cluster-url>/wanderlust
```

The application connects to MongoDB using **Mongoose**.

---

# 🌱 Database Seeding

The project includes initialization scripts for adding sample listings.

From the project directory:

```bash
node init/index.js
```

Depending on the implementation, this may populate the database with the sample data contained in:

```text
init/data.js
```

> Run the initialization script carefully because seed scripts may modify or replace existing database data.

---

# 🔑 Authentication & Authorization

WanderLust uses session-based authentication.

The authentication flow is approximately:

```text
User
  │
  ▼
Signup / Login
  │
  ▼
Passport Authentication
  │
  ▼
Session Created
  │
  ▼
Authenticated Requests
  │
  ▼
Authorization Middleware
  │
  ├── Listing Owner
  │
  └── Review Author
```

Protected operations include actions such as:

* Creating listings
* Editing listings
* Deleting listings
* Creating reviews
* Deleting reviews

---

# 🧩 Middleware

The application uses custom Express middleware for:

### Authentication

Checks whether the user is logged in before accessing protected routes.

### Authorization

Verifies that the authenticated user has permission to modify a particular listing or review.

### Validation

Validates incoming listing and review data before it reaches the database.

Example middleware flow:

```text
Request
   ↓
Authentication
   ↓
Authorization
   ↓
Validation
   ↓
Route Handler
   ↓
Database
```

---

# ⚠️ Error Handling

WanderLust uses centralized error handling to provide consistent responses when something goes wrong.

### `ExpressError.js`

Provides a custom error class for application-specific errors.

### `wrapAsync.js`

Simplifies handling errors from asynchronous Express route handlers.

Instead of repeatedly writing:

```javascript
try {
    // async operation
} catch (err) {
    next(err);
}
```

asynchronous route handlers can be wrapped using:

```javascript
wrapAsync(async (req, res) => {
    // async operation
});
```

Errors are then forwarded to the centralized Express error-handling middleware.

---

# 🌐 Deployment

The application is configured for deployment using **Vercel**.

The repository contains:

```text
vercel.json
```

for deployment configuration.

### Production Requirements

Before deploying, make sure that:

1. Your MongoDB database is accessible from the deployment environment.
2. Production environment variables are configured.
3. Your session store is suitable for production.
4. MongoDB credentials are not hardcoded.
5. `vercel.json` correctly points to the application entry point.
6. All required dependencies are listed in `package.json`.

### Environment Variables on Vercel

Configure the required variables in your Vercel project settings rather than committing them to GitHub.

For example:

```text
ATLASDB
SECRET
```

---

# 🔒 Security

The project follows several basic security practices:

* Environment variables for sensitive configuration
* Authentication for protected routes
* Authorization for resource ownership
* Server-side input validation
* MongoDB schema validation
* Session-based authentication
* Centralized error handling

**Never expose:**

```text
MongoDB passwords
Session secrets
API keys
Private credentials
.env files
```

---

# 📸 Application Flow

```text
                 WanderLust
                     │
          ┌──────────┴──────────┐
          │                     │
       Discover              Account
          │                     │
     View Listings       ┌──────┴──────┐
          │              │             │
          ▼            Login         Signup
      Listing              │
       Details              ▼
          │          Authenticated
     ┌────┴────┐            │
     │         │            ▼
   Reviews   Owner      Manage Content
     │         │
     ▼         ▼
   Create    Create/Edit/Delete
   Review       Listings
```

---

# 🎯 Future Improvements

Potential improvements for future versions include:

* [ ] Image upload and cloud storage
* [ ] Interactive maps and geolocation
* [ ] Advanced listing search
* [ ] Category and price filtering
* [ ] Pagination
* [ ] Wishlist / favorites
* [ ] Booking functionality
* [ ] Improved responsive UI
* [ ] Email notifications
* [ ] Rate limiting
* [ ] Automated testing
* [ ] CI/CD pipeline
* [ ] Production monitoring and logging

---

# 👨‍💻 Author

**Athar Ashraf War**

Electronics & Telecommunication Engineering
Jadavpur University

### Links

* GitHub: `https://github.com/atherr977`
* Project Repository: `https://github.com/atherr977/WanderLust`

---

# 📄 License

This project is intended for educational and portfolio purposes.

---

## ⭐ Acknowledgements

This project was developed as a full-stack web development project to explore:

* RESTful routing
* MVC architecture
* Express.js
* MongoDB & Mongoose
* Authentication & authorization
* Server-side rendering with EJS
* Middleware design
* Data validation
* Error handling
* Full-stack deployment
