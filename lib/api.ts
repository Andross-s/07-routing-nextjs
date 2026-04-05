import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note } from "../types/note";
import type { Category } from "../types/category";

interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const NOTEHUB_BASE_URL = "https://notehub-public.goit.study/api";

async function fetchNotes({
  page = 1,
  perPage = 12,
  search = "",
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const params: { page: number; perPage: number; search?: string } = {
    page,
    perPage,
  };
  if (search) params.search = search;
  const response: AxiosResponse<FetchNotesResponse> = await axios.get(
    `${NOTEHUB_BASE_URL}/notes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    },
  );
  // Повертаємо totalPages, total, notes
  return {
    notes: response.data.notes,
    totalPages: response.data.totalPages,
  };
}

interface CreateNoteParams {
  title: string;
  content: string;
  tag: string;
}

async function createNote(note: CreateNoteParams): Promise<Note> {
  try {
    const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response: AxiosResponse<Note> = await axios.post(
      `${NOTEHUB_BASE_URL}/notes`,
      note,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
}

async function deleteNote(noteId: string): Promise<Note> {
  try {
    const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
    const response: AxiosResponse<Note> = await axios.delete(
      `${NOTEHUB_BASE_URL}/notes/${noteId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting note:", error);
    throw error;
  }
}

interface FetchNoteByIdParams {
  id: string;
}

async function fetchNoteById(params: FetchNoteByIdParams): Promise<Note> {
  const { id } = params;
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const response: AxiosResponse<Note> = await axios.get(
    `${NOTEHUB_BASE_URL}/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

async function getNote(tag: string): Promise<FetchNotesResponse> {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  const response = await axios.get<FetchNotesResponse>(
    `${NOTEHUB_BASE_URL}/notes`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { tag },
    },
  );
  return response.data;
}

export async function fetchNotesTag(tag?: string): Promise<Note[]> {
  const params = tag ? { tag } : {};
  const { data } = await axios.get<Note[]>(`${NOTEHUB_BASE_URL}/notes`, {
    params,
  });
  return data;
}

const noteService = {
  getNote,
  fetchNotes,
  createNote,
  deleteNote,
  fetchNoteById,
  fetchNotesTag,
};

export default noteService;
