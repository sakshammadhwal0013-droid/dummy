import { Request, Response } from 'express';
import prisma from '../db/prisma.js';

// Stubs for User Controller
export const getProfile = async (req: Request, res: Response) => { res.json({ message: 'Get Profile Endpoint Stub' }); };
export const updateProfile = async (req: Request, res: Response) => { res.json({ message: 'Update Profile Endpoint Stub' }); };
export const listUsers = async (req: Request, res: Response) => { res.json({ message: 'List Users Endpoint Stub' }); };

export const getUserBookings = async (req: Request, res: Response) => {
  try {
    const userId = 2; // Hardcoded guest user for now
    const bookings = await prisma.booking.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    
    const formatted = bookings.map(b => ({
      id: b.bookingId,
      type: b.type,
      title: b.title,
      destination: b.destination,
      status: b.status,
      date: b.date,
      amount: b.amount
    }));
    
    res.json(formatted);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { type, title, destination, date, amount } = req.body;
    const userId = 2; // Hardcoded guest user
    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

    await prisma.booking.create({
      data: {
        bookingId,
        userId,
        type,
        title,
        destination,
        status: 'Pending',
        date,
        amount
      }
    });
    
    res.json({ success: true, booking_id: bookingId });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
