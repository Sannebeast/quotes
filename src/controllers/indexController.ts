import { Request, Response } from 'express';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });
import { getData } from '../utils/ajax.js';
import { Quote } from '../utils/interfaces.js';

let randomQuotes: Quote[] | null = null;
let todayQuote: Quote | null = null;

export const getIndex = async (req: Request, res: Response): Promise<void> => {
  try {
    let quotesPromise: Promise<Quote[]>;
    let todayQuotePromise: Promise<Quote[]>;

    if (randomQuotes) {
      quotesPromise = Promise.resolve(randomQuotes);
    } else {
      quotesPromise = getData<Quote[]>('https://zenquotes.io/api/quotes');
    }

    if (todayQuote) {
      todayQuotePromise = Promise.resolve([todayQuote]);
    } else {
      todayQuotePromise = getData<Quote[]>('https://zenquotes.io/api/today');
    }

    const [quotesResult, todayResult] = await Promise.all([
      quotesPromise,
      todayQuotePromise,
    ]);

    if (!randomQuotes) {
      randomQuotes = quotesResult;
    }

    if (!todayQuote && todayResult[0]) {
      todayQuote = todayResult[0];
    }

    res.render('index', {
      quotes: randomQuotes,
      todayQuote: todayQuote,
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).send('Failed to fetch quotes');
  }
};

export const getQuoteById = (req: Request, res: Response): void => {
  const id: number = parseInt(req.params.id, 10);

  if (!randomQuotes) {
    return res.status(404).render('404');
  }

  const quote: Quote | undefined = randomQuotes[id];

  if (!quote || isNaN(id) || id < 0 || id >= randomQuotes.length) {
    return res.status(404).render('404');
  }

  res.render('show', { quote, id });
};
