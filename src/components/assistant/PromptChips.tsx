import { suggestedPrompts } from "../../data/prompts";

type PromptChipsProps = {
  onSelect: (prompt: string) => void;
};

export function PromptChips({ onSelect }: PromptChipsProps) {
  return (
    <div className="prompt-chip-fade mt-10 w-full max-w-[772px] overflow-visible">
      <div className="-my-3 flex gap-2.5 overflow-x-auto px-6 py-3 hide-scrollbar">
        {suggestedPrompts.map((prompt) => (
          <button
            key={prompt.prompt}
            type="button"
            className="prompt-chip fun-item glossy-tile flex-none whitespace-nowrap rounded-full border border-black/5 bg-panel px-4 py-2 text-[13.5px] font-medium text-ink transition"
            onClick={() => onSelect(prompt.prompt)}
          >
            {prompt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
