import { LuBookOpen } from "react-icons/lu";
import {
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

interface BackgroundBasicInfoProps {
  name: string;

  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const BackgroundBasicInfoSection = ({
  name,
  onInputChange,
}: BackgroundBasicInfoProps) => {
  return (
    <section>
      <h2 className={formHeading}>
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <label className={`${formLabel} mb-2`}>Background Name</label>
          <input
            type="text"
            placeholder="Enter background name"
            name="name"
            onChange={onInputChange}
            value={name}
            required
            className={formInput}
          />
        </div>
      </div>
    </section>
  );
};
