// import {
//   dehydrate,
//   HydrationBoundary,
//   QueryClient,
// } from "@tanstack/react-query";

// import noteService from "@/lib/api";
// import { NOTES_PER_PAGE } from "@/lib/notesConstants";

// import NotesClient from "./Notes.client";

import { redirect } from "next/navigation";

export default async function NotesPage() {
  redirect("/notes/filter/all");
  // const queryClient = new QueryClient();

  // await queryClient.prefetchQuery({
  //   queryKey: ["notes", 1, ""],
  //   queryFn: () =>
  //     noteService.fetchNotes({
  //       page: 1,
  //       perPage: NOTES_PER_PAGE,
  //       search: "",
  //     }),
  // });

  // return (
  //   <HydrationBoundary state={dehydrate(queryClient)}>
  //     <NotesClient />
  //   </HydrationBoundary>
  // );
}
