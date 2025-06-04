// This is the script to create the admin for the dashboard page
// To initiate the admin run: node lib/create-admin.js


require('dotenv').config({ path: require('path').resolve(__dirname, '../.env.local') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../src/models/Admin').default;

const MONGODB_URI = process.env.MONGODB_URI;

async function main() {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const username = 'admin2';
        const password = 'Admin123';
        const hashedPassword = await bcrypt.hash(password, 10);

        const existing = await Admin.findOne({ username });
        if (existing) {
            console.log('Admin with this username already exists.');
        } else {
            await Admin.create({ username, password: hashedPassword });
            console.log('Admin user created successfully!');
        }
        await mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
}

main();
