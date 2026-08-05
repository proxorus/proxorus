#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");
const MarkdownIt = require("markdown-it");

const SCRIPT_DIR = __dirname;
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const OUT_DIR = path.join(REPO_ROOT, "html");

const SKIP_DIRS = new Set(["node_modules", ".git", ".opencode", "html"]);

const ARTIFACT_BASENAMES = new Set([
  "CONTEXT.md",
  "CONTEXT-MAP.md",
  "onboarding-report.md",
  "scope-approval.md",
  "design-spec.md",
  "task-decomposition.md",
  "sign-off-package.md",
  "review-report.md",
  "ubiquitous-language-glossary.md",
]);

const md = new MarkdownIt({ html: false, linkify: true, typographer: true });
md.use(taskListsPlugin);

const CSS = `
  :root { color-scheme: light dark; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    color: #1f2328;
    background: #ffffff;
    padding: 0 16px 48px;
  }
  header.nav {
    max-width: 860px;
    margin: 0 auto;
    padding: 16px 0 8px;
    border-bottom: 1px solid #d8dee4;
  }
  header.nav a { color: #0969da; text-decoration: none; font-size: 14px; }
  header.nav a:hover { text-decoration: underline; }
  main {
    max-width: 860px;
    margin: 0 auto;
    padding-top: 24px;
    font-size: 16px;
  }
  h1 { font-size: 1.7em; border-bottom: 1px solid #d8dee4; padding-bottom: 0.3em; margin-top: 0; }
  h2 { font-size: 1.35em; margin-top: 1.6em; }
  h3 { font-size: 1.15em; margin-top: 1.4em; }
  a { color: #0969da; }
  a:hover { text-decoration: underline; }
  code {
    font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
    background: rgba(175, 184, 193, 0.2);
    padding: 0.15em 0.4em;
    border-radius: 6px;
    font-size: 0.9em;
  }
  pre {
    background: #f6f8fa;
    border: 1px solid #d8dee4;
    border-radius: 8px;
    padding: 16px;
    overflow-x: auto;
  }
  pre code { background: none; padding: 0; font-size: 0.9em; }
  blockquote {
    margin: 1em 0;
    padding: 0.5em 1em;
    border-left: 4px solid #d8dee4;
    color: #57606a;
    background: #f6f8fa;
    border-radius: 0 8px 8px 0;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
    font-size: 0.95em;
  }
  th, td { border: 1px solid #d8dee4; padding: 8px 12px; text-align: left; vertical-align: top; }
  th { background: #f6f8fa; font-weight: 600; }
  tr:nth-child(2n) td { background: #f6f8fa; }
  hr { border: none; border-top: 1px solid #d8dee4; margin: 2em 0; }
  ul, ol { padding-left: 1.6em; }
  li.task-list-item { list-style: none; margin-left: -1.6em; }
  .task-list-item-checkbox { margin-right: 0.4em; }
  footer {
    max-width: 860px;
    margin: 48px auto 0;
    padding-top: 16px;
    border-top: 1px solid #d8dee4;
    font-size: 13px;
    color: #57606a;
  }
  @media (prefers-color-scheme: dark) {
    body { color: #e6edf3; background: #0d1117; }
    header.nav, h1, footer, pre { border-color: #30363d; }
    header.nav a, a { color: #4493f8; }
    code { background: rgba(110, 118, 129, 0.4); }
    pre { background: #161b22; border-color: #30363d; }
    blockquote { border-color: #30363d; color: #8b949e; background: #161b22; }
    th, tr:nth-child(2n) td { background: #161b22; }
    th, td { border-color: #30363d; }
    footer { color: #8b949e; }
  }
  @media print {
    header.nav { display: none; }
    body { color: #000; background: #fff; }
    footer { display: none; }
  }
`;

