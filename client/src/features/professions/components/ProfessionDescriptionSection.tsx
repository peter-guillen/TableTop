import { LuTarget } from "react-icons/lu";
import {
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";
export const ProfessionDescriptionSection = ({
  description,
  onInputChange,
}) => {
  return (
    <section>
      <h2 className={formHeading}>
        <LuTarget size={20} />
        Class Description
      </h2>
      <div className="space-y-4">
        <div>
          <label className={`${formLabel} mb-2`}>
            Description
          </label>
          <textarea
            rows="6"
            placeholder="Describe what the spell does..."
            name="description"
            onChange={onInputChange}
            value={description}
            className={`${formInput} resize-none`}
          />
        </div>
      </div>
    </section>
  );
};
