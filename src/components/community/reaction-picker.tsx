"use client";

import { REACTION_TYPES } from "./types";

interface ReactionPickerProps {
  onReact: (type: string) => void;
  onClose: () => void;
}

export function ReactionPicker({ onReact, onClose }: ReactionPickerProps) {
  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />
      <div className="absolute bottom-full mb-2 right-0 bg-background border border-border rounded-full shadow-lg z-20 px-2 py-1.5 flex items-center gap-0.5 animate-in fade-in zoom-in-95 duration-150">
        {REACTION_TYPES.map((r) => (
          <button
            key={r.type}
            onClick={() => {
              onReact(r.type);
              onClose();
            }}
            className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-muted hover:scale-125 transition-all text-lg"
            title={r.label}
          >
            {r.emoji}
          </button>
        ))}
      </div>
    </>
  );
}
