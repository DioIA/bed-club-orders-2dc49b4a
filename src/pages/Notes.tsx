
import { useState } from 'react';
import { useNotes } from '@/hooks/useNotes';
import NotesList from '@/components/NotesList';
import NoteEditor from '@/components/NoteEditor';
import { Note } from '@/types/note';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

const Notes = () => {
  const { 
    notes, 
    isLoading, 
    activeNote, 
    setActiveNote, 
    createNote,
    updateNote,
    deleteNote,
    createNoteLoading,
    updateNoteLoading,
    deleteNoteLoading
  } = useNotes();

  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);

  const handleCreateNoteClick = () => {
    setActiveNote(null);
    setIsCreatingNote(true);
  };

  const handleCreateNote = (values: { title: string; content: string }) => {
    createNote(values, {
      onSuccess: () => {
        setIsCreatingNote(false);
      }
    });
  };

  const handleUpdateNote = (values: { title: string; content: string }) => {
    if (activeNote) {
      updateNote({
        id: activeNote.id,
        ...values
      });
    }
  };

  const handleDeleteNoteConfirm = () => {
    if (noteToDelete) {
      deleteNote(noteToDelete.id);
      setNoteToDelete(null);
    }
  };

  const handleCancelEdit = () => {
    setIsCreatingNote(false);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 pb-2">
        <h1 className="text-3xl font-bold">Minhas Notas</h1>
        <p className="text-muted-foreground">Crie e gerencie suas notas pessoais</p>
      </div>

      <div className="flex flex-1 overflow-hidden p-6 pt-2 gap-6">
        <div className="w-1/3 border rounded-lg overflow-hidden shadow-sm">
          <NotesList 
            notes={notes || []} 
            activeNoteId={activeNote?.id || null}
            onNoteSelect={setActiveNote}
            onCreateNewNote={handleCreateNoteClick}
          />
        </div>

        <div className="w-2/3 border rounded-lg p-6 shadow-sm">
          {isCreatingNote ? (
            <div>
              <h2 className="text-xl font-bold mb-4">Nova Nota</h2>
              <NoteEditor
                note={null}
                onSave={handleCreateNote}
                onCancel={handleCancelEdit}
                isLoading={createNoteLoading}
                isNew={true}
              />
            </div>
          ) : activeNote ? (
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold truncate">
                  {activeNote.title}
                </h2>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setNoteToDelete(activeNote)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir nota</AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza de que deseja excluir esta nota? Esta ação não pode ser desfeita.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteNoteConfirm}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        disabled={deleteNoteLoading}
                      >
                        {deleteNoteLoading && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <ScrollArea className="flex-1">
                <NoteEditor
                  note={activeNote}
                  onSave={handleUpdateNote}
                  onCancel={() => setActiveNote(null)}
                  isLoading={updateNoteLoading}
                />
              </ScrollArea>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="text-muted-foreground mb-4">
                {notes?.length 
                  ? "Selecione uma nota para visualizar ou editar" 
                  : "Comece criando sua primeira nota"}
              </p>
              <Button onClick={handleCreateNoteClick}>
                Criar Nova Nota
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
