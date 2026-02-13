export default function MissionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-b from-[#0E3D2F] via-[#1a5c47] to-[#0E3D2F] text-white">
      {children}
    </div>
  );
}
