
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Note, CreateNoteInput, UpdateNoteInput } from '@/types/note';
import { useToast } from '@/components/ui/use-toast';

export function useNotes() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeNote, setActiveNote] = useState<Note | null>(null);

  // Fetch all notes for the current user
  const { 
    data: notes, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['notes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('updated_at', { ascending: false });
      
      if (error) throw error;
      return data as Note[];
    }
  });

  // Create a new note
  const createNoteMutation = useMutation({
    mutationFn: async (noteInput: CreateNoteInput) => {
      const { data, error } = await supabase
        .from('notes')
        .insert(noteInput)
        .select()
        .single();
      
      if (error) throw error;
      return data as Note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast({
        title: "Nota criada",
        description: "Sua nota foi criada com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao criar nota",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Update an existing note
  const updateNoteMutation = useMutation({
    mutationFn: async ({ id, ...noteInput }: { id: string } & UpdateNoteInput) => {
      const { data, error } = await supabase
        .from('notes')
        .update(noteInput)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Note;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast({
        title: "Nota atualizada",
        description: "Sua nota foi atualizada com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao atualizar nota",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Delete a note
  const deleteNoteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      if (activeNote?.id === id) {
        setActiveNote(null);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast({
        title: "Nota excluída",
        description: "Sua nota foi excluída com sucesso.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Erro ao excluir nota",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  return {
    notes,
    isLoading,
    error,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    activeNote,
    setActiveNote,
    createNoteLoading: createNoteMutation.isPending,
    updateNoteLoading: updateNoteMutation.isPending,
    deleteNoteLoading: deleteNoteMutation.isPending,
  };
}
