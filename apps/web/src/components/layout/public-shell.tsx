type PublicShellProps = {
  children: React.ReactNode;
};

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <main>{children}</main>
    </div>
  );
}