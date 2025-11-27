export default function CTA({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} className="btn btn-primary w-full sm:w-auto">
      {children}
    </a>
  );
}

