import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import noteService from "@/lib/api";
import NotesClient from "./Notes.client";

interface FilterPageProps {
  params: Promise<{ slug: string[] }>;
}

export const dynamic = "force-dynamic";

export default async function FilterPage({ params }: FilterPageProps) {
  const { slug } = await params;

  const tagValue = slug?.[0];
  const activeTag = !tagValue || tagValue === "all" ? undefined : tagValue;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", activeTag],
    queryFn: () => noteService.fetchNotes(1, "", activeTag),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient activeTag={activeTag} />
    </HydrationBoundary>
  );
}
