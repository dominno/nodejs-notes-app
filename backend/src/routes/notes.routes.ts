import express from 'express';
import { createNote, getNotes, getNote, updateNote, deleteNote } from '../controllers/notes.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { noteValidators } from '../middleware/validators';
import { rateLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

router.post('/',
  rateLimiter,
  noteValidators.createNote,
  createNote
);

router.get('/', getNotes);
router.get('/:id', getNote);

router.put('/:id',
  rateLimiter,
  noteValidators.updateNote,
  updateNote
);

router.delete('/:id',
  rateLimiter,
  deleteNote
);

export default router; 