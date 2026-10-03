import type { PropsWithChildren, ReactNode } from "react";

type LegalDocumentProps = PropsWithChildren<{
  title: string;
  description: ReactNode;
  updatedAt: string;
}>;

type LegalSectionProps = PropsWithChildren<{
  id: string;
  title: string;
}>;

type LegalSubsectionProps = PropsWithChildren<{
  title: string;
}>;

export const LegalSection = ({
  id,
  title,
  children,
}: LegalSectionProps) => {
  return (
    <section
      id={id}
      className="flex scroll-mt-28 flex-col gap-4"
    >
      <h2 className="text-2xl font-bold text-neutral-900">{title}</h2>
      <div className="flex flex-col gap-4 leading-7 text-neutral-700">
        {children}
      </div>
    </section>
  );
};

export const LegalSubsection = ({
  title,
  children,
}: LegalSubsectionProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold text-neutral-900">{title}</h3>
      {children}
    </div>
  );
};

export const LegalList = ({ children }: PropsWithChildren) => {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-6 marker:text-sky-600">
      {children}
    </ul>
  );
};

const LegalDocument = ({
  title,
  description,
  updatedAt,
  children,
}: LegalDocumentProps) => {
  return (
    <main className="bg-neutral-100 px-5 py-12 md:px-10 md:py-20">
      <article className="mx-auto flex w-full max-w-5xl flex-col gap-10 rounded border border-neutral-200 bg-white p-6 shadow-sm md:p-10">
        <header className="flex flex-col gap-4 border-b border-neutral-200 pb-8">
          <span className="text-sm font-bold uppercase tracking-wider text-sky-700">
            Información legal
          </span>
          <h1 className="text-3xl font-bold text-neutral-950 md:text-5xl">
            {title}
          </h1>
          <div className="max-w-4xl text-lg leading-8 text-neutral-700">
            {description}
          </div>
          <p className="text-sm text-neutral-500">
            <strong className="font-semibold text-neutral-700">
              Última actualización:
            </strong>{" "}
            {updatedAt}
          </p>
        </header>

        <div className="flex flex-col gap-10">{children}</div>
      </article>
    </main>
  );
};

export default LegalDocument;
