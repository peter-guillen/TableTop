import { LuBackpack, LuPlus, LuTrash2 } from "react-icons/lu";
import { Armor, Profession, StartingItem } from "../professionTypes";
import { Properties, Skills } from "../../../shared/constants/constantTypes";
import {
  formCheckTile,
  formCheckbox,
  formChipButton,
  formHeading,
  formInput,
  formLabel,
  formRemoveButton,
} from "../../../shared/styles/theme.ts";

interface ItemOption {
  _id: string;
  name: string;
}

interface ProfessionProficienciesProps {
  armorProficiencies: Armor[];
  weaponProficiencies: Properties[];
  skillProficiencies: Skills[];
  startingItems: StartingItem[];
  armorOptions: Armor[];
  weaponOptions: Properties[];
  skillOptions: Skills[];
  itemOptions: ItemOption[];

  onCheckedChange: (
    fieldName: keyof Profession,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartingItemsChange: (newItems: StartingItem[]) => void;
}

export const ProfessionProficienciesSection = ({
  armorProficiencies,
  weaponProficiencies,
  skillProficiencies,
  startingItems,
  armorOptions,
  weaponOptions,
  skillOptions,
  itemOptions,
  onCheckedChange,
  onStartingItemsChange,
}: ProfessionProficienciesProps) => {
  const handleAddItem = () => {
    onStartingItemsChange([...startingItems, { item: "", quantity: 1 }]);
  };

  const handleItemChange = (
    index: number,
    field: keyof StartingItem,
    value: string | number,
  ) => {
    const updated = [...startingItems];
    updated[index] = { ...updated[index], [field]: value };
    onStartingItemsChange(updated);
  };

  const handleRemoveItem = (index: number) => {
    onStartingItemsChange(startingItems.filter((_, i) => i !== index));
  };

  return (
    <section>
      <h2 className={formHeading}>
        <LuBackpack size={20} />
        Proficiencies & Equipment
      </h2>
      <div className="space-y-6">
        {/* Armor Proficiencies */}
        <div>
          <label className={`${formLabel} mb-2`}>Armor Proficiencies</label>
          {armorOptions.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Loading options…
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {armorOptions.map((armor) => (
                <label key={armor} className={formCheckTile}>
                  <input
                    type="checkbox"
                    value={armor}
                    checked={armorProficiencies.includes(armor)}
                    onChange={onCheckedChange("armorProficiencies")}
                    className={formCheckbox}
                  />
                  {/* Stored as snake_case, e.g. light_armor */}
                  <span className="capitalize">{armor.replace(/_/g, " ")}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Weapon Proficiencies (weapon properties) */}
        <div>
          <label className={`${formLabel} mb-2`}>Weapon Proficiencies</label>
          {weaponOptions.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Loading options…
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {weaponOptions.map((weapon) => (
                <label key={weapon} className={formCheckTile}>
                  <input
                    type="checkbox"
                    value={weapon}
                    checked={weaponProficiencies.includes(weapon)}
                    onChange={onCheckedChange("weaponProficiencies")}
                    className={formCheckbox}
                  />
                  <span className="capitalize">{weapon}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Skill Proficiencies */}
        <div>
          <label className={`${formLabel} mb-2`}>Skill Proficiencies</label>
          {skillOptions.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Loading options…
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skillOptions.map((skill) => (
                <label key={skill} className={formCheckTile}>
                  <input
                    type="checkbox"
                    value={skill}
                    checked={skillProficiencies.includes(skill)}
                    onChange={onCheckedChange("skillProficiencies")}
                    className={formCheckbox}
                  />
                  <span className="capitalize">{skill}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Starting Items */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className={formLabel}>Starting Items</label>
            <button
              type="button"
              onClick={handleAddItem}
              className={formChipButton}
            >
              <LuPlus size={16} />
              Add Item
            </button>
          </div>
          <div className="space-y-4">
            {startingItems.map((startingItem, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-[2fr_120px_auto] gap-4 items-end"
              >
                <div>
                  <label className={`${formLabel} mb-2`}>Item</label>
                  <select
                    value={startingItem.item}
                    onChange={(e) =>
                      handleItemChange(index, "item", e.target.value)
                    }
                    required
                    className={formInput}
                  >
                    <option value="" disabled>
                      Select Item
                    </option>
                    {itemOptions.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`${formLabel} mb-2`}>Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={startingItem.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", Number(e.target.value))
                    }
                    className={formInput}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(index)}
                  className={formRemoveButton}
                >
                  <LuTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
