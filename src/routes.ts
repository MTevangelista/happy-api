import { Router } from 'express';

import OrphanagesController from '@controllers/OrphanagesController';

const routes = Router();

routes.get('/', (req, res) => res.json({ message: 'Hello world' }));

routes.post('/orphanages', OrphanagesController.create);

export default routes;
