import { Router } from 'express';
import AlunoController from '../controllers/alunosController';
import loginRequired from '../midlewares/loginRequired';

const router = Router();

router.get('/', AlunoController.index);
router.post('/', loginRequired,  AlunoController.create);
router.put('/:id',loginRequired,  AlunoController.update);
router.delete('/:id',loginRequired,  AlunoController.delete);
router.get('/:id', loginRequired,  AlunoController.show);

export default router;
