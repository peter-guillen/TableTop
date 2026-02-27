import { LuBookOpen } from "react-icons/lu";

export const ArmorBasicInfoSection = ({
  name,
  category,
  rarity,
  material,
  weight,
  value,
  tags,
  onInputChange,
  onCheckedChange,
}) => {
  const tagOptions = [
    "versatile",
    "durable",
    "flexible",
    "ornate",
    "ancient",
    "ceremonial",
    "battle-worn",
    "enchanted",
  ];

  return (
    <section>
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Armor Name *
          </label>
          <input
            type="text"
            placeholder="Enter armor name"
            name="name"
            onChange={onInputChange}
            value={name}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Category *
          </label>
          <select
            name="category"
            onChange={onInputChange}
            value={category}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Select Category</option>
            <option value="light">Light</option>
            <option value="medium">Medium</option>
            <option value="heavy">Heavy</option>
            <option value="shield">Shield</option>
            <option value="natural">Natural</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Rarity *
          </label>
          <select
            name="rarity"
            onChange={onInputChange}
            value={rarity}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="elite">Elite</option>
            <option value="heroic">Heroic</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
            <option value="mythic">Mythic</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Material *
          </label>
          <select
            name="material"
            onChange={onInputChange}
            value={material}
            required
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          >
            <option value="">Select Material</option>
            <option value="cloth">Cloth</option>
            <option value="leather">Leather</option>
            <option value="hide">Hide</option>
            <option value="chainmail">Chainmail</option>
            <option value="scale">Scale</option>
            <option value="plate">Plate</option>
            <option value="steel">Steel</option>
            <option value="iron">Iron</option>
            <option value="mithral">Mithral</option>
            <option value="adamantine">Adamantine</option>
            <option value="dragonscale">Dragonscale</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Weight
          </label>
          <input
            type="number"
            placeholder="Weight in pounds"
            name="weight"
            onChange={onInputChange}
            value={weight}
            min="0"
            step="0.1"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Value (Gold)
          </label>
          <input
            type="number"
            placeholder="Cost in gold"
            name="value"
            onChange={onInputChange}
            value={value}
            min="0"
            className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-slate-300 mb-3">
          Custom Tags
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
              <span className="capitalize text-sm">{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};
