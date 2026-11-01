import { LuTarget } from "react-icons/lu";
import {
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

interface PowerDescriptionProps {
  description: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const PowerDescriptionSection = ({
  description,
  onInputChange,
}: PowerDescriptionProps) => {
  return (
    <section>
      <h2 className={formHeading}>
        <LuTarget size={20} />
        Power Description
      </h2>
      <div className="space-y-4">
        <div>
          <label className={`${formLabel} mb-2`}>
            Description
          </label>
          <textarea
            rows={6}
            placeholder="Describe what the power does..."
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
