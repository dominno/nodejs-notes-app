import { Router } from 'express';
import { register, login, logout, getProfile } from '../controllers/auth.controller';
import { body } from 'express-validator';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    body('name').optional().trim().escape()
  ],
  register
);

router.post('/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty()
  ],
  login
);

router.post('/logout', authMiddleware, logout);
router.get('/profile', authMiddleware, getProfile);

export default router; 