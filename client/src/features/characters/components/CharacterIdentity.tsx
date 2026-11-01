import type { CharacterBaseProps } from "../charactersTypes";

const INPUT =
  "bg-white dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/50 rounded-md text-xs px-2 py-1 text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-emerald-400 dark:focus:border-emerald-500 transition-colors";

export const CharacterIdentity = ({
  formData,
  patchForm,
  summary,
}: CharacterBaseProps & { summary: string }) => {
  const { identity } = formData;

  return (
    <div className="flex flex-col gap-1.5">
      <input
        required
        className="bg-transparent border-0 border-b-2 border-stone-200 dark:border-stone-700 text-2xl md:text-3xl font-extrabold text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-400 pb-1 transition-colors w-full"
        placeholder="Character Name"
        value={identity.name}
        onChange={(e) =>
          patchForm({ identity: { ...identity, name: e.target.value } })
        }
      />

      {summary && (
        <p className="text-sm font-semibold text-stone-500 dark:text-stone-400">
          {summary}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500">
          Pronouns
        </span>
        <input
          className={`${INPUT} w-14`}
          placeholder="they"
          value={identity.subjectPronoun ?? ""}
          onChange={(e) =>
            patchForm({
              identity: { ...identity, subjectPronoun: e.target.value },
            })
          }
        />
        <input
          className={`${INPUT} w-14`}
          placeholder="them"
          value={identity.objectPronoun ?? ""}
          onChange={(e) =>
            patchForm({
              identity: { ...identity, objectPronoun: e.target.value },
            })
          }
        />

        <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 ml-2">
          Age
        </span>
        <input
          className={`${INPUT} w-16`}
          placeholder="—"
          type="number"
          min={0}
          value={identity.age ?? ""}
          onChange={(e) =>
            patchForm({
              identity: {
                ...identity,
                age: e.target.value === "" ? undefined : Number(e.target.value),
              },
            })
          }
        />
      </div>
    </div>
  );
};
