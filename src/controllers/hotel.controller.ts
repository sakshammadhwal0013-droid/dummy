import { Request, Response } from 'express';

// Stubs for Hotel Controller
export const listHotels = async (req: Request, res: Response) => { res.json({ message: 'List Hotels Stub' }); };
export const createHotel = async (req: Request, res: Response) => { res.json({ message: 'Create Hotel Stub' }); };
export const updateHotel = async (req: Request, res: Response) => { res.json({ message: 'Update Hotel Stub' }); };
export const deleteHotel = async (req: Request, res: Response) => { res.json({ message: 'Delete Hotel Stub' }); };
