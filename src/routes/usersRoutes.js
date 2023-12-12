import { Router } from 'express';
import usersController from '../controllers/usersController';
import loginRequired from '../midlewares/loginRequired';

const route = new Router();

// desnecessarioo
route.get('/', usersController.index); // lista todos os user
route.get('/:id', usersController.show); // lista um user
//
route.post('/', usersController.store);

route.put('/:id', loginRequired, usersController.update);
route.delete('/:id', loginRequired, usersController.delete);

export default route;
