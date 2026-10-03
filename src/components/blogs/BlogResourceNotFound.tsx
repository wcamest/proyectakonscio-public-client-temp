import Link from "next/link";

import Button from "@/components/ui/Button";

type Props = Readonly<{
  kind: "blog" | "post";
}>;

export default function BlogResourceNotFound({ kind }: Props) {
  const isPost = kind === "post";

  return (
    <main className="mx-auto flex min-h-[55vh] w-full max-w-3xl items-center px-5 py-12 md:py-16">
      <section
        aria-labelledby="blog-resource-not-found-title"
        className="flex w-full flex-col items-center gap-5 rounded border border-neutral-200 bg-white px-6 py-12 text-center shadow-sm md:px-10"
      >
        <span className="text-sm font-semibold uppercase tracking-wide text-blue-700">
          404 · Contenido no encontrado
        </span>
        <div className="flex max-w-xl flex-col gap-3">
          <h1
            id="blog-resource-not-found-title"
            className="text-3xl font-bold text-neutral-900 md:text-4xl"
          >
            {isPost ? "Publicación no encontrada" : "Blog no encontrado"}
          </h1>
          <p className="text-base leading-7 text-neutral-600">
            {isPost
              ? "La publicación solicitada no existe, no está publicada o ya no está disponible."
              : "El blog solicitado no existe, no está activo o ya no está disponible."}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/blogs" color="blue">
            Ver blogs disponibles
          </Button>
          <Link href="/" className="text-sm font-semibold text-neutral-600 hover:text-neutral-900 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
