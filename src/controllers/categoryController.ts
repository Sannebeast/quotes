import { Request, Response } from 'express';
import { ArticleResponse } from '../utils/interfaces.js';
import * as Dotenv from 'dotenv';
Dotenv.config({ path: '.env' });
import { getDataFromAuthenticatedApi } from '../utils/ajax.js';

/**
 * All routes to the external Api are authenticated
 * using the Bearer token stored in the .env file.
 * In order to use the token safely do not
 * expose it in the client-side code.
 */

const apiUrl: string = process.env.API_URL;

export const getCategoryIndex = async (req: Request, res: Response): Promise<void> => {
  const categories: ArticleResponse = await getDataFromAuthenticatedApi(`${apiUrl}/categories`);
  console.log('🐮', categories);
  res.render('category', { categories: categories });
};
