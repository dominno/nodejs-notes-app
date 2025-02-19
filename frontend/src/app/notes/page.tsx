/// <reference types="react" />
'use client';

import { Suspense } from 'react';
import { noteApi } from '@/lib/api';
import NotesList from '@/components/NotesList';
import { Note } from '@/types';
import Link from 'next/link';

export default function NotesPage() {
  const handleDelete = async (id: string) => {
    try {
      await noteApi.delete(id);
      window.location.reload();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Notes</h1>
        <Link
          href="/notes/create"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Note
        </Link>
      </div>

      <Suspense fallback={<div>Loading notes...</div>}>
        <NotesList />
      </Suspense>
    </div>
  );
} 