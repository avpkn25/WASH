import express from 'express';
import loginAdmin from '../controllers/loginAdmin.js';

const router = express.Router();

router.post('/auth', loginAdmin);

export default router;