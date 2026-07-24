import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        BackStage
      </h1>
      <p className="mt-3 text-center text-base text-muted-foreground">
        Seu novo projeto começa aqui.
      </p>
    </main>
  );
}
