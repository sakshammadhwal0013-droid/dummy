import prisma from './src/db/prisma.js';

async function seed() {
  await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@safarnama.com',
      password: 'hashedpassword',
      role: 'ADMIN'
    }
  });

  await prisma.user.create({
    data: {
      name: 'Guest User',
      email: 'guest@safarnama.com',
      password: 'hashedpassword',
      role: 'CUSTOMER'
    }
  });

  await prisma.booking.createMany({
    data: [
      { bookingId: 'BK-7829', userId: 2, type: 'Flight', title: 'Mumbai - Delhi', destination: 'Mumbai', status: 'Confirmed', date: '2026-06-25', amount: '$120' },
      { bookingId: 'BK-7830', userId: 2, type: 'Hotel', title: 'Taj Palace', destination: 'Goa', status: 'Pending', date: '2026-06-26', amount: '$350' },
      { bookingId: 'BK-7831', userId: 2, type: 'Tour', title: 'Kerala Backwaters', destination: 'Kerala', status: 'Confirmed', date: '2026-07-02', amount: '$890' },
      { bookingId: 'BK-7832', userId: 2, type: 'Train', title: 'Rajdhani Express', destination: 'Delhi', status: 'Cancelled', date: '2026-06-24', amount: '$45' }
    ]
  });

  console.log('Database seeded.');
}

seed().catch(console.error);
