import { LuTarget } from "react-icons/lu";
import {
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

interface ItemDescriptionProps {
  description: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const ItemDescriptionSection = ({
  description,
  onInputChange,
}: ItemDescriptionProps) => {
  return (
    <section>
      <h2 className={formHeading}>
        <LuTarget size={20} />
        Item Description
      </h2>
      <div className="space-y-4">
        <div>
          <label className={`${formLabel} mb-2`}>
            Description
          </label>
          <textarea
            rows={6}
            placeholder="Describe what the item does..."
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
