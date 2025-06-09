import { Router, Request, Response } from 'express';
import { getIndex, getQuoteById } from '../controllers/indexController.js';
const router: Router = Router();

router.get('/', getIndex);
router.get('/quotes/:id', getQuoteById);
router.get('/about', (req: Request, res: Response) => {
  res.render('about');
});

router.get('/contact', (req: Request, res: Response) => {
  res.render('contact');
});

export default router;
