import { LuTarget } from "react-icons/lu";
export const SpellDescriptionSection = ({ description, onInputChange }) => {
  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuTarget size={20} />
        Spell Description
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Description
          </label>
          <textarea
            rows="6"
            placeholder="Describe what the spell does..."
            name="description"
            onChange={onInputChange}
            value={description}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all resize-none"
          />
        </div>
      </div>
    </section>
  );
};
