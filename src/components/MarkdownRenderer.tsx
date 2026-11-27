import React from "react";

interface MarkdownRendererProps {
  content: string;
  inverted?: boolean;
}

function renderInline(text: string, inverted: boolean): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong
          key={`b-${keyIdx++}`}
          className={
            inverted
              ? "font-bold text-white"
              : "font-bold text-saudi-ink"
          }
        >
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith("*") && token.endsWith("*")) {
      nodes.push(
        <em key={`i-${keyIdx++}`} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(
        <code
          key={`c-${keyIdx++}`}
          dir="ltr"
          className={`px-1.5 py-0.5 rounded text-[0.85em] font-mono ${
            inverted
              ? "bg-black/20 text-white"
              : "bg-saudi-subtle text-saudi-ink border border-saudi-border"
          }`}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function isTableSeparator(line: string): boolean {
  const trimmed = line.trim();
  return /^\|?(\s*:?-+:?\s*\|)+\s*:?-+:?\s*\|?$/.test(trimmed);
}

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  inverted = false,
}) => {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Fenced code block
    if (trimmed.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={`code-${blockKey++}`}
          dir="ltr"
          className="my-3 p-3.5 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono overflow-x-auto leading-relaxed"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Markdown table
    if (
      trimmed.includes("|") &&
      i + 1 < lines.length &&
      isTableSeparator(lines[i + 1])
    ) {
      const headers = parseTableRow(lines[i]);
      i += 2; // skip header and separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().includes("|")) {
        rows.push(parseTableRow(lines[i]));
        i++;
      }
      elements.push(
        <div
          key={`tbl-${blockKey++}`}
          className="my-3 overflow-x-auto rounded-xl border border-saudi-border bg-saudi-surface"
        >
          <table className="w-full text-start text-sm border-collapse">
            <thead>
              <tr className="bg-saudi-subtle/60 border-b border-saudi-border">
                {headers.map((h, idx) => (
                  <th
                    key={idx}
                    className="px-3.5 py-2.5 font-semibold text-saudi-ink whitespace-nowrap"
                  >
                    {renderInline(h, false)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr
                  key={rIdx}
                  className="border-b border-saudi-border last:border-b-0"
                >
                  {headers.map((_, cIdx) => (
                    <td
                      key={cIdx}
                      className="px-3.5 py-2.5 text-saudi-ink-secondary align-top"
                    >
                      {renderInline(row[cIdx] || "", false)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h4
          key={`h3-${blockKey++}`}
          className={`text-base font-bold mt-4 mb-1.5 ${
            inverted ? "text-white" : "text-saudi-ink"
          }`}
        >
          {renderInline(trimmed.slice(4), inverted)}
        </h4>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      elements.push(
        <h3
          key={`h2-${blockKey++}`}
          className={`text-lg font-bold mt-4 mb-2 ${
            inverted ? "text-white" : "text-saudi-ink"
          }`}
        >
          {renderInline(trimmed.slice(3), inverted)}
        </h3>
      );
      i++;
      continue;
    }
    if (trimmed.startsWith("# ")) {
      elements.push(
        <h2
          key={`h1-${blockKey++}`}
          className={`text-xl font-bold mt-4 mb-2 ${
            inverted ? "text-white" : "text-saudi-ink"
          }`}
        >
          {renderInline(trimmed.slice(2), inverted)}
        </h2>
      );
      i++;
      continue;
    }

    // Unordered list
    if (/^[-*•]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${blockKey++}`} className="my-2 space-y-1.5 ps-5 list-disc">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item, inverted)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${blockKey++}`} className="my-2 space-y-1.5 ps-5 list-decimal">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item, inverted)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      elements.push(
        <hr
          key={`hr-${blockKey++}`}
          className={
            inverted
              ? "my-3 border-white/30"
              : "my-3 border-saudi-border"
          }
        />
      );
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={`p-${blockKey++}`} className="my-1.5 leading-relaxed">
        {renderInline(trimmed, inverted)}
      </p>
    );
    i++;
  }

  return <div className="text-[15px] leading-relaxed break-words">{elements}</div>;
};
