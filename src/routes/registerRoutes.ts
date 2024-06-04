import { register } from '../controllers/authController';
import express from 'express';

const router = express.Router();

router.route('/')
  .post(register)


export default router;