import noteService from "@/lib/api";
import Modal from "@/components/Modal/Modal";
import NotePreview from "@/components/NotePreview/NotePreview";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function NoteModalPage({ params }: Props) {
  const { id } = await params;

  const res = await noteService.fetchNoteById(id);

  return (
    <Modal>
      <NotePreview note={res} />
    </Modal>
  );
}
