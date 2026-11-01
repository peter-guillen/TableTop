import { LuClock } from "react-icons/lu";
import { Activation, Recharge, Action, Resource } from "../powerTypes";
import {
  formCheckLabel,
  formCheckbox,
  formHeading,
  formInput,
  formLabel,
} from "../../../shared/styles/theme.ts";

interface PowerActivationSectionProps {
  activation: Activation;
  recharge: Recharge;
  onActivationChange: <K extends keyof Activation>(
    field: K,
    value: Activation[K],
  ) => void;
  onRechargeChange: (value: Recharge) => void;
}

export const PowerActivationSection = ({
  activation,
  recharge,
  onActivationChange,
  onRechargeChange,
}: PowerActivationSectionProps) => {
  return (
    <section>
      <h2 className={formHeading}>
        <LuClock size={20} />
        Activation & Duration
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={`${formLabel} mb-2`}>
              Action Type *
            </label>
            <select
              name="action"
              onChange={(e) =>
                onActivationChange("action", e.target.value as Action)
              }
              value={activation.action}
              required
              className={formInput}
            >
              <option value="major_action">Major Action</option>
              <option value="minor_action">Minor Action</option>
              <option value="reaction">Reaction</option>
            </select>
          </div>

          <div>
            <label className={`${formLabel} mb-2`}>
              Cast Time (rounds) *
            </label>
            <input
              type="number"
              placeholder="0"
              name="castTime"
              onChange={(e) =>
                onActivationChange("castTime", Number(e.target.value))
              }
              value={activation.castTime}
              min="0"
              required
              className={formInput}
            />
          </div>
        </div>

        <div>
          <label className={`${formLabel} mb-2`}>
            Duration (rounds) *
          </label>
          <input
            type="number"
            placeholder="0"
            name="duration"
            onChange={(e) =>
              onActivationChange("duration", Number(e.target.value))
            }
            value={activation.duration}
            min="0"
            required
            className="w-full md:w-1/2 px-4 py-3 bg-white dark:bg-stone-900/50 border border-stone-300 dark:border-emerald-500/30 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className={`${formLabel} mb-2`}>
              Resource *
            </label>
            <select
              name="resource"
              onChange={(e) =>
                onActivationChange("resource", e.target.value as Resource)
              }
              value={activation.resource}
              required
              className={`${formInput} uppercase`}
            >
              <option value="hp">HP</option>
              <option value="mp">MP</option>
            </select>
          </div>

          <div>
            <label className={`${formLabel} mb-2`}>
              Cost *
            </label>
            <input
              type="number"
              placeholder="0"
              name="cost"
              onChange={(e) =>
                onActivationChange("cost", Number(e.target.value))
              }
              value={activation.cost}
              min="0"
              required
              className={formInput}
            />
          </div>

          <div>
            <label className={`${formLabel} mb-2`}>
              Recharge
            </label>
            <select
              name="recharge"
              onChange={(e) => onRechargeChange(e.target.value as Recharge)}
              value={recharge}
              required
              className={formInput}
            >
              <option value="unlimited">Unlimited</option>
              <option value="daily">Daily</option>
              <option value="short_rest">Short Rest</option>
              <option value="long_rest">Long Rest</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <label className={formCheckLabel}>
            <input
              type="checkbox"
              name="ritual"
              checked={activation.ritual}
              onChange={(e) => onActivationChange("ritual", e.target.checked)}
              className={formCheckbox}
            />
            <span>Ritual Power</span>
          </label>

          <label className={formCheckLabel}>
            <input
              type="checkbox"
              name="concentration"
              checked={activation.concentration}
              onChange={(e) =>
                onActivationChange("concentration", e.target.checked)
              }
              className={formCheckbox}
            />
            <span>Requires Concentration</span>
          </label>

          <label className={formCheckLabel}>
            <input
              type="checkbox"
              name="channel"
              checked={activation.channel}
              onChange={(e) => onActivationChange("channel", e.target.checked)}
              className={formCheckbox}
            />
            <span>Channeled</span>
          </label>
        </div>
      </div>
    </section>
  );
};
