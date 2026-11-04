import { LuSparkles } from "react-icons/lu";
import {
  formCheckTile,
  formCheckbox,
  formHeading,
  formLabel,
} from "../../../shared/styles/theme.ts";

interface TraitOption {
  _id: string;
  name: string;
}

interface BackgroundTraitsProps {
  traits: string[];
  traitOptions: TraitOption[];
  onTraitsChange: (value: string[]) => void;
}

export const BackgroundTraitsSection = ({
  traits,
  traitOptions,
  onTraitsChange,
}: BackgroundTraitsProps) => {
  return (
    <section>
      <h2 className={formHeading}>
        <LuSparkles size={20} />
        Traits
      </h2>
      <div>
        <label className={`${formLabel} mb-2`}>Background Traits</label>
        {traitOptions.length === 0 ? (
          <p className="text-sm text-stone-500 dark:text-stone-400">
            No traits available yet. Create a power with kind "trait" first.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {traitOptions.map((trait) => (
              <label key={trait._id} className={formCheckTile}>
                <input
                  type="checkbox"
                  checked={traits.includes(trait._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onTraitsChange([...traits, trait._id]);
                    } else {
                      onTraitsChange(traits.filter((id) => id !== trait._id));
                    }
                  }}
                  className={formCheckbox}
                />
                {trait.name}
              </label>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
