// This is the script to create the admin for the dashboard page
// To initiate the admin run: node lib/create-admin.js


const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const MONGODB_URI = 'mongodb://localhost:27017/GrillHouseDB';
const DB_NAME = 'grillhouse'; // Database name
const ADMIN_COLLECTION = 'admins';

async function main() {
    try {
        const username = 'admin2';
        const password = 'Admin123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db(DB_NAME);
        const admins = db.collection(ADMIN_COLLECTION);

        const existing = await admins.findOne({ username });
        if (existing) {
            console.log('Admin with this username already exists.');
        } else {
            await admins.insertOne({ username, password: hashedPassword });
            console.log('Admin user created successfully!');
        }
        await client.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
