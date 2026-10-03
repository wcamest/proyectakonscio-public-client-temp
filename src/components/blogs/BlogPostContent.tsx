import Image from "next/image";

import { PublicServerForm } from "@/components/forms/PublicServerForm";
import Paper from "@/components/ui/Paper";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { getPublicFormDefinition } from "@/lib/forms/publicForms.server";
import type {
  PublicBlogContentBlock,
  PublicBlogContentDocument,
  PublicBlogFormReferenceBlock,
} from "@/types/blogs";
import type { PublicFormDefinition } from "@/types/formsPublic";

type Props = Readonly<{
  document: PublicBlogContentDocument;
}>;

export default async function BlogPostContent({ document }: Props) {
  const formDefinitions = await loadFormDefinitions(document.blocks);

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-7">
      {document.blocks.map((block) => (
        <ContentBlock
          key={block.id}
          block={block}
          schemaVersion={document.schemaVersion}
          formDefinition={block.type === "form_reference" ? formDefinitions.get(block.formId) ?? null : null}
        />
      ))}
    </div>
  );
}

function ContentBlock({
  block,
  schemaVersion,
  formDefinition,
}: Readonly<{
  block: PublicBlogContentBlock;
  schemaVersion: 1 | 2;
  formDefinition: PublicFormDefinition | null;
}>) {
  switch (block.type) {
    case "text":
      if (schemaVersion === 1) {
        return <p className="min-w-0 max-w-full whitespace-pre-wrap break-words text-base leading-8 text-neutral-700 [overflow-wrap:anywhere]">{block.text}</p>;
      }
      return (
        <div
          className="public-rich-text min-w-0 max-w-full text-neutral-700"
          // `text` comes from the public Blog DTO. The server sanitizes schema-v2
          // Quill HTML at the public projection boundary before it reaches here.
          dangerouslySetInnerHTML={{ __html: block.text }}
        />
      );

    case "image":
      return (
        <figure className="flex min-w-0 max-w-full flex-col gap-2 overflow-hidden">
          <div className="overflow-hidden rounded border border-neutral-200 bg-neutral-50">
            <Image
              src={block.src}
              alt={block.alt}
              width={1200}
              height={800}
              className="h-auto w-full object-contain"
              loading="lazy"
              unoptimized
            />
          </div>
          {block.caption ? <figcaption className="text-sm text-neutral-500">{block.caption}</figcaption> : null}
        </figure>
      );

    case "video":
      return (
        <figure className="flex min-w-0 max-w-full flex-col gap-2 overflow-hidden">
          <VideoPlayer muted={false} poster={block.posterSrc} className="overflow-hidden rounded">
            <source src={block.src} />
          </VideoPlayer>
          {block.title ? <figcaption className="text-sm text-neutral-500">{block.title}</figcaption> : null}
        </figure>
      );

    case "form_reference":
      return (
        <Paper className="flex min-w-0 max-w-full flex-col gap-5 overflow-hidden bg-neutral-50 p-5 md:p-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-800">{block.label ?? "Formulario"}</h2>
            <p className="mt-1 text-sm text-neutral-600">Completa los campos para enviar tu solicitud.</p>
          </div>
          <PublicServerForm
            definition={formDefinition}
            submitLabel="Enviar"
            submittingLabel="Enviando..."
            successTitle="Formulario enviado"
            successMessage="Recibimos tu información correctamente."
          />
        </Paper>
      );
  }
}

async function loadFormDefinitions(
  blocks: readonly PublicBlogContentBlock[],
): Promise<ReadonlyMap<string, PublicFormDefinition | null>> {
  const formIds = [...new Set(
    blocks
      .filter((block): block is PublicBlogFormReferenceBlock => block.type === "form_reference")
      .map((block) => block.formId),
  )];

  const entries = await Promise.all(
    formIds.map(async (formId) => {
      try {
        return [formId, await getPublicFormDefinition(formId)] as const;
      } catch {
        return [formId, null] as const;
      }
    }),
  );

  return new Map(entries);
}
