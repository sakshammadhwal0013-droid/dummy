import { Request, Response } from 'express';

// Stubs for Tour Controller
export const listPackages = async (req: Request, res: Response) => { res.json({ message: 'List Tour Packages Stub' }); };
export const createPackage = async (req: Request, res: Response) => { res.json({ message: 'Create Tour Package Stub' }); };
export const updatePackage = async (req: Request, res: Response) => { res.json({ message: 'Update Tour Package Stub' }); };
export const deletePackage = async (req: Request, res: Response) => { res.json({ message: 'Delete Tour Package Stub' }); };
