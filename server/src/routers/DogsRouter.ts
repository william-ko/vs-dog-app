
import { Router } from 'express';
import { DogsController } from '../controllers/DogsController';

const router: Router = Router();
const dogController: DogsController = new DogsController();

router.get('/api/dogs', dogController.getAll.bind(dogController));
router.get('/api/dog/:id', dogController.getById.bind(dogController));
router.put('/api/dog/:id', dogController.update.bind(dogController));
router.post('/api/dog', dogController.create.bind(dogController));
router.delete('/api/dog/:id', dogController.delete.bind(dogController))

export default router;