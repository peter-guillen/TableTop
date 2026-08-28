import { LuClock } from "react-icons/lu";
import {
  Casting,
  Targeting,
  Recharge,
  CastingAction,
  TargetCategory,
  TargetShape,
} from "../powerTypes";

interface PowerCastingSectionProps {
  casting: Casting;
  targeting: Targeting;
  recharge: Recharge;
  onCastingChange: <K extends keyof Casting>(
    field: K,
    value: Casting[K],
  ) => void;
  onTargetingChange: <K extends keyof Targeting>(
    field: K,
    value: Targeting[K],
  ) => void;
  onRechargeChange: (value: Recharge) => void;
}

export const PowerCastingSection = ({
  casting,
  targeting,
  recharge,
  onCastingChange,
  onTargetingChange,
  onRechargeChange,
}: PowerCastingSectionProps) => {
  return (
    <>
      <section>
        <h2 className="text-xl font-bold text-cyan-300 dark:text-orange-300 mb-4 flex items-center gap-2">
          <LuClock size={20} />
          Casting & Duration
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
                  onCastingChange("action", e.target.value as CastingAction)
                }
                value={casting.action}
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
                  onCastingChange("castTime", Number(e.target.value))
                }
                value={casting.castTime}
                min="0"
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Duration (rounds) *
              </label>
              <input
                type="number"
                placeholder="0"
                name="duration"
                onChange={(e) =>
                  onCastingChange("duration", Number(e.target.value))
                }
                value={casting.duration}
                min="0"
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Range (ft) *
              </label>
              <input
                type="number"
                placeholder="0"
                name="range"
                onChange={(e) =>
                  onTargetingChange("range", Number(e.target.value))
                }
                value={targeting.range}
                min="0"
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Target Category *
              </label>
              <select
                name="targetCategory"
                onChange={(e) =>
                  onTargetingChange(
                    "targetCategory",
                    e.target.value as TargetCategory,
                  )
                }
                value={targeting.targetCategory}
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
              >
                <option value="creature">Creature</option>
                <option value="object">Object</option>
                <option value="point">Point</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Target Count *
              </label>
              <input
                type="number"
                placeholder="1"
                name="targetCount"
                onChange={(e) =>
                  onTargetingChange("targetCount", Number(e.target.value))
                }
                value={targeting.targetCount}
                min="0"
                required
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Area Shape
              </label>
              <select
                name="shape"
                onChange={(e) =>
                  onTargetingChange(
                    "shape",
                    (e.target.value || undefined) as TargetShape | undefined,
                  )
                }
                value={targeting.shape ?? ""}
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all capitalize"
              >
                <option value="">None</option>
                <option value="sphere">Sphere</option>
                <option value="cone">Cone</option>
                <option value="line">Line</option>
                <option value="cube">Cube</option>
                <option value="wall">Wall</option>
                <option value="cylinder">Cylinder</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Area Size (ft)
              </label>
              <input
                type="number"
                placeholder="0"
                name="size"
                onChange={(e) =>
                  onTargetingChange("size", Number(e.target.value))
                }
                value={targeting.size ?? 0}
                min="0"
                disabled={!targeting.shape}
                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border border-cyan-500/30 dark:border-orange-500/30 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500 focus:border-transparent transition-all disabled:opacity-40"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Mana Cost *
              </label>
              <input
                type="number"
                placeholder="Cost in mana"
                name="stamina"
                onChange={(e) =>
                  onCastingChange("stamina", Number(e.target.value))
                }
                value={casting.stamina ?? 0}
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
                checked={casting.ritual}
                onChange={(e) => onCastingChange("ritual", e.target.checked)}
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span>Ritual Power</span>
            </label>

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="concentration"
                checked={casting.concentration}
                onChange={(e) =>
                  onCastingChange("concentration", e.target.checked)
                }
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span>Requires Concentration</span>
            </label>

            <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                name="channel"
                checked={casting.channel}
                onChange={(e) => onCastingChange("channel", e.target.checked)}
                className="w-4 h-4 rounded border-cyan-500/30 dark:border-orange-500/30 bg-slate-800/50 dark:bg-slate-900/50 text-cyan-500 dark:text-orange-500 focus:ring-2 focus:ring-cyan-500 dark:focus:ring-orange-500"
              />
              <span>Channeled</span>
            </label>
          </div>
        </div>
      </section>
    </>
  );
};
