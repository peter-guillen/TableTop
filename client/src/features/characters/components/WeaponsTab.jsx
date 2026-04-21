export const WeaponsTab = ({ state, set, library, onToggleWeapon }) => {
  const weapons = library?.weapons || [];

  const selectedWeapon = weapons.find((w) => w.name === state.selectedWeapon);
  const selectedOffhand = weapons.find((w) => w.name === state.selectedOffhand);

  const isTwoHanded = selectedWeapon?.hands === 2;

  const oneHandedWeapons = weapons.filter((w) => w.hands === 1);
  const twoHandedWeapons = weapons.filter((w) => w.hands === 2);

  const allTechniques = [
    ...(selectedWeapon?.uniqueTechniques || []),
    ...(!isTwoHanded ? selectedOffhand?.uniqueTechniques || [] : []),
  ];

  function handleMainHandChange(name) {
    const next = weapons.find((w) => w.name === name);
    const willBeTwoHanded = next?.hands === 2;
    set({
      selectedWeapon: name,
      selectedOffhand: willBeTwoHanded ? "" : state.selectedOffhand,
    });
    onToggleWeapon(name);
  }

  function handleOffhandChange(name) {
    set({ selectedOffhand: name });
  }

  return (
    <div className="grid grid-cols-[1fr_2fr] gap-4">
      {/* Left: weapon selection */}
      <div className="flex flex-col gap-3">
        {/* Main hand */}
        <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-3">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Main Hand
          </p>

          {/* One-handed */}
          <p className="text-[9px] font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-1.5">
            One-Handed
          </p>
          <div className="flex flex-col gap-1 mb-3">
            {oneHandedWeapons.map((w) => {
              const sel = state.selectedWeapon === w.name;
              return (
                <button
                  key={w._id || w.name}
                  onClick={() => handleMainHandChange(w.name)}
                  className={`text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-150 ${
                    sel
                      ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40 text-orange-600 dark:text-orange-400"
                      : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500/30"
                  }`}
                >
                  {w.name}
                </button>
              );
            })}
          </div>

          {/* Two-handed */}
          <p className="text-[9px] font-bold uppercase tracking-widest text-orange-500 dark:text-orange-400 mb-1.5">
            Two-Handed
          </p>
          <div className="flex flex-col gap-1">
            {twoHandedWeapons.map((w) => {
              const sel = state.selectedWeapon === w.name;
              return (
                <button
                  key={w._id || w.name}
                  onClick={() => handleMainHandChange(w.name)}
                  className={`text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-150 ${
                    sel
                      ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40 text-orange-600 dark:text-orange-400"
                      : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500/30"
                  }`}
                >
                  {w.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Off hand */}
        <div
          className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-3"
          style={{
            opacity: isTwoHanded ? 0.4 : 1,
            pointerEvents: isTwoHanded ? "none" : "auto",
          }}
        >
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2">
            Off Hand{" "}
            {isTwoHanded && (
              <span className="text-slate-400 dark:text-slate-600 normal-case tracking-normal font-normal">
                — Two-Handed
              </span>
            )}
          </p>
          <div className="flex flex-col gap-1">
            {oneHandedWeapons.map((w) => {
              const sel = state.selectedOffhand === w.name;
              return (
                <button
                  key={w._id || w.name}
                  onClick={() => handleOffhandChange(sel ? "" : w.name)}
                  className={`text-left px-3 py-2 rounded-lg border text-xs font-semibold transition-all duration-150 ${
                    sel
                      ? "bg-orange-50 dark:bg-orange-800/20 border-orange-300 dark:border-orange-500/40 text-orange-600 dark:text-orange-400"
                      : "bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 text-slate-700 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-500/30"
                  }`}
                >
                  {w.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: techniques */}
      <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl p-4">
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-3">
          Techniques
        </p>

        {!selectedWeapon ? (
          <p className="text-sm italic text-slate-400 dark:text-slate-500">
            Select a weapon to see its techniques.
          </p>
        ) : allTechniques.length === 0 ? (
          <p className="text-sm italic text-slate-400 dark:text-slate-500">
            No techniques for this loadout.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {allTechniques.map((t, i) => (
              <div
                key={t._id || i}
                className="rounded-lg border border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30 px-4 py-3"
              >
                <div className="flex justify-between items-start gap-2 mb-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {t.name}
                  </p>
                  {t.cost && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wide whitespace-nowrap bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-600/40">
                      {t.cost}
                    </span>
                  )}
                </div>
                {t.desc && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {t.desc}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
