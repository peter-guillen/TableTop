export const SkillsTab = ({ state, library }) => {
  const skills = library?.skills || [];
  const backgrounds = library?.backgrounds || [];

  const bgEntry = backgrounds.find((b) => b.name === state.bg);
  const bgBonus = bgEntry?.mods?.skillBonus || null;

  if (!skills.length) {
    return (
      <p className="text-sm italic text-slate-400 dark:text-slate-500 pt-2">
        No skills found in library.
      </p>
    );
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          <th className="text-left text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-3">
            Skill
          </th>
          <th className="text-right text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 pb-3">
            Bonus
          </th>
        </tr>
      </thead>
      <tbody>
        {skills.map((sk) => {
          const boosted = sk === bgBonus;
          return (
            <tr
              key={sk}
              className="border-t border-slate-100 dark:border-slate-700/50"
            >
              <td className="py-2 text-sm text-slate-900 dark:text-white">
                {sk}
                {boosted && (
                  <span className="ml-2 text-[10px] text-cyan-600 dark:text-cyan-400 font-bold">
                    (+bg)
                  </span>
                )}
              </td>
              <td
                className={`py-2 text-sm font-bold text-right ${
                  boosted
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {boosted ? "+3" : "+0"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
