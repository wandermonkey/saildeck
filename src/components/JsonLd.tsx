/**
 * Renders a schema.org JSON-LD block. Server-rendered so crawlers see it in
 * the initial HTML rather than after hydration.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Content is authored by us, not user input. Escaping "<" defends
      // against a stray sequence breaking out of the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
