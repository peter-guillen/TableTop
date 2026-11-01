import { LuClock } from "react-icons/lu";
import {
  formCheckLabel,
  formCheckbox,
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

export const ArmorCombatSection = ({
  onInputChange,
  requirement,
  material,
  penalty,
  defense,
  weight,
  value,
  onCheckedChange,
  tags,
}) => {
  return (
    <>
      <section>
        <h2 className={formHeading}>
          <LuClock size={20} />
          Combat Stats
        </h2>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`${formLabel} mb-2`}>
                Defense *
              </label>
              <input
                type="text"
                placeholder="e.g., 14"
                name="defense"
                onChange={onInputChange}
                value={defense}
                required
                className={formInput}
              />
            </div>

            <div>
              <label className={`${formLabel} mb-2`}>
                Weight *
              </label>
              <input
                type="text"
                placeholder="e.g., 20lbs"
                name="weight"
                onChange={onInputChange}
                value={weight}
                required
                className={formInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`${formLabel} mb-2`}>
                Requirements *
              </label>
              <input
                type="text"
                placeholder="e.g., Heavy Armor Proficiency"
                name="requirement"
                onChange={onInputChange}
                value={requirement}
                required
                className={formInput}
              />
            </div>

            <div>
              <label className={`${formLabel} mb-2`}>
                Penalty *
              </label>
              <input
                type="text"
                placeholder="e.g., -5 Movement"
                name="penalty"
                onChange={onInputChange}
                value={penalty}
                required
                className={formInput}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={`${formLabel} mb-2`}>
                Value *
              </label>
              <input
                type="number"
                placeholder="Cost in mana"
                name="value"
                onChange={onInputChange}
                value={value}
                min="0"
                required
                className={formInput}
              />
            </div>

            <div>
              <label className={`${formLabel} mb-2`}>
                Material
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
                <option value="silver">Silver</option>
                <option value="orichalcum">Orichalcum</option>
                <option value="dragonscale">Dragonscale</option>
              </select>
            </div>
          </div>

          <div className="flex gap-6">
            <div className={`${formLabel} mb-2`}>
              Shield
            </div>
            <label className={formCheckLabel}>
              <input
                type="radio"
                name="true"
                className={formCheckbox}
              />
              <span>Yes</span>
            </label>

            <label className={formCheckLabel}>
              <input
                type="radio"
                name="false"
                className={formCheckbox}
              />
              <span>No</span>
            </label>
          </div>
        </div>
      </section>
    </>
  );
};
