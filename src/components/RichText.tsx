import { Fragment } from "react";

/**
 * Renders plain text with `**bold**` markers turned into <strong>.
 *
 * Used for the long-form boat descriptions so the handful of SEO-relevant
 * phrases (the model name, "yacht charter in Mumbai", the occasion keywords)
 * can be visually emphasised without writing JSX by hand for every paragraph
 * in the data file. Keep it to a few phrases per paragraph — bolding
 * everything reads as spam to both readers and Google.
 */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-navy">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
