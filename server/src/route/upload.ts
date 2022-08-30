import { Router } from 'express';
import fileUploader from '../middleware/fileUploader';
const router = Router();
router.post('/', fileUploader().single('singleFile'), (req, res) => {
  res.json({
    code: 200,
    message: '上传成功',
    data: `/static/img/${(req as any).file.filename}`,
  });
});
export default router;
