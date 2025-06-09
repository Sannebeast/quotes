import { Request, Response } from 'express';

export const getTagsIndex = async (req: Request, res: Response): Promise<void> => {
  res.render('tags');
};
