import { Request, Response } from 'express';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });
import { getData } from '../utils/ajax.js';
import { Quote } from '../utils/interfaces.js';

export const getIndex = async (req: Request, res: Response): Promise<void> => {
  try {
    const quotes: Quote[] = await getData<Quote[]>('https://zenquotes.io/api/quotes');
    res.render('index', { facts: quotes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch quotes');
  }
};
