import noteService from "@/lib/api";
import NoteList from "@/components/NoteList/NoteList";

interface Props {
  params: Promise<{ tag?: string[] }>;
}

export default async function FilterPage({ params }: Props) {
  const { tag } = await params;

  // "all" або відсутній — без фільтрації
  const activeTag = tag?.[0] === "all" || !tag?.[0] ? undefined : tag[0];

  const notes = await noteService.fetchNotesTag(activeTag);

  return <NoteList notes={notes} />;
}
