type HomeAboutProps = {
  title: string;
  text: string;
};

export function HomeAbout({ title, text }: HomeAboutProps) {
  return (
    <section className="border-t border-(--mm-border) bg-(--mm-surface)">
      <div className="mx-auto max-w-7xl px-4 py-20">
        <div className="max-w-3xl">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.22em] text-(--mm-primary)">
            Sobre nós
          </span>

          <h2 className="mt-4 font-(--font-heading) text-5xl text-(--mm-text)">
            {title}
          </h2>

          <p className="mt-6 whitespace-pre-line text-base leading-8 text-(--mm-text-soft)">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}