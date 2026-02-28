#!/usr/bin/env node
// Generate visual HTML changelog pages with rendered markdown diffs

import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";
import { basename, dirname } from "path";
import MarkdownIt from "markdown-it";
import HtmlDiff from "htmldiff-js";

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

const OUTPUT_DIR = process.argv[2] || "public/changelog";
mkdirSync(OUTPUT_DIR, { recursive: true });

function git(cmd) {
  return execSync(`git ${cmd}`, { encoding: "utf-8" }).trim();
}

function getTags() {
  const out = git("tag --sort=v:refname");
  return out ? out.split("\n") : [];
}

function getChangedFiles(refA, refB) {
  try {
    const out = git(
      `diff --name-only ${refA}..${refB} -- "content/**/*.md" ":!content/index.md"`,
    );
    return out ? out.split("\n") : [];
  } catch {
    return [];
  }
}

function getFileContent(ref, path) {
  try {
    return execSync(`git show ${ref}:"${path}" 2>/dev/null`, {
      encoding: "utf-8",
    });
  } catch {
    return "";
  }
}

function stripFrontmatter(content) {
  const match = content.match(/^---\n[\s\S]*?\n---\n/);
  return match ? content.slice(match[0].length) : content;
}

function renderMarkdown(content) {
  if (!content) return "";
  const stripped = stripFrontmatter(content);
  // Handle Obsidian wiki links: [[Page]] → Page, [[Page|Alias]] → Alias
  const processed = stripped.replace(
    /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (_, target, alias) => alias || target,
  );
  return md.render(processed);
}

