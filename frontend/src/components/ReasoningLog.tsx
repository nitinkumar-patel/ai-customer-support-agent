"use client";

import { useState } from "react";

interface LogEntry {
  step: string;
  tool: string;
  input: Record<string, unknown>;
  output: unknown;
  timestamp: string;
}

const toolStyles: Record<string, string> = {
  lookup_customer:    "border-accent/30 text-accent bg-accent/5",
  lookup_order:       "border-accent-light/30 text-accent-light bg-accent-light/5",
  check_refund_policy:"border-warning/30 text-warning bg-warning/5",
  process_refund:     "border-success/30 text-success bg-success/5",
  deny_refund:        "border-danger/30 text-danger bg-danger/5",
};

function EntryRow({ entry }: { entry: LogEntry }) {
  const [open, setOpen] = useState(false);
  const time = new Date(entry.timestamp).toLocaleTimeString();
  const color = toolStyles[entry.tool] ?? "border-border-col text-text-col-tertiary bg-background-raised";

  return (
    <div className="border border-border-col rounded overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-background-surface hover:bg-background-raised text-left transition-colors duration-150"
      >
        <span className={`text-xs font-mono px-2 py-0.5 rounded border ${color}`}>
          {entry.tool}
        </span>
        <span className="flex-1 text-sm text-text-col-secondary truncate">{entry.step}</span>
        <span className="text-xs text-text-col-tertiary font-mono">{time}</span>
        <span className="text-text-col-tertiary text-xs ml-1">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="border-t border-border-col bg-background-raised px-4 py-3 space-y-3">
          {Object.keys(entry.input).length > 0 && (
            <div>
              <p className="text-xs font-mono font-semibold text-text-col-tertiary uppercase tracking-widest mb-1.5">Input</p>
              <pre className="text-xs font-mono text-accent-light bg-background-base border border-border-col rounded p-3 overflow-auto max-h-32">
                {JSON.stringify(entry.input, null, 2)}
              </pre>
            </div>
          )}
          {entry.output !== null && entry.output !== undefined && (
            <div>
              <p className="text-xs font-mono font-semibold text-text-col-tertiary uppercase tracking-widest mb-1.5">Output</p>
              <pre className="text-xs font-mono text-accent-light bg-background-base border border-border-col rounded p-3 overflow-auto max-h-48">
                {JSON.stringify(entry.output, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ReasoningLog({ entries }: { entries: LogEntry[] }) {
  if (entries.length === 0) {
    return (
      <p className="text-sm text-text-col-tertiary font-mono italic text-center py-8">
        Agent reasoning steps will appear here…
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry, i) => (
        <EntryRow key={i} entry={entry} />
      ))}
    </div>
  );
}
