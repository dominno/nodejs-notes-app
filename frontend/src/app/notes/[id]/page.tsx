'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { noteApi } from '@/lib/api';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  const [note, setNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const data = await noteApi.getOne(params.id);
        setNote(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (error) {
        console.error('Failed to fetch note:', error);
        router.push('/notes');
      }
    };

    fetchNote();
  }, [params.id, router]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await noteApi.delete(params.id);
        router.push('/notes');
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await noteApi.update(params.id, { title, content });
      setNote({ ...note!, title, content });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update note:', error);
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="max-w-2xl">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 mb-2">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 mb-2">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded h-48"
              required
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">{note.title}</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          <div className="prose max-w-none">
            <p className="whitespace-pre-wrap">{note.content}</p>
          </div>
          <div className="mt-4 text-gray-500">
            Created: {new Date(note.createdAt).toLocaleString()}
          </div>
        </div>
      )}
    </div>
  );
} 