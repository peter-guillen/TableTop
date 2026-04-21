export const CharacterIdentity = ({ state, updateInput }) => {
  const pronounDisplay = [state.subPronoun, state.objPronoun]
    .filter(Boolean)
    .join("/");
  const ageDisplay = state.age ? `${state.age} years old` : "";
  return (
    <div className="grid grid-cols-[120px_1fr] gap-4 mb-4 items-start">
      <label className="cursor-pointer group">
        <div className="w-[120px] h-[120px] rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-100 dark:bg-slate-800/50 flex flex-col items-center justify-center gap-2 group-hover:border-cyan-400 dark:group-hover:border-cyan-500 transition-colors overflow-hidden">
          {state.portrait ? (
            <img
              src={state.portrait}
              alt="Portrait"
              className="w-full h-full object-cover"
            />
          ) : (
            <>
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-slate-400 dark:text-slate-500"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <circle cx="12" cy="9" r="3" />
                <path d="M6 21c0-3.314 2.686-5 6-5s6 1.686 6 5" />
              </svg>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 tracking-wide">
                Portrait
              </span>
            </>
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => updateInput({ portrait: e.target.result });
            reader.readAsDataURL(file);
          }}
        />
      </label>

      <div className="flex flex-col gap-2 justify-center h-[120px]">
        <input
          className="bg-transparent border-0 border-b-2 border-slate-300 dark:border-slate-600 text-2xl font-bold text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 pb-1 transition-colors w-full"
          placeholder="Character Name"
          value={state.name}
          onChange={(e) => updateInput({ name: e.target.value })}
        />

        <div className="flex flex-wrap items-center gap-2">
          {/* Pronouns */}
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Pronouns
          </span>
          <input
            className="w-12 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-md text-xs px-2 py-1 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            placeholder="they"
            value={state.subPronoun}
            onChange={(e) => updateInput({ subPronoun: e.target.value })}
          />
          <input
            className="w-12 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-md text-xs px-2 py-1 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            placeholder="them"
            value={state.objPronoun}
            onChange={(e) => updateInput({ objPronoun: e.target.value })}
          />
          {pronounDisplay && (
            <span className="bg-cyan-100 dark:bg-cyan-800/30 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {pronounDisplay}
            </span>
          )}

          {/* Age */}
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 ml-2">
            Age
          </span>
          <input
            className="w-16 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-md text-xs px-2 py-1 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-cyan-400 dark:focus:border-cyan-500 transition-colors"
            placeholder="—"
            type="number"
            value={state.age}
            onChange={(e) => updateInput({ age: e.target.value })}
          />
          {ageDisplay && (
            <span className="bg-cyan-100 dark:bg-cyan-800/30 text-cyan-700 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {ageDisplay}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
