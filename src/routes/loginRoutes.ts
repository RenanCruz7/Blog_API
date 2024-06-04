import { login } from '../controllers/authController';
import express from 'express';

const router = express.Router();

router.route('/')
  .post(login)


export default router;