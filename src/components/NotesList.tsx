
import { forwardRef } from 'react';
import { Note } from '@/types/note';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface NotesListProps {
  notes: Note[];
  activeNoteId: string | null;
  onNoteSelect: (note: Note) => void;
  onCreateNewNote: () => void;
  className?: string;
}

const NotesList = forwardRef<HTMLDivElement, NotesListProps>(({
  notes,
  activeNoteId,
  onNoteSelect,
  onCreateNewNote,
  className,
}, ref) => {
  if (!notes?.length) {
    return (
      <div 
        className={cn(
          "flex flex-col items-center justify-center p-6 text-center h-full", 
          className
        )}
        ref={ref}
      >
        <p className="text-muted-foreground mb-4">
          Você ainda não tem nenhuma nota.
        </p>
        <Button onClick={onCreateNewNote} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Criar Nota
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full", className)} ref={ref}>
      <div className="p-4 border-b">
        <Button onClick={onCreateNewNote} className="w-full flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Nota
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="divide-y">
          {notes.map((note) => (
            <div
              key={note.id}
              className={cn(
                "flex flex-col p-4 cursor-pointer transition-colors hover:bg-muted/40",
                activeNoteId === note.id && "bg-muted"
              )}
              onClick={() => onNoteSelect(note)}
            >
              <h3 className="font-medium truncate">{note.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                {note.content}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {format(new Date(note.updated_at), "d 'de' MMMM 'às' HH:mm", { locale: ptBR })}
              </p>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
});

NotesList.displayName = 'NotesList';

export default NotesList;
