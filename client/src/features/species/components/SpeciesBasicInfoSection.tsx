import { LuBookOpen } from "react-icons/lu";
import {
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

interface SpeciesBasicInfoProps {
  name: string;

  onInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

export const SpeciesBasicInfoSection = ({
  name,
  onInputChange,
}: SpeciesBasicInfoProps) => {
  return (
    <section>
      <h2 className={formHeading}>
        <LuBookOpen size={20} />
        Basic Information
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
        <div>
          <label className={`${formLabel} mb-2`}>Species Name</label>
          <input
            type="text"
            placeholder="Enter species name"
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
