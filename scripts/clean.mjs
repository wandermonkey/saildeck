import { rmSync } from "node:fs";

/**
 * Removes the .next build directory before `dev` and `build`.
 *
 * This exists because the project lives inside a OneDrive folder. OneDrive
 * holds handles on files and turns them into reparse points, which makes
 * Next.js fail with `EINVAL: readlink` on a rebuild and `ENOTEMPTY` on a
 * plain delete. Retrying handles the transient lock.
 *
 * The real fix is to move the project outside OneDrive (or exclude .next from
 * sync), after which this script is harmless and instant.
 */
try {
  rmSync(".next", { recursive: true, force: true, maxRetries: 10, retryDelay: 300 });
} catch (err) {
  // Never block dev or build on cleanup — warn and let Next.js try anyway.
  console.warn(`[clean] could not fully remove .next: ${err.code ?? err.message}`);
  console.warn("[clean] if the next command fails with EINVAL/readlink, close OneDrive or move the project out of the OneDrive folder.");
}
