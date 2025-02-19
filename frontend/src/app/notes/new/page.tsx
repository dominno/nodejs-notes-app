import NoteForm from '@/components/NoteForm';

export default function NewNotePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Note</h1>
      <NoteForm />
    </div>
  );
} 