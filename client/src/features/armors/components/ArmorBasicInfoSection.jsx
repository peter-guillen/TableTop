import { LuBookOpen } from "react-icons/lu";
import {
  formCheckTile,
  formCheckbox,
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

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
      <h2 className={formHeading}>
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className={`${formLabel} mb-2`}>
            Armor Name *
          </label>
          <input
            type="text"
            placeholder="Enter armor name"
            name="name"
            onChange={onInputChange}
            value={name}
            required
            className={formInput}
          />
        </div>

        <div>
          <label className={`${formLabel} mb-2`}>
            Category *
          </label>
          <select
            name="category"
            onChange={onInputChange}
            value={category}
            required
            className={formInput}
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
          <label className={`${formLabel} mb-2`}>
            Rarity *
          </label>
          <select
            name="rarity"
            onChange={onInputChange}
            value={rarity}
            required
            className={formInput}
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
          <label className={`${formLabel} mb-2`}>
            Material *
          </label>
          <select
            name="material"
            onChange={onInputChange}
            value={material}
            required
            className={formInput}
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
          <label className={`${formLabel} mb-2`}>
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
            className={formInput}
          />
        </div>

        <div>
          <label className={`${formLabel} mb-2`}>
            Value (Gold)
          </label>
          <input
            type="number"
            placeholder="Cost in gold"
            name="value"
            onChange={onInputChange}
            value={value}
            min="0"
            className={formInput}
          />
        </div>
      </div>

      <div className="mt-6">
        <label className={`${formLabel} mb-3`}>
          Custom Tags
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {tagOptions.map((tag) => (
            <label
              key={tag}
              className={formCheckTile}
            >
              <input
                type="checkbox"
                value={tag}
                checked={tags.includes(tag)}
                onChange={onCheckedChange}
                className={formCheckbox}
              />
              <span className="capitalize text-sm">{tag}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
};
