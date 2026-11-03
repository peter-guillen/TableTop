import { LuTarget } from "react-icons/lu";
import {
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

interface BackgroundDescriptionProps {
  description: string;
  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}

export const BackgroundDescriptionSection = ({
  description,
  onInputChange,
}: BackgroundDescriptionProps) => {
  return (
    <section>
      <h2 className={formHeading}>
        <LuTarget size={20} />
        Background Description
      </h2>
      <div className="space-y-4">
        <div>
          <label className={`${formLabel} mb-2`}>Description</label>
          <textarea
            rows={6}
            placeholder="Describe the life this character led before adventuring..."
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
