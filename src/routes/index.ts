import { Router } from 'express';
import { getStats, getBookings, getAnalytics, updateBookingStatus, getPaymentReport, getOwnerDashboard } from '../controllers/admin.controller.js';
import * as authController from '../controllers/auth.controller.js';
import * as userController from '../controllers/user.controller.js';
import * as tourController from '../controllers/tour.controller.js';
import * as hotelController from '../controllers/hotel.controller.js';
import * as paymentController from '../controllers/payment.controller.js';
import * as reportController from '../controllers/report.controller.js';

const router = Router();

// --- Admin Dashboard APIs (Implemented with Prisma) ---
router.get('/admin/stats', getStats);
router.get('/admin/bookings', getBookings);
router.get('/admin/analytics', getAnalytics);
router.post('/admin/bookings/:id/status', updateBookingStatus);
router.get('/admin/payment-report', getPaymentReport);
router.get('/admin/owner-dashboard', getOwnerDashboard);

// --- Auth Routes ---
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/forgot-password', authController.forgotPassword);

// --- User Routes ---
router.get('/user/bookings', userController.getUserBookings);
router.post('/user/bookings', userController.createBooking);
router.get('/users/profile', userController.getProfile);
router.put('/users/profile', userController.updateProfile);
router.get('/users', userController.listUsers);

// --- Tour Routes ---
router.get('/tours', tourController.listPackages);
router.post('/tours', tourController.createPackage);
router.put('/tours/:id', tourController.updatePackage);
router.delete('/tours/:id', tourController.deletePackage);

// --- Hotel Routes ---
router.get('/hotels', hotelController.listHotels);
router.post('/hotels', hotelController.createHotel);
router.put('/hotels/:id', hotelController.updateHotel);
router.delete('/hotels/:id', hotelController.deleteHotel);

// --- Payment Routes ---
router.post('/payments/create', paymentController.createPaymentOrder);
router.post('/payments/verify', paymentController.verifyPayment);
router.get('/payments', paymentController.listPayments);

// --- Report Routes ---
router.get('/reports/invoice/:id', reportController.generatePdfInvoice);
router.get('/reports/excel', reportController.exportExcelReport);

export default router;
