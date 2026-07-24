import { createFileRoute, redirect } from "@tanstack/react-router";

// /projetos não tem página própria: a vitrine vive na home.
export const Route = createFileRoute("/projetos/")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "projetos" });
  },
});