function generateDiffPage(title, fileDiffs) {
  const sections = fileDiffs
    .map(({ file, htmlDiff, status }) => {
      const pageName = basename(file, ".md");
      const folder = basename(dirname(file));
      const statusBadge =
        status === "new"
          ? '<span class="badge new">Nuovo</span>'
          : status === "deleted"
            ? '<span class="badge deleted">Rimosso</span>'
            : '<span class="badge modified">Modificato</span>';

      return `
    <section class="file-diff">
      <h2>${folder} / ${pageName} ${statusBadge}</h2>
      <div class="diff-content">${htmlDiff}</div>
    </section>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Carta Cartorum</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 900px;
      margin: 0 auto;
      padding: 20px;
      background: #1a1a2e;
      color: #e0e0e0;
      line-height: 1.6;
    }
    h1 { color: #e2b714; margin-bottom: 4px; }
    .subtitle { color: #888; margin-bottom: 30px; }
    .file-diff {
      background: #16213e;
      border-radius: 8px;
      padding: 20px 24px;
      margin-bottom: 20px;
      border: 1px solid #2a2a4a;
    }
    .file-diff h2 {
      color: #7eb8da;
      font-size: 1.1em;
      margin-top: 0;
      padding-bottom: 10px;
      border-bottom: 1px solid #2a2a4a;
    }
    .badge {
      font-size: 0.7em;
      padding: 2px 8px;
      border-radius: 4px;
      vertical-align: middle;
      font-weight: normal;
    }
    .badge.new { background: #1b4332; color: #95d5b2; }
    .badge.deleted { background: #3d0000; color: #ff6b6b; }
    .badge.modified { background: #1a3a5c; color: #7eb8da; }
    .diff-content {
      font-size: 0.95em;
      overflow-wrap: break-word;
    }
    .diff-content h1, .diff-content h2, .diff-content h3 {
      color: #c9a227;
    }
    .diff-content a { color: #7eb8da; }
    .diff-content ins {
      background: #1b4332;
      color: #95d5b2;
      text-decoration: none;
      padding: 1px 3px;
      border-radius: 3px;
    }
    .diff-content del {
      background: #3d0000;
      color: #ff6b6b;
      text-decoration: line-through;
      padding: 1px 3px;
      border-radius: 3px;
    }
    .diff-content img { max-width: 100%; }
    .diff-content table {
      border-collapse: collapse;
      width: 100%;
      margin: 10px 0;
    }
    .diff-content th, .diff-content td {
      border: 1px solid #2a2a4a;
      padding: 6px 10px;
      text-align: left;
    }
    .diff-content th { background: #1a3a5c; }
    .diff-content blockquote {
      border-left: 3px solid #e2b714;
      margin-left: 0;
      padding-left: 16px;
      color: #bbb;
    }
    .diff-content ul, .diff-content ol { padding-left: 24px; }
    .back {
      display: inline-block;
      margin-top: 20px;
      font-size: 0.9em;
      color: #888;
      text-decoration: none;
    }
    .back:hover { color: #7eb8da; }
    .nav { display: flex; gap: 20px; margin-top: 20px; }
  </style>
</head>
<body>
  <h1>${title}</h1>
  <p class="subtitle">Modifiche apportate in questa versione</p>
  ${sections}
  <div class="nav">
    <a class="back" href="./index.html">&larr; Tutti i changelog</a>
    <a class="back" href="/">&larr; Torna alla wiki</a>
  </div>
</body>
</html>`;
}

function generateIndexPage(versions) {
  const items = versions
    .reverse()
    .map((v) => `    <li><a href="${v}.html">${v}</a></li>`)
    .join("\n");

  return `<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Changelog - Carta Cartorum</title>
  <style>
    body {
      font-family: system-ui, -apple-system, sans-serif;
      max-width: 600px;
      margin: 40px auto;
      padding: 0 20px;
      background: #1a1a2e;
      color: #e0e0e0;
    }
    h1 { color: #e2b714; }
    a {
      color: #7eb8da;
      text-decoration: none;
      font-size: 1.1em;
    }
    a:hover { text-decoration: underline; }
    ul { list-style: none; padding: 0; }
    li {
      padding: 8px 0;
      border-bottom: 1px solid #2a2a4a;
    }
    .back {
      display: inline-block;
      margin-top: 20px;
      font-size: 0.9em;
      color: #888;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <h1>Changelog</h1>
  <p>Storico delle modifiche alla wiki.</p>
  <ul>
${items}
  </ul>
  <a class="back" href="/">&larr; Torna alla wiki</a>
</body>
</html>`;
}

// Main
const tags = getTags();
if (tags.length < 1) {
  console.log("No tags found, skipping changelog generation.");
  process.exit(0);
}

console.log(`Found ${tags.length} tags: ${tags.join(", ")}`);

const generated = [];

// Generate diffs for each consecutive tag pair
for (let i = 0; i < tags.length - 1; i++) {
  const tagFrom = tags[i];
  const tagTo = tags[i + 1];
  const files = getChangedFiles(tagFrom, tagTo);

  if (files.length === 0) {
    console.log(`No content changes between ${tagFrom} and ${tagTo}, skipping.`);
    continue;
  }

  console.log(`Generating changelog for ${tagTo} (${tagFrom} → ${tagTo})...`);

  const fileDiffs = [];
  for (const file of files) {
    const before = getFileContent(tagFrom, file);
    const after = getFileContent(tagTo, file);
    const htmlBefore = renderMarkdown(before);
    const htmlAfter = renderMarkdown(after);

    let status = "modified";
    if (!before) status = "new";
    else if (!after) status = "deleted";

    let htmlDiff;
    if (status === "new") {
      htmlDiff = `<ins>${htmlAfter}</ins>`;
    } else if (status === "deleted") {
      htmlDiff = `<del>${htmlBefore}</del>`;
    } else {
      htmlDiff = HtmlDiff.default.execute(htmlBefore, htmlAfter);
    }

    fileDiffs.push({ file, htmlDiff, status });
  }

  const page = generateDiffPage(`Changelog ${tagTo}`, fileDiffs);
  writeFileSync(`${OUTPUT_DIR}/${tagTo}.html`, page);
  generated.push(tagTo);
}

// Generate diff from latest tag to HEAD
const latestTag = tags[tags.length - 1];
const headFiles = getChangedFiles(latestTag, "HEAD");

if (headFiles.length > 0) {
  const minor = parseInt(latestTag.replace(/v0\.(\d+)\..*/, "$1"));
  const nextTag = `v0.${minor + 1}.0`;

  console.log(`Generating changelog for ${nextTag} (${latestTag} → HEAD)...`);

  const fileDiffs = [];
  for (const file of headFiles) {
    const before = getFileContent(latestTag, file);
    const after = getFileContent("HEAD", file);
    const htmlBefore = renderMarkdown(before);
    const htmlAfter = renderMarkdown(after);

    let status = "modified";
    if (!before) status = "new";
    else if (!after) status = "deleted";

    let htmlDiff;
    if (status === "new") {
      htmlDiff = `<ins>${htmlAfter}</ins>`;
    } else if (status === "deleted") {
      htmlDiff = `<del>${htmlBefore}</del>`;
    } else {
      htmlDiff = HtmlDiff.default.execute(htmlBefore, htmlAfter);
    }

    fileDiffs.push({ file, htmlDiff, status });
  }

  const page = generateDiffPage(`Changelog ${nextTag}`, fileDiffs);
  writeFileSync(`${OUTPUT_DIR}/${nextTag}.html`, page);
  generated.push(nextTag);
}

// Generate index page
writeFileSync(`${OUTPUT_DIR}/index.html`, generateIndexPage([...generated]));

console.log(`Done. Generated ${generated.length} changelog(s) in ${OUTPUT_DIR}/`);
