import axios from "axios";
import type { Note } from "../types/note";

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  total: number;
}

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  },
});

async function fetchNotes({
  page = 1,
  perPage = 12,

  tag,
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const params: Record<string, unknown> = { tag, page, perPage };

  if (tag) params.tag = tag;

  const { data } = await api.get<FetchNotesResponse>("/notes", { params });
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
