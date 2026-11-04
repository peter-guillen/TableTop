import { LuBackpack, LuPlus, LuTrash2 } from "react-icons/lu";
import { Background, StartingItem } from "../backgroundTypes";
import { Skills } from "../../../shared/constants/constantTypes";
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

interface BackgroundProficienciesProps {
  skillProficiencies: Skills[];
  skillOptions: Skills[];
  startingItems: StartingItem[];
  itemOptions: ItemOption[];

  onCheckedChange: (
    fieldName: keyof Background,
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  onStartingItemsChange: (newItems: StartingItem[]) => void;
}

export const BackgroundProficienciesSection = ({
  skillProficiencies,
  skillOptions,
  startingItems,
  itemOptions,
  onCheckedChange,
  onStartingItemsChange,
}: BackgroundProficienciesProps) => {
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
        {/* Skill Proficiencies */}
        <div>
          <label className={`${formLabel} mb-2`}>Skill Proficiencies</label>
          {skillOptions.length === 0 ? (
            <p className="text-sm text-stone-500 dark:text-stone-400">Loading options…</p>
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
