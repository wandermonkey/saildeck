import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders plain text with two lightweight markers turned into real elements:
 *
 *  - `**bold**`      → <strong> — for the handful of SEO-relevant phrases
 *  - `[text](/path)` → an internal <Link>, or an external <a> if the URL
 *                       starts with `http`
 *
 * This lets data files (yacht descriptions, blog posts) carry emphasis and
 * internal links as plain strings instead of JSX, which is what makes it
 * practical to write dozens of long-form pages as data rather than components.
 * Keep it sparing — a paragraph that is half bold or all links reads as spam
 * to both readers and Google.
 */
export function RichText({ text }: { text: string }) {
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(pattern);

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

        const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
        if (linkMatch) {
          const [, label, href] = linkMatch;
          const external = /^https?:\/\//.test(href);
          const className = "font-medium text-crimson underline decoration-crimson/30 underline-offset-2 hover:decoration-crimson";
          return external ? (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={className}>
              {label}
            </a>
          ) : (
            <Link key={i} href={href} className={className}>
              {label}
            </Link>
          );
        }

        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
