import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

async function fetchNotes(
  page = 1,
  search?: string,

  tag?: string,
): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage: 12,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  // Повертаємо totalPages, total, notes
  return data;
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

async function createNote(note: CreateNoteParams): Promise<Note> {
  const { data } = await api.post<Note>("/notes", note);
  return data;
}

async function deleteNote(noteId: string): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${noteId}`);
  return data;
}

async function fetchNoteById(id: string): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);

  return data;
}

export async function fetchNotesTag(tag?: string): Promise<Note[]> {
  const params = tag && tag !== "all" ? { tag } : {};
  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
  return data.notes;
}

const noteService = {
  fetchNotes,
  createNote,
  deleteNote,
  fetchNoteById,
  fetchNotesTag,
};

export default noteService;
