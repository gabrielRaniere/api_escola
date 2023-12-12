import { Router } from 'express';

import PicturesController from '../controllers/picturesController';

const router = new Router();

router.post('/' , PicturesController.store);

export default router;
