"use client";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

import type { Note } from "@/types/note";
import noteService from "@/lib/api";
import Pagination from "@/components/Pagination/Pagination";

import css from "./NoteList.module.css";
import Link from "next/link";

interface NoteListProps {
  tag?: string;
}

function NoteList({ tag }: NoteListProps) {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page") || 1);

  // Отримання нотаток з урахуванням тегу та сторінки
  const { data, isLoading } = useQuery({
    queryKey: ["notes", tag, page],
    queryFn: () => noteService.fetchNotes({ tag, page }),
  });

  const notes: Note[] = data?.notes || [];

  const totalPages = data?.totalPages || 1;

  // Видалення нотатки
  const mutation = useMutation({
    mutationFn: noteService.deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", tag, page] });
    },
  });

  const handleDelete = (id: string) => {
    mutation.mutate(id);
  };

  // Зміна сторінки
  const handlePageChange = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", nextPage.toString());
    router.push(`?${params.toString()}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul className={css.list}>
        {notes.map((note: Note) => (
          <li className={css.listItem} key={note.id}>
            <h2 className={css.title}>{note.title}</h2>
            <p className={css.content}>{note.content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{note.tag}</span>
              <Link href={`/notes/${note.id}`} className={css.link}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => handleDelete(note.id)}
                disabled={mutation.isPending}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default NoteList;
