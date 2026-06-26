import { Request, Response } from 'express';

// Stubs for Auth Controller
export const register = async (req: Request, res: Response) => { res.json({ message: 'Auth Register Endpoint Stub' }); };
export const login = async (req: Request, res: Response) => { res.json({ message: 'Auth Login Endpoint Stub' }); };
export const forgotPassword = async (req: Request, res: Response) => { res.json({ message: 'Auth Forgot Password Endpoint Stub' }); };
