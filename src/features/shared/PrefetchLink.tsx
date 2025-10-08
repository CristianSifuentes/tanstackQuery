export default function PrefetchLink({
  label,
  prefetch,
}: {
  label: string;
  prefetch: () => Promise<unknown>;
}) {
  return (
    <a
      href="#"
      onMouseEnter={() => prefetch().catch(() => {})}
      onFocus={() => prefetch().catch(() => {})}
      onClick={(e) => e.preventDefault()}
      style={{ fontSize: 14 }}
    >
      {label}
    </a>
  );
}