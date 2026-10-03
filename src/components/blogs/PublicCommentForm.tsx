"use client";

import { useState, type FormEvent } from "react";

import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormField from "@/components/ui/FormField";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/TextArea";
import { useToast } from "@/providers/ToastProvider";
import {
  reportPublicApiResponseFailure,
  reportPublicFetchFailure,
  reportPublicMalformedResponse,
} from "@/features/observability/client/reporter";
import type {
  PublicBlogCommentSubmission,
  PublicBlogCommentSubmissionAccepted,
} from "@/types/blogs";

type Props = Readonly<{
  blogSlug: string;
  postSlug: string;
}>;

type Draft = Readonly<{
  authorName: string;
  authorEmail: string;
  content: string;
}>;

const EMPTY_DRAFT: Draft = Object.freeze({ authorName: "", authorEmail: "", content: "" });

export default function PublicCommentForm({ blogSlug, postSlug }: Props) {
  const { showToast } = useToast();
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting) return;

    const payload: PublicBlogCommentSubmission = {
      authorName: draft.authorName.trim(),
      authorEmail: draft.authorEmail.trim(),
      content: draft.content.trim(),
    };

    if (payload.authorName.length === 0 || payload.authorEmail.length === 0 || payload.content.length === 0) {
      showToast({
        tone: "error",
        title: "Completa los campos",
        message: "Nombre, correo y comentario son obligatorios.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const path = `/api/public/blogs/${encodeURIComponent(blogSlug)}/posts/${encodeURIComponent(postSlug)}/comments`;
      const init: RequestInit = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "omit",
        cache: "no-store",
        body: JSON.stringify(payload),
      };
      let response: Response;
      try {
        response = await fetch(path, init);
      } catch (error) {
        reportPublicFetchFailure(path, init, error);
        throw error;
      }

      if (!response.ok) {
        reportPublicApiResponseFailure(path, response, "POST");
        showToast(feedbackForResponse(response));
        return;
      }

      let body: unknown;
      try {
        body = await response.json();
      } catch (error) {
        reportPublicMalformedResponse(path, response, error, "POST");
        showToast({
          tone: "error",
          title: "No pudimos confirmar el comentario",
          message: "El servidor respondió de una forma inesperada. Inténtalo nuevamente.",
        });
        return;
      }
      if (!isAccepted(body)) {
        reportPublicMalformedResponse(path, response, new Error("Public comment response contract mismatch"), "POST");
        showToast({
          tone: "error",
          title: "No pudimos confirmar el comentario",
          message: "El servidor respondió de una forma inesperada. Inténtalo nuevamente.",
        });
        return;
      }

      setDraft(EMPTY_DRAFT);
      showToast({
        tone: "success",
        title: "Comentario recibido",
        message: "Tu comentario quedó pendiente de moderación. Aparecerá aquí cuando sea aprobado.",
      });
    } catch {
      showToast({
        tone: "error",
        title: "No se pudo enviar",
        message: "No pudimos comunicarnos con el servidor. Revisa tu conexión e inténtalo nuevamente.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={submit} className="gap-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <FormField label="Nombre" htmlFor="blog-comment-name" required>
          <Input
            id="blog-comment-name"
            name="authorName"
            autoComplete="name"
            maxLength={160}
            required
            disabled={submitting}
            value={draft.authorName}
            onChange={(event) => setDraft((current) => ({ ...current, authorName: event.target.value }))}
          />
        </FormField>

        <FormField
          label="Correo"
          htmlFor="blog-comment-email"
          required
          info="No se mostrará públicamente."
        >
          <Input
            id="blog-comment-email"
            name="authorEmail"
            type="email"
            autoComplete="email"
            maxLength={320}
            required
            disabled={submitting}
            value={draft.authorEmail}
            onChange={(event) => setDraft((current) => ({ ...current, authorEmail: event.target.value }))}
          />
        </FormField>
      </div>

      <FormField
        label="Comentario"
        htmlFor="blog-comment-content"
        required
        info="Se publica únicamente después de moderación. No se admite HTML."
      >
        <TextArea
          id="blog-comment-content"
          name="content"
          rows={5}
          maxLength={10_000}
          required
          disabled={submitting}
          value={draft.content}
          onChange={(event) => setDraft((current) => ({ ...current, content: event.target.value }))}
        />
      </FormField>

      <div>
        <Button type="submit" disabled={submitting}>
          {submitting ? "Enviando..." : "Enviar comentario"}
        </Button>
      </div>
    </Form>
  );
}

function feedbackForResponse(response: Response) {
  switch (response.status) {
    case 400:
      return { tone: "error" as const, title: "Revisa el comentario", message: "Los datos enviados no cumplen las reglas del formulario." };
    case 403:
      return { tone: "error" as const, title: "Solicitud no permitida", message: "Recarga la página e inténtalo nuevamente desde este sitio." };
    case 404:
      return { tone: "error" as const, title: "Publicación no disponible", message: "Este artículo ya no está disponible para recibir comentarios." };
    case 409:
      return { tone: "error" as const, title: "No se pudo completar", message: "El artículo cambió mientras enviabas el comentario. Recarga la página e inténtalo de nuevo." };
    case 413:
      return { tone: "error" as const, title: "Comentario demasiado grande", message: "Reduce el contenido antes de volver a enviarlo." };
    case 415:
      return { tone: "error" as const, title: "Formato no admitido", message: "No pudimos procesar el comentario enviado." };
    case 429: {
      const retryAfter = Number(response.headers.get("retry-after"));
      const wait = Number.isFinite(retryAfter) && retryAfter > 0
        ? ` Espera aproximadamente ${Math.ceil(retryAfter)} segundos.`
        : " Espera un momento antes de intentarlo otra vez.";
      return { tone: "warning" as const, title: "Demasiados intentos", message: `Se alcanzó temporalmente el límite de comentarios.${wait}` };
    }
    default:
      return { tone: "error" as const, title: "No se pudo enviar", message: "Ocurrió un problema al procesar el comentario. Inténtalo nuevamente." };
  }
}

function isAccepted(value: unknown): value is PublicBlogCommentSubmissionAccepted {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<PublicBlogCommentSubmissionAccepted>;
  return typeof candidate.commentId === "string" && candidate.commentId.length > 0 && candidate.status === "pending";
}
