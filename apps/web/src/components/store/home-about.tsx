type HomeAboutProps = {
  title: string;
  text: string;
};

export function HomeAbout({ title, text }: HomeAboutProps) {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}