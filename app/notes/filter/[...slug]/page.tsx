import NoteList from "@/components/NoteList/NoteList";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function FilterPage({ params }: Props) {
  const resolvedParams = await params;
  if (!resolvedParams.slug || resolvedParams.slug.length === 0) {
    redirect("/notes/filter/all");
  }
  const slug = resolvedParams.slug[0];

  return (
    <div>
      <NoteList tag={slug === "all" ? undefined : slug} />
    </div>
  );
}
