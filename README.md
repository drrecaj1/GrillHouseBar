
# Grill House Bar – Digital Reservation System

Welcome to the Grill House Bar reservation system! This project is a full-stack web prototype developed as part of my final-year Computing Project. It provides a responsive client-facing website for reservations and an integrated admin dashboard for managing bookings, inquiries, and analytics.

## Academic Note for Professor

**Important**: This system was developed using Next.js, MongoDB, Mongoose, and custom backend API routes. The database and admin authentication were implemented using Next.js API routes and secure hashing with bcrypt. All development and testing were done locally, without deploying to a live production server.

This README is designed to help you run the prototype easily, view the data using DataGrip, and understand the structure and technologies involved.

## Table of Contents

1. Prerequisites  
2. Getting Started  
3. Database Setup (MongoDB)  
4. Environment Variables  
5. Running the Application  
6. Creating an Admin User  
7. Seeding Test Data (Optional)  
8. Viewing Data with DataGrip  
9. Admin Dashboard Features  
10. Future Enhancements  

## 1. Prerequisites

Before running this project, make sure you have:

- Node.js (v18+ recommended)
- npm or Yarn
- MongoDB (either locally or via Atlas)
- DataGrip (optional, for GUI access to MongoDB)

## 2. Getting Started

Clone or download the project into your local machine.

```bash
git clone <repository_url>
cd grill-house-bar
npm install
```

## 3. Database Setup (MongoDB)

This application uses MongoDB for data storage. You need an active MongoDB instance (server) to run the application.

### Option A: MongoDB Atlas (Recommended for Cloud)

MongoDB Atlas provides a free-tier cloud-hosted MongoDB database, perfect for development and small projects.

**Create a MongoDB Atlas Account**  
Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.

**Create a New Cluster**  
- Follow the on-screen prompts to create a new "Shared Cluster" (the free M0 tier).  
- Choose your preferred cloud provider (AWS, GCP, Azure) and region.

**Create a Database User**  
- In your cluster's dashboard, go to **"Database Access"** under **"Security"**.  
- Click **"Add New Database User"**.  
- Choose a strong username and password. Remember these credentials!  
- Grant **"Read and write to any database"** privileges.

**Add Your Current IP Address to IP Access List**  
- Go to **"Network Access"** under **"Security"**.  
- Click **"Add IP Address"**.  
- Select **"Add Current IP Address"** or allow access from anywhere (`0.0.0.0/0`) for easier development (less secure for production).

**Get the Connection String**  
- Go back to **"Database Deployments"** and click **"Connect"** on your cluster.  
- Select **"Choose a connection method"**.  
- Select **"Node.js"** and copy the connection string. It will look something like:

```
mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/grillhouse?retryWrites=true&w=majority
```

**IMPORTANT**: Replace `<username>` and `<password>` in the connection string with the database user credentials you created in step 3.

### Option B: Local MongoDB Server (For Local Development)

You can run MongoDB locally on your machine if you prefer not to use the cloud (Atlas). This is useful for offline development or if you want full control over your database.

**Install MongoDB Community Server**  
Follow official installation guides:
- macOS (Homebrew): [MongoDB on macOS](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/)
- Windows: [MongoDB on Windows](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/)
- Install MongoDB Shell (mongosh) or a GUI like **DataGrip** or **MongoDB Compass**.
**2. Start the MongoDB Server**

MongoDB must be running in the background for the app to connect to it.

**👉 macOS (Homebrew install)**

If you've installed MongoDB using Homebrew, it typically runs **automatically** as a background service. No need to manually start it each time.

* **Default data directory**: `/opt/homebrew/var/mongodb`

To verify this location, run:
```bash
cat /opt/homebrew/etc/mongod.conf
```

To manually start the service:
```bash
brew services start mongodb-community@6.0
```

**👉 Windows**

If you're on Windows, you may need to start MongoDB manually or register it as a system service.

1. Open **Command Prompt**.
2. Create a folder for your database files (if it doesn't exist yet):
   ```cmd
   mkdir C:\data\db
   ```
3. Start MongoDB using:
   ```cmd
   mongod --dbpath "C:\data\db"
   ```

💡 If you'd like MongoDB to always start with Windows, install it as a **Windows service** using the MongoDB installer.

**🖥️ 3. Use DataGrip (Recommended)**

To manage your MongoDB database visually:

1. Open **DataGrip**.
2. Go to File > New > Data Source > MongoDB.
3. Use the following settings:

| **Setting** | **Value** |
|-------------|-----------|
| Host | localhost |
| Port | 27017 |
| Database | GrillHouseDB |

4. Click **"Test Connection"** to ensure it's working.
5. Click **"OK"** to save.
## 4. Environment Variables

Create a `.env.local` file in the root of your project and add:

```bash
MONGODB_URI=mongodb://localhost:27017/GrillHouseDB
EMAIL_USER=grillhousebar2011@gmail.com
EMAIL_PASS=lltf unim iwom ihhr

```

Use the App Password already provided.

## 5. Running the Application

```bash
cd grill-house
npm run dev
```

Visit: http://localhost:3000 to see the client-facing website.

Visit: http://localhost:3000/admin/dashboard to login into the admin portal.


## 6. Creating an Admin User

```bash
node lib/create-admin.js
```

Follow the prompts to set username and password.

## 7. Seeding Test Data (Optional)

```bash
node src/scripts/seedData.js
```

## 8. Viewing Data with DataGrip

Use the same steps from section 3 to explore the database visually in DataGrip.


## 10. Client-facing website Features

- See the information for the restaurant such as story, menus, contact info.
- Use the reservation system to send out a reservation request.
- Use the contact form for any questions or problems you are facing in the website.
- Confirm or cancle the reservations in the email sent to you for the verification.
- See the integrated map with the specific Google Map locaiton.


## 10. Admin Dashboard Features

- View/manage reservations  
- View/respond to inquiries  
- Monthly reservation analytics  
- Manual reservation form  
- Password update prompt on first login  
- Role-based access (future)

