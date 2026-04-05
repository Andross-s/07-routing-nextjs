import { ReactNode } from "react";

import css from "./LayoutNotes.module.css";

interface Props {
  children: ReactNode;
  sidebar: ReactNode;
}

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div className={css.layout}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <main className={css.main}>{children}</main>
    </div>
  );
}
