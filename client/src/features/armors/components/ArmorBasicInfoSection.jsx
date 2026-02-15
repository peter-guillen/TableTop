import { LuBookOpen } from "react-icons/lu";
export const ArmorBasicInfoSection = ({
  name,
  description,
  category,
  properties,
  rarity,
  onInputChange,
  onCheckedChange,
  tags,
}) => {
  const tagOptions = [
    "one-handed",
    "two-handed",
    "reach",
    "light",
    "heavy",
    "ranged",
  ];
  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Armor Name
          </label>
          <input
            type="text"
            placeholder="Enter armor name"
            name="name"
            onChange={onInputChange}
            value={name}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category
          </label>
          <select
            name="category"
            onChange={onInputChange}
            value={category}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Select Armor</option>
            <option value="sword">Sword</option>
            <option value="spear">Spear</option>
            <option value="axe">Axe</option>
            <option value="hammer">Hammer</option>
            <option value="ploearm">Polearm</option>
            <option value="longbow">Longbow</option>
            <option value="shortbow">Shortbow</option>
            <option value="staff">Staff</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Tier
          </label>
          <select
            name="rarity"
            onChange={onInputChange}
            value={rarity}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value={""}>Select Rarity</option>
            <option value={"common"}>Common</option>
            <option value={"uncommon"}>Uncommon</option>
            <option value={"rare"}>Rare</option>
            <option value={"elite"}>Elite</option>
            <option value={"heroic"}>Heroic</option>
            <option value={"legendary"}>Legendary</option>
            <option value={"mythic"}>Mythic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Element
          </label>
          <select
            name="properties"
            onChange={onInputChange}
            value={properties}
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Select Element</option>
            <option value="fire">Fire</option>
            <option value="water">Water</option>
            <option value="earth">Earth</option>
            <option value="air">Air</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Tags
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {tagOptions.map((tag) => (
            <label
              key={tag}
              className="flex items-center gap-2 text-slate-300 cursor-pointer bg-slate-800/30 dark:bg-slate-900/30 p-3 rounded-lg border border-cyan-500/20 dark:border-orange-500/20 hover:border-cyan-500/40 dark:hover:border-orange-500/40 transition-all"
            >
              <input
                type="checkbox"
                value={tag}
                checked={tags.includes(tag)}
                onChange={onCheckedChange}
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span className="capitalize">{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};
