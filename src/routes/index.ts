import { Router, Request, Response } from 'express';
import { getIndex } from '../controllers/indexController.js';
import { getTagsIndex } from '../controllers/tagController.js';
import { getCategoryIndex } from '../controllers/categoryController.js';
const router: Router = Router();

router.get('/', getIndex);
router.get('/tags', getTagsIndex);
router.get('/categories', getCategoryIndex);
router.get('/about', (req: Request, res: Response) => {
  res.render('about');
});

router.get('/contact', (req: Request, res: Response) => {
  res.render('contact');
});

export default router;
