import { Router } from 'express';
import usersRoutes from './users';
import filesRoutes from './files';

const router = Router();

router.use('/users', usersRoutes);
router.use('/files', filesRoutes);

export default router;

