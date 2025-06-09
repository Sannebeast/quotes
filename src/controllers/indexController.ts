import { Request, Response } from 'express';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });
import { getData } from '../utils/ajax.js';
import { Quote } from '../utils/interfaces.js';

let firstQuotes: Quote[] | null = null;

export const getIndex = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!firstQuotes) {
      console.log('Fetching quotes for the first time...');
      firstQuotes = await getData<Quote[]>('https://zenquotes.io/api/quotes');
    } else {
      console.log('Using cached first quotes.');
    }

    res.render('index', { quotes: firstQuotes });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch quotes');
  }
};
