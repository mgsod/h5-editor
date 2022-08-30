import { Router } from 'express';
import { DocumentModel, IDocument } from '../document';
import dataBase from '../model';
import { writeImgByBase64 } from '../util';
const route = Router();
// 新增
route.post('/', async (req, res) => {
  const { name, content, cover } = req.body as DocumentModel;
  const isExist = await dataBase.findOne({ name });
  if (isExist) {
    return res.json({
      code: 400,
      message: '添加失败，改文档已存在',
    });
  }
  const coverPath = await writeImgByBase64('covers', cover);
  const data = await dataBase.insert({ name, content, cover: coverPath });
  res.json({
    code: 200,
    message: '添加成功',
    data: { _id: data._id },
  });
});

// 更新
route.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, content, cover } = req.body as DocumentModel;
  const coverPath = await writeImgByBase64('covers', cover, id);
  await dataBase.update(
    { _id: id },
    { $set: { name, content, cover: coverPath } }
  );
  res.json({
    code: 200,
    message: '更新成功',
  });
});

route.get('/', async (req, res) => {
  const data = await dataBase.find({});
  // 添加预览地址
  data.forEach((item: IDocument) => {
    (item as any).previewUrl = `/preview/${item._id}`;
  });
  res.json({
    code: 200,
    message: '查询成功',
    data,
  });
});

// 查询
route.get('/:id', async (req, res) => {
  const id = req.params.id;
  const data = await dataBase.findOne({ _id: id });
  res.json({
    code: 200,
    message: '查询成功',
    data,
  });
});

route.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await dataBase.remove({ _id: id });
  res.json({
    code: 200,
    message: '删除成功',
  });
});

export default route;
