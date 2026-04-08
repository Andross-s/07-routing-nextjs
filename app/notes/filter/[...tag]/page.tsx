import NoteList from "@/components/NoteList/NoteList";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ tag?: string[] }>;
}

export default async function FilterPage({ params }: Props) {
  const resolvedParams = await params;
  if (!resolvedParams.tag || resolvedParams.tag.length === 0) {
    redirect("/notes/filter/all");
  }
  const tag = resolvedParams.tag[0];

  return (
    <div>
      <NoteList tag={tag === "all" ? undefined : tag} />
    </div>
  );
}
