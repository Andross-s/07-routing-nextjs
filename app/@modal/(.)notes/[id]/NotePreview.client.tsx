import { Note } from "@/types/note";
import css from "./NotePreview.module.css";

interface Props {
  note: Note;
}

export default function NotePreview({ note }: Props) {
  console.log("NOTE PREVIEW RENDERED");
  return (
    <div className={css.preview}>
      <h2 className={css.title}>{note.title}</h2>
      {note.tag && <span className={css.tag}>{note.tag}</span>}
      <p className={css.content}>{note.content}</p>
    </div>
  );
}
