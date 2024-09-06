import { IResourceItem, Action } from "@refinedev/core";

interface TitleHandlerOptions {
  resource?: IResourceItem;
  action?: Action;
  params?: Record<string, string | undefined>;
  pathname?: string;
}
export const customTitleBar = ({ pathname }: TitleHandlerOptions) => {
  let title = "Ridersz";
  if (pathname) {
    if (pathname === "/login") {
      title = "Ridersz";
    } else if (pathname === "/register") {
      title = "Ridersz";
    } else if (pathname === "/forgot-password") {
      title = "Ridersz";
    } else if (pathname === "/kanban-board-home") {
      title = "Ridersz";
    }
  }

  return title;
};
