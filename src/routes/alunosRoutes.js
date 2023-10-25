import { Router } from 'express';
import AlunoController from '../controllers/alunosController';

const router = Router();

router.get('/', AlunoController.index);
router.post('/', AlunoController.create);
router.put('/:id', AlunoController.update);
router.delete('/:id', AlunoController.delete);
router.get('/search', AlunoController.show);

export default router;
