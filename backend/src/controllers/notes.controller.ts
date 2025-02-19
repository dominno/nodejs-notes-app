import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createNote = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { title, content } = req.body;
    const userId = (req as any).user.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'User ID not found' });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: userId
      }
    });

    return res.status(201).json(note);
  } catch (error) {
    console.error('Create note error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getNotes = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const userId = (req as any).user.id;
    console.log('Getting notes for user:', userId);
    const notes = await prisma.note.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
    return res.json(notes);
  } catch (error) {
    console.error('Get notes error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getNote = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const note = await prisma.note.findFirst({
      where: { 
        id,
        userId // Ensure user can only access their own notes
      }
    });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.json(note);
  } catch (error) {
    console.error('Get note error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateNote = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = (req as any).user.id;

    // First check if the note exists and belongs to the user
    const existingNote = await prisma.note.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Update the note
    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content
      }
    });

    return res.json(updatedNote);
  } catch (error) {
    console.error('Update note error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteNote = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    // First check if the note exists and belongs to the user
    const existingNote = await prisma.note.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!existingNote) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Delete the note
    await prisma.note.delete({
      where: { id }
    });

    return res.status(204).send(); // 204 No Content is typical for successful DELETE
  } catch (error) {
    console.error('Delete note error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}; 