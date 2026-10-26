import type { CharacterBaseProps } from "../charactersTypes";

export const CharacterIdentity = ({
  formData,
  patchForm,
}: CharacterBaseProps) => {
  const { identity } = formData;
  const pronounDisplay = [identity.subjectPronoun, identity.objectPronoun]
    .filter(Boolean)
    .join("/");
  const ageDisplay = identity.age ? `${identity.age} years old` : "";

  return (
    <div className="flex flex-col gap-2 mb-4">
      <input
        required
        className="bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 pb-1 transition-colors w-full"
        placeholder="Character Name"
        value={identity.name}
        onChange={(e) =>
          patchForm({ identity: { ...identity, name: e.target.value } })
        }
      />

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
          Pronouns
        </span>
        <input
          className="w-12 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-md text-xs px-2 py-1 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
          placeholder="they"
          value={identity.subjectPronoun ?? ""}
          onChange={(e) =>
            patchForm({
              identity: { ...identity, subjectPronoun: e.target.value },
            })
          }
        />
        <input
          className="w-12 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-md text-xs px-2 py-1 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
          placeholder="them"
          value={identity.objectPronoun ?? ""}
          onChange={(e) =>
            patchForm({
              identity: { ...identity, objectPronoun: e.target.value },
            })
          }
        />
        {pronounDisplay && (
          <span className="bg-cyan-100 dark:bg-cyan-800/30 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {pronounDisplay}
          </span>
        )}

        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">
          Age
        </span>
        <input
          className="w-16 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-md text-xs px-2 py-1 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
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
        {ageDisplay && (
          <span className="bg-cyan-100 dark:bg-cyan-800/30 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {ageDisplay}
          </span>
        )}
      </div>
    </div>
  );
};
