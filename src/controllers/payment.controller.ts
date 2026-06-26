import { Request, Response } from 'express';

// Stubs for Payment Controller
export const createPaymentOrder = async (req: Request, res: Response) => { res.json({ message: 'Create Payment Order (Razorpay) Stub' }); };
export const verifyPayment = async (req: Request, res: Response) => { res.json({ message: 'Verify Payment Stub' }); };
export const listPayments = async (req: Request, res: Response) => { res.json({ message: 'List Payments Stub' }); };
