import { Router } from 'express';
import dataBase from '../model';
const route = Router();

route.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const data = await dataBase.findOne({ _id: id });
  if (!data) return next(new Error('未查询到此文档'));
  res.render('index', {
    pages: JSON.stringify(data.content.pages),
    name: data.name,
  });
});

export default route;
