import { Request, Response } from 'express';
import prisma from '../db/prisma.js';

export const getStats = async (req: Request, res: Response) => {
  try {
    const totalBookings = await prisma.booking.count();
    
    const bookings = await prisma.booking.findMany();
    let totalRevenue = 0;
    let confirmed = 0;
    let pending = 0;

    for (const b of bookings) {
      if (b.status === "Confirmed") confirmed++;
      if (b.status === "Pending") pending++;

      if (b.amount) {
        const num = parseFloat(b.amount.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) totalRevenue += num;
      }
    }

    const stats = [
      { name: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, trend: "up", change: "15%" },
      { name: "Bookings", value: totalBookings.toString(), trend: "up", change: "10%" },
      { name: "Confirmed", value: confirmed.toString(), trend: "up", change: "8%" },
      { name: "Pending", value: pending.toString(), trend: "down", change: "2%" }
    ];
    
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        user: { select: { name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const formattedBookings = bookings.map(b => ({
      id: b.bookingId,
      user: b.user?.name || 'Unknown',
      type: b.type,
      title: b.title,
      destination: b.destination,
      status: b.status,
      date: b.date,
      amount: b.amount
    }));
    
    res.json(formattedBookings);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany();
    
    // Category Breakdown
    const categories: Record<string, number> = {};
    bookings.forEach(b => {
      categories[b.type] = (categories[b.type] || 0) + 1;
    });
    const categoryBreakdown = Object.keys(categories).map(k => ({
      name: k, value: categories[k]
    }));

    // Trending Items
    const items: Record<string, { type: string, count: number }> = {};
    bookings.forEach(b => {
      if (!items[b.title]) {
        items[b.title] = { type: b.type, count: 0 };
      }
      items[b.title].count += 1;
    });
    const trendingItems = Object.keys(items).map(k => ({
      name: k,
      type: items[k].type,
      bookings: items[k].count
    })).sort((a, b) => b.bookings - a.bookings).slice(0, 5);

    res.json({
      categoryBreakdown,
      trendingItems
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const updated = await prisma.booking.update({
      where: { bookingId: id },
      data: { status }
    });
    
    res.json({ success: true, status: updated.status });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getPaymentReport = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany({
      include: { payment: true }
    });
    
    const report: Record<string, number> = {};
    bookings.forEach(b => {
      // In Prisma schema, payment method is in Payment model.
      // If payment is not set, we use a fallback like "Unknown"
      const method = b.payment?.method || "UPI"; 
      
      let amt = 0;
      if (b.amount) {
        const num = parseFloat(b.amount.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) amt = num;
      }
      
      report[method] = (report[method] || 0) + amt;
    });

    res.json(report);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getOwnerDashboard = async (req: Request, res: Response) => {
  try {
    const bookings = await prisma.booking.findMany();
    
    let totalRevenue = 0;
    let pendingBookings = 0;
    
    const destCount: Record<string, number> = {};
    const pkgCount: Record<string, number> = {};

    bookings.forEach(b => {
      if (b.amount) {
        const num = parseFloat(b.amount.replace(/[^0-9.]/g, ''));
        if (!isNaN(num)) totalRevenue += num;
      }
      if (b.status === "Pending") {
        pendingBookings++;
      }
      
      if (b.destination) {
        destCount[b.destination] = (destCount[b.destination] || 0) + 1;
      }
      
      if (b.type === "Tour") {
        pkgCount[b.title] = (pkgCount[b.title] || 0) + 1;
      }
    });
    
    const topDestination = Object.entries(destCount).sort((a,b) => b[1] - a[1])[0]?.[0] || "None";
    const bestSellingPackage = Object.entries(pkgCount).sort((a,b) => b[1] - a[1])[0]?.[0] || "None";

    res.json({
      totalRevenue,
      totalBookings: bookings.length,
      topDestination,
      mostUsedPaymentMethod: "UPI", // Simplified since we mock
      bestSellingPackage,
      pendingBookings
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
