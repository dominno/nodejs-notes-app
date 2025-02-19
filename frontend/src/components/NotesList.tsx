'use client';

import { useEffect, useState } from 'react';
import { noteApi } from '@/lib/api';
import Link from 'next/link';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await noteApi.getAll();
        setNotes(data);
      } catch (error) {
        console.error('Failed to fetch notes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (loading) {
    return <div>Loading notes...</div>;
  }

  if (notes.length === 0) {
    return <div className="text-gray-500">No notes yet. Create your first note!</div>;
  }

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <Link
          key={note.id}
          href={`/notes/${note.id}`}
          className="p-4 border rounded-lg hover:shadow-md transition-shadow"
        >
          <h3 className="font-bold mb-2">{note.title}</h3>
          <p className="text-gray-600 line-clamp-3">{note.content}</p>
          <div className="text-sm text-gray-400 mt-2">
            {new Date(note.createdAt).toLocaleDateString()}
          </div>
        </Link>
      ))}
    </div>
  );
} 