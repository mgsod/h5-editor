import { Router } from 'express';
import document from './document';
import uploader from './upload';
const router = Router();

router.use('/document', document);
router.use('/upload', uploader);

export default router;