function taskListsPlugin(md) {
  md.core.ruler.after("inline", "task-lists", function (state) {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
      const tok = tokens[i];
      if (tok.type !== "inline" || !tok.children || tok.children.length === 0) continue;
      const first = tok.children[0];
      if (first.type !== "text") continue;
      const text = first.content;
      if (text.indexOf("[ ] ") === 0) {
        first.content = text.slice(4);
        tok.content = tok.content.slice(4);
        addTaskCheckbox(state, i, false);
      } else if (text.indexOf("[x] ") === 0 || text.indexOf("[X] ") === 0) {
        first.content = text.slice(4);
        tok.content = tok.content.slice(4);
        addTaskCheckbox(state, i, true);
      }
    }
  });

  function addTaskCheckbox(state, inlineIndex, checked) {
    const li = findListItem(state.tokens, inlineIndex);
    if (!li) return;
    li.attrJoin("class", "task-list-item");
    const checkbox = new state.Token("html_inline", "", 0);
    checkbox.content =
      '<input class="task-list-item-checkbox" type="checkbox" disabled' +
      (checked ? " checked" : "") +
      "> ";
    state.tokens[inlineIndex].children.unshift(checkbox);
  }

  function findListItem(tokens, inlineIndex) {
    for (let i = inlineIndex; i >= 0; i--) {
      if (tokens[i].type === "list_item_open") return tokens[i];
    }
    return null;
  }
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function findArtifacts() {
  const artifacts = [];
  function walk(dir, relDir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (SKIP_DIRS.has(entry.name)) continue;
      const abs = path.join(dir, entry.name);
      const rel = relDir ? path.join(relDir, entry.name) : entry.name;
      if (entry.isDirectory()) {
        walk(abs, rel);
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        const isAdr = relDir === "docs/adr";
        if (ARTIFACT_BASENAMES.has(entry.name) || isAdr) {
          artifacts.push({ abs, rel });
        }
      }
    }
  }
  walk(REPO_ROOT, "");
  return artifacts.sort((a, b) => a.rel.localeCompare(b.rel));
}

function titleFromMd(content, fallback) {
  const m = content.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function wrapPage(title, sourceRel, indexHref, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${CSS}</style>
</head>
<body>
<header class="nav"><a href="${indexHref}">&larr; index</a></header>
<main>
${bodyHtml}
</main>
<footer>Источник: <code>${escapeHtml(sourceRel)}</code> &middot; сгенерировано ${new Date().toISOString()}</footer>
</body>
</html>`;
}

function wrapIndex(items) {
  const rows = items
    .map(
      (a) =>
        `<li><a href="${a.href}">${escapeHtml(a.title)}</a> <small><code>${escapeHtml(a.source)}</code></small></li>`
    )
    .join("\n");
  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Артефакты проекта</title>
<style>${CSS}</style>
</head>
<body>
<main>
<h1>Артефакты проекта</h1>
<p>HTML-представление артефактов, сгенерированное из markdown. Регенерируется командой <code>node .opencode/scripts/md2html.js</code>.</p>
<ul>
${rows}
</ul>
</main>
<footer>Сгенерировано ${new Date().toISOString()}</footer>
</body>
</html>`;
}

function main() {
  const artifacts = findArtifacts();
  const items = [];

  for (const artifact of artifacts) {
    const content = fs.readFileSync(artifact.abs, "utf8");
    const outRel = artifact.rel.replace(/\.md$/, ".html");
    const outAbs = path.join(OUT_DIR, outRel);
    const outRelFromRoot = outRel;
    const title = titleFromMd(content, artifact.rel);
    const bodyHtml = md.render(content);
    const indexHref = path
      .relative(path.dirname(outAbs), path.join(OUT_DIR, "index.html"))
      .split(path.sep)
      .join("/");
    fs.mkdirSync(path.dirname(outAbs), { recursive: true });
    fs.writeFileSync(outAbs, wrapPage(title, artifact.rel, indexHref, bodyHtml));
    items.push({
      title,
      source: artifact.rel,
      href: outRelFromRoot.split(path.sep).join("/"),
    });
  }

  fs.writeFileSync(path.join(OUT_DIR, "index.html"), wrapIndex(items));
  console.log(`Сгенерировано HTML: ${items.length} артефактов → ${path.relative(REPO_ROOT, OUT_DIR)}/`);
  for (const item of items) console.log(`  ${item.href} ← ${item.source}`);
}

main();
