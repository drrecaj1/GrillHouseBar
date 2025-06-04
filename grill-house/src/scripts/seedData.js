// seedData.js
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import connectMongo from '../lib/connectMongo.js';
import Reservation from '../models/Reservation.js';
import Inquiry from '../models/Inquiry.js';

const reservations = [
    {
        fullName: 'Alice Berisha',
        email: 'aliceb@example.com',
        numberOfGuests: 2,
        startDate: new Date('2025-06-10T19:00:00'),
        diningOption: 'byof',
        eventType: 'Birthday',
        specialRequests: 'Window seat please',
        estimatedPrice: 25,
        status: 'pending',
        notes: 'Customer called to confirm dietary restrictions',
    },
    {
        fullName: 'Bob Krasniqi',
        email: 'bobk@example.com',
        numberOfGuests: 4,
        startDate: new Date('2025-06-12T20:00:00'),
        diningOption: 'menu1',
        eventType: 'Business Event',
        specialRequests: '',
        estimatedPrice: 80,
        status: 'confirmed',
        notes: 'VIP client - ensure best table',
    },
    {
        fullName: 'Carla Gashi',
        email: 'carla@example.com',
        numberOfGuests: 3,
        startDate: new Date('2025-06-14T18:30:00'),
        diningOption: 'byof',
        eventType: 'Wedding',
        specialRequests: 'Gluten-free',
        estimatedPrice: 45,
        status: 'pending',
        notes: '',
    },
    {
        fullName: 'Dren Rrecaj',
        email: 'dren@example.com',
        numberOfGuests: 5,
        startDate: new Date('2025-06-16T21:00:00'),
        diningOption: 'menu2',
        eventType: 'Office Party',
        specialRequests: '',
        estimatedPrice: 100,
        status: 'cancelled',
        notes: 'Cancelled due to company policy change',
    },
    {
        fullName: 'Emma Hoxha',
        email: 'emma@example.com',
        numberOfGuests: 2,
        startDate: new Date('2025-06-17T19:30:00'),
        diningOption: 'byof',
        eventType: 'Special Occasion',
        specialRequests: 'Corner table',
        estimatedPrice: 30,
        status: 'confirmed',
        notes: 'Anniversary celebration - prepare rose petals',
    },
    {
        fullName: 'Faton Morina',
        email: 'faton@example.com',
        numberOfGuests: 6,
        startDate: new Date('2025-06-19T20:00:00'),
        diningOption: 'menu3',
        eventType: 'Birthday',
        specialRequests: '',
        estimatedPrice: 120,
        status: 'pending',
        notes: 'Large group - may need extra space',
    },
    {
        fullName: 'Gentiana Halili',
        email: 'gentiana@example.com',
        numberOfGuests: 3,
        startDate: new Date('2025-06-21T20:30:00'),
        diningOption: 'byof',
        eventType: 'Wedding',
        specialRequests: 'Extra napkins',
        estimatedPrice: 50,
        status: 'confirmed',
        notes: '',
    },
    {
        fullName: 'Ilir Mustafa',
        email: 'ilir@example.com',
        numberOfGuests: 1,
        startDate: new Date('2025-06-23T18:00:00'),
        diningOption: 'menu2',
        eventType: 'Business Event',
        specialRequests: '',
        estimatedPrice: 20,
        status: 'pending',
        notes: 'Frequent customer - knows the menu well',
    },
    {
        fullName: 'Jeta Zeqiri',
        email: 'jeta@example.com',
        numberOfGuests: 4,
        startDate: new Date('2025-06-25T21:30:00'),
        diningOption: 'byof',
        eventType: 'Office Party',
        specialRequests: 'Birthday cake',
        estimatedPrice: 90,
        status: 'confirmed',
        notes: 'Bringing their own birthday cake - provide plates and forks',
    },
    {
        fullName: 'Kujtim Zeneli',
        email: 'kujtim@example.com',
        numberOfGuests: 2,
        startDate: new Date('2025-06-27T19:45:00'),
        diningOption: 'menu1',
        eventType: 'Special Occasion',
        specialRequests: 'Rose on table',
        estimatedPrice: 60,
        status: 'confirmed',
        notes: 'Proposal planned - coordinate with kitchen for timing',
    }
];

const inquiries = [
    {
        fullName: 'Blerina Rexha',
        email: 'blerina@example.com',
        phone: '049123456',
        message: 'Can I bring my own birthday cake?',
        createdAt: new Date()
    },
    {
        fullName: 'Driton Limani',
        email: 'driton@example.com',
        phone: '044987654',
        message: 'Do you have vegan options?',
        createdAt: new Date()
    },
    {
        fullName: 'Valon Berisha',
        email: 'valon@example.com',
        phone: '045112233',
        message: 'How late are you open on Saturdays?',
        createdAt: new Date()
    },
    {
        fullName: 'Elira Gashi',
        email: 'elira@example.com',
        phone: '048667788',
        message: 'Is parking available?',
        createdAt: new Date()
    },
    {
        fullName: 'Ardit Meta',
        email: 'ardit@example.com',
        phone: '043556677',
        message: 'Can I modify my reservation?',
        createdAt: new Date()
    },
    {
        fullName: 'Mimoza Krasniqi',
        email: 'mimoza@example.com',
        phone: '049998877',
        message: 'Do you offer group discounts?',
        createdAt: new Date()
    },
    {
        fullName: 'Leon Daka',
        email: 'leon@example.com',
        phone: '045334455',
        message: 'Do you have a childrens menu?',
        createdAt: new Date()
    },
    {
        fullName: 'Liridona Aliu',
        email: 'liri@example.com',
        phone: '046223344',
        message: 'Is there live music?',
        createdAt: new Date()
    },
    {
        fullName: 'Shpat Berbatovci',
        email: 'shpat@example.com',
        phone: '047112299',
        message: 'Can I pre-order meals?',
        createdAt: new Date()
    },
    {
        fullName: 'Rina Demiri',
        email: 'rina@example.com',
        phone: '044776655',
        message: 'Can I book without email confirmation?',
        createdAt: new Date()
    }
];
async function seed() {
    try {
        await connectMongo();
        console.log('✅ Connected to MongoDB');

        await Reservation.deleteMany();
        await Inquiry.deleteMany();

        await Reservation.insertMany(reservations);
        await Inquiry.insertMany(inquiries);

        console.log('✅ Seeded 10 reservations and 10 inquiries successfully.');
        process.exit(0);
    } catch (error) {
        console.error('❌ Failed to seed data:', error);
        process.exit(1);
    }
}

seed();