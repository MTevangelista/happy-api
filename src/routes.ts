import { Router } from 'express';

import OrphanagesController from '@controllers/OrphanagesController';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Hello world' }));
routes.get('/orphanages', OrphanagesController.index);
routes.post('/orphanages', OrphanagesController.create);

export default routes;
