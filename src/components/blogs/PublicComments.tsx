import type { PublicBlogComment } from "@/types/blogs";

import PublicCommentForm from "./PublicCommentForm";

type Props = Readonly<{
  blogSlug: string;
  postSlug: string;
  comments: readonly PublicBlogComment[];
  total: number;
  commentsEnabled?: boolean;
  commentsUnavailable?: boolean;
}>;

export default function PublicComments({
  blogSlug,
  postSlug,
  comments,
  total,
  commentsEnabled = true,
  commentsUnavailable = false,
}: Props) {
  const knownIds = new Set(comments.map((comment) => comment.id));

  return (
    <section className="flex flex-col gap-6 border-t border-neutral-200 pt-8" aria-labelledby="comments-title">
      <div className="flex flex-col gap-1">
        <h2 id="comments-title" className="text-2xl font-bold text-neutral-800">Comentarios</h2>
        <p className="text-sm text-neutral-500">
          {total === 0 ? "Todavía no hay comentarios publicados." : total === 1 ? "1 comentario publicado." : `${total} comentarios publicados.`}
        </p>
      </div>

      {commentsUnavailable ? (
        <div className="rounded border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          No pudimos cargar los comentarios en este momento. Puedes volver a intentarlo recargando la página.
        </div>
      ) : comments.length > 0 ? (
        <div className="flex flex-col divide-y divide-neutral-200 rounded border border-neutral-200 bg-white">
          {comments.map((comment) => {
            const isReply = comment.parentCommentId !== null && knownIds.has(comment.parentCommentId);
            return (
              <article
                key={comment.id}
                className={`flex flex-col gap-2 p-4 md:p-5 ${isReply ? "ml-5 border-l-2 border-blue-100 md:ml-10" : ""}`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <strong className="text-sm font-semibold text-neutral-800">{comment.authorName}</strong>
                  <time dateTime={comment.createdAt} className="text-xs text-neutral-400">
                    {formatCommentDate(comment.createdAt)}
                  </time>
                </div>
                {isReply ? <span className="text-xs font-medium text-blue-600">Respuesta</span> : null}
                <p className="whitespace-pre-wrap break-words text-sm leading-6 text-neutral-700">{comment.content}</p>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded border border-dashed border-neutral-300 bg-neutral-50 px-5 py-8 text-center text-sm text-neutral-600">
          No hay comentarios aprobados todavía. Puedes ser la primera persona en participar.
        </div>
      )}

      {commentsEnabled ? (
        <div className="rounded border border-neutral-200 bg-neutral-50 p-5 md:p-6">
          <div className="mb-5">
            <h3 className="text-lg font-semibold text-neutral-800">Deja un comentario</h3>
            <p className="mt-1 text-sm leading-6 text-neutral-600">
              Los comentarios se revisan antes de publicarse para mantener una conversación respetuosa y útil.
            </p>
          </div>
          <PublicCommentForm blogSlug={blogSlug} postSlug={postSlug} />
        </div>
      ) : (
        <div className="rounded border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
          Los comentarios están deshabilitados para este contenido temporal de desarrollo. Se activan automáticamente en posts publicados por el servidor.
        </div>
      )}
    </section>
  );
}

function formatCommentDate(value: string): string {
  return new Intl.DateTimeFormat("es-CO", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(value));
}
