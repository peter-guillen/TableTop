import { LuClock } from "react-icons/lu";
import { Activation, Recharge, Action, Resource } from "../powerTypes";

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
      <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
        <LuClock size={20} />
        Activation & Duration
      </h2>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Action Type *
            </label>
            <select
              name="action"
              onChange={(e) =>
                onActivationChange("action", e.target.value as Action)
              }
              value={activation.action}
              required
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            >
              <option value="major_action">Major Action</option>
              <option value="minor_action">Minor Action</option>
              <option value="reaction">Reaction</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
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
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
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
            className="w-full md:w-1/2 px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Resource *
            </label>
            <select
              name="resource"
              onChange={(e) =>
                onActivationChange("resource", e.target.value as Resource)
              }
              value={activation.resource}
              required
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all uppercase"
            >
              <option value="hp">HP</option>
              <option value="mp">MP</option>
              <option value="momentum">Momentum</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
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
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Recharge
            </label>
            <select
              name="recharge"
              onChange={(e) => onRechargeChange(e.target.value as Recharge)}
              value={recharge}
              required
              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
            >
              <option value="unlimited">Unlimited</option>
              <option value="daily">Daily</option>
              <option value="short_rest">Short Rest</option>
              <option value="long_rest">Long Rest</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              name="ritual"
              checked={activation.ritual}
              onChange={(e) => onActivationChange("ritual", e.target.checked)}
              className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
            />
            <span>Ritual Power</span>
          </label>

          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              name="concentration"
              checked={activation.concentration}
              onChange={(e) =>
                onActivationChange("concentration", e.target.checked)
              }
              className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
            />
            <span>Requires Concentration</span>
          </label>

          <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              name="channel"
              checked={activation.channel}
              onChange={(e) => onActivationChange("channel", e.target.checked)}
              className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
            />
            <span>Channeled</span>
          </label>
        </div>
      </div>
    </section>
  );
};
